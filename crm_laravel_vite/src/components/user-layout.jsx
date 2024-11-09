import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from '../contexts/contextprovider.jsx'

export default function Userlayout() {
    const {user, token } = useStateContext();
    if(token) {
        return (<Navigate to='/' />);
    }
    return(

        <div>
            User Page Here
            <Outlet />
        </div>
    )

}