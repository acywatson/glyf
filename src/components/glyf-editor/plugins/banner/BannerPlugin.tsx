import {
  COMMAND_PRIORITY_LOW,
  createCommand,
  type EditorConfig,
  type LexicalNode,
  $getSelection,
  $isRangeSelection,
  ElementNode,
  type RangeSelection,
  $createParagraphNode
} from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $setBlocksType_experimental } from '@lexical/selection';

export class BannerNode extends ElementNode {
  static getType(): string {
    return 'banner';
  }

  static clone(node: BannerNode): BannerNode {
    return new BannerNode(node.__key);
  }

  createDOM(config: EditorConfig): HTMLElement {
    const element = document.createElement('p');
    element.className = config.theme.banner;
    return element;
  }

  updateDOM(): false {
    return false;
  }

  insertNewAfter(
    _selection: RangeSelection,
    restoreSelection?: boolean | undefined
  ): LexicalNode | null {
    const newBlock = $createParagraphNode();
    const direction = this.getDirection();
    newBlock.setDirection(direction);
    this.insertAfter(newBlock, restoreSelection);
    return newBlock;
  }

  collapseAtStart(): boolean {
    const paragraph = $createParagraphNode();
    const children = this.getChildren();
    children.forEach((child) => paragraph.append(child));
    this.replace(paragraph);
    return true;
  }
}

export function $createBannerNode(): BannerNode {
  return new BannerNode();
}

export function $isBannerNode(node: LexicalNode): node is BannerNode {
  return node instanceof BannerNode;
}

export const INSERT_BANNER_COMMAND = createCommand('insertBanner');

export function BannerPlugin(): null {
  const [editor] = useLexicalComposerContext();
  if (!editor.hasNodes([BannerNode])) {
    throw new Error('BannerPlugin: BannerNode not registered on editor');
  }
  editor.registerCommand(
    INSERT_BANNER_COMMAND,
    () => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType_experimental(selection, $createBannerNode);
      }
      return true;
    },
    COMMAND_PRIORITY_LOW
  );
  return null;
}
