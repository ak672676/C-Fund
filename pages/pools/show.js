import Image from "next/image";
import React, { Component } from "react";
import Layout from "../../components/Layout";
import { Link } from "../../routes";
import Pool from "../../ethereum/pool";
import web3 from "../../ethereum/web3";

class PoolDetails extends Component {
  state = {
    value: "",
    errorMessage: "",
    loading: false,
  };

  static async getInitialProps(props) {
    const pool = Pool(props.query.address);
    const summary = await pool.methods.getSummary().call();
    return {
      address: props.query.address,
      minimumContribution: summary[0],
      poolBalance: summary[1],
      requests: summary[2],
      title: summary[3],
      description: summary[4],
      approversCount: summary[5],
      owner: summary[6],
    };
  }

  componentDidMount() {
    this.setState({
      value: web3.utils.fromWei(this.props.minimumContribution, "ether"),
    });
  }
  onSubmit = async (event) => {
    event.preventDefault();

    const pool = Pool(this.props.address);

    this.setState({ loading: true, errorMessage: "" });
    try {
      const accounts = await web3.eth.getAccounts();
      await pool.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value, "ether"),
      });
      Router.replaceRoute(`/pools/${this.props.address}`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({ loading: false, value: "" });
    console.log(this.state);
  };

  render() {
    return (
      <Layout>
        <div className="w-full min-h-screen  bg-slate-200">
          <div className="w-full h-[400px]  overflow-hidden relative shadow-2xl bg-indigo-600">
            <div className="h-full w-full absolute top-0 left-0">
              <Image
                src="https://images.unsplash.com/photo-1572120360610-d971b9d7767c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="h-full w-full flex justify-center items-center absolute top-0 left-0 bg-indigo-400 opacity-75">
              <h1 className="text-5xl font-bold uppercase">
                {this.props.title}
              </h1>
            </div>
          </div>
          <div className="p-4 bg-white  min-h-[500px] mt-12 mx-4 shadow-2xl rounded-2xl"></div>
          <div className="p-4 w-full mt-8 flex flex-wrap items-center justify-center">
            <div className="h-[200px]  bg-white p-4 w-1/4 m-2 mb-4 shadow-2xl rounded-2xl hover:scale-[102%] hover:shadow-indigo-300">
              <h2
                style={{ overflowWrap: "break-word" }}
                className="font-semibold"
              >
                {web3.utils.fromWei(this.props.poolBalance, "ether")}
              </h2>
              <p className="text-slate-500">Pool Balance (ether)</p>
              <p className="text-slate-800 mt-2">
                The balance is how much money this pool has left to spend
              </p>
            </div>
            <div className="h-[200px]  bg-white p-4 w-1/4 m-2 mb-4 shadow-2xl rounded-2xl hover:scale-[102%] hover:shadow-indigo-300">
              <h2
                style={{ overflowWrap: "break-word" }}
                className="font-semibold"
              >
                {this.props.owner}
              </h2>
              <p className="text-slate-500">Owner Address</p>
              <p className="text-slate-800 mt-2">
                The owner created this pool and can create requests to withdraw
                money
              </p>
            </div>
            <div className="h-[200px]  bg-white p-4 w-1/4 m-2 mb-4 shadow-2xl rounded-2xl hover:scale-[102%] hover:shadow-indigo-300">
              <h2
                style={{ overflowWrap: "break-word" }}
                className="font-semibold"
              >
                {this.props.minimumContribution}
              </h2>
              <p className="text-slate-500">Minimum Contribution (wei)</p>
              <p className="text-slate-800 mt-2">
                You must contribute at least this much wei to become a
                contributor
              </p>
            </div>
            <div className="h-[200px]  bg-white p-4 w-1/4 m-2 mb-4 shadow-2xl rounded-2xl hover:scale-[102%] hover:shadow-indigo-300">
              <h2
                style={{ overflowWrap: "break-word" }}
                className="font-semibold"
              >
                {this.props.approversCount}
              </h2>
              <p className="text-slate-500">Total Contributors</p>
              <p className="text-slate-800 mt-2">
                Number of people who have already contributed to this pool
              </p>
            </div>
            <div className="h-[200px] cursor-pointer  bg-white p-4 w-1/4 m-2 mb-4 shadow-2xl rounded-2xl hover:scale-[102%] hover:shadow-indigo-300">
              <h2
                style={{ overflowWrap: "break-word" }}
                className="font-semibold"
              >
                {this.props.requests}
              </h2>
              <p className="text-slate-500">Number of Requests</p>
              <p className="text-slate-800 mt-2">
                A request tries to withdraw money from the pool. Requests must
                be approved by contributors
              </p>
            </div>
          </div>

          <div className="py-4">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="p-4 w-full mt-4 flex flex-col items-center">
            <h1 className="text-center mb-8 text-5xl uppercase">
              Mark your contribution
            </h1>

            <form
              className="w-[50%] flex justify-center"
              onSubmit={this.onSubmit}
            >
              <input
                onChange={(event) =>
                  this.setState({ value: event.target.value })
                }
                value={this.state.value}
                placeholder="Ether"
                className="px-3 py-4 placeholder-slate-300 text-slate-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
              />
              {this.state.loading ? (
                <button className="mx-3  transform hover:scale-105 transition duration-300 ease-in-out bg-indigo-400 text-white font-bold rounded-xl py-4 px-4 shadow-lg  tracking-wider">
                  Hold on confirming
                </button>
              ) : (
                <button className="mx-3  transform hover:scale-105 transition duration-300 ease-in-out bg-indigo-400 text-white font-bold rounded-full py-4 px-10 shadow-lg uppercase tracking-wider">
                  Contribute
                </button>
              )}
            </form>

            {!!this.state.errorMessage && (
              <div
                className="bg-red-100 rounded-lg  mt-4 border-red-500 text-red-700 p-4 mb-2"
                role="alert"
              >
                <p>{this.state.errorMessage}</p>
              </div>
            )}

            <p className="mt-3 text-slate-600">
              Minimum contribution for this pool is{" "}
              {web3.utils.fromWei(this.props.minimumContribution, "ether")}{" "}
              Ether
            </p>
          </div>
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
            <div className="w-full flex flex-wrap items-center justify-center">
              <Link route={`/pools/646546545jhjk/requests`}>
                <div className="h-[100px] w-[300px] p-4 m-2 cursor-pointer hover:scale-[102%] rounded-2xl hover:shadow-indigo-300 shadow-2xl bg-white">
                  <h1>Request</h1>
                </div>
              </Link>

              <div className="h-[100px] w-[300px] p-4 m-2 cursor-pointer hover:scale-[102%] rounded-2xl hover:shadow-indigo-300 shadow-2xl bg-white">
                <h1>Request</h1>
              </div>
              <div className="h-[100px] w-[300px] p-4 m-2 cursor-pointer hover:scale-[102%] rounded-2xl hover:shadow-indigo-300 shadow-2xl bg-white">
                <h1>Request</h1>
              </div>
              <div className="h-[100px] w-[300px] p-4 m-2 cursor-pointer hover:scale-[102%] rounded-2xl hover:shadow-indigo-300 shadow-2xl bg-white">
                <h1>Request</h1>
              </div>
              <div className="h-[100px] w-[300px] p-4 m-2 cursor-pointer hover:scale-[102%] rounded-2xl hover:shadow-indigo-300 shadow-2xl bg-white">
                <h1>Request</h1>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default PoolDetails;
