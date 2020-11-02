const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
   exerciseName: {
    type: String,
    trim: true,
    required: "Exercise name required"
  },
exerciseType: 
    {
        type: String,
        required: true
    },

  
  weight: Number, 
  sets: Number, 
  reps: Number,
  duration: Number, 
  distance: Number

const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;
