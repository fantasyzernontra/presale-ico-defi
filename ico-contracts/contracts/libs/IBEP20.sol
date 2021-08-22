// SPDX-License-Identifier: MIT

pragma solidity ^0.7.3;

interface IBEP20 {
    // @note: Returns total supply of the token.
    function totalSupply() external view returns (uint256);

    // @note: Returns decimal point of the token.
    function decimals() external view returns (uint8);

    // @note: Returns symbol of the token.
    function symbol() external view returns (string memory);

    // @note: Returns address of the owner.
    function getOwner() external view returns (address);

    // @note: Returns balance of the given account.
    function balanceOf(address _account) external view returns (uint256);

    // @note: Moves token from caller's account to `_to`.
    // @param: `_to` address of the recipient
    // @param: `_amount` amount of tokens
    // @return: Successful Status
    function transfer(address _to, uint256 _amount) external returns (bool);

    // @note: Moves the token from sender's balance to recipient's balance on the condition it is approved by sender.
    // @param: `_from` address of the sender
    // @param: `_to` address of the recipient
    // @param: `_value` amount of tokens
    // @return: Successful Status
    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) external returns (bool);

    // @note: Caller's account approves `_spender` to spend `_value` tokens.\
    // @param: `_spender` address of the spender
    // @param: `_value` amount of tokens
    // @return: Successful Status
    function approve(address _spender, address _value) external returns (bool);

    // @note: Returns amount of remaining tokens allowed to spent.
    // @param: `_owner` address of the caller's account
    // @param: `_spender` address of the spender
    // @return: Amount of remaning tokens that allowed to spent
    function allowance(address _owner, address _spender)
        external
        view
        returns (uint256);

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );
}
