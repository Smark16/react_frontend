import Navbar from './components/Navbar'
import Form from './components/form'
import './App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Personal from './components/personal'
import Employer from './components/employer'
import Editperson from './components/editperson'
import Editemployer from './components/editemployer'
import { AuthProvider} from './components/Context'
import Login from './components/login'
import { useContext } from 'react'
import Logout from './components/Logout'
import PrivateRoute from './components/privateRoute'
import { userContext } from './Authenticate.jsx/Auth'

function App() {

  return (
    <>
    <Router>
      <AuthProvider>
      <Navbar/>
      <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element= {<PrivateRoute> <Form/></PrivateRoute>}/>
         <Route path="/personal" element= {<PrivateRoute> <Personal/></PrivateRoute>}/>
         <Route path="/employer" element= {<PrivateRoute> <Employer/></PrivateRoute>}/>
        <Route path="/edit_person_info/:id" element= {<PrivateRoute> <Editperson/></PrivateRoute>}/>
        <Route path="/edit_employer_info/:id" element= {<PrivateRoute> <Editemployer/></PrivateRoute>}/>
        <Route path="/logout" element= {<PrivateRoute> <Logout/></PrivateRoute>}/>
      </Routes>
          </AuthProvider>
    </Router>
    </>
  )
}

export default App
