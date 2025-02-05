
import { useEffect } from "react";
import { useState } from "react"
import { Link, useLocation  } from "react-router-dom";
import axiosClient from "../../axiosClient";
import axios from "axios";
import { useStateContext } from "../../contexts/contextprovider";
import Pagination from "react-js-pagination";

//import FlashMessage from 'react-flash-message';



export default function Fbpages(){

  
    const [fbpages, setFbpages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [info, setInfo] = useState({});
    const url = "http://127.0.0.1:8000/api/fbpages";

    const [activePage, setActivePage] = useState(1);
    const itemsPerPage = info.per_page;
    const totalItems = info.total;

    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

     // Replace with actual total count
    
    //const prosepectStatus = useState('');
    //const [url, setUrl] = useState('http://127.0.0.1:8000/api/fbpages');
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
            getFbpages()
            //alert(res.data.msg);
          })
      }
    
      
    const getFbpages = (url) => {
        //setLoading(true)
        //alert(url);
        //alert('ddfdf');    
        
        //alert('herer');
        axiosClient.get(url)
          .then(({ data }) => {
           // setLoading(false)
            //alert(fbpages);
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
          //alert(e.target.value);
          console.log(search);
          //setCurrentPage(1);
          getFbpages(url+'/?search='+e.target.value) // Reset to page 1 when searching
      };
  
     

    return(
        <>
       
    <div className="app-content"> 
      <div className="container-fluid"> 
        <div className="row">
       
        <div className="card card-info card-outline mt-4 mt-b">
            <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center", marginTop: "10px"}}>
              <h1>FB Pages</h1>
              <div className="card-tools"><Link className="btn btn-warning" to="/fbpage/new">Add new</Link></div>
            </div> 
            <div className="card-body p-0">
            <input
                type="text"
                placeholder="Search Fb Name..."
                value={search}
                onChange={handleSearch}
            />
            <table className="table"> 
              <thead>
              <tr>
                <th>FB Name</th>
                <th>Link</th>
                <th>Comments</th>
                <th>Actions</th>
              </tr>
              </thead>
              {loading &&
                <tbody>
                <tr>
                  <td colSpan="4" className="text-center  mt-40 mb-40">
                    Loading...
                  </td>
                </tr>
                </tbody>
              }


            
              {!loading &&
                <tbody>
               
                {fbpages.map(u => (   
                 
                

                  <tr key={u.id}>
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
                
                
                {fbpages=='' && <tr><td className="text-center" colSpan={4}>No records</td></tr>}
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
                  totalItemsCount={totalItems}
                  pageRangeDisplayed={5}
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