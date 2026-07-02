import "./styles/global.scss";
export default App;
import { Routes, Route } from "react-router-dom";

import Register from "./pages/register/Register";
import LandingPage from "./pages/landingpage/Landingpage";
import Login from "./pages/login/Login";
// import { ProtectedRoute } from "./components/ProtectedRoute";
import { BookingPage } from "./pages/booking/BookingPage";
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
import MainLayout from "./layout/MainLayout";
import { useLocation } from "react-router-dom";
import LessonOverviewPage from "./pages/lessonOverview/LessonOverviewPage";

function App() {
  const location = useLocation();
  const isInternalPage = !["/", "/login", "/register"].includes(
    location.pathname,
  );

  return (
    <>
      <Navigation />
      <main>
        <Routes>
          {/* Ingen layout – ren sida */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Alla sidor med padding wrappade i MainLayout */}
          <Route element={<MainLayout />}>
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/lesson/:lessonId" element={<LessonOverviewPage />} />
            <Route path="/schools/:schoolId" element={<SchoolDetailPage />} />
            <Route path="/rentals/:rentalId" element={<RentalDetailPage />} />

            <Route
              path="/booking/:lessonId"
              element={
                <ProtectedRoute>
                  <BookingPage />
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
          </Route>
        </Routes>
      </main>
      {isInternalPage && <Footer />}
    </>
  );
}
