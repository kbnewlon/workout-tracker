//required dependencies for app to function
const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");

//set up PORT
const PORT = process.env.PORT || 3000

//calls express
const app = express();

//calls for use of handlebars for layout
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//sets up middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//use public folder
app.use(express.static("public"));

//pulls in routes from the controller file
const routes = require("./controller/workout-controller.js");
app.use(routes);

//sets up connection through mongo
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workoutdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

//listen for port
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
})