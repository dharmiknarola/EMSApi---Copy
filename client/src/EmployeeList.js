import EmployeeSearch from "./EmployeeSearch";
import EmployeeTable from "./EmployeeTable";
import React, {useState, useEffect} from "react";
import { useLocation } from "react-router-dom";


const EmployeeDirectory = () => {
    const person = new URLSearchParams(useLocation().search);
    var Type = person.get("type");
    var Role = person.get("role");
    var Department = person.get("department");
    
    let query = `
    query EmployeeList($EmployeeType: String, $Title: String, $Department: String) {
        employeeList(EmployeeType: $EmployeeType, Title: $Title, Department: $Department) {
          _id
          Title
          LastName
          FirstName
          EmployeeType
          Department
          DateOfJoining
          CurrentStatus
          Age
        }
      }
    `;
      console.log(query);

    function fetchData() {
        fetch('http://localhost:4000/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ query, variables: {
                EmployeeType: Type,
                Title: Role,
                Department: Department

            } })
        }).then(async (response)=> {
            let tempEmployees = await response.json();
            let tempList = tempEmployees.data.employeeList;
            console.log(tempEmployees);
            setAllEmployee(tempList)
        })
    }

    useEffect(function(){
        fetchData();
    },[Type,Role,Department]);


    const [allEmployees, setAllEmployee] = useState([]);
    

    return(
        <div>
            <EmployeeSearch />
            <hr />
            <EmployeeTable allEmployees={allEmployees}/>
        </div>
    )
}

export default EmployeeDirectory;
