const Appointment = require('../models/Appointment');
const Pet = require('../models/Pet');
const User = require('../models/User');
const { sendNotification } = require('../utils/notifications');
const sendEmail = require('../utils/sendEmail');

// @desc    Book appointment
// @route   POST /api/v1/appointments
// @access  Private (owner)
exports.bookAppointment = async (req, res, next) => {
  const { pet, vet, appointmentTime } = req.body;

  const appointment = await Appointment.create({
    pet,
    owner: req.user.id,
    vet,
    appointmentTime,
  });

  // Notify vet
  const vetUser = await User.findById(vet);
  sendEmail({
    email: vetUser.email,
    subject: 'New Appointment Request',
    message: `You have a new appointment request for ${appointmentTime}.`,
  });

  sendNotification(vet, `New appointment request from ${req.user.name}`, 'info');

  res.status(201).json({
    success: true,
    data: appointment,
  });
};

// @desc    Get appointments for user
// @route   GET /api/v1/appointments/me
// @access  Private
exports.getMyAppointments = async (req, res, next) => {
  let query;

  if (req.user.role === 'owner') {
    query = Appointment.find({ owner: req.user.id }).populate('pet vet', 'name');
  } else if (req.user.role === 'vet') {
    query = Appointment.find({ vet: req.user.id }).populate('pet owner', 'name');
  } else {
    return res.status(403).json({ message: 'Not authorized' });
  }

  const appointments = await query;

  res.status(200).json({
    success: true,
    count: appointments.length,
    data: appointments,
  });
};

// @desc    Update appointment (approve/reschedule/cancel)
// @route   PUT /api/v1/appointments/:id
// @access  Private (vet for approve/reschedule, owner or vet for cancel)
exports.updateAppointment = async (req, res, next) => {
  let appointment = await Appointment.findById(req.params.id).populate('owner pet vet');

  if (!appointment) {
    return res.status(404).json({ message: 'Appointment not found' });
  }

  // Vets can approve/reschedule, owners/vets can cancel
  if (req.user.role === 'vet' && req.user.id !== appointment.vet._id.toString()) {
    return res.status(403).json({ message: 'Not authorized' });
  }

  if (req.user.role === 'owner' && req.user.id !== appointment.owner._id.toString()) {
    return res.status(403).json({ message: 'Not authorized' });
  }

  // If cancelling, notify owner
  if (req.body.status === 'cancelled') {
    sendEmail({
      email: appointment.owner.email,
      subject: 'Appointment Cancelled',
      message: `Your appointment for ${appointment.pet.name} on ${appointment.appointmentTime} has been cancelled.`,
    });
  }

  appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: appointment,
  });
};