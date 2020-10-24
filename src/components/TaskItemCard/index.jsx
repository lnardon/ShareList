import React from "react";

import "./styles.css";

function TaskItemCard({ checked, title, index, handleCheck, deleteTask }) {
  return (
    <div
      className={
        checked ? "itemListContainer fadeOut" : "itemListContainer fadeIn"
      }
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
      <img
        alt="icon"
        src="https://www.flaticon.com/svg/static/icons/svg/1828/1828778.svg"
        onClick={deleteTask}
        className="deleteBtn"
      />
    </div>
  );
}

export default TaskItemCard;
