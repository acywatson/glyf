import React, { useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  COMMAND_PRIORITY_NORMAL,
  SELECTION_CHANGE_COMMAND,
  $getSelection,
  $isRangeSelection,
  type NodeKey,
  $getNodeByKey
} from 'lexical';
import { $isBannerNode, type RGBValues } from './BannerPlugin';
import * as Popover from '@radix-ui/react-popover';
import { Cross2Icon, ColorWheelIcon } from '@radix-ui/react-icons';
import './styles.css';

interface BannerColorPickerPopoverProps {
  /* array of R, G, B values to be used as banner background color options */
  supportedColors: RGBValues[];
  bannerNodeKey: NodeKey | null;
}

function BannerColorPickerPopover(props: BannerColorPickerPopoverProps): JSX.Element {
  const [editor] = useLexicalComposerContext();
  const { supportedColors, bannerNodeKey } = props;

  const onClick = (color: RGBValues): void => {
    if (bannerNodeKey !== null) {
      editor.update(() => {
        const node = $getNodeByKey(bannerNodeKey);
        if (node !== null && $isBannerNode(node)) {
          node.setColor(color);
        }
      });
    }
  };

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button className="iconButton" aria-label="Change color">
          <ColorWheelIcon />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="popoverContent" sideOffset={5} side="top">
          <Popover.Close className="popoverClose" aria-label="Close">
            <Cross2Icon />
          </Popover.Close>
          <div style={{ display: 'flex', gap: 10 }}>
            {supportedColors.map((color) => (
              <button
                onClick={() => {
                  onClick(color);
                }}
                key={color.join('')}
              >
                <div
                  className="colorButtonInner"
                  style={{
                    backgroundColor: `rgba(${color[0]},${color[1]},${color[2]}, 1)`
                  }}
                ></div>
              </button>
            ))}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

// should make these constant
const supportedColors: RGBValues[] = [
  // pink
  [245, 40, 145],
  // blue
  [39, 82, 245],
  // green
  [61, 245, 39],
  // orange
  [245, 142, 39],
  // purple
  [138, 43, 226]
];

export function BannerColorPickerPlugin(): JSX.Element | null {
  const [visible, setVisible] = useState<boolean>(false);
  const [bannerNodeKey, setBannerNodeKey] = useState<NodeKey | null>(null);
  const [editor] = useLexicalComposerContext();
  editor.registerCommand(
    SELECTION_CHANGE_COMMAND,
    () => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const topLevelNode = selection.anchor.getNode()?.getTopLevelElement();
        if (topLevelNode !== null && $isBannerNode(topLevelNode)) {
          setVisible(true);
          setBannerNodeKey(topLevelNode.getKey());
          return false;
        }
      }
      setVisible(false);
      setBannerNodeKey(null);
      return false;
    },
    COMMAND_PRIORITY_NORMAL
  );
  return visible ? (
    <BannerColorPickerPopover bannerNodeKey={bannerNodeKey} supportedColors={supportedColors} />
  ) : null;
}
