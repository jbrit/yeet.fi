// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./MemeCoin.sol";

contract BondingCurve is Ownable {
    IERC20 public WETH;
    MemeCoin public memeCoin;
    uint256 public memeCoinCurveSupply = 7e26;

    uint256 public constant BONDING_CURVE_CUBE_PER_LIQUDITY = 343e6; // for 1e18 ETH liqudity

    constructor(string memory name_, string memory symbol_, IERC20 _WETH) Ownable(msg.sender) {
        WETH = _WETH;
        memeCoin = new MemeCoin(name_, symbol_, address(this));
    }

    function memeCoinCirculatingSupply() public view returns (uint256) {
        return 7e26 - memeCoinCurveSupply;
    }

    function ethInByTokenOut(uint256 tokenOut) public view returns (uint256) {
        uint256 tokenOutNoDecimals = tokenOut / 1e18;
        require(tokenOutNoDecimals*1e18 == tokenOut, "NoFractionalTrades");
        uint256 totalSupply = memeCoinCirculatingSupply();
        uint256 newTotalSupply = totalSupply/1e18 + tokenOutNoDecimals;  // scale down totalSupply
        uint256 supplyDifference = newTotalSupply**3 - totalSupply**3;
        return (supplyDifference - 1) / BONDING_CURVE_CUBE_PER_LIQUDITY + 1;  // ceil in favor of protocol
    }

    function ethOutByTokenIn(uint256 tokenIn) public view returns (uint256) {
        uint256 tokenInNoDecimals = tokenIn / 1e18;
        require(tokenInNoDecimals*1e18 == tokenIn, "NoFractionalTrades");
        uint256 totalSupply = memeCoinCirculatingSupply() / 1e18;  // scale down totalSupply
        uint256 newTotalSupply = totalSupply - tokenInNoDecimals;
        return (totalSupply ** 3 - newTotalSupply ** 3) / BONDING_CURVE_CUBE_PER_LIQUDITY;
    }

    function buyToken(address trader, uint256 amount, uint256 maxEthIn) external onlyOwner returns (uint256) {
        require(amount > 0, "ZeroAmount");
        uint256 ethIn = ethInByTokenOut(amount);
        require(ethIn <= maxEthIn, "SlippageExceeded");
        WETH.transferFrom(trader, address(this), ethIn);
        memeCoinCurveSupply -= amount;
        memeCoin.transfer(trader, amount);
        return ethIn;
    }

    function sellToken(address trader, uint256 amount, uint256 minEthOut) external onlyOwner returns (uint256) {
        require(amount > 0, "ZeroAmount");
        uint256 ethOut = ethOutByTokenIn(amount);
        require(ethOut >= minEthOut, "SlippageExceeded");
        memeCoinCurveSupply += amount;
        memeCoin.transferFrom(trader, address(this), amount);
        WETH.transfer(trader, ethOut);
        return ethOut;
    }
}
