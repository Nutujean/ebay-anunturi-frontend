import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function DetaliiAnunt() {
  const { id } = useParams();
  const [anunt, setAnunt] = useState(null);
  const [eroare, setEroare] = useState("");

  useEffect(() => {
    const fetchAnunt = async () => {
      try {
        const response = await fetch(`https://ebay-anunturi-backend-1.onrender.com/api/anunturi/${id}`);
        if (!response.ok) throw new Error("Eroare la încărcarea detaliilor.");
        const data = await response.json();
        setAnunt(data);
      } catch (err) {
        setEroare(err.message);
      }
    };

    fetchAnunt();
  }, [id]);

  if (eroare) return <p style={{ color: "red" }}>{eroare}</p>;
  if (!anunt) return <p>Se încarcă...</p>;

  return (
    <div className="detalii-anunt">
      <h2>{anunt.titlu}</h2>
      <p>{anunt.descriere}</p>
      <p>Preț: {anunt.pret} lei</p>
      <p>Categorie: {anunt.categorie}</p>
      {anunt.imagineURL && (
        <img src={anunt.imagineURL} alt="Anunț" width="400" />
      )}
    </div>
  );
}

export default DetaliiAnunt;
