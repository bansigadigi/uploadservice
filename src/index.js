import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv'
dotenv.config()

import { upload } from "./routes/upload.js"

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/upload', upload);

app.listen(process.env.PORT || 3000, ()=>{
    console.log("server started")
})
