const express = require('express');
const {
  getSubjects,
  startSession,
  submitQuestionAnswer,
  getSession,
  getHistory
} = require('../controllers/vivaController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Get list of available subjects
router.get('/subjects', getSubjects);

// All session routes must be protected
router.use(protect);

// Get all past sessions for user
router.get('/sessions', getHistory);

// Start a new session
router.post('/sessions', startSession);

// Get details of a specific session
router.get('/sessions/:sessionId', getSession);

// Submit an answer
router.post('/sessions/:sessionId/answers', submitQuestionAnswer);

module.exports = router;
