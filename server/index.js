const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);

let listTasks = [
  {
    title: "Number 1",
    completed: false,
    subtasks: [{ title: "Subtask", completed: false }],
  },
];

io.on("connection", (socket) => {
  socket.on("getTasks", ({ username, room }) => {
    const user = { room, username };
    socket.join(user.room);
    socket.emit("tasks", listTasks);
  });
  socket.on("addTask", ({ room, task }) => {
    socket.join(room);
    listTasks.push(task);
    socket.emit("updatedTasks", listTasks);
  });
});

server.listen(process.env.PORT || 5000, () => {
  console.log("Running on 5000");
});
