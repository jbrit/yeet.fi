// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./BondingCurve.sol";

contract YeetFinance {
    mapping (address token => BondingCurve) public bondingCurves;

    /**
     * @dev Throws if an unregistered token is provided
     */
    error UnregisteredToken(address token);

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
        curve.memeCoin().approve(address(curve), type(uint256).max);
        return token;
    }

    function buyToken(address token, uint256 amount, uint256 maxEthIn) external payable onlyRegisteredToken(token) returns(uint256) {
        return bondingCurves[token].buyToken{value: msg.value}(msg.sender, amount, maxEthIn);
    }

    function sellToken(address token, uint256 amount, uint256 minEthOut) external onlyRegisteredToken(token) returns(uint256) {
        BondingCurve curve = bondingCurves[token];
        curve.memeCoin().transferFrom(msg.sender, address(this), amount);
        return curve.sellToken(msg.sender, amount, minEthOut);

    }
}