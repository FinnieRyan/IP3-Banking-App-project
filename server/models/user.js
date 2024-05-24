import mongoose from 'mongoose'

const { Schema } = mongoose

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  lastLoginAt: { type: Date },
})

const User = mongoose.model('User', userSchema)

export default User
