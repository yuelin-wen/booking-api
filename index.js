const express = require('express')
const app =express();

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

app.listen(8080,()=>{
    console.log("API listening")
})