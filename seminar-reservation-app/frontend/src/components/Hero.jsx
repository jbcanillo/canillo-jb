import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div
      className="hero min-h-screen min-w-fit"
      style={{
        backgroundImage:
          "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center">
        <div className="max-w-xl">
          <h1 className="text-5xl font-bold">Zzzemina</h1>
          <h1>Your Gateway for Learning</h1>
          <p className="py-6 text-lg">
            Experience effortless seminar reservation. Register, book your
            seminar, and make payment online — all in just a few clicks. <br/>Fast,
            secure, and hassle-free, so you can focus on gaining knowledge
            without the wait!
          </p>
          <Link to="/register" className="btn btn-primary">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
