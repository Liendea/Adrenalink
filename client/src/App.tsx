import "./styles/global.scss";
export default App;
import { Routes, Route } from "react-router-dom";

import Register from "./pages/register/Register";
import LandingPage from "./pages/landingpage/Landingpage";
import Login from "./pages/login/Login";
import { ProtectedRoute } from "./components/ProtectedRoute";
import BookingPage from "./pages/booking/BookingPage";

function App() {
  return (
    <>
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/booking"
            element={
              <ProtectedRoute>
                <BookingPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </>
  );
}
