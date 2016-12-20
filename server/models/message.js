import mongoose from 'mongoose'

const messageSchema = mongoose.Schema({
  message: String
})

const Message = mongoose.model('Message', messageSchema)

module.exports = Message
