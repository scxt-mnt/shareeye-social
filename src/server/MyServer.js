import express, { urlencoded } from 'express';
import mysql from 'mysql';
import dotenv from 'dotenv';
import cors from 'cors';
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
dotenv.config();


const app = express();
const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const pass = process.env.DB_PASS;
const database = process.env.DB_DATABASE;
const PORT = process.env.PORT_URL || 4000;
const SECRET = process.env.SECRET_KEY;

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

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


        if (result.length === 0) {
            return console.log('user not created');
        }

        const token = jwt.sign({ id: result.insertId }, SECRET, { expiresIn: '1hr' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60,
            path: '/'
        })

        res.status(201).send(`successfully created user`);

    }
    )

})

app.post('/SignIn', (req, res) => {
    const username = req.body.username
    const password = req.body.password

    const queries = 'SELECT * FROM userdata WHERE username = ? AND password = ?'

    db.query(queries, [username, password], (err, result) => {
        if (err) return res.status(500).send('database error occurred')


        if (result.length === 0) {
            return res.status(401).send('user not found');
        }

        const users = result[0]


        const tokens = jwt.sign({ id: users.id, user: users.username }, SECRET, { expiresIn: '1hr' })



        res.cookie('token', tokens, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60
        })
        return res.status(200).send({ msg: 'successfully log in', user: users.username, isLog: true });

    })

})

app.post('/Form-about', (req, res) => {
    const id = req.body.id
    const name = req.body.name
    const lastName = req.body.lastName
    const bio = req.body.aboutBio

    const queries = 'INSERT INTO userProfile(id, name, lastName, aboutBio) VALUES(?, ?, ?, ?)'
    db.query(queries, [id, name, lastName, bio], (err, result) => {
        if (err) return res.status(500).send('database error');
         res.status(200).send('saved info');
    })
});

app.get('/Form-about', (req, res) => {

    const token = req.cookies.token
    if (!token) {
        return res.status(400).send('no cookies found');
    }
    if (token) {
        const decodedData = jwt.verify(token, SECRET)
        res.status(200).send({ id: decodedData.id, isLog: true })
    }
})
