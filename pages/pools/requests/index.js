import React, { Component } from "react";
import Layout from "../../../components/Layout";

class Requests extends Component {
  render() {
    return (
      <Layout>
        <div className="w-full min-h-screen p-4 bg-slate-200">
          <div className="p-4 w-full mt-4">
            <h1 className="text-center mb-4 text-5xl">Requests</h1>
            <div className="flex justify-end">
              <a>
                <button className="transform hover:scale-110 transition duration-300 ease-in-out bg-indigo-400 text-white font-bold rounded-full py-4 px-6 shadow-lg uppercase tracking-wider">
                  Request
                </button>
              </a>
            </div>
            <div className="w-full flex flex-wrap items-center justify-center">
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
export default Requests;
