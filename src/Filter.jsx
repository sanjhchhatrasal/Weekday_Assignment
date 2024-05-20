import React from 'react'
import './Filter.css';
import { useFilterContext } from './Context/FilterContext'

function Filter() {
    const { filters: { text }, all_jobs, updateFilterValue } = useFilterContext();

       const handleChange = (e) => {
       updateFilterValue(e); // Pass the event object directly
       console.log("Input Value:", e.target.value);
      };

        //TO GET THE UNIQUE DATA OF EACH FIELDS
        const getUniqueData = (data, property) => {
            let newVal = data.map((job) => {
                return job[property];
            });
            return newVal = [...new Set(newVal)];
          };
    
          //We need unique data
          const uniqueJobRoles = getUniqueData(all_jobs, "jobRole");
          console.log("Unique Job Roles:", uniqueJobRoles); // Log the unique job roles
    
          const uniqueJobExperience = getUniqueData(all_jobs, "maxExp");
          console.log("Unique Job Experience:", uniqueJobExperience); // Log the unique job roles
    
          const uniqueJoblocation = getUniqueData(all_jobs, "location");
          console.log("Unique Job location:", uniqueJoblocation); // Log the unique job roles
    
          const uniqueJobminJdSalary = getUniqueData(all_jobs, "minJdSalary");
          console.log("Unique Job salary:", uniqueJobminJdSalary); // Log the unique job roles
 

    return (
        <div >
            <form onSubmit={(e) => e.preventDefault()}>
                <div className='filters-div'>
                <div className="filter-jobRole">
                    <div>
                    <form action="#">
                        <select 
                        name="jobRole" 
                        onClick={updateFilterValue}
                        id="jobRole"
                        className='filter-role-select'>
                            {
                                uniqueJobRoles.map((job, index) => {
                                    return <option key={index} value={job} name="jobRole">{job}</option>
                                })
                            }
                        </select>
                    </form>
                    </div>
                </div>

                <div className="filter-location">

                    <form action="#">
                        <select 
                        name="location" 
                        onClick={updateFilterValue}
                        id="location"
                        className='filter-location-select'>
                            {
                                uniqueJoblocation.map((job, index) => {
                                    return <option key={index} value={job} name="location">{job}</option>
                                })
                            }
                        </select>
                    </form>
                </div>

                <div className="filter-experience">

                    <form action="#">
                        <select 
                        name="maxExp" 
                        onClick={updateFilterValue}
                        id="maxExp"
                        className='filter-experience-select'>
                            {
                                uniqueJobExperience.map((job, index) => {
                                    return <option key={index} value={job} name="maxExp">{job}</option>
                                })
                            }
                        </select>
                    </form>
                </div>

                <div className="filter-salary">

                    <form action="#">
                        <select 
                        name="minJdSalary" 
                        onClick={updateFilterValue}
                        id="minJdSalary"
                        className='filter-salary-select'>
                            {
                                uniqueJobminJdSalary.map((job, index) => {
                                    return <option key={index} value={job} name="minJdSalary">{job}</option>
                                })
                            }
                        </select>
                    </form>
                </div>

                <input 
                   type="text"
                  name= "text"
                  placeholder="Search Company Name"
                  value={text}
                  
                  onChange={updateFilterValue} 

                />
                </div>
            </form>
        </div>
    )
}

export default Filter
