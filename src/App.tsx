import { Suspense } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./components/home";
import ServiciosPage from "./components/ServiciosPage";

function ServiciosWrapper() {
  const navigate = useNavigate();
  return (
    <ServiciosPage 
      onStartForm={() => navigate('/?start=form')} 
      calendarUrl="#agendar"
    />
  );
}

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/servicios" element={<ServiciosWrapper />} />
        </Routes>
      </>
    </Suspense>
  );
}

export default App;
