import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const StatePage = () => {
    const { stateId } = useParams();

    // Basic mock formatting for the title
    const stateTitle = stateId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    return (
        <div className="antialiased font-sans bg-slate-900 text-slate-100 min-h-screen flex flex-col">
            <Navbar minimal />

            <main className="flex-1 pt-32 pb-24 px-6 max-w-5xl mx-auto w-full">
                <div className="text-center mb-12">
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 font-serif">{stateTitle}</h1>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                        Explore the beauty, culture, and rich heritage of {stateTitle}. Discover popular destinations, book local experiences, and find necessary travel information.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    <div className="h-64 md:h-80 rounded-3xl overflow-hidden glass-panel border border-white/10 relative group">
                        <img src={`https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800`} alt={stateTitle} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 mix-blend-overlay" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent flex items-end p-6">
                            <h3 className="text-2xl font-bold font-serif text-white">Popular Locations</h3>
                        </div>
                    </div>

                    <div className="h-64 md:h-80 rounded-3xl overflow-hidden glass-panel border border-white/10 bg-slate-800 p-8 flex flex-col justify-center gap-4">
                        <h3 className="text-xl font-bold font-serif text-emerald-400">Tourism Helpline</h3>
                        <p className="text-slate-300">Contact the state officials for authorized bookings and emergency assistance.</p>
                        <div className="mt-2 bg-slate-900 rounded-lg p-4 border border-slate-700 font-mono text-center text-lg text-white">
                            1800-425-4747
                        </div>
                        <Link to="/travel-pass" className="text-center mt-4 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors uppercase tracking-widest">
                            Get Travel Pass
                        </Link>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default StatePage;
