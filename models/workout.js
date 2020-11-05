//this model uses mongoose to create the workout 
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    name: {
        type: String,
        required: "please enter a name for this specific exercise"
    },
    exercises: [
        {
            type: Schema.Types.ObjectId,
            ref: "Exercise"
        }
    ],
    date: {
      type: Date,
      default: Date.now,
      required: true
    }
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;