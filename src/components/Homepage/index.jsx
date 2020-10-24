import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

import "./styles.css";
import Footer from "../Footer";

function Homepage() {
  const [listName, setListName] = useState("");
  const inputRef = useRef(null);

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
          onFocus={(e) => inputRef.current.scrollIntoView()}
          ref={inputRef}
        />
        <Link to={`/list/${encodeURI(listName)}`}>
          <button className="createBtn">Create</button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default Homepage;
