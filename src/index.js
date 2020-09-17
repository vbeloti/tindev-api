const express = require('express');
const routes = require('./routes');
const cors = require('cors');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const connectedUsers = {};

io.on('connection', (socket) => {
  const { devFrom } = socket.handshake.query;

  connectedUsers[devFrom] = socket.id;
});

app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;

  return next();
});

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333, () => {
  console.log('Rodando');
});
