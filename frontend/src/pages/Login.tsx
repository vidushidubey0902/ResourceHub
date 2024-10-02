import LoginForm from "../components/Login/LoginForm";
import PublicNavbar from "../components/shared/PublicNavbar";

const Login = () => {
  return (
    <section className="w-screen h-screen overflow-hidden flex flex-col">
      <div className="h-fit shadow-xl">
        <PublicNavbar />
      </div>

      <div
        className="w-full flex-grow flex items-center no-repeat bg-cover"
        style={{
          backgroundImage:
            "linear-gradient(var(--loginbackdrop1), var(--loginbackdrop2)), url('/bg.jpg')",
        }}
      >
        <LoginForm />
      </div>
    </section>
  );
};

export default Login;
