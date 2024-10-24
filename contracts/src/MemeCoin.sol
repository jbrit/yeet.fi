// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MemeCoin is ERC20, Ownable {
    uint256 public curveSupply = 7e26;

    constructor(string memory name_, string memory symbol_) ERC20(name_, symbol_) Ownable(msg.sender) {
        _mint(address(this), 1e27); // 1 billion tokens
    }

    function curveTransferTokens(address recepient, uint256 amount) public onlyOwner {
        curveSupply -= amount;
        transfer(recepient, amount);
    }

    function curveReceiveTokens(uint256 amount) public onlyOwner {
        curveSupply += amount;
    }
}