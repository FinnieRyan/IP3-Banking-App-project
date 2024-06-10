import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
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
  await Account.deleteMany({});
});

describe('Account Model Test', () => {
  it('create & save account successfully', async () => {
    const validAccount = new Account({
      customerId: new mongoose.Types.ObjectId(),
      accountType: 'Savings',
      balance: 1000,
      accountNumber: '12345678',
      sortCode: '12-34-56',
    });
    const savedAccount = await validAccount.save();

    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedAccount._id).toBeDefined();
    expect(savedAccount.customerId).toBe(validAccount.customerId);
    expect(savedAccount.accountType).toBe(validAccount.accountType);
    expect(savedAccount.balance).toBe(validAccount.balance);
    expect(savedAccount.accountNumber).toBe(validAccount.accountNumber);
    expect(savedAccount.sortCode).toBe(validAccount.sortCode);
  });

  it('insert account successfully, but the field not defined in schema should be undefined', async () => {
    const accountWithInvalidField = new Account({
      customerId: new mongoose.Types.ObjectId(),
      accountType: 'Savings',
      balance: 1000,
      accountNumber: '12345678',
      sortCode: '12-34-56',
      nickname: 'My Savings', // This field is not defined in the schema
    });
    const savedAccount = await accountWithInvalidField.save();
    expect(savedAccount._id).toBeDefined();
    expect(savedAccount.nickname).toBeUndefined();
  });

  it('create account without required field should fail', async () => {
    const accountWithoutRequiredField = new Account({
      accountType: 'Savings',
      balance: 1000,
      accountNumber: '12345678',
      sortCode: '12-34-56',
    });
    let err;
    try {
      await accountWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.customerId).toBeDefined();
  });
});
