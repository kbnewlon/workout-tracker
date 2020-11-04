const router = require("express").Router();
const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect("mongodb://localhost/workout", {
    useNewUrlParser: true
});




//this route finds a workout 
//get last workout
router.get("/api/workout", (req, res) => {
    db.Workout.find({})
        .populate("exercises")
        .sort({ dateCreated: -1 })
        .limit(1)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json(error);
        });
});

//this route posts a new workout
router.post("/api/workout", (req, res) => {
    db.Workout.create({name:"MyE"})
        .then(dbworkout => {
            db.Exercise.create(req.body)
                .then(dbexercise => {
                    db.Workout.findOneAndUpdate({ _id: dbworkout._id }, { $push: { exercises: dbexercise._id } })
                    res.json(dbworkout);
                })
        }).catch(error => {
            if (error) {
                res.status(400).json(error);
            }
        })
});
router.post("/api/exercise", (req, res) => {
    db.Workout.create({name:"MyE"})
        .then(dbworkout => {
            db.Exercise.create(req.body)
                .then(({_id}) => {
                 
                    db.Workout.findOneAndUpdate({ _id: dbworkout._id }, { $push: { exercises: _id } },{new:true}).then(results => {

                        res.json(results);
                    })
                })
        }).catch(error => {
            if (error) {
                res.status(400).json(error);
            }
        })
});

//this route posts a new exercise
router.put("/api/exercise", (req, res) => {
    console.log("Inside put req");
    db.Exercise.create(req.body)
        .then(function (results) {
            console.log(results._id)
            db.Workout.findOneAndUpdate({}, { $push: { exercises: results._id } })
        }).then(results => {
            console.log(results)
        }).catch(error => {
            if (error) {
                res.status(400).json(error);
            }
        })
});

//final all workouts, sort by dateCreated, render the last one in the array 


module.exports = router;