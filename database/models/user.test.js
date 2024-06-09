import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import User from './user.js';

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  // Clean up all the data after each test
  await User.deleteMany({});
});

describe('User Model Test', () => {
  it('creates and saves a user successfully', async () => {
    const validUser = new User({
      username: 'testuser',
      passwordHash: 'hashedpassword',
      email: 'testuser@example.com',
    });
    const savedUser = await validUser.save();

    expect(savedUser._id).toBeDefined();
    expect(savedUser.username).toBe('testuser');
    expect(savedUser.passwordHash).toBe('hashedpassword');
    expect(savedUser.email).toBe('testuser@example.com');
  });

  it('does not save a user without a required field', async () => {
    const invalidUser = new User({ username: 'testuser' }); // missing passwordHash and email

    let err;
    try {
      await invalidUser.save();
    } catch (error) {
      err = error;
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.passwordHash).toBeDefined();
    expect(err.errors.email).toBeDefined();
  });

  it('updates a user successfully', async () => {
    const user = new User({
      username: 'testuser',
      passwordHash: 'hashedpassword',
      email: 'testuser@example.com',
    });
    await user.save();

    user.email = 'newemail@example.com';
    const updatedUser = await user.save();

    expect(updatedUser.email).toBe('newemail@example.com');
  });

  it('deletes a user successfully', async () => {
    const user = new User({
      username: 'testuser',
      passwordHash: 'hashedpassword',
      email: 'testuser@example.com',
    });
    await user.save();

    await User.deleteOne({ _id: user._id });
    const deletedUser = await User.findById(user._id);

    expect(deletedUser).toBeNull();
  });
});
