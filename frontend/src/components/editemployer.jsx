import React, { useEffect, useState } from 'react'
import { useParams, useNavigate} from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

function Editemployer() {
    const {id} = useParams()
    const navigate = useNavigate()
    const singleEmployerUrl = https://registration-form-backend-2.onrender.com/applications/Single_employer/${id}`
    const updateEmployerUrl = `https://registration-form-backend-2.onrender.com/applications/update_employer/${id}`
    const [employer, setEmployer] = useState({Employer:"", Postal_Address:"",Telephone:"", Email:""})

    const fetchEmployer = async()=>{
try{
    const response =  await axios(singleEmployerUrl)
    const data = response.data
    setEmployer(data)
}catch(err){
    console.log('there was an error')
}
    }

useEffect(()=>{
    fetchEmployer()
}, [])

    const handleChange =(e)=>{
     const {name, value} = e.target
     setEmployer({...employer, [name]:value})
    }

    const handleSubmit = (e)=>{
        e.preventDefault()

        const details = new FormData()
        details.append("Employer", employer.Employer)
        details.append("Postal_Address", employer.Postal_Address)
        details.append("Telephone", employer.Telephone)
        details.append("Email", employer.Email)

        axios.put(updateEmployerUrl, details)
        .then(response =>{
            console.log(response)
            successAlertEmployer("Updated Successfully")
            navigate('/employer')
        }).catch(err =>{
            console.log(err)
            ErrorAlert("There was an Error!")
        })

    }

    const successAlertEmployer =(message)=>{
        Swal.fire({
          title:message,
          icon:"success",
          timer:6000,
          toast:true,
          position:'top',
          timerProgressBar:true,
          showConfirmButton:true,
      })
      }
      
      const ErrorAlert = (message)=>{
        Swal.fire({
          title:message,
          icon:"error",
          timer:6000,
          toast:true,
          timerProgressBar:true,
          showConfirmButton:true,
        })
      }

  return (
    <form className='employ mt-4'>
    <h3>Employer Information</h3>
    <div className="mb-3">
    <label htmlFor="formGroupExampleInput2" className="form-label">
      Employer
    </label>
    <input
      type="text"
      className="form-control"
      id="formGroupExampleInput2"
      name='Employer'
      value={employer.Employer}
      onChange={handleChange}
    />
    </div>
    <div className="mb-3">
    <label htmlFor="formGroupExampleInput2" className="form-label">
      Employer's Postal Address
    </label>
    <input
      type="text"
      className="form-control"
      id="formGroupExampleInput2"
      name='Postal_Address'
      value={employer.Postal_Address}
      onChange={handleChange}
    />
    </div>
    <div className="mb-3">
    <label htmlFor="formGroupExampleInput2" className="form-label">
      Telephone
    </label>
    <input
      type="number"
      className="form-control"
      id="formGroupExampleInput2"
      name='Telephone'
      value={employer.Telephone}
      onChange={handleChange}
    />
    </div>
    
    <div className="mb-3">
    <label htmlFor="formGroupExampleInput2" className="form-label">
      Email
    </label>
    <input
      type="Email"
      className="form-control"
      id="formGroupExampleInput2"
      name='Email'
      value={employer.Email}
      onChange={handleChange}
    />
    </div>
    <div className="btns">
        <button className='bg-primary text-center text-white' onClick={handleSubmit}>Update</button>
    </div>
    </form>
  )
}

export default Editemployer
