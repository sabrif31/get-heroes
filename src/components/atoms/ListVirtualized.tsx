import { ComponentType } from 'react'
import styled from '@emotion/styled'
import {
  FixedSizeListProps,
  FixedSizeList as _FixedSizeList,
} from 'react-window'
import AutoSizer, { Size } from 'react-virtualized-auto-sizer'

const FixedSizeList = _FixedSizeList as ComponentType<FixedSizeListProps | Size>

type ListVirtualizedProps = {
  className: string
  itemCount: number
  itemSize: number
  children: any
}

const ListVirtualized = (props: ListVirtualizedProps) => {
  return (
    <DivAutoSizer className={props.className}>
      <AutoSizer>
        {({ height, width }: Size) => (
          <FixedSizeList
            height={height}
            itemCount={props.itemCount}
            itemSize={props.itemSize}
            width={width}
          >
            {props.children}
          </FixedSizeList>
        )}
      </AutoSizer>
    </DivAutoSizer>
  )
}

export default ListVirtualized

const DivAutoSizer = styled.div`
  flex: 1 1 auto;
`
