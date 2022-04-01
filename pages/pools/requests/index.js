import React, { Component } from "react";
import Layout from "../../../components/Layout";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToHTML, convertFromHTML } from "draft-convert";
import draftToHtml from "draftjs-to-html";

class Requests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      message:"Lets try"
    };
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
    this.exportHTML = this.exportHTML.bind(this);
    this.updateHTML = this.updateHTML.bind(this);
    this.importHTML = this.importHTML.bind(this);
  }
  onEditorStateChange = (editorState) => {
    console.log(editorState);
    this.setState({
      editorState,
    });
  };

  exportHTML = () => {
    // this.setState({
    //   convertedContent: convertToHTML(
    //     this.state.editorState.getCurrentContent()
    //   ),
    // });
    // const rawContentState = convertToRaw(editorState.getCurrentContent());
    // const markup = draftToHtml(rawContentState);
    // this.setState({
    //   convertedContent: markup,
    // });
    // draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));
    this.setState({
      message: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
    });
  };

  updateHTML = (e) => {
    e.preventDefault();
    this.setState({ convertedContent: e.target.value });
  };

  importHTML = () => {
    const { editorState } = this.state;
    this.onChange(
      EditorState.push(
        editorState,
        convertFromHTML(this.state.convertedContent)
      )
    );
  };

  render() {
    return (
      <Layout>
        <div className="w-full min-h-screen p-4 bg-slate-200">
          <div className="unreset">
            <Editor
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              wrapperStyle={{ width: 800, border: "1px solid black" }}
              editorState={this.state.editorState}
              onEditorStateChange={this.onEditorStateChange}
            />
          </div>
          <div className="flex">
            <div>
              <button onClick={this.exportHTML}>Export HTML</button>
              <button onClick={this.importHTML}>Import HTML</button>
            </div>
            HTML:
            <textarea
              onChange={this.updateHTML}
              value={this.state.convertedContent}
            />
          </div>
          <button
            onClick={() => {
              console.log(JSON.stringify(this.state.editorState));
              var t = JSON.parse(JSON.stringify(this.state.editorState));
              this.setState({ t });
            }}
          >
            Click
          </button>
          <div className="unreset" dangerouslySetInnerHTML={{__html: this.state.message}}>
            
          </div>
        </div>
      </Layout>
    );
  }
}
export default Requests;
