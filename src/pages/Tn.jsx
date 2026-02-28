import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Sparkles, Building } from 'lucide-react';

const Tn = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="antialiased bg-slate-900 text-slate-100 min-h-screen relative overflow-x-hidden">
            

    {/* Ambient Background */}
    <div className="fixed -z-10 blur-[90px] opacity-30 top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full animate-pulse" style={{backgroundColor: '#0d9488'}}></div>
    <div className="fixed -z-10 blur-[90px] opacity-30 bottom-[20%] right-[-10%] w-[50vw] h-[50vw] rounded-full animate-pulse delay-500" style={{backgroundColor: '#d97706'}}></div>
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
            <img src="https://images.unsplash.com/photo-1582510003544-4d00b7f74220?fit=crop&w=1600&q=80" alt="Chennai Temple, Tamil Nadu" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" style={{ objectPosition: 'center' }}/>
            
            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/60 to-transparent"></div>
            
            {/* Content */}
            <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 flex flex-col items-center md:items-start text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-teal-300 font-semibold text-sm mb-6">
                    <MapPin className="w-4 h-4" /> South India
                </div>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-4 tracking-tight drop-shadow-xl font-serif-custom">Tamil Nadu</h1>
                <h2 className="text-2xl md:text-4xl font-bold text-gradient mb-6 font-serif-custom">Land of Temples &amp; Traditions</h2>
                <p className="text-lg md:text-xl text-slate-200 max-w-2xl leading-relaxed drop-shadow-md">
                    A mesmerizing blend of ancient Dravidian architecture, pristine coastlines, vibrant classical arts, and a deeply rooted cultural heritage.
                </p>
            </div>
        </div>

        {/* Discover Cards Section */}
        <div className="flex flex-col gap-8 mt-4">
            
            {/* Card 1: Dravidian Masterpieces */}
            <div className="glass-panel rounded-[32px] overflow-hidden border border-white/10 flex flex-col md:flex-row group">
                <div className="w-full md:w-5/12 h-64 md:h-auto overflow-hidden relative">
                    <img src="https://www.poojn.in/wp-content/uploads/2025/03/Dravidian-Temple-Architecture-A-Detailed-Guide.jpeg.jpg" alt="Dravidian Temple" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0f172a]/80 md:hidden"></div>
                </div>
                <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col justify-center relative bg-slate-900/40">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
                    <h3 className="text-3xl font-bold text-white mb-4 font-serif-custom">Dravidian Masterpieces</h3>
                    <p className="text-slate-300 leading-relaxed text-lg mb-6">
                        Tamil Nadu is the spiritual heart of South India, boasting some of the most spectacular temple architecture in the world. Marvel at the towering, colorful gopurams of the <strong className="text-amber-400">Meenakshi Amman Temple</strong> in Madurai, or the sheer grandeur of the Brihadeeswara Temple in Thanjavur, a UNESCO World Heritage site.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-400">UNESCO Heritage</span>
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-400">Ancient Temples</span>
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-400">Architecture</span>
                    </div>
                </div>
            </div>

            {/* Card 2: Culinary Symphony (Reverse Layout on Desktop) */}
            <div className="glass-panel rounded-[32px] overflow-hidden border border-white/10 flex flex-col md:flex-row-reverse group">
                <div className="w-full md:w-5/12 h-64 md:h-auto overflow-hidden relative">
                    <img src="https://www.mistay.in/travel-blog/content/images/2020/06/Tamil-cuisine-cover.jpg" alt="South Indian Food" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
                </div>
                <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col justify-center relative bg-slate-900/40">
                    <div className="absolute top-0 left-0 w-32 h-32 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
                    <h3 className="text-3xl font-bold text-white mb-4 font-serif-custom">A Symphony of Flavors</h3>
                    <p className="text-slate-300 leading-relaxed text-lg mb-4">
                        The culinary landscape of Tamil Nadu is a true delight. Start your morning with steaming idlis, crispy <strong className="text-teal-400">dosas</strong>, and aromatic sambar, followed closely by a frothy cup of traditional South Indian Filter Coffee.
                    </p>
                    <p className="text-slate-300 leading-relaxed text-lg mb-6">
                        For those seeking bold flavors, the fiery and aromatic <strong className="text-teal-400">Chettinad cuisine</strong> offers an unforgettable experience of freshly ground spices and rich gravies.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-400">Chettinad Cuisine</span>
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-400">Filter Coffee</span>
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-400">Vegetarian Delights</span>
                    </div>
                </div>
            </div>

            {/* Card 3: Arts &amp; Coastlines */}
            <div className="glass-panel rounded-[32px] overflow-hidden border border-white/10 flex flex-col md:flex-row group">
                <div className="w-full md:w-5/12 h-64 md:h-auto overflow-hidden relative">
                    <img src="https://th.bing.com/th/id/R.bd735519b525bd5b36c97fd7d3c53201?rik=Jlp8u%2ffe6cdU6Q&riu=http%3a%2f%2fwww.lifeberrys.com%2fimg%2farticle%2fkovalam-1603018379-lb.jpg&ehk=WDQPGnYG8BErldz8ZkQv9vYZDb0yoxDBRvDHonH8wYA%3d&risl=&pid=ImgRaw&r=0" alt="Marina Beach" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" style={{ objectPosition: 'center' }}/>
                </div>
                <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col justify-center relative bg-slate-900/40">
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none"></div>
                    <h3 className="text-3xl font-bold text-white mb-4 font-serif-custom">Classical Arts &amp; Coastlines</h3>
                    <p className="text-slate-300 leading-relaxed text-lg mb-4">
                        Tamil Nadu is a bastion of classical Indian arts. It is the birthplace of the graceful <strong className="text-cyan-400">Bharatanatyam</strong> dance and soulful Carnatic music, deeply woven into the fabric of daily life.
                    </p>
                    <p className="text-slate-300 leading-relaxed text-lg mb-6">
                        Beyond the arts, the state features stunning coastlines. Take an evening stroll along Chennai's massive Marina Beach, or watch the ocean converge at Kanyakumari, the southernmost tip of India.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-400">Marina Beach</span>
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-400">Classical Dance</span>
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-400">Kanyakumari</span>
                    </div>
                </div>
            </div>

        </div>

        {/* Must Visit Grid */}
        <div className="mt-12">
            <h2 className="text-4xl font-bold text-white mb-8 text-center font-serif-custom">Must-Visit Destinations</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Chennai */}
                <div className="glass-panel p-4 rounded-3xl border border-white/10 hover:-translate-y-2 transition-transform duration-300 group cursor-pointer bg-slate-800/50">
                    <div className="w-full h-40 rounded-2xl overflow-hidden mb-4 relative">
                        <img src="https://www.fodors.com/wp-content/uploads/2019/12/04_ChennaiArchitecture__GroupofMonuments_shutterstock_700441387.jpg" alt="Chennai" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2 text-center">Chennai</h4>
                    <p className="text-sm text-slate-400 text-center px-2 pb-2">The bustling capital, home to Marina Beach and deep-rooted cultural heritage.</p>
                </div>

                {/* Madurai */}
                <div className="glass-panel p-4 rounded-3xl border border-white/10 hover:-translate-y-2 transition-transform duration-300 group cursor-pointer bg-slate-800/50">
                    <div className="w-full h-40 rounded-2xl overflow-hidden mb-4 relative">
                        <img src="https://th.bing.com/th/id/R.25871341e7c5a494163d631fcdc29869?rik=i6Bj5VWlpBEkJw&riu=http%3a%2f%2fwww.emperortraveline.com%2fwp-content%2fuploads%2f2017%2f11%2fmadurai-meenakshi-temple.jpg&ehk=aDBA2ENMkmm36ENO%2fUN%2f6U%2fuBETFWEysbOnG7gjrN6A%3d&risl=&pid=ImgRaw&r=0" alt="Madurai" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2 text-center">Madurai</h4>
                    <p className="text-sm text-slate-400 text-center px-2 pb-2">The Athens of the East, famous globally for the Meenakshi Amman Temple.</p>
                </div>

                {/* Ooty */}
                <div className="glass-panel p-4 rounded-3xl border border-white/10 hover:-translate-y-2 transition-transform duration-300 group cursor-pointer bg-slate-800/50">
                    <div className="w-full h-40 rounded-2xl overflow-hidden mb-4 relative">
                        <img src="https://static.toiimg.com/photo/msid-65754989,width-96,height-65.cms" alt="Ooty" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2 text-center">Ooty</h4>
                    <p className="text-sm text-slate-400 text-center px-2 pb-2">A picturesque hill station known for its tea gardens and heritage mountain railway.</p>
                </div>

                {/* Mahabalipuram */}
                <div className="glass-panel p-4 rounded-3xl border border-white/10 hover:-translate-y-2 transition-transform duration-300 group cursor-pointer bg-slate-800/50">
                    <div className="w-full h-40 rounded-2xl overflow-hidden mb-4 relative">
                        <img src="https://www.tripsavvy.com/thmb/xr_UdfffyqgA0xH4NWaCfsHWUgk=/1989x1326/filters:fill(auto,1)/GettyImages-579760012-b78004a355354623924eda63842ac3a9.jpg" alt="Mahabalipuram" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2 text-center">Mahabalipuram</h4>
                    <p className="text-sm text-slate-400 text-center px-2 pb-2">An ancient coastal town renowned for its intricate rock-cut monuments and shore temples.</p>
                </div>
            </div>
        </div>

        {/* Call to Action Banner */}
        <div className="glass-panel rounded-[32px] p-8 md:p-12 border border-teal-500/30 text-center relative overflow-hidden mt-8 mb-8 bg-gradient-to-br from-slate-900 to-teal-950/40">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay"></div>
            
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 relative z-10 font-serif-custom">Ready to explore Tamil Nadu?</h2>
            <p className="text-slate-300 text-lg mb-10 max-w-2xl mx-auto relative z-10">Use our AI tools to instantly generate a custom itinerary, book flights, or reserve a luxury stay near the coastal temples.</p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
                <Link to="/tourism" className="px-8 py-4 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(20,184,166,0.4)] flex items-center justify-center gap-2">
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

export default Tn;
