//creates schema for workout collection
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: "Workout name required"
  },
  exercise: [
    {
      type: Schema.Types.ObjectId,
      ref: "Exercise"
    }
  ],

  dateCreated: {
    type: Date,
    default: Date.now,
    required: true
  }
});

const User = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
