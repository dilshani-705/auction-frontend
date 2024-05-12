import React from 'react'
import sideBar from '../Assets/bg_for_sidebar.jpg'

export default function BuyerSidear() {
  return (
    <div>
      <div className="container-fluid">
        <div className="row" >
    
            <div style={{ backgroundImage: `url(${sideBar})`, position:'fixed', width:'200px', height:'100vh '}}>
    
                <a className='text-decoration-bold text-dark d-flex align-itemcenter'>
                    <span className='fs-4'> Buyer Dashboard</span>
                </a>
                <br/><br/>
                <ul className='nav nav-pills flex-column'>
                    <li class="nav-item text-dark fs-5">
                        <a href='/admin' className='nav-link text-dark'>Users</a>
                    </li>
                </ul>
            </div>
        </div>
        
      </div>
    </div>
  )
}
