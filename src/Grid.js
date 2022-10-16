import { useGridContext } from "./GridContext";

export default function Gird() {
  const {selectedColumns,filtered} = useGridContext();
  const columns = selectedColumns;
  const data = filtered;

  const th = columns.map((column) => <th key={column + "01"}>{column}</th>);

  const printTds = (record) => {
    const tds = [];
    const td = columns.map((column, index) => (
      <td key={column}>{record[column]}</td>
    ));
    tds.push(td);
    return tds;
  };

  const printTrs = () => {
    const trs = [];
    const tr = data.map((record) => (
      <tr key={record["id"]}>{printTds(record)}</tr>
    ));
    trs.push(tr);
    return trs;
  };

  return (
    <div>
      <h3>Users</h3>
      <table>
        <thead>
          <tr>{th}</tr>
        </thead>
        <tbody>{printTrs()}</tbody>
      </table>
    </div>
  );
}
