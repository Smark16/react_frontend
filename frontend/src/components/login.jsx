import React, { useContext, useState } from 'react'
import { AuthContext } from './Context'
import './main.css'

function Login() {
  const {loginUser} = useContext(AuthContext)
  const [user, setUser] = useState({username:"", password:""})


  const handleChange =(e)=>{
      const {name, value} = e.target
      setUser({...user, [name]:value})
  }

  const handleSubmit = (e)=>{
      e.preventDefault()
      if(loginUser){
        const username = user.username
        const password = user.password
        loginUser(username, password)
      }
  }
  return (
 <>
 <form onSubmit={handleSubmit} className='login text-center'>
  <div className="row mb-3">
    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
      Username
    </label>
    <div className="col-sm-10">
      <input 
      type="text" 
      className="form-control" 
      id="inputEmail3" 
      name='username'
      value={user.username}
      onChange={handleChange}
      />
    </div>
  </div>
  <div className="row mb-3">
    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
      Password
    </label>
    <div className="col-sm-10">
      <input 
      type="password" 
      className="form-control" 
      id="inputPassword3" 
      name='password'
      value={user.password}
      onChange={handleChange}
      />
    </div>
  </div>
  
  <button type="submit" className="btn btn-primary">
    Login
  </button>
  </form>
 </>
  )
}

export default Login
