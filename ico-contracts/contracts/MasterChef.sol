// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./libs/IBEP20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

import "./NamToken.sol";

contract MasterChef is Ownable {
    using SafeMath for uint256;

    // Info of each user.
    struct UserInfo {
        uint256 amount;
    }

    // Info of each pool.
    struct PoolInfo {
        IBEP20 lpToken;
        uint256 allocPoint;
        uint256 lastRewardBlock;
        uint256 accNamPerShare;
    }

    // The NAM Token
    NamToken nam;
    // Dev address.
    address public devaddr;
    // NAM tokens created per block.
    uint256 public namPerBlock;
    // Bonus muliplier for early nam makers.
    uint256 public BONUS_MULTIPLIER = 1;
    // Minimum amount of NAM to accrue day streak
    uint256 public MINIMUM_STREAK_STAKING = 1000;

    // Info of each pool.
    PoolInfo[] public poolInfo;
    // Info of each user that stakes LP tokens.
    mapping(uint256 => mapping(address => UserInfo)) public userInfo;
    // Total allocation points. Must be the sum of all allocation points in all pools.
    uint256 public totalAllocPoint = 0;
    // The block number when NAM mining starts.
    uint256 public startBlock;

    constructor(
        NamToken _nam,
        address _devaddr,
        uint256 _namPerBlock,
        uint256 _startBlock
    ) {
        nam = _nam;
        devaddr = _devaddr;
        namPerBlock = _namPerBlock;
        startBlock = _startBlock;

        // staking pool
        poolInfo.push(
            PoolInfo({
                lpToken: _nam,
                allocPoint: 1000,
                lastRewardBlock: startBlock,
                accNamPerShare: 0
            })
        );

        totalAllocPoint = 1000;
    }

    function poolLength() external view returns (uint256) {
        return poolInfo.length;
    }
}
