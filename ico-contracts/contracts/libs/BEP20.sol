// SPDX-License-Identifier: MIT

pragma solidity ^0.7.3;

import "./IBEP20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Address.sol";

abstract contract BEP20 is IBEP20 {}
