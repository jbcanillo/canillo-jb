import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppNavbar from './components/AppNavBar';
import Home from './pages/Home';
import Team from './pages/Team';
import TeamDetails from './pages/Team/details';

function App() {
  return (
      <Router>
        <AppNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/team" element={<Team/>}>
            <Route path=":id" element={<TeamDetails/>}/>
          </Route>
        </Routes>
      </Router>
  );
}

export default App;
