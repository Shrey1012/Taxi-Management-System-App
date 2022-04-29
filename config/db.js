const mysql = require('mysql2');

const con = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    database: 'taxidb',
    user: process.env.USER,
    password: process.env.PASSWORD,
    multipleStatements: true
});
con.connect(function (err) {
    if (err) {
        console.log("error occured while connecting");
    }
    else {
        console.log("connection created with Mysql successfully");
    }
});

module.exports = con;

// const { email, User_id } = req.cookies;
//     var trip;
//     const query1 = `SELECT * FROM customer where email ="${email}";SELECT * FROM trip_details where User_User_id = ${User_id};`;

//     const response = connection.query(query1, (err, rows) => {
//         console.log(rows);
//         if (err) {
//             res.send(err);
//         } else {

//             const [{ User_id, First_name, Last_name, Contact_no, Address, email }] = rows[0];
//             res.cookie('User_id', `${User_id}`);
//             var trip = rows[1];
//             return res.render('customer/home', { trip, User_id, First_name, Last_name, Contact_no, Address, email });
            

//         }
//     });