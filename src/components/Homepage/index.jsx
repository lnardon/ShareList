import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./styles.css";

function Homepage() {
  const [listName, setListName] = useState("");

  return (
    <div className="homeContainer">
      <div className="homepageContainer">
        <h1 className="title">Share List</h1>
        <span className="stripe"></span>
        <p className="subtitle">
          With share list you can create, share and track task lists in
          real-time.
        </p>
        <input
          type="text"
          className="listNameInput"
          placeholder="List name"
          onChange={(e) => setListName(e.target.value)}
        />
        <Link to={`/list/${encodeURI(listName)}`}>
          <button className="createBtn">Create</button>
        </Link>
      </div>
    </div>
  );
}

export default Homepage;
