import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../axiosClient";

export default function Dashboard(){

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(()=> {
      getClients();
  }, [])

 
  const getClients = () => {
      setLoading(true)
      axiosClient.get('/clients')
        .then(({ data }) => {
          setLoading(false)
          setUsers(data.data)
        })
        .catch(() => {
          setLoading(false)
        })
    }


    return(
    <div className="app-content-header"> {/*begin::Container*/}
      <div className="container-fluid"> {/*begin::Row*/}
        <div className="row">
          <div className="col-sm-6">
            <h3 className="mb-0">Dashboard</h3>
          </div>
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-end">
              <li className="breadcrumb-item"><a href="#">Home</a></li>
              <li className="breadcrumb-item active" aria-current="page">
                Dashboard v2
              </li>
            </ol>
          </div>
        </div> {/*end::Row*/}
      </div> 
    </div>
    )
}