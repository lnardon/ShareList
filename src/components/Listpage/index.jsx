import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

import TaskItemCard from "../TaskItemCard";
import "./styles.css";

function Listpage() {
  const socketRef = useRef();
  const id = window.location.pathname.split("/");
  const [tasks, setTasks] = useState(false);

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
    socketRef.current = io.connect("http://172.16.51.195:5000");
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
    <>
      {tasks ? (
        <div className="listPageContainer">
          <h1>Tasks</h1>
          <div className="tasksContainer">
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
          </div>
          <button onClick={addTask}>Create</button>
        </div>
      ) : null}
    </>
  );
}

export default Listpage;
