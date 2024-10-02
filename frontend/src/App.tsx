import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import { RootState } from "./store";
import { LOADER_DURATION } from "./utils/constants";
import LoaderAnimation from "./components/LoaderAnimation";
import TransitionRoutes from "./components/TransitionRoutes";

import authRoutes from "./utils/AuthRoutes";
import privateRoutes from "./utils/PrivateRoutes";

import LandingPage from "./pages/LandingPage";
import NotFoundPage from "./pages/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },

  {
    element: <TransitionRoutes />,
    children: authRoutes,
  },
  ...privateRoutes,
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

const App = () => {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    document.body.className = theme === "LIGHT" ? "light-theme" : "dark-theme";

    const handleLoad = () => {
      setTimeout(() => setLoading(false), LOADER_DURATION);
    };

    window.addEventListener("load", handleLoad);

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, [theme]);

  const handleLoaderComplete = () => {
    setLoading(false);
  };

  return (
    <>
      {loading && <LoaderAnimation onComplete={handleLoaderComplete} />}
      {!loading && <RouterProvider router={router} />}
      <ToastContainer />
    </>
  );
};

export default App;
