// require mongoose
const mongoose = require('mongoose');

// declare schema
const Schema = mongoose.Schema;


// creating new schema for collection
const TasksSchema = new Schema({
  name: {
    type: String,
    required: 'enter name for new task'
  },
  created_date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: [
      {
        type: String,
        enum: ['pending', 'completed']
      }
    ],
    default: ['pending']
  }
});


// expose collections functions for use in controller
module.exports = mongoose.model('Tasks', TasksSchema);