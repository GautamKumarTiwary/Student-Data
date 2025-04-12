import React, { useState } from 'react';
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import { SquareUser } from 'lucide-react';
import { useAuth } from '../context/AuthContext'; // ✅ Enable AuthContext

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isAuthenticated, logout } = useAuth(); // ✅ Get auth state and logout

    const closeMobileMenu = () => setIsMenuOpen(false);

    return (
        <nav className="sticky top-0 z-50 bg-gray-900 text-white shadow-lg">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/home" className="flex-shrink-0">
                        <img src={logo} alt="Logo" className="h-10 w-auto" />
                    </Link>

                    {/* Hamburger */}
                    <button
                        className="lg:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-expanded={isMenuOpen}
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex flex-1 justify-between">
                        <div className="flex space-x-4 ml-8">
                            {/* Add nav links here */}
                        </div>

                        <div className="flex items-center space-x-4">
                            {isAuthenticated ? (
                                <button
                                    onClick={logout}
                                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                                >
                                    Logout
                                </button>
                            ) : (
                                <>
                                    <Link to="/login" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                                        Login
                                    </Link>
                                    <Link to="/signup" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                                        Signup
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile Nav */}
                {isMenuOpen && (
                    <div className="lg:hidden py-2">
                        <div className="flex flex-col space-y-1 px-2">
                            {/* Add mobile links if needed */}
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-700 px-2">
                            {isAuthenticated ? (
                                <button
                                    onClick={() => {
                                        logout();
                                        closeMobileMenu();
                                    }}
                                    className="block w-full px-4 py-2 text-center text-white bg-red-600 rounded-md hover:bg-red-700"
                                >
                                    Logout
                                </button>
                            ) : (
                                <>
                                    <Link to="/login" onClick={closeMobileMenu}
                                        className="block w-full px-4 py-2 text-center text-white bg-blue-600 rounded-md hover:bg-blue-700 mb-2"
                                    >
                                        Login
                                    </Link>
                                    <Link to="/signup" onClick={closeMobileMenu}
                                        className="block w-full px-4 py-2 text-center text-white bg-blue-600 rounded-md hover:bg-blue-700"
                                    >
                                        Signup
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
