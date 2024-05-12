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
          let Dashboard="";
          switch(userId.substring(0,2)){
            case "AD":
              Dashboard = "/adminDashboard";
              break;
            case "SE":
              Dashboard = "/sellerDashboard";
              break;
            case "BU":
              Dashboard = "/buyerDashboard";
              break;
            
            default:
              alert("Invalid User");
              return;
          }
          navigate(Dashboard);
            
        } else {
            alert('Invalid credentials');
            return;
        }
    }
    
    const handleClear = () => {
        setUserId('');
        setPassword('');
    };
    
    return(
        <div className="container">
        <h1 className="bg_container">BidZone</h1>
      <main className="d-flex flex-grow-1 justify-content-center align-items-center">
        <button className="btn btn-primary position-absolute top-0 end-0 m-5" onClick={() => navigate('/add')}>Sign Up</button>
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
