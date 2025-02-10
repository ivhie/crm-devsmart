
import { useEffect } from "react";
import { useState } from "react"
import { Link, useLocation, useParams  } from "react-router-dom";
import axiosClient from "../../axiosClient";
import axios from "axios";
import { useStateContext } from "../../contexts/contextprovider";
import Pagination from "react-js-pagination";
import Editor from 'react-simple-wysiwyg';
import { Provinces }  from "//components/ph-location/0500000000";




export default function Fbpages(){

  
    const [fbpages, setFbpages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [info, setInfo] = useState({});
    const url = "http://127.0.0.1:8000/api/fbpages";

    const [activePage, setActivePage] = useState(1);
    const itemsPerPage = info.per_page;
    const totalItems = info.total;
   // const [totalItems, setTotalItems] = useState(info.total);

    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    //const fmessage = useLocation();
    //let flash_message = location.fmessage;
   // console.log(flash_message);

    const {setMenu} = useStateContext();

    useEffect(()=> {
        getFbpages(url);
    }, [])

    const onDeleteClick = fbpages => {
        if (!window.confirm("Are you sure you want to delete this client?")) {
          return
        }
        axiosClient.delete(`/fbpage/${fbpages.id}`)
          .then((res) => {
            getFbpages(url+'/?page='+info.current_page)
            //alert(res.data.msg);
          })
      }
    
      
    const getFbpages = (url) => {
        //setLoading(true)
        axiosClient.get(url)
          .then(({ data }) => {
           // setLoading(false)
           // alert(data.data);
            setFbpages(data.data)
            setInfo(data);
            //console.log('resopnse',data);
            setMenu( { link:'fbpages' } ) // set menu active to prospect
            //alert('herer');
          })
          .catch(() => {
            setLoading(false)
          })
      }


      {/*
      // button for next page
      const handleNextPage = async => {
        //setUrl(info.next_page_url);
        //alert(info.next_page_url);
        getFbpages(info.next_page_url)
        window.scrollTo(0, 0);
      };

      // button for last page
      const handlePreviousPage = async => {
       // setUrl(info.prev_page_url);
        //alert(info.prev_page_url);
        getFbpages(info.prev_page_url)
        window.scrollTo(0, 0);
      };
        */}
     
    
        const handlePageChange = (pageNumber) => {
          //console.log(`Active page is ${pageNumber}`);
          setActivePage(pageNumber);
          getFbpages(url+'/?page='+pageNumber)
          
        };

        const handleSearch = (e) => {
          setSearch(e.target.value);
          console.log(search);
          getFbpages(url+'/?search='+e.target.value) // Reset to page 1 when searching
        };


        /* form entry script */
        const {id} = useParams();
        const [errors, setErrors] = useState(null);
        const [fbpage, setFbpage] = useState({
            id: null,
            full_name: '',
            fb_link: '',
            provice: '',
            tags: '',
            comments: ''
        });

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
                setFbpage({  
                  id: null,
                  full_name: '',
                  fb_link: '',
                  provice: '',
                  tags: '',
                  comments: ''
               });

               document.querySelector(".alert-danger").remove();

              //navigate('/fbpages')
              // navigate.navigate('/prospects', {
              //   setFlashmessage : 'tester',
              // });
              
            

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
          const OnCancel = ev => {
              setFbpage({  
                id: null,
                full_name: '',
                fb_link: '',
                provice: '',
                tags: '',
                comments: ''
            });
            document.querySelector(".alert-danger").remove();

           }
     

    return(
        <>
       
    <div className="app-content"> 
      <div className="container-fluid"> 
        <div className="row">
       
        <div className="card card-info card-outline mt-4 mt-b">
           
            <div className="card-body p-0 pt-10">
                

                <div className="card-header">
                  <div className="card-title">
                    {fbpage.id && <h1>Update FB page Entry: {fbpage.full_name}</h1>}
                    {!fbpage.id && <h1>New FB page Entry</h1>}
                  </div>
                </div> {/*end::Header*/} 
                  {errors &&
                    <>
                      {Object.keys(errors).map(key => (
                        <div className="alert alert-danger">
                          <span key={key}>{errors[key][0]}</span>
                        </div>
                      ))}
                    </>
                  }
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
                      
                      <div className="col-md-6"> 
                        <label htmlFor="validationCustomUsername" className="form-label">Provice</label>
                        <div className="input-group has-validation">
                          <select onChange={ev => setProspect({...fbpage, provice: ev.target.value})}  className="form-select" id="validationCustom04">
                            {
                                Provinces.map((option) => (
                                  <option value={option.value}  selected={option.value == fbpage.provice && 'selected'} >{option.label}</option>
                                )) 
                            }
                          </select>
                        </div>
                      </div> 
                      <div className="col-md-6"> 
                        <label htmlFor="validationCustomUsername" className="form-label">Tag</label>
                        <div className="input-group has-validation">
                          <input type="text" value={fbpage.fb_link} onChange={ev => setFbpage({...fbpage, fb_link: ev.target.value})} className="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" />
                        </div>
                      </div>
                    
                    </div> {/*end::Row*/}
                  </div> {/*end::Body*/} {/*begin::Footer*/}
                  <div className="card-footer pt-4 pb-4"> <button className="btn btn-info" type="submit">Submit form</button> <input className="btn btn-danger" value="Cancel" type="submit" onClick={OnCancel}/> </div> {/*end::Footer*/}
                </form>

            <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center", marginTop: "10px"}}>
              <h1>FB Pages</h1>
              <div className="card-tools"><Link className="btn btn-warning" to="/fbpage/new">Add new</Link></div>
            </div> 
            <div className="row g-3">
               <div className="col-md-3">
                  <input
                        type="text"
                        placeholder="Search Provice..."
                        value={search}
                        className="form-control"
                        onChange={handleSearch}
                    />
                </div>
                <div className="col-md-3">
                  <input
                        type="text"
                        placeholder="Search Tag..."
                        value={search}
                        className="form-control"
                        onChange={handleSearch}
                    />
                </div>
                <div className="col-md-3">
                  <input
                      type="text"
                      placeholder="Search Fb Name..."
                      value={search}
                      className="form-control"
                      onChange={handleSearch}
                  />
                </div>
               

            </div>
           
            <table className="table"> 
              <thead>
              <tr>
                <td>#</td>
                <th>FB Name</th>
                <th>Link</th>
                <th>Tag</th>
                <th>Provice</th>
                <th>Comments</th>
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
               
                {
              
                
                fbpages.map((u,index) => (   
                 
                
                
                  <tr key={u.id}>
                     {/* add increment numbering */}
                    <td>{ (index+1) + (info.current_page*info.per_page)-(info.per_page)}</td>
                    <td>{u.full_name}</td>
                    <td><a href={u.fb_link} target="_blank">{u.fb_link}</a></td>
                    <td>{u.comments}</td>
                    <td>{u.comments}</td>
                    <td>{u.comments}</td>
                    <td>
                      <Link className="btn btn-info " to={'/fbpage/' + u.id}>Edit</Link>
                      &nbsp;
                      <button className="btn btn-danger" onClick={ev => onDeleteClick(u)}>Delete</button>
                    </td>
                   
                  </tr>

                  

                ))} 
                
                
                {fbpages=='' && <tr><td className="text-center" colSpan={5}>No records</td></tr>}
                </tbody>
              } 
            </table>
            {/*
              <nav>
    
                  <ul className="pagination justify-content-center">
                    {info.prev_page_url ? (
                      <li className="page-item">
                        <button className="page-link" onClick={handlePreviousPage}>
                          Previous
                        </button>
                      </li>
                    ) : null}
                    {info.next_page_url ? (
                      <li className="page-item">
                        <button className="page-link" onClick={handleNextPage}>
                          Next
                        </button>
                      </li>
                    ) : null}
                  </ul>
    
            </nav>
            */}
            

            <nav style={{marginTop: "15px"}}>
              <Pagination
                  activePage={activePage}
                  itemsCountPerPage={itemsPerPage}
                  totalItemsCount={totalItems || 10}
                  pageRangeDisplayed={20}
                  onChange={handlePageChange}
                  innerClass="pagination justify-content-center"
                  itemClass="page-item"
                  linkClass="page-link"
                  firstPageText="First"
                  lastPageText="Last"
                />
             </nav>
            

            </div>
        </div>
      
      </div>
      </div>
    </div>

        

      </>
    )
}

/*
import React, { useEffect, useState } from "react";
import axios from "axios";
// Component
import FbpagesList from "../../components/fbpagesList.jsx";
  
function Fbpages() {
  const [products, setProducts] = useState([]);
  const [info, setInfo] = useState({});
  const url = "http://127.0.0.1:8000/api/fbpages";
  
  const fetchProducts = (url) => {
    axios.get(url)
      .then((data) => {
        setProducts(data.data.results.data);
        //console.log(data.data.results.data);
        setInfo(data.data.results);
        //console.log(data.data.results.next_page_url);
      })
      .catch((error) => {
        console.log(error);
      });
  };
    
  const handleNextPage = () => {
    fetchProducts(info.next_page_url);
    window.scrollTo(0, 0);
  };
  
  const handlePreviousPage = () => {
    fetchProducts(info.prev_page_url);
    window.scrollTo(0, 0);
  };
    
  useEffect(() => {
    fetchProducts(url);
  }, []);
  
  
  return (
    <>
   
  
      <div className="container py-5"><p><h2>React js Laravel 10 REST API Show Product List with pagination Next Prev</h2></p>
        <nav>
  
          <ul className="pagination justify-content-center">
            {info.prev_page_url ? (
              <li className="page-item">
                <button className="page-link" onClick={handlePreviousPage}>
                  Previous
                </button>
              </li>
            ) : null}
            {info.next_page_url ? (
              <li className="page-item">
                <button className="page-link" onClick={handleNextPage}>
                  Next
                </button>
              </li>
            ) : null}
          </ul>
  
        </nav>
      </div>
        
      <FbpagesList products={products} />
  
      <div className="container pb-5">
        <nav>
          <ul className="pagination justify-content-center">
            {info.prev_page_url ? (
              <li className="page-item">
                <button className="page-link" onClick={handlePreviousPage}>
                  Previous
                </button>
              </li>
            ) : null}
            {info.next_page_url ? (
              <li className="page-item">
                <button className="page-link" onClick={handleNextPage}>
                  Next
                </button>
              </li>
            ) : null}
          </ul>
        </nav>
      </div>
        
    </>
  );
}
  
export default Fbpages;
*/