import React, { useEffect, useState } from 'react';

function App() {
  const [anunturi, setAnunturi] = useState([]);

  useEffect(() => {
    fetch('https://ebay-anunturi.ro')  // pune aici URL-ul backend-ului online
      .then(res => res.json())
      .then(data => setAnunturi(data))
      .catch(err => console.error('Eroare la încărcarea anunțurilor:', err));
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Bine ai venit pe Ebay Anunțuri!</h1>
      <nav>
        <a href="/anunturi" style={navButtonStyle}>Vezi Anunțuri</a>
        <a href="/adauga" style={navButtonStyle}>Adaugă Anunț</a>
        <a href="/login" style={navButtonStyle}>Autentificare</a>
      </nav>

      <h2>Anunțuri:</h2>
      <ul>
        {anunturi.length === 0 && <li>Nu există anunțuri.</li>}
        {anunturi.map((anunt) => (
          <li key={anunt._id}>
            <strong>{anunt.titlu}</strong> - {anunt.descriere} - {anunt.pret} RON
          </li>
        ))}
      </ul>
    </div>
  );
}

const navButtonStyle = {
  display: 'inline-block',
  margin: '10px',
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: 'white',
  textDecoration: 'none',
  borderRadius: '5px',
  fontWeight: 'bold',
};

export default App;
