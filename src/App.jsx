import Login from "./pagini/Login.jsx";
import AdaugaAnunt from "./pagini/AdaugaAnunt.jsx";
import AnunturileMele from "./pagini/AnunturileMele.jsx";
import EditeazaAnunt from "./pagini/EditeazaAnunt.jsx";
import Home from "./pagini/Home.jsx";
import DetaliiAnunt from "./pagini/DetaliiAnunt.jsx";


function App() {
  return (
    <Router>
      <div className="navbar">
        <Link to="/">Acasă</Link>
        <Link to="/login">Login</Link>
        <Link to="/adauga-anunt">Adaugă Anunț</Link>
        <Link to="/anunturile-mele">Anunțurile Mele</Link>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/adauga-anunt" element={<AdaugaAnunt />} />
        <Route path="/anunturile-mele" element={<AnunturileMele />} />
        <Route path="/editeaza-anunt/:id" element={<EditeazaAnunt />} />
        <Route path="/anunt/:id" element={<DetaliiAnunt />} />
      </Routes>
    </Router>
  );
}

export default App;
