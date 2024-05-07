import { createContext, useContext, useEffect, useReducer } from "react";
import { useCardContext } from "./CardContext";
import reducer from "../Reducer/FilterReducer";


const FilterContext = createContext();

const initialState = {
    filter_jobs: [],
    all_jobs: [],
    filters : {
        text: "",
        jobRole: "all",
        maxJdSalary: "",
        minExp: "",
        location: "",
        companyName: "",
    },
};

export const FilterContextProvider = ({ children }) => {
    const { jobs } = useCardContext();
    const [ state, dispatch] = useReducer(reducer, initialState);


   // update the filter values
  const updateFilterValue = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    return dispatch({ type: "UPDATE_FILTERS_VALUE", payload: { name, value } });
  };
  
  //to filter on basis of input
  useEffect(() => {
    dispatch({ type: "FILTER_PRODUCTS", payload: state.filters.text})
  }, [jobs, state.filters.text]);
  
  
    useEffect(() => {
      dispatch( { type: "LOAD_FILTER_PRODUCTS", payload: jobs } );
    }, [jobs]);
    

    return (
        <FilterContext.Provider value={{ ...state, updateFilterValue }}>
            {children}
        </FilterContext.Provider>
    );
};

 const useFilterContext = () => {
    return useContext(FilterContext);
};

export { useFilterContext}

 