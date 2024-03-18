const express  = require('express');
const {handelUserSignup}  = require('../controllers/user')

const router = express.Router();


router.post('/', handelUserSignup)

module.exports = router;

