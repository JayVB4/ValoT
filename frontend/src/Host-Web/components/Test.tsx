// import React, { useEffect, useState } from 'react';
// import { jwtDecode } from 'jwt-decode';
// import Cookies from 'js-cookie';

// interface Tournament {
//   id: number;
//   title: string;
//   body: string;
//   rules: string;
//   host_id: number;
//   status: string;
//   created_at: string;
//   start_date: string;
//   end_date: string;
//   team_size: number;
//   prize_pool: number;
// }

// interface DecodedToken {
//   hostEmail: string;
//   sub: number; // This is where the host ID is stored
// }

// const Test: React.FC = () => {
//   const [title, setTitle] = useState('');
//   const [body, setBody] = useState('');
//   const [rules, setRules] = useState('');
//   const [hostId, setHostId] = useState<number | string>(); // Host ID will be set automatically
//   const [status, setStatus] = useState('');
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [teamSize, setTeamSize] = useState<number | string>('');
//   const [prizePool, setPrizePool] = useState<number | string>('');
//   const [tournaments, setTournaments] = useState<Tournament[]>([]);

//   // Fetch tournaments when the component mounts
//   useEffect(() => {
//     fetchTournaments();
//     setHostIdFromToken(); // Automatically set host ID
//   }, []);

//   const fetchTournaments = async () => {
//     try {
//       const response = await fetch('http://localhost:3000/tourny');
//       if (!response.ok) {
//         throw new Error('Failed to fetch tournaments');
//       }
//       const data = await response.json();
//       setTournaments(data);
//     } catch (error) {
//       console.error('Error fetching tournaments:', error);
//     }
//   };

//   // Function to decode the JWT and extract the host ID
//   const setHostIdFromToken = () => {
//     const token = Cookies.get('token');
//     if (token) {
//       const decoded: DecodedToken = jwtDecode(token);
//       setHostId(decoded.sub); // Automatically set host ID from the decoded token
//     }
//   };

//   const validateDates = () => {
//     const today = new Date();
//     const start = new Date(startDate);
//     const end = new Date(endDate);

//     if (start < today) {
//       return 'Start date cannot be in the past';
//     }
//     if (end <= start) {
//       return 'End date cannot be before or the same as the start date';
//     }
//     return null;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     const errorMessage = validateDates();
//     if (errorMessage) {
//       alert(errorMessage);
//       return;
//     }

//     const computedStatus = determineStatus(startDate, endDate);

//     const tournamentData = {
//       title,
//       body,
//       rules,
//       host_id: Number(hostId), // Host ID is now set automatically
//       status: computedStatus, // Automatically set status
//       start_date: new Date(startDate),
//       end_date: new Date(endDate),
//       team_size: Number(teamSize),
//       prize_pool: Number(prizePool),
//     };

//     try {
//       const response = await fetch('http://localhost:3000/tourny', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('access_token')}`, // Add token in headers if needed
//         },
//         body: JSON.stringify(tournamentData),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to create tournament');
//       }

//       const result = await response.json();
//       console.log('Tournament created:', result);

//       // Reset form fields
//       setTitle('');
//       setBody('');
//       setRules('');
//       setStartDate('');
//       setEndDate('');
//       setTeamSize('');
//       setPrizePool('');

//       // Fetch updated tournaments
//       fetchTournaments();
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   // Function to determine the status based on start and end date
//   const determineStatus = (startDate: string, endDate: string): string => {
//     const today = new Date();
//     const start = new Date(startDate);
//     const end = new Date(endDate);

//     if (today < start) {
//       return 'upcoming'; // If current date is before start date
//     }
//     if (today >= start && today <= end) {
//       return 'ongoing'; // If current date is between start and end date
//     }
//     if (today > end) {
//       return 'completed'; // If current date is after end date
//     }
//     return 'unknown';
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <h2>Create Tournament</h2>
//         <div>
//           <label>Title:</label>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Body:</label>
//           <textarea
//             value={body}
//             onChange={(e) => setBody(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Rules:</label>
//           <textarea
//             value={rules}
//             onChange={(e) => setRules(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Start Date:</label>
//           <input
//             type="date"
//             value={startDate}
//             onChange={(e) => setStartDate(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>End Date:</label>
//           <input
//             type="date"
//             value={endDate}
//             onChange={(e) => setEndDate(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Team Size:</label>
//           <input
//             type="number"
//             value={teamSize}
//             onChange={(e) => setTeamSize(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Prize Pool:</label>
//           <input
//             type="number"
//             value={prizePool}
//             onChange={(e) => setPrizePool(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Create Tournament</button>
//       </form>

//       <h2>Current Tournaments</h2>
//       <ul>
//         {tournaments.map((tournament) => (
//           <li key={tournament.id}>
//             <h3>{tournament.title}</h3>
//             <p>{tournament.body}</p>
//             <p>Rules: {tournament.rules}</p>
//             <p>Host ID: {tournament.host_id}</p>
//             <p>Status: {tournament.status}</p>
//             <p>Start Date: {new Date(tournament.start_date).toLocaleDateString()}</p>
//             <p>End Date: {new Date(tournament.end_date).toLocaleDateString()}</p>
//             <p>Team Size: {tournament.team_size}</p>
//             <p>Prize Pool: {tournament.prize_pool}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Test;

import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

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

interface DecodedToken {
  hostEmail: string;
  sub: number; // This is where the host ID is stored
}

interface RegTeam {
  id: number;
  team: {
    id: number;
    name: string;
  };
  team_id:number;
  tourny_id: number;
}

const Test: React.FC = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [rules, setRules] = useState('');
  const [hostId, setHostId] = useState<number | string>();
  const [status, setStatus] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [teamSize, setTeamSize] = useState<number | string>('');
  const [prizePool, setPrizePool] = useState<number | string>('');
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [selectedTournamentId, setSelectedTournamentId] = useState<number | null>(null);
  const [regTeams, setRegTeams] = useState<RegTeam[]>([]); // New state for RegTeams

  useEffect(() => {
    fetchTournaments();
    setHostIdFromToken();
  }, []);

  // Fetch all tournaments
  const fetchTournaments = async () => {
    try {
      const response = await fetch('http://localhost:3000/tourny');
      if (!response.ok) {
        throw new Error('Failed to fetch tournaments');
      }
      const data = await response.json();
      setTournaments(data);
    } catch (error) {
      console.error('Error fetching tournaments:', error);
    }
  };

  // Fetch RegTeams based on the selected tournament ID
  const fetchRegTeams = async (tournyId: number) => {
    try {
      const response = await fetch(`http://localhost:3000/regteams/${tournyId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch registered teams');
      }
      const data = await response.json();
      setRegTeams(data);
    } catch (error) {
      console.error('Error fetching registered teams:', error);
    }
  };

  // Decode the JWT token and extract the host ID
  const setHostIdFromToken = () => {
    const token = Cookies.get('token');
    if (token) {
      const decoded: DecodedToken = jwtDecode(token);
      setHostId(decoded.sub);
    }
  };

  // Handle tournament selection to fetch its RegTeams
  const handleTournamentSelect = (tournamentId: number) => {
    setSelectedTournamentId(tournamentId);
    fetchRegTeams(tournamentId); // Fetch RegTeams for the selected tournament
  };

  return (
    <div>
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
            <button onClick={() => handleTournamentSelect(tournament.id)}>
              View Registered Teams
            </button>
          </li>
        ))}
      </ul>

      {/* Display Registered Teams for the selected tournament */}
      {selectedTournamentId && (
        <div>
          <h2>Registered Teams for Tournament ID: {selectedTournamentId}</h2>
          {regTeams.length > 0 ? (
            <ul>
              {regTeams.map((regTeam) => (
                <li key={regTeam.id}>
                  <p>Team ID: {regTeam.team.id}</p>
                  <p>Team Name: {regTeam.team.name}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No teams registered for this tournament yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Test;
