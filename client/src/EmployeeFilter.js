import Menu from "./Menu"
import {Link} from 'react-router-dom'

function EmployeeFilter() {
    return (
        <div id="root-3">
            <h3>Welcome to EMS</h3>
            
            <nav>
                <Link to="/">Person A</Link>
                {" | "}
                <Link to="/">Person B</Link>
            </nav>
        </div>
    )
}


export default EmployeeFilter;

