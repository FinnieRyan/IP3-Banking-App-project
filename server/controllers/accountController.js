import Account from '../models/account.js';
import Customer from '../models/customer.js';

// Get all accounts
export const getAllAccounts = async (req, res) => {
  try {
    const accounts = await Account.find({}).populate('customerId');
    res.status(200).json(accounts);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching accounts', error: error.message });
  }
};

// Create a new account
export const createAccount = async (req, res) => {
  const { customerId, accountType, balance, accountNumber, sortCode } =
    req.body;

  if (!customerId || !accountType || !accountNumber || !sortCode) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const customer = await Customer.findById(customerId);

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    const newAccount = new Account({
      customerId,
      accountType,
      balance,
      accountNumber,
      sortCode,
    });

    await newAccount.save();
    res.status(201).json(newAccount);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error creating account', error: error.message });
  }
};

// Get a single account
export const getSingleAccount = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the customer by userId
    const customer = await Customer.findOne({ userId: id });

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    // Find the account by customerId
    const account = await Account.findOne({
      customerId: customer._id,
    }).populate('customerId');

    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    res.status(200).json(account);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching account', error: error.message });
  }
};

// Update an account
export const updateAccount = async (req, res) => {
  const { id } = req.params;
  const { accountType, balance, accountNumber, sortCode } = req.body;

  try {
    const updatedAccount = await Account.findByIdAndUpdate(
      id,
      { accountType, balance, accountNumber, sortCode },
      { new: true }
    ).populate('customerId');

    if (!updatedAccount) {
      return res.status(404).json({ message: 'Account not found' });
    }

    res.status(200).json(updatedAccount);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error updating account', error: error.message });
  }
};

// Delete an account
export const deleteAccount = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedAccount = await Account.findByIdAndDelete(id);

    if (!deletedAccount) {
      return res.status(404).json({ message: 'Account not found' });
    }

    res.status(200).json({ message: 'Account deleted successfully' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error deleting account', error: error.message });
  }
};

export default {
  getAllAccounts,
  createAccount,
  getSingleAccount,
  updateAccount,
  deleteAccount,
};
