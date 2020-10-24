import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
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
    let newTasks = tasks || [];
    newTasks.push({
      title: taskName,
      completed: false,
      subtasks: [],
    });
    listRef.set(newTasks);
    setTaskName("");
  }

  function handleCheck(index) {
    let newTasks = tasks || [];
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
      <Link to={"/"}>
        <img
          src={require("../../assets/logo.png")}
          alt="logo"
          className="logo"
        />
      </Link>
      <div className="stripeDiv">
        <span className="titleStripe"></span>
      </div>
      <h1 className="taskListTitle">
        {decodeURI(id[2].charAt(0).toUpperCase() + id[2].slice(1))}
      </h1>
      {tasks && tasks.length > 0 ? (
        <div className="listPageContainer">
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
          placeholder="New task"
          value={taskName}
        />
        <button className="addTaskButton" onClick={addTask}>
          +
        </button>
      </div>
    </>
  );
}

export default Listpage;
