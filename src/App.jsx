import React, { useContext, useEffect, useState } from 'react'
import './App.css';
import { useCardContext } from './Context/CardContext';

function App() {
  // useState for description 
  const [showFullDescription, setShowFullDescription] = useState(false);
  // useCardContext for showing jobs
  const { isLoading, isError, products  } = useCardContext();

//loading
  if (isLoading) {
    return <div className='loading'>...Loading</div>;
  }
//error
    if (isError) {
    return <div>Error fetching data</div>;
  } 
  

// Change handleToggleDescription to accept index directly
const handleToggleDescription = (id) => {
  setShowFullDescription(prev => !prev);
  console.log("Toggled description for job:", id);
};


  return (
    
   
    <div className='main'>
      <div className='container'>
      {/*   <div className="filters">
          <Filter />
        </div> */}

{/* All jobs */}

{products && products.jdList && (
  <div className='containers'>
    {products.jdList.map((job , index) => (
       <div key={index} className='card'>
        <div className="card-top">
           <div className="company-img">
           <img src={job.logoUrl} alt="" />
           </div>
           <div className="company">
           <h1>{!job.companyName ? "" : job.companyName }</h1>
           <h2> {!job.jobRole ? "" : job.jobRole}</h2>
            <h3> {!job.location ? "" : job.location}</h3>
           </div>
        </div>

        <div>
          <h2 className='salary'>Estimated Salary: {!job.minJdSalary ? "" : job.minJdSalary  } {job.minJdSalary && job.maxJdSalary ? "-" : "" }  {!job.maxJdSalary ? "" :  job.maxJdSalary} LPA ✅</h2>
        </div>
       <div className="about">
       <h1>About Company: </h1>
        <h2>About us</h2>
       </div>

{/* Toggle description  */}
       {showFullDescription ? (
                <p className='about-desc'>{job.jobDetailsFromCompany}</p>
              ) : (
                <p className='about-desc'>{job.jobDetailsFromCompany.slice(0, 200)}...</p>
              )}

              <button className='btn' onClick={() => handleToggleDescription(index)}>
                {showFullDescription ? "Show Less" : "Show More"}
              </button>

        <div className="exp">
        <h6 className='exp'>{job.minExp ? "Minimum Experience" : ""}</h6>
        <p className='min-exp'>{!job.minExp ? "" : job.minExp } {job.minExp ? "years" : ""}</p>
        </div>
       <div className="apply">
       <a href={job.jdLink}>⚡Easy Apply</a>
       </div>
      </div> 
      
    ))}


            
        
          

  </div>
        )}
         
      </div>

    </div>
  )
}

export default App 

