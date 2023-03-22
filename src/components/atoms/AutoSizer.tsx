import React, { useEffect, useState, ReactElement, ReactPortal } from 'react'
import styled from '@emotion/styled'
import ClickAwayListener from '@mui/base/ClickAwayListener'
import { FixedSizeList as List } from 'react-window'
import AutoSizer, { Size } from 'react-virtualized-auto-sizer'

type ReactText = string | number
type ReactChild = ReactElement | ReactText

interface ReactNodeArray extends Array<ReactNode> {}
type ReactFragment = {} | ReactNodeArray
type ReactNode =
  | ReactChild
  | ReactFragment
  | ReactPortal
  | boolean
  | null
  | undefined

type AutoSizerProps = {
  className: string
  itemCount: number
  itemSize: number
  children: ReactNode
}

const AutoSizerCustom = (props: AutoSizerProps) => {
  return (
    <AutoSizer>
      {({ height, width }: Size) => (
        <List
          className={props.className}
          height={height}
          itemCount={props.itemCount}
          itemSize={props.itemSize}
          width={width}
        />
      )}
    </AutoSizer>
  )
}

export default AutoSizerCustom
