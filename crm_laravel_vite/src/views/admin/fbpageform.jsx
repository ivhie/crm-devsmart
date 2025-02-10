import { useEffect } from "react";
import { useState } from "react";
//import Select from "react-select";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../axiosClient";

//import FlashMessage from 'react-flash-message';
import Editor from 'react-simple-wysiwyg';

export default function FbpageForm(){


    const {id} = useParams();
    const navigate = useNavigate();
    const [fbpage, setFbpage] = useState({
        id: null,
        full_name: '',
        fb_link: '',
        comments: ''
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const [flashmessage, setflashmessage] = useState('');

    if(id)
    {
        useEffect(() => {
            setLoading(true)
            axiosClient.get(`/fbpage/${id}`)
              .then(({data}) => {
                setLoading(false)
                setFbpage(data)
              })
              .catch(() => {
                setLoading(false)
              })
          }, [])
    }

    const onSubmit = ev => {
        ev.preventDefault()
          //new entry
          axiosClient.post('/fbpage', fbpage)
            .then((res) => {
            
             alert(res.data.msg);
              //setflashmessage(res.data.msg);
             navigate('/fbpages')
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
      const OnCancel = ev => { navigate('/fbpages') }

    return(
    <>

  <div className="app-content"> {/*begin::Container*/}
      <div className="container-fluid"> {/* Info boxes */}
        <div className="row">
        

         <div className="card card-info card-outline mt-4 mb-4">
            <div className="card-header">
              <div className="card-title">
                {fbpage.id && <h1>Update FB page: {fbpage.full_name}</h1>}
                {!fbpage.id && <h1>New FB page</h1>}
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
                        <label htmlFor="validationCustom02" className="form-label">FB Name</label>
                        <input type="text" value={fbpage.full_name} onChange={ev => setFbpage({...fbpage, full_name: ev.target.value})} className="form-control" />
                      </div> {/*end::Col*/} {/*begin::Col*/}

                      <div className="col-md-6"> 
                        <label htmlFor="validationCustomUsername" className="form-label">FB Link</label>
                        <div className="input-group has-validation">
                          <input type="text" value={fbpage.fb_link} onChange={ev => setFbpage({...fbpage, fb_link: ev.target.value})} className="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" />
                        </div>
                      </div> {/*end::Col*/} {/*begin::Col*/}
                      {/*
                      <div className="col-md-6"> 
                        <label htmlFor="validationCustomUsername" className="form-label">Location</label>
                        <div className="input-group has-validation">
                          <input type="text" value={fbpage.fb_link} onChange={ev => setFbpage({...fbpage, fb_link: ev.target.value})} className="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" />
                        </div>
                      </div> 
                      <div className="col-md-6"> 
                        <label htmlFor="validationCustomUsername" className="form-label">Tag</label>
                        <div className="input-group has-validation">
                          <input type="text" value={fbpage.fb_link} onChange={ev => setFbpage({...fbpage, fb_link: ev.target.value})} className="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" />
                        </div>
                      </div> */}

                      <div className="col-md-12"> 
                          <label htmlFor="validationCustom05" className="form-label">Notes</label> 
                          
                          <Editor  value={fbpage.comments}  height="800px" onChange={ev => setFbpage({...fbpage, comments: ev.target.value})} />
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