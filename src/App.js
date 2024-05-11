import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import  LogIn  from './Login/LogIn';
import  Home  from './HomePage/Home';
import AdminDashboard from './Admin/AdminDashboard';
import AddUser from './Admin/AddUser';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LogIn/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path='/admin' element={<AdminDashboard/>}/>
      <Route path='/add' element={<AddUser/>}/>
      <Route path='/update/:userId' element={<AddUser/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
