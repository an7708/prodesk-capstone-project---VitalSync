const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth.middleware');
const validate = require('../middleware/validate.middleware');
const { suggestSchema } = require('../validators/ai.validator');
const { suggestDoctor } = require('../controllers/ai.controller');

router.post('/suggest', protect, validate(suggestSchema), suggestDoctor);

module.exports = router;
