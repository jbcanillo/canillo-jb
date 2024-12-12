import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { useToast } from "../contexts/ToastContext";
import UserForm from "../forms/UserForm";

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

  const fetchUsers = () => {
    Axios.get("http://localhost:5000/api/users", { withCredentials: true })
      .then((response) => {
        setUsers(response.data); // Update state with fetched users
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        navigate("/");
      });
  };

  // Fetch users from the API when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

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
          showToastMessage(
            "User created successfully! A password has been sent to the user.",
            "success"
          );
          fetchUsers();
          // Send the password to the user's email through the backend
          Axios.post("http://localhost:5000/api/users/sendPassword", {
            email: userData.email,
            password: password,
          })
            .then(() => {
              showToastMessage(
                "Password sent to the user via email.",
                "success"
              );
            })
            .catch((error) => {
              console.error("Error sending email:", error);
              showToastMessage(error.response.data.error, "warning");
            });
        }
      })
      .catch((error) => {
        console.error("Error creating user:", error);
        showToastMessage(error.response.data.error, "error");
      });
  };

  // Edit user
  const handleEdit = (userData) => {
    if (!editUser || !editUser._id) {
      console.error("No user selected for editing");
      showToastMessage("Error: User not selected for editing!", "error");
      return;
    }

    Axios.put(`http://localhost:5000/api/users/${editUser._id}`, userData, {
      withCredentials: true,
    })
      .then((response) => {
        if (response.status === 200) {
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user._id === editUser._id ? response.data : user
            )
          );
          showToastMessage("User updated successfully!", "success");
          fetchUsers();
        }
      })
      .catch((error) => {
        console.error("Error updating user:", error);
        showToastMessage(error.response.data.error, "error");
      });
  };

  // Delete user
  const handleDelete = (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this user?");
    if (!isConfirmed) return; // If user cancels, do nothing

    Axios.delete(`http://localhost:5000/api/users/${id}`, {
      withCredentials: true,
    })
      .then(() => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        showToastMessage("User deleted successfully!", "success");
        fetchUsers();
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        showToastMessage(error.response.data.error, "warning");
      });
  };

  return (
    <section>
      <h1>User Management</h1>
      <label
        htmlFor="user-drawer"
        className="btn btn-primary btn-xs justify-end"
        onClick={() => setEditUser(null)}
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
                  <th>User ID</th>
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
                    <td>{user._id}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <span className="row flex gap-2">
                        <button
                          className="btn btn-warning btn-xs"
                          onClick={() => {
                            console.log("Setting edit user:", user); // Debugging
                            setEditUser(user); // Set the user to be edited
                            document.getElementById(
                              "user-drawer"
                            ).checked = true; // Open the drawer
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-error btn-xs"
                          onClick={() => handleDelete(user._id)}
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
              user={editUser} // This should contain the selected user for editing
              onSave={editUser ? handleEdit : handleCreate}
              onCancel={() => {
                console.log("Cancel clicked, closing drawer"); // Debugging
                document.getElementById("user-drawer").checked = false; // Close drawer on cancel
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserManagement;
