import * as React from 'react';
import './App.css';
import { GlyfEditor } from 'src/components';

function App(): JSX.Element {
  return (
    <div className="App">
      <h1 className="editorHeading">Glyf Editor</h1>
      <div className="editorWrapper">
        <GlyfEditor
          onChange={(editorState, htmlContent) => {
            console.log(htmlContent);
          }}
        />
      </div>
    </div>
  );
}

export default App;
