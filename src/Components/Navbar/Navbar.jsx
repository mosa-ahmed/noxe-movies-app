import React, { useContext } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import jwtDecode from 'jwt-decode'

export default function NavBar() {
  let {userToken,setuserToken} = useContext(UserContext)
  const navigate = useNavigate()
  if(localStorage.getItem('userToken')){
    var decoded = jwtDecode(localStorage.getItem('userToken'))
  }

  function logOut(){
    setuserToken(null)
    navigate('/login')
    localStorage.removeItem('userToken')
  }

  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-color py-2">
  <div className="container-fluid">
    < Link className="navbar-brand fw-bolder text-uppercase fs-4" to="">Noxe</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      {userToken?<>
        <li className="nav-item">
          <Link className="nav-link text-white" to='/'>Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to='movies'>Movies</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to='tvShows'>TvShows</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to='people'>People</Link>
        </li>
       </>:""}</ul>
      
      <div className='d-flex ms-auto align-items-center'>
     
       <ul className='list-unstyled cursor-pointer d-flex mb-0 me-5'>
        {userToken?<><li className='mx-2'>
          <i className='fab fa-facebook'></i>
        </li>
        <li className='mx-2'>
          <i className='fab fa-twitter'></i>
        </li>
        <li className='mx-2'>
          <i className='fab fa-youtube'></i>
        </li>
        <li className='mx-2'>
          <i className='fab fa-instagram'></i>
        </li></>:''}
       </ul>
       <ul className="navbar-nav mb-2 mb-lg-0">
       {userToken?<>
        <li className="nav-item">
          <span className="nav-link text-white cursor-pointer" onClick={logOut}>Logout</span>
        </li>
        <li className="nav-item">
        <Link className="nav-link text-info fw-bold d-flex justify-content-center align-items-center" to='profile'><i className='mx-2 fa-solid fa-user'></i>{decoded.name}</Link>
      </li></>:<>
        <li className="nav-item">
          <Link className="nav-link text-white" to='register'>Register</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link  text-white" to='login'>Login</Link>
        </li>
        </>}
       </ul>
      </div>
    </div>
  </div>
</nav>
    </>
  )
}
