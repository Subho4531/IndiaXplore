import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Sparkles, Building } from 'lucide-react';

const Karnataka = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="antialiased bg-slate-900 text-slate-100 min-h-screen relative overflow-x-hidden">
            

    {/* Ambient Background */}
    <div className="fixed -z-10 blur-[90px] opacity-30 top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full animate-pulse" style={{backgroundColor: '#9333ea'}}></div>
    <div className="fixed -z-10 blur-[90px] opacity-30 bottom-[20%] right-[-10%] w-[50vw] h-[50vw] rounded-full animate-pulse delay-500" style={{backgroundColor: '#eab308'}}></div>
    <div className="fixed -z-10 blur-[90px] opacity-20 top-[40%] left-[20%] w-[30vw] h-[30vw] rounded-full animate-pulse delay-1000" style={{backgroundColor: '#a855f7'}}></div>

    {/* Minimal Navbar */}
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 glass-nav rounded-full px-6 py-3 w-[95%] max-w-7xl mx-auto flex justify-between items-center transition-all duration-300">
        <Link to="/" className="flex items-center gap-2">
            <span className="font-extrabold text-2xl tracking-tight text-white">India<span className="text-purple-500">Xplore</span></span>
        </Link>
        <Link to="/" className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors bg-white/5 px-4 py-2 rounded-full border border-white/10">
            <ArrowLeft className="w-4 h-4" /> Explore States
        </Link>
    </nav>

    <main className="pt-24 pb-20 px-4 sm:px-6 max-w-7xl mx-auto min-h-screen flex flex-col gap-12">
        
        {/* Hero Section */}
        <div className="relative w-full h-[60vh] md:h-[70vh] rounded-[40px] overflow-hidden shadow-2xl group border border-white/10 mt-4">
            {/* Background Image */}
            <img src="https://www.agoda.com/wp-content/uploads/2024/01/Featured-image-The-Vidhana-Soudha-in-Bangalore.jpg" alt="Mysore Palace, Karnataka" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" style={{ objectPosition: 'center' }}/>
            
            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/60 to-transparent"></div>
            
            {/* Content */}
            <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 flex flex-col items-center md:items-start text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-purple-300 font-semibold text-sm mb-6">
                    <MapPin className="w-4 h-4" /> South India
                </div>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-4 tracking-tight drop-shadow-xl font-serif-custom">Karnataka</h1>
                <h2 className="text-2xl md:text-4xl font-bold text-gradient mb-6 font-serif-custom">One State, Many Worlds</h2>
                <p className="text-lg md:text-xl text-slate-200 max-w-2xl leading-relaxed drop-shadow-md">
                    A mesmerizing blend of royal palaces, ancient temple ruins, lush coffee plantations, and India's bustling technological heart.
                </p>
            </div>
        </div>

        {/* Discover Cards Section */}
        <div className="flex flex-col gap-8 mt-4">
            
            {/* Card 1: Echoes of Vijayanagara */}
            <div className="glass-panel rounded-[32px] overflow-hidden border border-white/10 flex flex-col md:flex-row group">
                <div className="w-full md:w-5/12 h-64 md:h-auto overflow-hidden relative">
                    <img src="https://static01.nyt.com/images/2019/11/21/travel/52ptg-hampi-promo/52ptg-hampi-promo-superJumbo.jpg" alt="Hampi Stone Chariot" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0f172a]/80 md:hidden"></div>
                </div>
                <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col justify-center relative bg-slate-900/40">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none"></div>
                    <h3 className="text-3xl font-bold text-white mb-4 font-serif-custom">Echoes of Ancient Empires</h3>
                    <p className="text-slate-300 leading-relaxed text-lg mb-6">
                        Step back in time at <strong className="text-yellow-400">Hampi</strong>, the breathtaking capital of the erstwhile Vijayanagara Empire. This UNESCO World Heritage site is a surreal landscape of giant boulders interspersed with magnificent temple ruins, towering chariots carved from stone, and intricate palaces.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-400">UNESCO Heritage</span>
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-400">Hampi Ruins</span>
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-400">Architecture</span>
                    </div>
                </div>
            </div>

            {/* Card 2: Modernity &amp; Monarchy (Reverse Layout on Desktop) */}
            <div className="glass-panel rounded-[32px] overflow-hidden border border-white/10 flex flex-col md:flex-row-reverse group">
                <div className="w-full md:w-5/12 h-64 md:h-auto overflow-hidden relative">
                    <img src="https://www.tripsavvy.com/thmb/aGpbDE0iHbheGwWEv0Dztp4qGEo=/2120x1414/filters:fill(auto,1)/GettyImages-536116268-5b5d74e846e0fb0050adcf3b.jpg" alt="Bangalore Architecture" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
                </div>
                <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col justify-center relative bg-slate-900/40">
                    <div className="absolute top-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
                    <h3 className="text-3xl font-bold text-white mb-4 font-serif-custom">From Monarchy to Modernity</h3>
                    <p className="text-slate-300 leading-relaxed text-lg mb-4">
                        Experience the royal legacy of the Wadiyars in the "City of Palaces", <strong className="text-purple-400">Mysore</strong>. Famous for its majestic Mysore Palace, rich silk sarees, and the spectacular Dasara festival.
                    </p>
                    <p className="text-slate-300 leading-relaxed text-lg mb-6">
                        Just hours away lies <strong className="text-purple-400">Bengaluru</strong>, India's Silicon Valley. Here, vibrant nightlife, craft breweries, and lush botanical gardens like Lalbagh coexist with the cutting-edge tech industry.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-400">Mysore Palace</span>
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-400">Tech Capital</span>
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-400">Silk &amp; Sandalwood</span>
                    </div>
                </div>
            </div>

            {/* Card 3: The Scotland of India */}
            <div className="glass-panel rounded-[32px] overflow-hidden border border-white/10 flex flex-col md:flex-row group">
                <div className="w-full md:w-5/12 h-64 md:h-auto overflow-hidden relative">
                    <img src="https://specialplacesofindia.com/wp-content/uploads/2024/01/Coorg-Coffee-Plantations-1140x660.jpg" alt="Coorg Coffee Plantations" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" style={{ objectPosition: 'center' }}/>
                </div>
                <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col justify-center relative bg-slate-900/40">
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-green-600/10 rounded-full blur-3xl pointer-events-none"></div>
                    <h3 className="text-3xl font-bold text-white mb-4 font-serif-custom">The Scotland of India</h3>
                    <p className="text-slate-300 leading-relaxed text-lg mb-4">
                        Nestled in the misty Western Ghats is <strong className="text-yellow-400">Coorg (Kodagu)</strong>, a paradise of cascading waterfalls, dense forests, and endlessly rolling coffee estates.
                    </p>
                    <p className="text-slate-300 leading-relaxed text-lg mb-6">
                        Wake up to the aroma of freshly brewed local coffee, trek up to the stunning Abbey Falls, and explore the rich biodiversity of the Bandipur and Nagarhole national parks, home to wild elephants and elusive tigers.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-400">Coffee Plantations</span>
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-400">Wildlife Safaris</span>
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-400">Western Ghats</span>
                    </div>
                </div>
            </div>

        </div>

        {/* Must Visit Grid */}
        <div className="mt-12">
            <h2 className="text-4xl font-bold text-white mb-8 text-center font-serif-custom">Must-Visit Destinations</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Bengaluru */}
                <div className="glass-panel p-4 rounded-3xl border border-white/10 hover:-translate-y-2 transition-transform duration-300 group cursor-pointer bg-slate-800/50">
                    <div className="w-full h-40 rounded-2xl overflow-hidden mb-4 relative">
                        <img src="https://2.bp.blogspot.com/-xBF57XLA2Ww/VwdTz5Q-ULI/AAAAAAAAD2Y/kQdCnhdC3yYhe1TP8XbowbhADnWXHw6YA/s1600/Ecospace_Alufit.jpg" alt="Bengaluru" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2 text-center">Bengaluru</h4>
                    <p className="text-sm text-slate-400 text-center px-2 pb-2">The vibrant tech hub, known for its pleasant weather, parks, and thriving cafe culture.</p>
                </div>

                {/* Mysore */}
                <div className="glass-panel p-4 rounded-3xl border border-white/10 hover:-translate-y-2 transition-transform duration-300 group cursor-pointer bg-slate-800/50">
                    <div className="w-full h-40 rounded-2xl overflow-hidden mb-4 relative">
                        <img src="https://cdn.britannica.com/27/242227-050-48358A10/Mysore-Palace-Mysuru-Karnataka-India.jpg" alt="Mysore" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2 text-center">Mysore</h4>
                    <p className="text-sm text-slate-400 text-center px-2 pb-2">A city of regal heritage, dominated by the awe-inspiring, illuminated Mysore Palace.</p>
                </div>

                {/* Hampi */}
                <div className="glass-panel p-4 rounded-3xl border border-white/10 hover:-translate-y-2 transition-transform duration-300 group cursor-pointer bg-slate-800/50">
                    <div className="w-full h-40 rounded-2xl overflow-hidden mb-4 relative">
                        <img src="https://static.toiimg.com/photo/msid-96207949,width-96,height-65.cms" alt="Hampi" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2 text-center">Hampi</h4>
                    <p className="text-sm text-slate-400 text-center px-2 pb-2">An ancient village dotted with ruined temple complexes from the Vijayanagara Empire.</p>
                </div>

                {/* Coorg */}
                <div className="glass-panel p-4 rounded-3xl border border-white/10 hover:-translate-y-2 transition-transform duration-300 group cursor-pointer bg-slate-800/50">
                    <div className="w-full h-40 rounded-2xl overflow-hidden mb-4 relative">
                        <img src="https://www.fabhotels.com/blog/wp-content/uploads/2019/04/Iruppu-Falls-1.jpg" alt="Coorg" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2 text-center">Coorg</h4>
                    <p className="text-sm text-slate-400 text-center px-2 pb-2">A tranquil hill station renowned for its sweeping coffee estates and Kodava culture.</p>
                </div>
            </div>
        </div>

        {/* Call to Action Banner */}
        <div className="glass-panel rounded-[32px] p-8 md:p-12 border border-purple-500/30 text-center relative overflow-hidden mt-8 mb-8 bg-gradient-to-br from-slate-900 to-purple-950/40">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay"></div>
            
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 relative z-10 font-serif-custom">Ready to explore Karnataka?</h2>
            <p className="text-slate-300 text-lg mb-10 max-w-2xl mx-auto relative z-10">Use our AI tools to instantly generate a custom itinerary, book flights to Bengaluru, or reserve a luxury stay in the hills of Coorg.</p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
                <Link to="/tourism" className="px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(147,51,234,0.4)] flex items-center justify-center gap-2">
                    <Sparkles className="w-5 h-5" /> Plan AI Itinerary
                </Link>
                <Link to="/hotels" className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all border border-white/20 backdrop-blur-md flex items-center justify-center gap-2">
                    <Building className="w-5 h-5" /> Book Hotels
                </Link>
            </div>
        </div>

    </main>

    {/* Footer */}
    <footer className="border-t border-white/10 pt-16 pb-10 px-6 relative z-10 bg-[#0f172a]/80 backdrop-blur-lg mt-10">
        <div className="max-w-7xl mx-auto text-center">
            <Link to="/" className="inline-flex items-center gap-2 mb-4">
                <span className="font-extrabold text-2xl tracking-tight text-white">India<span className="text-purple-500">Xplore</span></span>
            </Link>
            <div className="text-slate-500 text-sm font-medium">
                All rights reserved © IndiaXplore.co
            </div>
        </div>
    </footer>

    

        </div>
    );
};

export default Karnataka;
