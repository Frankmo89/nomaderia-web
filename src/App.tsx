import { Suspense, useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./components/home";
import ServiciosPage from "./components/ServiciosPage";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";

function ServiciosWrapper() {
  const navigate = useNavigate();
  return (
    <ServiciosPage 
      onStartForm={() => navigate('/?start=form')} 
      calendarUrl="#agendar"
    />
  );
}

function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('nomaderia_admin_token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('nomaderia_admin_token');
    setIsAuthenticated(false);
  };

  return isAuthenticated ? (
    <AdminDashboard onLogout={handleLogout} />
  ) : (
    <AdminLogin onLogin={() => setIsAuthenticated(true)} />
  );
}

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/servicios" element={<ServiciosWrapper />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </>
    </Suspense>
  );
}

export default App;
