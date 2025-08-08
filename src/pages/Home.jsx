import React, { useEffect, useState } from "react";

function Home() {
  const [anunturi, setAnunturi] = useState([]);
  const [search, setSearch] = useState("");
  const [pretMin, setPretMin] = useState("");
  const [pretMax, setPretMax] = useState("");
  const [categorie, setCategorie] = useState("");
  const [sortare, setSortare] = useState("");

  const fetchAnunturi = async () => {
    let url = "https://ebay-anunturi-backend-1.onrender.com/api/anunturi?";
    if (search) url += `search=${search}&`;
    if (pretMin) url += `pretMin=${pretMin}&`;
    if (pretMax) url += `pretMax=${pretMax}&`;
    if (categorie) url += `categorie=${categorie}&`;
    if (sortare) url += `sort=${sortare}&`;

    const response = await fetch(url);
    const data = await response.json();
    setAnunturi(data);
  };

  useEffect(() => {
    fetchAnunturi();
  }, [search, pretMin, pretMax, categorie, sortare]);

  return (
    <div className="home">
      <h2>Anunțuri</h2>

      <div className="filtre">
        <input
          type="text"
          placeholder="Caută..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          type="number"
          placeholder="Preț minim"
          value={pretMin}
          onChange={(e) => setPretMin(e.target.value)}
        />
        <input
          type="number"
          placeholder="Preț maxim"
          value={pretMax}
          onChange={(e) => setPretMax(e.target.value)}
        />
        <select
          value={categorie}
          onChange={(e) => setCategorie(e.target.value)}
        >
          <option value="">Toate categoriile</option>
          <option value="Electronice">Electronice</option>
          <option value="Auto">Auto</option>
          <option value="Imobiliare">Imobiliare</option>
          <option value="Haine">Haine</option>
          <option value="Altele">Altele</option>
        </select>
        <select
          value={sortare}
          onChange={(e) => setSortare(e.target.value)}
        >
          <option value="">Sortare</option>
          <option value="pretCresc">Preț crescător</option>
          <option value="pretDesc">Preț descrescător</option>
        </select>
      </div>

      <div className="lista-anunturi">
        {anunturi.length === 0 && <p>Nu există anunțuri.</p>}
        {anunturi.map((anunt) => (
          <div key={anunt._id} className="anunt">
            <h3>{anunt.titlu}</h3>
            <p>{anunt.descriere}</p>
            <p>Preț: {anunt.pret} lei</p>
            <p>Categorie: {anunt.categorie}</p>
            {anunt.imagineURL && (
              <img src={anunt.imagineURL} alt="anunt" width="200" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
