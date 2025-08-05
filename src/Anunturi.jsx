import { useEffect, useState } from "react";

export default function Anunturi() {
  const [anunturi, setAnunturi] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/api/anunturi`)
      .then((res) => res.json())
      .then((data) => setAnunturi(data))
      .catch((err) => console.error("Eroare la preluarea anunțurilor:", err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Anunțuri disponibile</h2>
      {anunturi.length === 0 ? (
        <p>Nu există anunțuri disponibile.</p>
      ) : (
        <ul className="space-y-4">
          {anunturi.map((anunt) => (
            <li
              key={anunt._id}
              className="border p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold">{anunt.titlu}</h3>
              <p>{anunt.descriere}</p>
              <p className="font-bold">{anunt.pret} RON</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
