// src/components/Test.tsx

import React, { useEffect, useState } from 'react';

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

const Test: React.FC = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [rules, setRules] = useState('');
  const [hostId, setHostId] = useState<number | string>(''); // Host ID should be a number
  const [status, setStatus] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [teamSize, setTeamSize] = useState<number | string>(''); // Team size should be a number
  const [prizePool, setPrizePool] = useState<number | string>(''); // Prize pool should be a number
  const [tournaments, setTournaments] = useState<Tournament[]>([]);

  // Fetch tournaments when the component mounts
  useEffect(() => {
    fetchTournaments();
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const tournamentData = {
      title,
      body,
      rules,
      host_id: Number(hostId),
      status,
      start_date: new Date(startDate),
      end_date: new Date(endDate),
      team_size: Number(teamSize),
      prize_pool: Number(prizePool),
    };

    try {
      const response = await fetch('http://localhost:3000/tournies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tournamentData),
      });

      if (!response.ok) {
        throw new Error('Failed to create tournament');
      }

      const result = await response.json();
      console.log('Tournament created:', result);

      // Reset form fields
      setTitle('');
      setBody('');
      setRules('');
      setHostId('');
      setStatus('');
      setStartDate('');
      setEndDate('');
      setTeamSize('');
      setPrizePool('');

      // Fetch updated tournaments
      fetchTournaments();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Create Tournament</h2>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Body:</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Rules:</label>
          <textarea
            value={rules}
            onChange={(e) => setRules(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Host ID:</label>
          <input
            type="number"
            value={hostId}
            onChange={(e) => setHostId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Status:</label>
          <input
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Team Size:</label>
          <input
            type="number"
            value={teamSize}
            onChange={(e) => setTeamSize(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Prize Pool:</label>
          <input
            type="number"
            value={prizePool}
            onChange={(e) => setPrizePool(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Tournament</button>
      </form>

      <h2>Current Tournaments</h2>
      <ul>
        {tournaments.map((tournament) => (
          <li key={tournament.id}>
            <h3>{tournament.title}</h3>
            <p>{tournament.body}</p>
            <p>Rules: {tournament.rules}</p>
            <p>Host ID: {tournament.host_id}</p>
            <p>Status: {tournament.status}</p>
            <p>Start Date: {new Date(tournament.start_date).toLocaleDateString()}</p>
            <p>End Date: {new Date(tournament.end_date).toLocaleDateString()}</p>
            <p>Team Size: {tournament.team_size}</p>
            <p>Prize Pool: {tournament.prize_pool}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Test;
