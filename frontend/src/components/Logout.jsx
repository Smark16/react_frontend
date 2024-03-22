import { useContext} from 'react'
import { AuthContext } from './Context'

function Logout() {
    const {setUser, setAuthTokens} =  useContext(AuthContext)
  localStorage.removeItem("authtokens")
  setUser(null)
  setAuthTokens(null)
  window.location.href = '/login'

}

export default Logout
