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

server.post('/users', (req, res) => {
  let user = req.body;

  if ('name' in user && 'bio' in user) {
    user.id = nanoid.nanoid();
    users.push(user);
    res.status(201).json({ message: 'New user created.' });
  } else {
    res.status(400).json({ message: '400 Bad request.' });
  }
});

server.get('/users/:id', (req, res) => {
  const id = req.params.id;
  const found = users.find(user => user.id === id);

  if (found) {
    res.status(200).json(found);
  } else {
    res.status(404).json({ message: 'Could not find user by that ID.' });
  }

});