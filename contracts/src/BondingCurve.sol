// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./MemeCoin.sol";

contract BondingCurve is Ownable {
    MemeCoin public memeCoin;

    uint256 public BONDING_CURVE_CUBE_PER_LIQUDITY = 343e6; // for 1e18 ETH liqudity

    constructor(string memory name_, string memory symbol_) Ownable(msg.sender) {
        memeCoin = new MemeCoin(name_, symbol_);
    }

    function curveTokensBought() public view returns (uint256) {
        return 7e26 - memeCoin.curveSupply();
    }

    function ethInByTokenOut(uint256 tokenOut) public view returns (uint256) {
        uint256 tokenOutNoDecimals = tokenOut / 1e18;
        require(tokenOutNoDecimals*1e18 == tokenOut, "NoFractionalTrades");
        uint256 totalSupply = curveTokensBought();
        uint256 newTotalSupply = totalSupply/1e18 + tokenOutNoDecimals;  // scale down totalSupply
        uint256 supplyDifference = newTotalSupply**3 - totalSupply**3;
        return (supplyDifference - 1) / BONDING_CURVE_CUBE_PER_LIQUDITY + 1;  // ceil in favor of protocol
    }

    function ethOutByTokenIn(uint256 tokenIn) public view returns (uint256) {
        uint256 tokenInNoDecimals = tokenIn / 1e18;
        require(tokenInNoDecimals*1e18 == tokenIn, "NoFractionalTrades");
        uint256 totalSupply = curveTokensBought() / 1e18;  // scale down totalSupply
        uint256 newTotalSupply = totalSupply - tokenInNoDecimals;
        return (totalSupply ** 3 - newTotalSupply ** 3) / BONDING_CURVE_CUBE_PER_LIQUDITY;
    }

    function buyToken(address recepient, uint256 amount, uint256 maxEthIn) external payable onlyOwner returns (uint256) {
        require(amount > 0, "ZeroAmount");
        uint256 expectedEthIn = ethInByTokenOut(amount);
        require(msg.value >= expectedEthIn, "InsufficientFunds");
        if (msg.value > expectedEthIn) {
            uint256 ethRefund = msg.value - expectedEthIn;
            (bool sent,) = payable(recepient).call{value: ethRefund}("");
            require(sent, "Failed to send Ether");
        }
        memeCoin.curveTransferTokens(recepient, amount);
        return expectedEthIn;
    }

    function sellToken(address recepient, uint256 amount, uint256 minEthOut) external onlyOwner returns (uint256) {
        require(amount > 0, "ZeroAmount");
        uint256 ethOut = ethOutByTokenIn(amount);
        memeCoin.transferFrom(msg.sender, address(memeCoin), amount);
        memeCoin.curveReceiveTokens(amount);
        (bool sent, bytes memory data) = payable(recepient).call{value: ethOut}("");
        require(sent, "Failed to send Ether");
        return ethOut;
    }
}
