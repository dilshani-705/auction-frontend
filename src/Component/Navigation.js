
import React from 'react'
import { Link } from 'react-router-dom';
import logoImg from '../Assets/auction.png'

export default function Navigation() {

  
  return (
    <nav className='container navbar navbar-light bg-light'>
        <div className='container-fluid'>
            <div className='navbar-brand'>
                <img src={logoImg} alt='logo'  height='180'/>
                <br/><br/>
                <h2>Welcome to BidZone</h2>
                <h3>Your Bid, Your Power, Your Victory!</h3>
            </div>
            <div className='d-flex'>
                <a href='/login' className='btn btn-primary'>Login</a>
                <a href='/add' className='btn btn-primary'>SignUp</a>
            </div>
        </div>
        <div className='d-flex justify-content-center'> 
            <ul className='nav'>
                <li className='nav-item'>
                    <Link to='/home' className='nav-link'>Home</Link>
                </li>
                <li className='nav-item'>
                    <a href='/about' className='nav-link'>About</a>
                </li>
                <li className='nav-item'>
                    <a href='/contact' className='nav-link'>Contact</a>
                </li>
            </ul>
          </div>
    </nav>
  )
}

