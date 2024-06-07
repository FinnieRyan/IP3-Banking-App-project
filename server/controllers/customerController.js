import Customer from '../../database/models/customer.js';
import User from '../../database/models/user.js';

// Get all customers
export const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().populate('userId');
    res.status(200).json(customers);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching customers', error: error.message });
  }
};

// Create a new customer
export const createCustomer = async (req, res) => {
  const { userId, forename, surname, address, contactNumber } = req.body;

  if (!userId || !forename || !surname) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newCustomer = new Customer({
      userId,
      forename,
      surname,
      address,
      contactNumber,
    });

    await newCustomer.save();
    res.status(201).json(newCustomer);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error creating customer', error: error.message });
  }
};

// Get a single customer
export const getSingleCustomer = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the user by username
    const user = await User.findOne({ username: id });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the customer by userId
    const customer = await Customer.findOne({ userId: user._id }).populate(
      'userId'
    );

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.status(200).json(customer);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching customer', error: error.message });
  }
};

// Update a customer
export const updateCustomer = async (req, res) => {
  const { id } = req.params;
  const { forename, surname, address, contactNumber } = req.body;

  if (!forename || !surname) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      id,
      { forename, surname, address, contactNumber },
      { new: true }
    );

    if (!updatedCustomer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.status(200).json(updatedCustomer);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error updating customer', error: error.message });
  }
};

// Delete a customer
export const deleteCustomer = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCustomer = await Customer.findByIdAndDelete(id);

    if (!deletedCustomer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.status(200).json({ message: 'Customer deleted successfully' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error deleting customer', error: error.message });
  }
};

export default {
  getAllCustomers,
  createCustomer,
  getSingleCustomer,
  updateCustomer,
  deleteCustomer,
};
