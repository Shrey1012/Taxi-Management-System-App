const express = require('express');
const app =express();
const connection = require('./config/db');

const customerRoutes = require('./routes/customer.routes');

app.use('/', customerRoutes);

app.get('/',(req,res)=>{
    res.send('Home');
})

app.listen(3000,()=>{
    console.log("Listening on port 3000");
})