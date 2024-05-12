import React from 'react'
import sideBar from '../Assets/bg_for_sidebar.jpg'

export default function SellerSidear() {
  return (
    <div>
    <div className="container-fluid">
      <div className="row" >
  
          <div style={{ backgroundImage: `url(${sideBar})`, position:'fixed', width:'200px', height:'100vh '}}>
  
              <a className='text-decoration-none text-dark d-flex align-itemcenter'>
                  <span className='fs-4'> Seller Dashboard</span>
              </a>
              <ul className='nav nav-pills flex-column'>
                  <li class="nav-item text-dark fs-5">
                      <a href='#' className='nav-link text-dark'>Items</a>
                  </li>
              </ul>
          </div>
      </div>
      
    </div>
  </div>
  )
}
