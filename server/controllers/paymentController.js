import Account from '../../database/models/account.js';
import Transaction from '../../database/models/transactions.js';

export const createPayment = async (req, res) => {
  try {
    let {
      fromAccountId,
      toAccountId,
      amount,
      transactionType,
      paymentMethod,
      pending,
      vendor,
      category,
    } = req.body;

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
      toAccountId = toAccount._id;
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
      fromAccount.balance -= amount;
      toAccount.balance += amount;

      // Save the updated accounts
      await fromAccount.save({ session });
      await toAccount.save({ session });

      // Create the transaction
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
  createTransfer,
};
