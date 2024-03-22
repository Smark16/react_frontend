import React, {useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios'

function Editperson() {
    const navigate = useNavigate()
    const {id} = useParams()
    const singlePerson = `http://127.0.0.1:8000/applications/single_person/${id}`
    const singleUrl = `http://127.0.0.1:8000/applications/update_person/${id}`
    
    const [person, setPerson] = useState({Admission_No:"", Surname:"", Other_Names:"", Sex:"", Date_Of_Birth:"", Age:"", Postal_Address:"", Telephone:"", Email:"", Home_District:"", Subcounty:"", Nationality:"", Occupation:"", Present_Job_TiTle:""})

    const fetchPerson = async()=>{
        try{
            const response = await axios(singlePerson)
            const data = response.data
            setPerson(data)
            
        }catch(err){
            console.log('there was error')
        }
    }

    const handleChange = (e)=>{
    const {name, value} = e.target
    setPerson({...person, [name]:value})
    }
    console.log(person)

    const handleGender =(e)=>{
     let gender = e.target.value
     if(gender === 'm'){
        return  setPerson({...person, Sex:'male'})
     }else{
        return  setPerson({...person, Sex:'female'})
     }
    }

    const handleForm = (e)=>{
     e.preventDefault()

     const formData = new FormData()
formData.append("Admission_No", person.Admission_No)
formData.append("Surname", person.Surname)
formData.append("Other_Names", person.Other_Names)
formData.append("Sex", person.Sex)
formData.append("Date_Of_Birth", person.Date_Of_Birth)
formData.append("Age", person.Age)
formData.append("Postal_Address", person.Postal_Address)
formData.append("Telephone", person.Telephone)
formData.append("Email", person.Email)
formData.append("Home_District", person.Home_District)
formData.append("Subcounty", person.Subcounty)
formData.append("Nationality", person.Nationality)
formData.append("Occupation", person.Occupation)
formData.append("Present_Job_TiTle", person.Present_Job_TiTle)

     axios.put(singleUrl, formData)
     .then(response =>{
        console.log(response)
        successAlertPerson("Personal Details Successfully Updated")
        navigate('/personal')
     }).catch(err =>{
        console.log('there was an error', err)
        ErrorAlert("There was an Error!")
     })
    }

    const successAlertPerson =(message)=>{
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

    useEffect(()=>{
        fetchPerson()
    }, [])
  return (
    <>
    <h4 className='bg-info text-center mt-5 p-2'>Enter Details From Here</h4>
  
  <div className="row">
   <form className='detail col-sm-12 col-md-9'>

{/* peronal info */}
<h3>Personal Details</h3>

<div className="mb-3 mt-3">
<label htmlFor="formGroupExampleInput" className="form-label">
Admission No
</label>
<input
type="text"
className="form-control"
id="formGroupExampleInput"
name='Admission_No'
value={person.Admission_No}
onChange={handleChange}
/>
</div>
<div className="mb-3">
<label htmlFor="formGroupExampleInput2" className="form-label">
Surname
</label>
<input
type="text"
className="form-control"
id="formGroupExampleInput2"
name='Surname'
value={person.Surname}
onChange={handleChange}
/>
</div>

<div className="mb-3">
<label htmlFor="formGroupExampleInput" className="form-label">
Other Names
</label>
<input
type="text"
className="form-control"
id="formGroupExampleInput"
name='Other_Names'
value={person.Other_Names}
onChange={handleChange}
/>
</div>
<div className="mb-3">
<select onChange={handleGender}>
<option value=''>Choose Gender</option>
<option value='m'>Male</option>
<option value='f'>Female</option>
</select>
</div>

<div className="mb-3">
<label htmlFor="formGroupExampleInput" className="form-label">
Date of Birth
</label>
<input
type="date"
className="form-control"
id="formGroupExampleInput"
name='Date_Of_Birth'
value={person.Date_Of_Birth}
onChange={handleChange}
/>
</div>
<div className="mb-3">
<label htmlFor="formGroupExampleInput2" className="form-label">
Age
</label>
<input
type="number"
className="form-control"
id="formGroupExampleInput2"
name='Age'
value={person.Age}
onChange={handleChange}
/>
</div>

<div className="mb-3">
<label htmlFor="formGroupExampleInput" className="form-label">
Postal Address
</label>
<input
type="text"
className="form-control"
id="formGroupExampleInput"
name='Postal_Address'
value={person.Postal_Address}
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
value={person.Telephone}
onChange={handleChange}
/>
</div>

<div className="mb-3">
<label htmlFor="formGroupExampleInput" className="form-label">
Email
</label>
<input
type="email"
className="form-control"
id="formGroupExampleInput"
name='Email'
value={person.Email}
onChange={handleChange}
/>
</div>
<div className="mb-3">
<label htmlFor="formGroupExampleInput2" className="form-label">
Home District
</label>
<input
type="text"
className="form-control"
id="formGroupExampleInput2"
name='Home_District'
value={person.Home_District}
onChange={handleChange}
/>
</div>
<div className="mb-3">
<label htmlFor="formGroupExampleInput2" className="form-label">
Subcounty/Town
</label>
<input
type="text"
className="form-control"
id="formGroupExampleInput2"
name='Subcounty'
value={person.Subcounty}
onChange={handleChange}
/>
</div>
<div className="mb-3">
<label htmlFor="formGroupExampleInput2" className="form-label">
Nationality
</label>
<input
type="text"
className="form-control"
id="formGroupExampleInput2"
name='Nationality'
value={person.Nationality}
onChange={handleChange}
/>
</div>
<div className="mb-3">
<label htmlFor="formGroupExampleInput2" className="form-label">
Profession/Occupation
</label>
<input
type="text"
className="form-control"
id="formGroupExampleInput2"
name='Occupation'
value={person.Occupation}
onChange={handleChange}
/>
</div>
<div className="mb-3">
<label htmlFor="formGroupExampleInput2" className="form-label">
Your Present Job Title
</label>
<input
type="text"
className="form-control"
id="formGroupExampleInput2"
name='Present_Job_TiTle'
value={person.Present_Job_TiTle}
onChange={handleChange}
/>
</div>

<div className="btn">
  <button className='bg-primary text-center text-white' onClick={handleForm}>Update</button>
</div>
{/* end personal info */}
</form>
</div>
</>
);
}

export default Editperson;
