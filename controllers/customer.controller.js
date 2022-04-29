const connection = require('../config/db');

module.exports.renderDetails = (req, res) => {
    res.render('customer/details')
}

module.exports.details = async (req, res) => {

    const { email } = req.cookies;
    const { User_id, First_name, Last_name, Contact_no, Address } = req.body;
    const query = "INSERT INTO customer (User_id,First_name,Last_name,Contact_no,Address,email) VALUES (?,?,?,?,?,?);";
    const responseData = await connection.promise().query(query, [User_id, First_name, Last_name, Contact_no, Address, email]);
    res.cookie('User_id', `${User_id}`);
    res.redirect(`/customer/${User_id}/home`);
}

module.exports.home = function (req, res) {
    const { email, User_id } = req.cookies;
    
    const query = `SELECT * FROM customer where email ="${email}";SELECT * FROM trip_details where User_User_id = ${User_id};`;

    const response = connection.query(query, (err, rows) => {
        if (err) {
            res.send(err);
        } else {

            const [{ User_id, First_name, Last_name, Contact_no, Address, email }] = rows[0];
            res.cookie('User_id', `${User_id}`);
            var trip = rows[1];
            return res.render('customer/home', { trip, User_id, First_name, Last_name, Contact_no, Address, email });
        }
    });
}

module.exports.renderEditForm = async (req, res) => {
    const { User_id } = req.cookies;
    const query = `SELECT * FROM customer where User_id = ${User_id}`
    connection.query(query, (err, rows) => {
        if (rows) {
            const [{ First_name, Last_name, Contact_no, Address }] = rows;
            res.render('customer/editDetails', { User_id, First_name, Last_name, Contact_no, Address });
        }
    })

}

module.exports.editDetails = async (req, res) => {
    const { User_id } = req.cookies;
    const { First_name, Last_name, Contact_no, Address } = req.body;
    const query = `UPDATE customer set First_name="${First_name}",Last_name="${Last_name}", Contact_no ="${Contact_no}", Address ="${Address}" where User_id =${User_id}`
    connection.query(query, [First_name, Last_name, Contact_no, Address], (err, rows) => {
        if (err) {
            console.log(err);
        }
        res.redirect(`/customer/${User_id}/home`);
    })
}

module.exports.deleteDetails = async (req, res) => {
    const { User_id, email } = req.cookies;
    const query1 = `DELETE FROM customer WHERE User_id ="${User_id}"`;
    const query2 = `DELETE FROM auth_data WHERE email ="${email}"`;
    connection.query(query1)
    connection.query(query2, (err, rows) => {
        res.redirect('/');
    })
}

module.exports.renderBill = async (req, res) => {
    const { User_id } = req.cookies;
    res.render('customer/billDetails', { User_id });

}

module.exports.bill = async (req, res) => {
    const { User_id } = req.cookies;
    const { Bill_no, Bill_date, Total_amount,User_User_id} = req.body;
    const query = "INSERT INTO bill_details(Bill_no,Bill_date,Total_amount,User_User_id) VALUES(?,?,?,?)";
    const responseData = await connection.promise().query(query, [Bill_no, Bill_date, Total_amount,User_User_id]);
    res.redirect(`/customer/${User_id}/home`);
}

module.exports.renderTrip = async (req, res) => {
    const { User_id } = req.cookies;
    res.render('customer/tripDetails', { User_id });
}

module.exports.trip = async (req, res) => {
    const { User_id } = req.cookies;
    const { Trip_id, Trip_date, Trip_amount, Start_time, End_time, Pickup_address, Destination_address, User_User_id, User_Taxi_Taxi_id } = req.body;
    const query = "INSERT INTO trip_details(Trip_id, Trip_date, Trip_amount, Start_time, End_time, Pickup_address, Destination_address,User_User_id,User_Taxi_Taxi_id) VALUES(?,?,?,?,?,?,?,?,?)";
    const responseData = await connection.promise().query(query, [Trip_id, Trip_date, Trip_amount, Start_time, End_time, Pickup_address, Destination_address, User_User_id, User_Taxi_Taxi_id]);
    res.redirect(`/customer/${User_id}/home`);
}

module.exports.renderFeedback = async (req, res) => {
    const { User_id } = req.cookies;
    res.render('customer/feedback', { User_id });
}

module.exports.feedback = async (req, res) => {
    const { User_id } = req.cookies;
    const { Feedback_id, Message, email, Rating ,User_User_id} = req.body;
    const query = "INSERT INTO Feedback(Feedback_id, Message, email, Rating,User_User_id) VALUES(?,?,?,?,?)";
    const responseData = await connection.promise().query(query, [Feedback_id, Message, email, Rating,User_User_id]);
    res.redirect(`/customer/${User_id}/home`);
}

module.exports.showBills = async(req,res)=>{
    const { User_id } = req.cookies;
    const query = `SELECT * FROM bill_details where User_User_id = ${User_id}`;
    connection.query(query, (err, result) => {
        if (err) {
            res.send('Error',err)
        }else{
        res.render('customer/allBills', { User_id,result });
        }
    });
}

module.exports.showFeedbacks = async(req,res)=>{
    const { User_id } = req.cookies;
    const query = `SELECT * FROM feedback where User_User_id = ${User_id}`;
    connection.query(query, (err, result) => {
        if (err) {
            res.send('Error',err)
        }else{
        res.render('customer/allFeedbacks', { User_id,result });
        }
    });
}

module.exports.showBillAbove100 = (req,res)=>{
    const { User_id } = req.cookies;
    const query = `SELECT * FROM Bill_details WHERE Total_amount > 100 AND User_User_id = ${User_id};`;
    connection.query(query,(err,rows)=>{
        if (err) {
            res.send('Error',err)
        }else{
        res.render('customer/billsAbove100', { User_id,rows });
        }
    })
}


