import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LogIn.css';
import'bootstrap/dist/css/bootstrap.min.css';

export const LogIn = () => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post("http://localhost:8080/api/user/login", {
            userId:userId,
            password:password,
        });
        if(response.data.message === "Login Successful") {
            navigate('/home');
        } else {
            alert('Invalid credentials');
        }
    }
    const handleClear = () => {
        setUserId('');
        setPassword('');
    }
    
    return(
        <div className="container">
        <h1 className="bg_container">BidZone</h1>
      <main className="d-flex flex-grow-1 justify-content-center align-items-center">
        <div className="col-md-6 p-5 bg-white rounded shadow position-relative">
          
          <div className="d-flex justify-content-center mb-5">
          </div>
          <h2 className="text-center mb-4">Login</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input type="text" className="form-control" id="username" placeholder="Enter username" onChange={(e) => setUserId(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" placeholder="Enter password" onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <div className="d-flex justify-content-between mb-3">
              <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Login</button>
              <button type="button" className="btn btn-primary" onClick={handleClear}>Clear</button>
            </div>
          </form>
        </div>
      </main>
     
    </div>
    );
}
export default LogIn;
