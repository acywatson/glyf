import * as React from 'react'
import './App.css'
import { GlyfEditor } from 'src/components'

function App(): JSX.Element {
  return (
    <div className="App">
      <div className="editorWrapper">
        <GlyfEditor />
      </div>
    </div>
  )
}

export default App
