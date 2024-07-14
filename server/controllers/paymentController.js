import Account from '../../database/models/account.js';
import Transaction from '../../database/models/transactions.js';

let defaultTransaction = {
  transactionType: 'Online Payment',
  paymentMethod: 'Online Banking',
  pending: false,
  vendor: 'Internal Payment',
  category: 'Internal Payment',
};

const createPayment = async (req, res) => {
  try {
    let { fromAccountId, toAccountId, amount } = req.body;

    // Retrieve the fromAccount and check if it exists
    const fromAccount = await Account.findById(fromAccountId);
    if (!fromAccount) {
      return res.status(404).json({ message: 'From account not found' });
    }

    // Retrieve the toAccount and check if it exists
    let toAccount;
    if (!toAccountId) {
      const { accountNumber } = req.params;
      toAccount = await Account.findOne({ accountNumber });
      if (toAccount) {
        toAccountId = toAccount._id;
      }
    } else {
      toAccount = await Account.findById(toAccountId);
    }

    if (!toAccount) {
      return res.status(404).json({ message: 'To account not found' });
    }

    // Check if the fromAccount has sufficient balance
    if (fromAccount.balance < amount) {
      return res
        .status(400)
        .json({ message: 'Insufficient balance in the from account' });
    }

    // Begin a session and transaction to ensure atomicity
    const session = await Account.startSession();
    session.startTransaction();

    try {
      // Update balances
      fromAccount.balance -= amount; // Debiting the fromAccount
      toAccount.balance += amount; // Crediting the toAccount

      // Save the updated accounts
      await fromAccount.save({ session });
      await toAccount.save({ session });

      // Create the transaction
      const newTransaction = new Transaction({
        ...defaultTransaction,
        fromAccountId,
        toAccountId,
        amount,
      });

      const savedTransaction = await newTransaction.save({ session });

      // Commit the transaction
      await session.commitTransaction();
      session.endSession();

      res.status(201).json(savedTransaction);
    } catch (error) {
      // If an error occurred, abort the transaction
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error creating transaction', error: error.message });
  }
};

export default {
  createPayment,
};
