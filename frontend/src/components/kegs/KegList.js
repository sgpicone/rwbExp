import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { columnMaps, DefaultColumnFilter, GlobalFilter } from './utils/tableUtils';
import { Table } from 'react-bootstrap';
import { useTable, useGroupBy, useExpanded, useSortBy, useFilters, useGlobalFilter, useRowSelect } from 'react-table';
import { getKegs } from '../../actions/kegActions';
import useWindowDimensions from '../../hooks/windowSizeHook';
import IndeterminateCheckbox from '../common/IndeterminateCheckbox';



const KegList = ({ keg, loading, getKegs }) => {
  const [kegs, setKegs] = useState([]);
  const { height, width } = useWindowDimensions();


  useEffect(() => {
    if (!loading) {
      setKegs(keg.kegs);
    }
  }, []);

  useEffect(() => {
    if(width < 500) {
      setHiddenColumns([...hiddenColumns, 'currentLocation', 'nextWashChemical']);
    }
    else if (width < 750) {
      setHiddenColumns([...hiddenColumns, 'lastWashDate', 'lastSaniDate', 'lastBreakdown', 'lastFillDate', 'lastFillVolume']);
    }
    else if(width < 1000) {
      setHiddenColumns([...hiddenColumns, 'kegType', 'numIssues']);
    } else {
      setHiddenColumns([...initialHiddenColumns]);
    }
  }, [width]);

  const tableData = React.useMemo(() =>
    kegs, [kegs]
  );
  const columns = React.useMemo(
    () =>
      columnMaps.KEG_LIST, [kegs]
  );
  const initialSortColumns = React.useMemo(
    () =>
      columnMaps.KEG_LIST.filter(col => col.isSorted).map(col => ({ id: col.accessor || col.id, desc: col.isSortedDesc }))
  );
  const initialHiddenColumns = React.useMemo(
    () =>
      columns.filter(column => !column?.isVisible).map(column => column.accessor || column.id)
  );
  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter
    }),
    []
  );

  const kegListTable = useTable(
    {
      columns,
      data: tableData,
      initialState: {
        hiddenColumns: initialHiddenColumns,
        sortBy: initialSortColumns
      },
      defaultColumn
    },
    useFilters,
    useGlobalFilter,
    useGroupBy,
    useSortBy,
    useExpanded,
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

  if (loading || !kegs) {
    return <h1>please wait...</h1>
  }


  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    setHiddenColumns,
    selectedFlatRows,
    state: { groupBy, expanded, sortBy, globalFilter, hiddenColumns, selectedRowIds }
  } = kegListTable;

 

  return (
    <div className="row">
      <pre>width: {width} x height: {height}</pre>
      <div className="col-12">
        <Table responsive striped bordered hover {...getTableProps()}>
          <thead>
            <tr>
              <th colSpan={columns.length} className="text-center">Keg List</th>
            </tr>
            <tr>
              <th colSpan={columns.length}>
                <GlobalFilter
                  preGlobalFilteredRows={preGlobalFilteredRows}
                  globalFilter={globalFilter}
                  setGlobalFilter={setGlobalFilter}
                />
              </th>
            </tr>
            {
              headerGroups.map(grp => (
                <tr {...grp.getHeaderGroupProps()}>
                  {
                    grp.headers.map(column => (
                      <th className="text-center" {...column.getHeaderProps()}>
                        {column.canGroupBy ? (
                          // If the column can be grouped, let's add a toggle
                          <span className="text-muted" {...column.getGroupByToggleProps()}>
                            <sub>{column.isGrouped ? '[Ungroup] ' : '[Group] '}</sub>
                          </span>
                        ) : null}
                        <div>
                          {column.render('Header')}
                          <span {...column.getSortByToggleProps()}>
                            {column.isSorted
                              ? column.isSortedDesc
                                ? ' ⬇'
                                : ' ⬆'
                              : '↕'}
                          </span>
                        </div>

                      </th>
                    ))
                  }
                </tr>
              ))
            }
            {
              headerGroups.map(grp => (
                <tr {...grp.getHeaderGroupProps()}>
                  {
                    grp.headers.map(column => (
                      <th className="text-center" {...column.getHeaderProps()}>
                        <div>{column.canFilter ? column.render('Filter') : null}</div>
                      </th>
                    ))
                  }
                </tr>
              ))
            }
          </thead>
          <tbody {...getTableBodyProps()}>
            {// Loop over the table rows
              rows.map(row => {
                // Prepare the row for display
                prepareRow(row)
                return (
                  // Apply the row props
                  <tr {...row.getRowProps()}>
                    {// Loop over the rows cells
                      row.cells.map(cell => {
                        // Apply the cell props
                        return (
                          <td {...cell.getCellProps()}>
                            {cell.isGrouped ? (
                              // If it's a grouped cell, add an expander and row count
                              <>
                                <span {...row.getToggleRowExpandedProps()}>
                                  {row.isExpanded ? '👇' : '👉'}
                                </span>{' '}
                                {cell.render('Cell')} ({row.subRows.length})
                              </>
                            ) : cell.isAggregated ? (
                              // If the cell is aggregated, use the Aggregated
                              // renderer for cell
                              cell.render('Aggregated')
                            ) : cell.isPlaceholder ? null : ( // For cells with repeated values, render null
                              // Otherwise, just render the regular cell
                              cell.render('Cell')
                            )}
                          </td>
                        )
                      })}
                  </tr>
                )
              })}
          </tbody>
        </Table>
        <pre>
          <code>{JSON.stringify({ groupBy, expanded, sortBy, globalFilter, hiddenColumns, selectedRowIds }, null, 2)}</code>
        </pre>
      </div>
    </div>
  );
};
const mapStateToProps = state => ({
  keg: state.keg
});

export default connect(
  mapStateToProps,
  getKegs
)(KegList);
