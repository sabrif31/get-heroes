import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'

import ListVirtualized from '../atoms/ListVirtualized'
import { toast } from 'react-toastify'

type Row = {
  index: number
  style: React.CSSProperties
}

type AbletonProject = {
  name: string
  folder: string
}

interface AbletonProps extends AbletonProject {
  time: string
}

/*
type SearchProps = {
  datas: AbletonProps[]
}
*/

const BASE_URL = 'http://localhost:9999/'

const AbletonProjectFiles = () => {
  const notify = () => toast("Le projet est entrain de s'ouvrir !")
  const [files, setFiles] = useState<AbletonProps[]>([])

  useEffect(() => {
    const getAbletonProjectFiles = async () => {
      const data = await fetch(BASE_URL + 'ableton/project/files').then(
        (response) => response.json()
      )
      setFiles(data.datas)
    }
    getAbletonProjectFiles()
  }, [])

  const openProject = (data: AbletonProject) => {
    const openAbletonProjectFiles = async () => {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: data.name, folder: data.folder }),
      }
      await fetch(BASE_URL + 'ableton/open/project', requestOptions).then(
        (results) => results.json()
      )
      notify()
    }
    openAbletonProjectFiles()
  }

  const Row = ({ index, style }: Row) => (
    <ListItem
      className={index % 2 ? 'list-item-odd' : 'list-item-even'}
      tabIndex={index}
      onClick={() =>
        openProject({
          name: files[index]?.name,
          folder: files[index]?.folder,
        })
      }
      style={style}
    >
      <div style={{ width: '100%' }} key={index}>
        <div>📋{files[index]?.name}</div>
        <div>📁{files[index]?.folder}</div>
        <div>
          📅
          {files[index]?.time.split('T')[0].split('-').reverse().join('-') +
            ' ' +
            files[index]?.time.split('T')[1].split('.')[0]}
        </div>
      </div>
    </ListItem>
  )

  return (
    <AbletonProjectFilesContainer>
      <ListItem
        style={{
          borderBottom: 'none !important',
          border: '1px solid #e0e0e0',
          width: '98.4%',
        }}
      >
        <div style={{ width: '100%' }}>
          <div>📋FileName</div>
          <div
            style={{
              width: '221px',
            }}
          >
            📁 Folder
          </div>
          <div
            style={{
              width: '250px',
            }}
          >
            📅 Date
          </div>
        </div>
      </ListItem>
      <ItemContainer className="ItemContainer">
        {files.length > 0 ? (
          <ListVirtualized
            className="List"
            itemCount={files.length}
            itemSize={75}
          >
            {Row}
          </ListVirtualized>
        ) : (
          <NoResults>No results</NoResults>
        )}
      </ItemContainer>
    </AbletonProjectFilesContainer>
  )
}

export default AbletonProjectFiles

const NoResults = styled.p`
  text-align: center;
  width: 100%;
`

const AbletonProjectFilesContainer = styled.div`
  position: relative;
  height: 400px;
`

const ItemContainer = styled.div`
  position: absolute;
  z-index: 10;
  /*border-left: 1px solid #e0e0e0;*/
  border: 1px solid #e0e0e0;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
  .List {
    height: 400px;
  }
`

const ListItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  &.list-item-odd {
    background-color: #f5f5f5;
  }
  &.list-item-even {
    background-color: #fff;
  }
  /*
  :nth-of-type(odd) {
    background-color: #f5f5f5;
  }
  :nth-of-type(even) {
    background-color: #fff;
  }
  */
  .sub {
    color: #686980;
    font-size: 12px;
  }
  :hover {
    background-color: #e9e9e9;
  }

  div {
    display: flex;
    justify-content: space-between;
    height: 100%;
    align-items: center;

    div:first-of-type {
      display: flex;
      width: 400px;
      align-items: center;
    }

    div:nth-of-type(2) {
      display: flex;
      width: 222px;
      align-items: center;
    }

    div:last-of-type {
      display: flex;
      width: 250px;
      align-items: center;
    }
  }
`
