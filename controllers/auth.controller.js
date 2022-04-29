const connection = require('../config/db');
const { hashSync, compareSync } = require('bcrypt');

module.exports.renderRegister = (req, res) => {
    const {email} = req.cookies;
    res.render('register',{email})
}

module.exports.registerUser = async (req, res) => {

    const { email, password, type } = req.body;
    if (!email || !password || !type) {
        res.status(403).send({
            success: false,
            msg: "Please enter all the fields"
        })
    }

    const hashedPassword = hashSync(password, 10);
    const query = "INSERT INTO auth_data (email,password,type) VALUES (?,?,?);";

    const responseData = await connection.promise().query(query, [email, hashedPassword, type]);

    if (type === 'customer') {
         res.cookie('email', `${email}`);
        res.redirect(`/customer/details`);
    } else {
        res.cookie('email', `${email}`);
        res.redirect(`/driver/details`);
    }
}

module.exports.renderLogin = (req, res) => {
    const {email} = req.cookies;
    res.render('login',{email});
}

module.exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(403).send({
            success: false,
            msg: 'Please enter all the fields',
        });
    }

    const query = 'SELECT * FROM auth_data WHERE email = ?';
    var isMatch = false, currType;
    const response = await connection.promise().query(query, [email]);
    if (compareSync(password, response[0][0].password)) {
        isMatch = true;
        currType = response[0][0].type;
    }
    if (isMatch) {
        if (response[0][0].type === 'customer') {
            const query = `select * from customer where email = "${email}"`;
            
            const response = connection.query(query, (err, rows) => {
                const [{User_id}] = rows;
                res.cookie('email', `${email}`);
                res.cookie('User_id',`${User_id}`);
                res.redirect(`/customer/${User_id}/home`);
            })


        } else if (response[0][0].type === 'driver') {
            const query = `select * from driver,taxi where email = "${email}" and driver_email="${email}"`;
            
            const response =  connection.query(query, (err, rows) => {
                const [{Driver_id,Taxi_id}] = rows;
                res.cookie('User_id',`${Driver_id}`);
                res.cookie('Taxi_id',`${Taxi_id}`);
                res.cookie('email', `${email}`);
                res.redirect(`/driver/${Driver_id}/home`);
            })
        }
    } else {
        res.status(403).send({
            success: false,
            msg: 'Invalid email / password',
        });
    }
}

module.exports.logout = (req,res)=>{
    res.clearCookie("User_id");
    res.clearCookie("email");
    res.clearCookie("Driver_id");
    res.clearCookie("Taxi_id");
    res.redirect('/');
}