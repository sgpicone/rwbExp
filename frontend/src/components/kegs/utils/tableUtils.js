import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useAsyncDebounce } from 'react-table';

export function SelectColumnFilter({
    column: { filterValue, setFilter, preFilteredRows, id },
}) {
    // Calculate the options for filtering
    // using the preFilteredRows
    const options = React.useMemo(() => {
        const options = new Set()
        preFilteredRows.forEach(row => {
            options.add(row.values[id])
        })
        return [...options.values()]
    }, [id, preFilteredRows])

    // Render a multi-select box
    return (
        <select
            value={filterValue}
            onChange={e => {
                setFilter(e.target.value || undefined)
            }}
        >
            <option value="">All</option>
            {options.map((option, i) => (
                <option key={i} value={option}>
                    {option}
                </option>
            ))}
        </select>
    )
}

// Define a default UI for filtering
export function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
}) {
    const count = preGlobalFilteredRows.length
    const [value, setValue] = useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined);
    }, 200);

    return (
        <span>
            Search:{' '}
            <input
                value={value || ""}
                onChange={e => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                }}
                placeholder={`${count} records...`}
                style={{
                    fontSize: '1.1rem',
                    border: '0',
                    width: '50%'
                }}
            />
        </span>
    )
}

export function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
  }) {
    const count = preFilteredRows.length
  
    return (
      <input
        value={filterValue || ''}
        onChange={e => {
          setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
        }}
        placeholder={`Search ${count} records...`}
      />
    )
  }

export const formatData = (value, type) => {
    switch (type) {
        case columnTypes.DATE:
            return value ? new Date(value).toLocaleString() : "N/A";
        case columnTypes.SHORT_DATE:
            return value ? new Date(value).toLocaleDateString() : "N/A";
        case columnTypes.BOOLEAN:
            return !!value ? "YES" : "NO";
        case columnTypes.TRUNC_STRING:
            return value ? `${String(value).substring(0, 7).trimEnd()}${String(value).length > 7 ? '...' : ''}` : "NONE"
        default:
            return value;
    }
}

export const columnTypes = {
    DATE: "date",
    SHORT_DATE: "short-date",
    NUMBER: "number",
    STRING: "string",
    TRUNC_STRING: "truncateable-string",
    BOOLEAN: "boolean"
};

export const columnMaps = {
    FILL_HISTORY: {
        fillDate: {
            hdr: "Date",
            type: columnTypes.SHORT_DATE
        },
        beer: {
            hdr: "Beer",
            type: columnTypes.STRING
        },
        volume: {
            hdr: "Fill Volume",
            type: columnTypes.STRING
        }
    },
    WASH_HISTORY: {
        washDate: {
            hdr: "Date",
            type: columnTypes.SHORT_DATE
        },
        chemical: {
            hdr: "Chemical",
            type: columnTypes.STRING
        },
        chemicalType: {
            hdr: "Type",
            type: columnTypes.STRING
        }
    },
    SANI_HISTORY: {
        saniDate: {
            hdr: "Date",
            type: columnTypes.SHORT_DATE
        },
        chemical: {
            hdr: "Chemical",
            type: columnTypes.STRING
        },
        chemicalType: {
            hdr: "Type",
            type: columnTypes.STRING
        }
    },
    BREAKDOWN_HISTORY: {
        breakdownDate: {
            hdr: "Date",
            type: columnTypes.SHORT_DATE
        },
        rwbId: {
            hdr: "Keg ID",
            type: columnTypes.STRING
        }
    },
    ISSUE_HISTORY: {
        issueDate: {
            hdr: "Date",
            type: columnTypes.SHORT_DATE
        },
        reporter: {
            hdr: "Reporter",
            type: columnTypes.STRING
        },
        issue: {
            hdr: "Issue",
            type: columnTypes.STRING
        },
        resolved: {
            hdr: "Resolved",
            type: columnTypes.BOOLEAN
        }
    },
    KEG_TAP_TABLE: {
        rwbId: {
            hdr: "RWB Id",
            type: columnTypes.STRING
        },
        lastFillBeer: {
            hdr: "Last Fill Beer",
            type: columnTypes.STRING
        },
        lastFillVolume: {
            hdr: "Last Fill Volume",
            type: columnTypes.NUMBER
        },
        location: {
            hdr: "Location",
            type: columnTypes.STRING
        },
    },
    KEG_LIST: [
        {
            Header: 'RWB ID',
            accessor: 'rwbId',
            isVisible: true,
            Cell: ({ value }) => (<Link to={`/kegs/${value}`}>{value}</Link>),
            isSorted: true,
            canGroupBy: false,
        },
        {
            Header: 'Status',
            accessor: 'status',
            isVisible: true,
            aggregate: 'count',
            Aggregated: ({ value }) => `${value} Kegs`,
            isSorted: true,
            canGroupBy: true,
            Filter: SelectColumnFilter,
            filter: 'equals',
            
        },
        {
            Header: 'Current Location',
            accessor: 'currentLocation',
            isVisible: true,
            aggregate: 'count',
            Aggregated: ({ value }) => `${value} Kegs`,
            canGroupBy: true,
            Filter: SelectColumnFilter,
            filter: 'equals',
            
        },
        {
            Header: 'Last Wash Date',
            accessor: 'lastWashDate',
            Cell: ({ value }) => formatData(value, columnTypes.SHORT_DATE),
            isVisible: true,
            canGroupBy: true,
            disablefilters: true,
            disableFilters: true,
        },
        {
            Header: 'Last Wash',
            accessor: 'lastWashChemical',
            isVisible: true,
            canGroupBy: true,
            Filter: SelectColumnFilter,
            filter: 'equals',
            
        },
        {
            Header: 'Next Wash',
            accessor: 'nextWashChemical',
            isVisible: true,
            aggregate: 'count',
            Aggregated: ({ value }) => `${value} Kegs`,
            canGroupBy: true,
            Filter: SelectColumnFilter,
            filter: 'equals',
            
        },
        {
            Header: 'Last Sani Date',
            accessor: 'lastSaniDate',
            Cell: ({ value }) => formatData(value, columnTypes.SHORT_DATE),
            isVisible: true,
            canGroupBy: false,
            disableFilters: true,
        },
        {
            Header: 'Last Breakdown',
            accessor: 'lastBreakdown',
            Cell: ({ value }) => formatData(value, columnTypes.SHORT_DATE),
            isVisible: true,
            canGroupBy: false,
            disableFilters: true,
        },
        {
            Header: 'Last Fill Date',
            accessor: 'lastFillDate',
            Cell: ({ value }) => formatData(value, columnTypes.SHORT_DATE),
            canGroupBy: false,
            isVisible: true,
            disableFilters: true,
        },
        {
            Header: 'Last Fill Beer',
            accessor: 'lastFillBeer',
            Cell: ({ value }) => formatData(value, columnTypes.STRING),
            canGroupBy: true,
            isVisible: true,
            Filter: SelectColumnFilter,
            filter: 'equals',
            className: "hidden",
            columnClassName: "hidden"
        },
        {
            Header: 'Last Fill Volume',
            accessor: 'lastFillVolume',
            canGroupBy: false,
            isVisible: true,
            disableFilters: true,
        },
        {
            Header: 'Num Issues',
            accessor: 'numIssues',
            canGroupBy: false,
            isVisible: true,
            disableFilters: true,
        },
        {
            Header: 'Factory Serial',
            accessor: 'factorySerial',
            isVisible: false,
            canGroupBy: false,
            disableFilters: true,
        },
        {
            Header: 'Received Date',
            accessor: 'receivedDate',
            Cell: ({ value }) => formatData(value, columnTypes.SHORT_DATE),
            canGroupBy: true,
            isVisible: false,
            disableFilters: true,
        },
        {
            Header: 'Used',
            accessor: 'used',
            Cell: ({ value }) => formatData(value, columnTypes.BOOLEAN),
            canGroupBy: false,
            isVisible: false,
            disableFilters: true,
        },
        {
            Header: 'Notes',
            accessor: 'notes',
            canGroupBy: false,
            isVisible: false,
            disableFilters: true,
        },
        {
            Header: 'Keg Type',
            accessor: 'kegType',
            canGroupBy: true,
            isVisible: true,
            Filter: SelectColumnFilter,
            filter: 'equals',            
        }
    ]
}

