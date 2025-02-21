import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useContext } from "react";
import { Navigate, Outlet,Link} from "react-router-dom";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/contextprovider";

import  Header  from "./parts/header.jsx";
import  Sidebarmenu  from "./parts/sidebar-menu.jsx";
import  Footer  from "./parts/footer.jsx";

export default function DefaultLayout(){

    const {user, token} = useStateContext();
    if(!token){
       return <Navigate to='/login'/>
    }
    

    return (
        
       <div className="app-wrapper"> {/*begin::Header*/}
            <Header />
            <Sidebarmenu />
            <main className="app-main"> {/*begin::App Content Header*/}
                <Outlet />
            </main> {/*end::App Main*/} {/*begin::Footer*/}
            <Footer />
        </div>
    )
}