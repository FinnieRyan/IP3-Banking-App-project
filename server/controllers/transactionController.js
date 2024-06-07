import Transaction from '../../database/models/transactions.js';
import Account from '../../database/models/account.js';

// Get all transactions
export const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    const populatedTransactions = await Promise.all(
      transactions.map(async (transaction) => {
        const fromAccount = await Account.findById(transaction.fromAccountId);
        const toAccount = await Account.findById(transaction.toAccountId);
        return {
          ...transaction.toObject(),
          fromAccount: fromAccount ? fromAccount.accountNumber : null,
          toAccount: toAccount ? toAccount.accountNumber : null,
        };
      })
    );
    res.status(200).json(populatedTransactions);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching transactions', error: error.message });
  }
};

// Get all transactions for a specific account
export const getTransactionsByAccountId = async (req, res) => {
  const { accountId } = req.params;

  try {
    const transactions = await Transaction.find({
      $or: [{ fromAccountId: accountId }, { toAccountId: accountId }],
    });

    const populatedTransactions = await Promise.all(
      transactions.map(async (transaction) => {
        const fromAccount = await Account.findById(transaction.fromAccountId);
        const toAccount = await Account.findById(transaction.toAccountId);
        return {
          ...transaction.toObject(),
          fromAccount: fromAccount ? fromAccount.accountNumber : null,
          toAccount: toAccount ? toAccount.accountNumber : null,
        };
      })
    );

    res.status(200).json(populatedTransactions);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching transactions', error: error.message });
  }
};

// Create a new transaction
export const createTransaction = async (req, res) => {
  try {
    const {
      fromAccountId,
      toAccountId,
      amount,
      transactionType,
      paymentMethod,
      pending,
      vendor,
      category,
    } = req.body;

    // Check if accounts exist
    const fromAccount = await Account.findById(fromAccountId);
    const toAccount = await Account.findById(toAccountId);

    if (!fromAccount || !toAccount) {
      return res.status(400).json({ message: 'Invalid account IDs provided' });
    }

    const newTransaction = new Transaction({
      fromAccountId,
      toAccountId,
      amount,
      transactionType,
      paymentMethod,
      pending,
      vendor,
      category,
    });

    const savedTransaction = await newTransaction.save();
    res.status(201).json(savedTransaction);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error creating transaction', error: error.message });
  }
};

// Get a single transaction
export const getSingleTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    const fromAccount = await Account.findById(transaction.fromAccountId);
    const toAccount = await Account.findById(transaction.toAccountId);

    const populatedTransaction = {
      ...transaction.toObject(),
      fromAccount: fromAccount ? fromAccount.accountNumber : null,
      toAccount: toAccount ? toAccount.accountNumber : null,
    };

    res.status(200).json(populatedTransaction);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching transaction', error: error.message });
  }
};

// Update a transaction
export const updateTransaction = async (req, res) => {
  try {
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedTransaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.status(200).json(updatedTransaction);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error updating transaction', error: error.message });
  }
};

// Delete a transaction
export const deleteTransaction = async (req, res) => {
  try {
    const deletedTransaction = await Transaction.findByIdAndDelete(
      req.params.id
    );
    if (!deletedTransaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.status(200).json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error deleting transaction', error: error.message });
  }
};

export default {
  getAllTransactions,
  getTransactionsByAccountId,
  createTransaction,
  getSingleTransaction,
  updateTransaction,
  deleteTransaction,
};
