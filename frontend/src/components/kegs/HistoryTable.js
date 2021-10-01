import { Table } from 'react-bootstrap';
import { formatData } from './utils/tableUtils'



const HistoryTable = ({ title, data, columnMap }) => {
    if(!data || !data.length) {
        return <div></div>;
    }

    return (
        <Table striped bordered hover>
            <thead>
                {title ? (<tr>
                    <th className="text-center" colspan={Object.keys(columnMap).length}>{title}</th>
                </tr>) : null}
                <tr>
                    {Object.keys(columnMap).map(key => (
                        <th>{columnMap[key].hdr}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map(item => (
                    <tr>
                        {Object.keys(item).map(k => (
                            <td>{formatData(item[k], columnMap[k].type)}</td>
                        ))}
                    </tr>
                )
                )}
            </tbody>
        </Table>
    )
}

export default HistoryTable;