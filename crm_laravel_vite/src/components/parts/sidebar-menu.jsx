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

        <>
             <aside className="app-sidebar bg-body-secondary shadow" data-bs-theme="dark"> {/*begin::Sidebar Brand*/}
                <div className="sidebar-brand"> {/*begin::Brand Link*/}
                    <a href="./index.html" className="brand-link"> {/*begin::Brand Image*/} 
                    <img src="../../dist/assets/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image opacity-75 shadow" /> {/*end::Brand Image*/} {/*begin::Brand Text*/} <span className="brand-text fw-light">DevSmart CRM</span> {/*end::Brand Text*/} </a> {/*end::Brand Link*/} </div> {/*end::Sidebar Brand*/} {/*begin::Sidebar Wrapper*/}
                <div className="sidebar-wrapper">
                <nav className="mt-2"> {/*begin::Sidebar Menu*/}
                    <ul className="nav sidebar-menu flex-column" data-lte-toggle="treeview" role="menu" data-accordion="false">
                        { /*
                        <li className="nav-item"> 
                            <Link className="nav-link"  to="#"><i className="nav-icon bi bi-speedometer" />
                            <p>
                                Dashboard
                                <i className="nav-arrow bi bi-chevron-right" />
                            </p>
                            </Link>
                            <ul className="nav nav-treeview">
                            <li className="nav-item"> <a href="./index.html" className="nav-link"> <i className="nav-icon bi bi-circle" />
                                <p>Dashboard v1</p>
                                </a> </li>
                            <li className="nav-item"> <a href="./index2.html" className="nav-link active"> <i className="nav-icon bi bi-circle" />
                                <p>Dashboard v2</p>
                                </a> </li>
                            <li className="nav-item"> <a href="./index3.html" className="nav-link"> <i className="nav-icon bi bi-circle" />
                                <p>Dashboard v3</p>
                                </a> </li>
                            </ul>
                        </li>
                       
                        <li className="nav-item"> <a href="./generate/theme.html" className="nav-link"> <i className="nav-icon bi bi-palette" />
                            <p>Theme Generate</p>
                            </a> </li>
                        <li className="nav-item"> <a href="#" className="nav-link"> <i className="nav-icon bi bi-box-seam-fill" />
                            <p>
                                Widgets
                                <i className="nav-arrow bi bi-chevron-right" />
                            </p>
                            </a>
                            <ul className="nav nav-treeview">
                            <li className="nav-item"> <a href="./widgets/small-box.html" className="nav-link"> <i className="nav-icon bi bi-circle" />
                                <p>Small Box</p>
                                </a> </li>
                            <li className="nav-item"> <a href="./widgets/info-box.html" className="nav-link"> <i className="nav-icon bi bi-circle" />
                                <p>info Box</p>
                                </a> </li>
                            <li className="nav-item"> <a href="./widgets/cards.html" className="nav-link"> <i className="nav-icon bi bi-circle" />
                                <p>Cards</p>
                                </a> </li>
                            </ul>
                        </li>
                        <li className="nav-item"> <a href="#" className="nav-link"> <i className="nav-icon bi bi-clipboard-fill" />
                            <p>
                                Layout Options
                                <span className="nav-badge badge text-bg-secondary me-3">6</span> <i className="nav-arrow bi bi-chevron-right" />
                            </p>
                            </a>
                            <ul className="nav nav-treeview">
                            <li className="nav-item"> <a href="./layout/unfixed-sidebar.html" className="nav-link"> <i className="nav-icon bi bi-circle" />
                                <p>Default Sidebar</p>
                                </a> </li>
                            <li className="nav-item"> <a href="./layout/fixed-sidebar.html" className="nav-link"> <i className="nav-icon bi bi-circle" />
                                <p>Fixed Sidebar</p>
                                </a> </li>
                            <li className="nav-item"> <a href="./layout/layout-custom-area.html" className="nav-link"> <i className="nav-icon bi bi-circle" />
                                <p>Layout <small>+ Custom Area </small></p>
                                </a> </li>
                            <li className="nav-item"> <a href="./layout/sidebar-mini.html" className="nav-link"> <i className="nav-icon bi bi-circle" />
                                <p>Sidebar Mini</p>
                                </a> </li>
                            <li className="nav-item"> <a href="./layout/collapsed-sidebar.html" className="nav-link"> <i className="nav-icon bi bi-circle" />
                                <p>Sidebar Mini <small>+ Collapsed</small></p>
                                </a> </li>
                            <li className="nav-item"> <a href="./layout/logo-switch.html" className="nav-link"> <i className="nav-icon bi bi-circle" />
                                <p>Sidebar Mini <small>+ Logo Switch</small></p>
                                </a> </li>
                            <li className="nav-item"> <a href="./layout/layout-rtl.html" className="nav-link"> <i className="nav-icon bi bi-circle" />
                                <p>Layout RTL</p>
                                </a> </li>
                            </ul>
                        </li>
                        */ }
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
            </aside> {/*end::Sidebar*/} {/*begin::App Main*/}
        </>
    )

}