//creates schema for exercise collection
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: "Exercise name required"
    },
    type:
    {
        type: String,
        required: true
    },
    weight:
    {
        type: Number,

    },
    sets:
    {
        type: Number,

    },
    reps:
    {
        type: Number,

    },
    duration:
    {
        type: Number,

    },
    distance:
    {
        type: Number,

    },

});

const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;
