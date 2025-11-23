import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { useState } from "react";
import MoodPopup from "./components/MoodPopup";
import MusicPlayer from "./components/MusicPlayer";
import ProductList from "./pages/Products/ProductList";
import AddProduct from "./pages/Products/AddProduct";
import EditProduct from "./pages/Products/EditProduct";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    const [videoId, setVideoId] = useState("");
  return (
    <>
      <MoodPopup onMusic={setVideoId} />

    <BrowserRouter>
      <Navbar />
      <div className="container mt-4">
        <Routes>

          {/* Public Routes */}
          <Route path="/" element={<Login />} />
           <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <ProductList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/products/add"
            element={
              <ProtectedRoute>
                <AddProduct />
              </ProtectedRoute>
            }
          />

          <Route
            path="/products/edit/:id"
            element={
              <ProtectedRoute>
                <EditProduct />
              </ProtectedRoute>
            }
          />

        </Routes>
      </div>
    </BrowserRouter>
          <MusicPlayer videoId={videoId} />
    </>

  );
}

export default App;
