import mongoose from 'mongoose'

const { Schema } = mongoose

const userSessionSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  sessionToken: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
})

const UserSession = mongoose.model('UserSession', userSessionSchema)

export default UserSession
