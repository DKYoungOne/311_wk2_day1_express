
const express = require('express')

const app = express()
const port = process.env.PORT || 4000

const { users } = require('./state')
let counter = users.length;

/* BEGIN - create routes here */
app.use(express.json());

app.get('/users', (req, res)=> {
  res.json(users);
});

app.get('/users/:id', (req, res)=> {
  const id = req.params.id;
  res.json(users[id]);
})

// app.post('/users', (req, res)=> {
//   const newUser = {"_id": 6,
//   "name": "David Cooper",
//   "occupation": "FBI Informant",
//   "avatar": "https://upload.wikimedia.org/wikipedia/en/5/50/Agentdalecooper.jpg"}
//   users.push(newUser);
//   res.json(users);
//   counter = users.length;
// })

app.post('/users', (req, res)=> {
  users.push(req.body)
  users.at(-1)._id = counter + 1;

  counter = users.length;
  console.log(req.body)
  res.json(users);
})

app.put('/users/:id', (req, res)=> {
  const id = req.params.id;
  users[id-1].name = "Justin Furstenfeld";
  users[id-1].occupation = "Musician";
  res.json(users);
})

app.delete('/users/:id', (req, res)=> {
  const id = req.params.id;
  const index = users.indexOf();
  if (index > -1) {
    users.splice(index, 1);
  }
  res.send('User deleted');
  res.json(users);
})

/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))