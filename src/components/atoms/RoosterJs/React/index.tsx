import { createEditorViewState, EmojiPlugin } from 'roosterjs-react'
import { Ribbon, RibbonPlugin } from 'roosterjs-react-ribbon'

import ReactEditor from './ReactEditor'
import { ribbonButtonRenderer } from './ribbonButtonRenderer'
import styled from '@emotion/styled'

const viewState = createEditorViewState('Hello ReactEditor!')
const ribbonPlugin = new RibbonPlugin()
const emojiPlugin = new EmojiPlugin()
const emojiButton = {
  name: 'btnEmoji',
  onClick: (editor) => emojiPlugin.startEmoji(),
}
const ribbonButtons = [
  'emoji',
  'bold',
  'italic',
  'underline',
  'font',
  'size',
  'bkcolor',
  'color',
  'bullet',
  'number',
  'indent',
  'outdent',
  'quote',
  'left',
  'center',
  'right',
  'link',
  'unlink',
  'sub',
  'super',
  'strike',
  'alttext',
  'ltr',
  'rtl',
  'undo',
  'redo',
  'unformat',
]
const RoosterEditor = () => (
  <ReactEditorContainer>
    <Ribbon
      ribbonPlugin={ribbonPlugin}
      className={'myRibbon'}
      buttonRenderer={ribbonButtonRenderer}
      buttonNames={ribbonButtons}
      additionalButtons={{ emoji: emojiButton }}
    />
    <ReactEditorStyles
      className={'editor'}
      viewState={viewState}
      plugins={[ribbonPlugin, emojiPlugin]}
    />
  </ReactEditorContainer>
)
window.addEventListener('resize', () => ribbonPlugin.resize())
export default RoosterEditor
// ReactDom.render(editor, container, null)

const ReactEditorContainer = styled.div`
  border: 1px solid #ccc !important;
  width: 100%;
  height: 300px;
  border-radius: 4px;
  .myRibbon {
    div {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
`

const ReactEditorStyles = styled(ReactEditor)`
  border: none;
  width: 100%;
  height: calc(100% - 48px);
  background-color: #f3f3f3;
  outline: 0;
  padding: 10px;
  overflow: auto;
`
