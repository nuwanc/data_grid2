import { useGridContext, useGridContextDispatch } from "./GridContext";

export default function FilterBar() {
  const {filterValues,} = useGridContext();
  const dispath = useGridContextDispatch();

  const onRemove = (name) => {
    dispath({
      type: "remove_filter",
      name: name
    });
  };

  const filters = Object.entries(filterValues).map((e) => {
    let name = e[0];
    return e[1] === undefined || e[1] === "" ? null : (
      <span key={e[0] + "01"}>
        {e[0]}:{e[1]}
        <button onClick={(e) => onRemove(name)}>x</button>|
      </span>
    );
  });

  return <div>{filters}</div>;
}
