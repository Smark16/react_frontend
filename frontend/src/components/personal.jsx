import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import 'datatables.net';
import axios from 'axios';
import 'datatables.net-bs5';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css'
import { Link } from 'react-router-dom';

const personsUrl = 'https://registration-form-backend-2.onrender.com/applications/';

function Personal() {
  const [person, setPerson] = useState([]);
  const [personStatus, setPersonStatus] = useState(true)
  const [loading, setLoading] = useState(false)

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://registration-form-backend-2.onrender.com/applications/delete_person/${id}`);
      setPerson((prevPerson) => prevPerson.filter((person) => person.id !== id));
    } catch (err) {
      console.log("there was an err");
    }
  };

  const handleEdit = ()=>{
     
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await axios(personsUrl);
        if (response.status !== 200) {
          throw new Error('Network response was not ok');
        }
        const result = response.data;
        console.log(result);
        setPerson(result);
        setPersonStatus(false)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    if(person.length === 0){
        setPersonStatus(true)
      }else{
        setPersonStatus(false)
      }

  }, []); 

  useEffect(()=>{
    if (person.length > 0) {
        $('#myTable').DataTable();
      }
  }, [person])

  return (
    <div className='personInfo'>
    {loading ? (<span className="loader_table"></span>): (<>
        
        <table border="2" id="myTable" className='table myTable table-striped table-hover mt-4'>
        <thead>
          <tr>
            <th scope='col'>Admission No</th>
            <th scope='col'>Surname</th>
            <th scope='col'>Other_Names</th>
            <th scope='col'>Sex</th>
            <th scope='col'> Date_Of_Birth</th>
            <th scope='col'>Age</th>
            <th scope='col'>Postal_Address</th>
            <th scope='col'>Telephone</th>
            <th scope='col'>Email</th>
            <th scope='col'>Home_District</th>
            <th scope='col'>Subcounty</th>
            <th scope='col'>Nationality</th>
            <th scope='col'>Occupation</th>
            <th scope='col'>Present_Job_TiTle</th>
            <th scope='col'>Actions</th>

          </tr>
        </thead>
        <tbody>
          {personStatus && (<h4 className='text-center mt-3'>No People Available</h4>)}
          {person.map(order => {
            const  {id, Admission_No, Surname, Other_Names, Sex, Date_Of_Birth, Age, Postal_Address, Telephone, Email, Home_District, Subcounty, Nationality, Occupation, Present_Job_TiTle} = order;
            return (
              <tr key={id}>
                <td scope='col'>{Admission_No}</td>
                <td scope='col'>{Surname}</td>
                <td scope='col'>{Other_Names}</td>
                <td scope='col'>{Sex}</td>
                <td scope='col'>{Date_Of_Birth}</td>
                <td scope='col'>{Age}</td>
                <td scope='col'>{Postal_Address}</td>
                <td scope='col'>{Telephone}</td>
                <td scope='col'>{Email}</td>
                <td scope='col'>{Home_District}</td>
                <td scope='col'>{Subcounty}</td>
                <td scope='col'>{Nationality}</td>
                <td scope='col'>{Occupation}</td>
                <td scope='col'>{Present_Job_TiTle}</td>
                <td scope='col'>
                <i className="bi bi-trash3" onClick={()=>handleDelete(id)}></i>
                <Link to={`/edit_person_info/${id}`}>
                <i className="bi bi-pencil-square" onClick={handleEdit}></i>
                </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
        </>)}
    
    </div>
  );
}

export default Personal;

