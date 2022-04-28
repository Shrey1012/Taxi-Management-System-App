const express = require('express');
const router = express.Router();

const driverControllers = require('../controllers/driver.controller');

router.get('/details', driverControllers.renderDetails);
router.post('/details', driverControllers.details);

router.delete('/:id/details', driverControllers.deleteDetails);

router.put('/:id/home', driverControllers.editDetails);

router.get('/:id/home', driverControllers.home);

router.get('/:id/details/edit', driverControllers.renderEditForm);

module.exports = router;