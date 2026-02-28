import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Sparkles, Building } from 'lucide-react';

const Bihar = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="antialiased bg-slate-900 text-slate-100 min-h-screen relative overflow-x-hidden">
            

    {/* Ambient Background */}
    <div className="fixed -z-10 blur-[90px] opacity-30 top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full animate-pulse" style={{backgroundColor: '#ea580c'}}></div>
    <div className="fixed -z-10 blur-[90px] opacity-30 bottom-[20%] right-[-10%] w-[50vw] h-[50vw] rounded-full animate-pulse delay-500" style={{backgroundColor: '#f59e0b'}}></div>
    <div className="fixed -z-10 blur-[90px] opacity-20 top-[40%] left-[20%] w-[30vw] h-[30vw] rounded-full animate-pulse delay-1000" style={{backgroundColor: '#dc2626'}}></div>

    {/* Minimal Navbar */}
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 glass-nav rounded-full px-6 py-3 w-[95%] max-w-7xl mx-auto flex justify-between items-center transition-all duration-300">
        <Link to="/" className="flex items-center gap-2">
            <span className="font-extrabold text-2xl tracking-tight text-white">India<span className="text-orange-500">Xplore</span></span>
        </Link>
        <Link to="/" className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors bg-white/5 px-4 py-2 rounded-full border border-white/10">
            <ArrowLeft className="w-4 h-4" /> Explore States
        </Link>
    </nav>

    <main className="pt-24 pb-20 px-4 sm:px-6 max-w-7xl mx-auto min-h-screen flex flex-col gap-12">
        
        {/* Hero Section */}
        <div className="relative w-full h-[60vh] md:h-[70vh] rounded-[40px] overflow-hidden shadow-2xl group border border-white/10 mt-4">
            {/* Background Image */}
            <img src="https://images.pexels.com/photos/6480363/pexels-photo-6480363.jpeg" alt="Mahabodhi Temple, Bodh Gaya" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" style={{ objectPosition: 'center' }}/>
            
            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/60 to-transparent"></div>
            
            {/* Content */}
            <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 flex flex-col items-center md:items-start text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-orange-300 font-semibold text-sm mb-6">
                    <MapPin className="w-4 h-4" /> East India
                </div>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-4 tracking-tight drop-shadow-xl font-serif-custom">Bihar</h1>
                <h2 className="text-2xl md:text-4xl font-bold text-gradient mb-6 font-serif-custom">The Land of Enlightenment</h2>
                <p className="text-lg md:text-xl text-slate-200 max-w-2xl leading-relaxed drop-shadow-md">
                    Journey through the birthplace of Buddhism, explore the ruins of the world's oldest university, and immerse yourself in a profoundly rich cultural heritage.
                </p>
            </div>
        </div>

        {/* Discover Cards Section */}
        <div className="flex flex-col gap-8 mt-4">
            
            {/* Card 1: Spiritual Awakening */}
            <div className="glass-panel rounded-[32px] overflow-hidden border border-white/10 flex flex-col md:flex-row group">
                <div className="w-full md:w-5/12 h-64 md:h-auto overflow-hidden relative">
                    <img src="https://wallpaperaccess.com/full/12039222.jpg" alt="Bodh Gaya" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0f172a]/80 md:hidden"></div>
                </div>
                <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col justify-center relative bg-slate-900/40">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>
                    <h3 className="text-3xl font-bold text-white mb-4 font-serif-custom">Spiritual Awakening</h3>
                    <p className="text-slate-300 leading-relaxed text-lg mb-6">
                        Bihar is the sacred land where Prince Siddhartha attained enlightenment under the Bodhi Tree to become the Buddha. <strong className="text-orange-400">Bodh Gaya</strong> and its magnificent Mahabodhi Temple complex draw pilgrims and peace-seekers from across the globe, offering an unparalleled atmosphere of tranquility and meditation.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-400">Mahabodhi Temple</span>
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-400">Buddhism</span>
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-400">Meditation</span>
                    </div>
                </div>
            </div>

            {/* Card 2: Ancient Wisdom (Reverse Layout on Desktop) */}
            <div className="glass-panel rounded-[32px] overflow-hidden border border-white/10 flex flex-col md:flex-row-reverse group">
                <div className="w-full md:w-5/12 h-64 md:h-auto overflow-hidden relative">
                    <img src="https://www.adotrip.com/public/images/areas/5c3dadfade39e-Nalanda%20University%20Ruins%20Sight%20Seeing%20Tour.jpg" alt="Nalanda University Ruins" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
                </div>
                <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col justify-center relative bg-slate-900/40">
                    <div className="absolute top-0 left-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
                    <h3 className="text-3xl font-bold text-white mb-4 font-serif-custom">Echoes of Ancient Wisdom</h3>
                    <p className="text-slate-300 leading-relaxed text-lg mb-4">
                        Walk through the massive red-brick ruins of <strong className="text-amber-400">Nalanda University</strong>, one of the world's first residential universities that attracted scholars from China, Korea, and Central Asia over a millennium ago.
                    </p>
                    <p className="text-slate-300 leading-relaxed text-lg mb-6">
                        Nearby is Rajgir, an ancient capital completely enclosed by hills, famous for the Vishwa Shanti Stupa, hot water springs, and deeply rooted connections to both Lord Buddha and Lord Mahavira.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-400">Nalanda</span>
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-400">Rajgir</span>
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-400">UNESCO Heritage</span>
                    </div>
                </div>
            </div>

            {/* Card 3: Cultural Tapestry */}
            <div className="glass-panel rounded-[32px] overflow-hidden border border-white/10 flex flex-col md:flex-row group">
                <div className="w-full md:w-5/12 h-64 md:h-auto overflow-hidden relative">
                    <img src="https://e1.pxfuel.com/desktop-wallpaper/678/914/desktop-wallpaper-mithila-painting-training-centre-madhubani-paintings-madhubani-art.jpg" alt="Bihari Culture and Cuisine" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" style={{ objectPosition: 'center' }}/>
                </div>
                <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col justify-center relative bg-slate-900/40">
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>
                    <h3 className="text-3xl font-bold text-white mb-4 font-serif-custom">A Vibrant Cultural Canvas</h3>
                    <p className="text-slate-300 leading-relaxed text-lg mb-4">
                        Bihar's culture is as colorful as the intricate <strong className="text-red-400">Madhubani paintings</strong> created by its local artisans, famous worldwide for their striking geometric patterns and natural dyes.
                    </p>
                    <p className="text-slate-300 leading-relaxed text-lg mb-6">
                        Experience the massive, spiritually uplifting Chhath Puja by the riverbanks, and savor the state's rustic, mouth-watering signature dish: smoky, ghee-soaked <strong className="text-amber-400">Litti Chokha</strong>.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-400">Madhubani Art</span>
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-400">Litti Chokha</span>
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-400">Chhath Puja</span>
                    </div>
                </div>
            </div>

        </div>

        {/* Must Visit Grid */}
        <div className="mt-12">
            <h2 className="text-4xl font-bold text-white mb-8 text-center font-serif-custom">Must-Visit Destinations</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Bodh Gaya */}
                <div className="glass-panel p-4 rounded-3xl border border-white/10 hover:-translate-y-2 transition-transform duration-300 group cursor-pointer bg-slate-800/50">
                    <div className="w-full h-40 rounded-2xl overflow-hidden mb-4 relative">
                        <img src="https://famoustemplesofindia.com/wp-content/uploads/2024/05/Mahabodhi-Temple-Bodh-Gaya-1.jpg" alt="Bodh Gaya" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2 text-center">Bodh Gaya</h4>
                    <p className="text-sm text-slate-400 text-center px-2 pb-2">The holiest site in Buddhism, home to the revered Mahabodhi Temple and Bodhi Tree.</p>
                </div>

                {/* Nalanda */}
                <div className="glass-panel p-4 rounded-3xl border border-white/10 hover:-translate-y-2 transition-transform duration-300 group cursor-pointer bg-slate-800/50">
                    <div className="w-full h-40 rounded-2xl overflow-hidden mb-4 relative">
                        <img src="https://www.re-thinkingthefuture.com/wp-content/uploads/2024/06/A12713-UNESCO-World-Heritage-Sites-Archaeological-Site-of-Nalanda-Mahavihara-at-Nalanda-Bihar-Image-1.jpg" alt="Nalanda" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2 text-center">Nalanda</h4>
                    <p className="text-sm text-slate-400 text-center px-2 pb-2">An ancient center of learning, featuring sprawling red-brick ruins and stupas.</p>
                </div>

                {/* Rajgir */}
                <div className="glass-panel p-4 rounded-3xl border border-white/10 hover:-translate-y-2 transition-transform duration-300 group cursor-pointer bg-slate-800/50">
                    <div className="w-full h-40 rounded-2xl overflow-hidden mb-4 relative">
                        <img src="https://www.recipe4travel.com/wp-content/uploads/2016/07/11286128306_4176d3ba24_o001-1024x768.jpg" alt="Rajgir" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2 text-center">Rajgir</h4>
                    <p className="text-sm text-slate-400 text-center px-2 pb-2">A scenic, valley-surrounded town famous for the Vishwa Shanti Stupa and hot springs.</p>
                </div>

                {/* Patna */}
                <div className="glass-panel p-4 rounded-3xl border border-white/10 hover:-translate-y-2 transition-transform duration-300 group cursor-pointer bg-slate-800/50">
                    <div className="w-full h-40 rounded-2xl overflow-hidden mb-4 relative">
                        <img src="https://www.adotrip.com/public/images/city/master_images/5e4a32806ff99-Patna_Travel.jpg" alt="Patna" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2 text-center">Patna</h4>
                    <p className="text-sm text-slate-400 text-center px-2 pb-2">The bustling capital along the Ganges, with a history dating back to ancient Pataliputra.</p>
                </div>
            </div>
        </div>

        {/* Call to Action Banner */}
        <div className="glass-panel rounded-[32px] p-8 md:p-12 border border-orange-500/30 text-center relative overflow-hidden mt-8 mb-8 bg-gradient-to-br from-slate-900 to-orange-950/40">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay"></div>
            
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 relative z-10 font-serif-custom">Ready to explore Bihar?</h2>
            <p className="text-slate-300 text-lg mb-10 max-w-2xl mx-auto relative z-10">Use our AI tools to instantly generate a custom itinerary, book flights to Patna or Gaya, and plan your spiritual journey.</p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
                <Link to="/tourism" className="px-8 py-4 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(234,88,12,0.4)] flex items-center justify-center gap-2">
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
                <span className="font-extrabold text-2xl tracking-tight text-white">India<span className="text-orange-500">Xplore</span></span>
            </Link>
            <div className="text-slate-500 text-sm font-medium">
                All rights reserved © IndiaXplore.co
            </div>
        </div>
    </footer>

    

        </div>
    );
};

export default Bihar;
