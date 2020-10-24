import React, { useState, useEffect } from "react";
import firebase from "../../firebase";

import TaskItemCard from "../TaskItemCard";
import "./styles.css";

function Listpage() {
  const id = window.location.pathname.split("/");
  const listRef = firebase.database().ref(`availableLists/${id[2]}`);
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");

  function addTask() {
    let newTask = {
      room: id[2],
      task: {
        title: taskName,
        completed: false,
        subtasks: [],
      },
    };
  }

  useEffect(() => {
    listRef.on("value", (snapshot) => {
      console.log("SKRT" + snapshot.val());
    });
  }, [listRef]);

  return (
    <>
      {tasks.length > 0 ? (
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
          <input type="text" onChange={(e) => setTaskName(e.target.value)} />
          <button onClick={addTask}>Create</button>
        </div>
      ) : null}
    </>
  );
}

export default Listpage;
