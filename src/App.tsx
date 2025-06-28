import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DashboardPage } from "./pages/Dashboard";
import Homepage from "./pages/homepage/Homepage";

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
