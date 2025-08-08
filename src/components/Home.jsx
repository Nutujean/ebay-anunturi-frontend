
import React, { useEffect, useState } from 'react';

function Home() {
  const [anunturi, setAnunturi] = useState([]);

  useEffect(() => {
    fetch('https://ebay-anunturi-backend-final-s2sf.onrender.com/api/anunturi')
      .then(res => res.json())
      .then(data => setAnunturi(data))
      .catch(err => console.error('Eroare la încărcarea anunțurilor:', err));
  }, []);

  return (
    <div>
      <h2>Anunțuri</h2>
      <ul>
        {anunturi.map(a => (
          <li key={a._id}>
            <h3>{a.titlu}</h3>
            <p>{a.descriere}</p>
            <p>{a.pret} RON</p>
            {a.imagineUrl && <img src={a.imagineUrl} alt="anunt" width="150" />}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
