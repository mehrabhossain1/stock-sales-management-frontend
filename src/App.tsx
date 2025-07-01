import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Navbar } from "./components/shared/Navbar";
import Homepage from "./pages/homepage/Homepage";

const queryClient = new QueryClient();

function App() {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <Router>
                    <div className="min-h-screen">
                        <Navbar />
                        <main>
                            <Routes>
                                <Route path="/" element={<Homepage />} />
                                <Route
                                    path="/shop"
                                    element={
                                        <div className="p-8 text-center">
                                            Shop Page
                                        </div>
                                    }
                                />
                                <Route
                                    path="/about"
                                    element={
                                        <div className="p-8 text-center">
                                            About Page
                                        </div>
                                    }
                                />
                                <Route
                                    path="/contact"
                                    element={
                                        <div className="p-8 text-center">
                                            Contact Page
                                        </div>
                                    }
                                />
                                <Route
                                    path="/blog"
                                    element={
                                        <div className="p-8 text-center">
                                            Blog Page
                                        </div>
                                    }
                                />
                                <Route
                                    path="/dashboard"
                                    element={
                                        <div className="p-8 text-center">
                                            Dashboard Page
                                        </div>
                                    }
                                />
                                <Route
                                    path="/cart"
                                    element={
                                        <div className="p-8 text-center">
                                            Cart Page
                                        </div>
                                    }
                                />
                                <Route
                                    path="/wishlist"
                                    element={
                                        <div className="p-8 text-center">
                                            Wishlist Page
                                        </div>
                                    }
                                />
                                <Route
                                    path="/profile"
                                    element={
                                        <div className="p-8 text-center">
                                            Profile Page
                                        </div>
                                    }
                                />
                                <Route
                                    path="/category/:category"
                                    element={
                                        <div className="p-8 text-center">
                                            Category Page
                                        </div>
                                    }
                                />
                            </Routes>
                        </main>
                    </div>
                </Router>
            </QueryClientProvider>
        </>
    );
}

export default App;
