const { response } = require('express');
const express = require('express');
const app = express();
const port = 5000;

app.use(express.json());

// User list
const users = { 
    users_list :
    [
       { 
          id : 'xyz789',
          name : 'Charlie',
          job: 'Janitor',
       },
       {
          id : 'abc123', 
          name: 'Mac',
          job: 'Bouncer',
       },
       {
          id : 'ppp222', 
          name: 'Mac',
          job: 'Professor',
       }, 
       {
          id: 'yat999', 
          name: 'Dee',
          job: 'Aspring actress',
       },
       {
          id: 'zap555', 
          name: 'Dennis',
          job: 'Bartender',
       }
    ]
 }


const findUserByName = (name) => {
    return users['users_list'].filter((user) => user['name'] === name);
}

// get requests
app.get('/', (req, res) => {
    res.send('Hello World');
});
app.get('/users', (req, res) => {
    const name = req.query.name;
    if (name != undefined) {
        let result = findUserByName(name);
        result = {users_list: result}
        res.send(result);
    }
    else {
        res.send(users);
    }
});
app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        result = {users_list: result};
        res.send(result);
    }
});


function findUserById(id) {
    return users['users_list'].find( (user) => user['id'] === id);
}

// post request
app.post('/users', (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd);
    res.status(200).end();
});

function addUser(user){
    users['users_list'].push(user);
}

// delete request
app.delete('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        users['users_list'] = users['users_list'].filter( (user) => user !== result);
        res.status(200).end();
    }
});


app.listen(port, () => {
    console.log('Example app listening at http://localhost:${port}');
});