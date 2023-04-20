import { FC, ReactElement } from 'react'
import BlockBox from '../organisms/Box'
import RoosterEditor from '../atoms/RoosterJs/React'
import styled from '@emotion/styled'
import { Typography } from '@mui/material'

const RoosterJsPage: FC = (): ReactElement => {
  return (
    <BlockBox>
      <FormTypography variant={'h4'}>RoosterJS</FormTypography>
      <RoosterEditor />
    </BlockBox>
  )
}

export default RoosterJsPage

const FormTypography = styled(Typography)`
  margin: 0px 0 8px 0;
`
