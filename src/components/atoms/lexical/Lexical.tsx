import { v4 } from 'uuid'
import ExampleTheme from './ExampleTheme'
import {
  InitialConfigType,
  LexicalComposer,
} from '@lexical/react/LexicalComposer'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import ToolbarPlugin from './plugins/ToolbarPlugin'
import { HeadingNode, QuoteNode } from '@lexical/rich-text'
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table'
import { ListItemNode, ListNode } from '@lexical/list'
import { CodeHighlightNode, CodeNode } from '@lexical/code'
import { $generateHtmlFromNodes } from '@lexical/html'
import { AutoLinkNode, LinkNode } from '@lexical/link'
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin'
import { ListPlugin } from '@lexical/react/LexicalListPlugin'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin'
import { TRANSFORMERS } from '@lexical/markdown'
/*
import ListMaxIndentLevelPlugin from './plugins/ListMaxIndentLevelPlugin'
import CodeHighlightPlugin from './plugins/CodeHighlightPlugin'
import AutoLinkPlugin from './plugins/AutoLinkPlugin'
*/
import React from 'react'
import { LexicalEditor } from 'lexical/LexicalEditor'
import { EditorState } from 'lexical'

import './lexical.css'

function Placeholder() {
  return <div className="editor-placeholder">Enter some rich text...</div>
}

export interface EditorProps {
  onPublished?: (p: EditorState) => void
  editable?: boolean
  initalEditorState?: EditorState
}

export default function Editor({
  onPublished,
  editable = true,
  initalEditorState,
}: EditorProps) {
  const editorStateRef = React.useRef<EditorState | null>(null)
  const editorRef = React.useRef<LexicalEditor | null>(null)

  const editorConfig: InitialConfigType = React.useMemo(
    () => ({
      // The editor theme
      theme: ExampleTheme,
      // Handling of errors during update
      onError(error: Error, editor: LexicalEditor) {
        throw error
      },
      // Any custom nodes go here
      nodes: [
        HeadingNode,
        ListNode,
        ListItemNode,
        QuoteNode,
        CodeNode,
        CodeHighlightNode,
        TableNode,
        TableCellNode,
        TableRowNode,
        AutoLinkNode,
        LinkNode,
      ],
      namespace: `Editor ${v4()}`,
      editable,
      editorState: initalEditorState,
    }),
    [editable, initalEditorState]
  )

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="editor-container">
        {editable && <ToolbarPlugin />}
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={<Placeholder />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          {editable && (
            <>
              <HistoryPlugin />
              <AutoFocusPlugin />
              <ListPlugin />
              <LinkPlugin />
              <OnChangePlugin
                onChange={(editorState, editor) => {
                  editorStateRef.current = editorState
                  editorRef.current = editor
                }}
                ignoreSelectionChange
              />
              <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
            </>
          )}
        </div>
      </div>
    </LexicalComposer>
  )
}
