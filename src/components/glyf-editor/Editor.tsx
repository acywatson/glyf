import * as React from 'react';
import './styles.css';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { HeadingNode, $createHeadingNode } from '@lexical/rich-text';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getRoot, $createTextNode } from 'lexical';

const theme = {
  heading: {
    h1: 'glyf-editor-h1'
  },
  text: {
    bold: 'glyf-editor-bold',
    italic: 'glyf-editor-italic'
  }
};

function MyHeadingPlugin(): JSX.Element {
  const [editor] = useLexicalComposerContext();
  const onClick = (e: React.MouseEvent): void => {
    editor.update(() => {
      const root = $getRoot();
      root.append($createHeadingNode('h1').append($createTextNode('Hello world')));
    });
  };
  return <button onClick={onClick}>Heading</button>;
}

function onError(error: Error): void {
  console.error(error);
}

export default function Editor(): JSX.Element {
  const initialConfig = {
    namespace: 'MyEditor',
    theme,
    onError,
    nodes: [HeadingNode]
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <MyHeadingPlugin />
      <RichTextPlugin
        contentEditable={<ContentEditable className="contentEditable" />}
        placeholder={<div className="placeholder">Enter some text...</div>}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
    </LexicalComposer>
  );
}
