import * as React from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { type EditorState } from 'lexical';
import { $generateHtmlFromNodes } from '@lexical/html';

interface CustomOnChangeProps {
  onChange: (editorState: EditorState, htmlContent: string) => void;
}

export default function OnChangePlugin({ onChange }: CustomOnChangeProps): null {
  const [editor] = useLexicalComposerContext();

  React.useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        onChange(editorState, $generateHtmlFromNodes(editor));
      });
    });
  }, [editor, onChange]);

  return null;
}
