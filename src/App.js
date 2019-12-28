import React, { Component } from 'react';
import AceEditor from 'react-ace';
import { Button } from 'react-bootstrap';
import FileSaver from 'file-saver';
import 'bootstrap/dist/css/bootstrap.min.css';
import "ace-builds/src-min-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/snippets/javascript";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/ext-emmet";

class App extends Component {
  ref = null
  componentDidMount() {
      this.ref = this.refs.edit;
  }

  saveSource = () => {
    FileSaver.saveAs(new File([this.ref.editor.getValue()], "source", {type: ".js"}));
  }

  handleFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
        this.refs.edit.editor.setValue(e.target.result);
    }
    reader.readAsText(file);
  }
  
  render() {
    return (
      <div>
     	  <div style={{flexDirection: "row", padding: 16}}>
          <input type="file" accept=".js" onChange={e => this.handleFile(e.target.files[0])} /> 
          <Button onClick={this.saveSource}>Download</Button>
     	  </div>
        <AceEditor
          ref="edit"
          placeholder="Code"
          mode="javascript"
          theme="solarized_dark"
          width="100vw"
          height="90vh"
          fontSize={24}
          showPrintMargin={false}
          showGutter={true}
          highlightActiveLine={true}
          setOptions={{
            enableBasicAutocompletion: true,
            enableEmmet: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,   
            showLineNumbers: true,
            tabSize: 4,
          }}/>
      </div>
      )
    }
}
export default App;