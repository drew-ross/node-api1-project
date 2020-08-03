const express = require('express');
const nanoid = require('nanoid');

const server = express();

server.use(express.json());

const port = 8000;
server.listen(port, () => console.log('server running...'));

//data
let users = [
  { id: nanoid.nanoid(), name: 'Drew', bio: 'Web Developer' }
];

//endpoints
server.get('/users', (req, res) => {
  res.status(200).json(users);
});