// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <8.10.0;
pragma experimental ABIEncoderV2;

contract ToDoList {
    struct User_Data {
        string Name;
        uint256 List_count;
        string[] todoLists;
    }

    function Create(string memory name) public {
        Accounts[msg.sender].Name = name;
    }

    function Push_todo(string memory value) public {
        Accounts[msg.sender].todoLists.push(value);
        Accounts[msg.sender].List_count++;
    }

    function remove(uint256 index) public {
        for (uint256 i = 0; i < Accounts[msg.sender].List_count; i++) {
            if (i >= index && i < Accounts[msg.sender].List_count - 1) {
                temp = Accounts[msg.sender].todoLists[index];
                Accounts[msg.sender].todoLists[index] = Accounts[msg.sender]
                    .todoLists[index + 1];
                Accounts[msg.sender].todoLists[index + 1] = temp;
            }
        }
        Accounts[msg.sender].todoLists.pop();
        Accounts[msg.sender].List_count--;
    }

    function getList() public view returns (string[] memory) {
        return Accounts[msg.sender].todoLists;
    }

    string temp;

    mapping(address => User_Data) public Accounts;
}
