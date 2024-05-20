import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../Reducer/CardReducer";

const AppContext = createContext();

 const API = "https://api.weekday.technology/adhoc/getSampleJdJSON";


const myHeaders = {
    "Content-Type": "application/json"
};

const body = {
    "limit": 947,
    "offset": 0
};

const initialState = {
    isLoading: false,
    isError: false,
    jobs: []
};

const AppProvider = ({children}) => {

    const [state, dispatch] = useReducer(reducer, initialState);

     const getProducts = async () => {
        dispatch ({ type : "SET_LOADING" });
       try {
         const response = await axios.post(API, body, { headers: myHeaders });
         const jobs = await response.data;
         console.log( "ALL-Jobs" ,jobs);
         dispatch({ type: "SET_API_DATA", payload: jobs });
       } catch (error) {
        console.error("API Error:", error); // Log API error for debugging
        dispatch({ type: "API_ERROR" });
       }
    } 

    useEffect(() => {
      getProducts(API);
    }, [])
    
    return(
        <AppContext.Provider value={{ ...state }}>
            {children}
        </AppContext.Provider>
    );
};

//Custom Hooks
const useCardContext = () =>{
    return useContext(AppContext);
};

export {AppProvider, AppContext,  useCardContext};