import { readFile } from 'fs/promises';
import { join } from 'path';

import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { HashtagNode } from '@lexical/hashtag';
import { createHeadlessEditor } from '@lexical/headless';
import { LinkNode, AutoLinkNode } from '@lexical/link';
import { ListNode, ListItemNode } from '@lexical/list';
import { MarkNode } from '@lexical/mark';
import { $convertFromMarkdownString, TRANSFORMERS } from '@lexical/markdown';
import { OverflowNode } from '@lexical/overflow';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { TableNode, TableCellNode, TableRowNode } from '@lexical/table';
import { LineBreakNode, ParagraphNode, TextNode } from 'lexical';

async function getMarkdownFile() {
  const filePath = join(__dirname, '../examples/markdown.md');
  const data = await readFile(filePath, 'utf-8');
  return data;
}

async function run() {
  const markdown = await getMarkdownFile();

  const editor = createHeadlessEditor({
    nodes: [
      LineBreakNode,
      ParagraphNode,
      TextNode,
      LinkNode,
      HeadingNode,
      QuoteNode,
      ListNode,
      ListItemNode,
      CodeHighlightNode,
      CodeNode,
      HashtagNode,
      MarkNode,
      OverflowNode,
      TableNode,
      TableCellNode,
      TableRowNode,
      AutoLinkNode,
    ],
  });

  // eslint-disable-next-line @typescript-eslint/await-thenable
  await editor.update(() => {
    $convertFromMarkdownString(markdown, TRANSFORMERS);
  });

  return editor.getEditorState().toJSON();
}

// eslint-disable-next-line no-console
run().then(console.log).catch(console.error);
