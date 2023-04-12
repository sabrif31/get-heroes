import { FC, ReactElement, useState, useEffect } from 'react'
import BlockBox from '../organisms/Box'
import Search from '../molecules/Search'
import MySearch from '../molecules/SearchV2'
import AbletonProjectFiles from '../molecules/AbletonProjectFiles'
import TableVirtual from '../atoms/TableVirtual'

const BASE_URL = 'http://localhost:9999/'

type AbletonProject = {
  name: string
  folder: string
}

interface AbletonProps extends AbletonProject {
  time: string
}

const SearchPage: FC = (): ReactElement => {
  const [files, setFiles] = useState<AbletonProps[]>([])
  const [columns] = useState([
    {
      accessorKey: 'name',
      header: () => '📋 Name',
      size: 500,
      cell: (info: any) => {
        return '📋 ' + info.getValue()
      },
    },
    {
      accessorKey: 'folder',
      header: () => '📁 Folder',
      size: 250,
      cell: (info: any) => {
        return '📁 ' + info.getValue()
      },
    },
    {
      accessorKey: 'time',
      header: '📅 Time',
      size: 200,
      cell: (info: any) => {
        const date = info.getValue().toLocaleString() // <Date>
        return (
          '📅 ' +
          date.split('T')[0].split('-').reverse().join('-') +
          ' ' +
          date.split('T')[1].split('.')[0]
        )
      },
    },
  ])

  useEffect(() => {
    const getAbletonProjectFiles = async () => {
      const data = await fetch(BASE_URL + 'ableton/project/files').then(
        (response) => response.json()
      )
      setFiles(data.datas)
    }
    getAbletonProjectFiles()
  }, [])

  return (
    <BlockBox>
      <h2>First test</h2>
      <Search keys={['activity', 'category', 'sector']} />
      <h2>Second test with hook</h2>
      <MySearch keys={['activity', 'category', 'sector']} />
      <h2>Ableton Project Files</h2>
      <AbletonProjectFiles />
      <h2>Table Virtual</h2>
      <TableVirtual datas={files} columns={columns} />
    </BlockBox>
  )
}

export default SearchPage
