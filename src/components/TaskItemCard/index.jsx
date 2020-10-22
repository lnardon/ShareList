import React from "react";

import "./styles.css";

function TaskItemCard({ checked, title, index }) {
  return (
    <div className="itemListContainer">
      <input id={index} type="checkbox" value={checked} className="itemInput" />
      <label for={index} className="itemTitle">
        {title}
      </label>
    </div>
  );
}

export default TaskItemCard;
