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
    // TODO: Send only the added task and not the full list
    let newTasks = tasks;
    newTasks.push({
      title: taskName,
      completed: false,
      subtasks: [],
    });
    listRef.set(newTasks);
  }

  function handleCheck(index) {
    let newTasks = tasks;
    newTasks[index].completed = !newTasks[index].completed;
    listRef.set(newTasks);
  }

  function deleteTask(index) {
    let newTasks = tasks;
    newTasks.splice(index, 1);
    listRef.set(newTasks);
  }

  useEffect(() => {
    listRef.on("value", (snap) => {
      setTasks(snap.val());
    });
  }, []); //eslint-disable-line

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
                  handleCheck={() => handleCheck(index)}
                  deleteTask={() => deleteTask(index)}
                />
              );
            })}
          </div>
        </div>
      ) : null}
      <div className="addTaskDiv">
        <input
          className="addTaskInput"
          type="text"
          onChange={(e) => setTaskName(e.target.value)}
        />
        <button className="addTaskButton" onClick={addTask}>
          Create
        </button>
      </div>
    </>
  );
}

export default Listpage;
