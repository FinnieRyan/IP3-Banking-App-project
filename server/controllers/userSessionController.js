import UserSession from '../../database/models/userSession.js';
import User from '../../database/models/user.js';

// Get all user sessions
export const getAllUserSessions = async (req, res) => {
  try {
    const sessions = await UserSession.find().populate('userId');
    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new user session
export const createUserSession = async (req, res) => {
  const { userId, sessionToken } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newUserSession = new UserSession({
      userId,
      sessionToken,
    });

    await newUserSession.save();
    res.status(201).json(newUserSession);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single user session
export const getSingleUserSession = async (req, res) => {
  const { id } = req.params;

  try {
    const session = await UserSession.findById(id).populate('userId');

    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    res.status(200).json(session);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a user session
export const updateUserSession = async (req, res) => {
  const { id } = req.params;
  const { sessionToken } = req.body;

  try {
    const updatedSession = await UserSession.findByIdAndUpdate(
      id,
      { sessionToken },
      { new: true }
    ).populate('userId');

    if (!updatedSession) {
      return res.status(404).json({ message: 'Session not found' });
    }

    res.status(200).json(updatedSession);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a user session
export const deleteUserSession = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedSession = await UserSession.findByIdAndDelete(id);

    if (!deletedSession) {
      return res.status(404).json({ message: 'Session not found' });
    }

    res.status(200).json({ message: 'Session deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  getAllUserSessions,
  createUserSession,
  getSingleUserSession,
  updateUserSession,
  deleteUserSession,
};
