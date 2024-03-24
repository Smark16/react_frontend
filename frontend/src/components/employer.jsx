import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs5';
import axios from 'axios';
import {Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'

const employerUrl = 'https://registration-form-backend-2.onrender.com/applications/employer'

function Employer() {
  const [employer, setEmployer] = useState([]);
  const [employerStatus, setEmployerStatus] = useState(true)

  const handleDelete = async (id)=>{
    try{
      await axios.delete(`https://registration-form-backend-2.onrender.com/applications/delete_employer/${id}`)
      setEmployer((prevEmployer) => prevEmployer.filter((employer) => employer.id !== id));

    }catch (err){
      console.log("there was an err")
    }
  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios(employerUrl);
        if (response.status !== 200) {
          throw new Error('Network response was not ok');
        }
        const result = response.data;
        setEmployer(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    if(employer.length === 0){
      setEmployerStatus(true)
    }else{
      setEmployerStatus(false)
    }
  }, []);

  useEffect(() => {
    if (employer.length > 0) {
      $('#myTable').DataTable();
    }

  }, [employer]);



  return (
    <div>
      <table border="2" id="myTable" className='table myTable table-striped table-hover'>
        <thead>
          <tr>
                            <th scope='col'>Employer</th>
                            <th scope='col'>Postal Address</th>
                            <th scope='col'>Telephone</th>
                            <th scope='col'>Email</th>
                            <th scope='col'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employerStatus && (<h4 className='text-center mt-3'>No Employer Infomation Available</h4>)}
          {employer.map(order =>{
             const {id, Employer, Postal_Address, Telephone, Email} = order
             return (
               <>
               <tr key={id}>
               <td scope='col'>{Employer}</td>
                    <td scope='col'>{Postal_Address}</td>
                    <td scope='col'>{Telephone}</td>
                    <td scope='col'>{Email}</td>
                    <td scope='col'>
                    <i className="bi bi-trash" onClick={()=>handleDelete(id)}></i>
                    <Link to={`/edit_employer_info/${id}`}>
                    <i className="bi bi-pencil-square"></i>
                    </Link>
                    </td>
            </tr>
               </>
             )
          })}
           
        </tbody>
      </table>
    </div>
  );

}

export default Employer;

