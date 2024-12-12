import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="hero min-h-screen w-full">
      <div className="hero-content text-center">
        <div className="max-w-xl">
          <h1 className="text-5xl font-bold">Zemina</h1>
          <h1>Your Gateway for Learning</h1>
          <p className="py-6">
            Experience effortless booking on our seminar reservation platform. Register,
            find your seminar, and make payment online — all in just a few clicks.
            Fast, secure, and hassle-free, so you can focus on gaining knowledge
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
