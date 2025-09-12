const Feedback = require('../models/Feedback');

// @desc    Submit feedback/rating
// @route   POST /api/v1/feedback
// @access  Private
exports.submitFeedback = async (req, res, next) => {
  const { targetId, onModel, rating, comment } = req.body;

  const feedback = await Feedback.create({
    user: req.user.id,
    targetId,
    onModel,
    rating,
    comment,
  });

  res.status(201).json({
    success: true,
    data: feedback,
  });
};

// @desc    Get feedback for target
// @route   GET /api/v1/feedback/:model/:id
// @access  Public
exports.getFeedback = async (req, res, next) => {
  const feedbacks = await Feedback.find({
    onModel: req.params.model,
    targetId: req.params.id,
  }).populate('user', 'name');

  res.status(200).json({
    success: true,
    count: feedbacks.length,
    data: feedbacks,
  });
};