import React, {useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import '../App.css'
import './main.css'
import axios from 'axios'
import Swal from 'sweetalert2'

const personPostUrl = 'http://127.0.0.1:8000/applications/new_person'
const employerPostUrl = 'http://127.0.0.1:8000/applications/new_employer'

function Form() {
    const [visible, setVisible] = useState(false)
    const [person, setPerson] = useState({Admission_No:"", Surname:"", Other_Names:"", Sex:"", Date_Of_Birth:"", Age:"", Postal_Address:"", Telephone:"", Email:"", Home_District:"", Subcounty:"", Nationality:"", Occupation:"", Present_Job_TiTle:""})
    const [employer, setEmployer] = useState({Employer:"", Postal_Address:"",Telephone:"", Email:""})


const handleBack = ()=>{
setTimeout(() => {
    setVisible(false); 
  }, 1000);
}

const handleChange = (e)=>{

 const {name, value} = e.target
 setPerson({...person, [name]:value})
 setEmployer({...employer, [name]:value})

}

const handleGender = (e)=>{
    let gender = e.target.value
    setPerson({ ...person, Sex: gender === 'm' ? 'male' : 'female' });   
}

const handleForm = (e)=>{
  e.preventDefault()
  // form data for person
  if(person.Admission_No === "" && person.Surname === "" && person.Other_Names === "" && person.Sex === "" && person.Date_Of_Birth === "" && person.Age === "" && person.Postal_Address === "" && person.Telephone === "" && person.Email === "" && person.Home_District === "" && person.Subcounty === "" && person.Nationality === "" && person.Occupation === "" && person.Present_Job_TiTle === ""){
    ErrorAlert("Please fill in the credentials")
  }

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

axios.post(personPostUrl, formData)
.then(response =>{
  if(response.status === 200){
    console.log(response)
    setPerson({Admission_No:"", Surname:"", Other_Names:"", Sex:"", Date_Of_Birth:"", Age:"", Postal_Address:"", Telephone:"", Email:"", Home_District:"", Subcounty:"", Nationality:"", Occupation:"", Present_Job_TiTle:""})
    successAlertPerson("Personal Details Successfully Submitted")
    setVisible(true); 
  }else if(response.status === 400){
    ErrorAlert("There was an Error!")
  }
   
}).catch(err =>{
    console.log('There was a server error', err)
})

    
    // setLoading(true);
}

const handleSubmit =(e)=>{
e.preventDefault()

// form data for employer
const details = new FormData()
details.append("Employer", employer.Employer)
details.append("Postal_Address", employer.Postal_Address)
details.append("Telephone", employer.Telephone)
details.append("Email", employer.Email)

axios.post(employerPostUrl, details)
.then(response =>{
  if(response.status === 201){
    console.log(response)
    setEmployer({Employer:"", Postal_Address:"",Telephone:"", Email:""})
    successAlertEmployer("Submitted Successfully")
  }else{
    ErrorAlert("There was an Error!")
  }

}).catch(err =>{
    console.log('there was server error', err)
})
}


const successAlertEmployer = (message)=>{
 Swal.fire({
        title:message,
        icon:"success",
        timer:6000,
        // toast:true,
        // position:'top-right',
        // timerProgressBar:true,
        // showConfirmButton:true,
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

  return (
      <>
      <h4 className='bg-info text-center mt-5 p-2'>Enter Details From Here</h4>
    
    <div className="row">

{!visible && (
    <>
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
  required
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
  required
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
  required
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
  required
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
  required
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
  required
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
  required
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
  required
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
  required
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
  required
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
  required
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
  required
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
  required
  value={person.Present_Job_TiTle}
  onChange={handleChange}
/>
</div>

<div className="btn">
    <button className='bg-primary text-center text-white nxt' onClick={handleForm}>Next</button>
</div>
{/* end personal info */}
</form>

    </>
)}
   

{/* employee info */}

{visible && (<>
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
  required
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
  required
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
  required
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
  type="email"
  className="form-control"
  id="formGroupExampleInput2"
  required
  name='Email'
  value={employer.Email}
  onChange={handleChange}
/>
</div>
<div className="btns">
    <button className='bg-primary text-center text-white' onClick={handleBack}>Previous</button>
    <button className='bg-primary text-center text-white' onClick={handleSubmit}>Submit</button>
</div>
</form>

</>)}
{/* end employee */}

    </div>
  </>
  )
}

export default Form
