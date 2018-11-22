const express = require('express');
const users = require('./users.js');
const Joi = require('joi');
// const port = process.env.PORT || 3000;

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

app.post('/api/users', (req, res) => {
    const id = Math.max(...users.map(user => user.id));
    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email
    };

    const schema = {
        name: Joi.string().required(),
        email: Joi.string().required(),
    }

    const validation = Joi.validate(req.body, schema);

    if (validation.error) {
        return res.status(400).send(validation.error.details[0].message);
    }

    users.push(newUser);
    res.send(newUser);
});

app.put('/api/users/:id', (req, res) => {

    // Procure o usuário a partir do id
    const foundUser = users.find(user => user.id === parseInt(req.params.id))

    // Se não for encontrado, emita um erro que condiz e uma mensagem
    if (!foundUser) {
        return res.status(404).send('Deu merda');
    }

    // if (!req.body.name || !req.body.email) {
    //     return res.status(400).send('Precisa incluir nome e email!')
    // }

    const schema = {
        name: Joi.string().min(3).required(),
        email: Joi.string().min(3).required(),
    }

    // Se for encontrado, faça a validação dos campos obrigatórios
    const validation = Joi.validate(req.body, schema);

    // Se estiver inválido, retorne um status que condiz e uma mensagem
    if (validation.error) {
        return res.status(400).send(validation.error.details[0].message);
    }

    // Se for válido, atualize o usuário encontrado a partir do id com os parâmetros recebidos
    foundUser.name = req.body.name;
    foundUser.email = req.body.email;

    // Retorne o usuário atualizado
    res.send(foundUser);
});

app.delete('/api/users/:id', (req, res) => {
    const foundUser = users.find(user => user.id === parseInt(req.params.id));

    if(!foundUser) {
        return res.status(404).send('Não foi possível encontrar o usuário');
    }

    users.splice(users.indexOf(foundUser), 1);
    // users.delete(...);
    res.send(foundUser);
});


app.listen(3000, () => console.log('Escutando na porta 3000...'));
