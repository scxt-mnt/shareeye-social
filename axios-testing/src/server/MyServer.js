import express, { urlencoded } from 'express';
import mySql from 'mysql';

const app = express();
const db = mySql.createPool({
    host: 'localhost',
    user: 'root',
    password: '3214',
    database: 'mydatabase'
});

app.listen('5000', () => {
    console.log('listening to port 5000')
})

app.use(urlencoded({extends: false}))
app.use(express.json());

app.post('/user', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const queries = `INSERT INTO userdata(username, password) VALUES('${username}', '${password}')`;
    db.query(queries, (err, result) => {
        if(err) throw err
    })
    res.send('user created');
})