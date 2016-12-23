import mongoose from 'mongoose'

const stripSchema = mongoose.Schema({
  name: String,
  panels: []
})

const Strip = mongoose.model('Strip', StripSchema)

module.exports = Strip
