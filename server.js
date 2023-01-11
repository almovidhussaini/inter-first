import express from 'express';
import bodyParser from 'body-parser'
import mongoose from 'mongoose';
import cors from 'cors'
import dotenv from 'dotenv'


import UserRoutes from './routes/UserRoutes.js';
import VerificationRoutes from './routes/VerificationRoutes.js';
import ItemsRoutes from './routes/ItemsRoutes.js'

import path from  'path'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


var jsonParser = bodyParser.json()
dotenv.config()
const app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false })


app.use(express.static(path.resolve(__dirname, './build')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './build', 'index.html'));
});

app.use(express.json());
app.use(bodyParser.json())
app.use(cors())

app.use('/api',UserRoutes,VerificationRoutes,ItemsRoutes )

app.listen(process.env.PORT||5000, ()=>{
    try{
        mongoose.set("strictQuery", true);
        mongoose.connect(
          
            process.env.MONGODB_URI, 
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        ).then((message)=>{
            console.log(`db connected `);
        });
        console.log(`server is  started  at ${process.env.PORT}`)
        
    }
    catch(err){
        console.log(err )

    }}
)
