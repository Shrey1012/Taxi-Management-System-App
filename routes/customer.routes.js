const express = require('express');
const router = express.Router();

const customerControllers = require('../controllers/customer.controller');
// @desc GET ALL CUSTOMERS
// @route GET
// @path /customer
router.get('/customer', customerControllers.getCustomers)

module.exports = router;