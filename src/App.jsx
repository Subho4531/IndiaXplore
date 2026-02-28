import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TravelPass from './pages/TravelPass';
import Verify from './pages/Verify';
import AdminDB from './pages/AdminDB';
import StatePage from './pages/StatePage';
import Login from './pages/Login';
import Register from './pages/Register';
import Agra from './pages/Agra';
import Flight from './pages/Flight';
import Medical from './pages/Medical';
import Cab from './pages/Cab';
import Rail from './pages/Rail';
import Hotels from './pages/Hotels';
import Hospital from './pages/Hospital';
import Tourism from './pages/Tourism';
import Andaman from './pages/Andaman';
import Bihar from './pages/Bihar';
import Delhi from './pages/Delhi';
import Goa from './pages/Goa';
import Jaipur from './pages/Jaipur';
import Karnataka from './pages/Karnataka';
import Kerala from './pages/Kerala';
import KeralaBackwaters from './pages/KeralaBackwaters';
import Odisha from './pages/Odisha';
import Telengana from './pages/Telengana';
import Tn from './pages/Tn';
import Wb from './pages/Wb';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/travel-pass" element={<TravelPass />} />
                <Route path="/verify" element={<Verify />} />
                <Route path="/admin-db" element={<AdminDB />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/agra" element={<Agra />} />
                <Route path="/flight" element={<Flight />} />

                <Route path="/andaman" element={<Andaman />} />
                <Route path="/bihar" element={<Bihar />} />
                <Route path="/delhi" element={<Delhi />} />
                <Route path="/goa" element={<Goa />} />
                <Route path="/jaipur" element={<Jaipur />} />
                <Route path="/karnataka" element={<Karnataka />} />
                <Route path="/kerala" element={<Kerala />} />
                <Route path="/kerala_backwaters" element={<KeralaBackwaters />} />
                <Route path="/odisha" element={<Odisha />} />
                <Route path="/telengana" element={<Telengana />} />
                <Route path="/tn" element={<Tn />} />
                <Route path="/wb" element={<Wb />} />
                <Route path="/states/:stateId" element={<StatePage />} />
                <Route path="/tourism" element={<Tourism />} />
                <Route path="/medical" element={<Medical />} />
                <Route path="/cab" element={<Cab />} />
                <Route path="/rail" element={<Rail />} />
                <Route path="/hotels" element={<Hotels />} />
                <Route path="/hospital" element={<Hospital />} />
            </Routes>
        </Router>
    );
}

export default App;
