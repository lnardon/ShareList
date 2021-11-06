import React from "react";
import CloseIcon from "../../assets/close.png";

import "./styles.css";

function TaskItemCard({ checked, title, index, handleCheck, deleteTask }) {
  return (
    <div
      className={
        checked ? "itemListContainer fadeOut" : "itemListContainer fadeIn"
      }
    >
      <label className="container">
        <h1 className="taskItemTitle">{title}</h1>
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
        src={CloseIcon}
        onClick={deleteTask}
        className="deleteBtn"
      />
    </div>
  );
}

export default TaskItemCard;
