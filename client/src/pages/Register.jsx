import axios from 'axios'
import React, { useState } from 'react'

const Register = () => {
    const [value,setValue] = useState({
        name:'',
        email:'',
        password:''
    })
    const inputChange = (e)=>{
        setValue({...value,[e.target.name]:e.target.value})
    }
    const formSubmit = async (e)=>{
        e.preventDefault()
        const res =await axios.post('http://localhost:4000/register',value)
        console.log(res)
    }
    const {name,email,password} = value
  return (
    <>
    <form onSubmit={formSubmit} >
        <input onChange={inputChange}  type="text" name='name' placeholder='Enter your name' value={name} /><br />
        <input onChange={inputChange}  type="text" name="email" placeholder='Enter your email' value={email} /><br />
        <input onChange={inputChange}  type="password" name="password" placeholder='Enter a password' value={password} /><br />
        <input type="submit" />
    </form>
    </>
  )
}

export default Register