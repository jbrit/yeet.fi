// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./BondingCurve.sol";

contract YeetFinance {
    IERC20 public WETH;
    mapping(address token => BondingCurve) public bondingCurves;
    mapping(address token => uint256) public kickoffs;

    constructor(address _WETH) {
        WETH = IERC20(_WETH);
    }

    event CurveInitialized(
        address indexed dev,
        address indexed token,
        string name,
        string symbol,
        string description,
        string image,
        string twitter,
        string telegram,
        string website,
        uint256 kickoff
    );
    event TokenBought(address indexed trader, address indexed token, uint256 amount, uint256 ethIn);
    event TokenSold(address indexed trader, address indexed token, uint256 amount, uint256 ethOut);

    /**
     * @dev Throws if an unregistered token is provided
     */
    error UnregisteredToken(address token);
    /**
     * @dev Throws if trade is made before kickoff
     */
    error UninitializedTrade(address token);

    modifier onlyRegisteredToken(address token) {
        if (address(bondingCurves[token]) == address(0)) {
            revert UnregisteredToken(token);
        }
        if (kickoffs[token] > block.timestamp) {
            revert UninitializedTrade(token);
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
        string memory website,
        uint256 kickoff
    ) external returns (address) {
        BondingCurve curve = new BondingCurve(name, symbol, WETH);
        address token = address(curve.memeCoin());
        bondingCurves[token] = curve;
        curve.memeCoin().approve(address(curve), type(uint256).max);
        if (kickoff < block.timestamp) {
            kickoff = block.timestamp;
        }
        kickoffs[token] = kickoff;
        emit CurveInitialized(msg.sender, token, name, symbol, description, image, twitter, telegram, website, kickoff);
        return token;
    }

    function buyToken(
        address token,
        uint256 amount,
        uint256 maxEthIn
    ) external onlyRegisteredToken(token) returns (uint256) {
        uint256 ethIn = bondingCurves[token].buyToken(
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
        uint256 ethOut = bondingCurves[token].sellToken(msg.sender, amount, minEthOut);
        emit TokenSold(msg.sender, token, amount, ethOut);
        return ethOut;
    }
}
