import "./styles.css";
import ColumnSelector from "./ColumnSelector";
import Filter from "./Filter";
import FilterBar from "./FilterBar";
import Grid from "./Grid";
import { GridProvider } from "./GridContext";

export default function App() {
  return (
    <>
    <div className="App">
      <GridProvider initialContext={{}}>
        <FilterBar />
        <Filter />
        <Grid />
        <ColumnSelector />
      </GridProvider>
    </div>
    <div className="App">
      <GridProvider initialContext={{url:"https://jsonplaceholder.typicode.com/albums",columns:["userId","id","title"],selectedColumns:[]}}>
        <FilterBar />
        <Filter />
        <Grid />
        <ColumnSelector />
      </GridProvider>
    </div>
    </>
  );
}
