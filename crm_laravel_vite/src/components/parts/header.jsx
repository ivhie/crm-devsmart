//import { Navigate, Outlet } from "react-router-dom";
//import { useStateContext } from '../contexts/contextprovider.jsx'
import { Link} from "react-router-dom";

export default function Header() {
    //const {user, token } = useStateContext();
   // if(token) {
    //    return (<Navigate to='/' />);
   // }
    return(
     
        
            <nav className="app-header navbar navbar-expand bg-body"> {/*begin::Container*/}
                <div className="container-fluid"> {/*begin::Start Navbar Links*/}
                    <ul className="navbar-nav">
                     <li className="nav-item"> 
                            <a className="nav-link"  data-lte-toggle="sidebar" role="button" href="#" > 
                                <i className="bi bi-list"></i>
                            </a>
                        </li>
                    </ul> 
               
                </div> {/*end::Container*/}
            </nav>   
    )

}