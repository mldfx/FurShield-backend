const AdoptionListing = require('../models/AdoptionListing');
const { sendNotification } = require('../utils/notifications');

// @desc    Create adoption listing
// @route   POST /api/v1/shelters/adoptables
// @access  Private (shelter)
exports.createAdoptionListing = async (req, res, next) => {
  if (req.user.role !== 'shelter') {
    return res.status(403).json({ message: 'Not authorized' });
  }

  req.body.shelter = req.user.id;

  const listing = await AdoptionListing.create(req.body);

  res.status(201).json({
    success: true,
    data: listing,
  });
};

// @desc    Get all adoptable pets
// @route   GET /api/v1/shelters/adoptables
// @access  Public
exports.getAdoptables = async (req, res, next) => {
  const listings = await AdoptionListing.find({ status: 'Available' }).populate('shelter', 'name');

  res.status(200).json({
    success: true,
    count: listings.length,
    data: listings,
  });
};

// @desc    Update care log for pet
// @route   POST /api/v1/shelters/adoptables/:id/log
// @access  Private (shelter)
exports.logCareActivity = async (req, res, next) => {
  const listing = await AdoptionListing.findById(req.params.id);

  if (!listing) {
    return res.status(404).json({ message: 'Listing not found' });
  }

  if (listing.shelter.toString() !== req.user.id) {
    return res.status(403).json({ message: 'Not authorized' });
  }

  listing.careLogs.push({
    date: Date.now(),
    activity: req.body.activity,
    notes: req.body.notes,
  });

  await listing.save();

  res.status(200).json({
    success: true,
    data: listing,
  });
};