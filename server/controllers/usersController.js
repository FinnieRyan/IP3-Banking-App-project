import User from '../models/user.js';

// Get all users
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// Create a new user
const createUser = async (req, res, next) => {
  const { username, passwordHash, email } = req.body;
  const newUser = new User({ username, passwordHash, email });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
};

// Get a single user by ID
const getSingleUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// Update a user by ID
const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { username, passwordHash, email, lastLoginAt } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { username, passwordHash, email, lastLoginAt },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

// Delete a user by ID
const deleteUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export default {
  getAllUsers,
  createUser,
  getSingleUser,
  updateUser,
  deleteUser,
};
