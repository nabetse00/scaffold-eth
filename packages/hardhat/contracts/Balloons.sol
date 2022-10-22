pragma solidity >=0.8.0 <0.9.0;
// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Balloons is ERC20 {
    constructor() ERC20("Balloons", "BAL") {
        _mint(msg.sender, 1000 ether); // mints 1000 balloons!
    }
    
    // Extra aprove event 
    event ApproveEvent(address owner, address spender, uint256 amount, bool result);
    
    function approve(address spender, uint256 amount) public override returns(bool) {
       bool result = ERC20.approve( spender, amount);
       emit ApproveEvent(msg.sender, spender, amount, result);
       return result;
    }
}
