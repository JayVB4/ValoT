import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

interface Team {
  id: number;
  name: string;
  members: string[];
}

const TeamPage: React.FC = () => {
  const [teamName, setTeamName] = useState('');
  const [joinTeamId, setJoinTeamId] = useState<number | string>('');
  const [teams, setTeams] = useState<Team[]>([]);

  // Fetch existing teams when the component mounts
  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await fetch('http://localhost:3000/teams'); // Adjust this URL as necessary
      if (!response.ok) {
        throw new Error('Failed to fetch teams');
      }
      const data = await response.json();
      setTeams(data);
    } catch (error) {
      console.error('Error fetching teams:', error);
    }
  };

  const handleCreateTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = Cookies.get('token'); // Get the token from cookies

    if (!token) {
      alert('Please log in to create a team.');
      return;
    }

    const teamData = {
      name: teamName,
      // Add any other necessary team details here
    };

    try {
      const response = await fetch('http://localhost:3000/teams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Include token in the request
        },
        body: JSON.stringify(teamData),
      });

      if (!response.ok) {
        throw new Error('Failed to create team');
      }

      const result = await response.json();
      console.log('Team created:', result);
      alert('Successfully created the team!');

      // Reset form field
      setTeamName('');
      // Optionally, refetch teams to update the list
      fetchTeams();
    } catch (error) {
      console.error('Error creating team:', error);
      alert('Error creating the team.');
    }
  };

  const handleJoinTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = Cookies.get('token'); // Get the token from cookies

    if (!token) {
      alert('Please log in to join a team.');
      return;
    }

    const joinData = {
      team_id: Number(joinTeamId),
      // Add any other necessary join details here
    };

    try {
      const response = await fetch('http://localhost:3000/join-team', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Include token in the request
        },
        body: JSON.stringify(joinData),
      });

      if (!response.ok) {
        throw new Error('Failed to join team');
      }

      const result = await response.json();
      console.log('Joined team:', result);
      alert('Successfully joined the team!');

      // Reset form field
      setJoinTeamId('');
    } catch (error) {
      console.error('Error joining team:', error);
      alert('Error joining the team.');
    }
  };

  return (
    <div>
      <h2>Team Management</h2>

      <form onSubmit={handleCreateTeam}>
        <h3>Create Team</h3>
        <div>
          <label>Team Name:</label>
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Team</button>
      </form>

      <form onSubmit={handleJoinTeam}>
        <h3>Join Team</h3>
        <div>
          <label>Team ID:</label>
          <input
            type="number"
            value={joinTeamId}
            onChange={(e) => setJoinTeamId(e.target.value)}
            required
          />
        </div>
        <button type="submit">Join Team</button>
      </form>

      <h3>Existing Teams</h3>
      <ul>
        {teams.map((team) => (
          <li key={team.id}>
            <h4>{team.name}</h4>
            <p>Members: {team.members.join(', ')}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamPage;
