import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";

// importing date from date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

/* eslint-disable react/prop-types */
const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      console.error("Failed to authenticate user");
      return;
    }

    const response = await fetch(
      `http://localhost:4000/api/workouts/${workout._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };

  return (
    <>
      <div className="workout-details">
        <h4>{workout.title}</h4>
        <p>
          <strong>Load (kg): {workout.load}</strong>
        </p>
        <p>
          <strong>Reps: {workout.reps}</strong>
        </p>
        <p>
          {formatDistanceToNow(new Date(workout.createdAt), {
            addSuffix: true,
          })}
        </p>
        <span onClick={handleClick}> 🗑️ </span>
      </div>
    </>
  );
};

export default WorkoutDetails;
