import {useSearchParams} from "react-router-dom";
function EmployeeSearch() {
    
    const [searchParams, setSearchParams] = useSearchParams();

    const addFilter = (key, val) => {
    const params = new URLSearchParams(searchParams);
    if (val) {
        params.set(key, val);
    } else {
        params.delete(key);
    }
    setSearchParams(params);
    };
    return (
        <div class="container">
            <h3>Employee Search</h3>
            <div class="container">
            <div class="row">
            <div class="col-4">
            <label for="employeeSearch">Search Employee</label>

                <select id="employeeSearch" name="employeeSearch" class="form-control" onChange={(a) => { addFilter("type",a.target.value)}} >
                                <option value="">All Employee</option>
                                <option value="FullTime">FullTime</option>
                                <option value="PartTime">PartTime</option>
                                <option value="Contract">Contract</option>
                                <option value="Seasonal">Seasonal</option>
            
                </select>                
            </div>   
            <div class="col-4">
            <label for="employeeSearch">Search By Roles</label>

                <select id="employeeSearch" name="employeeSearch" class="form-control" onChange={(a) => { addFilter("role",a.target.value)}}>
                                <option value="">All Roles</option>
                                <option value="Employee">Employee</option>
                                <option value="Manager">Manager</option>
                                <option value="Director">Director</option>
                                <option value="VP">VP</option>
            
                </select>                
            </div>  
            <div class="col-4">
            <label for="employeeSearch">Search By Department</label>

                <select id="employeeSearch" name="employeeSearch" class="form-control" onChange={(a) => { addFilter("department",a.target.value)}}>
                                <option value="">All Departments</option>
                                <option value="IT">IT</option>
                                <option value="Marketing">Marketing</option>
                                <option value="HR">HR</option>
                                <option value="Engineering">Engineering</option>
                                
            
                </select>                
            </div> 
            </div> 
                
            </div>
        </div>
    )
}

export default EmployeeSearch;