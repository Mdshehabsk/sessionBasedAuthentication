import React,{useState} from 'react'
import axios from 'axios'
const Login = () => {
    const [value,setValue] = useState({
        email:'',
        password:''
    })
    const inputChange = (e)=>{
        setValue({...value,[e.target.name]:e.target.value})
    }
    const formSubmit = async (e)=>{
        e.preventDefault()
        const res = await axios.post('http://localhost:4000/login',value,{withCredentials:true})
        console.log(res)
    }
    const {email,password} = value
  return (
    <>
    <form onSubmit={formSubmit} >
        <input onChange={inputChange}  type="text" name="email" placeholder='Enter your email' value={email} /><br />
        <input onChange={inputChange}  type="password" name="password" placeholder='Enter a password' value={password} /><br />
        <input type="submit" />
    </form>
    </>
  )
}

export default Login