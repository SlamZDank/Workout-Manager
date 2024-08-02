import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useWorkoutContext } from "../hooks/useWorkoutContext";

import Footer from "../components/Footer";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {
  const { workouts, dispatch } = useWorkoutContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("http://localhost:4000/api/workouts", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_WORKOUT", payload: json });
      }
    };
    user ? fetchWorkouts() : {};
  }, [dispatch, user]);

  return (
    <div className="home">
      <div className="workouts">
        {workouts && workouts.length !== 0 ? (
          workouts.map((workout) => {
            return <WorkoutDetails key={workout._id} workout={workout} />;
          })
        ) : (
          <div className="empty-container">
            <h3>Workouts will show up here!</h3>
            <p>Add a new workout to get started!</p>
          </div>
        )}
      </div>
      <WorkoutForm />
      <Footer></Footer>
    </div>
  );
};

export default Home;
