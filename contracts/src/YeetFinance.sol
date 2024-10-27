// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./BondingCurve.sol";

contract YeetFinance {
    mapping(address token => BondingCurve) public bondingCurves;

    event CurveInitialized(
        address indexed dev,
        address indexed token,
        string name,
        string symbol,
        string description,
        string image,
        string twitter,
        string telegram,
        string website
    );
    event TokenBought(address indexed trader, address indexed token, uint256 amount, uint256 ethIn);
    event TokenSold(address indexed trader, address indexed token, uint256 amount, uint256 ethOut);

    /**
     * @dev Throws if an unregistered token is provided
     */
    error UnregisteredToken(address token);

    modifier onlyRegisteredToken(address token) {
        if (address(bondingCurves[token]) == address(0)) {
            revert UnregisteredToken(token);
        }
        _;
    }

    function yeet(
        string memory name,
        string memory symbol,
        string memory description,
        string memory image,
        string memory twitter,
        string memory telegram,
        string memory website
    ) external returns (address) {
        BondingCurve curve = new BondingCurve(name, symbol);
        address token = address(curve.memeCoin());
        bondingCurves[token] = curve;
        curve.memeCoin().approve(address(curve), type(uint256).max);
        emit CurveInitialized(msg.sender, token, name, symbol, description, image, twitter, telegram, website);
        return token;
    }

    function buyToken(
        address token,
        uint256 amount,
        uint256 maxEthIn
    ) external payable onlyRegisteredToken(token) returns (uint256) {
        uint256 ethIn = bondingCurves[token].buyToken{value: msg.value}(
            msg.sender,
            amount,
            maxEthIn
        );
        emit TokenBought(msg.sender, token, amount, ethIn);
        return ethIn;
    }

    function sellToken(
        address token,
        uint256 amount,
        uint256 minEthOut
    ) external onlyRegisteredToken(token) returns (uint256) {
        BondingCurve curve = bondingCurves[token];
        curve.memeCoin().transferFrom(msg.sender, address(this), amount);
        uint256 ethOut = curve.sellToken(msg.sender, amount, minEthOut);
        emit TokenBought(msg.sender, token, amount, ethOut);
        return ethOut;
    }
}
