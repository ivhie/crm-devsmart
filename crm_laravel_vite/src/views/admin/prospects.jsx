import { useEffect } from "react";
import { useState } from "react"
import { Link } from "react-router-dom";
import axiosClient from "../../axiosClient";
import { useStateContext } from "../../contexts/contextprovider";

export default function Prospects(){
    const [prospects, setProspects] = useState([]);
    const [loading, setLoading] = useState(false);

    const {setMenu} = useStateContext();

    useEffect(()=> {
        getProspects();
    }, [])

    const onDeleteClick = prospect => {
        if (!window.confirm("Are you sure you want to delete this prospect?")) {
          return
        }
        axiosClient.delete(`/prospects/${prospect.id}`)
          .then((res) => {
            getProspects()
            alert(res.data.msg);
          })
      }
    
      
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
                    <td>{u.status}</td>
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
                
                {/* display if empty records*/} 
                {prospects=='' && <tr><td className="text-center" colSpan={10}>No records</td></tr>}
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