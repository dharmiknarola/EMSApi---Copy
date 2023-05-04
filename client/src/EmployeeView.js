import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const EmployeeView = () => {
 const {id} = useParams();
 const [temp,settemp] = useState({});
 const [retirement,setRetirement] =useState(false);

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
        let currentDate= new Date();
        let expextedRetiremonth = currentDate.getMonth()+6;
        if(currentDate.getFullYear()-tempEmployees.DateOfJoining.getFullYear()==64 || currentDate.getFullYear()-tempEmployees.DateOfJoining.getFullYear()==65 )
        { 
            if(currentDate.getFullYear()-tempEmployees.DateOfJoining.getFullYear()==65 )
            {
                if(tempEmployees.DateOfJoining.getMonth()-currentDate.getMonth()<=6)
                {
                    setRetirement(true);
                }
            }
            if(currentDate.getFullYear()-tempEmployees.DateOfJoining.getFullYear()==64 )
            {
                if(tempEmployees.DateOfJoining.getMonth()-currentDate.getMonth()>=6)
                {
                    setRetirement(true);
                }
            }
          
        }
            console.log(temp);
        })
    }

    useEffect(function(){
        fetchData();
    },[]);

    return(
        <div>
            <label> First Name: </label>{temp.FirstName} <br/>
            <label> Last Name: </label>{temp.LastName} <br/>
            <label> Age: </label>{temp.Age} <br/>
            <label> Date Of Joining: </label>{new Date(parseInt(temp.DateOfJoining)).toLocaleDateString()} <br/>
            <label> Title: </label>{temp.Title} <br/>
            <label> Department: </label>{temp.Department} <br/>
            <label> EmployeeType: </label>{temp.EmployeeType} <br/>
            <label> CurrentStatus: </label>{temp.CurrentStatus} <br/>
            {/* {retirement?<label> You will retire within 6 month</label>}  */}
        </div>
    )

}

export default EmployeeView;