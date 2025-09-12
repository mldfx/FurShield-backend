import User from '../models/User.js';

// @desc    Update vet profile (availability, etc.)
// @route   PUT /api/v1/vets/profile
// @access  Private (vet)
export const updateVetProfile = async (req, res, next) => {
  if (req.user.role !== 'vet') {
    return res.status(403).json({ message: 'Not authorized' });
  }

  const vet = await User.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: vet,
  });
};

// @desc    Get vet profile
// @route   GET /api/v1/vets/profile
// @access  Private (vet)
export const getVetProfile = async (req, res, next) => {
  if (req.user.role !== 'vet') {
    return res.status(403).json({ message: 'Not authorized' });
  }

  const vet = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: vet,
  });
};