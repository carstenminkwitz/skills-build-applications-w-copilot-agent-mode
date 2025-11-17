import React, { useEffect, useState } from 'react';

const Activities = () => {
  const codespace = process.env.REACT_APP_CODESPACE_NAME || 'localhost';
  const baseUrl = codespace !== 'localhost'
    ? `https://${codespace}-8000.app.github.dev/api/activities/`
    : `http://localhost:8000/api/activities/`;
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    console.log('Fetching Activities from:', baseUrl);
    fetch(baseUrl)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setActivities(results);
        console.log('Activities data:', results);
      });
  }, [baseUrl]);

  return (
    <div>
      <div className="card">
        <div className="card-body">
          <h2 className="card-title mb-4">Activities</h2>
          <button className="btn btn-primary mb-3" data-bs-toggle="modal" data-bs-target="#addActivityModal">Add Activity</button>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Duration</th>
                <th>Calories</th>
                <th>Date</th>
                <th>User</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity, idx) => (
                <tr key={activity.id || idx}>
                  <td>{activity.id}</td>
                  <td>{activity.type}</td>
                  <td>{activity.duration}</td>
                  <td>{activity.calories}</td>
                  <td>{activity.date}</td>
                  <td>{activity.user}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Modal Example */}
      <div className="modal fade" id="addActivityModal" tabIndex="-1" aria-labelledby="addActivityModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addActivityModalLabel">Add Activity</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="type" className="form-label">Type</label>
                  <input type="text" className="form-control" id="type" />
                </div>
                <div className="mb-3">
                  <label htmlFor="duration" className="form-label">Duration</label>
                  <input type="number" className="form-control" id="duration" />
                </div>
                <div className="mb-3">
                  <label htmlFor="calories" className="form-label">Calories</label>
                  <input type="number" className="form-control" id="calories" />
                </div>
                <div className="mb-3">
                  <label htmlFor="date" className="form-label">Date</label>
                  <input type="date" className="form-control" id="date" />
                </div>
                <div className="mb-3">
                  <label htmlFor="user" className="form-label">User</label>
                  <input type="text" className="form-control" id="user" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activities;
