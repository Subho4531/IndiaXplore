import React, { useState } from 'react';
import { Menu, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = ({ minimal = false }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    if (minimal) {
        return (
            <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 glass-nav rounded-full px-6 py-3 w-[95%] max-w-7xl mx-auto flex justify-between items-center transition-all duration-300">
                <Link to="/" className="flex items-center gap-2">
                    <span className="font-extrabold text-2xl tracking-tight text-white">
                        India<span className="text-emerald-500">Xplore</span>
                    </span>
                </Link>
                <Link to="/" className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors bg-white/5 px-4 py-2 rounded-full border border-white/10">
                    Back to Home
                </Link>
            </nav>
        );
    }

    return (
        <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 glass-nav rounded-full px-6 py-3 w-[95%] max-w-7xl mx-auto transition-all duration-300">
            <div className="flex justify-between items-center w-full">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <span className="font-extrabold text-2xl tracking-tight text-white">
                        India<span className="text-orange-accent">Xplore</span>
                    </span>
                </Link>

                {/* Desktop Links */}
                <ul className="hidden md:flex space-x-6 lg:space-x-8 items-center">
                    <li><Link to="/" className="text-sm font-medium transition-colors text-orange-accent">Home</Link></li>

                    {/* States Dropdown Menu */}
                    <li>
                        <div className="relative group">
                            <span className="text-sm font-medium transition-colors text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer">
                                States <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />
                            </span>
                            <div className="absolute left-0 top-full mt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top scale-95 group-hover:scale-100 z-50">
                                <div className="absolute -top-4 left-0 w-full h-4"></div>
                                <div className="glass-panel p-2 rounded-2xl shadow-xl border border-white/10 bg-[#0f172a]/95 backdrop-blur-2xl max-h-[60vh] overflow-y-auto custom-scrollbar">
                                    <h4 className="px-3 pt-2 pb-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">States</h4>
                                    <ul className="flex flex-col">
                                        <li><Link to="/states/kerala" className="block px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">Kerala</Link></li>
                                        <li><Link to="/states/goa" className="block px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">Goa</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </li>

                    <li><a href="#services" className="text-sm font-medium transition-colors text-slate-300 hover:text-white">Services</a></li>
                    <li><a href="#destinations" className="text-sm font-medium transition-colors text-slate-300 hover:text-white">Destinations</a></li>
                    <li><a href="#tourism" className="text-sm font-medium transition-colors text-slate-300 hover:text-white">Tourism</a></li>
                    <li><a href="#medical" className="text-sm font-medium transition-colors text-slate-300 hover:text-white">Medical</a></li>
                </ul>

                {/* Auth Buttons Container */}
                <div className="hidden md:flex items-center space-x-4">
                    <Link to="/login" className="text-sm font-medium text-slate-200 hover:text-white transition-colors cursor-pointer">Login</Link>
                    <Link to="/register" className="px-5 py-2 rounded-full border border-white/20 text-sm font-medium hover:bg-white/10 transition-colors cursor-pointer">Sign up</Link>
                    <div className="flex items-center gap-1 cursor-pointer text-sm font-medium ml-2 border-l border-white/20 pl-4">
                        EN <ChevronDown className="w-4 h-4" />
                    </div>
                </div>

                {/* Mobile Menu Toggle */}
                <button className="md:hidden text-white p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <Menu className="w-6 h-6" />
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
