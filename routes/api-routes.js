const router = require("express").Router();
const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect("mongodb://localhost/workout", {
    useNewUrlParser: true
});

// //get all workouts
// router.get("/api/workout", (req, res) => {
//     db.Workout.find({})
//         .then(dbworkout => {
//             res.json(dbworkout)
//         }).catch(error =>{
//             if (error) {
//                  res.status(400).json(error);
//              }
//          })
// });


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
    db.Workout.create({})
        .then(dbworkout => {
            res.json(dbworkout);
        }).catch(error =>{
            if (error) {
                 res.status(400).json(error);
             }
         })
});


//this route posts a new exercise
router.put("/api/exercise/:id", (req, res) => {
    db.Exercise.create(req.body)
    .then(function(results){
        console.log(results._id)
    return db.Workout.findOneAndUpdate({_id:req.params.id},{ $push: {exercises: results._id}} , { new: true } )
    })
        .then(dbworkout => {
            res.json(dbworkout);
        }).catch(error =>{
       if (error) {
            res.status(400).json(error);
        }
    })
});




module.exports = router;