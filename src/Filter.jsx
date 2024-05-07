import React from 'react'
import './Filter.css';
import { useFilterContext } from './Context/FilterContext'

function Filter() {
    const { filters: { text }, updateFilterValue } = useFilterContext();

       const handleChange = (e) => {
      
       updateFilterValue(e); // Pass the event object directly
       console.log("Input Value:", e.target.value);
      };
 

    return (
        <div >
            <form onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="text"
                  name= "text"
                  placeholder="Search Company Name"
                  value={text}
                  onChange={handleChange} 
                  className='search'
                />
                
            </form>
        </div>
    )
}

export default Filter
