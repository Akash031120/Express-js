const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());


let users = [
    {
        "id": 1,
        "name": "Leanne Graham",
        "username": "Bret",
        "email": "Sincere@april.biz",
        "address": {
            "street": "Kulas Light",
            "suite": "Apt. 556",
            "city": "Gwenborough",
            "zipcode": "92998-3874"
        }
    },
      {
        "id": 2,
        "name": "John Mathew",
        "username": "Bret",
        "email": "123@april.biz",
        "address": {
            "street": "Kulas Light",
            "suite": "Apt. 556",
            "city": "Gwenborough",
            "zipcode": "92998-3874"
        }
      }
];


const getNextId = () => {
    const maxId = users.reduce((max, user) => (user.id > max ? user.id : max), 0);
    return maxId + 1;
};

app.get('/users', (req, res) => {
    res.json(users);
});

app.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);

    if (user) {
        res.json(user);
    } else {
        res.status(404).send('User not found');
    }
});


app.post('/users', (req, res) => {
    const newUser = req.body;

    if (!newUser.name || !newUser.username || !newUser.email) {
        return res.status(400).send('Missing required fields: name, username, or email');
    }

    newUser.id = getNextId();
    
    users.push(newUser);
    
    res.status(201).json(newUser);
});


app.put('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedData = req.body;
    
    const index = users.findIndex(u => u.id === id);

    if (index !== -1) {
        if (!updatedData.name || !updatedData.username || !updatedData.email) {
            return res.status(400).send('Missing required fields for update: name, username, or email');
        }

        users[index] = { ...updatedData, id: id };
        
        res.json(users[index]);
    } else {
        res.status(404).send('User not found for update');
    }
});


app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    
    const initialLength = users.length;
    
    users = users.filter(u => u.id !== id);

    if (users.length < initialLength) {
        res.status(204).send(); 
    } else {
        res.status(404).send('User not found for deletion');
    }
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});