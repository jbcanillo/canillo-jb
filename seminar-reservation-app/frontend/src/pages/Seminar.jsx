import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { formatDate, formatTime, getRandomGradient } from "../hooks/hooks";
import Axios from "axios";
import { FaUser, FaCalendar, FaClock, FaMapMarkerAlt } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";

const Seminar = () => {
  const { isAuthenticated, user } = useAuth();
  const { id } = useParams();
  const [seminar, setSeminar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchSeminar = async () => {
    try {
      setLoading(true);
      const response = await Axios.get(
        `http://localhost:5000/api/seminars/${id}`,
        {
          withCredentials: true,
        }
      );
      setSeminar(response.data);
    } catch (error) {
      setError("Error fetching seminar data");
      console.error("Error fetching seminar:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch seminar data when the component mounts
  useEffect(() => {
    fetchSeminar(); // Call async function
  }, [id]); // Re-run when the `id` changes

  // Show loading message until data is fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  // Show error message if there was an error during fetching
  if (error) {
    return <div>{error}</div>;
  }

  // If no seminar data available, show a fallback message
  if (!seminar) {
    return <div>No seminar found.</div>;
  }

  return (
    <section className="m-10 p-10">
      <div className="skeleton mockup-browser bg-base-300 shadow-xl">
        <div className=" mockup-browser-toolbar">
          <div className="input justify-center text-center">
            <Link to={seminar.speaker?.linkedin || "#"}>
              {seminar.speaker?.linkedin || "LinkedIn"}
            </Link>
          </div>
        </div>
        <div
          className="bg-base-200 px-4 py-5"
          style={{
            background: getRandomGradient(),
            borderRadius: "0.375rem",
          }}
        >
          <div className="flex w-full flex-col gap-4 p-6 ">
            <div className="flex items-center gap-4">
              <div className="flex flex-col gap-4">
                <img
                  src={
                    seminar.speaker.image ||
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                  alt={seminar.speaker.name}
                  className="w-48 h-48 rounded-full border-4 border-white"
                  onError={
                    (e) =>
                      (e.target.src =
                        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp") // Fallback image
                  }
                />
              </div>
              <div className="flex flex-col gap-4 w-3/6">
                <h1
                  className="text-4xl mb-2"
                  style={{
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)", // Add a text shadow for better contrast
                  }}
                >
                  {seminar.title || "Seminar Title"}
                </h1>
                <p
                  className="italic"
                  style={{
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)", // Add a text shadow for better contrast
                  }}
                >
                  {seminar.description}
                </p>
              </div>
              <div className="flex flex-col gap-4 bg-base-300 p-4 rounded-lg">
                <div className="flex items-center gap-2">
                  <FaUser />
                  <h3>Speaker: {seminar.speaker?.name}</h3>
                </div>
                <div className="flex items-center gap-2 w-max">
                  <FaCalendar />
                  <h3>Date: {formatDate(seminar.date)}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <FaClock />
                  <h3>
                    Time: {formatTime(seminar.timeFrame?.from)} -{" "}
                    {formatTime(seminar.timeFrame?.to)}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt />
                  <h3>Venue: {seminar.venue}</h3>
                </div>
                <div className="items-center justify-center w-full">
                  {isAuthenticated && user?.role === "user" ? (
                    <Link
                      to={`/booking/${seminar._id}`}
                      className="btn btn-xl btn-neutral btn-wide"
                    >
                      Book a reservation
                    </Link>
                  ) : (
                    <p className="justify-center text-center text-gray-500">Please, login first!</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Seminar;
