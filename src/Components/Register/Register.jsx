import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {

  const navigate = useNavigate()
  const [error, seterror] = useState(null)
  const [isloading, setisloading] = useState(false)

async function registerSubmit(values){
  setisloading(true)
  const {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values).catch((err)=>{
    setisloading(false)
    seterror(err.response.data.message)
  })
  if(data.message === 'success'){
    setisloading(false)
    navigate('/login')
    console.log(data);
  }
}


const phoneRegex = /^(002)?(01)[0-25][0-9]{8}$/
const validationSchema = Yup.object({
  name:Yup.string().min(3,'name minLength is 3').max(10,'name maxLength is 10').required(),
  email:Yup.string().email('email is invalid').required(),
  phone:Yup.string().matches(phoneRegex,'phone is invalid').required(),
  password:Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/,'password is invalid').required(),
  rePassword:Yup.string().oneOf([Yup.ref('password')],'repassword does not match').required()
})

  const formik = useFormik({
    initialValues:{
      name:'',
      phone:'',
      email:'',
      password:'',
      rePassword:''
    },validationSchema,
    onSubmit: registerSubmit
  })
  return (
    <div className="w-75 py-5 mx-auto">
      {error?<div className="alert alert-danger">{error}</div>:''}
      <h3>Register Now </h3>
      <form onSubmit={formik.handleSubmit}>
      <label htmlFor="name">Name: </label>
      <input type="text" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} className='form-control mb-2' id='name' name='name'/>
      {formik.errors.name && formik.touched.name?<div className='alert alert-danger mt-2 p-2'>{formik.errors.name}</div>:''}

      <label htmlFor="phone">Phone: </label>
      <input type="tel" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} className='form-control mb-2' id='phone' name='phone'/>
      {formik.errors.phone && formik.touched.phone?<div className='alert alert-danger mt-2 p-2'>{formik.errors.phone}</div>:''}

      <label htmlFor="email">Email: </label>
      <input type="email" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} className='form-control mb-2' id='email' name='email'/>
      {formik.errors.email && formik.touched.email?<div className='alert alert-danger mt-2 p-2'>{formik.errors.email}</div>:''}

      <label htmlFor="password">Password: </label>
      <input type="password" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} className='form-control mb-2' id='password' name='password'/>
      {formik.errors.password && formik.touched.password?<div className='alert alert-danger mt-2 p-2'>{formik.errors.password}</div>:''}

      <label htmlFor="RePassword">Re-Password: </label>
      <input type="password" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} className='form-control mb-2' id='RePassword' name='rePassword'/>
      {formik.errors.rePassword && formik.touched.rePassword?<div className='alert alert-danger mt-2 p-2'>{formik.errors.rePassword}</div>:''}

      {isloading?<button type='button'  className='btn bg-main text-white mt-2'><i className='fas fa-spinner fa-spin'></i></button>:
      <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn btn-info text-white mt-3'>Register</button>
}
    </form>
    </div>

  )
}
