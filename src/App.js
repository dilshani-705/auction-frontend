
import logo from './logo.svg';
import './App.css';

import  LogIn  from './Login/LogIn';
import  Home  from './HomePage/Home';
import AdminDashboard from './Admin/AdminDashboard';
import AddUser from './Admin/AddUser';
import UpdateUser from './Admin/UpdateUser';
import Navigation from './Component/Navigation';
import  AdminSideBar  from './Component/AdminSideBar';
import SellerSidear from './Component/SellerSidear';
import BuyerSidear from './Component/BuyerSidear';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import Routes

import AddItemForm from './Component/Items/AddItemForm';
import ViewItems from './Component/Items/ViewItems';




function App() {
  return (
    <BrowserRouter>

      {/* Use Routes to wrap Route components */}
      <Routes>
        <Route path="/viewItem" element={<ViewItems />} />
        <Route path='/' element={<Navigation/>}/>
      <Route path="/login" element={<LogIn/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path='/admin' element={<AdminDashboard/>}/>
      <Route path='/add' element={<AddUser/>}/>
      <Route path='/update/:userId' element={<UpdateUser/>}/>
      <Route path='/adminDashboard' element={<AdminSideBar/>}/>
      <Route path='sellerDashboard' element={<SellerSidear/>}/>
      <Route path='buyerDashboard' element={<BuyerSidear/>}/>
        <Route path="/update-ItemDetails/:id" element={<AddItemForm />} />
        <Route path="/add-ItemDetails" element={<AddItemForm />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
