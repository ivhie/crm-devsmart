import { useEffect } from "react";
import { useState } from "react";
//import Select from "react-select";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../axiosClient";

export default function PropsectForm(){

  const optionStatus = [
      { value: "new", label: "New" },
      { value: "high", label: "High" },
      { value: "medium", label: "Medium" },
      { value: "low", label: "Low" },
      { value: "archived", label: "Archived" },
      
     ];

  const optionClientype = [
    { value: "prospect", label: "prospect" },
    { value: "client", label: "Client" },
    
    ];


    const {id} = useParams();
    const navigate = useNavigate();
    const [prospect, setProspect] = useState({
        id: null,
        full_name: '',
        email: '',
        phone: '',
        company: '',
        com_address: '',
        fb_link: '',
        website_link: '',
        status: 'new',
        comments: '',
        clientype: 'prospect'
        
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);

    if(id)
    {
        useEffect(() => {
            setLoading(true)
            axiosClient.get(`/prospects/${id}`)
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
        if (prospect.id) {
          
          //update entry
          axiosClient.post(`/prospects`, prospect)
            .then((res) => {
              //alert(res.data.msg);
              navigate('/prospects')
              //alert('hereer444');
              alert(res.data.msg);
            })
            .catch(err => {
              const response = err.response;
              if (response && response.status === 422) {
                setErrors(response.data.errors)
              }
            })
        } else {
          //new entry
          axiosClient.post('/prospects', prospect)
            .then((res) => {
              
              navigate('/prospects')
              alert(res.data.msg);
              //alert('no id');
              //alert(prospect.clientype);
              //alert(prospect.status);
              //alert(prospect.full_name);
              //console.log(prospect.full_name);
              //alert(response['msg']);
              //const response = res.response;
              //alert(res.data.msg);
              //document.getElementsByClassName('alert-danger').remove();
              //removeElementsByClass('alert-danger');
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
      }
      // cancel add/edit prospect
      const OnCancel = ev => { navigate('/prospects') }

    return(
    <>

  <div className="app-content"> {/*begin::Container*/}
      <div className="container-fluid"> {/* Info boxes */}
        <div className="row">
        

         <div className="card card-info card-outline mt-4 mb-4">
            <div className="card-header">
              <div className="card-title">
                {prospect.id && <h1>Update Propsect: {prospect.full_name}</h1>}
                {!prospect.id && <h1>New Propsect</h1>}
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
                        <label htmlFor="validationCustom04" className="form-label">Status</label> 
                        <select onChange={ev => setProspect({...prospect, status: ev.target.value})}  className="form-select" id="validationCustom04">
                              {
                                optionStatus.map((option) => (
                                  <option value={option.value}  selected={option.value == prospect.status && 'selected'} >{option.label}</option>
                                  ))
                              }
                          </select>

                        { /* 

                        <Select
                          className="form-select1"
                          //styles={{ width: "20px" }}
                          value={optionStatus.value}
                          options={optionStatus}
                          //defaultValue={optionStatus.defaultValue || prospect.status}
                          // defaultValue={optionClientype.values[prospect.status]}
                        />


                          <select onChange={ev => setProspect({...prospect, status: ev.target.value})}  className="form-select" id="validationCustom04">
                              <option value="new" {...prospect.status=="new" & 'selected' }>New</option>
                              <option value="high" { ...prospect.status=="high"  & 'selected'}>High</option>
                              <option value="medium" { ...prospect.status=="low"?"selected":""}>Medium</option>
                              <option value="low" { ...prospect.status=="low"?"selected":""}>Low</option>
                              <option value="archived" { ...prospect.status=="archived"  & 'selected' }>Archived</option>
                          </select>
                          */ }

                      </div> {/*end::Col*/} {/*begin::Col*/}

                      <div className="col-md-6"> 
                        <label htmlFor="validationCustom02" className="form-label">Contact Name</label>
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
                        <label htmlFor="validationCustom04" className="form-label">Company Address</label> 
                        <input type="text" value={prospect.com_address} onChange={ev => setProspect({...prospect, com_address: ev.target.value})} className="form-control" id="" />
                      </div> {/*end::Col*/} {/*begin::Col*/}

                      <div className="col-md-6"> 
                          <label htmlFor="validationCustom05" className="form-label">FB Link</label> 
                          <input type="text" value={prospect.fb_link} onChange={ev => setProspect({...prospect, fb_link: ev.target.value})} className="form-control" id="" />
                      </div> {/*end::Col*/} {/*begin::Col*/}

                      <div className="col-md-6"> 
                          <label htmlFor="validationCustom05" className="form-label">Website Link</label> 
                          <input type="text" value={prospect.website_link} onChange={ev => setProspect({...prospect, website_link: ev.target.value})} className="form-control" id="" />
                      </div> {/*end::Col*/} {/*begin::Col*/}

                      <div className="col-md-6"> 
                          <label htmlFor="validationCustom05" className="form-label">Comment</label> 
                          <textarea type="text" value={prospect.comments} onChange={ev => setProspect({...prospect, comments: ev.target.value})} className="form-control" id="" ></textarea>
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