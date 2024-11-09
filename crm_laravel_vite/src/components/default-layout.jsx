
import { useStateContext } from '../contexts/contextprovider.jsx'
import { Navigate, Outlet } from "react-router-dom";

export default function Defaultlayout() {

  const {token} = useStateContext();

    if(token){
       return <Navigate to='/users'/>
    }

  


    return(

        <div>
           <Outlet />
        </div>
    )

}