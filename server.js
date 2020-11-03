const express = require("express");
const mongojs = require("mongojs");
const logger = require("morgan");
const mongoose = require("mongoose");
const db = require("./models");

//calls express
const app = express();

//sets up port
const PORT = process.env.PORT || 3000;

//set up logger
app.use(logger("dev"));

//sets up middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//sets up mongob connection
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true});

//pulls in routes js
app.use(require("./routes/api-routes.js"));
app.use(require("./routes/html-routes.js"));

//logs err if err
// db.on("error", error => {
//   console.log("Database Error:", error);
// });

//listen for port
app.listen(3000, () => {
  console.log("App running on port 3000!");
});
