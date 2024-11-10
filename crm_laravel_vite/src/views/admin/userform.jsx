import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../axiosClient";

export default function UserForm(){
    const {id} = useParams();
    const navigate = useNavigate();
    const [user, setUsers] = useState({
        id: null,
        name: '',
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);

    if(id)
    {
        useEffect(() => {
            setLoading(true)
            axiosClient.get(`/users/${id}`)
              .then(({data}) => {
                setLoading(false)
                setUsers(data)
              })
              .catch(() => {
                setLoading(false)
              })
          }, [])
    }

    const onSubmit = ev => {
        ev.preventDefault()
        if (user.id) {
          axiosClient.put(`/users/${user.id}`, user)
            .then(() => {
              navigate('/users')
            })
            .catch(err => {
              const response = err.response;
              if (response && response.status === 422) {
                setErrors(response.data.errors)
              }
            })
        } else {
          axiosClient.post('/users', user)
            .then(() => {
              navigate('/users')
            })
            .catch(err => {
              const response = err.response;
              if (response && response.status === 422) {
                setErrors(response.data.errors)
              }
            })
        }
      }
      // cancel add/edit user
      const OnCancel = ev => { navigate('/users') }

    return(
      <div className="app-content"> {/*begin::Container*/}
      <div className="container-fluid"> {/* Info boxes */}
      <div className="row">


       <div className="card card-info card-outline mt-4 mb-4">
            <div className="card-header">
              <div className="card-title">
                {user.id && <h1>Update User: {user.name}</h1>}
                {!user.id && <h1>New User</h1>}
              </div>
            </div> {/*end::Header*/} 
        {loading && (
          <div className="text-center mt-40 mb-40">
            Loading...
          </div>
        )}
        {errors &&
          <>
            {Object.keys(errors).map(key => (
               <div className="alert alert-danger">
                  <span key={key}>{errors[key][0]}</span>
                </div>
            ))}
          </>
        }
        {!loading && (
          <form className="needs-validation"  onSubmit={onSubmit}>
            <div className="card-body"> {/*begin::Row*/}
              <div className="row g-3"> {/*begin::Col*/}
                <div className="col-md-6"> 
                   <label className="form-label">Name</label>
                  <input className="form-control" value={user.name} onChange={ev => setUsers({...user, name: ev.target.value})} autoComplete="off" />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Email</label>
                  <input className="form-control" value={user.email} onChange={ev => setUsers({...user, email: ev.target.value})} autoComplete="off" />
                </div>
                
                <div className="col-md-6"> 
                  <label className="form-label">Password</label>
                  <input className="form-control" type="password" onChange={ev => setUsers({...user, password: ev.target.value})} autocomplete="new-password"/>
                </div>
                
               
              </div> {/*end::Row*/}
            </div> {/*end::Body*/} {/*begin::Footer*/}
            <div className="card-footer pt-4 pb-4"> <button className="btn btn-info" type="submit">Submit form</button> <input className="btn btn-danger" value="Cancel" type="submit" onClick={OnCancel}/> </div> {/*end::Footer*/}
          </form>
        )}
        </div>

      </div>
      </div>
      </div>

   
    )
}