import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";

import Home from "./pages/Home";
import AllAnimals from "./pages/AllAnimals";
import AnimalDetails from "./pages/AnimalDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyProfile from "./pages/MyProfile";
import UpdateProfile from "./pages/UpdateProfile";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              fontFamily: "'Tajawal', sans-serif",
              fontSize: "15px",
              borderRadius: "12px",
              padding: "14px 20px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
            },
            success: { style: { background: "#e6f4ec", color: "#0f4022", border: "1px solid #b5ddc5" } },
            error: { style: { background: "#fce8e8", color: "#7b1c1c", border: "1px solid #f5c6c6" } },
          }}
        />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/animals" element={<AllAnimals />} />
          <Route path="/animals/:id" element={<AnimalDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<PrivateRoute><MyProfile /></PrivateRoute>} />
          <Route path="/update-profile" element={<PrivateRoute><UpdateProfile /></PrivateRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}
