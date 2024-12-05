import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { useToast } from "../providers/ToastContext";

const SeminarManagement = () => {
  const navigate = useNavigate();
  const { showToastMessage } = useToast();
  const [seminars, setSeminars] = useState([]);
  const [newSeminar, setNewSeminar] = useState({
    title: "",
    description: "",
    date: "",
    timeFrame: {"from":"","to":""},
    venue: "",
    speaker: {"name":"","image":"","linkedin":""},
    fee: 0,
    slotsAvailable: 0
  });
  const [editSeminar, setEditSeminar] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Fetch seminars from the API when the component mounts
  useEffect(() => {
    Axios.get("http://localhost:5000/api/seminars")
      .then((response) => {
        setSeminars(response.data);
      })
      .catch((error) => {
        console.error("Error fetching seminars:", error);
      });
  }, []);

  // Create new seminar
  const handleCreate = () => {
    Axios.post("http://localhost:5000/api/seminars", newSeminar)
      .then((response) => {
        setSeminars([...seminars, response.data]);
        setNewSeminar({ firstName: "", lastName: "", email: "", role: "seminar" });
        setIsFormVisible(false);
        showToastMessage(
          "New Seminar was added.",
          "success"
        );
        navigate("/manage_seminars");
      })
      .catch((error) => {
        console.error("Error creating seminar:", error);
      });
  };

  // Edit seminar
  const handleEdit = (seminar) => {
    setEditSeminar(seminar);
    setIsFormVisible(true);
  };

  const handleUpdate = () => {
    Axios.put(`http://localhost:5000/api/seminars/${editSeminar.id}`, editSeminar)
      .then((response) => {
        const updatedseminars = seminars.map((seminar) =>
          seminar.id === editSeminar.id ? response.data : seminar
        );
        setSeminars(updatedseminars);
        setEditSeminar(null);
        setIsFormVisible(false);
      })
      .catch((error) => {
        console.error("Error updating seminar:", error);
      });
  };

  // Delete seminar
  const handleDelete = (id) => {
    Axios.delete(`http://localhost:5000/api/seminars/${id}`)
      .then(() => {
        setSeminars(seminars.filter((seminar) => seminar.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting seminar:", error);
      });
  };


  return (
    <section>
      <h1>Seminar Management </h1>
      <button
        onClick={() => {
          setIsFormVisible(true);
          setEditSeminar(null);
        }}
        className="btn btn-primary btn-xs justify-end"
      >
        Add
      </button>

      {/* Create New Seminar Form */}
      {isFormVisible && (
        <div className="card bg-base-100 w-auto shadow-xl card-compact">
          <div className="form-container">
            <h2 className="card-title pt-5 pl-5">
              {editSeminar ? "Edit Seminar" : "Create New Seminar"}
            </h2>
            <div className="card-body">
              <label>Title*</label>
              <input
                className="input input-bordered w-full"
                type="text"
                placeholder="Title"
                value={editSeminar ? editSeminar.title : newSeminar.title}
                onChange={(e) =>
                  editSeminar
                    ? setEditSeminar({ ...editSeminar, title: e.target.value })
                    : setNewSeminar({ ...newSeminar, title: e.target.value })
                }
                required
              />
              <label>Description*</label>
              <input
                className="input input-bordered w-full"
                type="text"
                placeholder="Description"
                value={editSeminar ? editSeminar.description : newSeminar.description}
                onChange={(e) =>
                  editSeminar
                    ? setEditSeminar({ ...editSeminar, description: e.target.value })
                    : setNewSeminar({ ...newSeminar, description: e.target.value })
                }
                required
              />
              <label>Date*</label>
              <input
                className="input input-bordered w-full"
                type="date"
                placeholder="Date"
                value={editSeminar ? editSeminar.date : newSeminar.date}
                onChange={(e) =>
                  editSeminar
                    ? setEditSeminar({ ...editSeminar, date: e.target.value })
                    : setNewSeminar({ ...newSeminar, date: e.target.value })
                }
                required
              />
              <label>Time From*</label>
              <input
                className="input input-bordered w-full"
                type="time"
                placeholder="Time From"
                value={editSeminar ? editSeminar.timeFrame.from : newSeminar.timeFrame.from}
                onChange={(e) =>
                  editSeminar
                    ? setEditSeminar({ ...editSeminar, timeFrame: { ...editSeminar.timeFrame, from: e.target.value } })
                    : setNewSeminar({ ...newSeminar, timeFrame: { ...newSeminar.timeFrame, from: e.target.value } })
                }
                required
              />
              <label>Time To*</label>
              <input
                className="input input-bordered w-full"
                type="time"
                placeholder="Time To"
                value={editSeminar ? editSeminar.timeFrame.to : newSeminar.timeFrame.to}
                onChange={(e) =>
                  editSeminar
                    ? setEditSeminar({ ...editSeminar, timeFrame: { ...editSeminar.timeFrame, to: e.target.value } })
                    : setNewSeminar({ ...newSeminar, timeFrame: { ...newSeminar.timeFrame, to: e.target.value } })
                }
                required
              />
              <label>Venue*</label>
              <input
                className="input input-bordered w-full"
                type="text"
                placeholder="Venue"
                value={editSeminar ? editSeminar.venue : newSeminar.venue}
                onChange={(e) =>
                  editSeminar
                    ? setEditSeminar({ ...editSeminar, venue: e.target.value })
                    : setNewSeminar({ ...newSeminar, venue: e.target.value })
                }
                required
              />
              <label>Speaker*</label>
              <input
                className="input input-bordered w-full"
                type="text"
                placeholder="Speaker"
                value={editSeminar ? editSeminar.speaker.name : newSeminar.speaker.name}
                onChange={(e) =>
                  editSeminar
                    ? setEditSeminar({ ...editSeminar, speaker: { ...editSeminar.speaker, name: e.target.value } })
                    : setNewSeminar({ ...newSeminar, speaker: { ...newSeminar.speaker, name: e.target.value } })
                }
                required
              />
              <label>Image*</label>
              <input
                className="input input-bordered w-full"
                type="file"
                placeholder="Speaker Image"
                value={editSeminar ? editSeminar.speaker.image : newSeminar.speaker.image}
                onChange={(e) =>
                  editSeminar
                    ? setEditSeminar({ ...editSeminar, speaker: { ...editSeminar.speaker, image: e.target.value } })
                    : setNewSeminar({ ...newSeminar, speaker: { ...newSeminar.speaker, image: e.target.value } })
                }
                required
              />
              <label>LinkedIn URL*</label>
              <input
                className="input input-bordered w-full"
                type="text"
                placeholder="LinkedIn"
                value={editSeminar ? editSeminar.speaker.linkedin : newSeminar.speaker.linkedin}
                onChange={(e) =>
                  editSeminar
                    ? setEditSeminar({ ...editSeminar, speaker: { ...editSeminar.speaker, linkedin: e.target.value } })
                    : setNewSeminar({ ...newSeminar, speaker: { ...newSeminar.speaker, linkedin: e.target.value } })
                }
                required
              />
              <label>Fee*</label>
              <input
                className="input input-bordered w-full"
                type="number"
                placeholder="Fee"
                value={editSeminar ? editSeminar.fee : newSeminar.fee}
                onChange={(e) =>
                  editSeminar
                    ? setEditSeminar({ ...editSeminar, fee: e.target.value })
                    : setNewSeminar({ ...newSeminar, fee: e.target.value })
                }
                required
              />
              <label>Available Slots*</label>
              <input
                className="input input-bordered w-full"
                type="number"
                placeholder="Slots"
                value={editSeminar ? editSeminar.slotsAvailable : newSeminar.slotsAvailable}
                onChange={(e) =>
                  editSeminar
                    ? setEditSeminar({ ...editSeminar, slotsAvailable: e.target.value })
                    : setNewSeminar({ ...newSeminar, slotsAvailable: e.target.value })
                }
                required
              />
              <div className="card-actions justify-end">
                <button
                  className="btn btn-success btn-sm"
                  onClick={editSeminar ? handleUpdate : handleCreate}
                >
                  {editSeminar ? "Update" : "Create"}
                </button>
                <button
                  className="btn btn-default btn-sm"
                  onClick={() => setIsFormVisible(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="table table-zebra table-pin-rows">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Description</th>
              <th>Date</th>
              <th>Time From</th>
              <th>Time To</th>
              <th>Venue</th>
              <th>Speaker</th>
              <th>Image</th>
              <th>LinkedIn</th>
              <th>Fee</th>
              <th>Available Slots</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {seminars.map((seminar, index) => (
              <tr key={seminar.id} className="hover">
                <td>{index + 1}</td>
                <td>{seminar.title}</td>
                <td>{seminar.description}</td>
                <td>{seminar.date}</td>
                <td>{seminar.timeFrame.from}</td>
                <td>{seminar.timeFrame.to}</td>
                <td>{seminar.venue}</td>
                <td>{seminar.speaker.name}</td>
                <td>{seminar.speaker.image}</td>
                <td>{seminar.speaker.linkedin}</td>
                <td>{seminar.fee}</td>
                <td>{seminar.slotsAvailable}</td>
                <td>
                  <span className="row flex gap-2">
                    <button
                      className="btn btn-warning btn-xs"
                      onClick={() => handleEdit(seminar)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-error btn-xs"
                      onClick={() => handleDelete(seminar.id)}
                    >
                      Delete
                    </button>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default SeminarManagement;