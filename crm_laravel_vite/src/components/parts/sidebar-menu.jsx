//import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from '../../contexts/contextprovider.jsx'
import { Link} from "react-router-dom";
import axiosClient from "../../axiosClient";
export default function Sidebarmenu() {

    const {user, token, menu, setUser, setToken,SetMenu} = useStateContext();
   // if(token) {
    //    return (<Navigate to='/' />);
   // }
  
   const onLogout =  (ev) =>{
        ev.preventDefault();
        axiosClient.get('/logout')
        .then(({}) => {
            setUser(null)
            setToken(null)
        })
    }

    return(
             <aside className="app-sidebar bg-body-secondary shadow" data-bs-theme="dark"> {/*begin::Sidebar Brand*/}
                <div className="sidebar-brand"> {/*begin::Brand Link*/}
                    <a href="#" className="brand-link"> {/*begin::Brand Image*/} 
                    <img src="../../dist/assets/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image opacity-75 shadow" /> {/*end::Brand Image*/} {/*begin::Brand Text*/} <span className="brand-text fw-light">DevSmart CRM</span> {/*end::Brand Text*/} </a> {/*end::Brand Link*/} 
                </div> {/*end::Sidebar Brand*/} {/*begin::Sidebar Wrapper*/}
                <div className="sidebar-wrapper">
                    <nav className="mt-2"> {/*begin::Sidebar Menu*/}
                        <ul className="nav sidebar-menu flex-column" data-lte-toggle="treeview" role="menu" data-accordion="false">
                        
                            <Link className={ menu.link=="dashboard"?"nav-link active":"nav-link"}   to="/dashboard"><i className="nav-icon bi bi-box-seam "   />
                                <p>
                                    Dashboard   
                                </p>
                            </Link>
                            <Link className={ menu.link=="clients"?"nav-link active":"nav-link"}  to="/clients"><i className="nav-icon bi bi-database-gear" />
                                <p>
                                Clients
                                </p>
                            </Link>
                            <Link className={ menu.link=="prospects"?"nav-link active":"nav-link"}  to="/prospects"> <i className="nav-icon bi bi-person-lines-fill" />
                                <p>
                                Prospects
                                </p>
                            </Link>
                            <Link className={ menu.link=="fbpages"?"nav-link active":"nav-link"}  to="/fbpages"> <i className="nav-icon bi bi-person-lines-fill" />
                                <p>
                                FB Pages
                                </p>
                            </Link>
                        
                            <Link className={ menu.link=="users"?"nav-link active":"nav-link"}  to="users">  <i className="nav-icon bi bi-people" />
                                <p>
                                Users
                                </p>
                            </Link>
                        
                            <li className="nav-item"> 
                                <a href="#" className="nav-link" onClick={onLogout}> 
                                    <i className="nav-icon bi bi-box-arrow-in-right" />
                                    <p>Logout</p>
                                    
                                </a>
                            </li>
                    
                    
                    
                        </ul> {/*end::Sidebar Menu*/}
                    </nav>
                </div> {/*end::Sidebar Wrapper*/}
            </aside> 
    )

}