import * as React from 'react';
import './App.css';
import { GlyfEditor } from 'src/components';

function App(): JSX.Element {
  return (
    <div className="App">
      <h1 className="editorHeading">Glyf Editor</h1>
      <div className="editorWrapper">
        <GlyfEditor />
      </div>
    </div>
  );
}

export default App;
