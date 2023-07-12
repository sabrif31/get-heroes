import { FC } from 'react'
import BlockBox from '../organisms/Box'
import Editor from '../atoms/lexical/Lexical'

const LexicalPage: FC = (): JSX.Element => {
  return (
    <BlockBox>
      <Editor />
    </BlockBox>
  )
}

export default LexicalPage
