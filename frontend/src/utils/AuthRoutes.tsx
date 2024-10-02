import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import TransitionComponent from "../components/TransitionComponent";

const authRoutes = [
  {
    path: "/login",
    element: (
      <TransitionComponent>
        <Login />
      </TransitionComponent>
    ),
  },
  {
    path: "/signup",
    element: (
      <TransitionComponent>
        <SignUp />
      </TransitionComponent>
    ),
  },
];

export default authRoutes;
