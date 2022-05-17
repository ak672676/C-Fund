import React, { Component } from "react";
import web3 from "../ethereum/web3";
import Pool from "../ethereum/pool";

class RequestItem extends Component {
  onApprove = async () => {
    const pool = Pool(this.props.address);

    const accounts = await web3.eth.getAccounts();
    await pool.methods.approveRequest(this.props.id).send({
      from: accounts[0],
    });
  };

  onFinalize = async () => {
    const pool = Pool(this.props.address);

    const accounts = await web3.eth.getAccounts();
    await pool.methods.finalizeRequest(this.props.id).send({
      from: accounts[0],
    });
  };

  render() {
    const { id, request, approversCount } = this.props;
    const readyToFinalize = request.approvalCount > approversCount / 2;
    console.log("----------");
    console.log(request);
    return (
      <tr>
        <td className="border border-slate-300">{id}</td>
        <td className="border border-slate-300">{request.description}</td>
        <td className="border border-slate-300">
          {web3.utils.fromWei(request.value, "ether")}
        </td>
        <td className="border border-slate-300">{request.recipient}</td>
        <td className="border border-slate-300">
          {request.approvalCount}/{approversCount}
        </td>
        <td className="border border-slate-300 text-center">
          {request.complete ? null : (
            <button className="bg-green-500 text-white rounded-md p-2" onClick={this.onApprove}>
              Approve
            </button>
          )}
        </td>
        <td className="border border-slate-300 text-center">
          {" "}
          {request.complete ? null : (
            <button className="bg-red-500 text-white rounded-md p-2" onClick={this.onFinalize}>
              FInalize
            </button>
          )}
        </td>
      </tr>
    );
  }
}

export default RequestItem;
