const express = require("express");
const router = express.Router();
const {AllUsersController, AllUserPendingController, ApproveController, RejectController} = require("./../../controllers/UsersController")
const {AllDcotorsController, AllRequestedDcotorsController, AllRegisteredDcotorsController} = require('./../../controllers/AllDcotorsController')
const { AllHospitalsController, AllRequestedHospitalsController, AllRegisteredHospitalsController} = require('./../../controllers/AllHospitalsController')

// get request
router.get('/users', AllUsersController)
router.get('/all-pending-users', AllUserPendingController)
router.get('/all-doctors', AllDcotorsController)
router.get('/all-requested-doctors', AllRequestedDcotorsController)
router.get('/all-registered-doctors', AllRegisteredDcotorsController)
router.get('/all-hospitals', AllHospitalsController)
router.get('/all-requested-hospitals', AllRequestedHospitalsController)
router.get('/all-registered-hospitals', AllRegisteredHospitalsController)

// post request
router.post('/approve-users', ApproveController)
router.post('/reject-users', RejectController)

module.exports = router;
