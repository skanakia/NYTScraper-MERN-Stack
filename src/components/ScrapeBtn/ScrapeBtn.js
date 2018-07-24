import React from "react";
// import "./ScrapeBtn.css";

// Using the datalist element we can create autofill suggestions based on the props.breeds array
const ScrapeBtn = props => (
  
      <button
        type="scrape"
        onClick={props.onClick}
        className="btn btn-success scrape"
      >
        Scrape
      </button>

);

export default ScrapeBtn;