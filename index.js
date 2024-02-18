const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require('cors');

const app = express();
const isDev = app.settings.env === 'development'
const URL = isDev ? 'http://localhost:3000' : 'https://draw-io-eight.vercel.app'
app.use(cors({ origin: URL }))
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: URL });

io.on("connection", (socket) => {
  console.log("server connected")

  socket.on('beginPath', (arg) => {
    socket.broadcast.emit('beginPath' + arg.id, arg)
  })

  socket.on('drawLine', (arg) => {
    socket.broadcast.emit('drawLine' + arg.id, arg)
  })

  socket.on('drawPolling', (arg) => {
    console.log(arg);
    socket.broadcast.emit('drawPolling' + arg.id, arg)
  })

  socket.on('changeConfig', (arg) => {
    socket.broadcast.emit('changeConfig' + arg.id, arg)
  })
});

httpServer.listen(5000);