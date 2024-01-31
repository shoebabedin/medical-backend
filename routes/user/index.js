const express = require("express");
const router = express.Router();
const multer = require('multer');
const {AllUsersController, AllUserPendingController, ApproveController, RejectController} = require("./../../controllers/UsersController")
const {AllDcotorsController, AllRequestedDcotorsController, AllRegisteredDcotorsController, NewDcotorsAddController, UpdateController} = require('./../../controllers/AllDcotorsController')
const { AllHospitalsController, AllRequestedHospitalsController, AllRegisteredHospitalsController, NewHospitalAddController, UpdateHospitalController, addNewReportController, pendingReportController, allReportController, editReportController, RejectReportController, completeReportController} = require('./../../controllers/AllHospitalsController')

// Set up storage for uploaded files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Destination folder for uploads
    },
    filename: function (req, file, cb) {
      const originalname = file.originalname;
      const extension = originalname.split('.').pop(); // Get the file extension
      const uniqueFilename = file.fieldname + '-' + Date.now() + '.' + extension;
      cb(null, uniqueFilename); // File naming convention with original extension
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
router.get('/all-report', allReportController)
router.get('/pending-report', pendingReportController)
router.get('/complete-report', completeReportController)

// post request
router.post('/approve-users', ApproveController)
router.post('/reject-users', RejectController)
router.post('/new-doctors-add',upload.fields([{ name: 'profile_img' }, { name: 'doctor_sign' }]), NewDcotorsAddController)
router.post('/doctor-update',upload.fields([{ name: 'profile_img' }, { name: 'doctor_sign' }]), UpdateController)
router.post('/new-hospital-add',upload.fields([{ name: 'hospital_img' }]), NewHospitalAddController)
router.post('/hospital-update',upload.fields([{ name: 'hospital_img' }]), UpdateHospitalController)
router.post('/new-report-add',upload.fields([{ name: 'report_image' }]), addNewReportController)
router.post('/edit-report',upload.fields([{ name: 'report_image' }]), editReportController)
router.post('/reject-report', RejectReportController)

module.exports = router;
