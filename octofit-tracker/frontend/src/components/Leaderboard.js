import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const codespace = process.env.REACT_APP_CODESPACE_NAME || 'localhost';
  const baseUrl = codespace !== 'localhost'
    ? `https://${codespace}-8000.app.github.dev/api/leaderboard/`
    : `http://localhost:8000/api/leaderboard/`;
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    console.log('Fetching Leaderboard from:', baseUrl);
    fetch(baseUrl)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setLeaderboard(results);
        console.log('Leaderboard data:', results);
      });
  }, [baseUrl]);

  return (
    <div>
      <div className="card">
        <div className="card-body">
          <h2 className="card-title mb-4">Leaderboard</h2>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Team</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, idx) => (
                <tr key={entry.id || idx}>
                  <td>{entry.id}</td>
                  <td>{entry.team}</td>
                  <td>{entry.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
