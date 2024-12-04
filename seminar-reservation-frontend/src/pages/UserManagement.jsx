import React, { useState, useEffect } from "react";
import Axios from "axios";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "user",
  });
  const [editUser, setEditUser] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Fetch users from the API when the component mounts
  useEffect(() => {
    Axios.get("http://localhost:5000/api/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  // Create new user
  const handleCreate = () => {
    Axios.post("http://localhost:5000/api/users", newUser)
      .then((response) => {
        setUsers([...users, response.data]);
        setNewUser({ firstName: "", lastName: "", email: "", role: "user" });
        setIsFormVisible(false);
      })
      .catch((error) => {
        console.error("Error creating user:", error);
      });
  };

  // Edit user
  const handleEdit = (user) => {
    setEditUser(user);
    setIsFormVisible(true);
  };

  const handleUpdate = () => {
    Axios.put(`http://localhost:5000/api/users/${editUser.id}`, editUser)
      .then((response) => {
        const updatedUsers = users.map((user) =>
          user.id === editUser.id ? response.data : user
        );
        setUsers(updatedUsers);
        setEditUser(null);
        setIsFormVisible(false);
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

  // Delete user
  const handleDelete = (id) => {
    Axios.delete(`http://localhost:5000/api/users/${id}`)
      .then(() => {
        setUsers(users.filter((user) => user.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  return (
    <section>
      <h1>User Management </h1>
      <button
        onClick={() => {
          setIsFormVisible(true);
          setEditUser(null);
        }}
        className="btn btn-primary btn-xs justify-end"
      >
        Add
      </button>

      {/* Create New User Form*/}
      {isFormVisible && (
        <div className="card bg-base-100 w-auto shadow-xl card-compact">
          <div className="form-container">
            <h2 className="card-title pt-5 pl-5">
              {editUser ? "Edit User" : "Create New User"}
            </h2>
            <div className="card-body">
              <label>Firstname*</label>
              <input
                className="input input-bordered w-full"
                type="text"
                placeholder="First Name"
                value={editUser ? editUser.firstName : newUser.firstName}
                onChange={(e) =>
                  editUser
                    ? setEditUser({ ...editUser, firstName: e.target.value })
                    : setNewUser({ ...newUser, firstName: e.target.value })
                }
                required
              />
              <label>Lastname*</label>
              <input
                className="input input-bordered w-full"
                type="text"
                placeholder="Last Name"
                value={editUser ? editUser.lastName : newUser.lastName}
                onChange={(e) =>
                  editUser
                    ? setEditUser({ ...editUser, lastName: e.target.value })
                    : setNewUser({ ...newUser, lastName: e.target.value })
                }
                required
              />
              <label>Email*</label>
              <input
                className="input input-bordered w-full"
                type="email"
                placeholder="Email"
                value={editUser ? editUser.email : newUser.email}
                onChange={(e) =>
                  editUser
                    ? setEditUser({ ...editUser, email: e.target.value })
                    : setNewUser({ ...newUser, email: e.target.value })
                }
                required
              />

              <label>Role*</label>
              <select
                className="select select-bordered w-full"
                value={editUser ? editUser.role : newUser.role}
                onChange={(e) =>
                  editUser
                    ? setEditUser({ ...editUser, role: e.target.value })
                    : setNewUser({ ...newUser, role: e.target.value })
                }
                required
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-success btn-sm"
                  onClick={editUser ? handleUpdate : handleCreate}
                >
                  {editUser ? "Update" : "Create"}
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
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id} className="hover">
                <td>{index + 1}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <span className="row flex gap-2">
                    <button
                      className="btn btn-warning btn-xs"
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-error btn-xs"
                      onClick={() => handleDelete(user.id)}
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

export default UserManagement;
