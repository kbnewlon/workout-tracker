const express = require("express");
const mongojs = require("mongojs");
const logger = require("morgan");
const mongoose = require("mongoose");
const db = require("./models");


const databaseUrl = "fitnessTracker";
const collections = ["workouts"];
const db = mongojs(databaseUrl, collections);

const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGOB_URI || "mongob://localhost/workoutdb", { useNewUrlParser: true});

db.on("error", error => {
  console.log("Database Error:", error);
});

//this route posts a new workout
app.post("/workout", ({ body }, res) => {
  db.Workout.create(body)
  .then(dbworkout => {
      res.json(dbworkout);
  }).catch(error, data)
    if (error) {
      res.status(400).json(err);
    } else {
      res.send(data);
    }
  });

//this route finds a workout 
app.get("/workout", (req, res) => {
  db.Exercise.find({})
  .then(dbworkout => {
      res.json(dbworkout)
  }),
});

app.get("/unread", (req, res) => {
  db.books.find({ read: false }, (error, found) => {
    if (error) {
      console.log(error);
    } else {
      res.json(found);
    }
  });
});

app.put("/markread/:id", ({ params }, res) => {
  db.books.update(
    {
      _id: mongojs.ObjectId(params.id)
    },
    {
      $set: {
        read: true
      }
    },

    (error, edited) => {
      if (error) {
        console.log(error);
        res.send(error);
      } else {
        console.log(edited);
        res.send(edited);
      }
    }
  );
});

app.put("/markunread/:id", ({ params }, res) => {
  db.books.update(
    {
      _id: mongojs.ObjectId(params.id)
    },
    {
      $set: {
        read: false
      }
    },

    (error, edited) => {
      if (error) {
        console.log(error);
        res.send(error);
      } else {
        console.log(edited);
        res.send(edited);
      }
    }
  );
});

app.listen(3000, () => {
  console.log("App running on port 3000!");
});
