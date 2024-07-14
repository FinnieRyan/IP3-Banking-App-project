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
    const fromAccount = await Account.findById(fromAccountId);
    const toAccount = await Account.findById(toAccountId);

    if (!fromAccount || !toAccount) {
      return res.status(404).json({ message: 'Account not found' });
    }

    if (fromAccount.balance < amount) {
      return res
        .status(400)
        .json({ message: 'Insufficient balance in the from account' });
    }

    const session = await Account.startSession();
    session.startTransaction();
    fromAccount.balance -= amount; // Debiting the fromAccount
    toAccount.balance += amount; // Crediting the toAccount

    await fromAccount.save({ session });
    await toAccount.save({ session });

    // Create one transaction with a signed amount
    const transaction = new Transaction({
      ...defaultTransaction,
      fromAccountId,
      toAccountId,
      amount: -amount, // Store amount as negative for debit
      description: 'Transfer from account to account',
    });

    await transaction.save({ session });
    await session.commitTransaction();
    session.endSession();

    res.status(201).json(transaction);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error creating transaction', error: error.message });
  }
};

export default {
  createPayment,
};
