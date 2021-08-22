// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./libs/BEP20.sol";

contract NamToken is BEP20 {
    constructor() BEP20("NAM Token", "NAM") {}
}
