import mongoose from 'mongoose';
import connectDB from './helpers';

// Mock mongoose.connect
jest.mock('mongoose', () => ({
  connect: jest.fn(),
}));

describe('connectDB', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should connect to MongoDB successfully', async () => {
    mongoose.connect.mockResolvedValueOnce({});
    await connectDB();
    expect(mongoose.connect).toHaveBeenCalledWith(process.env.DB_URI, {});
  });

  test('should throw an error if MongoDB connection fails', async () => {
    const errorMessage = 'Failed to connect';
    mongoose.connect.mockRejectedValueOnce(new Error(errorMessage));

    await expect(connectDB()).rejects.toThrow(errorMessage);
    expect(mongoose.connect).toHaveBeenCalledWith(process.env.DB_URI, {});
  });
});
