import {Link} from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom';
import PageRoutes from './PageRoutes';

function Menu() {
    return (
        <BrowserRouter>
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <Link  class="navbar-brand" to="/"> EMS</Link>
                    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link  class="nav-item nav-link active" to="/"> Home</Link>
                            <Link class="nav-item nav-link" to="/List"> EmployeeList</Link>
                            <Link class="nav-item nav-link" to="/Create"> EmployeeCreate</Link>
                        </div>
                    </div>
            </nav>
            <PageRoutes />
        </div>
        </BrowserRouter>
    )
}
export default Menu;


