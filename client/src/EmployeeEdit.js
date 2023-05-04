import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const EmployeeEdit = () => {
 const {id} = useParams();
 const [temp,settemp] = useState({});
 const [flag,setFlag] = useState(false);

 let query = `
 query EmployeeList($id: String) {
    employeeList(_id: $id) {
      _id
      FirstName
      LastName
      Age
      DateOfJoining
      Title
      Department
      EmployeeType
      CurrentStatus
    }
  }
    `;

    function fetchData() {
        fetch('http://localhost:4000/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ query, variables: {
                id : id

            } })
        }).then(async (response)=> {
            let tempEmployees = await response.json();
            let emp = tempEmployees.data.employeeList[0];
            settemp(emp);
            console.log(temp);
        });
        
    }
    

    const updateEmp = (newEmployee) => {
        let query = `
            mutation EditEmployee($id: String, $title: String, $department: String, $currentStatus: Int) {
            editEmployee(_id: $id, Title: $title, Department: $department, CurrentStatus: $currentStatus)
        }
        `;
        return fetch("http://localhost:4000/graphql", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ query, variables:{ 
                id: id,
                title: newEmployee.Title,
                department: newEmployee.Department,
                currentStatus: parseInt(newEmployee.CurrentStatus),
                } 
            })
        }).then(async (response)=> {
            let temp =  response.json();
            console.log(temp);   
            return await response;      
        });
        };
        const handleUpdate = (e) => {
            e.preventDefault();
            let form = document.forms.editEmployee;
            let singleEmployee = {
            
                Title: form.Title.value,
                Department: form.Department.value,
                CurrentStatus: form.CurrentStatus.value
            };
            console.log(singleEmployee);
            updateEmp(singleEmployee).then((data) => {
                if(data.status === 200){
                    setFlag(true);
                }
            });
            document.forms.editEmployee.reset();
            // setFlag(true);
    };
        

    useEffect(function(){
        fetchData();
    },[]);

    return(
            <>
            {flag && <Navigate to="/List" replace="true" />}
            <div>
                <div class="container">
            <form name="editEmployee" class="register" onSubmit={handleUpdate}>
            <div class="form-group col-6">
                <label for="FirstName">First Name</label>
                <input 
                    type="text" 
                    class="form-control" 
                    id="FirstName" 
                    name="FirstName"
                    placeholder="Enter your First Name" disabled
                    value={temp.FirstName}/>
                </div>
                <div class="form-group col-6">
                <label for="LastName">Last Name</label>
                <input 
                    type="text" 
                    class="form-control" 
                    id="LastName" 
                    name="LastName"
                    placeholder="Enter your Last Name" disabled value={temp.LastName}/>
                </div>
                <div class="form-group col-6">
                <label for="Age">Age</label>
                <input 
                    type="number" 
                    class="form-control" 
                    id="Age" 
                    name="Age"
                    min="20" max="70"
                    placeholder="Enter your Age" disabled value={temp.Age}/>
                </div>
                <div class="form-group col-6">
                <label for="DateOfJoining">Age</label>
                <input 
                    type="date" 
                    class="form-control" 
                    id="DateOfJoining" 
                    name="DateOfJoining"
                    placeholder="Enter your Birth Date" disabled value={new Date(parseInt(temp.DateOfJoining)).toDateString()}/>
                </div>
                <div class="form-group col-6">
                <label for="Title">Title</label>
                <select id="Title" name="Title" class="form-control" value={temp.Title} onChange={(e) => {settemp({...temp, ...{Title: e.target.value}})}}>
                                <option value="">Select a title</option>
                                <option value="Employee">Employee</option>
                                <option value="Manager">Manager</option>
                                <option value="Director">Director</option>
                                <option value="VP">VP</option>
                </select>
                </div>
                <div class="form-group col-6">
                <label for="Department">Department</label>
                <select id="Department" name="Department" class="form-control" value={temp.Department} onChange={(e) => {settemp({...temp, ...{Department: e.target.value}})}}>
                                 <option value="">Select a title</option>
                                <option value="IT">IT</option>
                                <option value="Marketing">Marketing</option>
                                <option value="HR">HR</option>
                                <option value="Engineering">Engineering</option>
                </select>
                </div>
                <div class="form-group col-6">
                <label for="EmployeeType">Employment Type</label>
                <select id="EmployeeType" name="EmployeeType" class="form-control" value={temp.EmployeeType} disabled>
                                <option value="">Select a title</option>
                                <option value="FullTime">FullTime</option>
                                <option value="PartTime">PartTime</option>
                                <option value="Contract">Contract</option>
                                <option value="Seasonal">Seasonal</option>
            
                </select> 
                </div>
                <div class="form-group col-6">
                <label for="CurrentStatus">Current Status</label>
                <select id="CurrentStatus" name="CurrentStatus" class="form-control" value={temp.CurrentStatus} onChange={(e) => {settemp({...temp, ...{CurrentStatus: e.target.value}})}}>
                                <option value="">Set Employeement Status</option>
                                <option value="1">Employed (1)</option>
                                <option value="0">Past Employed (0)</option>
            
                </select> 
                </div>
                <hr/>
                <button type="submit" class="btn btn-dark col-2">Update</button>
            </form>
            </div>
        </div>  
        </>

    )

}

export default EmployeeEdit;