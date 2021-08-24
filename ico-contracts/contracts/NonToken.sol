// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./interfaces/BEP20.sol";

contract NonToken is BEP20 {
    constructor() BEP20("NON Token", "NON") {}
}
