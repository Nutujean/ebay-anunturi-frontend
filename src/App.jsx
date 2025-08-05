import Anunturi from "./Anunturi";

import AdaugaAnunt from "./AdaugaAnunt";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div className="text-center p-10">
        <h1 className="text-3xl font-bold mb-4">Bine ai venit pe Ebay Anunțuri!</h1>
        <p className="text-lg mb-6">
          Platforma ta pentru vânzări și cumpărături rapide în România.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/anunturi"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
          >
            Vezi Anunțuri
          </Link>

          <Link
            to="/adauga"
            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition"
          >
            Adaugă Anunț
          </Link>

          <Link
            to="/login"
            className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition"
          >
            Autentificare
          </Link>
        </div>

        <Routes>
          <Route path="/adauga" element={<AdaugaAnunt />} />
          <Route path="/adauga" element={<div>Pagina Adaugă Anunț</div>} />
          <Route path="/login" element={<div>Pagina Autentificare</div>} />
        </Routes>
      </div>
    </Router>
  );
}
