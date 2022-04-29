const express = require('express');
const router = express.Router();

const customerControllers = require('../controllers/customer.controller');

router.get('/details', customerControllers.renderDetails);
router.post('/details', customerControllers.details);

router.delete('/:id/details', customerControllers.deleteDetails);

router.put('/:id/home', customerControllers.editDetails);

router.get('/:id/home', customerControllers.home);

router.get('/:id/bill',customerControllers.renderBill);
router.post('/:id/bill',customerControllers.bill);

router.get('/:id/trip',customerControllers.renderTrip);
router.post('/:id/trip',customerControllers.trip);

router.get('/:id/feedback',customerControllers.renderFeedback);
router.post('/:id/feedback',customerControllers.feedback);

router.get('/:id/allBills',customerControllers.showBills);

router.get('/:id/allFeedbacks',customerControllers.showFeedbacks);

router.get('/:id/billsAbove100',customerControllers.showBillAbove100);


router.get('/:id/details/edit', customerControllers.renderEditForm);

module.exports = router;