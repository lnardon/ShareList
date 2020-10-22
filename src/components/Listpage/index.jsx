import React, { useEffect, useRef } from "react";
import io from "socket.io-client";

import "./styles.css";

function Listpage() {
  const socketRef = useRef();
  const id = window.location.pathname.split("/");

  function addTask() {
    socketRef.current.emit("addTask", {
      room: id[2],
      task: {
        title: "added" + id[2],
        completed: false,
        subtasks: [{ title: "Added Subtask", completed: false }],
      },
    });
  }

  useEffect(() => {
    socketRef.current = io.connect(`http://localhost:5000/`);
    socketRef.current.on("tasks", (items) => {
      console.log(items);
    });
    socketRef.current.emit("getTasks", {
      username: "Lucas",
      room: id[2],
    });
    socketRef.current.on("updatedTasks", (list) => {
      console.log(list);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>List</h1>
      <button onClick={addTask}>Create</button>
    </div>
  );
}

export default Listpage;
