import react from "react";
import Layout from "../../components/Layout";

import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";

import { Router } from "../../routes";

import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import dynamic from "next/dynamic";
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

class PoolNew extends react.Component {
  constructor(props) {
    super(props);
    this.state = {
      minimumContribution: "",
      title: "",
      description: "",
      errorMessage: "",
      loading: false,
      previewTab: false,
      editorState: EditorState.createEmpty(),
      editorState2: EditorState.createEmpty(),
      message: "Lets try",
    };
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  onSubmit = async (event) => {
    event.preventDefault();
    var saved = JSON.stringify(
      convertToRaw(this.state.editorState.getCurrentContent())
    );

    this.setState({ loading: true, errorMessage: "" });

    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createPool(this.state.minimumContribution, this.state.title, saved)
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
    var previewTab = this.state.previewTab;
    var color = "indigo";
    return (
      <Layout>
        <div className="w-full  min-h-screen bg-slate-200 px-16">
          <h1 className="text-slate-700 text-3xl font-semibold uppercase text-center pt-4">
            Creating a new pool
          </h1>
          {!!this.state.errorMessage && (
            <div
              className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-2"
              role="alert"
            >
              <p>{this.state.errorMessage}</p>
            </div>
          )}
          <div className="my-4">
            <input
              type="text"
              id="large-input"
              placeholder="Title"
              value={this.state.title}
              onChange={(event) => this.setState({ title: event.target.value })}
              maxLength={35}
              className="block p-4 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-indigo-300 focus:border-indigo-300  "
            />
          </div>
          <div className="my-4">
            <input
              value={this.state.minimumContribution}
              onChange={(event) =>
                this.setState({ minimumContribution: event.target.value })
              }
              type="number"
              id="large-input"
              placeholder="Minimum Contribution (Wei)"
              className="block p-4 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-indigo-300 focus:border-indigo-300  "
            />
          </div>
          <div className="flex flex-wrap">
            <div className="w-full">
              <ul
                className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
                role="tablist"
              >
                <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                  <a
                    className={
                      "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                      (!previewTab
                        ? "text-white bg-" + color + "-400"
                        : "text-" + color + "-600 bg-white")
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      this.setState({
                        previewTab: !previewTab,
                      });
                    }}
                    data-toggle="tab"
                    href="#link1"
                    role="tablist"
                  >
                    Insert Description
                  </a>
                </li>
                <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                  <a
                    className={
                      "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                      (previewTab
                        ? "text-white bg-" + color + "-400"
                        : "text-" + color + "-600 bg-white")
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      this.setState({
                        message: draftToHtml(
                          convertToRaw(
                            this.state.editorState.getCurrentContent()
                          )
                        ),
                      });
                      this.setState({
                        previewTab: !previewTab,
                      });
                    }}
                    data-toggle="tab"
                    href="#link2"
                    role="tablist"
                  >
                    Preview
                  </a>
                </li>
              </ul>
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full min-h-screen mb-6 shadow-lg rounded">
                <div className="px-4 py-5 flex-auto">
                  <div className="tab-content tab-space">
                    <div
                      className={!previewTab ? "block" : "hidden"}
                      id="link1"
                    >
                      <Editor
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        wrapperStyle={{
                          width: "100p%",
                          height: "100%",
                          border: "1px solid grey",
                        }}
                        editorState={this.state.editorState}
                        onEditorStateChange={this.onEditorStateChange}
                      />
                    </div>
                    <div className={previewTab ? "block" : "hidden"} id="link2">
                      <div
                        className="unreset h-full w-full"
                        dangerouslySetInnerHTML={{ __html: this.state.message }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="my-2">
            {this.state.loading ? (
              <button
                disabled
                type="submit"
                className="text-white mb-4  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
              >
                Loading
              </button>
            ) : (
              <button
                onClick={this.onSubmit}
                type="submit"
                className="text-white mb-4  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </Layout>
    );
  }
}

export default PoolNew;
