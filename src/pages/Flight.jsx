import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, ArrowRightLeft, Search, AlertCircle, Plane, ArrowRight, Lock, CheckCircle } from 'lucide-react';

const apiKey = "AIzaSyBYMyDqUZe_hKSc2KTS80IacTJ5caloadk";

const Flight = () => {
    const [step, setStep] = useState('search'); // 'search', 'loading', 'results', 'checkout', 'processing', 'success'
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [flightDate, setFlightDate] = useState('');
    const [flights, setFlights] = useState([]);
    const [selectedFlight, setSelectedFlight] = useState(null);
    const [error, setError] = useState('');
    const [pnr, setPnr] = useState('');

    useEffect(() => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        setFlightDate(tomorrow.toISOString().split('T')[0]);
    }, []);

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

    const handleFlightSearch = async () => {
        if (!origin.trim() || !destination.trim()) {
            setError("Please enter both Origin and Destination airports/cities.");
            return;
        }

        setError('');
        setStep('loading');

        const prompt = `
            Act as a live flight booking aggregator.
            The user is searching for flights from "${origin}" to "${destination}" on ${flightDate}.
            Generate 4 realistic flight options from different Indian airlines (like IndiGo, Air India, Vistara, Akasa Air, SpiceJet).
            Calculate a realistic flight duration between these two cities and set the departure/arrival times accordingly.
            Provide realistic, competitive prices in INR (e.g., between 4000 and 12000).

            You MUST return ONLY a valid JSON object matching this exact structure, with no markdown formatting:
            {
                "flights": [
                    {
                        "airline": "IndiGo",
                        "flight_number": "6E-712",
                        "departure_time": "08:15 AM",
                        "arrival_time": "10:45 AM",
                        "duration": "2h 30m",
                        "price": 5400
                    }
                ]
            }
        `;

        try {
            const data = await fetchWithRetry({ contents: [{ parts: [{ text: prompt }] }] });
            setFlights(data.flights);
            setStep('results');
        } catch (err) {
            setError("Unable to fetch flights. " + err.message);
            setStep('search');
        }
    };

    const getAirlineColor = (airline) => {
        const lower = airline.toLowerCase();
        if (lower.includes('india')) return "text-red-500";
        if (lower.includes('vistara')) return "text-purple-400";
        if (lower.includes('akasa')) return "text-orange-500";
        if (lower.includes('spice')) return "text-red-600";
        return "text-blue-400"; // default Indigo etc
    };

    const formatPrice = (num) => '₹' + num.toLocaleString('en-IN');

    const handleBook = (flight) => {
        setSelectedFlight(flight);
        setStep('checkout');
    };

    const generatePNR = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let res = '';
        for (let i = 0; i < 6; i++) {
            res += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return res;
    };

    const processPayment = () => {
        setStep('processing');
        setTimeout(() => {
            setPnr(generatePNR());
            setStep('success');
        }, 2500);
    };

    const taxes = 350;

    return (
        <div className="antialiased selection:bg-blue-500 selection:text-white bg-slate-900 text-slate-100 min-h-screen relative overflow-x-hidden">
            <div className="fixed -z-10 blur-[80px] opacity-40 top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-blue-500 rounded-full animate-pulse"></div>
            <div className="fixed -z-10 blur-[80px] opacity-40 bottom-[20%] right-[-10%] w-[50vw] h-[50vw] bg-cyan-500 rounded-full animate-pulse delay-700"></div>

            <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 rounded-full px-6 py-3 w-[95%] max-w-7xl mx-auto flex justify-between items-center transition-all duration-300 bg-slate-900/50 backdrop-blur-2xl border border-white/10 shadow-lg">
                <Link to="/" className="flex items-center gap-2">
                    <span className="font-extrabold text-2xl tracking-tight text-white">India<span className="text-blue-500">Xplore</span></span>
                </Link>
                <Link to="/tourism" className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors bg-white/5 px-4 py-2 rounded-full border border-white/10">
                    <ArrowLeft className="w-4 h-4" /> Back
                </Link>
            </nav>

            <main className="pt-32 pb-24 px-6 max-w-5xl mx-auto min-h-screen flex flex-col gap-8 relative">

                {step === 'search' && (
                    <div className="w-full transition-all duration-500 animate-in fade-in zoom-in-95">
                        <div className="text-center mb-10">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-500/20 text-blue-400 mb-6 ring-1 ring-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                                <Plane className="w-8 h-8 drop-shadow-[0_2px_10px_rgba(59,130,246,0.4)]" />
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-serif">Book Flights</h1>
                            <p className="text-slate-300 max-w-2xl mx-auto">Compare domestic and international flights. Real-time AI scanning to find the best routes and prices for your journey.</p>
                        </div>

                        <div className="bg-white/5 backdrop-blur-md rounded-[32px] p-6 md:p-10 border border border-white/10 border-t-blue-500/30 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

                            <div className="flex flex-col md:flex-row gap-4 items-end relative z-10">
                                <div className="w-full relative">
                                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">From</label>
                                    <div className="absolute bottom-0 left-0 pl-4 pb-4 flex items-center pointer-events-none">
                                        <MapPin className="w-5 h-5 text-slate-500" />
                                    </div>
                                    <input type="text" value={origin} onChange={e => setOrigin(e.target.value)} placeholder="City or Airport"
                                        className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:border-blue-500 transition-colors placeholder-slate-500" />
                                </div>

                                <div className="hidden md:flex shrink-0 pb-4 justify-center items-center w-10">
                                    <ArrowRightLeft className="w-5 h-5 text-slate-500" />
                                </div>

                                <div className="w-full relative">
                                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">To</label>
                                    <div className="absolute bottom-0 left-0 pl-4 pb-4 flex items-center pointer-events-none">
                                        <MapPin className="w-5 h-5 text-slate-500" />
                                    </div>
                                    <input type="text" value={destination} onChange={e => setDestination(e.target.value)} placeholder="City or Airport"
                                        className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:border-blue-500 transition-colors placeholder-slate-500" />
                                </div>

                                <div className="w-full md:w-64 relative shrink-0">
                                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Departure</label>
                                    <input type="date" value={flightDate} onChange={e => setFlightDate(e.target.value)} style={{ colorScheme: 'dark' }}
                                        className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl px-4 py-4 focus:outline-none focus:border-blue-500 transition-colors" />
                                </div>
                            </div>

                            <button onClick={handleFlightSearch} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all flex items-center justify-center gap-2 mt-8 relative z-10">
                                <Search className="w-5 h-5" /> Search Flights
                            </button>

                            {error && (
                                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm flex items-start gap-3 mt-8">
                                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                                    <span>{error}</span>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {step === 'loading' && (
                    <div className="flex flex-col items-center justify-center py-20 w-full animate-in fade-in">
                        <div className="w-12 h-12 border-4 border-white/10 border-b-blue-500 rounded-full animate-spin mb-6"></div>
                        <h2 className="text-2xl font-bold text-white mb-2">Scanning Airspace...</h2>
                        <p className="text-blue-400 font-medium animate-pulse">Checking IndiGo, Air India, Vistara, and more.</p>
                    </div>
                )}

                {step === 'results' && (
                    <div className="w-full flex flex-col gap-6 animate-in slide-in-from-bottom-5">
                        <div className="flex items-center justify-between mb-2">
                            <div>
                                <h2 className="text-2xl md:text-3xl font-bold text-white mb-1 flex items-center gap-2">
                                    <span>{origin.toUpperCase()}</span>
                                    <ArrowRight className="w-5 h-5 text-blue-500" />
                                    <span>{destination.toUpperCase()}</span>
                                </h2>
                                <p className="text-slate-400 text-sm">
                                    {new Date(flightDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                                </p>
                            </div>
                            <button onClick={() => setStep('search')} className="text-slate-400 hover:text-white px-4 py-2 border border-slate-700 rounded-lg text-sm bg-slate-800/50">
                                Modify Search
                            </button>
                        </div>

                        <div className="space-y-4">
                            {flights.map((f, i) => (
                                <div key={i} className="bg-white/5 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-white/10 hover:border-blue-500/30 transition-all flex flex-col md:flex-row items-center gap-6 group shadow-lg">
                                    <div className="flex items-center gap-4 w-full md:w-1/4">
                                        <div className={`w-12 h-12 rounded-full bg-white/5 flex items-center justify-center ${getAirlineColor(f.airline)}`}>
                                            <Plane className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-white text-lg">{f.airline}</h3>
                                            <span className="text-xs text-slate-400">{f.flight_number}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between w-full md:w-2/4 px-2">
                                        <div className="text-center md:text-right">
                                            <span className="block font-bold text-white text-xl">{f.departure_time}</span>
                                            <span className="text-xs text-slate-400 uppercase">Depart</span>
                                        </div>
                                        <div className="flex-1 px-4 flex flex-col items-center">
                                            <span className="text-xs text-slate-400 mb-1">{f.duration}</span>
                                            <div className="w-full border-t border-dashed border-slate-500 relative">
                                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-400 bg-slate-900 px-1">
                                                    <Plane className="w-4 h-4" />
                                                </div>
                                            </div>
                                            <span className="text-[10px] text-emerald-400 mt-1">Non-stop</span>
                                        </div>
                                        <div className="text-center md:text-left">
                                            <span className="block font-bold text-white text-xl">{f.arrival_time}</span>
                                            <span className="text-xs text-slate-400 uppercase">Arrive</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-row md:flex-col items-center justify-between w-full md:w-1/4 border-t md:border-t-0 md:border-l border-slate-700/50 pt-4 md:pt-0 md:pl-6">
                                        <div className="text-left md:text-center md:mb-3">
                                            <span className="block font-bold text-2xl text-blue-400">{formatPrice(f.price)}</span>
                                            <span className="text-[10px] text-slate-500">Per Adult</span>
                                        </div>
                                        <button onClick={() => handleBook(f)} className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-colors shadow-lg">
                                            Book
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {step === 'checkout' && selectedFlight && (
                    <div className="w-full animate-in slide-in-from-right-5">
                        <div className="flex items-center justify-between mb-8 max-w-2xl mx-auto">
                            <div className="flex items-center gap-4">
                                <button onClick={() => setStep('results')} className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10">
                                    <ArrowLeft className="w-5 h-5 text-white" />
                                </button>
                                <h2 className="text-3xl font-bold text-white font-serif">Review & Pay</h2>
                            </div>
                        </div>

                        <div className="bg-white/5 backdrop-blur-md rounded-[32px] p-8 border border-white/10 relative overflow-hidden max-w-2xl mx-auto shadow-2xl">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

                            <div className="bg-slate-900/60 rounded-2xl p-6 border border-slate-700/50 mb-6 relative z-10">
                                <h3 className="text-lg font-bold text-white mb-4 border-b border-slate-700/50 pb-3">Flight Summary</h3>
                                <div className="flex justify-between items-center text-sm mb-3">
                                    <span className="text-slate-400">Route</span>
                                    <span className="text-white font-bold text-base flex items-center gap-1">
                                        {origin.substring(0, 3).toUpperCase()} <Plane className="w-4 h-4 text-blue-400 mx-1" /> {destination.substring(0, 3).toUpperCase()}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-sm mb-3">
                                    <span className="text-slate-400">Airline</span>
                                    <span className="text-white font-medium">{selectedFlight.airline} ({selectedFlight.flight_number})</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-400">Date & Time</span>
                                    <span className="text-white font-medium">
                                        {new Date(flightDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at {selectedFlight.departure_time}
                                    </span>
                                </div>
                            </div>

                            <div className="bg-slate-900/60 rounded-2xl p-6 border border-slate-700/50 mb-8 relative z-10">
                                <h3 className="text-lg font-bold text-white mb-4 border-b border-slate-700/50 pb-3">Fare Breakdown</h3>
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-400">Base Fare (1 Adult)</span>
                                        <span className="text-white">{formatPrice(selectedFlight.price)}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-400">Taxes & Fees</span>
                                        <span className="text-white">{formatPrice(taxes)}</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-4 mt-2 border-t border-slate-700/50 text-lg">
                                        <span className="text-white font-bold">Total Amount</span>
                                        <span className="text-blue-400 font-bold text-2xl">{formatPrice(selectedFlight.price + taxes)}</span>
                                    </div>
                                </div>
                            </div>

                            <button onClick={processPayment} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg py-4 rounded-xl shadow-[0_0_25px_rgba(37,99,235,0.4)] transition-all flex items-center justify-center gap-2 relative z-10">
                                <Lock className="w-5 h-5" /> Secure Pay {formatPrice(selectedFlight.price + taxes)}
                            </button>
                        </div>
                    </div>
                )}

                {step === 'processing' && (
                    <div className="flex flex-col items-center justify-center py-20 w-full animate-in fade-in">
                        <div className="w-12 h-12 border-4 border-white/10 border-b-emerald-500 rounded-full animate-spin mb-6"></div>
                        <h2 className="text-2xl font-bold text-white mb-2">Processing Payment...</h2>
                        <p className="text-emerald-400 font-medium animate-pulse">Securing your ticket with the airline.</p>
                    </div>
                )}

                {step === 'success' && selectedFlight && (
                    <div className="w-full animate-in zoom-in-95">
                        <div className="max-w-2xl mx-auto">
                            <div className="text-center mb-8 flex flex-col items-center">
                                <div className="w-20 h-20 mb-4 bg-emerald-500/20 rounded-full flex items-center justify-center">
                                    <CheckCircle className="w-12 h-12 text-emerald-400" />
                                </div>
                                <h2 className="text-3xl font-bold text-white font-serif">Booking Confirmed!</h2>
                                <p className="text-slate-400">Your e-ticket has been generated.</p>
                            </div>

                            <div className="bg-white rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-slate-200">
                                <div className="bg-blue-600 p-6 flex justify-between items-center text-white">
                                    <div className="flex items-center gap-2">
                                        <Plane className="w-6 h-6" />
                                        <span className="font-bold tracking-widest uppercase text-sm">{selectedFlight.airline}</span>
                                    </div>
                                    <div className="text-right">
                                        <span className="block text-xs text-blue-200 uppercase">Flight No.</span>
                                        <span className="font-bold tracking-widest">{selectedFlight.flight_number}</span>
                                    </div>
                                </div>

                                <div className="p-8 pb-4 relative">
                                    <div className="flex justify-between items-center mb-8">
                                        <div>
                                            <span className="block text-4xl font-black text-slate-900">{origin.substring(0, 3).toUpperCase() || 'ORG'}</span>
                                            <span className="text-sm font-medium text-slate-500">{selectedFlight.departure_time}</span>
                                        </div>

                                        <div className="flex-1 px-4 flex flex-col items-center relative">
                                            <span className="text-xs text-slate-400 font-bold mb-1">{selectedFlight.duration}</span>
                                            <div className="w-full h-px bg-slate-300 relative">
                                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-500 bg-white px-2">
                                                    <Plane className="w-5 h-5 rotate-45" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-right">
                                            <span className="block text-4xl font-black text-slate-900">{destination.substring(0, 3).toUpperCase() || 'DST'}</span>
                                            <span className="text-sm font-medium text-slate-500">{selectedFlight.arrival_time}</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 border-t border-slate-200 pt-6 text-left">
                                        <div>
                                            <span className="block text-xs font-bold text-slate-400 uppercase">Passenger</span>
                                            <span className="font-bold text-slate-800">Primary Guest</span>
                                        </div>
                                        <div>
                                            <span className="block text-xs font-bold text-slate-400 uppercase">Date</span>
                                            <span className="font-bold text-slate-800">{new Date(flightDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                        </div>
                                        <div>
                                            <span className="block text-xs font-bold text-slate-400 uppercase">Class</span>
                                            <span className="font-bold text-slate-800">Economy</span>
                                        </div>
                                        <div>
                                            <span className="block text-xs font-bold text-slate-400 uppercase">PNR</span>
                                            <span className="font-bold text-blue-600 text-lg tracking-widest">{pnr}</span>
                                        </div>
                                    </div>

                                    <div className="absolute bottom-0 left-0 w-full flex justify-between transform translate-y-1/2">
                                        <div className="w-6 h-6 rounded-full bg-slate-900 -ml-3"></div>
                                        <div className="flex-1 mx-4 border-b-2 border-dashed border-slate-300 mt-3"></div>
                                        <div class="w-6 h-6 rounded-full bg-slate-900 -mr-3"></div>
                                    </div>
                                </div>

                                <div className="bg-slate-50 p-6 pt-8 flex justify-between items-center">
                                    <div>
                                        <span className="block text-xs font-bold text-slate-400 uppercase">Total Paid</span>
                                        <span className="font-black text-slate-900 text-xl">{formatPrice(selectedFlight.price + taxes)}</span>
                                    </div>
                                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=IndiaXplore-Ticket" alt="QR Code" className="w-16 h-16 mix-blend-multiply" />
                                </div>
                            </div>

                            <div className="text-center mt-8">
                                <button onClick={() => {
                                    setStep('search');
                                    setOrigin('');
                                    setDestination('');
                                }} className="text-blue-400 hover:text-white transition-colors underline font-medium">Book another flight</button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Flight;
