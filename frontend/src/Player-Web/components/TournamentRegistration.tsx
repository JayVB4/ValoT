import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

interface Tournament {
  id: number;
  title: string;
  body: string;
  rules: string;
  host_id: number;
  status: string;
  created_at: string;
  start_date: string;
  end_date: string;
  team_size: number;
  prize_pool: number;
}

const TournamentRegistration: React.FC = () => {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [userId,setUserId] =useState<string|undefined>();
  const [teamId,setTeamId] =useState();
  // Fetch tournaments when the component mounts
  useEffect(() => {
    fetchTournaments();
    fetchTeamAndUserId();
  }, []);
  
  const fetchTournaments = async () => {
    try {
      const response = await fetch('http://localhost:3000/tournies');
      if (!response.ok) {
        throw new Error('Failed to fetch tournaments');
      }
      const data = await response.json();
      setTournaments(data);
    } catch (error) {
      console.error('Error fetching tournaments:', error);
    }
  };

  const fetchTeamAndUserId = async () => {
    try {
      const token = Cookies.get('token'); // Get the token from cookies
      if(token){
        setUserId(jwtDecode(token).sub);
        const response = await fetch(`http://localhost:3000/user/${jwtDecode(token).sub}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }
        const data = await response.json();
        console.log(data["team_id"])
        setTeamId(data["team_id"]);
      }
    } catch (error) {
      console.error('Error fetching tournaments:', error);
    }
  };
  
  
  const handleRegister = async (tournamentId: number) => {
    const token = Cookies.get('token'); // Get the token from cookies

    const response = await fetch(`http://localhost:3000/regTeams/team/${teamId}`);
    const data = await response.json();
    console.log("AA",data)
    if(data.length>0){
      alert('Already registered');
      return;
    }

    const registrationData = {
      tourny_id: tournamentId,
      team_id: teamId
    };

    try {
      const response = await fetch('http://localhost:3000/regTeams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Include token in the request
        },
        body: JSON.stringify(registrationData),
      });

      if (!response.ok) {
        throw new Error('Failed to register for the tournament');
      }

      const result = await response.json();
      console.log('Registration successful:', result);
      alert('Successfully registered for the tournament!');

      // Optionally, refetch tournaments to update the list
      fetchTournaments();
    } catch (error) {
      console.error('Error registering for tournament:', error);
      alert('Error registering for the tournament.');
    }
  };

  return (
    <div>
      <h2>Tournament Registration</h2>
      <ul>
        {tournaments.map((tournament) => (
          <li key={tournament.id}>
            <h3>{tournament.title}</h3>
            <p>{tournament.body}</p>
            <p>Rules: {tournament.rules}</p>
            <p>Status: {tournament.status}</p>
            <p>Start Date: {new Date(tournament.start_date).toLocaleDateString()}</p>
            <p>End Date: {new Date(tournament.end_date).toLocaleDateString()}</p>
            <p>Team Size: {tournament.team_size}</p>
            <p>Prize Pool: {tournament.prize_pool}</p>
            <button onClick={() => handleRegister(tournament.id)}>Register</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TournamentRegistration;