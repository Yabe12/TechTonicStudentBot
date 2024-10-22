const express = require('express');
const { submitStudentForm } = require('../controllers/student');

const router = express.Router();

// Route to handle form submission
router.post('/submit', submitStudentForm);

module.exports = router;
