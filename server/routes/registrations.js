const express = require('express');
const Registration = require('../models/Registration');
const Event = require('../models/Event');
const protect = require('../middleware/protect');
const router = express.Router();

router.use(protect); // All routes protected

router.post('/', async (req, res) => {
  try {
    const { eventId } = req.body;
    
    // Check duplicate registration
    const existing = await Registration.findOne({ userId: req.user._id, eventId });
    if (existing) return res.status(400).json({ message: 'Already registered' });
    
    // Check capacity (mock for now)
    const registrationsCount = await Registration.countDocuments({ eventId });
    const event = await Event.findById(eventId);
    if (!event || registrationsCount >= event.capacity) {
      return res.status(400).json({ message: 'Event full' });
    }
    
    const registration = await Registration.create({ userId: req.user._id, eventId });
    res.status(201).json(registration);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id);
    if (registration.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    await Registration.findByIdAndDelete(req.params.id);
    res.json({ message: 'Cancelled' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const registrations = await Registration.find({ userId: req.user._id })
      .populate('eventId')
      .sort({ 'eventId.date': 1 });
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
