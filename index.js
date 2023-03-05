const express = require('express')
const dotenv = require("dotenv");
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser");
const authRoute = require('./routes/auth');
const usersRoute = require('./routes/users');
const hotelsRoute = require('./routes/hotels');
const roomsRoute = require('./routes/rooms');
var cors = require('cors')

const app =express();
dotenv.config()

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("connected to mongoDB")
    } catch (error) {
        throw error
    }
}

mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!")
})

app.use(cors())
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.setHeader('Cache-Control', 'no-cache');

    // Send a 200 'OK' response with info about our repo
    res.status(200).json({
        status: 'ok',
        author:'Yuelin Wen',
        githubUrl: 'https://github.com/yuelin-wen/booking-api',
        // version,
    });
});

// Add 404 middleware to handle any requests for resources that can't be found
app.use((req, res) => {
    res.status(404).json({
        status: 'error',
        error: {
            message: 'not found',
            code: 404,
        },
    });
});

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

app.listen(8080,()=>{
    connect()
    console.log("API listening")
})