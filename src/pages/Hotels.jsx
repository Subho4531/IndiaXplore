import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowLeft, MapPin, Search, AlertCircle,
    Building, Moon, Lock, CheckCircle, Star
} from 'lucide-react';

const apiKey = "AIzaSyBYMyDqUZe_hKSc2KTS80IacTJ5caloadk";

const Hotels = () => {
    const [step, setStep] = useState('search'); // 'search', 'loading', 'results', 'checkout', 'processing', 'success'
    const [destination, setDestination] = useState('');
    const [checkin, setCheckin] = useState('');
    const [checkout, setCheckout] = useState('');

    const [hotels, setHotels] = useState([]);
    const [selectedHotel, setSelectedHotel] = useState(null);
    const [error, setError] = useState('');
    const [confData, setConfData] = useState(null);

    useEffect(() => {
        const today = new Date();
        const inDate = new Date(today);
        inDate.setDate(today.getDate() + 1);
        const outDate = new Date(inDate);
        outDate.setDate(inDate.getDate() + 2);

        setCheckin(inDate.toISOString().split('T')[0]);
        setCheckout(outDate.toISOString().split('T')[0]);
    }, []);

    const handleCheckinChange = (e) => {
        const newCheckin = e.target.value;
        setCheckin(newCheckin);

        const inDateObj = new Date(newCheckin);
        const outDateObj = new Date(checkout);

        if (outDateObj <= inDateObj) {
            const nextDay = new Date(inDateObj);
            nextDay.setDate(inDateObj.getDate() + 1);
            setCheckout(nextDay.toISOString().split('T')[0]);
        }
    };

    const getDiffNights = () => {
        if (!checkin || !checkout) return 1;
        const start = new Date(checkin);
        const end = new Date(checkout);
        const diffTime = Math.abs(end - start);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
    };

    const fetchWithRetry = async (payload) => {
        const modelsToTry = ["gemini-1.5-flash", "gemini-1.5-flash-8b", "gemini-pro"];
        let lastError = null;

        for (const model of modelsToTry) {
            const apiVersion = 'v1beta';
            const url = `https://generativelanguage.googleapis.com/${apiVersion}/models/${model}:generateContent?key=${apiKey}`;

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    const errDetails = await response.json();
                    throw new Error(errDetails.error?.message || `HTTP ${response.status}`);
                }

                const result = await response.json();
                let textContent = result.candidates[0].content.parts[0].text;

                textContent = textContent.replace(/```json/gi, '').replace(/```/g, '').trim();
                const firstBrace = textContent.indexOf('{');
                const lastBrace = textContent.lastIndexOf('}');

                if (firstBrace !== -1 && lastBrace !== -1) {
                    textContent = textContent.substring(firstBrace, lastBrace + 1);
                }

                return JSON.parse(textContent);
            } catch (e) {
                lastError = e;
            }
        }
        throw lastError || new Error("All available Google AI models failed to respond.");
    };

    const handleSearch = async () => {
        if (!destination.trim()) {
            setError("Please enter a destination city or area.");
            return;
        }

        setError('');
        setStep('loading');

        const prompt = `
            Act as a live hotel booking aggregator for India.
            The user is searching for hotels in "${destination}".
            Generate 4 realistic hotel options. Mix categories (e.g., one 5-star luxury, one premium business, one boutique heritage, one budget-friendly).
            Provide a realistic price per night in INR for a standard room.
            Give 3 key amenities for each hotel as short words (e.g., "Pool", "Free WiFi", "Spa").
            Return a star rating integer from 3 to 5.

            You MUST return ONLY a valid JSON object matching this exact structure, with no markdown formatting:
            {
                "hotels": [
                    {
                        "hotel_name": "Taj Palace",
                        "stars": 5,
                        "price_per_night": 12500,
                        "amenities": ["Pool", "Spa", "Free Breakfast"],
                        "description": "Luxurious stay with premium service."
                    }
                ]
            }
        `;

        try {
            const data = await fetchWithRetry({ contents: [{ parts: [{ text: prompt }] }] });
            setHotels(data.hotels || []);
            setStep('results');
        } catch (err) {
            setError("Unable to fetch hotels. Please try a different destination. " + err.message);
            setStep('search');
        }
    };

    const processPayment = () => {
        setStep('processing');
        setTimeout(() => {
            const bookingId = 'HB' + Math.floor(100000 + Math.random() * 900000);
            setConfData({
                bookingId
            });
            setStep('success');
        }, 2500);
    };

    const formatPrice = (num) => '₹' + num.toLocaleString('en-IN');
    const nights = getDiffNights();

    const formatDateShort = (dateStr) => {
        if (!dateStr) return '';
        return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    const formatDateFull = (dateStr) => {
        if (!dateStr) return '';
        return new Date(dateStr).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    };

    return (
        <div className="antialiased selection:bg-purple-500 selection:text-white bg-slate-900 text-slate-100 min-h-screen relative overflow-x-hidden">
            <div className="fixed -z-10 blur-[80px] opacity-30 top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-purple-600 rounded-full animate-pulse"></div>
            <div className="fixed -z-10 blur-[80px] opacity-30 bottom-[20%] right-[-10%] w-[50vw] h-[50vw] bg-fuchsia-500 rounded-full animate-pulse delay-700"></div>

            <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 rounded-full px-6 py-3 w-[95%] max-w-7xl mx-auto flex justify-between items-center transition-all duration-300 bg-slate-900/50 backdrop-blur-2xl border border-white/10 shadow-lg">
                <Link to="/" className="flex items-center gap-2">
                    <span className="font-extrabold text-2xl tracking-tight text-white">India<span className="text-purple-500">Xplore</span></span>
                </Link>
                <Link to="/tourism" className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors bg-white/5 px-4 py-2 rounded-full border border-white/10">
                    <ArrowLeft className="w-4 h-4" /> Back
                </Link>
            </nav>

            <main className="pt-32 pb-24 px-6 max-w-5xl mx-auto min-h-screen flex flex-col gap-8 relative">

                {step === 'search' && (
                    <div className="w-full animate-in zoom-in-95">
                        <div className="text-center mb-10">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-purple-500/20 text-purple-400 mb-6 ring-1 ring-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                                <Building className="w-8 h-8 drop-shadow-[0_2px_10px_rgba(168,85,247,0.4)] text-purple-500" />
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-serif">Book Hotels & Stays</h1>
                            <p className="text-slate-300 max-w-2xl mx-auto">From luxurious 5-star resorts to cozy boutique homestays. Discover the perfect accommodation for your journey.</p>
                        </div>

                        <div className="bg-white/5 backdrop-blur-md rounded-[32px] p-6 md:p-10 border border-t-purple-500/30 border-white/10 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end relative z-10">
                                <div className="md:col-span-4 relative">
                                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">City or Area</label>
                                    <div className="absolute bottom-0 left-0 pl-4 pb-4 flex items-center pointer-events-none">
                                        <MapPin className="w-5 h-5 text-slate-500" />
                                    </div>
                                    <input type="text" value={destination} onChange={e => setDestination(e.target.value)} placeholder="Where do you want to stay? e.g. Jaipur, Goa"
                                        className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:border-purple-500 transition-colors placeholder-slate-500" />
                                </div>

                                <div className="md:col-span-2 relative">
                                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Check-in</label>
                                    <input type="date" value={checkin} onChange={handleCheckinChange} style={{ colorScheme: 'dark' }}
                                        className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl px-4 py-4 focus:outline-none focus:border-purple-500 transition-colors" />
                                </div>

                                <div className="md:col-span-2 relative">
                                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Check-out</label>
                                    <input type="date" value={checkout} onChange={e => setCheckout(e.target.value)} style={{ colorScheme: 'dark' }}
                                        className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl px-4 py-4 focus:outline-none focus:border-purple-500 transition-colors" />
                                </div>
                            </div>

                            <button onClick={handleSearch} className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all flex items-center justify-center gap-2 mt-8 relative z-10">
                                <Search className="w-5 h-5" /> Search Properties
                            </button>

                            {error && (
                                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm flex items-start gap-3 mt-4 relative z-10">
                                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                                    <span>{error}</span>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {step === 'loading' && (
                    <div className="flex flex-col items-center justify-center py-20 w-full animate-in fade-in">
                        <div className="w-12 h-12 border-4 border-white/10 border-b-purple-500 rounded-full animate-spin mb-6"></div>
                        <h2 className="text-2xl font-bold text-white mb-2">Finding Best Stays...</h2>
                        <p className="text-purple-400 font-medium animate-pulse">Checking real-time availability and prices.</p>
                    </div>
                )}

                {step === 'results' && (
                    <div className="w-full flex-col gap-6 animate-in slide-in-from-bottom-5">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h2 className="text-2xl md:text-3xl font-bold text-white mb-1 flex items-center gap-2">
                                    <Building className="w-6 h-6 text-purple-500" />
                                    <span>{destination}</span>
                                </h2>
                                <p className="text-slate-400 text-sm">
                                    {formatDateShort(checkin)} - {formatDateShort(checkout)} • {nights} Night(s)
                                </p>
                            </div>
                            <button onClick={() => setStep('search')} className="text-slate-400 hover:text-white px-4 py-2 border border-slate-700 rounded-lg text-sm bg-slate-800/50">
                                Modify Search
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {hotels.map((h, i) => (
                                <div key={i} className="bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/5 hover:border-purple-500/40 transition-all flex flex-col justify-between group h-full shadow-lg">
                                    <div>
                                        <div className="flex justify-between items-start mb-3">
                                            <h3 className="font-bold text-white text-xl leading-tight w-3/4">{h.hotel_name}</h3>
                                            <div className="flex gap-0.5 mt-1 shrink-0 bg-slate-900/50 px-2 py-1 rounded-full border border-slate-700">
                                                {Array.from({ length: h.stars }).map((_, idx) => (
                                                    <Star key={idx} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-xs text-slate-400 mb-4 line-clamp-2">{h.description}</p>
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {h.amenities?.map((a, aIdx) => (
                                                <span key={aIdx} className="bg-purple-500/10 text-purple-300 text-[10px] px-2 py-1 rounded-md border border-purple-500/20">
                                                    {a}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex items-end justify-between border-t border-slate-700/50 pt-4 mt-auto">
                                        <div>
                                            <span className="block text-2xl font-bold text-purple-400">{formatPrice(h.price_per_night)}</span>
                                            <span className="text-[10px] text-slate-500">per night + taxes</span>
                                        </div>
                                        <button onClick={() => { setSelectedHotel(h); setStep('checkout'); }} className="px-6 py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold rounded-xl transition-colors shadow-[0_4px_15px_rgba(147,51,234,0.3)]">
                                            Select Room
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {step === 'checkout' && selectedHotel && (
                    <div className="w-full animate-in slide-in-from-right-5">
                        <div className="flex items-center justify-between mb-8 max-w-2xl mx-auto">
                            <div className="flex items-center gap-4">
                                <button onClick={() => setStep('results')} className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10">
                                    <ArrowLeft className="w-5 h-5 text-white" />
                                </button>
                                <h2 className="text-3xl font-bold text-white font-serif">Confirm Booking</h2>
                            </div>
                        </div>

                        <div className="bg-white/5 backdrop-blur-md rounded-[32px] p-8 border border-white/10 relative overflow-hidden max-w-2xl mx-auto shadow-2xl">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

                            <div className="bg-slate-900/60 rounded-2xl p-6 border border-slate-700/50 mb-6 relative z-10">
                                <h3 className="text-lg font-bold text-white mb-4 border-b border-slate-700/50 pb-3">Stay Details</h3>
                                <div className="flex justify-between items-center text-sm mb-3">
                                    <span className="text-slate-400">Hotel</span>
                                    <span className="text-white font-bold text-base text-right">{selectedHotel.hotel_name}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm mb-3">
                                    <span className="text-slate-400">Location</span>
                                    <span className="text-white font-medium">{destination}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-400">Dates</span>
                                    <span className="text-white font-medium">{formatDateShort(checkin)} - {formatDateShort(checkout)} • {nights} Night(s)</span>
                                </div>
                            </div>

                            <div className="bg-slate-900/60 rounded-2xl p-6 border border-slate-700/50 mb-8 relative z-10">
                                <h3 className="text-lg font-bold text-white mb-4 border-b border-slate-700/50 pb-3">Price Breakdown</h3>
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-400">Price per night</span>
                                        <span className="text-white">{formatPrice(selectedHotel.price_per_night)}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-400">Total Nights ({nights})</span>
                                        <span className="text-white">{formatPrice(selectedHotel.price_per_night * nights)}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-400">Taxes & Platform Fees</span>
                                        <span className="text-white">{formatPrice(Math.floor(selectedHotel.price_per_night * nights * 0.18))}</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-4 mt-2 border-t border-slate-700/50 text-lg">
                                        <span className="text-white font-bold">Total Amount</span>
                                        <span className="text-purple-400 font-bold text-2xl">
                                            {formatPrice(Math.floor(selectedHotel.price_per_night * nights * 1.18))}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <button onClick={processPayment} className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold text-lg py-4 rounded-xl shadow-[0_0_25px_rgba(168,85,247,0.4)] transition-all flex items-center justify-center gap-2 relative z-10">
                                <Lock className="w-5 h-5" /> Secure Pay <span>{formatPrice(Math.floor(selectedHotel.price_per_night * nights * 1.18))}</span>
                            </button>
                        </div>
                    </div>
                )}

                {step === 'processing' && (
                    <div className="flex flex-col items-center justify-center py-20 w-full animate-in fade-in">
                        <div className="w-12 h-12 border-4 border-white/10 border-b-emerald-500 rounded-full animate-spin mb-6"></div>
                        <h2 className="text-2xl font-bold text-white mb-2">Securing Your Room...</h2>
                        <p className="text-emerald-400 font-medium animate-pulse">Confirming reservation with the property.</p>
                    </div>
                )}

                {step === 'success' && selectedHotel && confData && (
                    <div className="w-full animate-in zoom-in-95">
                        <div className="max-w-2xl mx-auto">
                            <div className="text-center mb-8 flex flex-col items-center">
                                <div className="w-20 h-20 mb-4 bg-emerald-500/20 rounded-full flex items-center justify-center">
                                    <CheckCircle className="w-12 h-12 text-emerald-400" />
                                </div>
                                <h2 className="text-3xl font-bold text-white font-serif">Booking Confirmed!</h2>
                                <p className="text-slate-400">Your hotel voucher is ready.</p>
                            </div>

                            <div className="bg-white rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-slate-200">
                                <div className="bg-purple-600 p-6 flex justify-between items-center text-white border-b-4 border-purple-800">
                                    <div className="flex items-center gap-2">
                                        <Building className="w-6 h-6" />
                                        <span className="font-bold tracking-widest uppercase text-sm">Accommodation Voucher</span>
                                    </div>
                                    <div className="text-right">
                                        <span className="block text-xs text-purple-200 uppercase">Booking ID</span>
                                        <span className="font-bold tracking-widest">{confData.bookingId}</span>
                                    </div>
                                </div>

                                <div className="p-8 pb-6 relative text-slate-800">
                                    <h3 className="text-2xl font-black text-slate-900 mb-1">{selectedHotel.hotel_name}</h3>
                                    <p className="text-sm text-slate-500 flex items-center gap-1 mb-6">
                                        <MapPin className="w-4 h-4" /> <span>{destination}</span>
                                    </p>

                                    <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6">
                                        <div className="flex-1 text-center border-r border-slate-300 pr-4">
                                            <span className="block text-xs font-bold text-slate-400 uppercase">Check In</span>
                                            <span className="block font-bold text-slate-900 text-lg mt-1">{formatDateFull(checkin)}</span>
                                            <span className="text-xs text-slate-500">After 2:00 PM</span>
                                        </div>
                                        <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 shrink-0">
                                            <Moon className="w-5 h-5" />
                                        </div>
                                        <div className="flex-1 text-center pl-4">
                                            <span className="block text-xs font-bold text-slate-400 uppercase">Check Out</span>
                                            <span className="block font-bold text-slate-900 text-lg mt-1">{formatDateFull(checkout)}</span>
                                            <span className="text-xs text-slate-500">Before 11:00 AM</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
                                        <div>
                                            <span className="block text-xs font-bold text-slate-400 uppercase">Primary Guest</span>
                                            <span className="font-bold text-slate-800">Registered User</span>
                                        </div>
                                        <div>
                                            <span className="block text-xs font-bold text-slate-400 uppercase">Room Details</span>
                                            <span className="font-bold text-slate-800">1x Classic Room</span>
                                        </div>
                                        <div>
                                            <span class="block text-xs font-bold text-slate-400 uppercase">Payment Status</span>
                                            <span class="font-bold text-emerald-600">Paid in Full</span>
                                        </div>
                                        <div>
                                            <span className="block text-xs font-bold text-slate-400 uppercase">Duration</span>
                                            <span className="font-bold text-slate-800">{nights} Night(s)</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-slate-100 p-6 flex justify-between items-center border-t border-slate-200">
                                    <div>
                                        <span className="block text-xs font-bold text-slate-400 uppercase">Total Amount Paid</span>
                                        <span className="font-black text-slate-900 text-xl">{formatPrice(Math.floor(selectedHotel.price_per_night * nights * 1.18))}</span>
                                    </div>
                                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=60x60&data=Hotel-Booking" alt="QR Code" className="w-14 h-14 mix-blend-multiply" />
                                </div>
                            </div>

                            <div className="text-center mt-8">
                                <button onClick={() => {
                                    setStep('search');
                                    setDestination('');
                                    setSelectedHotel(null);
                                    setConfData(null);
                                }} className="text-purple-400 hover:text-white transition-colors underline font-medium">Book another stay</button>
                            </div>
                        </div>
                    </div>
                )}

            </main>
        </div>
    );
};

export default Hotels;
