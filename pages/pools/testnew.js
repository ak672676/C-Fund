import react from "react";
import Layout from "../../components/Layout";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { Router } from "../../routes";
import { Editor, EditorState } from "draft-js";

class PoolNew extends react.Component {
  state = {
    minimumContribution: "",
    title: "",
    description: "",
    errorMessage: "",
    loading: false,
  };

  onSubmit = async (event) => {
    event.preventDefault();
    console.log(this.state);
    this.setState({ loading: true, errorMessage: "" });

    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createPool(
          this.state.minimumContribution,
          this.state.title,
          this.state.description
        )
        .send({
          from: accounts[0],
        });

      Router.pushRoute("/");
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>
        <div className="w-full  h-screen flex justify-center items-center">
          <div className=" bg-white w-1/2 m-h-2/3  mt-[-100px] shadow-lg rounded-md p-8">
            <form onSubmit={this.onSubmit}>
              <div className="mb-2">
                <label
                  htmlFor="title"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="Title"
                  required
                  value={this.state.title}
                  onChange={(event) =>
                    this.setState({ title: event.target.value })
                  }
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Your message
                </label>
                <textarea
                  id="description"
                  rows="4"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                  placeholder="Description"
                  value={this.state.description}
                  onChange={(event) =>
                    this.setState({ description: event.target.value })
                  }
                ></textarea>
              </div>
              <div className="mb-2">
                <label
                  htmlFor="minContribution"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Minimum contribution
                </label>
                <input
                  type="number"
                  id="minContribution"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="10000"
                  value={this.state.minimumContribution}
                  onChange={(event) =>
                    this.setState({ minimumContribution: event.target.value })
                  }
                  required
                />
              </div>
              {!!this.state.errorMessage && (
                <div
                  className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-2"
                  role="alert"
                >
                  <p>{this.state.errorMessage}</p>
                </div>
              )}
              {this.state.loading ? (
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
                >
                  Loading
                </button>
              ) : (
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
                >
                  Submit
                </button>
              )}
            </form>
          </div>
        </div>
      </Layout>
    );
  }
}

export default PoolNew;
