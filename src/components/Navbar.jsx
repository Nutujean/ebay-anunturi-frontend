// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav style={{ padding: "10px", backgroundColor: "#eee", marginBottom: "20px" }}>
      <Link to="/" style={{ marginRight: "15px" }}>Acasă</Link>
      {token ? (
        <>
          <Link to="/adauga-anunt" style={{ marginRight: "15px" }}>Adaugă Anunț</Link>
          <Link to="/anunturile-mele" style={{ marginRight: "15px" }}>Anunțurile Mele</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login" style={{ marginRight: "15px" }}>Login</Link>
        </>
      )}
    </nav>
  );
}
