//required dependencies for app to function
const express = require('express');
const router = express.Router();
const db = require("../models");

//get route for rendering homepage 
router.get("/", (req,res) => {
    db.Workout.find({})
    .populate("exercises").sort({date:-1}).lean() 
    .then(dbWorkout => {   
        res.render("index", {workouts: dbWorkout})
       }).catch(err => {
        res.json(err);
    });

});

//post route for new exercise 
router.post("/api/exercises", ({ body }, res) => {
    const newObj = {
        name: body.name,
        count: body.count,
        unit: body.unit,
        notes: body.notes
    } 
    //creates new exercise input
    db.Exercise.create(newObj)
        .then(({ _id }) => db.Workout.findOneAndUpdate({_id: body._id}, { $push: { exercises: _id } }, { new: true }))
        .then(dbWorkout => {
            console.log(dbWorkout);
            res.send(dbWorkout);
        }).catch(err => {
            console.log(err);
            res.send(err);
        });
});

//put route that updates the exercise db
router.put("/api/exercises", (req, res) => {
  
    db.Exercise.findOneAndUpdate({_id: req.body._id}, req.body, { new: true })
    .then(dbExercise => {
        res.send(dbExercise);
        console.log(dbExercise);
    }).catch(err => {
        res.send(err);
        console.log(err);
    });

});

//get route that renders the populated workouts 
router.get("/populatedworkouts", (req, res) => {
    db.Workout.find({}).sort({date:'asc'})
        .populate("exercises")
        .then(dbWorkout => {
            res.render({workouts: dbWorkout})
        }).catch(err => {
            res.json(err);
        });
});

//post route that creates a new workout 
router.post("/api/workouts", ({ body }, res) => {

    db.Workout.create({ name: body.name })
        .then(dbWorkout => {
            console.log(dbWorkout);

            res.send(dbWorkout)
        }).catch(({ message }) => {
            console.log(message);
        });
});

//delete route that deletes the exercise
router.delete("/api/exercises", ({ body }, res) => {
    db.Exercise.deleteOne({_id: body._id}, function(err) {
        if(err) throw err;
        console.log("exercise deleted");
        res.redirect("/")
    });
});

//delete route that deletes the workout
router.delete("/api/workouts", ({ body }, res) => {
    db.Workout.deleteOne({_id: body._id}, function(err){
        if(err) throw err;
        console.log('workout deleted');
        res.redirect("/")
    });
});


// export router
module.exports = router;