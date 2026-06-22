const vivaService = require('../services/vivaService');

/**
 * Get available subjects for Viva.
 */
const getSubjects = async (req, res, next) => {
  try {
    const subjects = await vivaService.getSubjects();
    res.status(200).json({
      success: true,
      subjects
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Start a new Viva session.
 */
const startSession = async (req, res, next) => {
  try {
    const { subject } = req.body;
    if (!subject) {
      return res.status(400).json({ success: false, message: "Subject is required" });
    }

    const userId = req.user.id;
    const result = await vivaService.startVivaSession(userId, subject);

    res.status(201).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Submit an answer to a viva question.
 */
const submitQuestionAnswer = async (req, res, next) => {
  try {
    const { sessionId } = req.params;
    const { questionId, answerText } = req.body;

    if (!questionId || !answerText) {
      return res.status(400).json({ success: false, message: "questionId and answerText are required" });
    }

    const userId = req.user.id;
    const result = await vivaService.submitAnswer(userId, parseInt(sessionId), parseInt(questionId), answerText);

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get details of a single viva session.
 */
const getSession = async (req, res, next) => {
  try {
    const { sessionId } = req.params;
    const userId = req.user.id;

    const session = await vivaService.getSessionDetails(userId, parseInt(sessionId));

    res.status(200).json({
      success: true,
      session
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all viva sessions for the user.
 */
const getHistory = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const sessions = await vivaService.getUserSessions(userId);

    res.status(200).json({
      success: true,
      count: sessions.length,
      sessions
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSubjects,
  startSession,
  submitQuestionAnswer,
  getSession,
  getHistory
};
