import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Sparkles, Building } from 'lucide-react';

const Wb = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="antialiased bg-slate-900 text-slate-100 min-h-screen relative overflow-x-hidden">
            

    {/* Ambient Background */}
    <div className="fixed -z-10 blur-[90px] opacity-30 top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full animate-pulse" style={{backgroundColor: '#e11d48'}}></div>
    <div className="fixed -z-10 blur-[90px] opacity-30 bottom-[20%] right-[-10%] w-[50vw] h-[50vw] rounded-full animate-pulse delay-500" style={{backgroundColor: '#f59e0b'}}></div>
    <div className="fixed -z-10 blur-[90px] opacity-20 top-[40%] left-[20%] w-[30vw] h-[30vw] rounded-full animate-pulse delay-1000" style={{backgroundColor: '#ea580c'}}></div>

    {/* Minimal Navbar */}
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 glass-nav rounded-full px-6 py-3 w-[95%] max-w-7xl mx-auto flex justify-between items-center transition-all duration-300">
        <Link to="/" className="flex items-center gap-2">
            <span className="font-extrabold text-2xl tracking-tight text-white">India<span className="text-rose-500">Xplore</span></span>
        </Link>
        <Link to="/" className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors bg-white/5 px-4 py-2 rounded-full border border-white/10">
            <ArrowLeft className="w-4 h-4" /> Explore States
        </Link>
    </nav>

    <main className="pt-24 pb-20 px-4 sm:px-6 max-w-7xl mx-auto min-h-screen flex flex-col gap-12">
        
        {/* Hero Section */}
        <div className="relative w-full h-[60vh] md:h-[70vh] rounded-[40px] overflow-hidden shadow-2xl group border border-white/10 mt-4">
            {/* Background Image */}
            <img src="https://www.adotrip.com/public/images/areas/master_images/60fea45055e09-Howran_bridge_in_west_bengal.jpg" alt="Howrah Bridge, Kolkata" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"/>
            
            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/60 to-transparent"></div>
            
            {/* Content */}
            <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 flex flex-col items-center md:items-start text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-rose-300 font-semibold text-sm mb-6">
                    <MapPin className="w-4 h-4" /> East India
                </div>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-4 tracking-tight drop-shadow-xl font-serif-custom">West Bengal</h1>
                <h2 className="text-2xl md:text-4xl font-bold text-gradient mb-6 font-serif-custom">India's Cultural Capital</h2>
                <p className="text-lg md:text-xl text-slate-200 max-w-2xl leading-relaxed drop-shadow-md">
                    A land of literature, art, revolutionary history, and breathtaking landscapes spanning from the Himalayas to the Bay of Bengal.
                </p>
            </div>
        </div>

        {/* Discover Cards Section */}
        <div className="flex flex-col gap-8 mt-4">
            
            {/* Card 1: Literary &amp; Artistic */}
            <div className="glass-panel rounded-[32px] overflow-hidden border border-white/10 flex flex-col md:flex-row group">
                <div className="w-full md:w-5/12 h-64 md:h-auto overflow-hidden relative">
                    <img src="https://cdn.pixabay.com/photo/2017/06/12/08/29/victoria-memorial-2394784_1280.jpg" alt="Victoria Memorial" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0f172a]/80 md:hidden"></div>
                </div>
                <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col justify-center relative bg-slate-900/40">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>
                    <h3 className="text-3xl font-bold text-white mb-4 font-serif-custom">Literary &amp; Artistic Heritage</h3>
                    <p className="text-slate-300 leading-relaxed text-lg mb-6">
                        West Bengal is the heartland of the Bengal Renaissance, a period of profound social, cultural, and artistic awakening. It's the land of Nobel laureate <strong className="text-rose-400">Rabindranath Tagore</strong>, whose literature and music have shaped Indian culture. The state's capital, Kolkata, is often rightfully called the 'City of Joy'.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-400">Victoria Memorial</span>
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-400">Shantiniketan</span>
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-400">Indian Museum</span>
                    </div>
                </div>
            </div>

            {/* Card 2: Feast for the Senses (Reverse Layout on Desktop) */}
            <div className="glass-panel rounded-[32px] overflow-hidden border border-white/10 flex flex-col md:flex-row-reverse group">
                <div className="w-full md:w-5/12 h-64 md:h-auto overflow-hidden relative">
                    <img src="https://1.bp.blogspot.com/-Q09XMt2yzmI/To7ktrG5YWI/AAAAAAAAAX0/oc7DUWelYIc/s1600/Bengali+Food.jpg" alt="Bengali Cuisine" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
                </div>
                <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col justify-center relative bg-slate-900/40">
                    <div className="absolute top-0 left-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
                    <h3 className="text-3xl font-bold text-white mb-4 font-serif-custom">A Feast for the Senses</h3>
                    <p className="text-slate-300 leading-relaxed text-lg mb-4">
                        Bengali cuisine is celebrated for its subtle yet fiery flavours, with a perfect balance of sweet and spicy. It is the only traditionally developed multi-course culinary tradition from the Indian subcontinent. Fish is a staple, with dishes like <strong className="text-amber-400">Macher Jhol</strong> (fish curry) and <strong className="text-amber-400">Shorshe Ilish</strong> (hilsa in mustard gravy) being iconic.
                    </p>
                    <p className="text-slate-300 leading-relaxed text-lg mb-6">
                        No Bengali meal is complete without sweets. The state is famous for its confectioneries, especially <strong className="text-amber-400">Rosogolla, Sandesh</strong>, and <strong className="text-amber-400">Mishti Doi</strong> (sweet yogurt).
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-400">Street Food</span>
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-400">Sweets</span>
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-400">Seafood</span>
                    </div>
                </div>
            </div>

            {/* Card 3: Durga Puja */}
            <div className="glass-panel rounded-[32px] overflow-hidden border border-white/10 flex flex-col md:flex-row group">
                <div className="w-full md:w-5/12 h-64 md:h-auto overflow-hidden relative">
                    <img src="https://wallpapercave.com/wp/wp5478381.jpg" alt="Durga Puja" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" style={{ objectPosition: 'top' }}/>
                </div>
                <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col justify-center relative bg-slate-900/40">
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-rose-600/10 rounded-full blur-3xl pointer-events-none"></div>
                    <h3 className="text-3xl font-bold text-white mb-4 font-serif-custom">Durga Puja: The Heartbeat of Bengal</h3>
                    <p className="text-slate-300 leading-relaxed text-lg mb-4">
                        More than just a festival, Durga Puja is an emotion that engulfs West Bengal in autumn. It is the grandest celebration in the state, transforming cities and towns into a massive, open-air art gallery, celebrating the victory of the goddess Durga over the demon Mahishasur.
                    </p>
                    <p className="text-slate-300 leading-relaxed text-lg mb-6">
                        Tourists from around the globe flock to witness the artistic marvels of the themed <strong className="text-rose-400">pandals</strong> and the exquisitely crafted idols. The air is filled with the sounds of dhak (traditional drums), making it an unforgettable cultural spectacle and a prime tourist attraction.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-400">UNESCO Heritage</span>
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-400">Festivals</span>
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-400">Art</span>
                    </div>
                </div>
            </div>

        </div>

        {/* Must Visit Grid */}
        <div className="mt-12">
            <h2 className="text-4xl font-bold text-white mb-8 text-center font-serif-custom">Must-Visit Destinations</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Kolkata */}
                <div className="glass-panel p-4 rounded-3xl border border-white/10 hover:-translate-y-2 transition-transform duration-300 group cursor-pointer bg-slate-800/50">
                    <div className="w-full h-40 rounded-2xl overflow-hidden mb-4 relative">
                        <img src="https://i.pinimg.com/originals/86/89/7e/86897e585ffc9db88d85e709fb183291.jpg" alt="Kolkata" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2 text-center">Kolkata</h4>
                    <p className="text-sm text-slate-400 text-center px-2 pb-2">The City of Joy, rich in history, colonial architecture, and art.</p>
                </div>

                {/* Darjeeling */}
                <div className="glass-panel p-4 rounded-3xl border border-white/10 hover:-translate-y-2 transition-transform duration-300 group cursor-pointer bg-slate-800/50">
                    <div className="w-full h-40 rounded-2xl overflow-hidden mb-4 relative">
                        <img src="https://wallpapercave.com/wp/wp6191795.jpg" alt="Darjeeling" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2 text-center">Darjeeling</h4>
                    <p className="text-sm text-slate-400 text-center px-2 pb-2">Famous for sprawling tea gardens and breathtaking Himalayan views.</p>
                </div>

                {/* Sundarbans */}
                <div className="glass-panel p-4 rounded-3xl border border-white/10 hover:-translate-y-2 transition-transform duration-300 group cursor-pointer bg-slate-800/50">
                    <div className="w-full h-40 rounded-2xl overflow-hidden mb-4 relative">
                        <img src="https://bigcatsindia.com/wp-content/uploads/2018/06/Royal-Bengal-Tiger.jpg" alt="Sundarbans" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2 text-center">Sundarbans</h4>
                    <p className="text-sm text-slate-400 text-center px-2 pb-2">The world's largest mangrove forest, home to the Royal Bengal Tiger.</p>
                </div>

                {/* Bishnupur */}
                <div className="glass-panel p-4 rounded-3xl border border-white/10 hover:-translate-y-2 transition-transform duration-300 group cursor-pointer bg-slate-800/50">
                    <div className="w-full h-40 rounded-2xl overflow-hidden mb-4 relative">
                        <img src="https://mediaindia.eu/wp-content/uploads/2021/05/Bishnupur-main.jpg" alt="Bishnupur" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2 text-center">Bishnupur</h4>
                    <p className="text-sm text-slate-400 text-center px-2 pb-2">Known globally for its unique terracotta temples and Baluchari sarees.</p>
                </div>
            </div>
        </div>

        {/* Call to Action Banner */}
        <div className="glass-panel rounded-[32px] p-8 md:p-12 border border-rose-500/30 text-center relative overflow-hidden mt-8 mb-8 bg-gradient-to-br from-slate-900 to-rose-950/40">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay"></div>
            
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 relative z-10 font-serif-custom">Ready to explore Bengal?</h2>
            <p className="text-slate-300 text-lg mb-10 max-w-2xl mx-auto relative z-10">Use our AI tools to instantly generate a custom itinerary, book flights, or reserve a luxury stay in West Bengal.</p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
                <Link to="/tourism" className="px-8 py-4 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(225,29,72,0.4)] flex items-center justify-center gap-2">
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
                <span className="font-extrabold text-2xl tracking-tight text-white">India<span className="text-rose-500">Xplore</span></span>
            </Link>
            <div className="text-slate-500 text-sm font-medium">
                All rights reserved © IndiaXplore.co
            </div>
        </div>
    </footer>

    

        </div>
    );
};

export default Wb;
