import React, { useEffect, useState } from 'react';

const Workouts = () => {
  const codespace = process.env.REACT_APP_CODESPACE_NAME || 'localhost';
  const baseUrl = codespace !== 'localhost'
    ? `https://${codespace}-8000.app.github.dev/api/workouts/`
    : `http://localhost:8000/api/workouts/`;
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    console.log('Fetching Workouts from:', baseUrl);
    fetch(baseUrl)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setWorkouts(results);
        console.log('Workouts data:', results);
      });
  }, [baseUrl]);

  return (
    <div>
      <div className="card">
        <div className="card-body">
          <h2 className="card-title mb-4">Workouts</h2>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Difficulty</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout, idx) => (
                <tr key={workout.id || idx}>
                  <td>{workout.id}</td>
                  <td>{workout.name}</td>
                  <td>{workout.description}</td>
                  <td>{workout.difficulty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Workouts;
