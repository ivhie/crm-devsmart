import { useEffect } from "react";
import { useState } from "react"
import { Link, useLocation  } from "react-router-dom";
import axiosClient from "../../axiosClient";
import { useStateContext } from "../../contexts/contextprovider";

//import FlashMessage from 'react-flash-message';

export default function Fbpages(){

  
    const [fbpages, setFbpages] = useState([]);
    const [loading, setLoading] = useState(false);
    
    //const prosepectStatus = useState('');
    const fmessage = useLocation();
    let flash_message = location.fmessage;
    console.log(flash_message);

    const {setMenu} = useStateContext();

    useEffect(()=> {
        getFbpages();
    }, [])

    const onDeleteClick = fbpages => {
        if (!window.confirm("Are you sure you want to delete this client?")) {
          return
        }
        axiosClient.delete(`/fbpage/${fbpages.id}`)
          .then((res) => {
            getFbpages()
            alert(res.data.msg);
          })
      }
    
      
    const getFbpages = () => {
        setLoading(true)
                 
        //alert('ddfdf');    
        
        //alert('herer');
        axiosClient.get('/fbpages')
          .then(({ data }) => {
            setLoading(false)
            //alert(fbpages);
            setFbpages(data.data)
            console.log(fbpages+'ddddd');
            setMenu( { link:'fbpages' } ) // set menu active to prospect
            //alert('herer');
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
              <h1>FB Pages</h1>
              <div className="card-tools"><Link className="btn btn-warning" to="/fbpage/new">Add new</Link></div>
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
                <th>FB Name</th>
                <th>Link</th>
                <th>Comments</th>
                <th>Actions</th>
              </tr>
              </thead>
              {loading &&
                <tbody>
                <tr>
                  <td colSpan="5" className="text-center  mt-40 mb-40">
                    Loading...
                  </td>
                </tr>
                </tbody>
              }


            
              {!loading &&
                <tbody>
               
                {fbpages.map(u => (   
                 
                

                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.full_name}</td>
                    <td><a href={u.fb_link} target="_blank">{u.fb_link}</a></td>
                    <td>{u.comments}</td>
                    <td>
                      <Link className="btn btn-info " to={'/fbpage/' + u.id}>Edit</Link>
                      &nbsp;
                      <button className="btn btn-danger" onClick={ev => onDeleteClick(u)}>Delete</button>
                    </td>
                  </tr>
                ))} 
                
                {/* display if empty records*/} 
                {fbpages=='' && <tr><td className="text-center" colSpan={5}>No records</td></tr>}
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