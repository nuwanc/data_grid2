import { useState, useEffect } from "react";
import { useGridContext, useGridContextDispatch } from "./GridContext";

export default function Filter() {
  const [values, setValues] = useState({});
  const {filterValues,selectedColumns} = useGridContext();
  const dispatch = useGridContextDispatch();

  useEffect(() => {
    setValues({
      ...filterValues
    });
  }, [filterValues]);

  const onFilter = () => {
    dispatch({
      type: "apply_filters",
      payload: values
    });
  };

  const onReset = () => {
    setValues({});
    dispatch({
      type: "apply_filters",
      payload: {}
    });
  };

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setValues((values) => ({
      ...values,
      [name]: value
    }));
  };

  const columnList = selectedColumns.map((column) => {
    return (
      <span key={column + "01"}>
        <label>{column}:</label>
        <input
          type="text"
          name={column}
          value={values[column] !== undefined ? values[column] : ""}
          onChange={onChangeHandler}
        />
        <br />
      </span>
    );
  });
  return (
    <div align="left">
      {columnList}
      <button onClick={onFilter}>Filter</button>
      <button onClick={onReset}>Reset</button>
    </div>
  );
}
