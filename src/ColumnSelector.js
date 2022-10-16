import { useGridContext, useGridContextDispatch } from "./GridContext";

export default function ColumnSelector({ onColumnChange }) {
  const {columns, selectedColumns} = useGridContext();
  const dispatch = useGridContextDispatch();

  const addColumn = (name) => {
    dispatch({
      type: "add_column",
      name: name
    });
  };

  const removeColumn = (name) => {
    dispatch({
      type: "remove_column",
      name: name
    });
  };

  const columnList = columns.map((column) => (
    <li key={column + "01"}>
      {column}:
      {selectedColumns.includes(column)?<button onClick={(e) => removeColumn(column)}><span role="img" aria-label="remove">❌</span></button>:<button onClick={(e) => addColumn(column)}><span role="img" aria-label="add">✔️</span></button>}
    </li>
  ));

  return (
    <div>
      Column Selector
      <ol>{columnList}</ol>
    </div>
  );
}
