import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import  LogIn  from './Login/LogIn';
import  Home  from './HomePage/Home';
import AdminDashboard from './Admin/AdminDashboard';
import AddUser from './Admin/AddUser';
import UpdateUser from './Admin/UpdateUser';
import Navigation from './Component/Navigation';
import  AdminSideBar  from './Component/AdminSideBar';
import SellerSidear from './Component/SellerSidear';
import BuyerSidear from './Component/BuyerSidear';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Navigation/>}/>
      <Route path="/login" element={<LogIn/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path='/admin' element={<AdminDashboard/>}/>
      <Route path='/add' element={<AddUser/>}/>
      <Route path='/update/:userId' element={<UpdateUser/>}/>
      <Route path='/adminDashboard' element={<AdminSideBar/>}/>
      <Route path='sellerDashboard' element={<SellerSidear/>}/>
      <Route path='buyerDashboard' element={<BuyerSidear/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
