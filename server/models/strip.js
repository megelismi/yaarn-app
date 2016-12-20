import mongoose from 'mongoose'

const stripSchema = mongoose.Schema({
  name: String,
  panels: [
      id: ObjectId
  ]
})

const Strip = mongoose.model('Strip', StripSchema)

module.exports = Strip
