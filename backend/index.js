require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const app = express();
const workoutRoutes = require("./routes/workout");
const userRoutes = require("./routes/user");

//allow cors for a specific api calling
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, DELETE, PATCH, PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  if (req.method === "OPTIONS") return res.status(204).end();
  next();
});

app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

mongoose
  .connect(process.env.MONGO_CONNECTION_STRING)
  .then((result) => {
    console.log("Connected to the db successfully");
    app.listen(process.env.PORT, () => {
      console.log("Listening on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// Catch-all handler for 404 errors
app.use((req, res, next) => {
  res.status(404).json({
    mesage: "The request is not found",
  });
});

// app.use()
