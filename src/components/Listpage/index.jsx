import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

import TaskItemCard from "../TaskItemCard";
import Footer from "../Footer";
import "./styles.css";

function Listpage() {
  const socketRef = useRef();
  const id = window.location.pathname.split("/");
  const [tasks, setTasks] = useState([]);

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
      setTasks(items);
    });
    socketRef.current.emit("getTasks", {
      username: "NRD Software",
      room: id[2],
    });
    socketRef.current.on("updatedTasks", (list) => {
      setTasks(list);
    });
  }, [id]);

  return (
    <div className="listPageContainer">
      <h1>List</h1>
      {tasks.map((task, index) => {
        return (
          <TaskItemCard
            title={task.title}
            checked={task.completed}
            index={index}
            key={index}
          />
        );
      })}
      <button onClick={addTask}>Create</button>
      <Footer />
    </div>
  );
}

export default Listpage;
