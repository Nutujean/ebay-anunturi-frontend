// src/pages/AnunturileMele.jsx
import { useEffect, useState } from "react";

export default function AnunturileMele() {
  const [anunturi, setAnunturi] = useState([]);
  const token = localStorage.getItem("token");

const response = await fetch(`${"https://ebay-anunturi-backend-1.onrender.com"
}/api/anunturile-mele`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

  let userId = null;
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      userId = payload.userId;
    } catch (e) {
      console.error("Eroare la decodarea tokenului:", e);
    }
  }

  const fetchAnunturi = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/anunturi");
      const data = await res.json();

      const aleMele = data.filter((a) => {
        return a.user?._id === userId || a.user === userId;
      });

      setAnunturi(aleMele);
    } catch (err) {
      console.error("Eroare la încărcarea anunțurilor:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Ești sigur că vrei să ștergi acest anunț?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/anunturi/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        alert("Anunț șters");
        fetchAnunturi();
      } else {
        alert("Eroare la ștergere");
      }
    } catch (err) {
      console.error("Eroare la ștergere:", err);
    }
  };

  useEffect(() => {
    fetchAnunturi();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Anunțurile Mele</h2>
      {anunturi.length === 0 && <p>Nu ai anunțuri.</p>}

      <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
        {anunturi.map((anunt) => (
          <div key={anunt._id} style={{ border: "1px solid #ccc", padding: "10px", width: "250px" }}>
            <h3>{anunt.titlu}</h3>
            <p>{anunt.descriere}</p>
            <p><strong>Preț:</strong> {anunt.pret} lei</p>
            {anunt.imagine && (
              <img
                src={`http://localhost:5000${anunt.imagine}`}
                alt="imagine"
                style={{ width: "100%", marginTop: "10px" }}
              />
            )}
            <div style={{ marginTop: "10px" }}>
              <a href={`/edit-anunt/${anunt._id}`}>
                <button style={{ marginRight: "10px" }}>Editează</button>
              </a>
              <button onClick={() => handleDelete(anunt._id)}>Șterge</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
