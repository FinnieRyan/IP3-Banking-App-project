import mongoose from 'mongoose'

const { Schema } = mongoose

const transactionSchema = new Schema({
  fromAccountId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Account',
  },
  toAccountId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
  amount: { type: Number, required: true },
  transactionType: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  paymentMethod: {
    type: String,
    enum: ['Card', 'Contactless'],
    required: true,
  },
  pending: { type: Boolean, default: true },
  vendor: { type: String, required: true },
  category: {
    type: String,
    enum: ['Food', 'Entertainment', 'Travel'],
    required: true,
  },
})

const Transaction = mongoose.model('Transaction', transactionSchema)

export default Transaction
