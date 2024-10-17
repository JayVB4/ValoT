import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

interface Team {
  id: number;
  name: string;
}
interface Mem{
  id:number,
  team_id:number,
  username:string, 
  email:string, 
  password:string, 
}
interface DecodedToken {
  userEmail: string;
  sub: number; // This is where the host ID is stored
}

const TeamPage: React.FC = () => {
  const [teamName, setTeamName] = useState('');
  const [joinTeamId, setJoinTeamId] = useState<number | string>('');
  const [teams, setTeams] = useState<Team[]>([]);
  const [userId,setUserId] = useState<number>();
  const [members,setMembers] = useState<Mem[]>([]);
  // Fetch existing teams when the component mounts
  useEffect(() => {
    fetchTeams();
    setUserIdFromToken();
  }, []);
  useEffect(() => {
    teams.map((team)=>(fetchUsers(team)))
  }, [teams])

  const setUserIdFromToken = () => {
    const token = Cookies.get('token'); // Get the token from cookies
    if(token){
      const decoded: DecodedToken = jwtDecode(token);
      setUserId(decoded.sub); // Automatically set host ID from the decoded token
    }
  }

  const fetchUsers = async (team:any) => {
    try {
      const response = await fetch(`http://localhost:3000/user/${team.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setMembers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchTeams = async () => {
    try {
      const response = await fetch('http://localhost:3000/team'); // Adjust this URL as necessary
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
      const response = await fetch('http://localhost:3000/team', {
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

    const joinData = {
      team_id: Number(joinTeamId),
    };

    try {
      const response = await fetch(`http://localhost:3000/user/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(joinData),
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      const result = await response.json();
      console.log('User updated:', result);
    } catch (error) {
      console.error('Error:', error);
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
            {/* <p>Members: {team.members.join(',')}</p> */}
          </li>
        ))}
      </ul>
        <ul>
        {members.map((mem:any) => (
          <li key={mem.id}>
            <h4>{mem.username}</h4>
            <h4>{mem.team_id}</h4>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamPage;
