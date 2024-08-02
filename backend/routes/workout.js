const express = require("express");
const { default: mongoose } = require("mongoose");
const Workout = require("../model/workoutModel");
const requireAuth = require("../middleware/requireAuth");

const workoutController = require("../controllers/workoutController");

const router = express.Router();

// making authentication required for all routes
router.use(requireAuth);

router.get("/", workoutController.getWorkouts);

router.get("/:id", workoutController.getWorkoutbyId);

router.post("/", workoutController.createWorkout);

router.delete("/:id", workoutController.deleteWorkoutbyId);

router.patch("/:id", workoutController.updateWorkoutbyId);

module.exports = router;
