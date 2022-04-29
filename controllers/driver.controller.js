const connection = require('../config/db');

module.exports.renderDetails = (req, res) => {
    res.render('driver/details')
}

module.exports.details = async (req, res) => {
    const { email } = req.cookies;
    const { Driver_id, First_name, Last_name, Contact_no, License_no, Taxi_id, Registration_no, Model, Taxi_type,driver_email } = req.body;
    const query1 = "INSERT INTO driver (Driver_id,First_name,Last_name,Contact_no,email,License_no) VALUES (?,?,?,?,?,?);"
    const responseData1 = await connection.promise().query(query1, [Driver_id, First_name, Last_name, Contact_no, email, License_no])
    const query2 = "INSERT INTO taxi (Taxi_id,Registration_no,Model,Taxi_type,driver_email) VALUES (?,?,?,?,?);"
    const responseData2 = await connection.promise().query(query2, [Taxi_id, Registration_no, Model, Taxi_type,driver_email]);

    res.cookie('Driver_id', Driver_id);
    res.cookie('Taxi_id', Taxi_id);
    res.redirect(`/driver/${Driver_id}/home`);

}

module.exports.home = async (req, res) => {
    const { email,Taxi_id} = req.cookies;
   
    const query = `SELECT * FROM driver,taxi where email ="${email}" and Taxi_id="${Taxi_id}"; SELECT * FROM trip_details where User_Taxi_Taxi_id = ${Taxi_id}`;
    const response = connection.query(query, (err, rows) => {
        if (err) {
            res.send(err)
        } else {
            const [{ Driver_id,Taxi_id,First_name, Last_name, Contact_no, License_no, email, Rating, Registration_no, Model, Taxi_type }] = rows[0];
            res.cookie('Driver_id', Driver_id);
            res.cookie('Taxi_id', Taxi_id);  
            var trip = rows[1];    
            console.log(trip);  
            return res.render('driver/home', { trip, Driver_id, Taxi_id, First_name, Last_name, Contact_no, License_no, email, Rating, Registration_no, Model, Taxi_type });
        }
    })
}

module.exports.renderEditForm = async (req, res) => {
    const { Driver_id, Taxi_id } = req.cookies;
    const query = `SELECT * FROM driver,taxi where Driver_id = ${Driver_id} and Taxi_id =${Taxi_id}`
    connection.query(query, (err, rows) => {
        if (rows) {
            const [{ First_name, Last_name, Contact_no, License_no, Registration_no, Model, Taxi_type }] = rows;
            res.render('driver/editDetails', { Driver_id, First_name, Last_name, Contact_no, License_no, Registration_no, Model, Taxi_type });
        }
    })
}

module.exports.editDetails = async (req, res) => {
    const { Driver_id, Taxi_id } = req.cookies;
    const { First_name, Last_name, Contact_no, License_no, Registration_no, Model, Taxi_type } = req.body;
    const query1 = `UPDATE driver set First_name = "${First_name}",Last_name = "${Last_name}", Contact_no = "${Contact_no}" ,License_no = "${License_no}" where Driver_id ="${Driver_id}"`
    const query2 = `UPDATE taxi set Registration_no = "${Registration_no}", Model = "${Model}",Taxi_type ="${Taxi_type}" where Taxi_id ="${Taxi_id}"`
    connection.query(query1, [First_name, Last_name, Contact_no, License_no])
    connection.query(query2, [Registration_no, Model, Taxi_type], (err, rows) => {
        if (err) {
            console.log(err);
        }
        res.redirect(`/driver/${Driver_id}/home`);
    })
}

module.exports.deleteDetails = async (req, res) => {
    const { Driver_id, Taxi_id, email } = req.cookies;
    const query1 = `DELETE FROM driver WHERE Driver_id ="${Driver_id}"`;
    const query2 = `DELETE FROM taxi WHERE Taxi_id ="${Taxi_id}"`;
    const query3 = `DELETE FROM auth_data WHERE email ="${email}"`;
    connection.query(query1)
    connection.query(query2)
    connection.query(query3, (err, rows) => {
        res.redirect('/');
    })
}

