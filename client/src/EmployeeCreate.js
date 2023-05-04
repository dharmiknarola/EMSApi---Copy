import React, { useState } from "react";
import { Navigate } from "react-router-dom";



function EmployeeCreate() {
    const AddSingleEmployee = (newEmployee) => {

        let query = `
            mutation AddSingleEmployee($FirstName: String!, $LastName: String, $Age: Int, $DateOfJoining: String, $Title: String, $Department: String, $EmployeeType: String) {
            addSingleEmployee(FirstName: $FirstName, LastName: $LastName, Age: $Age, DateOfJoining: $DateOfJoining, Title: $Title, Department: $Department, EmployeeType: $EmployeeType)
          }
        `
        return fetch("http://localhost:4000/graphql", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ query, variables:{ 
                FirstName: newEmployee.FirstName, 
                LastName: newEmployee.LastName, 
                Age: newEmployee.Age,
                DateOfJoining: newEmployee.DateOfJoining,
                Title: newEmployee.Title,
                Department: newEmployee.Department,
                EmployeeType: newEmployee.EmployeeType,
                } 
            })
        }).then(async (response)=> {
            let temp =  response.json();
            console.log(temp);   
            return await response;      
        });
    
    };

    const [flag,setFlag] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        let form = document.forms.addEmployee;
        let singleEmployee = {
            FirstName: form.FirstName.value,
            LastName: form.LastName.value,
            Age: parseInt(form.Age.value),
            DateOfJoining: form.DateOfJoining.value,
            Title: form.Title.value,
            Department: form.Department.value,
            EmployeeType: form.EmployeeType.value,
        };
        console.log(singleEmployee);
        AddSingleEmployee(singleEmployee).then((data) => {
            if(data.status === 200){
                setFlag(true);
            }
        });
        document.forms.addEmployee.reset();
        // setFlag(true);
    };

    return (
        <>
        {flag && <Navigate to="/List" replace="true" />}
        <div>
            <div class="container">
            <form name="addEmployee" class="register" onSubmit={handleSubmit}>
                <div class="form-group col-6">
                <label for="FirstName">First Name</label>
                <input 
                    type="text" 
                    class="form-control" 
                    id="FirstName" 
                    name="FirstName"
                    placeholder="Enter your First Name" required/>
                </div>
                <div class="form-group col-6">
                <label for="LastName">Last Name</label>
                <input 
                    type="text" 
                    class="form-control" 
                    id="LastName" 
                    name="LastName"
                    placeholder="Enter your Last Name" required/>
                </div>
                <div class="form-group col-6">
                <label for="Age">Age</label>
                <input 
                    type="number" 
                    class="form-control" 
                    id="Age" 
                    name="Age"
                    min="20" max="70"
                    placeholder="Enter your Age" required/>
                </div>
                <div class="form-group col-6">
                <label for="DateOfJoining">Age</label>
                <input 
                    type="date" 
                    class="form-control" 
                    id="DateOfJoining" 
                    name="DateOfJoining"
                    placeholder="Enter your Birth Date" required/>
                </div>
                <div class="form-group col-6">
                <label for="Title">Title</label>
                <select id="Title" name="Title" class="form-control" required>
                                <option value="">Select a title</option>
                                <option value="Employee">Employee</option>
                                <option value="Manager">Manager</option>
                                <option value="Director">Director</option>
                                <option value="VP">VP</option>
                </select>
                </div>
                <div class="form-group col-6">
                <label for="Department">Department</label>
                <select id="Department" name="Department" class="form-control" required>
                                 <option value="">Select a title</option>
                                <option value="IT">IT</option>
                                <option value="Marketing">Marketing</option>
                                <option value="HR">HR</option>
                                <option value="Engineering">Engineering</option>
                </select>
                </div>
                <div class="form-group col-6">
                <label for="EmployeeType">Employment Type</label>
                <select id="EmployeeType" name="EmployeeType" class="form-control" required>
                                <option value="">Select a title</option>
                                <option value="FullTime">FullTime</option>
                                <option value="PartTime">PartTime</option>
                                <option value="Contract">Contract</option>
                                <option value="Seasonal">Seasonal</option>
            
                </select> 
                </div>
                <hr/>
                <button type="submit"  class="btn btn-dark col-2">Submit</button>
            </form>
            </div>
        </div>
        </>
    )

}

export default EmployeeCreate;