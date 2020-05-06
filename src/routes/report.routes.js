const express = require('express');
const router = express.Router();
const ReportController = require('../controllers/report.controllers');
const validateSchema = require('../middleware/schema');
const validateAuth = require('../middleware/auth');

router.post('/', validateAuth.jwt, validateSchema.reportAdd, ReportController.add);

router.get('/:id', validateAuth.jwt, ReportController.load, ReportController.get);

router.delete('/:id', validateAuth.jwt, ReportController.load, ReportController.verify, ReportController.remove);

module.exports = router;
