import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowLeft, MapPin, Search, AlertCircle, TrainFront,
    ArrowRightLeft, Car, CheckCircle, Truck, Bike, User,
    Star, Phone
} from 'lucide-react';

const apiKey = "AIzaSyBYMyDqUZe_hKSc2KTS80IacTJ5caloadk";

const Cab = () => {
    const [step, setStep] = useState('search'); // 'search', 'loading', 'results', 'checkout', 'success', 'roast'
    const [pickup, setPickup] = useState('');
    const [dropoff, setDropoff] = useState('');

    const [cabs, setCabs] = useState([]);
    const [selectedCab, setSelectedCab] = useState(null);
    const [error, setError] = useState('');
    const [roastMessage, setRoastMessage] = useState('');
    const [confData, setConfData] = useState(null);

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
        if (!pickup.trim() || !dropoff.trim()) {
            setError("Please enter both pickup and drop-off locations.");
            return;
        }

        setError('');
        setStep('loading');

        const prompt = `
            Act as a local cab booking app logic processor in India.
            The user wants to book a cab from "${pickup}" to "${dropoff}".

            CRITICAL RULE:
            Step 1: Check if this is a standard LOCAL city ride. If the user enters two COMPLETELY DIFFERENT cities (e.g., Kolkata to Bardhaman, Delhi to Mumbai) OR just vague city names instead of specific landmarks/areas within the same city, they are misusing the local cab portal. 
            In this case, set "is_local_ride" to false, leave "cabs" empty, and write a hilarious, slightly aggressive roast in "roast_message" telling them to use a train, flight, or outstation portal instead, and to enter proper local landmarks.
            
            Step 2: If the locations seem like a realistic local ride (within the same city or reasonable commuting distance), set "is_local_ride" to true.
            Generate 3 realistic cab options (Mini, Sedan, SUV). 
            Provide a realistic total fare in INR (usually between 100 and 1500 depending on presumed local distance).
            Generate ETAs for the driver to arrive (e.g., "4 mins").

            You MUST return ONLY a valid JSON object matching this exact structure, with no markdown formatting:
            {
                "is_local_ride": true,
                "roast_message": "Fill this only if is_local_ride is false",
                "cabs": [
                    {
                        "type": "Mini",
                        "model": "Tata Tiago / Swift",
                        "eta": "4 mins",
                        "price": 350
                    }
                ]
            }
        `;

        try {
            const data = await fetchWithRetry({ contents: [{ parts: [{ text: prompt }] }] });

            if (data.is_local_ride === false) {
                setRoastMessage(data.roast_message);
                setStep('roast');
            } else {
                setCabs(data.cabs || []);
                setStep('results');
            }
        } catch (err) {
            setError("Unable to fetch cabs right now. " + err.message);
            setStep('search');
        }
    };

    const generatePlate = () => {
        const states = ['MH', 'DL', 'KA', 'WB', 'UP', 'TN'];
        const state = states[Math.floor(Math.random() * states.length)];
        const rto = String(Math.floor(Math.random() * 90) + 10).padStart(2, '0');
        const series = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        const num = String(Math.floor(Math.random() * 9000) + 1000);
        return `${state} ${rto} ${series} ${num}`;
    };

    const processPayment = () => {
        setStep('processing'); // Wait... there's no processing state in HTML, it just shows loading spinner on button, then goes to success
        // Let's use 'processing' state
        setTimeout(() => {
            setConfData({
                otp: Math.floor(1000 + Math.random() * 9000),
                plate: generatePlate()
            });
            setStep('success');
        }, 2000);
    };

    const getIcon = (type) => {
        const t = type.toLowerCase();
        if (t.includes('suv')) return <Truck className="w-7 h-7 text-slate-300 group-hover:text-yellow-400" />;
        if (t.includes('bike') || t.includes('moto')) return <Bike className="w-7 h-7 text-slate-300 group-hover:text-yellow-400" />;
        return <Car className="w-7 h-7 text-slate-300 group-hover:text-yellow-400" />;
    };

    const getSeats = (type) => {
        return type.toLowerCase().includes('suv') ? '6' : '4';
    };

    return (
        <div className="antialiased selection:bg-yellow-500 selection:text-slate-900 bg-slate-900 text-slate-100 min-h-screen relative overflow-x-hidden">
            <div className="fixed -z-10 blur-[80px] opacity-30 top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-yellow-500 rounded-full animate-pulse"></div>
            <div className="fixed -z-10 blur-[80px] opacity-30 bottom-[20%] right-[-10%] w-[50vw] h-[50vw] bg-amber-500 rounded-full animate-pulse delay-700"></div>

            <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 rounded-full px-6 py-3 w-[95%] max-w-7xl mx-auto flex justify-between items-center transition-all duration-300 bg-slate-900/50 backdrop-blur-2xl border border-white/10 shadow-lg">
                <Link to="/" className="flex items-center gap-2">
                    <span className="font-extrabold text-2xl tracking-tight text-white">India<span className="text-yellow-500">Xplore</span></span>
                </Link>
                <Link to="/tourism" className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors bg-white/5 px-4 py-2 rounded-full border border-white/10">
                    <ArrowLeft className="w-4 h-4" /> Back
                </Link>
            </nav>

            <main className="pt-32 pb-24 px-6 max-w-3xl mx-auto min-h-screen flex flex-col gap-8 relative">

                {step === 'search' && (
                    <div className="w-full animate-in zoom-in-95">
                        <div className="text-center mb-10">
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-yellow-500/20 mb-6 ring-1 ring-yellow-500/30 shadow-[0_0_30px_rgba(234,179,8,0.3)]">
                                <Car className="w-10 h-10 text-yellow-500 drop-shadow-[0_2px_10px_rgba(234,179,8,0.4)]" />
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-serif">Book a Ride</h1>
                            <p className="text-slate-300 max-w-lg mx-auto">Get a ride in minutes. Enter specific local landmarks or areas to find your perfect cab.</p>
                        </div>

                        <div className="bg-white/5 backdrop-blur-md rounded-[32px] p-6 md:p-10 border border-t-yellow-500/30 border-white/10 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none"></div>

                            <div className="space-y-6 relative z-10">
                                <div className="relative pl-8">
                                    <div className="absolute left-[11px] top-6 bottom-6 w-0.5 bg-slate-600 hidden md:block"></div>

                                    <div className="relative mb-6">
                                        <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 w-4 h-4 rounded-full bg-emerald-500 border-4 border-slate-900 z-10 hidden md:block"></div>
                                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Pickup Location</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <MapPin className="w-5 h-5 text-emerald-500" />
                                            </div>
                                            <input type="text" value={pickup} onChange={e => setPickup(e.target.value)} placeholder="e.g. Park Street, Kolkata"
                                                className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:border-yellow-500 transition-colors" />
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 w-4 h-4 rounded-sm bg-rose-500 border-4 border-slate-900 z-10 hidden md:block"></div>
                                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Drop-off Location</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <MapPin className="w-5 h-5 text-rose-500" />
                                            </div>
                                            <input type="text" value={dropoff} onChange={e => setDropoff(e.target.value)} placeholder="e.g. Howrah Station, Kolkata"
                                                className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:border-yellow-500 transition-colors" />
                                        </div>
                                    </div>
                                </div>

                                <button onClick={handleSearch} className="w-full bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(234,179,8,0.4)] transition-all flex items-center justify-center gap-2 mt-4">
                                    <Search className="w-5 h-5" /> See Prices
                                </button>

                                {error && (
                                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm flex items-start gap-3 mt-4">
                                        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                                        <span>{error}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {step === 'roast' && (
                    <div className="w-full animate-in zoom-in-95">
                        <div className="bg-rose-500/10 border border-rose-500/30 rounded-[32px] p-8 md:p-12 text-center relative overflow-hidden shadow-[0_0_40px_rgba(244,63,94,0.1)]">
                            <div className="w-20 h-20 mx-auto bg-rose-500/20 rounded-full flex items-center justify-center mb-6 ring-1 ring-rose-500/40">
                                <TrainFront className="w-10 h-10 text-rose-500" />
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-4 font-serif">Are you lost?</h2>
                            <p className="text-lg text-rose-200 leading-relaxed italic">
                                "{roastMessage}"
                            </p>
                            <div className="flex gap-4 justify-center mt-8">
                                <button onClick={() => setStep('search')} className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors border border-white/10 text-sm font-medium">
                                    Enter Local Locations
                                </button>
                                <Link to="/rail" className="px-6 py-3 bg-rose-600 hover:bg-rose-500 text-white rounded-full transition-colors border border-rose-500 text-sm font-medium shadow-lg">
                                    Go Book a Train
                                </Link>
                            </div>
                        </div>
                    </div>
                )}

                {step === 'loading' && (
                    <div className="flex flex-col items-center justify-center py-20 w-full animate-in fade-in">
                        <div className="w-12 h-12 border-4 border-white/10 border-b-yellow-500 rounded-full animate-spin mb-6"></div>
                        <h2 className="text-2xl font-bold text-white mb-2">Locating Nearby Drivers...</h2>
                        <p className="text-yellow-400 font-medium animate-pulse">Calculating ETAs and surge pricing.</p>
                    </div>
                )}

                {step === 'results' && (
                    <div className="w-full flex-col gap-6 animate-in slide-in-from-bottom-5">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
                            <div className="flex items-center gap-3">
                                <button onClick={() => setStep('search')} className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10">
                                    <ArrowLeft className="w-5 h-5 text-white" />
                                </button>
                                <div>
                                    <h2 className="text-xl font-bold text-white mb-0.5 flex items-center gap-2">
                                        Select a Ride
                                    </h2>
                                    <p className="text-slate-400 text-xs truncate max-w-[250px] md:max-w-md"><span>{pickup}</span> → <span>{dropoff}</span></p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {cabs.map((c, i) => (
                                <div key={i} onClick={() => { setSelectedCab(c); setStep('checkout'); }} className="bg-white/5 backdrop-blur-md p-5 rounded-2xl border border-white/10 hover:border-yellow-500/50 hover:bg-white/10 transition-all flex items-center justify-between cursor-pointer group shadow-lg">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-full bg-slate-800 flex items-center justify-center border border-slate-600 group-hover:scale-110 transition-transform shadow-inner">
                                            {getIcon(c.type)}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-white text-lg leading-tight flex items-center gap-2">
                                                {c.type} <User className="w-3 h-3 text-slate-500" /><span className="text-xs text-slate-500 -ml-1">{getSeats(c.type)}</span>
                                            </h3>
                                            <p className="text-xs text-slate-400 mb-1">{c.model}</p>
                                            <span className="text-xs font-bold text-emerald-400">{c.eta} away</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="block text-xl font-bold text-white">₹{c.price}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {step === 'checkout' && selectedCab && (
                    <div className="w-full animate-in slide-in-from-right-5">
                        <div className="flex items-center gap-4 mb-8">
                            <button onClick={() => setStep('results')} className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10">
                                <ArrowLeft className="w-5 h-5 text-white" />
                            </button>
                            <h2 className="text-3xl font-bold text-white font-serif">Confirm Booking</h2>
                        </div>

                        <div className="bg-white/5 backdrop-blur-md rounded-[32px] p-8 border border-white/10 relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none"></div>

                            <div className="bg-slate-900/60 rounded-2xl p-6 border border-slate-700/50 mb-8 relative z-10 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center border border-slate-600">
                                        <Car className="w-8 h-8 text-yellow-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white">{selectedCab.type}</h3>
                                        <p className="text-sm text-slate-400">ETA: {selectedCab.eta}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="block text-2xl font-bold text-yellow-400">₹{selectedCab.price}</span>
                                    <span className="text-xs text-slate-500">Est. Total</span>
                                </div>
                            </div>

                            <button onClick={processPayment} className="w-full bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold text-lg py-4 rounded-xl shadow-[0_0_25px_rgba(234,179,8,0.4)] transition-all flex items-center justify-center gap-2 relative z-10">
                                <CheckCircle className="w-6 h-6" /> Confirm Ride
                            </button>
                        </div>
                    </div>
                )}

                {step === 'processing' && (
                    <div className="flex flex-col items-center justify-center py-20 w-full animate-in fade-in">
                        <div className="w-12 h-12 border-4 border-white/10 border-b-yellow-500 rounded-full animate-spin mb-6"></div>
                        <h2 className="text-2xl font-bold text-white mb-2">Confirming your ride...</h2>
                        <p className="text-yellow-400 font-medium animate-pulse">Please wait, assigning driver.</p>
                    </div>
                )}

                {step === 'success' && selectedCab && confData && (
                    <div className="flex flex-col items-center w-full animate-in zoom-in-95">
                        <div className="text-center mb-8">
                            <div className="w-20 h-20 mx-auto mb-4 bg-emerald-500/20 rounded-full flex flex-col items-center justify-center">
                                <CheckCircle className="w-12 h-12 text-emerald-400" />
                            </div>
                            <h2 className="text-3xl font-bold text-white font-serif">Driver Assigned!</h2>
                            <p className="text-slate-400">Your ride is on the way. Meet them at the pickup point.</p>
                        </div>

                        <div className="w-full bg-slate-800/90 rounded-3xl overflow-hidden shadow-2xl border border-white/10 backdrop-blur-md">
                            <div className="p-6 bg-yellow-500 flex justify-between items-center text-slate-900">
                                <span className="font-bold text-lg uppercase tracking-wider">Ride PIN (OTP)</span>
                                <span className="font-black text-3xl tracking-widest bg-white/30 px-3 py-1 rounded">{confData.otp}</span>
                            </div>

                            <div className="p-8">
                                <div className="flex items-center gap-6 mb-8">
                                    <div className="relative">
                                        <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150&h=150&fit=crop" alt="Driver" className="w-20 h-20 rounded-full border-4 border-slate-900 object-cover" />
                                        <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border-2 border-slate-900 flex items-center gap-1">
                                            4.9 <Star className="w-3 h-3 fill-current" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-1">Ramesh K.</h3>
                                        <p className="text-slate-400">{selectedCab.model}</p>
                                        <p className="text-yellow-400 font-bold mt-1 text-lg">{confData.plate}</p>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center border-t border-slate-700/50 pt-6">
                                    <div className="flex items-center gap-3 text-slate-300">
                                        <Phone className="w-5 h-5 text-emerald-400" />
                                        <span className="font-medium">+91 98765 43210</span>
                                    </div>
                                    <div className="text-right">
                                        <span className="block text-xs text-slate-500 uppercase font-bold">Est. Fare</span>
                                        <span className="font-bold text-white text-lg">₹{selectedCab.price}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button onClick={() => {
                            setStep('search');
                            setPickup('');
                            setDropoff('');
                            setSelectedCab(null);
                        }} className="mt-8 text-slate-400 hover:text-white transition-colors underline text-sm font-medium">Book Another Ride</button>
                    </div>
                )}

            </main>
        </div>
    );
};

export default Cab;
