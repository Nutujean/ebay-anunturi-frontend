import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AnunturileMele() {
  const [anunturi, setAnunturi] = useState([]);
  const [eroare, setEroare] = useState("");
  const navigate = useNavigate();

  const getToken = () => localStorage.getItem("token");

  const incarcaAnunturi = async () => {
    try {
      const token = getToken();
      const response = await fetch("https://ebay-anunturi-backend-1.onrender.com/api/anunturile-mele", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Eroare la încărcarea anunțurilor.");

      const data = await response.json();
      setAnunturi(data);
    } catch (err) {
      setEroare(err.message);
    }
  };

  const stergeAnunt = async (id) => {
    try {
      const token = getToken();
      const response = await fetch(`https://ebay-anunturi-backend-1.onrender.com/api/anunturi/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Eroare la ștergerea anunțului.");

      setAnunturi((prev) => prev.filter((anunt) => anunt._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    incarcaAnunturi();
  }, []);

  return (
    <div className="anunturile-mele">
      <h2>Anunțurile Mele</h2>
      {eroare && <p style={{ color: "red" }}>{eroare}</p>}
      {anunturi.length === 0 && <p>Nu ai anunțuri publicate.</p>}
      {anunturi.map((anunt) => (
        <div key={anunt._id} className="anunt">
          <h3>{anunt.titlu}</h3>
          <p>{anunt.descriere}</p>
          <p>Preț: {anunt.pret} lei</p>
          <p>Categorie: {anunt.categorie}</p>
          {anunt.imagineURL && (
            <img src={anunt.imagineURL} alt="Anunț" width="200" />
          )}
          <div>
            <button onClick={() => navigate(`/editeaza-anunt/${anunt._id}`)}>
              Editează
            </button>
            <button onClick={() => stergeAnunt(anunt._id)}>Șterge</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AnunturileMele;
