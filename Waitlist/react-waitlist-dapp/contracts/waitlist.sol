pragma solidity >=0.4.0 <0.7.0;

contract Waitlist {

   uint list_length = 1;

   struct UserInfo {
       uint place_in_line;
       uint timestamp;
   }

   mapping (address => UserInfo) AllUsers;


   function SetUserInfo() public {
       require (AllUsers[msg.sender].place_in_line == 0);
       AllUsers[msg.sender].place_in_line = list_length;
       AllUsers[msg.sender].timestamp = block.timestamp;
       list_length++;
   }

   function GetUserInfo() public view returns(uint,uint) {
       return(AllUsers[msg.sender].place_in_line , AllUsers[msg.sender].timestamp);
   }

   function Countdown() public view returns (uint){
       uint _now = block.timestamp;
       return _now;
   }
}
