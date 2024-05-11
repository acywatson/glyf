import {
  COMMAND_PRIORITY_LOW,
  createCommand,
  type EditorConfig,
  type LexicalNode,
  $getSelection,
  $isRangeSelection,
  ElementNode,
  type RangeSelection,
  $createParagraphNode,
  type NodeKey
} from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $setBlocksType_experimental } from '@lexical/selection';

// could be hex with alpha appended, potentially
export type RGBValues = [number, number, number];

export class BannerNode extends ElementNode {
  constructor(colorRgb?: [number, number, number], key?: NodeKey) {
    super(key);
    // color should all be constants
    this.__colorRgb = colorRgb ?? [138, 43, 226];
  }

  static getType(): string {
    return 'banner';
  }

  static clone(node: BannerNode): BannerNode {
    return new BannerNode(node.__colorRgb, node.__key);
  }

  createDOM(config: EditorConfig): HTMLElement {
    const element = document.createElement('p');
    element.className = config.theme.banner;
    const rgbString = this.__colorRgb.join();
    // probably safe to ignore if we validate values
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    element.style.backgroundColor = `rgba(${rgbString},0.3)`;
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    element.style.borderLeft = `4px solid rgba(${rgbString},1)`;
    return element;
  }

  updateDOM(prevNode: HTMLElement, domNode: HTMLElement): boolean {
    return (
      prevNode.style?.backgroundColor !== domNode.style.backgroundColor ||
      prevNode.style?.borderLeft !== domNode.style.borderLeft
    );
  }

  setColor(colorRgb: RGBValues): void {
    // should validate values here
    this.getWritable().__colorRgb = colorRgb;
  }

  getColor(): RGBValues {
    return this.getLatest().__colorRgb;
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

export function $createBannerNode(colorRgb?: RGBValues): BannerNode {
  return new BannerNode(colorRgb);
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
