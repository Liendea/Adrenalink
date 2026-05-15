import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

function MainLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTo(0, 0);
    }, 0);
  }, [pathname]);

  return (
    <div className="main-layout">
      <Outlet />
    </div>
  );
}

export default MainLayout;
