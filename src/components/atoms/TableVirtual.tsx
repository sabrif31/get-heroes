import React, { useEffect } from 'react'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { useVirtual } from 'react-virtual'
import styled from '@emotion/styled'
import { toast } from 'react-toastify'

// import './index.css'

type AbletonProject = {
  name: string
  folder: string
  time: string
}

type TableVirtualProps = {
  datas: AbletonProject[]
  columns: ColumnDef<AbletonProject>[]
}

const BASE_URL = 'http://localhost:9999/'

const TableVirtual = (props: TableVirtualProps) => {
  const notify = () => toast("Le projet est entrain de s'ouvrir !")

  const [sorting, setSorting] = React.useState<SortingState>([])

  const columns = React.useMemo<ColumnDef<AbletonProject>[]>(
    () => props.columns,
    []
  )

  const table = useReactTable({
    data: props.datas,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  })

  const tableContainerRef = React.useRef<HTMLDivElement>(null)

  const { rows } = table.getRowModel()
  const rowVirtualizer = useVirtual({
    parentRef: tableContainerRef,
    size: rows.length,
    overscan: 10,
  })
  const { virtualItems: virtualRows, totalSize } = rowVirtualizer

  const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0
  const paddingBottom =
    virtualRows.length > 0
      ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0)
      : 0

  /**
   * MOVE THIS TO PARENT
   */
  const openProject = (row: Row<AbletonProject>) => {
    const openAbletonProjectFiles = async () => {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: row.getValue('name'),
          folder: row.getValue('folder'),
        }),
      }
      await fetch(BASE_URL + 'ableton/open/project', requestOptions).then(
        (results) => results.json()
      )
      notify()
    }
    openAbletonProjectFiles()
  }

  return (
    <div className="p-2">
      <div className="h-2" />
      <Container ref={tableContainerRef} className="container">
        <Table>
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <Th
                      key={header.id}
                      colSpan={header.colSpan}
                      style={{ width: header.getSize() }}
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? 'cursor-pointer select-none'
                              : '',
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: ' 🔼',
                            desc: ' 🔽',
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      )}
                    </Th>
                  )
                })}
              </tr>
            ))}
          </Thead>
          <tbody>
            {paddingTop > 0 && (
              <tr>
                <Td style={{ height: `${paddingTop}px` }} />
              </tr>
            )}
            {virtualRows.map((virtualRow) => {
              const row = rows[virtualRow.index] as Row<AbletonProject>
              return (
                <tr
                  key={row.id}
                  onClick={() => openProject(row)}
                  style={{ cursor: 'pointer' }}
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <Td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </Td>
                    )
                  })}
                </tr>
              )
            })}
            {paddingBottom > 0 && (
              <tr>
                <Td style={{ height: `${paddingBottom}px` }} />
              </tr>
            )}
          </tbody>
        </Table>
      </Container>
      {/*
      <div>{table.getRowModel().rows.length} Rows</div>
      <div>
        <button onClick={() => rerender()}>Force Rerender</button>
      </div>
        */}
    </div>
  )
}

export default TableVirtual

const Table = styled.table`
  border-collapse: collapse;
  border-spacing: 0;
  font-family: arial, sans-serif;
  table-layout: fixed;
  width: 100%;
`
const Thead = styled.thead`
  background: lightgray;
  margin: 0;
  position: sticky;
  top: 0;
`
const Th = styled.th`
  border-bottom: 1px solid lightgray;
  border-right: 1px solid lightgray;
  padding: 2px 4px;
  text-align: left;
`
const Td = styled.td`
  padding: 6px;
`
const Container = styled.div`
  border: 1px solid lightgray;
  height: 300px;
  overflow: auto;
`
