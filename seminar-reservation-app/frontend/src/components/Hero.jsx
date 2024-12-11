import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-xl">
          <h1 className="text-5xl font-bold">Zemina</h1>
          <h1>Your Gateway to Effortless Learning</h1>
          <p className="py-6">
            Experience simplicity on our community-based platform. Register,
            book your seminar, and make your payment — all in just a few clicks.
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
