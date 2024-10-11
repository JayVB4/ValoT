import React, { useState } from 'react';
 // Include your CSS file for modal styles
 import '../app/App.css'; // Update the import to .scss

interface Tournament {
  name: string;
  date: string;
  location: string;
  participants: number;
}

const App: React.FC = () => {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [newTournament, setNewTournament] = useState<Tournament>({
    name: '',
    date: '',
    location: '',
    participants: 0,
  });

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setNewTournament({ name: '', date: '', location: '', participants: 0 }); // Reset form
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewTournament((prev) => ({
      ...prev,
      [name]: name === 'participants' ? Number(value) : value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setTournaments((prev) => [...prev, newTournament]);
    closeModal();
  };

  return (
    <div className="App">
      <h1>Tournament Management</h1>
      <button type="button" className="btn btn-dark" onClick={openModal}>
        Add Tournament
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>Add New Tournament</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Tournament Name:</label>
                <input
                  type="text"
                  name="name"
                  value={newTournament.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label>Date:</label>
                <input
                  type="date"
                  name="date"
                  value={newTournament.date}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label>Location:</label>
                <input
                  type="text"
                  name="location"
                  value={newTournament.location}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label>Participants:</label>
                <input
                  type="number"
                  name="participants"
                  value={newTournament.participants}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      )}

      {/* Display Tournaments */}
      <h2>Tournament List</h2>
      <ul>
        {tournaments.map((tournament, index) => (
          <li key={index}>
            {tournament.name} - {tournament.date} - {tournament.location} - {tournament.participants} Participants
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
