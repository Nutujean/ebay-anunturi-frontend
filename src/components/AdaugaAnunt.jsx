
import React, { useState } from 'react';

function AdaugaAnunt() {
  const [titlu, setTitlu] = useState('');
  const [descriere, setDescriere] = useState('');
  const [pret, setPret] = useState('');
  const [imagine, setImagine] = useState(null);
  const [mesaj, setMesaj] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      setMesaj('Trebuie să te autentifici!');
      return;
    }

    let imagineUrl = '';
    if (imagine) {
      const formData = new FormData();
      formData.append('imagine', imagine);
      const uploadRes = await fetch('https://ebay-anunturi-backend-final-s2sf.onrender.com/api/upload', {
        method: 'POST',
        body: formData
      });
      const uploadData = await uploadRes.json();
      imagineUrl = uploadData.imagineUrl;
    }

    const anunt = { titlu, descriere, pret, imagineUrl };
    const res = await fetch('https://ebay-anunturi-backend-final-s2sf.onrender.com/api/anunturi', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(anunt)
    });

    const data = await res.json();
    if (res.ok) {
      setMesaj('Anunț adăugat cu succes!');
    } else {
      setMesaj(data.mesaj || 'Eroare la salvare anunț');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={titlu} onChange={e => setTitlu(e.target.value)} placeholder="Titlu" />
      <textarea value={descriere} onChange={e => setDescriere(e.target.value)} placeholder="Descriere" />
      <input type="number" value={pret} onChange={e => setPret(e.target.value)} placeholder="Preț" />
      <input type="file" onChange={e => setImagine(e.target.files[0])} />
      <button type="submit">Adaugă anunț</button>
      <p>{mesaj}</p>
    </form>
  );
}

export default AdaugaAnunt;
