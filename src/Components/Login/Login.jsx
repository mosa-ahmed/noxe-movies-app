import React, { useContext, useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { UserContext } from '../../Context/UserContext';


export default function Login() {
  const {setuserToken} = useContext(UserContext)
  const navigate = useNavigate()
  const [error, seterror] = useState(null)
  const [isloading, setisloading] = useState(false)

async function loginSubmit(values){
  setisloading(true)
  const {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',values).catch((err)=>{
    setisloading(false)
    seterror(err.response.data.message)
  })
  if(data.message === 'success'){
    setisloading(false)
    localStorage.setItem('userToken',data.token)
    setuserToken(data.token)
    navigate('/')
  }
}


const validationSchema = Yup.object({
  email:Yup.string().email('email is invalid').required(),
  password:Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/,'password is invalid').required()
})

  const formik = useFormik({
    initialValues:{
      email:'',
      password:'',
    },validationSchema,
    onSubmit: loginSubmit
  })
  return (
    <>
    <Helmet>
    <title>Login Page | Movie App</title>
  </Helmet>
    <div className="w-75 py-5 mx-auto">
      {error?<div className="alert alert-danger">{error}</div>:''}
      <h3>Login Now </h3>
      <form onSubmit={formik.handleSubmit}>


      <label htmlFor="email">Email: </label>
      <input type="email" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} className='form-control mb-2' id='email' name='email'/>
      {formik.errors.email && formik.touched.email?<div className='alert alert-danger mt-2 p-2'>{formik.errors.email}</div>:''}

      <label htmlFor="password">Password: </label>
      <input type="password" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} className='form-control mb-2' id='password' name='password'/>
      {formik.errors.password && formik.touched.password?<div className='alert alert-danger mt-2 p-2'>{formik.errors.password}</div>:''}


      {isloading?<button type='button'  className='btn bg-info text-white mt-2'><i className='fas fa-spinner fa-spin'></i></button>:
      <div className='d-flex align-items-center mt-3'>
          <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn btn-info text-white me-2'>Login</button>
      Don't have an account? <Link className='btn btn-danger ms-2' to={'/register'}>Register Now</Link>
      </div>
      
}
    </form>
    </div>

    </>
    
  )
}
