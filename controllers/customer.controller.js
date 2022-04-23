const connection = require('../config/db');

module.exports.getCustomers = (req,res) => {
    const query = "SELECT * FROM customer";

    connection.query(query, (err,rows,fields) => {
        if(err){
            res.send(err)
        }
        else {
            res.send(rows);
        }
    })
}