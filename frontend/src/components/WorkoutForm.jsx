import { useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutForm = () => {
  const [title, setTitle] = useState("");
  const [reps, setReps] = useState("");
  const [load, setLoad] = useState("");
  const [error, setError] = useState(null);
  const { dispatch } = useWorkoutContext();
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError(["You must be logged in!"]);
      return;
    }

    const response = await fetch("http://localhost:4000/api/workouts", {
      method: "POST",
      body: JSON.stringify({
        title,
        load,
        reps,
        
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.Error);
      console.log(error);
    } else {
      setTitle("");
      setLoad("");
      setReps("");

      setError(null);
      console.log("new workout added successfully", json);
      dispatch({ type: "CREATE_WORKOUT", payload: json });
    }
  };

  return (
    <>
      <form className="create" onSubmit={handleSubmit}>
        <h3>Add a new Workout:</h3>
        <label>Exercise Title:</label>
        <input
          type="text"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
        />

        <label>Load in kg:</label>
        <input
          type="number"
          onChange={(e) => {
            setLoad(e.target.value);
          }}
          value={load}
        />

        <label>Reps:</label>
        <input
          type="number"
          onChange={(e) => {
            setReps(e.target.value);
          }}
          value={reps}
        />
        <button>Add Workout</button>
        <br />
        {error && (
          <div className="error">
            {error.map((errorItem) => {
              return (
                <li key={errorItem.slice(0, errorItem.indexOf(" "))}>
                  {errorItem}
                </li>
              );
            })}
          </div>
        )}
      </form>
    </>
  );
};

export default WorkoutForm;
