// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./BondingCurve.sol";

contract YeetFinance {
    mapping (address token => BondingCurve) public bondingCurves;

    error UnregisteredToken(address token);

    /**
     * @dev Throws if an unregistered token is provided
     */
    modifier onlyRegisteredToken(address token) {
        if (address(bondingCurves[token]) == address(0)){
            revert UnregisteredToken(token);
        }
        _;
    }

    function yeet(string memory name, string memory symbol) external returns(address) {
        BondingCurve curve = new BondingCurve(name, symbol);
        address token = address(curve.memeCoin());
        bondingCurves[token] = curve;
        return token;
    }

    function buyToken(address token, uint256 amount, uint256 maxEthIn) external onlyRegisteredToken(token) returns(uint256) {
        return BondingCurve(token).buyToken(msg.sender, amount, maxEthIn);
    }

    function sellToken(address token, uint256 amount, uint256 minEthOut) external onlyRegisteredToken(token) returns(uint256) {
        return BondingCurve(token).sellToken(msg.sender, amount, minEthOut);

    }
}