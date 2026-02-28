import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TravelPass from './pages/TravelPass';
import Verify from './pages/Verify';
import AdminDB from './pages/AdminDB';
import StatePage from './pages/StatePage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/travel-pass" element={<TravelPass />} />
                <Route path="/verify" element={<Verify />} />
                <Route path="/admin-db" element={<AdminDB />} />
                <Route path="/states/:stateId" element={<StatePage />} />
                <Route path="/tourism" element={<div className="p-20 text-white min-h-screen bg-slate-900 pt-32">Tourism Portal (Under Construction)</div>} />
                <Route path="/medical" element={<div className="p-20 text-white min-h-screen bg-slate-900 pt-32">Medical Portal (Under Construction)</div>} />
            </Routes>
        </Router>
    );
}

export default App;
