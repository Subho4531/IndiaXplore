import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackgroundBlobs from '../components/BackgroundBlobs';
import { Compass, Navigation, Map, Stethoscope, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
    const [typewriterText, setTypewriterText] = useState('');
    const [currentTesti, setCurrentTesti] = useState(0);
    const fullText = "Embark on an unforgettable journey through the vibrant landscapes, rich heritage, and diverse cultures of India. Your unified gateway to seamless travel experiences.";

    // Typewriter effect
    useEffect(() => {
        let index = 0;
        const timer = setInterval(() => {
            if (index <= fullText.length) {
                setTypewriterText(fullText.slice(0, index));
                index++;
            } else {
                clearInterval(timer);
            }
        }, 35);
        return () => clearInterval(timer);
    }, []);

    // Testimonial slider
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTesti((prev) => (prev + 1) % 3);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const getTestiClass = (index) => {
        if (index === currentTesti) return 'testi-state-1';
        if (index === (currentTesti + 1) % 3) return 'testi-state-2';
        return 'testi-state-3';
    };

    return (
        <div className="antialiased selection:bg-orange-accent selection:text-white">
            <BackgroundBlobs />
            <Navbar />

            <main className="pt-32 pb-24">
                {/* 1. Hero Section */}
                <section id="hero" className="min-h-[85vh] flex items-center justify-center px-6 pt-10">
                    <div className="max-w-7xl w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-20 reveal active">
                        {/* Hero Text */}
                        <div className="flex-1 text-center lg:text-left">
                            <h3 className="text-coral font-bold tracking-widest uppercase text-sm md:text-base mb-6">
                                Best Destinations Around India
                            </h3>
                            <h1 className="text-5xl md:text-7xl lg:text-[80px] font-bold mb-8 leading-[1.1] text-white font-serif">
                                Travel, <span>enjoy</span><br />
                                and live a new<br />
                                and full life
                            </h1>
                            <p className="text-lg text-slate-300 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed min-h-[90px]">
                                <span>{typewriterText}</span><span className="animate-pulse font-light text-orange-accent">|</span>
                            </p>
                            <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
                                <a href="#destinations" className="px-8 py-4 rounded-xl bg-orange-accent hover:bg-orange-500 text-white font-semibold transition-all shadow-[0_10px_20px_rgba(241,165,1,0.3)]">
                                    Find out more
                                </a>
                            </div>
                        </div>

                        {/* Hero Image Element */}
                        <div className="flex-1 relative w-full max-w-lg lg:max-w-none">
                            <div className="absolute top-10 -left-10 w-24 h-24 bg-blue-500/30 rounded-full blur-2xl"></div>
                            <div className="absolute bottom-10 -right-10 w-32 h-32 bg-orange-500/20 rounded-full blur-2xl"></div>

                            <div className="glass-panel rounded-[40px] p-4 relative z-10 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                                <img src="/India Map.png" alt="Traveler enjoying view" className="rounded-[32px] w-full h-[500px] object-cover" />

                                {/* Floating Badges */}
                                <div className="absolute top-12 -left-4 md:-left-12 glass-panel bg-slate-800/95 px-5 py-4 rounded-2xl flex items-center gap-4 shadow-2xl z-20 border border-white/20">
                                    <div className="bg-emerald-500/20 p-2 rounded-full text-emerald-400">
                                        <Compass className="w-6 h-6" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs text-slate-400 uppercase tracking-wider mb-0.5">Discover</span>
                                        <span className="text-sm font-bold text-white">Incredible India</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. Services Section */}
                <section id="services" className="py-24 px-6 relative z-10">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16 reveal active">
                            <h3 className="text-slate-400 font-semibold tracking-widest uppercase text-sm mb-3">Category</h3>
                            <h2 className="text-4xl md:text-5xl font-bold text-white font-serif">We Offer Best Services</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="rounded-3xl p-10 text-center reveal active transition-all duration-300 flex flex-col items-center bg-gradient-to-b from-[#3b3281]/90 to-[#2b2566]/90 border border-white/5 shadow-xl hover:-translate-y-2 hover:shadow-2xl">
                                <div className="w-16 h-16 mb-6 flex items-center justify-center">
                                    <img src="/plane-svgrepo-com.png" alt="Best Flights" className="w-16 h-16 object-contain drop-shadow-md" />
                                </div>
                                <h4 className="text-xl font-bold mb-4 text-white">Best Flights</h4>
                                <p className="text-slate-300/80 text-sm leading-relaxed">Find the most convenient and affordable domestic and international flights tailored to your schedule.</p>
                            </div>
                            <div className="rounded-3xl p-10 text-center reveal active transition-all duration-300 flex flex-col items-center bg-gradient-to-b from-[#2c657d]/90 to-[#1e485a]/90 border border-white/5 shadow-xl hover:-translate-y-2 hover:shadow-2xl">
                                <div className="w-16 h-16 mb-6 flex items-center justify-center">
                                    <img src="/mic-karaoke-svgrepo-com.png" alt="Local Events" className="w-16 h-16 object-contain drop-shadow-md" />
                                </div>
                                <h4 className="text-xl font-bold mb-4 text-white">Local Events</h4>
                                <p className="text-slate-300/80 text-sm leading-relaxed">Discover vibrant cultural festivals, local concerts, and exclusive events across the country.</p>
                            </div>
                            <div className="rounded-3xl p-10 text-center reveal active transition-all duration-300 flex flex-col items-center bg-gradient-to-b from-[#336d94]/90 to-[#254f6f]/90 border border-white/5 shadow-xl hover:-translate-y-2 hover:shadow-2xl">
                                <div className="w-16 h-16 mb-6 flex items-center justify-center">
                                    <img src="/settings-cogwheel-svgrepo-com.png" alt="Customization" className="w-16 h-16 object-contain drop-shadow-md" />
                                </div>
                                <h4 className="text-xl font-bold mb-4 text-white">Customization</h4>
                                <p className="text-slate-300/80 text-sm leading-relaxed">Tailor your itinerary perfectly to suit your specific preferences, timeline, and travel goals.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. Top Destinations Section */}
                <section id="destinations" className="py-24 px-6 relative">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16 reveal active">
                            <h3 className="text-slate-400 font-semibold tracking-widest uppercase text-sm mb-3">Top Selling</h3>
                            <h2 className="text-4xl md:text-5xl font-bold text-white font-serif">Top Destinations</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                            <Link to="/states/rajasthan" className="block glass-panel rounded-[32px] overflow-hidden group reveal active cursor-pointer hover:-translate-y-2 transition-transform duration-300">
                                <div className="h-80 overflow-hidden relative">
                                    <img src="https://images.unsplash.com/photo-1477587458883-47145ed94245?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Jaipur" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                </div>
                                <div className="p-8 bg-slate-900/60 backdrop-blur-md relative border-t border-white/5">
                                    <div className="flex justify-between items-center mb-4 text-lg text-slate-200 font-medium">
                                        <span>Jaipur, Rajasthan</span>
                                        <span>₹25k</span>
                                    </div>
                                    <div className="flex items-center text-slate-400 text-sm gap-3">
                                        <Navigation className="w-4 h-4" />
                                        <span>10 Days Trip</span>
                                    </div>
                                </div>
                            </Link>
                            <Link to="/states/uttar-pradesh" className="block glass-panel rounded-[32px] overflow-hidden group reveal active cursor-pointer hover:-translate-y-2 transition-transform duration-300">
                                <div className="h-80 overflow-hidden relative">
                                    <img src="https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80&w=800" alt="Agra" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                </div>
                                <div className="p-8 bg-slate-900/60 backdrop-blur-md relative border-t border-white/5">
                                    <div className="flex justify-between items-center mb-4 text-lg text-slate-200 font-medium">
                                        <span>Agra, UP</span>
                                        <span>₹18k</span>
                                    </div>
                                    <div className="flex items-center text-slate-400 text-sm gap-3">
                                        <Navigation className="w-4 h-4" />
                                        <span>7 Days Trip</span>
                                    </div>
                                </div>
                            </Link>
                            <Link to="/states/kerala" className="block glass-panel rounded-[32px] overflow-hidden group reveal active cursor-pointer hover:-translate-y-2 transition-transform duration-300">
                                <div className="h-80 overflow-hidden relative">
                                    <img src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=800" alt="Kerala" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                </div>
                                <div className="p-8 bg-slate-900/60 backdrop-blur-md relative border-t border-white/5">
                                    <div className="flex justify-between items-center mb-4 text-lg text-slate-200 font-medium">
                                        <span>Kerala Backwaters</span>
                                        <span>₹40k</span>
                                    </div>
                                    <div className="flex items-center text-slate-400 text-sm gap-3">
                                        <Navigation className="w-4 h-4" />
                                        <span>15 Days Trip</span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* 4. Tourism Section */}
                <section id="tourism" className="py-24 flex items-center justify-center px-6">
                    <div className="max-w-7xl mx-auto w-full flex justify-end">
                        <div className="glass-panel rounded-[2rem] p-8 md:p-10 max-w-4xl w-full reveal active flex flex-col md:flex-row items-center gap-10 hover:shadow-2xl transition-all duration-500">
                            <div className="flex-1">
                                <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6 ring-1 ring-emerald-500/30">
                                    <Compass className="w-7 h-7" />
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold mb-4">Tourism Portal</h2>
                                <h3 className="text-lg text-emerald-300 font-medium mb-4">Discover the Colors of India</h3>
                                <p className="text-slate-300 text-base leading-relaxed mb-8">
                                    Visiting a specific state for leisure or cultural exploration? Connect directly with state-specific tourism boards to book authorized local experiences and plan your itinerary securely.
                                </p>
                                <Link to="/tourism" className="inline-block px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium transition-colors shadow-[0_10px_20px_rgba(16,185,129,0.2)] text-sm">
                                    Explore State Portals
                                </Link>
                            </div>
                            <div className="w-full md:w-5/12 aspect-[4/5] rounded-3xl overflow-hidden relative border border-white/10 group">
                                <img src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800" alt="India Tourism" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
                                <div className="absolute bottom-6 left-6 right-6 flex items-center gap-3">
                                    <Map className="w-6 h-6 text-emerald-400" />
                                    <span className="text-white font-medium text-sm tracking-widest uppercase">Interactive Map</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 5. Medical Section */}
                <section id="medical" className="py-24 flex items-center justify-center px-6">
                    <div className="max-w-7xl mx-auto w-full flex justify-start">
                        <div className="glass-panel rounded-[2rem] p-8 md:p-10 max-w-4xl w-full reveal active flex flex-col md:flex-row-reverse items-center gap-10 border-t-4 border-t-rose-500/50 hover:shadow-2xl transition-all duration-500">
                            <div className="flex-1">
                                <div className="w-14 h-14 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center mb-6 ring-1 ring-rose-500/30">
                                    <Stethoscope className="w-7 h-7" />
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold mb-4">Medical Visits</h2>
                                <h3 className="text-lg text-rose-300 font-medium mb-4">World-Class Care & Healing</h3>
                                <p className="text-slate-300 text-base leading-relaxed mb-8">
                                    Traveling for healthcare? India offers globally recognized medical treatments and ancient wellness traditions. Apply for your medical e-Visa, and coordinate appointments with accredited hospitals.
                                </p>
                                <Link to="/medical" className="inline-block px-6 py-3 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-medium transition-colors shadow-[0_10px_20px_rgba(244,63,94,0.2)] text-sm">
                                    Find Healthcare
                                </Link>
                            </div>
                            <div className="w-full md:w-5/12 aspect-[4/5] rounded-3xl overflow-hidden relative border border-white/10 group">
                                <img src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&q=80&w=800" alt="Healthcare in India" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
                                <div className="absolute bottom-6 left-6 right-6 flex items-center gap-3">
                                    <Activity className="w-6 h-6 text-rose-400" />
                                    <span className="text-white font-medium text-sm tracking-widest uppercase">Accredited Hospitals</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 6. Travel Pass Section */}
                <section id="pass" className="py-24 flex items-center justify-center px-6">
                    <div className="max-w-7xl mx-auto w-full flex justify-end">
                        <div className="glass-panel rounded-[2rem] p-8 md:p-12 max-w-4xl w-full reveal active flex flex-col md:flex-row items-center gap-12 relative overflow-hidden hover:shadow-2xl transition-all duration-500">
                            <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

                            <div className="flex-1 relative z-10">
                                <div className="w-14 h-14 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-6 ring-1 ring-blue-500/30">
                                    <img src="/scan-qrcode-ecommerce-svgrepo-com.png" alt="QR Scanner" className="w-8 h-8 object-contain drop-shadow-md" />
                                </div>

                                <h2 className="text-3xl md:text-4xl font-bold mb-4">Digital Travel Pass</h2>
                                <h3 className="text-lg text-blue-300 font-medium mb-4">Replaces Physical Govt. IDs</h3>

                                <p className="text-slate-300 text-base leading-relaxed mb-8">
                                    Your ultimate authentication tool. Instead of presenting physical IDs at every checkpoint, simply scan your secure dynamic QR code to verify your identity seamlessly at airports and monuments.
                                </p>

                                <Link to="/travel-pass" className="inline-block px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors shadow-[0_10px_20px_rgba(37,99,235,0.3)] text-sm">
                                    Generate My Pass
                                </Link>
                            </div>

                            <div className="w-full md:w-5/12 flex justify-center relative z-10 mt-6 md:mt-0">
                                <div className="glass-panel p-6 rounded-3xl border border-blue-500/30 bg-slate-900/80 shadow-2xl w-full aspect-square flex flex-col items-center justify-center relative overflow-hidden group">
                                    {/* Scanning effect line */}
                                    <div className="absolute top-0 left-0 w-full h-1 bg-blue-400/60 shadow-[0_0_15px_#60a5fa] scanner-line"></div>

                                    <div className="bg-white p-4 rounded-2xl mb-4 transform group-hover:scale-105 transition-transform">
                                        <img src="/QR.png" alt="Digital Travel QR" className="w-24 h-24 object-contain mix-blend-multiply" />
                                    </div>
                                    <p className="text-xs text-blue-300 uppercase tracking-widest font-semibold">Ready to Scan</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section id="testimonials" className="py-24 px-6 relative">
                    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
                        <div className="flex-1 reveal active">
                            <h3 className="text-slate-400 font-semibold tracking-widest uppercase text-sm mb-3">Testimonials</h3>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-10 leading-tight font-serif">What People Say<br />About Us.</h2>
                            <div className="flex gap-4">
                                <div onClick={() => setCurrentTesti(0)} className={`w-4 h-4 rounded-full cursor-pointer transition-colors duration-300 ${currentTesti === 0 ? 'bg-white shadow-lg' : 'bg-slate-600 hover:bg-slate-500'}`}></div>
                                <div onClick={() => setCurrentTesti(1)} className={`w-4 h-4 rounded-full cursor-pointer transition-colors duration-300 ${currentTesti === 1 ? 'bg-white shadow-lg' : 'bg-slate-600 hover:bg-slate-500'}`}></div>
                                <div onClick={() => setCurrentTesti(2)} className={`w-4 h-4 rounded-full cursor-pointer transition-colors duration-300 ${currentTesti === 2 ? 'bg-white shadow-lg' : 'bg-slate-600 hover:bg-slate-500'}`}></div>
                            </div>
                        </div>
                        <div className="flex-1 relative reveal active w-full mt-10 lg:mt-0 min-h-[350px] sm:min-h-[400px]">
                            <div className={`testimonial-card ${getTestiClass(0)} glass-panel p-8 md:p-10 rounded-3xl shadow-2xl bg-slate-800/90 border-white/10 ml-auto`}>
                                <img src="/People/Guy 3.png" alt="Aarav Sharma" className="w-16 h-16 rounded-full absolute -top-8 -left-8 border-4 border-[#0f172a] object-cover shadow-lg" />
                                <p className="text-slate-300 leading-relaxed mb-8 font-medium text-lg">"Using IndiaXplore completely changed how I plan my vacations. The AI itineraries and digital travel pass made exploring different states completely frictionless."</p>
                                <h4 className="text-white font-bold text-xl mb-1">Aarav Sharma</h4>
                                <p className="text-slate-400 text-sm">Software Engineer, Bengaluru</p>
                            </div>

                            <div className={`testimonial-card ${getTestiClass(1)} glass-panel p-8 md:p-10 rounded-3xl shadow-2xl bg-slate-800/90 border-white/10 ml-auto`}>
                                <img src="/People/Guy 4.png" alt="Rohan Desai" className="w-16 h-16 rounded-full absolute -top-8 -left-8 border-4 border-[#0f172a] object-cover shadow-lg" />
                                <p className="text-slate-300 leading-relaxed mb-8 font-medium text-lg">"I was amazed by the seamless booking process and the personalized itinerary. This platform truly transformed how our team travels across the country."</p>
                                <h4 className="text-white font-bold text-xl mb-1">Rohan Desai</h4>
                                <p className="text-slate-400 text-sm">Entrepreneur, Mumbai</p>
                            </div>

                            <div className={`testimonial-card ${getTestiClass(2)} glass-panel p-8 md:p-10 rounded-3xl shadow-2xl bg-slate-800/90 border-white/10 ml-auto`}>
                                <img src="/People/Woman 2.png" alt="Ananya Gupta" className="w-16 h-16 rounded-full absolute -top-8 -left-8 border-4 border-[#0f172a] object-cover shadow-lg" />
                                <p className="text-slate-300 leading-relaxed mb-8 font-medium text-lg">"An absolute game-changer! Finding local events and the perfect medical facilities all in one place made my trip to India incredibly stress-free."</p>
                                <h4 className="text-white font-bold text-xl mb-1">Ananya Gupta</h4>
                                <p className="text-slate-400 text-sm">Travel Blogger, New Delhi</p>
                            </div>
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
};

export default Home;
