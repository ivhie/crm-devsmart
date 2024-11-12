import { useEffect, useMemo, useState } from "react";
import { Link, useLocation  } from "react-router-dom";
import axiosClient from "../../axiosClient";
import { useStateContext } from "../../contexts/contextprovider";
//import DataTable from 'react-data-table-component';

//import FlashMessage from 'react-flash-message';

import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import 'datatables.net-select-dt';
import 'datatables.net-responsive-dt';
import 'datatables.net-bs5';


DataTable.use(DT);


export default function Prospects(){
      


    

   // const [prospects, setProspects] = useState([]);
    const [prospectsdatacolumn, setProspectsdatacolumn] = useState([]);
    const [loading, setLoading] = useState(false);
    //const [pending, setPending] = useState(true); // data table use
    
    const prosepectStatus = useState('');
    const fmessage = useLocation();
    let flash_message = location.fmessage;
    console.log(flash_message);

    const {setMenu} = useStateContext();



    useEffect(()=> {
        //getProspects();
        getProspectsDataColumn();

    }, [])

    const onDeleteClick = prospect => {
        if (!window.confirm("Are you sure you want to delete this prospect?")) {
          return
        }
        axiosClient.delete(`/prospects/${prospect.id}`)
          .then((res) => {
            //getProspects()
            alert(res.data.msg);
          })
      }
    
    /*
    const getProspects = () => {
        setLoading(true)
        axiosClient.get('/prospects')
          .then(({ data }) => {
            setLoading(false)
            setProspects(data.data)
            setMenu( { link:'prospects' } ) // set menu active to prospect
          })
          .catch(() => {
            setLoading(false)
          })
      }
          */


      const columns = [
        { name: 'ID', selector: row => row.id, sortable: true,},
        { name: 'Status', selector: row => row.status, sortable: true,},
        { name: 'Name', selector: row => row.full_name, sortable: true,},
        { name: 'Email', selector: row => row.email, sortable: true,},
        { name: 'Phone', selector: row => row.phone, sortable: false,},
        { name: 'Company', selector: row => row.company, sortable: true,},
        { name: 'FB Link', selector: row => row.fb_link, sortable: false,},
        { name: 'Website Link', selector: row => row.website_link, sortable: false,},
        { name: 'Notes', selector: row => row.comments, sortable: false,},
        { name: 'Actions', selector: row => row.action, sortable: false,},
        
      ];
      
      const getProspectsDataColumn = () => {
        setLoading(true)
        axiosClient.get('/prospects2')
          .then(({ data }) => {
            setLoading(false)
            setProspectsdatacolumn(data.data);
            setMenu( { link:'prospects' } ) // set menu active to prospect
            //alert(data.data);
          })
          .catch(() => {
            setLoading(false)
            //alert('ddddd');
          })
      }
      
      const data = [
          { id: 1, status: 'Active', full_name: 'Ivan Dolera', email: 'Ivan Dolera', phone: 'Ivan Dolera', 
            company: 'Ivan Dolera', fb_link: 'Ivan Dolera', website_link: 'Ivan Dolera',  comments: 'Ivan Dolera',  
            action:   <Link className="btn btn-info " to={'/prospects/'}>Edit</Link>,},
      ]

    return(
        <>
       
    <div className="app-content"> {/*begin::Container*/}
      <div className="container-fluid"> {/* Info boxes */}
        <div className="row">
       
        <div className="card card-info card-outline mt-4 mt-b">
            <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center", marginTop: "10px"}}>
              <h1>Propects</h1>
              <div className="card-tools"><Link className="btn btn-warning" to="/prospects/new">Add new</Link></div>
            </div> {/* /.card-header */}
            <div className="card-body p-0">
             {/* flash message */}
             
            {/*
            <FlashMessage duration={5000} persistOnHover={true}>
              <div className="alert alert-success">{flash_message}</div>
            </FlashMessage>
            */}
            {
              /*
              <DataTable
                    columns={columns} noDataComponent= {loading}
                    data={prospectsdatacolumn} pagination progressPending={loading}
                  />*/ }

        <DataTable data={prospectsdatacolumn} className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Status</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Company</th>
                  <th>FB Link</th>
                  <th>Website Link</th>
                  <th>Notes</th>
                  <th>Actions</th>
                </tr>
              </thead>
        </DataTable>

            {/*
            <table className="table"> 
              <thead>
              <tr>
                <th>ID</th>
                <th>Status</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Company</th>
                <th>FB Link</th>
                <th>Website Link</th>
                <th>Notes</th>
                <th>Actions</th>
              </tr>
              </thead>
              {loading &&
                <tbody>
                <tr>
                  <td colSpan="10" className="text-center  mt-40 mb-40">
                    Loading...
                  </td>
                </tr>
                </tbody>
              }



            
              {!loading &&
                <tbody>
                {prospects.map(u => (   
                 
                

                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.status.toUpperCase(0)}</td>
                    <td>{u.full_name}</td>
                    <td>{u.email}</td>
                    <td>{u.phone}</td>
                    <td>{u.company}</td>
                    <td>{u.fb_link}</td>
                    <td>{u.website_link}</td>
                    <td>{u.comments}</td>
                    <td>
                      <Link className="btn btn-info " to={'/prospects/' + u.id}>Edit</Link>
                      &nbsp;
                      <button className="btn btn-danger" onClick={ev => onDeleteClick(u)}>Delete</button>
                    </td>
                  </tr>
                ))} 
                
               
                {prospects=='' && <tr><td className="text-center" colSpan={10}>No records</td></tr>}
                </tbody>
              } 
            </table>
            */}


            </div>
        </div>
      
      </div>
      </div>
    </div>

        

      </>
    )
}