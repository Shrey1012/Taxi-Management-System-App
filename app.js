if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
const express = require('express');
const path = require('path');
const ejsMate = require('ejs-mate');
const cookieParser = require('cookie-parser')
const methodOverride = require('method-override');

const connection = require('./config/db');

const authRoutes = require('./routes/auth.routes');
const customerRoutes = require('./routes/customer.routes');
const driverRoutes = require('./routes/driver.routes');
const { nextTick } = require('process');



const app = express();
app.use(cookieParser());


app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use('/', authRoutes);
app.use('/customer', customerRoutes);
app.use('/driver',driverRoutes);


app.get('/',(req,res)=>{
    const {email} = req.cookies;
    res.render('home',{email});
})

app.listen(3000,()=>{
    console.log("Listening on port 3000");
})