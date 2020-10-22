const fs = require("fs");
const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);

let listTasks;

fs.readFile("./neadb.json", (err, data) => {
  listTasks = JSON.parse(data);
});

io.on("connection", (socket) => {
  socket.on("getTasks", ({ username, room }) => {
    const user = { room, username };
    socket.join(user.room);
    socket.emit("tasks", listTasks[user.room]);
  });
  socket.on("addTask", ({ room, task }) => {
    socket.join(room);
    listTasks[room].push(task);
    socket.emit("updatedTasks", listTasks[room]);
  });
});

server.listen(process.env.PORT || 5000, () => {
  console.log("Running on 5000");
});
