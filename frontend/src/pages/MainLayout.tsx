import { LayoutProps } from "../utils/types";
import Sidebar from "../components/shared/Sidebar";

const MainLayout = ({ children }: LayoutProps) => {
  return (
    <section className="flex flex-col md:flex-row h-screen">
      <Sidebar />
      <div className="flex-grow md:pl-[4rem]">{children}</div>
    </section>
  );
};

export default MainLayout;
