import axios from 'axios';

import React ,{useEffect, useState} from 'react'

import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
const [users, setUsers] = useState([]);
const navigate=useNavigate();


    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/user');
            setUsers(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

 function removeEmployee(userId){
    axios.delete(`http://localhost:8080/api/user/${userId}`)
    .then(response => {
        console.log(response);
        fetchData();
    })
    .catch(error => {
        console.error(error);
    });
}
function updateEmployee(userId){
    navigate(`/update/${userId}`);

}
  return (
    <div>
    
                <table className='table table-striped table-bordered'>
                    <thead>
                    <tr>
                        <th colSpan='8' className='text-center'> User Details</th>
                    </tr>
                    <tr>
                        <th>User Id</th>
                        <th>User Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Mobile No</th>
                        <th>Role</th>
                        <th>Password</th>
                    </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.userId}>
                                <td>{user.userId}</td>
                                <td>{user.userName}</td>
                                <td>{user.email}</td>
                                <td>{user.address}</td>
                                <td>{user.mobileNo}</td>
                                <td>{user.role}</td>
                                <td>{user.password}</td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => removeEmployee(user.userId)}>Delete</button>
                                </td>
                                <td>
                                    <button className="btn btn-primary" onClick={() => updateEmployee(user.userId)}>Update</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
        
    </div>
  );
}
