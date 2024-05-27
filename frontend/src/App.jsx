import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/protectedRoutes";
import Home from "./pages/home";
import Login from "./pages/login";
import NotFound from "./pages/notFound";
import Register from "./pages/register";

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function RegisterAndLogout() {
  localStorage.clear(); // Wipe potential Tokens
  return <Register />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/login/" element={<Login />} />
        <Route path="/logout/" element={<Logout />} />
        <Route path="/register/" element={<RegisterAndLogout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
