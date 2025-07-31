import express, { urlencoded } from 'express';
import mysql from 'mysql';
import dotenv from 'dotenv';
import cors from 'cors';
import jwt from 'jsonwebtoken'
dotenv.config();

const app = express();
const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const pass = process.env.DB_PASS;
const database = process.env.DB_DATABASE;
const PORT = process.env.PORT_URL || 4000;

app.use(cors());
app.use(urlencoded({ extended: false }));
app.use(express.json());


const db = mysql.createPool({
    host: host,
    user: user,
    password: pass,
    database: database
})

app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`);
});

app.post('/SignUp', (req, res) => {
    const username = req.body.username;
    const password = req.body.password

    const queries = `INSERT INTO userdata(username, password) VALUES(?, ?)`
    db.query(queries, [username, password], (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(409).send('user already exist');
            }
                return res.status(500).send('database error');
        }
            return res.status(201).send(`successfully created user`);


    })

})

 app.post('/SignIn', (req, res) => {
        const username = req.body.username
        const password = req.body.password

        const queries = 'SELECT * FROM userdata WHERE username = ? AND password = ?'

        db.query(queries, [username, password], (err, result) => {
            const resu = result[0]

             if(result.length === 0){
                console.log("user not found");
            }
        })
        
    })
