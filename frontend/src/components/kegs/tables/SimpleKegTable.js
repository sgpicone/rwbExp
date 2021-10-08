import { Table } from 'react-bootstrap';
import { formatData } from '../utils/tableUtils'



const SimpleKegTable = ({ data, columnMap }) => {
    if(!data || !data.length) {
        console.log("no data");
        console.log(data);
        return <div></div>;
    }

    return (
        <Table striped bordered hover>
            <thead>
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

export default SimpleKegTable;