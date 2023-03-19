import * as React from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $setBlocksType_experimental } from '@lexical/selection';
import { $isRangeSelection, $getSelection } from 'lexical';
import { $createHeadingNode } from '@lexical/rich-text';
import { INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND } from '@lexical/list';
import { INSERT_BANNER_COMMAND } from '../glyf-editor/plugins/banner/BannerPlugin';

type HeadingTag = 'h1' | 'h2' | 'h3';
function HeadingToolbarPlugin(): JSX.Element {
  const [editor] = useLexicalComposerContext();
  const headingTags: HeadingTag[] = ['h1', 'h2', 'h3'];
  const onClick = (tag: HeadingTag): void => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType_experimental(selection, () => $createHeadingNode(tag));
      }
    });
  };
  return (
    <>
      {headingTags.map((tag) => (
        <button
          onClick={() => {
            onClick(tag);
          }}
          key={tag}
        >
          {tag.toUpperCase()}
        </button>
      ))}
    </>
  );
}

type ListTag = 'ol' | 'ul';
function ListToolbarPlugin(): JSX.Element {
  const [editor] = useLexicalComposerContext();
  const listTags: ListTag[] = ['ol', 'ul'];
  const onClick = (tag: ListTag): void => {
    if (tag === 'ol') {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
      return;
    }
    editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
  };
  return (
    <>
      {listTags.map((tag) => (
        <button
          onClick={() => {
            onClick(tag);
          }}
          key={tag}
        >
          {tag.toUpperCase()}
        </button>
      ))}
    </>
  );
}

function BannerToolbarPlugin(): JSX.Element {
  const [editor] = useLexicalComposerContext();
  const onClick = (e: React.MouseEvent): void => {
    editor.dispatchCommand(INSERT_BANNER_COMMAND, undefined);
  };
  return <button onClick={onClick}>Banner</button>;
}

export function ToolbarPlugin(): JSX.Element {
  return (
    <div className="toolbar-wrapper">
      <HeadingToolbarPlugin />
      <ListToolbarPlugin />
      <BannerToolbarPlugin />
    </div>
  );
}
