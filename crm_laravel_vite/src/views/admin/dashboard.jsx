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
    <>

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
      </div> {/*end::Container*/}
    </div>
    <div className="app-content"> {/*begin::Container*/}
      <div className="container-fluid"> {/* Info boxes */}
        <div className="row">
          <div className="col-12 col-sm-6 col-md-3">
            <div className="info-box"> <span className="info-box-icon text-bg-primary shadow-sm"> <i className="bi bi-gear-fill" /> </span>
              <div className="info-box-content"> <span className="info-box-text">CPU Traffic</span> <span className="info-box-number">
                  10
                  <small>%</small> </span> </div> {/* /.info-box-content */}
            </div> {/* /.info-box */}
          </div> {/* /.col */}
          <div className="col-12 col-sm-6 col-md-3">
            <div className="info-box"> <span className="info-box-icon text-bg-danger shadow-sm"> <i className="bi bi-hand-thumbs-up-fill" /> </span>
              <div className="info-box-content"> <span className="info-box-text">Likes</span> <span className="info-box-number">41,410</span> </div> {/* /.info-box-content */}
            </div> {/* /.info-box */}
          </div> {/* /.col */} {/* fix for small devices only */} {/* <div class="clearfix hidden-md-up"></div> */}
          <div className="col-12 col-sm-6 col-md-3">
            <div className="info-box"> <span className="info-box-icon text-bg-success shadow-sm"> <i className="bi bi-cart-fill" /> </span>
              <div className="info-box-content"> <span className="info-box-text">Sales</span> <span className="info-box-number">760</span> </div> {/* /.info-box-content */}
            </div> {/* /.info-box */}
          </div> {/* /.col */}
          <div className="col-12 col-sm-6 col-md-3">
            <div className="info-box"> <span className="info-box-icon text-bg-warning shadow-sm"> <i className="bi bi-people-fill" /> </span>
              <div className="info-box-content"> <span className="info-box-text">New Members</span> <span className="info-box-number">2,000</span> </div> {/* /.info-box-content */}
            </div> {/* /.info-box */}
          </div> {/* /.col */}
        </div> {/* /.row */} {/*begin::Row*/}
      
        <div className="row"> {/* Start col */}
          <div className="col-md-12"> {/*begin::Row*/}
          
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">High Attention</h3>
                
              </div> {/* /.card-header */}
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table m-0">
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
                    <tbody>
                     
                      <tr>
                        <td> <a href="pages/examples/invoice.html" className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">OR1848</a> </td>
                        <td>Samsung Smart TV</td>
                        <td> <span className="badge text-bg-warning">Pending</span> </td>
                        <td>
                          <div id="table-sparkline-2" />
                        </td>
                      </tr>
                      <tr>
                        <td> <a href="pages/examples/invoice.html" className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">OR7429</a> </td>
                        <td>iPhone 6 Plus</td>
                        <td> <span className="badge text-bg-danger">
                            Delivered
                          </span> </td>
                        <td>
                          <div id="table-sparkline-3" />
                        </td>
                      </tr>
                      <tr>
                        <td> <a href="pages/examples/invoice.html" className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">OR7429</a> </td>
                        <td>Samsung Smart TV</td>
                        <td> <span className="badge text-bg-info">Processing</span> </td>
                        <td>
                          <div id="table-sparkline-4" />
                        </td>
                      </tr>
                      <tr>
                        <td> <a href="pages/examples/invoice.html" className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">OR1848</a> </td>
                        <td>Samsung Smart TV</td>
                        <td> <span className="badge text-bg-warning">Pending</span> </td>
                        <td>
                          <div id="table-sparkline-5" />
                        </td>
                      </tr>
                    
                     
                    </tbody>
                  </table>
                </div> {/* /.table-responsive */}
              </div> {/* /.card-body */}
            
            </div> {/* /.card */}
          </div> {/* /.col */}
        
        </div> {/*end::Row*/}
      </div> {/*end::Container*/}
    </div> {/*end::App Content*/}

    </>
    )
}