import React from 'react'
import ReactDom from 'react-dom'
import {
  ContentEdit,
  HyperLink,
  Paste,
  ImageEdit,
  CutPasteListChain,
  TableResize,
  CustomReplace,
  TableCellSelection,
  getDarkColor,
  EditorPlugin,
  EditorOptions,
} from 'roosterjs'
import EditorCore from 'roosterjs-editor-core'
import { ExperimentalFeatures } from 'roosterjs-editor-types'
import EditorApi from 'roosterjs-editor-api'
import EditorPlugins from 'roosterjs-editor-plugins'

import {
  AllButtonStringKeys,
  createRibbonPlugin,
  createUpdateContentPlugin,
  getButtons,
  RibbonPlugin,
  Ribbon,
  RibbonButton,
  Rooster,
  UpdateContentPlugin,
  UpdateMode,
  AllButtonKeys,
  createPasteOptionPlugin,
  createEmojiPlugin,
} from 'roosterjs-react'
import styled from '@emotion/styled'

type RibbonStringKeys = AllButtonStringKeys

let ribbonPlugin = createRibbonPlugin()
let emojiPlugin = createEmojiPlugin()
const Editor = () => {
  const [plugins, setPlugins] = React.useState(false)
  const [options, setOptions] = React.useState<EditorOptions>({})
  // let editor = <roosterjsReact.Rooster className="editor" {...options} />
  const buttons: RibbonButton<RibbonStringKeys>[] = getButtons([
    ...AllButtonKeys,
  ])
  // let ribbon = <roosterjsReact.Ribbon buttons={buttons} plugin={ribbonPlugin} />
  const emojiButton = {
    name: 'btnEmoji',
    onClick: () => emojiPlugin.onPluginEvent,
  }

  React.useEffect(() => {
    setOptions({
      plugins: [
        new ContentEdit(),
        new HyperLink((url) => 'Ctrl+Click to follow the link:' + url),
        new Paste(),
        new ImageEdit(),
        new CutPasteListChain(),
        new TableResize(),
        new CustomReplace(),
        new TableCellSelection(),
        ribbonPlugin,
      ],
      experimentalFeatures: [],
      getDarkColor,
    })
    setPlugins(true)
    /*
        'ListItemAlignment',
        'buttonNameAlignLeft',
        ExperimentalFeatures.ListItemAlignment,
        ExperimentalFeatures.AutoFormatList,
        ExperimentalFeatures.VariableBasedDarkColor,
        ExperimentalFeatures.ReusableContentModel,
        ExperimentalFeatures.InlineEntityReadOnlyDelimiters,
    */
    // let editorApi = roosterjsReact.getEditorApi(editor)
    return () => {
      // editorApi.dispose()
    }
  }, [])

  if (!plugins) return <div>Loading...</div>

  return (
    <DivAutoSizer>
      <Ribbon buttons={buttons} plugin={ribbonPlugin} />
      <Rooster className="editor" {...options} />
    </DivAutoSizer>
  )
}

export default Editor

const DivAutoSizer = styled.div`
  .editor {
    border: solid 1px black;
    width: 100%;
    height: 600px;
  }
`
/*
import { Ribbon, RibbonPlugin } from 'roosterjs-react-ribbon'

import RoosterJs from './RoosterJs'
import { ribbonButtonRenderer } from './ribbonButtonRenderer'

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

const Editor = () => (
  <div>
    <Ribbon
      ribbonPlugin={ribbonPlugin}
      className={'myRibbon'}
      buttonRenderer={ribbonButtonRenderer}
      buttonNames={ribbonButtons}
      additionalButtons={{ emoji: emojiButton }}
    />
    <RoosterJs
      className={'editor'}
      viewState={viewState}
      plugins={[ribbonPlugin, emojiPlugin]}
    />
  </div>
)
window.addEventListener('resize', () => ribbonPlugin.resize())

export default Editor
*/
/*
let ribbonPlugin = roosterjsReact.createRibbonPlugin()
let plugins = [
  new roosterjs.ContentEdit(),
  new roosterjs.HyperLink((url) => 'Ctrl+Click to follow the link:' + url),
  new roosterjs.Paste(),
  new roosterjs.ImageEdit(),
  new roosterjs.CutPasteListChain(),
  new roosterjs.TableResize(),
  new roosterjs.CustomReplace(),
  new roosterjs.TableCellSelection(),
  ribbonPlugin,
]
let options: roosterjs.EditorOptions = {
  plugins: plugins,
  experimentalFeatures: [
    'ListItemAlignment',
    ExperimentalFeatures.DefaultFormatInSpan,
    ExperimentalFeatures.AutoFormatList,
    ExperimentalFeatures.VariableBasedDarkColor,
    ExperimentalFeatures.ReusableContentModel,
    ExperimentalFeatures.InlineEntityReadOnlyDelimiters,
  ],
  getDarkColor: roosterjs.getDarkColor,
}
*/
