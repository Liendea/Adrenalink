import "./styles/global.scss";
export default App;
import { Routes, Route } from "react-router-dom";

import Register from "./pages/register/Register";
import LandingPage from "./pages/landingpage/Landingpage";
import Login from "./pages/login/Login";
// import { ProtectedRoute } from "./components/ProtectedRoute";
import BookingPage from "./pages/booking/BookingPage";
import ExplorePage from "./pages/explore/ExplorePage";

import SchoolDetailPage from "@/pages/school/SchoolDetailPage";
import RentalDetailPage from "./pages/rental/RentalDetailPage";

import Navigation from "./components/navigation/Navigation";
import { ProtectedRoute } from "./components/ProtectedRoute";
import UserProfile from "./pages/userProfile/UserProfile";
import EditProfile from "./pages/userProfile/editProfile/EditProfile";
import MyFavorites from "./pages/userProfile/myFavorites/MyFavorites";
import MyBookings from "./pages/userProfile/myBookings/MyBookings";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <>
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Sök/Utforska-sidan där allt listas från början */}
          <Route path="/explore" element={<ExplorePage />} />

          {/* 1. Direkta bokningssidan för en specifik lektion (Lektionskortet) */}
          <Route path="/booking/:lessonId" element={<BookingPage />} />

          {/* 2. Infosidan för en specifik skola */}
          <Route path="/schools/:schoolId" element={<SchoolDetailPage />} />

          {/* 3. Infosidan för ett uthyrningsställe */}
          <Route path="/rentals/:rentalId" element={<RentalDetailPage />} />

          {/* 4. Profil sida */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/edit"
            element={
              <ProtectedRoute>
                <EditProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/favorites"
            element={
              <ProtectedRoute>
                <MyFavorites />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/bookings"
            element={
              <ProtectedRoute>
                <MyBookings />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
