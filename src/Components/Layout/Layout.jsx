import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import {Offline} from 'react-detect-offline'
import Navbar from '../Navbar/Navbar'
import { UserContext } from '../../Context/UserContext'
import Header from '../Header/Header'


export default function Layout() {
  const {setuserToken} = useContext(UserContext)
  if(localStorage.getItem('userToken')){
    setuserToken(localStorage.getItem('userToken'))
  }
  return (<>
  <Navbar/>
  <Header/>
    <div className="container">
     <Outlet/>
    </div>
    <div>
    <Offline><div className="network text-dark fw-bolder">
        <i className='fas fa-wifi me-2'></i> You Are Offline ! 
      </div>
    </Offline>
  </div>
  </>

  )
}
