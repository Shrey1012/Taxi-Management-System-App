const mysql = require('mysql2');

const con = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    database: 'mydb',
    user: 'root',
    password: 'Shrey@1012',
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