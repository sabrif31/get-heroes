import styled from '@emotion/styled'
import { FixedSizeList as List } from 'react-window'
import AutoSizer, { Size } from 'react-virtualized-auto-sizer'

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
          <List
            height={height}
            itemCount={props.itemCount}
            itemSize={props.itemSize}
            width={width}
          >
            {props.children}
          </List>
        )}
      </AutoSizer>
    </DivAutoSizer>
  )
}

export default ListVirtualized

const DivAutoSizer = styled.div`
  flex: 1 1 auto;
`
