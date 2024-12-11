import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

const Layout = ({ children }) => {
  return (
    <>
      <NavBar />
      <div className="container mx-auto  flex-1">{children}</div>
      <div className="fixed w-full bottom-0">
      <Footer /></div>
    </>
  );
};

export default Layout;
