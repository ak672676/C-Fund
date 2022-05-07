import Layout from "../../../components/Layout";
import React, { Component } from "react";
import Pool from "../../../ethereum/pool";
import web3 from "../../../ethereum/web3";
import { Router } from "../../../routes";
class NewRequest extends Component {
  state = {
    value: "",
    description: "",
    recipient: "",
    loading: false,
    errorMessage: "",
  };

  static async getInitialProps(props) {
    const { address } = props.query;

    return { address };
  }

  onSubmit = async (event) => {
    event.preventDefault();

    const pool = Pool(this.props.address);
    const { description, value, recipient } = this.state;

    this.setState({ loading: true, errorMessage: "" });

    try {
      const accounts = await web3.eth.getAccounts();
      await pool.methods
        .createRequest(description, web3.utils.toWei(value, "ether"), recipient)
        .send({ from: accounts[0] });
      Router.pushRoute(`/pools/${this.props.address}/requests`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>
        <div className="w-full min-h-screen p-4 bg-slate-200">
          <div className="p-4 w-full mt-4">
            <h1 className="text-center mb-4 text-5xl">New Requests</h1>
          </div>
          <div className="p-4 w-full mt-4 flex justify-center">
            <form
              onSubmit={this.onSubmit}
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col w-[50%]  justify-center items-center"
            >
              <textarea
                className="border w-full py-2 px-3 shadow appearance-none m-4"
                placeholder="Description"
                value={this.state.description}
                onChange={(e) => this.setState({ description: e.target.value })}
              ></textarea>
              <input
                className="border w-full py-2 px-3 shadow appearance-none m-4"
                type="text"
                placeholder="Value in ether"
                value={this.state.value}
                onChange={(e) => this.setState({ value: e.target.value })}
              />
              <input
                className="border w-full py-2 px-3 shadow appearance-none m-4"
                type="text"
                placeholder="Recipient Address"
                value={this.state.recipient}
                onChange={(e) => this.setState({ recipient: e.target.value })}
              />

              {!!this.state.errorMessage && (
                <div
                  className="bg-red-100 rounded-lg  mt-4 border-red-500 text-red-700 p-4 mb-2"
                  role="alert"
                >
                  <p>{this.state.errorMessage}</p>
                </div>
              )}

              <button
                className="shadow bg-indigo-600 text-white p-4 m-4 rounded-md"
                type="submit"
              >
                {this.state.loading ? "Loading..." : "Create Request"}
              </button>
            </form>
          </div>
        </div>
      </Layout>
    );
  }
}

export default NewRequest;
