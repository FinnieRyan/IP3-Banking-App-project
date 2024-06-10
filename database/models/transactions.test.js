import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import Transaction from './transactions.js';
import Account from './account.js';

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  // Clean up all the data after each test
  await Transaction.deleteMany({});
  await Account.deleteMany({});
});

describe('Transaction Model Test', () => {
  it('create & save transaction successfully', async () => {
    const fromAccount = new Account({
      customerId: new mongoose.Types.ObjectId(),
      accountType: 'Savings',
      balance: 1000.0,
      accountNumber: '12345678',
      sortCode: '12-34-56',
    });

    const toAccount = new Account({
      customerId: new mongoose.Types.ObjectId(),
      accountType: 'Current',
      balance: 500.0,
      accountNumber: '87654321',
      sortCode: '65-43-21',
    });

    await fromAccount.save();
    await toAccount.save();

    const validTransaction = new Transaction({
      fromAccountId: fromAccount._id,
      toAccountId: toAccount._id,
      amount: 100,
      transactionType: 'Transfer',
      paymentMethod: 'Online Banking',
      pending: false,
      vendor: 'Internal Payment',
      category: 'Internal Payment',
    });
    const savedTransaction = await validTransaction.save();

    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedTransaction._id).toBeDefined();
    expect(savedTransaction.fromAccountId).toBe(validTransaction.fromAccountId);
    expect(savedTransaction.toAccountId).toBe(validTransaction.toAccountId);
    expect(savedTransaction.amount).toBe(validTransaction.amount);
    expect(savedTransaction.transactionType).toBe(
      validTransaction.transactionType
    );
    expect(savedTransaction.paymentMethod).toBe(validTransaction.paymentMethod);
    expect(savedTransaction.pending).toBe(validTransaction.pending);
    expect(savedTransaction.vendor).toBe(validTransaction.vendor);
    expect(savedTransaction.category).toBe(validTransaction.category);
  });

  it('insert transaction successfully, but the field not defined in schema should be undefined', async () => {
    const fromAccount = new Account({
      customerId: new mongoose.Types.ObjectId(),
      accountType: 'Savings',
      balance: 1000.0,
      accountNumber: '12345678',
      sortCode: '12-34-56',
    });

    const toAccount = new Account({
      customerId: new mongoose.Types.ObjectId(),
      accountType: 'Current',
      balance: 500.0,
      accountNumber: '87654321',
      sortCode: '65-43-21',
    });

    await fromAccount.save();
    await toAccount.save();

    const transactionWithInvalidField = new Transaction({
      fromAccountId: fromAccount._id,
      toAccountId: toAccount._id,
      amount: 100,
      transactionType: 'Transfer',
      paymentMethod: 'Online Banking',
      pending: false,
      vendor: 'Internal Payment',
      category: 'Internal Payment',
      extraField: 'should be undefined', // This field is not defined in the schema
    });
    const savedTransaction = await transactionWithInvalidField.save();
    expect(savedTransaction._id).toBeDefined();
    expect(savedTransaction.extraField).toBeUndefined();
  });

  it('create transaction without required field should fail', async () => {
    const transactionWithoutRequiredField = new Transaction({
      amount: 100,
    });
    let err;
    try {
      await transactionWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.fromAccountId).toBeDefined();
    expect(err.errors.toAccountId).toBeDefined();
    expect(err.errors.transactionType).toBeDefined();
    expect(err.errors.paymentMethod).toBeDefined();
    expect(err.errors.vendor).toBeDefined();
    expect(err.errors.category).toBeDefined();
  });
});
