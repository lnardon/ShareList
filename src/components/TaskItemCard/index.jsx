import React from "react";

import "./styles.css";

function TaskItemCard({ checked, title, index, handleCheck, deleteTask }) {
  return (
    <div
      className="itemListContainer"
      style={checked ? { opacity: 0.15 } : null}
    >
      <label className="container">
        {title}
        <input
          type="checkbox"
          id={index}
          checked={checked}
          className="itemInput"
          onChange={handleCheck}
        />
        <span className="checkmark"></span>
      </label>
      <button onClick={deleteTask} className="deleteBtn">
        X
      </button>
    </div>
  );
}

export default TaskItemCard;
