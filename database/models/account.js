import mongoose from 'mongoose';

const { Schema } = mongoose;

const accountSchema = new Schema({
  customerId: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
  accountType: { type: String, required: true },
  balance: { type: Number, default: 0.0 },
  accountNumber: { type: String, unique: true, required: true },
  sortCode: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Account = mongoose.model('Account', accountSchema);

export default Account;
