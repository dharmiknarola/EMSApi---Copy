import {Link, Route}  from "react-router-dom";
import { Routes } from "react-router-dom";
import App from "./App";
import EmployeeView from './EmployeeView';
import EmployeeEdit from './EmployeeEdit';
import EmployeeDirectory from './EmployeeList';
import EmployeeCreate from "./EmployeeCreate";
import EmployeeDelete from "./EmployeeDelete";
function PageRoutes() {
    return (
        <Routes>
            <Route path = '/' element={<EmployeeDirectory/>}/>
            <Route path = '/List' element={<EmployeeDirectory/>}/>
            <Route path = '/Create' element={<EmployeeCreate/>}/>
            <Route path = '/View/:id' element={<EmployeeView/>}/>
            <Route path = '/Edit/:id' element={<EmployeeEdit/>}/>
            <Route path = '/Delete/:id' element={<EmployeeDelete/>}/>
        </Routes>
       
    )
}
export default PageRoutes;