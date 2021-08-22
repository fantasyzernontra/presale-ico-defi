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
    ) public {
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
                accNamPerShare: 0,
                bonusPool: 0,
                sharePool: 0
            })
        );

        totalAllocPoint = 1000;
    }

    function poolLength() external view returns (uint256) {
        return poolInfo.length;
    }

    // Add a new lp to the pool. Can only be called by the owner.
    // DO NOT add the same LP token more than once. Rewards will be messed up if you do.
    function add(
        uint256 _allocPoint,
        IBEP20 _lpToken,
        bool _withUpdate
    ) public onlyOwner {
        if (_withUpdate) {
            massUpdatePools();
        }

        uint256 lastRewardBlock = block.number > startBlock
            ? block.number
            : startBlock;
        totalAllocPoint = totalAllocPoint.add(_allocPoint);

        poolInfo.push(
            PoolInfo({
                lpToken: _lpToken,
                allocPoint: _allocPoint,
                lastRewardBlock: lastRewardBlock,
                accNamPerShare: 0,
                bonusPool: 0,
                sharePool: 0
            })
        );

        updateStakingPool();
    }

    // Original MasterChef function
    function updateStakingPool() internal {
        uint256 length = poolInfo.length;
        uint256 points = 0;

        for (uint256 pid = 1; pid < length; ++pid) {
            points = points.add(poolInfo[pid].allocPoint);
        }

        if (points != 0) {
            points = points.div(3);
            totalAllocPoint = totalAllocPoint.sub(poolInfo[0].allocPoint).add(
                points
            );
            poolInfo[0].allocPoint = points;
        }
    }

    // Update reward variables for all pools. Be careful of gas spending!
    // will be called only when add new pool or update existing pool's alloc point
    function massUpdatePools() public {
        uint256 length = poolInfo.length;

        for (uint256 pid = 0; pid < length; ++pid) {
            updatePool(pid);
        }
    }

    // Update reward variables of the given pool to be up-to-date.
    function updatePool(uint256 _pid) public {
        PoolInfo storage pool = poolInfo[_pid];

        if (block.number <= pool.lastRewardBlock) {
            return;
        }

        uint256 lpSupply = pool.lpToken.balanceOf(address(this));

        if (lpSupply == 0) {
            pool.lastRewardBlock = block.number;
            return;
        }

        uint256 multiplier = getMultiplier(pool.lastRewardBlock, block.number);
        uint256 namReward = multiplier
            .mul(namPerBlock)
            .mul(pool.allocPoint)
            .div(totalAllocPoint);

        nam.mint(devaddr, namReward.div(10));
        nam.mint(address(this), namReward);

        pool.accNamPerShare = pool.accNamPerShare.add(
            namReward.mul(1e12).div(lpSupply)
        );
        pool.lastRewardBlock = block.number;
    }

    // Deposit LP tokens to MasterChef for STAB allocation.
    function deposit(uint256 _pid, uint256 _amount) public {
        require(_pid != 0, "deposit STAB by staking");

        PoolInfo storage pool = poolInfo[_pid];
        UserInfo storage user = userInfo[_pid][msg.sender];

        updatePool(_pid);

        if (user.amount > 0) {
            uint256 pending = user
                .amount
                .mul(pool.accNamPerShare)
                .div(1e12)
                .sub(user.rewardDebt);

            if (pending > 0) {
                safeStablerTransfer(msg.sender, pending);
            }
        }

        if (_amount > 0) {
            pool.lpToken.safeTransferFrom(
                address(msg.sender),
                address(this),
                _amount
            );
            user.amount = user.amount.add(_amount);
        }

        user.rewardDebt = user.amount.mul(pool.accNamPerShare).div(1e12);

        if (user.amount > 0) {
            UserInfo storage infoFromStaking = userInfo[0][msg.sender];
            UserBonusInfo storage infoCurrentPool = userPoolBonusInfo[_pid][
                msg.sender
            ];

            uint256 lpSupply = pool.lpToken.balanceOf(address(this));

            uint256 normalShare = user.amount.div(lpSupply);
            uint256 bonusWeightedShare = normalShare
                .mul(infoFromStaking.totalBonusPercent)
                .div(100);

            if (!infoCurrentPool.isInPool) {
                initalizeBonus(msg.sender);

                pool.bonusPool = pool.bonusPool.add(
                    infoFromStaking.totalBonusPercent
                );
                pool.sharePool = pool.sharePool.add(bonusWeightedShare);

                infoCurrentPool.isInPool = true;
                infoCurrentPool.lastBonusPercent = infoFromStaking
                    .totalBonusPercent;
                infoCurrentPool.lastWeightedShare = bonusWeightedShare;
            } else {
                pool.bonusPool = pool
                    .bonusPool
                    .sub(infoCurrentPool.lastBonusPercent)
                    .add(infoFromStaking.totalBonusPercent);
                pool.sharePool = pool
                    .sharePool
                    .sub(infoCurrentPool.lastWeightedShare)
                    .add(bonusWeightedShare);

                infoCurrentPool.lastBonusPercent = infoFromStaking
                    .totalBonusPercent;
                infoCurrentPool.lastWeightedShare = bonusWeightedShare;
            }
        }

        emit Deposit(msg.sender, _pid, _amount);
    }

    // Withdraw LP tokens from MasterChef.
    function withdraw(uint256 _pid, uint256 _amount) public {
        require(_pid != 0, "withdraw STAB by unstaking");
        PoolInfo storage pool = poolInfo[_pid];
        UserInfo storage user = userInfo[_pid][msg.sender];
        require(user.amount >= _amount, "withdraw: not good");

        updatePool(_pid);

        uint256 pending = user.amount.mul(pool.accNamPerShare).div(1e12).sub(
            user.rewardDebt
        );
        if (pending > 0) {
            safeStablerTransfer(msg.sender, pending);
        }

        if (_amount > 0) {
            user.amount = user.amount.sub(_amount);
            pool.lpToken.safeTransfer(address(msg.sender), _amount);
        }

        if (user.amount > 0) {
            UserInfo storage infoFromStaking = userInfo[0][msg.sender];
            UserBonusInfo storage infoCurrentPool = userPoolBonusInfo[_pid][
                msg.sender
            ];

            uint256 lpSupply = pool.lpToken.balanceOf(address(this));

            uint256 normalShare = user.amount.div(lpSupply);
            uint256 bonusWeightedShare = normalShare
                .mul(infoFromStaking.totalBonusPercent)
                .div(100);

            pool.bonusPool = pool
                .bonusPool
                .sub(infoCurrentPool.lastBonusPercent)
                .add(infoFromStaking.totalBonusPercent);
            pool.sharePool = pool
                .sharePool
                .sub(infoCurrentPool.lastWeightedShare)
                .add(bonusWeightedShare);

            infoCurrentPool.lastBonusPercent = infoFromStaking
                .totalBonusPercent;
            infoCurrentPool.lastWeightedShare = bonusWeightedShare;
        } else {
            UserBonusInfo storage infoCurrentPool = userPoolBonusInfo[_pid][
                msg.sender
            ];

            pool.bonusPool = pool.bonusPool.sub(
                infoCurrentPool.lastBonusPercent
            );
            pool.sharePool = pool.sharePool.sub(
                infoCurrentPool.lastWeightedShare
            );

            infoCurrentPool.lastBonusPercent = 0;
            infoCurrentPool.lastWeightedShare = 0;
        }

        user.rewardDebt = user.amount.mul(pool.accStablerPerShare).div(1e12);
        emit Withdraw(msg.sender, _pid, _amount);
    }
}
