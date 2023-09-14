const express = require("express");
const router = express.Router();
const UsersController = require('./../../controllers/UsersController')

router.get('/users', UsersController)

module.exports = router;
