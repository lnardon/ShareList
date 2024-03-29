import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import firebase from "../../firebase";

import TaskItemCard from "../TaskItemCard";
import closeIcon from "../../assets/close.png";
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

  const handleEnter = (e) => {
    const regExp = /[a-zA-Z]/g;
    if (e.key === "Enter" && regExp.test(taskName)) {
      addTask();
    }
  };

  const handleInput = (e) => {
    if (!(e.target.value === " " && taskName === "")) {
      setTaskName(e.target.value);
    }
  };

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
      <h1 className="taskListTitle">{decodeURI(id[2])}</h1>
      <div className="stripeDiv">
        <span className="titleStripe"></span>
      </div>
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
          placeholder="New task"
          value={taskName}
          onChange={handleInput}
          onKeyDown={handleEnter}
        />
        <button className="addTaskButton">
          <img
            src={closeIcon}
            alt="Close Icon"
            className="addTaskIcon"
            onClick={addTask}
          />
        </button>
      </div>
    </>
  );
}

export default Listpage;
