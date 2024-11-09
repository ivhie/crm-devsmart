//import { Navigate, Outlet } from "react-router-dom";
//import { useStateContext } from '../contexts/contextprovider.jsx'
import { Link} from "react-router-dom";

export default function Header() {
    //const {user, token } = useStateContext();
   // if(token) {
    //    return (<Navigate to='/' />);
   // }
    return(
         <>
        
            <nav className="app-header navbar navbar-expand bg-body"> {/*begin::Container*/}
                <div className="container-fluid"> {/*begin::Start Navbar Links*/}
                <ul className="navbar-nav">
                    <li className="nav-item"> <a className="nav-link" data-lte-toggle="sidebar" href="#" role="button"> <i className="bi bi-list" /> </a> </li>
                    <li className="nav-item d-none d-md-block"> <Link className="btn"  to="#">Home</Link></li>
                    <li className="nav-item d-none d-md-block"> <Link className="btn"  to="#">Contact</Link></li>
                </ul> {/*end::Start Navbar Links*/} {/*begin::End Navbar Links*/}
                <ul className="navbar-nav ms-auto"> {/*begin::Navbar Search*/}
                    <li className="nav-item"> <a className="nav-link" data-widget="navbar-search" href="#" role="button"> <i className="bi bi-search" /> </a> </li> {/*end::Navbar Search*/} {/*begin::Messages Dropdown Menu*/}
                    <li className="nav-item dropdown"> <a className="nav-link" data-bs-toggle="dropdown" href="#"> <i className="bi bi-chat-text" /> <span className="navbar-badge badge text-bg-danger">3</span> </a>
                    <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end"> <a href="#" className="dropdown-item"> {/*begin::Message*/}
                        <div className="d-flex">
                            <div className="flex-shrink-0"> <img src="../../dist/assets/img/user1-128x128.jpg" alt="User Avatar" className="img-size-50 rounded-circle me-3" /> </div>
                            <div className="flex-grow-1">
                            <h3 className="dropdown-item-title">
                                Brad Diesel
                                <span className="float-end fs-7 text-danger"><i className="bi bi-star-fill" /></span>
                            </h3>
                            <p className="fs-7">Call me whenever you can...</p>
                            <p className="fs-7 text-secondary"> <i className="bi bi-clock-fill me-1" /> 4 Hours Ago
                            </p>
                            </div>
                        </div> {/*end::Message*/}
                        </a>
                        <div className="dropdown-divider" /> <a href="#" className="dropdown-item"> {/*begin::Message*/}
                        <div className="d-flex">
                            <div className="flex-shrink-0"> <img src="../../dist/assets/img/user8-128x128.jpg" alt="User Avatar" className="img-size-50 rounded-circle me-3" /> </div>
                            <div className="flex-grow-1">
                            <h3 className="dropdown-item-title">
                                John Pierce
                                <span className="float-end fs-7 text-secondary"> <i className="bi bi-star-fill" /> </span>
                            </h3>
                            <p className="fs-7">I got your message bro</p>
                            <p className="fs-7 text-secondary"> <i className="bi bi-clock-fill me-1" /> 4 Hours Ago
                            </p>
                            </div>
                        </div> {/*end::Message*/}
                        </a>
                        <div className="dropdown-divider" /> <a href="#" className="dropdown-item"> {/*begin::Message*/}
                        <div className="d-flex">
                            <div className="flex-shrink-0"> <img src="../../dist/assets/img/user3-128x128.jpg" alt="User Avatar" className="img-size-50 rounded-circle me-3" /> </div>
                            <div className="flex-grow-1">
                            <h3 className="dropdown-item-title">
                                Nora Silvester
                                <span className="float-end fs-7 text-warning"> <i className="bi bi-star-fill" /> </span>
                            </h3>
                            <p className="fs-7">The subject goes here</p>
                            <p className="fs-7 text-secondary"> <i className="bi bi-clock-fill me-1" /> 4 Hours Ago
                            </p>
                            </div>
                        </div> {/*end::Message*/}
                        </a>
                        <div className="dropdown-divider" /> <a href="#" className="dropdown-item dropdown-footer">See All Messages</a>
                    </div>
                    </li> {/*end::Messages Dropdown Menu*/} {/*begin::Notifications Dropdown Menu*/}
                    <li className="nav-item dropdown"> <a className="nav-link" data-bs-toggle="dropdown" href="#"> <i className="bi bi-bell-fill" /> <span className="navbar-badge badge text-bg-warning">15</span> </a>
                    <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end"> <span className="dropdown-item dropdown-header">15 Notifications</span>
                        <div className="dropdown-divider" /> <a href="#" className="dropdown-item"> <i className="bi bi-envelope me-2" /> 4 new messages
                        <span className="float-end text-secondary fs-7">3 mins</span> </a>
                        <div className="dropdown-divider" /> <a href="#" className="dropdown-item"> <i className="bi bi-people-fill me-2" /> 8 friend requests
                        <span className="float-end text-secondary fs-7">12 hours</span> </a>
                        <div className="dropdown-divider" /> <a href="#" className="dropdown-item"> <i className="bi bi-file-earmark-fill me-2" /> 3 new reports
                        <span className="float-end text-secondary fs-7">2 days</span> </a>
                        <div className="dropdown-divider" /> <a href="#" className="dropdown-item dropdown-footer">
                        See All Notifications
                        </a>
                    </div>
                    </li> {/*end::Notifications Dropdown Menu*/} {/*begin::Fullscreen Toggle*/}
                    <li className="nav-item"> <a className="nav-link" href="#" data-lte-toggle="fullscreen"> <i data-lte-icon="maximize" className="bi bi-arrows-fullscreen" /> <i data-lte-icon="minimize" className="bi bi-fullscreen-exit" style={{display: 'none'}} /> </a> </li> {/*end::Fullscreen Toggle*/} {/*begin::User Menu Dropdown*/}
                    
                </ul> {/*end::End Navbar Links*/}
                </div> {/*end::Container*/}
            </nav> {/*end::Header*/} {/*begin::Sidebar*/}
           
            </>
    )

}