import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { formatDate, formatTime, getRandomGradient } from "../hooks/hooks";
import { useToast } from "../contexts/ToastContext";

const Seminars = () => {
  const [date, setDate] = useState("");
  const [timeFrom, setTimeFrom] = useState("");
  const [timeTo, setTimeTo] = useState("");
  const [speaker, setSpeaker] = useState("");
  const [seminars, setSeminars] = useState([]); // Holds all seminars
  const [filteredSeminars, setFilteredSeminars] = useState([]); // Holds filtered seminars
  const { showToastMessage } = useToast();

  // Fetch all seminars initially
  useEffect(() => {
    Axios.get("http://localhost:5000/api/seminars")
      .then((response) => {
        setSeminars(response.data);
        setFilteredSeminars(response.data); // Show all initially
      })
      .catch((error) => {
        console.error("Error fetching seminars:", error);
        showToastMessage(error.response?.data?.error || "Error", "error");
      });
  }, []);

  
  console.log(seminars)

  // Handle search functionality
  const handleSearch = () => {
    let filtered = seminars;

    if (date) {
      filtered = filtered.filter((seminar) => seminar.date === date);
    }

    if (timeFrom) {
      filtered = filtered.filter(
        (seminar) => formatTime(seminar.timeFrame.from) >= timeFrom
      );
    }

    if (timeTo) {
      filtered = filtered.filter(
        (seminar) => formatTime(seminar.timeFrame.to) <= timeTo
      );
    }

    if (speaker) {
      filtered = filtered.filter((seminar) =>
        seminar.speaker.name.toLowerCase().includes(speaker.toLowerCase())
      );
    }

    setFilteredSeminars(filtered);
    if (filtered.length === 0) {
      showToastMessage(
        "No seminars found for the given search criteria",
        "info"
      );
    }
  };

  return (
    <section className="m-4 px-4">
      <div className="card card-compact bg-base-300 skeleton border border-gray-800 mb-5 rounded-none shadow-2xl ">
        <div className="card-body">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="w-10">Date:</label>
              <input
                className="input input-bordered w-40"
                type="date"
                name="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="w-20">Time From:</label>
              <input
                className="input input-bordered w-40"
                type="time"
                name="timeFrom"
                value={timeFrom}
                onChange={(e) => setTimeFrom(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="w-20">Time To:</label>
              <input
                className="input input-bordered w-40"
                type="time"
                name="timeTo"
                value={timeTo}
                onChange={(e) => setTimeTo(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="w-20">Speaker:</label>
              <input
                className="input input-bordered w-96"
                type="text"
                name="speaker"
                value={speaker}
                onChange={(e) => setSpeaker(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <button className="btn btn-primary w-44" onClick={handleSearch}>
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cards Section - Centered */}
      <div className="flex flex-wrap justify-center items-center gap-4">
        {filteredSeminars.map((seminar) => (
          <div
            key={seminar._id}
            className="w-fit md:w-60 lg:w-80 justify-center items-center"
          >
            <div className="card card-compact bg-base-300 w-full border border-gray-800 shadow-xl">
              <figure
                className="relative w-full h-48"
                style={{
                  background: getRandomGradient(),
                  borderRadius: "0.375rem",
                }}
              >
                <img
                  src={
                    seminar.speaker.image ||
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                  alt={seminar.speaker.name}
                  className="absolute top-24 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border-4 border-white"
                  onError={(e) =>
                    (e.target.src =
                      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp")
                  }
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{seminar.title}</h2>
                <h3>Presented by {seminar.speaker.name}</h3>
                <h3>
                  {formatDate(seminar.date)} at{" "}
                  {formatTime(seminar.timeFrame.from)} -{" "}
                  {formatTime(seminar.timeFrame.to)}
                </h3>
                <div className="card-actions justify-center">
                  <Link
                    to={`/seminar/${seminar._id}`}
                    className="btn btn-sm btn-dark"
                  >
                    Book now!
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Seminars;
