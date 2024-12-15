import { useEffect, useRef } from "react";
import { formatDate, formatTime } from "../hooks/hooks";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

// Function to generate a random color
const randomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Function to generate a random gradient
const getRandomGradient = () => {
  const color1 = randomColor();
  const color2 = randomColor();
  return `linear-gradient(to right, ${color1}, ${color2})`;
};

const Carousel = ({ seminars }) => {
  const carouselRef = useRef(null);
  const intervalRef = useRef(null);

  // Limit the seminars to a random selection of 10 (or fewer)
  const getRandomSeminars = (seminars, count = 10) => {
    const shuffled = [...seminars].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  };
  const randomSeminars = getRandomSeminars(seminars);

  useEffect(() => {
    const slideCarousel = () => {
      const carousel = carouselRef.current;
      const firstItem = carousel.querySelector(".carousel-item");
      const width = firstItem ? firstItem.offsetWidth : 0;

      if (carousel && firstItem) {
        const currentScroll = carousel.scrollLeft;

        // If we've reached the end, reset scroll position to 0 (infinite loop effect)
        if (currentScroll + width >= carousel.scrollWidth) {
          carousel.scrollTo({
            left: 0, // Reset to the first item
            behavior: "smooth", // Smooth scroll effect
          });
        } else {
          carousel.scrollTo({
            left: currentScroll + width,
            behavior: "smooth", // Smooth scroll effect
          });
        }
      }
    };

    // Set an interval to slide every 3 seconds (3000 ms)
    intervalRef.current = setInterval(slideCarousel, 3000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div
      className="carousel-wrapper relative overflow-hidden"
      style={{ width: "100%" }}
    >
      <div
        ref={carouselRef}
        className="carousel flex space-x-4 transition-transform"
        style={{
          display: "flex",
          overflowX: "auto",
          scrollBehavior: "smooth",
        }}
      >
        {/* Loop through random seminars */}
        {randomSeminars.map((seminar) => (
          <div
            key={seminar._id}
            className="carousel-item flex-none w-full md:w-96"
          >
            <div className="card card-compact bg-base-300 w-full shadow-xl">
              {/* Figure with random gradient background */}
              <figure
                className="relative w-full h-48"
                style={{
                  background: getRandomGradient(),
                  borderRadius: "0.375rem",
                }}
              >
                {/* Profile photo on top of the gradient */}
                <img
                  src={
                    seminar.speaker.image ||
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                  alt={seminar.speaker.name}
                  className="absolute top-24 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border-4 border-white"
                  onError={
                    (e) =>
                      (e.target.src =
                        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp") // Fallback image
                  }
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{seminar.title}</h2>
                <h3>Presented by {seminar.speaker.name}</h3>
                <h3>Date: {formatDate(seminar.date)}</h3>
                <h3>
                  Time: {formatTime(seminar.timeFrame.from)} -{" "}
                  {formatTime(seminar.timeFrame.to)} at {seminar.venue}
                </h3>
                <p>{seminar.description}</p>
                <div className="card-actions justify-end">
                  {/* Link to the seminar details page */}
                  <Link
                    to={`/seminar/${seminar._id}`} // Link to the seminar detail page
                    className="btn btn-sm btn-dark"
                  >
                    Check now!
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
