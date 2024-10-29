// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract FakeWETH is ERC20 {
    constructor() ERC20("Fake WETH", "FWETH") {}

    function mint(address recipient, uint256 amount) external {
        _mint(recipient, amount * 1e18);
    }
}