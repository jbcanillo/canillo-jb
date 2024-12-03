import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppNavbar from "./components/AppNavBar";
import Home from "./pages/Home";
import UserManagement from "./pages/UserManagement";
import SeminarManagement from "./pages/SeminarManagement";

function App() {
  return (
    <Router>
      <AppNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/manage_users" element={<UserManagement />} />
        <Route path="/manage_seminars" element={<SeminarManagement />} />
      </Routes>
    </Router>
  );
}

export default App;
