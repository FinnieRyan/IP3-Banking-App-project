import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import Customer from './customer.js';

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
  await Customer.deleteMany({});
});

describe('Customer Model Test', () => {
  it('create & save customer successfully', async () => {
    const validCustomer = new Customer({
      userId: new mongoose.Types.ObjectId(),
      forename: 'John',
      surname: 'Doe',
      address: '123 Main St',
      contactNumber: '07123456789',
    });
    const savedCustomer = await validCustomer.save();

    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedCustomer._id).toBeDefined();
    expect(savedCustomer.userId).toBe(validCustomer.userId);
    expect(savedCustomer.forename).toBe(validCustomer.forename);
    expect(savedCustomer.surname).toBe(validCustomer.surname);
    expect(savedCustomer.address).toBe(validCustomer.address);
    expect(savedCustomer.contactNumber).toBe(validCustomer.contactNumber);
  });

  it('insert customer successfully, but the field not defined in schema should be undefined', async () => {
    const customerWithInvalidField = new Customer({
      userId: new mongoose.Types.ObjectId(),
      forename: 'John',
      surname: 'Doe',
      address: '123 Main St',
      contactNumber: '07123456789',
      nickname: 'Johnny', // This field is not defined in the schema
    });
    const savedCustomer = await customerWithInvalidField.save();
    expect(savedCustomer._id).toBeDefined();
    expect(savedCustomer.nickname).toBeUndefined();
  });

  it('create customer without required field should fail', async () => {
    const customerWithoutRequiredField = new Customer({
      forename: 'John',
      surname: 'Doe',
    });
    let err;
    try {
      await customerWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.userId).toBeDefined();
  });
});
