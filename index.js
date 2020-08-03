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
  try {
    res.status(200).json(users);
  } catch {
    res.status(500).json({ errorMessage: 'The users information could not be retrieved.' });
  }
});

server.post('/users', (req, res) => {
  let user = req.body;

  if ('name' in user && 'bio' in user) {
    user.id = nanoid.nanoid();
    try {
      users.push(user);
    } catch {
      res.status(500).json({ errorMessage: 'There was an error while saving the user to the database.' });
    }
    res.status(201).json(user);
  } else {
    res.status(400).json({ errorMessage: 'Please provide name and bio for the user.' });
  }
});

server.get('/users/:id', (req, res) => {
  const id = req.params.id;
  let found;
  try {
    found = users.find(user => user.id === id);
  } catch {
    res.status(500).json({ errorMessage: "The user information could not be retrieved." });
  }

  if (found) {
    res.status(200).json(found);
  } else {
    res.status(404).json({ message: 'The user with the specified ID does not exist.' });
  }

});

server.delete('/users/:id', (req, res) => {
  const id = req.params.id;
  let found;
  try {
    found = users.find(user => user.id === id);
  } catch {
    res.status(500).json({ errorMessage: "The user could not be removed." });
  }

  if (found) {
    users = users.filter(user => user.id !== found.id);
    res.status(204).end();
  } else {
    res.status(404).json({ message: 'The user with the specified ID does not exist.' });
  }

})