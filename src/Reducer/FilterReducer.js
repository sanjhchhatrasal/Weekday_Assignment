const filterReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_FILTER_PRODUCTS":
      return {
        ...state,
        filter_jobs: Array.isArray(action.payload)
          ? [...action.payload]
          : state.filter_jobs,
        all_jobs: Array.isArray(action.payload)
          ? [...action.payload]
          : state.all_jobs,
        /*   filter_jobs: [...action.payload],
                 all_jobs: [...action.payload],  */
      };

    case "UPDATE_FILTERS_VALUE":
      const { name, value } = action.payload;

      return {
        ...state,
        filters: {
          ...state.filters,
          [name]: value,
        },
      };

    case "FILTER_PRODUCTS":
      console.log("Payload type:", typeof action.payload); // Add this line to check the type of action.payload

      let { all_jobs } = state;
      let tempFilterJob = [...all_jobs];

      const { text, jobRole, maxExp,  location, minJdSalary } = state.filters;

      if (text) {
        tempFilterJob = tempFilterJob.filter((job) => {
          console.log(" before Filtered Jobs:", tempFilterJob);
          if (job.companyName && typeof job.companyName === "string") {
            return job.companyName.toLowerCase().includes(text.toLowerCase());
          }
          return false; // If job.companyName is undefined or not a string, exclude it from the filter
        });
      }
      console.log("All Jobs:", all_jobs); // Add this line to log all_jobs value
      console.log("Filtered Jobs:", tempFilterJob);

      if(jobRole !== "all"){
        tempFilterJob = tempFilterJob.filter((job) => {
          return job.jobRole === jobRole;
        })
      }

      if(maxExp !== "all"){
        tempFilterJob = tempFilterJob.filter((job) => {
          return job.maxExp === maxExp;
        });
      };
      if(location !== "all"){
        tempFilterJob = tempFilterJob.filter((job) => {
          return job.location === location;
        });
      };

      if(minJdSalary !== "all"){
        tempFilterJob = tempFilterJob.filter((job) => {
          return job.minJdSalary === minJdSalary;
        });
      };

      return {
        ...state,
        filter_jobs: tempFilterJob,
      };
      

    default:
      return state;
  }
};

export default filterReducer;
