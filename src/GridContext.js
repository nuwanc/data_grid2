import { createContext, useContext, useReducer, useEffect } from "react";

export const GridContext = createContext({});
export const GridContextDispatch = createContext(null);

export function useGridContext() {
  return useContext(GridContext);
}

export function useGridContextDispatch() {
  return useContext(GridContextDispatch);
}

export function GridProvider({ children, initialContext }) {
  const gridContext = {
    ...initialGridContext,
    ...initialContext
  };

  const [context, dispatch] = useReducer(reducer, gridContext);
  useEffect(() => {
    fetch(context.url)
      .then((response) => response.json())
      .then((json) => dispatch({ type: "fetch_data", payload: json }));
  }, [context.filterValues,context.url]);

  return (
    <GridContext.Provider value={context}>
      <GridContextDispatch.Provider value={dispatch}>
        {children}
      </GridContextDispatch.Provider>
    </GridContext.Provider>
  );
}

const initialGridContext = {
  columns: ["id", "name", "username", "email", "phone"],
  selectedColumns: ["id", "name"],
  filterValues: {},
  data: [],
  filtered: [],
  url : "https://jsonplaceholder.typicode.com/users"
};

function reducer(context, action) {
  switch (action.type) {
    case "add_column":
      if (!context.selectedColumns.includes(action.name)) {
        return {
          ...context,
          selectedColumns: [...context.selectedColumns, action.name]
        };
      }
      return { ...context };
    case "remove_column":
      if (context.selectedColumns.includes(action.name)) {
        return {
          ...context,
          selectedColumns: context.selectedColumns.filter(
            (e) => e !== action.name
          ),
          filterValues: {
            ...context.filterValues,
            [action.name]: undefined
          }
        };
      }
      return { ...context };
    case "remove_filter":
      return {
        ...context,
        filterValues: {
          ...context.filterValues,
          [action.name]: undefined
        }
      };
    case "apply_filters":
      return {
        ...context,
        filterValues: action.payload
      };
    case "fetch_data":
      return {
        ...context,
        data: action.payload,
        filtered: action.payload
      };
    default:
      return { ...context };
  }
}
