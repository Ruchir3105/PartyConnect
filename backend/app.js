import express from "express";
import cors from "cors"; //cross origin 
// import dotenv from 'dotenv';
import routes from "./Routes/index.js";
import mongoose from "mongoose"
import session from "express-session";



const mongoURI = 'mongodb+srv://ruchir3105:0DjFHwAYod929SP3@cluster0.aivodxa.mongodb.net/partyconnect';

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

const app = express();
app.use(express.json());



const corsOptions = {
    origin: "http://localhost:5173", 
    credentials: true, 
    optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: 'lax', 
        secure: false,   
    }
}));

const port = 8080;

Object.values(routes).forEach((route) => {
    app.use(route.path, route.router);
});

app.listen(port, ()=>{
    console.log(`Server is runnning on port ${port}`);
})