import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import ClickAwayListener from '@mui/base/ClickAwayListener'

import { useFuse } from '../../hooks/useFuse'
import data from '../../datas/datas.json'
import CustomTextField from '../atoms/TextField'
import Item from '../atoms/Item'
import ListVirtualized from '../atoms/ListVirtualized'

type Row = {
  index: number
  style: React.CSSProperties
}

type SearchProps = {
  keys: string[]
}

const MySearch = (props: SearchProps) => {
  const [value, setValue] = useState<string>('')
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { hits, query, onSearch, removeMark } = useFuse(data, {
    includeMatches: true,
    shouldSort: true,
    threshold: 0.1,
    location: 0,
    distance: 100,
    useExtendedSearch: true,
    keys: props.keys,
  })

  const Row = ({ index, style }: Row) => (
    <ListItem
      tabIndex={index}
      onClick={() => {
        setValue(removeMark(hits[index].activity))
        setIsOpen(false)
      }}
      style={style}
    >
      <Item {...hits[index]} key={index} />
    </ListItem>
  )

  useEffect(() => {
    setIsOpen(query.length > 1)
  }, [query])

  return (
    <ClickAwayListener onClickAway={() => setIsOpen(false)}>
      <SearchContainer>
        <CustomTextField
          name={'search'}
          type={'search'}
          className="search"
          label={'Search activity'}
          changeHandler={(e) => {
            onSearch(e.target.value)
            setValue(e.target.value)
          }}
          value={value}
          onFocus={() => {
            if (value.length > 1) setIsOpen(true)
          }}
        />
        {isOpen && (
          <ItemContainer className="ItemContainer">
            {hits.length > 0 ? (
              <ListVirtualized
                className="List"
                itemCount={hits.length}
                itemSize={85}
              >
                {Row}
              </ListVirtualized>
            ) : (
              <NoResults>No results</NoResults>
            )}
          </ItemContainer>
        )}
      </SearchContainer>
    </ClickAwayListener>
  )
}

export default MySearch

const NoResults = styled.p`
  text-align: center;
  width: 100%;
`

const SearchContainer = styled.div`
  position: relative;
`

const ItemContainer = styled.div`
  position: absolute;
  z-index: 10;
  top: 40px;
  border-left: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
  width: 100%;
  min-height: 50px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  max-height: 350px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
  .List {
    height: 340px;
  }
`

const ListItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  :nth-of-type(odd) {
    background-color: #f5f5f5;
  }
  :nth-of-type(even) {
    background-color: #fff;
  }
  .sub {
    color: #686980;
    font-size: 12px;
  }
  :hover {
    background-color: #e9e9e9;
  }
`
