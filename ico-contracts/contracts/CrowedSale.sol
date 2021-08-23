// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./NonToken.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Address.sol";

contract CrowedSale is Ownable {
    using SafeMath for uint256;
    using Address for address;

    struct CrowedSaleInfo {
        // Crowed sale fund address
        address payable fund;
        // Owner of Crowed Sale
        address owner;
        // Cap above which the crowed sale is ended.
        uint256 cap;
        // Price for each NON Token.
        uint256 price;
        // Ending status
        bool isFinalized;
        // Freezing status
        bool frozen;
    }

    // NAM Token
    NonToken private non;
    // Crowed sale info.
    CrowedSaleInfo public info;
    // Amount of sold tokens
    uint256 public sold;

    /// @notice Valids the crowed sale are not freezed and sold out.
    modifier saleValidation() {
        require(!info.frozen, "CrowedSale: Crowed Sale is frozen.");
        require(sold < info.cap, "NON Token sold out");
        _;
    }

    /// @notice Valids `msg.value` is sufficient to purchase.
    modifier purchaseValidation() {
        require(msg.value >= info.price);
        _;
    }

    constructor(
        address payable _fund,
        uint256 _cap,
        uint256 _price
    ) {
        CrowedSaleInfo memory _info = CrowedSaleInfo({
            fund: _fund,
            owner: _msgSender(),
            cap: _cap,
            price: _price,
            isFinalized: false,
            frozen: false
        });

        info = _info;
    }

    function createTokenContract() internal returns (NonToken) {
        return new NonToken();
    }

    function purchaseToken()
        public
        payable
        saleValidation
        purchaseValidation
        returns (bool)
    {
        // Excess Amount
        uint256 excessAmount = msg.value % info.price;
        // Amount of purchase value
        uint256 purchaseAmount = SafeMath.sub(msg.value, excessAmount);
        // Amount of tokens
        uint256 tokensAmount = SafeMath.div(purchaseAmount, info.price);

        address payable sender = payable(msg.sender);

        if (excessAmount > 0) {
            sender.transfer(excessAmount);
        }

        sold = sold.add(tokensAmount);
        non.presaleMint(_msgSender(), tokensAmount);
        forwardFunds(purchaseAmount);
        emit CrowedSalePurchase(_msgSender(), tokensAmount);
        return true;
    }

    function forwardFunds(uint256 purchaseAmount) internal {
        info.fund.transfer(purchaseAmount);
    }

    event CrowedSalePurchase(address indexed beneficiary, uint256 amount);
    event Finalized();
}
