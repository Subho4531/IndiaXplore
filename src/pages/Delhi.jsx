import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Sparkles, Building } from 'lucide-react';

const Delhi = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="antialiased bg-slate-900 text-slate-100 min-h-screen relative overflow-x-hidden">
            

    {/* Ambient Background */}
    <div className="fixed -z-10 blur-[90px] opacity-30 top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full animate-pulse" style={{backgroundColor: '#4f46e5'}}></div>
    <div className="fixed -z-10 blur-[90px] opacity-30 bottom-[20%] right-[-10%] w-[50vw] h-[50vw] rounded-full animate-pulse delay-500" style={{backgroundColor: '#ea580c'}}></div>
    <div className="fixed -z-10 blur-[90px] opacity-20 top-[40%] left-[20%] w-[30vw] h-[30vw] rounded-full animate-pulse delay-1000" style={{backgroundColor: '#0ea5e9'}}></div>

    {/* Minimal Navbar */}
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 glass-nav rounded-full px-6 py-3 w-[95%] max-w-7xl mx-auto flex justify-between items-center transition-all duration-300">
        <Link to="/" className="flex items-center gap-2">
            <span className="font-extrabold text-2xl tracking-tight text-white">India<span className="text-indigo-500">Xplore</span></span>
        </Link>
        <Link to="/" className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors bg-white/5 px-4 py-2 rounded-full border border-white/10">
            <ArrowLeft className="w-4 h-4" /> Explore States
        </Link>
    </nav>

    <main className="pt-24 pb-20 px-4 sm:px-6 max-w-7xl mx-auto min-h-screen flex flex-col gap-12">
        
        {/* Hero Section */}
        <div className="relative w-full h-[60vh] md:h-[70vh] rounded-[40px] overflow-hidden shadow-2xl group border border-white/10 mt-4">
            {/* Background Image */}
            <img src="https://images.pexels.com/photos/6776755/pexels-photo-6776755.jpeg" alt="Humayun's Tomb, Delhi" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"/>
            
            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/60 to-transparent"></div>
            
            {/* Content */}
            <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 flex flex-col items-center md:items-start text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-300 font-semibold text-sm mb-6">
                    <MapPin className="w-4 h-4" /> North India
                </div>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-4 tracking-tight drop-shadow-xl font-serif-custom">Delhi</h1>
                <h2 className="text-2xl md:text-4xl font-bold text-gradient mb-6 font-serif-custom">The Heart of India</h2>
                <p className="text-lg md:text-xl text-slate-200 max-w-2xl leading-relaxed drop-shadow-md">
                    A mesmerizing blend of ancient history and bustling modernity, where empires have risen and fallen, leaving behind a rich tapestry of culture.
                </p>
            </div>
        </div>

        {/* Discover Cards Section */}
        <div className="flex flex-col gap-8 mt-4">
            
            {/* Card 1: Tapestry of Empires */}
            <div className="glass-panel rounded-[32px] overflow-hidden border border-white/10 flex flex-col md:flex-row group">
                <div className="w-full md:w-5/12 h-64 md:h-auto overflow-hidden relative">
                    <img src="https://th.bing.com/th/id/R.d6361bf60474d0bebd0163df5fe9d35d?rik=Ac5Y6XAfZWxcJw&riu=http%3a%2f%2fwww.baltana.com%2ffiles%2fwallpapers-10%2fQutub-Minar-New-Delhi-Full-View-Wallpaper-28424.jpg&ehk=dIrMabLOohLR0hmEe%2b95fRQOUv7fSH5juWCGZ3NCgEY%3d&risl=&pid=ImgRaw&r=0" alt="Qutub Minar" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0f172a]/80 md:hidden"></div>
                </div>
                <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col justify-center relative bg-slate-900/40">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
                    <h3 className="text-3xl font-bold text-white mb-4 font-serif-custom">A Tapestry of Empires</h3>
                    <p className="text-slate-300 leading-relaxed text-lg mb-6">
                        Delhi has served as the capital of numerous empires, including the Mughals and the British. Its landscape is dotted with magnificent monuments like the <strong className="text-indigo-400">Red Fort</strong>, Jama Masjid, and Humayun's Tomb, standing as breathtaking testaments to its glorious and turbulent past.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-400">Mughal Architecture</span>
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-400">Historical Forts</span>
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-400">Heritage Walks</span>
                    </div>
                </div>
            </div>

            {/* Card 2: Culinary Capital (Reverse Layout on Desktop) */}
            <div className="glass-panel rounded-[32px] overflow-hidden border border-white/10 flex flex-col md:flex-row-reverse group">
                <div className="w-full md:w-5/12 h-64 md:h-auto overflow-hidden relative">
                    <img src="https://th.bing.com/th/id/R.7f94561e31fba553ec6a24612944860b?rik=AKmoYKfQZ3jdJg&riu=http%3a%2f%2ffoodelhi.in%2fwp-content%2fuploads%2f2017%2f07%2fIMG_20170704_201342-01-970x1024.jpeg&ehk=g2rqYFv5mOhyGrFENwdDgOB%2fKi8MFWSmv8gN56YSS0A%3d&risl=&pid=ImgRaw&r=0" alt="Delhi Street Food" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
                </div>
                <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col justify-center relative bg-slate-900/40">
                    <div className="absolute top-0 left-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>
                    <h3 className="text-3xl font-bold text-white mb-4 font-serif-custom">The Culinary Capital</h3>
                    <p className="text-slate-300 leading-relaxed text-lg mb-4">
                        From the narrow, bustling lanes of <strong className="text-orange-400">Chandni Chowk</strong> offering mouth-watering street food like chaat, kebabs, and paranthas, to world-class fine dining, Delhi is an absolute paradise for food lovers.
                    </p>
                    <p className="text-slate-300 leading-relaxed text-lg mb-6">
                        The legendary Butter Chicken was born here, and no trip is complete without a plate of piping hot Chole Bhature from a local street vendor.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-400">Street Food</span>
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-400">Mughlai Cuisine</span>
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-400">Paranthe Wali Gali</span>
                    </div>
                </div>
            </div>

            {/* Card 3: Culture &amp; Markets */}
            <div className="glass-panel rounded-[32px] overflow-hidden border border-white/10 flex flex-col md:flex-row group">
                <div className="w-full md:w-5/12 h-64 md:h-auto overflow-hidden relative">
                    <img src="https://www.tripsavvy.com/thmb/cNNX1Dw5fSR1nVrZJTNoPurdWac=/2121x1414/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-458407639-a6cd3678660342f4b30dc09da8cefec2.jpg" alt="Delhi Markets" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" style={{ objectPosition: 'center' }}/>
                </div>
                <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col justify-center relative bg-slate-900/40">
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
                    <h3 className="text-3xl font-bold text-white mb-4 font-serif-custom">Vibrant Culture &amp; Markets</h3>
                    <p className="text-slate-300 leading-relaxed text-lg mb-4">
                        Delhi perfectly balances the old and the new. Shop for exquisite handicrafts from across the country at Dilli Haat, or experience the colonial charm and high-end brands of <strong className="text-blue-400">Connaught Place</strong>.
                    </p>
                    <p className="text-slate-300 leading-relaxed text-lg mb-6">
                        As the sun sets, lose yourself in the soulful Sufi qawwalis at Nizamuddin Dargah, experiencing the spiritual heartbeat of the city.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-400">Handicrafts</span>
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-400">Sufi Music</span>
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-400">Shopping Hubs</span>
                    </div>
                </div>
            </div>

        </div>

        {/* Must Visit Grid */}
        <div className="mt-12">
            <h2 className="text-4xl font-bold text-white mb-8 text-center font-serif-custom">Must-Visit Destinations</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Red Fort */}
                <div className="glass-panel p-4 rounded-3xl border border-white/10 hover:-translate-y-2 transition-transform duration-300 group cursor-pointer bg-slate-800/50">
                    <div className="w-full h-40 rounded-2xl overflow-hidden mb-4 relative">
                        <img src="https://cdn.britannica.com/20/189820-050-D650A54D/Red-Fort-Old-Delhi-India.jpg" alt="Red Fort" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2 text-center">Red Fort</h4>
                    <p className="text-sm text-slate-400 text-center px-2 pb-2">A majestic 17th-century Mughal fortress made entirely of red sandstone.</p>
                </div>

                {/* India Gate */}
                <div className="glass-panel p-4 rounded-3xl border border-white/10 hover:-translate-y-2 transition-transform duration-300 group cursor-pointer bg-slate-800/50">
                    <div className="w-full h-40 rounded-2xl overflow-hidden mb-4 relative">
                        <img src="https://images.unsplash.com/photo-1587474260584-136574528ed5?fit=crop&w=500&q=80" alt="India Gate" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2 text-center">India Gate</h4>
                    <p className="text-sm text-slate-400 text-center px-2 pb-2">An iconic 42-meter high war memorial honoring Indian soldiers.</p>
                </div>

                {/* Qutub Minar */}
                <div className="glass-panel p-4 rounded-3xl border border-white/10 hover:-translate-y-2 transition-transform duration-300 group cursor-pointer bg-slate-800/50">
                    <div className="w-full h-40 rounded-2xl overflow-hidden mb-4 relative">
                        <img src="https://www.gosahin.com/upload/destinations/1514913716_qutub-minar-1.jpg" alt="Qutub Minar" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2 text-center">Qutub Minar</h4>
                    <p className="text-sm text-slate-400 text-center px-2 pb-2">The tallest brick minaret in the world, surrounded by ancient ruins.</p>
                </div>

                {/* Lotus Temple */}
                <div className="glass-panel p-4 rounded-3xl border border-white/10 hover:-translate-y-2 transition-transform duration-300 group cursor-pointer bg-slate-800/50">
                    <div className="w-full h-40 rounded-2xl overflow-hidden mb-4 relative">
                        <img src="https://cdn.britannica.com/67/156667-050-62285333/Lotus-Temple-New-Delhi-India.jpg" alt="Lotus Temple" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2 text-center">Lotus Temple</h4>
                    <p className="text-sm text-slate-400 text-center px-2 pb-2">A stunning flower-like architectural marvel and Bahá'í House of Worship.</p>
                </div>
            </div>
        </div>

        {/* Call to Action Banner */}
        <div className="glass-panel rounded-[32px] p-8 md:p-12 border border-indigo-500/30 text-center relative overflow-hidden mt-8 mb-8 bg-gradient-to-br from-slate-900 to-indigo-950/40">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay"></div>
            
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 relative z-10 font-serif-custom">Ready to explore Delhi?</h2>
            <p className="text-slate-300 text-lg mb-10 max-w-2xl mx-auto relative z-10">Use our AI tools to instantly generate a custom itinerary, book flights, or reserve a luxury stay in the capital city.</p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
                <Link to="/tourism" className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(79,70,229,0.4)] flex items-center justify-center gap-2">
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
                <span className="font-extrabold text-2xl tracking-tight text-white">India<span className="text-indigo-500">Xplore</span></span>
            </Link>
            <div className="text-slate-500 text-sm font-medium">
                All rights reserved © IndiaXplore.co
            </div>
        </div>
    </footer>

    

        </div>
    );
};

export default Delhi;
