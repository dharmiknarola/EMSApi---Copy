import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const EmployeeDelete = () => {
    const {id} = useParams();
    const [flag,setFlag] = useState(false);

 let query = `
        mutation DelEmployee($id: String) {
            delEmployee(_id: $id)
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
            if( response.status === 200){
                setFlag(true);
            }
        })
    }

    useEffect(function(){
        fetchData();
    },[]);

    return(
        <>
        {flag && <Navigate to="/List" replace="true" />}
        </>
    )

}

export default EmployeeDelete;