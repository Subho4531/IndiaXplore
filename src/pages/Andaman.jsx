import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Sparkles, Building } from 'lucide-react';

const Andaman = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="antialiased bg-slate-900 text-slate-100 min-h-screen relative overflow-x-hidden">
            

    {/* Ambient Background */}
    <div className="fixed -z-10 blur-[90px] opacity-30 top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full animate-pulse" style={{backgroundColor: '#0d9488'}}></div>
    <div className="fixed -z-10 blur-[90px] opacity-30 bottom-[20%] right-[-10%] w-[50vw] h-[50vw] rounded-full animate-pulse delay-500" style={{backgroundColor: '#0284c7'}}></div>
    <div className="fixed -z-10 blur-[90px] opacity-20 top-[40%] left-[20%] w-[30vw] h-[30vw] rounded-full animate-pulse delay-1000" style={{backgroundColor: '#0891b2'}}></div>

    {/* Minimal Navbar */}
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 glass-nav rounded-full px-6 py-3 w-[95%] max-w-7xl mx-auto flex justify-between items-center transition-all duration-300">
        <Link to="/" className="flex items-center gap-2">
            <span className="font-extrabold text-2xl tracking-tight text-white">India<span className="text-teal-500">Xplore</span></span>
        </Link>
        <Link to="/" className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors bg-white/5 px-4 py-2 rounded-full border border-white/10">
            <ArrowLeft className="w-4 h-4" /> Explore States
        </Link>
    </nav>

    <main className="pt-24 pb-20 px-4 sm:px-6 max-w-7xl mx-auto min-h-screen flex flex-col gap-12">
        
        {/* Hero Section */}
        <div className="relative w-full h-[60vh] md:h-[70vh] rounded-[40px] overflow-hidden shadow-2xl group border border-white/10 mt-4">
            {/* Background Image */}
            <img src="https://wallpaperaccess.com/full/1375761.jpg" alt="Andaman Pristine Beach" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" style={{ objectPosition: 'center' }}/>
            
            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/60 to-transparent"></div>
            
            {/* Content */}
            <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 flex flex-col items-center md:items-start text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-teal-300 font-semibold text-sm mb-6">
                    <MapPin className="w-4 h-4" /> Bay of Bengal
                </div>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-4 tracking-tight drop-shadow-xl font-serif-custom">Andaman &amp; Nicobar</h1>
                <h2 className="text-2xl md:text-4xl font-bold text-gradient mb-6 font-serif-custom">The Emerald Isles</h2>
                <p className="text-lg md:text-xl text-slate-200 max-w-2xl leading-relaxed drop-shadow-md">
                    An archipelago of untouched beauty featuring white-sand beaches, vibrant coral reefs, lush rainforests, and a deep, stirring history.
                </p>
            </div>
        </div>

        {/* Discover Cards Section */}
        <div className="flex flex-col gap-8 mt-4">
            
            {/* Card 1: Pristine Beaches */}
            <div className="glass-panel rounded-[32px] overflow-hidden border border-white/10 flex flex-col md:flex-row group">
                <div className="w-full md:w-5/12 h-64 md:h-auto overflow-hidden relative">
                    <img src="https://indiano.travel/wp-content/uploads/2023/01/Radhanagar-Beach-Feature-photo.jpg" alt="Radhanagar Beach" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0f172a]/80 md:hidden"></div>
                </div>
                <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col justify-center relative bg-slate-900/40">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
                    <h3 className="text-3xl font-bold text-white mb-4 font-serif-custom">World-Class Shores</h3>
                    <p className="text-slate-300 leading-relaxed text-lg mb-6">
                        Walk along the powdery white sands of <strong className="text-cyan-400">Radhanagar Beach</strong> on Havelock Island (Swaraj Dweep), consistently ranked among the best beaches in Asia. The turquoise waters, lined with ancient Mahua trees, create a picture-perfect paradise for sunbathing, swimming, and mesmerizing sunsets.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-400">Radhanagar Beach</span>
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-400">Havelock Island</span>
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-400">Tropical Escapes</span>
                    </div>
                </div>
            </div>

            {/* Card 2: Marine Life (Reverse Layout on Desktop) */}
            <div className="glass-panel rounded-[32px] overflow-hidden border border-white/10 flex flex-col md:flex-row-reverse group">
                <div className="w-full md:w-5/12 h-64 md:h-auto overflow-hidden relative">
                    <img src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?fit=crop&w=800&q=80" alt="Scuba Diving Coral Reef" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
                </div>
                <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col justify-center relative bg-slate-900/40">
                    <div className="absolute top-0 left-0 w-32 h-32 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
                    <h3 className="text-3xl font-bold text-white mb-4 font-serif-custom">Beneath the Surface</h3>
                    <p className="text-slate-300 leading-relaxed text-lg mb-4">
                        The Andaman Sea hides a bustling underwater metropolis. It is India's premier destination for <strong className="text-teal-400">scuba diving and snorkeling</strong>.
                    </p>
                    <p className="text-slate-300 leading-relaxed text-lg mb-6">
                        Dive into the warm waters around Neil Island (Shaheed Dweep) and Elephant Beach to swim alongside majestic manta rays, sea turtles, dugongs, and incredibly vibrant, untouched coral reef ecosystems.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-400">Scuba Diving</span>
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-400">Coral Reefs</span>
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-400">Sea Turtles</span>
                    </div>
                </div>
            </div>

            {/* Card 3: History &amp; Wilderness */}
            <div className="glass-panel rounded-[32px] overflow-hidden border border-white/10 flex flex-col md:flex-row group">
                <div className="w-full md:w-5/12 h-64 md:h-auto overflow-hidden relative">
                    <img src="https://as1.ftcdn.net/v2/jpg/02/08/17/28/1000_F_208172832_Cs9BvjsYWmyLknyXfnjGzv4dNvQNAvLC.jpg" alt="Cellular Jail" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" style={{ objectPosition: 'center' }}/>
                </div>
                <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col justify-center relative bg-slate-900/40">
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-sky-600/10 rounded-full blur-3xl pointer-events-none"></div>
                    <h3 className="text-3xl font-bold text-white mb-4 font-serif-custom">Echoes of the Past</h3>
                    <p className="text-slate-300 leading-relaxed text-lg mb-4">
                        Before it was a tropical haven, Port Blair was known for the infamous <strong className="text-sky-400">Cellular Jail (Kala Pani)</strong>. Today, it stands as a solemn national memorial dedicated to India's freedom fighters, complete with a stirring light and sound show.
                    </p>
                    <p className="text-slate-300 leading-relaxed text-lg mb-6">
                        Beyond history, explore the raw wilderness of Baratang Island, journeying through dense mangrove creeks to witness ancient limestone caves and mud volcanoes.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-400">Cellular Jail</span>
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-400">Port Blair</span>
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-400">Mangrove Creeks</span>
                    </div>
                </div>
            </div>

        </div>

        {/* Must Visit Grid */}
        <div className="mt-12">
            <h2 className="text-4xl font-bold text-white mb-8 text-center font-serif-custom">Must-Visit Destinations</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Port Blair */}
                <div className="glass-panel p-4 rounded-3xl border border-white/10 hover:-translate-y-2 transition-transform duration-300 group cursor-pointer bg-slate-800/50">
                    <div className="w-full h-40 rounded-2xl overflow-hidden mb-4 relative">
                        <img src="https://www.godigit.com/content/dam/godigit/directportal/en/contenthm/andaman.jpg" alt="Port Blair" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2 text-center">Port Blair</h4>
                    <p className="text-sm text-slate-400 text-center px-2 pb-2">The capital city, home to the historic Cellular Jail and the gateway to the islands.</p>
                </div>

                {/* Havelock */}
                <div className="glass-panel p-4 rounded-3xl border border-white/10 hover:-translate-y-2 transition-transform duration-300 group cursor-pointer bg-slate-800/50">
                    <div className="w-full h-40 rounded-2xl overflow-hidden mb-4 relative">
                        <img src="https://res.cloudinary.com/purnesh/image/upload/w_1080,f_auto/havelock-header.jpg" alt="Havelock Island" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2 text-center">Havelock Island</h4>
                    <p className="text-sm text-slate-400 text-center px-2 pb-2">Famed for the stunning Radhanagar Beach and world-class scuba diving spots.</p>
                </div>

                {/* Neil Island */}
                <div className="glass-panel p-4 rounded-3xl border border-white/10 hover:-translate-y-2 transition-transform duration-300 group cursor-pointer bg-slate-800/50">
                    <div className="w-full h-40 rounded-2xl overflow-hidden mb-4 relative">
                        <img src="https://www.andamanisland.in/uploads/andamanislands/attachchments/main/602e33fee563b117_neil-island-3.png" alt="Neil Island" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2 text-center">Neil Island</h4>
                    <p className="text-sm text-slate-400 text-center px-2 pb-2">A tranquil, eco-friendly retreat known for its natural rock bridges and snorkeling.</p>
                </div>

                {/* Baratang */}
                <div className="glass-panel p-4 rounded-3xl border border-white/10 hover:-translate-y-2 transition-transform duration-300 group cursor-pointer bg-slate-800/50">
                    <div className="w-full h-40 rounded-2xl overflow-hidden mb-4 relative">
                        <img src="https://www.andamantourism.org/wp-content/uploads/2023/12/baratang-island.jpg" alt="Baratang Island" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2 text-center">Baratang Island</h4>
                    <p className="text-sm text-slate-400 text-center px-2 pb-2">An adventurous escape into dense mangrove forests, limestone caves, and mud volcanoes.</p>
                </div>
            </div>
        </div>

        {/* Call to Action Banner */}
        <div className="glass-panel rounded-[32px] p-8 md:p-12 border border-teal-500/30 text-center relative overflow-hidden mt-8 mb-8 bg-gradient-to-br from-slate-900 to-teal-950/40">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay"></div>
            
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 relative z-10 font-serif-custom">Ready to explore the Andamans?</h2>
            <p className="text-slate-300 text-lg mb-10 max-w-2xl mx-auto relative z-10">Use our AI tools to instantly generate a custom island-hopping itinerary, book flights to Port Blair, or reserve a beachfront resort.</p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
                <Link to="/tourism" className="px-8 py-4 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(13,148,136,0.4)] flex items-center justify-center gap-2">
                    <Sparkles className="w-5 h-5" /> Plan AI Itinerary
                </Link>
                <Link to="/hotels" className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all border border-white/20 backdrop-blur-md flex items-center justify-center gap-2">
                    <Building className="w-5 h-5" /> Book Island Stays
                </Link>
            </div>
        </div>

    </main>

    {/* Footer */}
    <footer className="border-t border-white/10 pt-16 pb-10 px-6 relative z-10 bg-[#0f172a]/80 backdrop-blur-lg mt-10">
        <div className="max-w-7xl mx-auto text-center">
            <Link to="/" className="inline-flex items-center gap-2 mb-4">
                <span className="font-extrabold text-2xl tracking-tight text-white">India<span className="text-teal-500">Xplore</span></span>
            </Link>
            <div className="text-slate-500 text-sm font-medium">
                All rights reserved © IndiaXplore.co
            </div>
        </div>
    </footer>

    

        </div>
    );
};

export default Andaman;
