import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, CalendarDays, Sun, Calendar, CalendarCheck, Sparkles, AlertCircle, Camera, Map, Info, Receipt, Plane, Hotel, Utensils, ShieldCheck, CreditCard } from 'lucide-react';

const Jaipur = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="antialiased bg-slate-900 text-slate-100 min-h-screen relative overflow-x-hidden">
            

    {/* Ambient Background */}
    <div className="fixed -z-10 blur-[90px] opacity-30 top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full animate-pulse" style={{backgroundColor: '#4f46e5'}}></div>
    <div className="fixed -z-10 blur-[90px] opacity-30 bottom-[20%] right-[-10%] w-[50vw] h-[50vw] rounded-full animate-pulse delay-500" style={{backgroundColor: '#ec4899'}}></div>

    {/* Minimal Navbar */}
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 glass-nav rounded-full px-6 py-3 w-[95%] max-w-7xl mx-auto flex justify-between items-center transition-all duration-300">
        <Link to="/" className="flex items-center gap-2">
            <span className="font-extrabold text-2xl tracking-tight text-white">India<span className="text-orange-accent">Xplore</span></span>
        </Link>
        <Link to="/" className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors bg-white/5 px-4 py-2 rounded-full">
            <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
    </nav>

    {/* Main Content Layout */}
    <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto min-h-screen">
        <div className="flex flex-col lg:flex-row gap-10 items-start">
            
            {/* Left Side: Sticky Image &amp; Quick Info */}
            <div className="w-full lg:w-5/12 lg:sticky lg:top-32 relative">
                <div className="glass-panel rounded-[32px] p-3 overflow-hidden">
                    <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
                        <img src="https://images.unsplash.com/photo-1477587458883-47145ed94245?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Jaipur, Rajasthan" className="w-full h-full object-cover"/>
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent"></div>
                        
                        <div className="absolute bottom-8 left-8 right-8">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs font-semibold uppercase tracking-wider mb-3">
                                <MapPin className="w-3 h-3" /> Rajasthan
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 shadow-sm">Jaipur</h1>
                            <p className="text-slate-200 text-sm font-medium opacity-90">The Pink City of India</p>
                        </div>
                    </div>
                </div>

                {/* Info Cards under image */}
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="glass-panel p-4 rounded-2xl flex flex-col items-center justify-center text-center">
                        <CalendarDays className="w-6 h-6 text-orange-accent mb-2" />
                        <span className="text-xs text-slate-400 uppercase tracking-widest">Duration</span>
                        <span className="font-bold text-lg">10 Days</span>
                    </div>
                    <div className="glass-panel p-4 rounded-2xl flex flex-col items-center justify-center text-center">
                        <Sun className="w-6 h-6 text-yellow-400 mb-2" />
                        <span className="text-xs text-slate-400 uppercase tracking-widest">Best Time</span>
                        <span className="font-bold text-lg">Oct - Mar</span>
                    </div>
                </div>
            </div>

            {/* Right Side: AI Planning &amp; Itinerary */}
            <div className="w-full lg:w-7/12 flex flex-col gap-6">
                
                {/* Setup Card */}
                <div className="glass-panel rounded-[32px] p-8 md:p-10 border-t border-white/20 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-accent/10 rounded-full blur-3xl"></div>
                    
                    <h2 className="text-3xl font-bold mb-2">Plan Your Journey</h2>
                    <p className="text-slate-400 text-sm mb-8">Enter your starting location and our AI will craft a personalized itinerary, highlight must-visit spots, and estimate your travel costs.</p>
                    
                    <div className="flex flex-col gap-4 mb-6">
                        <div className="relative w-full">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <MapPin className="w-5 h-5 text-slate-500" />
                            </div>
                            <input type="text" id="start-location" placeholder="Where are you traveling from? (e.g. Mumbai, London)" 
                                className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:border-orange-accent transition-colors placeholder-slate-500"/>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="relative flex-1">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Calendar className="w-5 h-5 text-slate-500" />
                                </div>
                                <input type="date" id="start-date" style={{ colorScheme: 'dark' }}
                                    className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:border-orange-accent transition-colors text-sm"/>
                            </div>
                            <div className="relative flex-1">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <CalendarCheck className="w-5 h-5 text-slate-500" />
                                </div>
                                <input type="date" id="end-date" style={{ colorScheme: 'dark' }}
                                    className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:border-orange-accent transition-colors text-sm"/>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div id="trip-summary" className="text-sm flex items-center gap-2">
                            {/* Populated by JS */}
                        </div>
                        <button onclick="generateItinerary()" id="generate-btn" className="w-full sm:w-auto bg-orange-accent hover:bg-orange-500 text-white font-bold py-4 px-8 rounded-xl shadow-[0_0_20px_rgba(241,165,1,0.3)] transition-all flex items-center justify-center gap-2 whitespace-nowrap">
                            <Sparkles className="w-5 h-5" /> Generate Plan
                        </button>
                    </div>

                    {/* Loading State */}
                    <div id="loading-state" className="hidden flex-col items-center justify-center py-10 mt-4">
                        <span className="loader w-10 h-10 mb-4"></span>
                        <p className="text-orange-accent font-medium animate-pulse">Crafting your perfect Jaipur experience...</p>
                        <p className="text-xs text-slate-500 mt-2">Checking flights, hotels, and local dining...</p>
                    </div>
                    
                    {/* Error State */}
                    <div id="error-state" className="hidden bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mt-6 text-sm flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                        <span id="error-message">Failed to generate itinerary. Please try again.</span>
                    </div>
                </div>

                {/* Results Container (Hidden by default) */}
                <div id="results-container" className="hidden flex-col gap-6">
                    
                    {/* Highlights Section */}
                    <div className="glass-panel rounded-3xl p-8">
                        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2"><Camera className="text-orange-accent" /> Key Highlights</h3>
                        <div id="highlights-list" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Populated by JS */}
                        </div>
                    </div>

                    {/* Itinerary Section */}
                    <div className="glass-panel rounded-3xl p-8">
                        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2"><Map className="text-orange-accent" /> Your Itinerary</h3>
                        
                        {/* Communication/Transport Tip */}
                        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 mb-8 flex gap-4">
                            <Info className="w-6 h-6 text-blue-400 shrink-0" />
                            <p id="comm-tips" className="text-sm text-slate-300 leading-relaxed"></p>
                        </div>

                        <div id="itinerary-timeline" className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent">
                            {/* Populated by JS */}
                        </div>
                    </div>

                    {/* Cost Breakdown &amp; Pay Button */}
                    <div className="glass-panel rounded-3xl p-8 border border-green-500/30 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl pointer-events-none"></div>
                        
                        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2"><Receipt className="text-green-400" /> Cost Estimate</h3>
                        
                        <div className="bg-slate-900/60 rounded-2xl p-6 mb-8 border border-slate-700">
                            <div className="space-y-4 text-sm font-medium">
                                <div className="flex justify-between items-center pb-4 border-b border-slate-700/50">
                                    <span className="text-slate-400 flex items-center gap-2"><Plane className="w-4 h-4" /> Flights/Transport</span>
                                    <span id="cost-transport" className="text-white">₹0</span>
                                </div>
                                <div className="flex justify-between items-center pb-4 border-b border-slate-700/50">
                                    <span className="text-slate-400 flex items-center gap-2"><Hotel className="w-4 h-4" /> <span id="hotel-days-label">Accommodations (10 Days)</span></span>
                                    <span id="cost-hotel" className="text-white">₹0</span>
                                </div>
                                <div className="flex justify-between items-center pb-4 border-b border-slate-700/50">
                                    <span className="text-slate-400 flex items-center gap-2"><Utensils className="w-4 h-4" /> Dining &amp; Local Activities</span>
                                    <span id="cost-food" className="text-white">₹0</span>
                                </div>
                                <div className="flex justify-between items-center pb-4 border-b border-slate-700/50">
                                    <span className="text-slate-400 flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> IndiaXplore Platform Fee</span>
                                    <span id="cost-fee" className="text-white">₹499</span>
                                </div>
                                <div className="flex justify-between items-center pt-2 text-lg">
                                    <span className="text-white font-bold">Total Estimated Cost</span>
                                    <span id="cost-total" className="text-green-400 font-bold text-2xl">₹0</span>
                                </div>
                                <p className="text-xs text-slate-500 text-right mt-1">*Prices are estimated based on your origin.</p>
                            </div>
                        </div>

                        <button className="w-full bg-green-500 hover:bg-green-400 text-slate-900 font-bold text-lg py-5 rounded-xl shadow-[0_0_25px_rgba(34,197,94,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer group">
                            <CreditCard className="w-6 h-6 group-hover:scale-110 transition-transform" />
                            Pay <span id="btn-total">₹0</span> Now
                        </button>
                    </div>

                </div>
            </div>
        </div>
    </main>

    

        </div>
    );
};

export default Jaipur;
