// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {YeetFinance} from "../src/YeetFinance.sol";
import {MemeCoin} from "../src/MemeCoin.sol";

contract CounterTest is Test {
    YeetFinance public yeetFinance;
    address public memeCoin;

    function setUp() public {
        yeetFinance = new YeetFinance();
        console.log("yeet finace contract:");
        console.log(address(yeetFinance));
        // address dummyToken = address(0);
        memeCoin = yeetFinance.yeet("name", "symbol");
    }

    function test_Increment() public {
        uint256 amount = 7e26;
        uint256 maxEthIn = 1e18;
        uint256 expectedEthIn = yeetFinance.bondingCurves(memeCoin).ethInByTokenOut(amount);
        console.log("expectedEthIn:", expectedEthIn);
        yeetFinance.buyToken{value: 1 ether}(memeCoin, amount, maxEthIn);

        uint256 minEthOut = 1e18;
        uint256 expectedEthOut = yeetFinance.bondingCurves(memeCoin).ethOutByTokenIn(amount);
        console.log("expectedEthOut:", expectedEthOut);

        MemeCoin(memeCoin).approve(address(yeetFinance), type(uint256).max);
        yeetFinance.sellToken(memeCoin, amount, minEthOut);
    }

    fallback() external payable {}

    // function testFuzz_SetNumber(uint256 x) public {
    //     counter.setNumber(x);
    //     assertEq(counter.number(), x);
    // }
}
