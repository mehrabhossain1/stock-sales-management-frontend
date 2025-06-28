import { useState } from "react";
import { Link } from "react-router-dom";

const navLinks = [
    { label: "Home", path: "/" },
    { label: "Shop", path: "/shop" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
    { label: "Blog", path: "/blog" },
    { label: "Dashboard", path: "/dashboard" },
];

export function Navbar() {
    const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-primary text-primary-foreground shadow-md">
            <nav className="container mx-auto flex items-center justify-between px-4 py-3">
                <Link to="/" className="text-xl font-bold">
                    MyShop
                </Link>

                <ul className="hidden md:flex gap-6 items-center">
                    {navLinks.map((link) => (
                        <li key={link.path}>
                            <Link to={link.path} className="hover:underline">
                                {link.label}
                            </Link>
                        </li>
                    ))}

                    <li className="relative">
                        <button
                            className="hover:underline"
                            onClick={() => setIsMegaMenuOpen((prev) => !prev)}
                        >
                            Mega Menu
                        </button>
                        {isMegaMenuOpen && (
                            <div className="absolute left-0 top-full mt-2 w-64 bg-white text-black shadow-lg p-4 rounded-md">
                                <h4 className="font-semibold mb-2">
                                    Categories
                                </h4>
                                <ul className="space-y-2">
                                    <li>
                                        <Link
                                            to="/category/electronics"
                                            className="hover:underline"
                                        >
                                            Electronics
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/category/fashion"
                                            className="hover:underline"
                                        >
                                            Fashion
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/category/groceries"
                                            className="hover:underline"
                                        >
                                            Groceries
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/category/others"
                                            className="hover:underline"
                                        >
                                            Others
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </li>
                </ul>

                <div className="md:hidden">
                    {/* Mobile hamburger */}
                    <button>
                        <span className="material-icons">menu</span>
                    </button>
                </div>
            </nav>
        </header>
    );
}
