import React from "react";
// import "./ClearBtn.css";

// Using the datalist element we can create autofill suggestions based on the props.breeds array
const ClearBtn = props => (
  
      <button
        type="clear"
        onClick={props.handleClearArticles}
        className="btn btn-success clear"
      >
        Clear Articles
      </button>

);

export default ClearBtn;