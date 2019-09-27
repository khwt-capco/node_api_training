const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  firstname: {type: String, required: 'firstname cannot be blank'},
  surname: {type: String, required: 'surname cannot be blank'}
})

module.exports = mongoose.model('User', userSchema)
