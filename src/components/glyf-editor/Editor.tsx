import * as React from 'react';
import { ListItemNode, ListNode } from '@lexical/list';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { HeadingNode } from '@lexical/rich-text';
import { type EditorState } from 'lexical';
import { ToolbarPlugin } from '../glyf-toolbar/Toolbar';
import { BannerNode, BannerPlugin } from './plugins/banner/BannerPlugin';
import './styles.css';
import OnChangePlugin from './plugins/on-change/OnChangePlugin';

const theme = {
  heading: {
    h1: 'glyf-editor-h1',
    h2: 'glyf-editor-h2',
    h3: 'glyf-editor-h3'
  },
  text: {
    bold: 'glyf-editor-bold',
    italic: 'glyf-editor-italic',
    underline: 'glyf-editor-underline',
    strikethrough: 'glyf-editor-strikethrough',
    underlineStrikethrough: 'glyf-editor-underlineStrikethrough'
  },
  banner: 'glyf-editor-banner'
};

function onError(error: Error): void {
  console.error(error);
}

interface EditorProps {
  onChange: (editorState: EditorState, htmlContent: string) => void;
}

export default function Editor({ onChange }: EditorProps): JSX.Element {
  const initialConfig = {
    namespace: 'MyEditor',
    theme,
    onError,
    nodes: [HeadingNode, ListNode, ListItemNode, BannerNode]
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <OnChangePlugin onChange={onChange} />
      <ToolbarPlugin />
      <BannerPlugin />
      <ListPlugin />
      <RichTextPlugin
        contentEditable={<ContentEditable className="contentEditable" />}
        placeholder={<div className="placeholder">Enter some text...</div>}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
    </LexicalComposer>
  );
}
