import React, { useEffect } from 'react'
import axios from 'axios'
const About = () => {
    const apiCall = async () => {
        const res = await axios.get('http://localhost:4000/about',{withCredentials:true})
        console.log(res)
    }
    useEffect(() => {
        apiCall()
    }, [])
  return (
    <>
    
    </>
  )
}

export default About