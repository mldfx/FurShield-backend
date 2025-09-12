import Pet from '../models/Pet.js';
import User from '../models/User.js';
// @desc    Get all pets for logged-in owner
// @route   GET /api/v1/pets
// @access  Private (owner)
export const getPets = async (req, res, next) => {
  const pets = await Pet.find({ owner: req.user.id });

  res.status(200).json({
    success: true,
    count: pets.length,
    data: pets,
  });
};

// @desc    Get single pet
// @route   GET /api/v1/pets/:id
// @access  Private (owner)
export const getPet = async (req, res, next) => {
  const pet = await Pet.findById(req.params.id).populate('medicalHistory');

  if (!pet) {
    return res.status(404).json({ message: 'Pet not found' });
  }

  if (pet.owner.toString() !== req.user.id && req.user.role !== 'vet') {
    return res.status(403).json({ message: 'Not authorized' });
  }

  res.status(200).json({
    success: true,
    data: pet,
  });
};

// @desc    Create pet
// @route   POST /api/v1/pets
// @access  Private (owner)
export const createPet = async (req, res, next) => {
  req.body.owner = req.user.id;

  const pet = await Pet.create(req.body);

  res.status(201).json({
    success: true,
    data: pet,
  });
};

// @desc    Update pet
// @route   PUT /api/v1/pets/:id
// @access  Private (owner)
export const updatePet = async (req, res, next) => {
  let pet = await Pet.findById(req.params.id);

  if (!pet) {
    return res.status(404).json({ message: 'Pet not found' });
  }

  if (pet.owner.toString() !== req.user.id) {
    return res.status(403).json({ message: 'Not authorized' });
  }

  pet = await Pet.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: pet,
  });
};

// @desc    Delete pet
// @route   DELETE /api/v1/pets/:id
// @access  Private (owner)
export const deletePet = async (req, res, next) => {
  const pet = await Pet.findById(req.params.id);

  if (!pet) {
    return res.status(404).json({ message: 'Pet not found' });
  }

  if (pet.owner.toString() !== req.user.id) {
    return res.status(403).json({ message: 'Not authorized' });
  }

  await pet.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
};