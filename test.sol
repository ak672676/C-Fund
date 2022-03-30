
pragma solidity ^0.4.17;

contract PoolFactory {
    address[] public deployedPools;

    function createPool(uint minimum,string title, string description) public {
        address newPool = new Pool(minimum, title, description, msg.sender);
        deployedPools.push(newPool);
    }

    function getdeployedPools() public view returns (address[]) {
        return deployedPools;
    }
}

contract Pool {
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    Request[] public requests;
    address public owner;
    string public title;
    string  public description;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint public approversCount;

    modifier restricted() {
        require(msg.sender == owner);
        _;
    }

    function Pool(uint minimum,string poolTitle,string poolDescription,address creator) public {
        owner = creator;
        title = poolTitle;
        description = poolDescription;
        minimumContribution = minimum;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution);

        approvers[msg.sender] = true;
        approversCount++;
    }

    function createRequest(string requestDescription, uint value, address recipient) public restricted {
        Request memory newRequest = Request({
           description: requestDescription,
           value: value,
           recipient: recipient,
           complete: false,
           approvalCount: 0
        });

        requests.push(newRequest);
    }

    function approveRequest(uint index) public {
        Request storage request = requests[index];

        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];

        require(request.approvalCount > (approversCount / 2));
        require(!request.complete);

        request.recipient.transfer(request.value);
        request.complete = true;
    }
    
    function getSummary() public view returns (
      uint, uint, uint, uint, address
      ) {
        return (
          minimumContribution,
          this.balance,
          requests.length,
          approversCount,
          owner
        );
    }
    
    function getRequestsCount() public view returns (uint) {
        return requests.length;
    }
}