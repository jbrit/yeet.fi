// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {YeetFinance} from "../src/YeetFinance.sol";
import {MemeCoin} from "../src/MemeCoin.sol";
import {FakeWETH} from "../src/FakeWETH.sol";

contract CounterTest is Test {
    FakeWETH public fakeWETH;
    YeetFinance public yeetFinance;
    address public memeCoin;

    function setUp() public {
        fakeWETH = new FakeWETH();
        yeetFinance = new YeetFinance(address(fakeWETH));
        console.log("yeet finace contract:");
        console.log(address(yeetFinance));
        // address dummyToken = address(0);
        memeCoin = yeetFinance.yeet("name", "symbol", "", "", "", "", "", 0);
        fakeWETH.mint(address(this), 5);
        fakeWETH.approve(address(yeetFinance.bondingCurves(memeCoin)), type(uint256).max);
    }

    function test_Trading() public {
        uint256 amount = 7e26;
        uint256 maxEthIn = 1e18;
        uint256 expectedEthIn = yeetFinance.bondingCurves(memeCoin).ethInByTokenOut(amount);
        console.log("expectedEthIn:", expectedEthIn);
        yeetFinance.buyToken(memeCoin, amount, maxEthIn);

        uint256 minEthOut = 1e18;
        uint256 expectedEthOut = yeetFinance.bondingCurves(memeCoin).ethOutByTokenIn(amount);
        console.log("expectedEthOut:", expectedEthOut);

        MemeCoin(memeCoin).approve(address(yeetFinance), type(uint256).max);
        yeetFinance.sellToken(memeCoin, amount, minEthOut);
        console.log("kickoff:", yeetFinance.kickoffs(memeCoin));
    }
}
