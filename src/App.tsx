import { Suspense, useState, useEffect, lazy } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import LoadingState from "./components/LoadingState";

// Lazy load components for better code splitting
const Home = lazy(() => import("./components/home"));
const ServiciosPage = lazy(() => import("./components/ServiciosPage"));
const AdminLogin = lazy(() => import("./components/AdminLogin"));
const AdminDashboard = lazy(() => import("./components/AdminDashboard"));
const BlogPost = lazy(() => import("./components/BlogPost"));

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
    <Suspense fallback={<LoadingState />}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/servicios" element={<ServiciosWrapper />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>
      </>
    </Suspense>
  );
}

export default App;
