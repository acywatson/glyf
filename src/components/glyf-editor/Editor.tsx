import * as React from 'react'
import './styles.css'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import type { EditorState } from 'lexical'

const theme = {}

function onError(error: Error): void {
  console.error(error)
}

function MyOnChangePlugin(props: { onChange: (editorState: EditorState) => void }): null {
  const [editor] = useLexicalComposerContext()
  const { onChange } = props
  React.useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      onChange(editorState)
    })
  }, [onChange, editor])
  return null
}

export default function Editor(): JSX.Element {
  const initialConfig = {
    namespace: 'MyEditor',
    theme,
    onError,
  }

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <PlainTextPlugin
        contentEditable={<ContentEditable className="contentEditable" />}
        placeholder={<div className="placeholder">Enter some text...</div>}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
      <MyOnChangePlugin
        onChange={(editorState) => {
          console.log(editorState)
        }}
      />
    </LexicalComposer>
  )
}
