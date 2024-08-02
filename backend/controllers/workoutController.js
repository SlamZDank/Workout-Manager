const { default: mongoose } = require("mongoose");
const Workout = require("../model/workoutModel");

const getWorkouts = async (req, res) => {
  const workouts = await Workout.find({ user_id: req.user._id }).sort({
    createdAt: -1,
  });
  res.status(200).json(workouts);
};

const getWorkoutbyId = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({ Error: "No such workout" });
  }

  const workout = await Workout.findById(req.params.id);
  res.status(200).json(workout);
};

const deleteWorkoutbyId = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({ Error: "No such workout" });
  }

  const feedback = await Workout.findOneAndDelete({ _id: req.params.id });
  res.status(200).json(feedback);
};

const updateWorkoutbyId = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({ Error: "No such workout" });
  }

  const feedback = await Workout.findOneAndUpdate(
    { _id: req.params.id },
    ...req.body
  );
  res.status(200).json(feedback);
};

const createWorkout = async (req, res) => {
  let { title, load, reps } = req.body;
  let emptyFields = [];
  const noEmpty = "field must not be empty!";

  if (!title) {
    emptyFields.push("Title " + noEmpty);
  }

  if (!load) {
    emptyFields.push("Load " + noEmpty);
  }

  if (!reps) {
    emptyFields.push("Reps " + noEmpty);
  }

  try {
    const user = req.user._id;
    const workout = await Workout.create({ ...req.body, user_id: user });
    res.json(workout);
  } catch (err) {
    res.status(400).json({ Error: emptyFields });
  }
};

module.exports = {
  createWorkout,
  getWorkouts,
  getWorkoutbyId,
  deleteWorkoutbyId,
  updateWorkoutbyId,
};
