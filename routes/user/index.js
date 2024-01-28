const express = require("express");
const router = express.Router();
const multer = require('multer');
const {AllUsersController, AllUserPendingController, ApproveController, RejectController} = require("./../../controllers/UsersController")
const {AllDcotorsController, AllRequestedDcotorsController, AllRegisteredDcotorsController, NewDcotorsAddController} = require('./../../controllers/AllDcotorsController')
const { AllHospitalsController, AllRequestedHospitalsController, AllRegisteredHospitalsController} = require('./../../controllers/AllHospitalsController')

// Set up storage for uploaded files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Destination folder for uploads
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()); // File naming convention
    }
  });
  
  // Set up multer instance with the configured storage
  const upload = multer({ storage: storage });

  
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
router.post('/new-doctors-add',upload.fields([{ name: 'profile_img' }, { name: 'doctor_sign' }]), NewDcotorsAddController)

module.exports = router;
