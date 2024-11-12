import { useEffect } from "react";
import { useState } from "react"
import { Link, useLocation  } from "react-router-dom";
import axiosClient from "../../axiosClient";
import { useStateContext } from "../../contexts/contextprovider";

//import FlashMessage from 'react-flash-message';

export default function Clients(){

  
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const prosepectStatus = useState('');
    const fmessage = useLocation();
    let flash_message = location.fmessage;
    console.log(flash_message);

    const {setMenu} = useStateContext();

    useEffect(()=> {
        getClients();
    }, [])

    const onDeleteClick = clients => {
        if (!window.confirm("Are you sure you want to delete this client?")) {
          return
        }
        axiosClient.delete(`/clients/${clients.id}`)
          .then((res) => {
            getClients()
            alert(res.data.msg);
          })
      }
    
      
    const getClients = () => {
        setLoading(true)
        axiosClient.get('/clients')
          .then(({ data }) => {
            setLoading(false)
            setClients(data.data)
            setMenu( { link:'clients' } ) // set menu active to prospect
          })
          .catch(() => {
            setLoading(false)
          })
      }

    return(
        <>
       
    <div className="app-content"> {/*begin::Container*/}
      <div className="container-fluid"> {/* Info boxes */}
        <div className="row">
       
        <div className="card card-info card-outline mt-4 mt-b">
            <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center", marginTop: "10px"}}>
              <h1>Clients</h1>
              <div className="card-tools"><Link className="btn btn-warning" to="/clients/new">Add new</Link></div>
            </div> {/* /.card-header */}
            <div className="card-body p-0">
             {/* flash message */}
             
            {/*
            <FlashMessage duration={5000} persistOnHover={true}>
              <div className="alert alert-success">{flash_message}</div>
            </FlashMessage>
            */}

            <table className="table"> 
              <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Company</th>
                <th>Credentials</th>
                <th>Actions</th>
              </tr>
              </thead>
              {loading &&
                <tbody>
                <tr>
                  <td colSpan="7" className="text-center  mt-40 mb-40">
                    Loading...
                  </td>
                </tr>
                </tbody>
              }



            
              {!loading &&
                <tbody>
                {clients.map(u => (   
                 
                

                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.full_name}</td>
                    <td>{u.email}</td>
                    <td>{u.phone}</td>
                    <td>{u.company}</td>
                    <td>{u.credentials}</td>
                    <td>
                      <Link className="btn btn-info " to={'/clients/' + u.id}>Edit</Link>
                      &nbsp;
                      <button className="btn btn-danger" onClick={ev => onDeleteClick(u)}>Delete</button>
                    </td>
                  </tr>
                ))} 
                
                {/* display if empty records*/} 
                {clients=='' && <tr><td className="text-center" colSpan={7}>No records</td></tr>}
                </tbody>
              } 
            </table>
            </div>
        </div>
      
      </div>
      </div>
    </div>

        

      </>
    )
}