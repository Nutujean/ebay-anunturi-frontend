import React, { useEffect, useState } from "react";

function Home() {
  const [anunturi, setAnunturi] = useState([]);

  useEffect(() => {
    const incarcaAnunturi = async () => {
      try {
        const raspuns = await fetch("https://ebay-anunturi-backend-1.onrender.com/api/anunturi");
        const data = await raspuns.json();
        setAnunturi(data);
      } catch (err) {
        console.error("Eroare la încărcarea anunțurilor:", err);
      }
    };
    incarcaAnunturi();
  }, []);

  return (
    <div>
      <h2>Anunțuri recente</h2>
      {anunturi.map((a) => (
        <div key={a._id}>
          <h3>{a.titlu}</h3>
          <img src={a.imagine} alt={a.titlu} width="200" />
          <p>{a.descriere}</p>
          <p>{a.pret} lei</p>
        </div>
      ))}
    </div>
  );
}

export default Home;
