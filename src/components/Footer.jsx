import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="border-t border-white/10 pt-20 pb-10 px-6 relative z-10 bg-[#0f172a]/80 backdrop-blur-lg">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
                <div className="lg:col-span-2">
                    <Link to="/" className="flex items-center gap-2 mb-6">
                        <span className="font-extrabold text-3xl tracking-tight text-white">
                            India<span className="text-orange-accent">Xplore</span>
                        </span>
                    </Link>
                    <p className="text-slate-400 text-base leading-relaxed mb-6 max-w-sm">
                        Book your trip in minutes, get full control for much longer.
                    </p>
                </div>
                <div>
                    <h4 className="text-white font-bold text-lg mb-6">Company</h4>
                    <ul className="space-y-4 text-slate-400 text-base">
                        <li><a href="#" className="hover:text-orange-accent transition-colors">About</a></li>
                        <li><a href="#" className="hover:text-orange-accent transition-colors">Careers</a></li>
                        <li><a href="#" className="hover:text-orange-accent transition-colors">Mobile</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-bold text-lg mb-6">Contact</h4>
                    <ul className="space-y-4 text-slate-400 text-base">
                        <li><a href="#" className="hover:text-orange-accent transition-colors">Help/FAQ</a></li>
                        <li><a href="#" className="hover:text-orange-accent transition-colors">Press</a></li>
                        <li><a href="#" className="hover:text-orange-accent transition-colors">Affiliates</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-bold text-lg mb-6">More</h4>
                    <ul className="space-y-4 text-slate-400 text-base">
                        <li><a href="#" className="hover:text-orange-accent transition-colors">Airlinefees</a></li>
                        <li><a href="#" className="hover:text-orange-accent transition-colors">Airline</a></li>
                        <li><a href="#" className="hover:text-orange-accent transition-colors">Low fare tips</a></li>
                    </ul>
                </div>
            </div>
            <div className="text-center text-slate-500 text-sm font-medium">
                All rights reserved @ IndiaXplore.co
            </div>
        </footer>
    );
};

export default Footer;
