import { Link } from "react-router-dom";

function EmployeeRow(props) {
    function info()
    {
        alert(" user can't be deleted")
    }
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
            <td>
                <Link class="btn btn-success" to={"/view/" + props.employee._id}>View</Link>
                <Link class="btn btn-warning" to={"/edit/"+ props.employee._id}>Edit</Link>
                {props.employee.CurrentStatus?<button class="btn btn-info" disabled>Can't Delete</button>:<Link class="btn btn-danger" to={"/delete/" + props.employee._id}>Delete</Link>}
                
            </td>
        </tr>
    )
}

export default EmployeeRow;