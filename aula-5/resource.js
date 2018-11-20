const express = require('express');
const users = require('./users.js');

const app = express();

app.use(express.json());

app.get('/', (req, res) => res.send('Hello world!'));
app.get('/api/users', (req, res) => res.send(users));
app.get('/api/users/:id', (req, res) => {
    const foundUser = users.find(user => user.id === parseInt(req.params.id))
    if (!foundUser) {
        return res.status(400).send('Deu merda');
    }

    res.send(foundUser);
});

app.listen(3000, () => console.log('Escutando na porta 3000...'));
