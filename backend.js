const { response } = require('express');
const express = require('express');
const app = express();
const port = 5000;

const cors = require('cors');
app.use(cors());
app.use(express.json());

// User list
const users = { 
    users_list : []
 }


const findUserByName = (name) => {
    return users['users_list'].filter((user) => user['name'] === name);
}
const findUserByJob = (job) => {
    return users['users_list'].filter((user) => user['job'] === job);
}
const findUserByNameAndJob = (name, job) => {
    return users['users_list'].filter((user) => user['name'] === name && user['job'] === job);
}

// get requests
app.get('/', (req, res) => {
    res.send('Hello World');
});
app.get('/users', (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    if (name != undefined && job == undefined) {
        let result = findUserByName(name);
        result = {users_list: result}
        res.send(result);
    }
    else if (name != undefined && job != undefined) {
        let result = findUserByNameAndJob(name, job);
        //let result = findUserByJob(job);
        //let result = findUserByName(name);
        result = {users_list: result};
        res.send(result);
    }
    else if (name == undefined && job != undefined) {
        let result = findUserByJob(job);
        result = {users_list: result};
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
    userToAdd.id = generateID();
    addUser(userToAdd);
    res.status(201).send(userToAdd);
});

function generateID() {
    return Math.random().toString(36).substring(2, 8);
}

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
    console.log('Example app listening at http://localhost:' + port.toString(10));
});