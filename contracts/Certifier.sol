pragma solidity ^0.4.22;


contract Certifier {
  address public owner;
  string public name;

  constructor() public{
    owner = msg.sender;
  }

  modifier onlyOwner(){
    require( msg.sender == owner );
    _;
  }

  function setName( string _name ) public onlyOwner{
    name = _name;
  }

  function isOwner( ) public view returns (bool){
    return msg.sender == owner;
  }

  function getName() public view returns (string) {
    return name;
  }
  
}
