import { useMemo } from "react"
import { Table } from "react-bootstrap";
import { usePagination, useRowSelect, useTable } from "react-table"
import IndeterminateCheckbox from "../../common/IndeterminateCheckbox";
import { columnTypes, formatData } from "../utils/tableUtils";

const DirtyTable = ({ kegs: dirtyKegs }) => {

    const data = useMemo(() => dirtyKegs, []);
    const columns = useMemo(() => [
        {
            Header: "RWB ID",
            accessor: "rwbId"
        },
        {
            Header: "Next Wash",
            accessor: "nextWashChemical"
        },
        {
            Header: "Last Wash",
            accessor: "lastWashChemical"
        },
        {
            Header: "Last Breakdown",
            accessor: "lastBreakdown",
            Cell: ({ value }) => formatData(value, columnTypes.SHORT_DATE)
        }
    ], []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        selectedFlatRows,
        state: { selectedRowIds }
    } = useTable({
        columns,
        data,
    },
        useRowSelect,
        hooks => {
            hooks.visibleColumns.push(columns => [
                // Let's make a column for selection
                {
                    id: 'selection',
                    // The header can use the table's getToggleAllRowsSelectedProps method
                    // to render a checkbox
                    Header: ({ getToggleAllRowsSelectedProps }) => (
                        <div>
                            <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
                        </div>
                    ),
                    // The cell can use the individual row's getToggleRowSelectedProps method
                    // to the render a checkbox
                    Cell: ({ row }) => (
                        <div>
                            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                        </div>
                    ),
                },
                ...columns,
            ])
        }
    );

    return (
        <>
            <Table responsive striped hover {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <p>Selected Rows: {Object.keys(selectedRowIds).length}</p>
            <pre>
                <code>
                    {JSON.stringify(
                        {
                            selectedRowIds: selectedRowIds,
                            'selectedFlatRows[].original': selectedFlatRows.map(
                                d => d.original
                            ),
                        },
                        null,
                        2
                    )}
                </code>
            </pre>
        </>
    )
}

export default DirtyTable;