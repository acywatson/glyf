import * as React from 'react';
import './styles.css';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $setBlocksType_experimental } from '@lexical/selection';
import { $isRangeSelection, $getSelection, type TextFormatType } from 'lexical';
import { $createHeadingNode } from '@lexical/rich-text';
import { INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND } from '@lexical/list';
import { INSERT_BANNER_COMMAND } from '../glyf-editor/plugins/banner/BannerPlugin';
import * as Toolbar from '@radix-ui/react-toolbar';
import {
  StrikethroughIcon,
  FontBoldIcon,
  FontItalicIcon,
  UnderlineIcon,
  PlusCircledIcon
} from '@radix-ui/react-icons';
import { OrderedListIcon, UnorderedListIcon } from './icons';
import { BannerColorPickerPlugin } from '../glyf-editor/plugins/banner/BannerColorPickerPlugin';

interface ToolbarButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
  children: React.ReactNode;
}

function ToolbarButton(props: ToolbarButtonProps): JSX.Element {
  return (
    <Toolbar.Button className="toolbarButton" onClick={props.onClick}>
      {props.children}
    </Toolbar.Button>
  );
}

function TextFormatToolbarPlugin(): JSX.Element {
  const [editor] = useLexicalComposerContext();
  const getIcon = (format: TextFormatType): JSX.Element | null => {
    switch (format) {
      case 'bold':
        return <FontBoldIcon />;
      case 'italic':
        return <FontItalicIcon />;
      case 'strikethrough':
        return <StrikethroughIcon />;
      case 'underline':
        return <UnderlineIcon />;
      default:
        return null;
    }
  };
  const onClick = (format: TextFormatType): void => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        selection.formatText(format);
      }
    });
  };
  const supportedTextFormats: TextFormatType[] = ['bold', 'italic', 'underline', 'strikethrough'];
  return (
    <>
      {supportedTextFormats.map((format) => (
        <ToolbarButton
          key={format}
          onClick={() => {
            onClick(format);
          }}
        >
          {getIcon(format)}
        </ToolbarButton>
      ))}
    </>
  );
}

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
        <ToolbarButton
          onClick={() => {
            onClick(tag);
          }}
          key={tag}
        >
          {tag.toUpperCase()}
        </ToolbarButton>
      ))}
    </>
  );
}

function ListToolbarPlugin(): JSX.Element {
  const [editor] = useLexicalComposerContext();
  const onClick = (tag: 'ol' | 'ul'): void => {
    if (tag === 'ol') {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
      return;
    }
    editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
  };
  return (
    <>
      <ToolbarButton
        onClick={() => {
          onClick('ol');
        }}
      >
        <OrderedListIcon />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => {
          onClick('ul');
        }}
      >
        <UnorderedListIcon />
      </ToolbarButton>
    </>
  );
}

function BannerToolbarPlugin(): JSX.Element {
  const [editor] = useLexicalComposerContext();
  const onClick = (e: React.MouseEvent): void => {
    editor.dispatchCommand(INSERT_BANNER_COMMAND, undefined);
  };
  return (
    <ToolbarButton onClick={onClick}>
      <PlusCircledIcon />
      Banner
    </ToolbarButton>
  );
}

export function ToolbarPlugin(): JSX.Element {
  return (
    <Toolbar.Root className="toolbarRoot">
      <TextFormatToolbarPlugin />
      <HeadingToolbarPlugin />
      <ListToolbarPlugin />
      <BannerToolbarPlugin />
      <BannerColorPickerPlugin />
    </Toolbar.Root>
  );
}
