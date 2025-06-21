import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DashboardPage } from "./pages/Dashboard";

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<DashboardPage />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
