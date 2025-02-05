
import React from "react";
 
const FbpagesList = ({ fbpages }) => {
  return (
    <div className="container">
      <div className="row">
        {fbpages.map((item, index) => (
          <div key={index} className="col-lg-3 col-md-6 col-sm-12 mb-4">
            <div className="card" style={{ minWidth: "200px" }}>
              <div className="card-body">
                <h5 className="card-title">{item.full_name}</h5>
                <hr />
                <p className="card-text">FB Link: {item.fb_link}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
 
export default FbpagesList;