import express, { urlencoded } from 'express';
import mysql from 'mysql';
import dotenv from 'dotenv';
import cors from 'cors';
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import axios from 'axios'
import { v2 as cloudinary } from 'cloudinary';
dotenv.config();


const app = express();
const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const pass = process.env.DB_PASS;
const database = process.env.DB_DATABASE;
const PORT = process.env.PORT_URL || 4000;
const SECRET = process.env.SECRET_KEY;
const cloudinaryName = process.env.CLOUDINARY_NAME
const cloudinaryKey = process.env.CLOUDINARY_KEY
const cloudinarySecret = process.env.CLOUDINARY_SECRET

cloudinary.config({
    cloud_name: cloudinaryName,
    api_key: cloudinaryKey,
    api_secret: cloudinarySecret
});

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(urlencoded({ limit: "10mb", extended: false }));
app.use(express.json({ limit: "10mb" }));
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

        const token = jwt.sign({ id: result.insertId }, SECRET, { expiresIn: '1h' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60,
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


        const tokens = jwt.sign({ id: users.id }, SECRET, { expiresIn: '1h' })



        res.cookie('token', tokens, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60
        })
        return res.status(200).send({ msg: 'successfully log in', isLog: true });

    })

})

app.post('/Form-about', (req, res) => {
    const id = req.body.id
    const name = req.body.name
    const lastName = req.body.lastName
    const bio = req.body.aboutBio

    const queries = 'INSERT INTO userprofile(id, name, lastName, bio, profileImage, cover) VALUES(?, ?, ?, ?, ?, ?)'
    db.query(queries, [id, name, lastName, bio, null, null], (err, result) => {
        if (err) return res.status(500).send('database error');
        res.status(200).send('saved info');
    })
});
// get cookie
app.get('/Form-about', (req, res) => {

    const token = req.cookies.token
    if (!token) {
        return res.status(400).send({ msg: 'no cookies found' });
    }
    if (token) {
        const decodedData = jwt.verify(token, SECRET)
        res.status(200).send({ id: decodedData.id, isLog: true })
    }
})

// upload photo post 

app.post('/Form-about/Profile-Upload', async (req, res) => {
    const { image } = req.body

    if (!image) return res.status(400).send('No image provided');

    try {
        const result = await cloudinary.uploader.upload(image);

        if (result.status === 401) res.status(401).send('request failed');
        res.status(200).send({ url: result.secure_url });
    } catch (err) {
        console.error(err);
        res.status(500).send('Upload failed');
    }
}
)

// url update

app.put('/Form-about/Profile-Upload/Url', (req, res) => {
    const cookie = req.cookies.token

    if(!cookie){
        return console.log('no token found');
    }

    if(cookie){
        
        const decodedToken = jwt.verify(cookie, SECRET)
    
    const { profile, cover, id } = req.body
    const query = 'UPDATE userprofile SET profileImage = ?, cover = ? WHERE id = ?'

    db.query(query, [profile, cover, decodedToken.id], (err, result) => {
        if (err) return res.send(err)

        if (result.affectedRows === 0) {
            return res.status(401).send(id)
        }

        res.status(200).send("successfully store profile");
    })
}})



// get profile details

app.post('/Profile-page', (req, res) => {
    const id = req.body.id;

    try {
        const queries = 'SELECT * FROM userprofile WHERE id = ?'
        db.query(queries, [id], (err, result) => {
            if (result.length == 0) {
                return res.status(401).send('no user found');
            }

            if (result) {
                const data = result[0]
                res.status(200)
                    .send({
                        msg: 'profile data collected',
                        name: data.name,
                        lastName: data.lastName,
                        bio: data.bio,
                        profile: data.profileImage,
                        cover: data.cover
                    })
            }
        });


    } catch (err) { console.log(err) }

})

// post search 

app.post('/Search', (req, res) => {
    const { searchValue } = req.body;
    try {
        const query = 'SELECT id, name, lastName, profileImage FROM userprofile WHERE MATCH(name, lastName) AGAINST(?)';

        db.query(query, [searchValue], (err, result) => {
            if (err) return console.log(err)

                if(result.length === 0){
                  return  res.status(404).send({msg: 'user not found'})
                }
                
                    res.json(result)
                
        })

        
    } catch (err) {
        console.log(err)
    }

})