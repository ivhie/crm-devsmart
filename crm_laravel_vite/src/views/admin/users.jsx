import { useEffect } from "react";
import { useState } from "react"
import { Link } from "react-router-dom";
import axiosClient from "../../axiosClient";


export default function users(){
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(()=> {
        getUsers();
    }, [])

    const onDeleteClick = user => {
        if (!window.confirm("Are you sure you want to delete this user?")) {
          return
        }
        axiosClient.delete(`/users/${user.id}`)
          .then(() => {
            getUsers()
          })
      }

    const getUsers = () => {
        setLoading(true)
        axiosClient.get('/users')
          .then(({ data }) => {
            setLoading(false)
            setUsers(data.data)
          })
          .catch(() => {
            setLoading(false)
          })
      }

    return(

    
        <div className="app-content"> {/*begin::Container*/}
          <div className="container-fluid"> {/* Info boxes */}
            <div className="row">

            <div className="card card-info card-outline mt-4 mt-b">
          
              <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center", marginTop: "10px"}}>
                <h1>Users</h1>
                <div className="card-tools"><Link className="btn btn-warning" to="/users/new">Add new</Link></div>
              </div> {/* /.card-header */}

              <div className="card-body p-0">
                <table className="table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  {loading &&
                    <tbody>
                      <tr>
                        <td colSpan="5" className="text-center">
                          Loading...
                        </td>
                      </tr>
                    </tbody>
                  }
                  {!loading &&
                    <tbody>
                    {users.map(u => (
                      <tr key={u.id}>
                        <td>{u.id}</td>
                        <td>{u.name}</td>
                        <td>{u.email}</td>
                        <td>
                          <Link className="btn btn-info" to={'/users/' + u.id}>Edit</Link>
                          &nbsp;
                          <button className="btn btn-danger" onClick={ev => onDeleteClick(u)}>Delete</button>
                        </td>
                      </tr>
                    ))}

                    {/* display if empty records*/} 
                    {users=='' && <tr><td className="text-center" colSpan={4}>No records</td></tr>}
                    </tbody>
                  }
                </table>
              </div>
            </div>
         

            </div>
          </div>
        </div>

    )
}