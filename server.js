const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = process.env.PORT || 80;

app.use(express.static('public'));

console.clear();

console.log('███████╗███████╗██████╗ ██╗   ██╗███████╗██████╗ |');
console.log('██╔════╝██╔════╝██╔══██╗██║   ██║██╔════╝██╔══██╗|');
console.log('███████╗█████╗  ██████╔╝██║   ██║█████╗  ██████╔╝|');
console.log('╚════██║██╔══╝  ██╔══██╗╚██╗ ██╔╝██╔══╝  ██╔══██╗|');
console.log('███████║███████╗██║  ██║ ╚████╔╝ ███████╗██║  ██║|');
console.log('╚══════╝╚══════╝╚═╝  ╚═╝  ╚═══╝  ╚══════╝╚═╝  ╚═╝|');
console.log('------------------------------------------------->');

io.on('connection', (socket) => {
  console.log(`[ DEBUG ] CONNECTED : ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`[ DEBUG ] DISCONNECTED : ${socket.id}`);
  });

  socket.on('chatMessage', (message) => {
    console.log(`[ DEBUG ] MESSAGE : ${socket.id} : ${message}`);
    io.emit('chatMessage', message);
  });
});

server.listen(PORT, () => {
  console.log(`[ DEBUG ] RUNNING : PORT${PORT}`);
});