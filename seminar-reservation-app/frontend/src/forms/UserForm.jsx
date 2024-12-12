import { useState, useEffect } from "react";

const UserForm = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "user",
  });

  // Pre-fill form if editing a user
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onSave(formData); // Pass the form data for updating
  };

  return (
    <div className="card card-compact">
      <div className="form-container">
        <h2 className="card-title pt-5 pl-5">
          {user ? "Edit User" : "Create New User"}
        </h2>
        <div className="card-body">
          <label>Firstname*</label>
          <input
            className="input input-bordered w-full"
            type="text"
            placeholder="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <label>Lastname*</label>
          <input
            className="input input-bordered w-full"
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <label>Email*</label>
          <input
            className="input input-bordered w-full"
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label>Role*</label>
          <select
            className="select select-bordered w-full"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <div className="card-actions justify-end">
            <button className="btn btn-success btn-sm" onClick={handleSubmit}>
              {user ? "Update" : "Create"}
            </button>
            <button className="btn btn-default btn-sm" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
