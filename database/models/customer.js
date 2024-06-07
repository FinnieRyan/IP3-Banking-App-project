import mongoose from 'mongoose';

const { Schema } = mongoose;

const customerSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  forename: { type: String, required: true },
  surname: { type: String, required: true },
  address: { type: String },
  contactNumber: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Customer = mongoose.model('Customer', customerSchema);

export default Customer;
