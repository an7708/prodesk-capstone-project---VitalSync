const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth.middleware');
const validate = require('../middleware/validate.middleware');
const { createAppointmentSchema, updateAppointmentSchema } = require('../validators/appointment.validator');
const {
createAppointment,
getAppointments,
getAppointmentById,
updateAppointment,
deleteAppointment,
} = require('../controllers/appointment.controller');

router.use(protect);

router.route('/')
.get(getAppointments)
.post(validate(createAppointmentSchema), createAppointment);

router.route('/:id')
.get(getAppointmentById)
.put(validate(updateAppointmentSchema), updateAppointment)
.delete(deleteAppointment);

module.exports = router;