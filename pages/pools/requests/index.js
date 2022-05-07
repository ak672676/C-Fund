import { Link } from "../../../routes";
import React, { Component } from "react";
import Layout from "../../../components/Layout";
import RequestItem from "../../../components/RequestItem";
import Pool from "../../../ethereum/pool";

class Requests extends Component {

  static async getInitialProps(props) {
    const { address } = props.query;
    const pool = Pool(address);
    const requestCount = await pool.methods.getRequestsCount().call();
    const approversCount = await pool.methods.approversCount().call();

    const requests = await Promise.all(
      Array(parseInt(requestCount))
        .fill()
        .map((element, index) => {
          return pool.methods.requests(index).call();
        })
    );

    return { address, requests, requestCount, approversCount };
  }

  renderRows() {
    return this.props.requests.map((request, index) => {
      return (
        <RequestItem
          key={index}
          id={index}
          request={request}
          address={this.props.address}
          approversCount={this.props.approversCount}
        />
      );
    });
  }

  render() {
    return (
      <Layout>
        <div className="w-full min-h-screen p-4 bg-slate-200">
          <div className="p-4 w-full mt-4">
            <h1 className="text-center mb-4 text-5xl">Requests</h1>
            <div className="flex justify-end">
              <Link route={`/pools/${this.props.address}/requests/new`}>
                <a>
                  <button className="transform hover:scale-110 transition duration-300 ease-in-out bg-indigo-400 text-white font-bold rounded-full py-4 px-6 shadow-lg uppercase tracking-wider">
                    Request
                  </button>
                </a>
              </Link>
            </div>
            <div className="w-full flex flex-wrap bg-white rounded-lg p-4 shadow-xl">
              <table className="border-collapse border border-slate-400 w-[100%]">
                <thead>
                  <tr className="p-2">
                    <th className="border p-2 border-slate-300 text-left">ID</th>
                    <th className="border p-2 border-slate-300 text-left">
                      Description
                    </th>
                    <th className="border p-2 border-slate-300 text-left">
                      Amount
                    </th>
                    <th className="border p-2 border-slate-300 text-left">
                      Recipient
                    </th>
                    <th className="border p-2 border-slate-300 text-left">
                      Approval Count
                    </th>
                    <th className="border p-2 border-slate-300 text-left">
                      Approve
                    </th>
                    <th className="border p-2 border-slate-300 text-left">
                      Finalize
                    </th>
                  </tr>
                </thead>
                <tbody>{this.renderRows()}</tbody>
              </table>
              <div>Found {this.props.requestCount} requests.</div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}
export default Requests;
