import React, { useEffect, useState } from 'react';

const Teams = () => {
  const codespace = process.env.REACT_APP_CODESPACE_NAME || 'localhost';
  const baseUrl = codespace !== 'localhost'
    ? `https://${codespace}-8000.app.github.dev/api/teams/`
    : `http://localhost:8000/api/teams/`;
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    console.log('Fetching Teams from:', baseUrl);
    fetch(baseUrl)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setTeams(results);
        console.log('Teams data:', results);
      });
  }, [baseUrl]);

  return (
    <div>
      <div className="card">
        <div className="card-body">
          <h2 className="card-title mb-4">Teams</h2>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team, idx) => (
                <tr key={team.id || idx}>
                  <td>{team.id}</td>
                  <td>{team.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Teams;
