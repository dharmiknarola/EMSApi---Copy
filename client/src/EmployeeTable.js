import EmployeeSearch from './EmployeeRow';

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
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                  {AllEmployeeRow}
                </tbody>
            </table>
        </div>
    )
}
export default EmployeeTable;