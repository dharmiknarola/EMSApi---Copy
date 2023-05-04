
function EmployeeFilter() {
    return (
        <div id="root-3">
            <h3>Welcome to EMS</h3>
        </div>
    )
}
function EmployeeSearch(props) {
    //props.issue.Id
    return (
        <tr>
            <td style={props.style}>{props.employee.FirstName}</td>
            <td style={props.style}>{props.employee.LastName}</td>
            <td style={props.style}>{props.employee.Age}</td>
            <td style={props.style}>{new Date(parseInt(props.employee.DateOfJoining)).toLocaleDateString()}</td>
            <td style={props.style}>{props.employee.Title}</td>
            <td style={props.style}>{props.employee.Department}</td>
            <td style={props.style}>{props.employee.EmployeeType}</td>
            <td style={props.style}>{props.employee.CurrentStatus}</td>  
        </tr>
    )
}
function EmployeeTable({allEmployees}) {
    const style = {border: "0px solid black"};
    
    const AllEmployeeRow = allEmployees.map((employee) => (
        <EmployeeSearch  employee={employee} style={style}/>
    ))
    return (
        <div id="root-3">
            <h3>Welcome to EmployeeTable</h3>
            <table class="responstable" style={style}>
                <thead>
                    <tr>
                        <th>FirstName</th>
                        <th>LastName</th>
                        <th>Age</th>
                        <th>DateOfJoining</th>
                        <th>Title</th>
                        <th>Department</th>
                        <th>EmployeeType</th>
                        <th>CurrentStatus</th>
                    </tr>
                </thead>
                <tbody>
                  {AllEmployeeRow}
                </tbody>
            </table>
        </div>
    )
}

function EmployeeCreate({AddSingleEmployee}) {
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
        AddSingleEmployee(singleEmployee);
        document.forms.addEmployee.reset();
    };

    return (
        <div>
            <form name="addEmployee" class="register" onSubmit={handleSubmit}>
                <label for="FirstName">
                <input type="text" id="FirstName" name="FirstName" required/>
                <span>FirstName</span>
                </label>
                <label for="LastName">
                <input type="text" id="LastName" name="LastName" required/>
                <span>LastName</span>
                </label>
                <label for="Age">
                <input type="number" id="Age" name="Age" min="20" max="70" required/>
                <span>Age</span>
                </label>
                <label for="DateOfJoining">
                <input type="date" id="DateOfJoining" name="DateOfJoining" required/>
                <span>DateOfJoining</span>
                </label>
                <label for="Title">
                <input type="text" id="Title" name="Title" required/>
                <span>Title</span>
                </label>
                <label for="Department">
                <input type="text" id="Department" name="Department" required/>
                <span>Department</span>
                </label>
                <label for="EmployeeType">
                <input type="text" id="EmployeeType" name="EmployeeType" required/>
                <span>EmployeeType</span>
                </label>
                <button type="submit" >Submit</button>
            </form>
        </div>
    )

}



const EmployeeDirectory = () => {
    let query = `
        query  {
            employeeList {
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
            body: JSON.stringify({ query })
        }).then(async (response)=> {
            let tempEmployees = await response.json();
            let tempList = tempEmployees.data.employeeList;
            console.log(tempEmployees);
            setAllEmployee(tempList)
        })
    }

    React.useEffect(function(){
        fetchData();
    },[]);


    const [allEmployees, setAllEmployee] = React.useState([]);
    

    const addSingleEmployee = (newEmployee) => {
        
        let query = `
            mutation AddSingleEmployee($FirstName: String!, $LastName: String, $Age: Int, $DateOfJoining: String, $Title: String, $Department: String, $EmployeeType: String) {
            addSingleEmployee(FirstName: $FirstName, LastName: $LastName, Age: $Age, DateOfJoining: $DateOfJoining, Title: $Title, Department: $Department, EmployeeType: $EmployeeType)
          }
        `
        fetch("/graphql", {
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
            fetchData();
            let temp = await response.json();
            console.log(temp);
            
        });
        
        
        
        let employee = allEmployees.slice();
        employee.push(newEmployee);
        setAllEmployee(employee);
    };


    return(
        <div>
            <EmployeeFilter />
            <hr />
            <EmployeeCreate AddSingleEmployee={addSingleEmployee}/>
            <hr />
            <EmployeeTable allEmployees={allEmployees}/>
        </div>
    )
}

const element = ReactDOM.createRoot(document.getElementById("root-1"));
element.render(<EmployeeDirectory/>);