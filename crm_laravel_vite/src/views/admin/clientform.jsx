import { useEffect } from "react";
import { useState } from "react";
//import Select from "react-select";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../axiosClient";

//import FlashMessage from 'react-flash-message';

export default function PropsectForm(){

 
  const optionClientype = [
    { value: "client", label: "Client" },
    { value: "prospect", label: "prospect" },

    ];


    const {id} = useParams();
    const navigate = useNavigate();
    const [prospect, setProspect] = useState({
        id: null,
        full_name: '',
        email: '',
        phone: '',
        company: '',
        credentials: '',
        status: 'high',
        clientype: 'client'
        
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const [flashmessage, setflashmessage] = useState('');

    if(id)
    {
        useEffect(() => {
            setLoading(true)
            axiosClient.get(`/clients/${id}`)
              .then(({data}) => {
                setLoading(false)
                setProspect(data)
              })
              .catch(() => {
                setLoading(false)
              })
          }, [])
    }

    const onSubmit = ev => {
        ev.preventDefault()
  
          //new entry
          axiosClient.post('/clients', prospect)
            .then((res) => {
            
             alert(res.data.msg);
              //setflashmessage(res.data.msg);
             navigate('/clients')
             // navigate.navigate('/prospects', {
             //   setFlashmessage : 'tester',
             // });
             
              document.querySelector(".alert-danger").remove();

            })
            .catch(err => {
              const response = err.response;
              //console.log(response);
              if (response && response.status === 422) {
                setErrors(response.data.errors)
              }
            })
        
      }
      // cancel add/edit prospect
      const OnCancel = ev => { navigate('/clients') }

    return(
    <>

  <div className="app-content"> {/*begin::Container*/}
      <div className="container-fluid"> {/* Info boxes */}
        <div className="row">
        

         <div className="card card-info card-outline mt-4 mb-4">
            <div className="card-header">
              <div className="card-title">
                {prospect.id && <h1>Update Client: {prospect.full_name}</h1>}
                {!prospect.id && <h1>New Client</h1>}
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
            {/*begin::Form*/}
            {!loading && (

                <form className="needs-validation"   onSubmit={onSubmit}> {/*begin::Body*/}
                  <div className="card-body"> {/*begin::Row*/}
                    <div className="row g-3"> {/*begin::Col*/}

                    <div className="col-md-6"> 
                        <label htmlFor="validationCustom04" className="form-label">Customer Type</label> 
                        <select onChange={ev => setProspect({...prospect, clientype: ev.target.value})}  className="form-select" id="validationCustom04">
                        {
                            optionClientype.map((option) => (
                              <option value={option.value}  selected={option.value == prospect.clientype && 'selected'} >{option.label}</option>
                            )) 
                        }
                        </select>
                       
                          { /*  
                           <Select
                          className="form-select1"
                          value={optionClientype.value}
                          options={optionClientype}
                          defaultValue={optionClientype[prospect.clientype]}
                        />
                          <select onChange={ev => setProspect({...prospect, clientype: ev.target.value})}  className="form-select" id="validationCustom04">
                              <option value="prospect" { ...prospect.clientype=="prospect"?"selected":""}>Prospect</option>
                              <option value="client" { ...prospect.clientype=="client"?"selected":""}>Client</option>
                          </select>*/}



                         
                      </div> {/*end::Col*/} {/*begin::Col*/}

                    

                      <div className="col-md-6"> 
                        <label htmlFor="validationCustom02" className="form-label">Client Name</label>
                        <input type="text" value={prospect.full_name} onChange={ev => setProspect({...prospect, full_name: ev.target.value})} className="form-control" />
                      </div> {/*end::Col*/} {/*begin::Col*/}

                      <div className="col-md-6"> 
                        <label htmlFor="validationCustomUsername" className="form-label">Email</label>
                        <div className="input-group has-validation">
                          <input type="email" value={prospect.email} onChange={ev => setProspect({...prospect, email: ev.target.value})} className="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" />
                        </div>
                      </div> {/*end::Col*/} {/*begin::Col*/}

                      <div className="col-md-6"> 
                        <label htmlFor="validationCustom03" className="form-label">Phone</label> 
                        <input type="text" value={prospect.phone} onChange={ev => setProspect({...prospect, phone: ev.target.value})} className="form-control" id=""  />
                      </div> {/*end::Col*/} {/*begin::Col*/}

                      <div className="col-md-6"> 
                        <label htmlFor="validationCustom04" className="form-label">Company</label> 
                        <input type="text" value={prospect.company} onChange={ev => setProspect({...prospect, company: ev.target.value})} className="form-control" id=""  />
                      </div> {/*end::Col*/} {/*begin::Col*/}


                     

                      <div className="col-md-6"> 
                          <label htmlFor="validationCustom05" className="form-label">Credentials</label> 
                          <textarea type="text" value={prospect.credentials} onChange={ev => setProspect({...prospect, credentials: ev.target.value})} className="form-control" id="" ></textarea>
                      </div> {/*end::Col*/} {/*begin::Col*/}
                    
                    </div> {/*end::Row*/}
                  </div> {/*end::Body*/} {/*begin::Footer*/}
                  <div className="card-footer pt-4 pb-4"> <button className="btn btn-info" type="submit">Submit form</button> <input className="btn btn-danger" value="Cancel" type="submit" onClick={OnCancel}/> </div> {/*end::Footer*/}
                </form>
              )}
               {/*end::Form*/} {/*begin::JavaScript*/}
               {/*end::JavaScript*/}

            
          </div>

        </div> {/* /.row */} {/*begin::Row*/}
      </div> {/*end::Container*/}
  </div> {/*end::App Content*/}

      
    </>
    )
}