'use strict';
const
  io = require("socket.io"),
  server = io.listen(8000);

let
  sequenceNumberByClient = new Map();

server.on("connection", (socket) => {
  console.info(`Client connected [id=${socket.id}]`);
  sequenceNumberByClient.set(socket, 1);
  socket.on("disconnect", () => {
    sequenceNumberByClient.delete(socket);
    console.info(`Client gone [id=${socket.id}]`);
  });
  socket.on('log', (data) => {
    console.log('log', data);
  });
  socket.on('ctrl', (data) => {
    switch(data.cmd){
      case 'setName':
      socket.name = data.name;
    }
    console.log(socket);
  })
});
