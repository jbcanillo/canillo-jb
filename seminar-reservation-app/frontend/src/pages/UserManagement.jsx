import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { useToast } from "../contexts/ToastContext";
import UserForm from "../forms/userForm";

const generateRandomPassword = (length = 12) => {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=<>?";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
};

const UserManagement = () => {
  const navigate = useNavigate();
  const { showToastMessage } = useToast();
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);

  // Fetch users from the API when the component mounts
  useEffect(() => {
    Axios.get("http://localhost:5000/api/users", { withCredentials: true })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        navigate("/"); // Redirect to login or home
      });
  }, [navigate]);

  // Create new user
  const handleCreate = (userData) => {
    const password = generateRandomPassword(); // Generate a random password
    const userDataWithPassword = {
      ...userData,
      password: password, // Attach the generated password
    };
  
    // Send user data with password to the backend
    Axios.post("http://localhost:5000/api/users", userDataWithPassword, {
      withCredentials: true,
    })
      .then((response) => {
        if (response.status === 201) {
          setUsers((prevUsers) => [...prevUsers, response.data]);
          showToastMessage("User created successfully! A password has been sent to the user.", "success");
  
          // Send the password to the user's email through the backend
          Axios.post("http://localhost:5000/api/users/sendPassword", {
            email: userData.email,
            password: password,
          })
            .then(() => {
              showToastMessage("Password sent to the user via email.", "success");
            })
            .catch((error) => {
              console.error("Error sending email:", error);
              showToastMessage("Error sending password via email.", "warning");
            });
        }
      })
      .catch((error) => {
        console.error("Error creating user:", error);
        showToastMessage("Error creating user!", "warning");
      });
  };

  // Edit user
  const handleEdit = (userData) => {
    Axios.put(`http://localhost:5000/api/users/${editUser.id}`, userData, {
      withCredentials: true,
    })
      .then((response) => {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === editUser.id ? response.data : user
          )
        );
        showToastMessage("User updated successfully!", "success");
      })
      .catch((error) => {
        console.error("Error updating user:", error);
        showToastMessage("Error updating user!", "error");
      });
  };

  // Delete user
  const handleDelete = (id) => {
    Axios.delete(`http://localhost:5000/api/users/${id}`, {
      withCredentials: true,
    })
      .then(() => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        showToastMessage("User deleted successfully!", "success");
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        showToastMessage("Error deleting user!", "warning");
      });
  };

  return (
    <section>
      <h1>User Management</h1>
      <label
        htmlFor="user-drawer"
        className="btn btn-primary btn-xs justify-end"
      >
        Add
      </label>
      {/* Right-side drawer*/}
      <div className="drawer drawer-end">
        {/* The drawer checkbox input to toggle visibility */}
        <input id="user-drawer" type="checkbox" className="drawer-toggle" />
        {/* Page content */}
        <div className="drawer-content card card-bordered">
          <div className="overflow-x-auto">
            <table className="table table-zebra table-auto">
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
                          onClick={() => {
                            setEditUser(user);
                            document.getElementById(
                              "user-drawer"
                            ).checked = true;
                          }}
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
        </div>
        {/* Drawer side content */}
        <div className="drawer-side">
          <label
            htmlFor="user-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="bg-base-100 h-full w-1/4">
            <UserForm
              user={editUser}
              onSave={editUser ? handleEdit : handleCreate}
              onCancel={() => {
                // Close drawer on cancel
                document.getElementById("user-drawer").checked = false;
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserManagement;
