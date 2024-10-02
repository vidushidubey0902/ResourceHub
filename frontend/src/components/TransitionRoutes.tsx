import { useLocation, Outlet } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

const TransitionRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence
      mode="wait"
      initial={false}
      onExitComplete={() => window.scrollTo(0, 0)}
    >
      <Outlet key={location.pathname} />
    </AnimatePresence>
  );
};

export default TransitionRoutes;
