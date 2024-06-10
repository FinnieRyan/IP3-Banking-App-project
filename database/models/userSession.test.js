import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import UserSession from './userSession.js';

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
  // Clean up all data after each test
  await UserSession.deleteMany({});
});

describe('UserSession Model Test', () => {
  it('creates and saves a user session successfully', async () => {
    const validUserSession = new UserSession({
      userId: mongoose.Types.ObjectId.createFromHexString(
        '5e67a8b520a831395c077a6d'
      ),
      sessionToken: 'sessionToken123',
    });
    const savedUserSession = await validUserSession.save();

    expect(savedUserSession._id).toBeDefined();
    expect(savedUserSession.userId).toBeDefined();
    expect(savedUserSession.sessionToken).toBe('sessionToken123');
  });

  it('does not save a user session without a required field', async () => {
    const invalidUserSession = new UserSession({
      userId: mongoose.Types.ObjectId.createFromHexString(
        '5e67a8b520a831395c077a6d'
      ),
    });

    let err;
    try {
      await invalidUserSession.save();
    } catch (error) {
      err = error;
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.sessionToken).toBeDefined();
  });

  it('updates a user session successfully', async () => {
    const userSession = new UserSession({
      userId: mongoose.Types.ObjectId.createFromHexString(
        '5e67a8b520a831395c077a6d'
      ),
      sessionToken: 'sessionToken123',
    });
    await userSession.save();

    userSession.sessionToken = 'newSessionToken123';
    const updatedUserSession = await userSession.save();

    expect(updatedUserSession.sessionToken).toBe('newSessionToken123');
  });

  it('deletes a user session successfully', async () => {
    const userSession = new UserSession({
      userId: mongoose.Types.ObjectId.createFromHexString(
        '5e67a8b520a831395c077a6d'
      ),
      sessionToken: 'sessionToken123',
    });
    await userSession.save();

    await UserSession.deleteOne({ _id: userSession._id });
    const deletedUserSession = await UserSession.findById(userSession._id);

    expect(deletedUserSession).toBeNull();
  });
});
