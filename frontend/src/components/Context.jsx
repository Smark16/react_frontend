import React, {useState, useEffect, createContext} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2';
import { jwtDecode } from 'jwt-decode';
const LoginUrl = 'https://registration-form-backend-2.onrender.com/applications/serializer'

export const AuthContext = createContext()

export const AuthProvider = ({children}) =>{
    const [authTokens, setAuthTokens] = useState(null)
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
  
    const navigate = useNavigate()
   
   
    const loginUser = async (username, password) =>{
     axios.post(LoginUrl, {
       username, password
     }).then(response =>{
     if(response.status === 200){
       const data = response.data
       setAuthTokens(data)
       setUser(jwtDecode(data.access))
     localStorage.setItem("authtokens", JSON.stringify(data))
     showSuccessAlert("Login successfull")
     navigate("/")
     }else{
        showErrorAlert("server issue")
     }
     }).catch (err => {
       console.log("Error", err)
       showErrorAlert("Please provide correct username/password")
       navigate("/login")
     })
    }
   
    
   
   const logoutUser = ()=>{
   setAuthTokens(null)
   setUser(null)
   localStorage.removeItem("authtokens")
   showSuccessAlert("You have been logged out")
   .then(()=>{
     navigate("/login")
   })
   }
   
   const showSuccessAlert =(message)=>{
       Swal.fire({
           title:message,
           icon:"success",
           timer:6000,
           toast:true,
           position:'top-right',
           timerProgressBar:true,
           showConfirmButton:true,
       })
   }
   
   const showErrorAlert =(message)=>{
    Swal.fire({
       title:message,
       icon:"error",
       toast:true,
       timer:6000,
       position:"top-right",
       timerProgressBar:true,
       showConfirmButton:true,
   
    })
   }
   
   useEffect(()=>{
       if(authTokens){
         const decodedUser =  jwtDecode(authTokens.access)
         setUser(decodedUser)
       }
       setLoading(false)
   }, [authTokens, loading])
   
   const contextData = {
       user, setUser,
       authTokens, setAuthTokens,
       loginUser, logoutUser,
   }
   return (
       <AuthContext.Provider value={contextData}>
     {loading ? null : children}
       </AuthContext.Provider>
   )
   }
   
   
   
