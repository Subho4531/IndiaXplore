import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowLeft, MapPin, Navigation, IndianRupee, Sparkles,
    AlertCircle, Camera, Map, Info, Receipt, Plane, Hotel,
    Utensils, ShieldCheck, CreditCard, ExternalLink, Flame
} from 'lucide-react';

const apiKey = "AIzaSyBYMyDqUZe_hKSc2KTS80IacTJ5caloadk";

const Tourism = () => {
    const [startLocation, setStartLocation] = useState('');
    const [destination, setDestination] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [budget, setBudget] = useState('');

    const [step, setStep] = useState('input'); // 'input', 'loading', 'results', 'roast'
    const [results, setResults] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const sevenDaysLater = new Date(tomorrow);
        sevenDaysLater.setDate(sevenDaysLater.getDate() + 7);

        setStartDate(tomorrow.toISOString().split('T')[0]);
        setEndDate(sevenDaysLater.toISOString().split('T')[0]);
    }, []);

    const calculateDays = () => {
        if (!startDate || !endDate) return 1;
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end - start);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
    };

    const handleStartDateChange = (e) => {
        const newStart = e.target.value;
        setStartDate(newStart);
        const newEnd = new Date(newStart);
        newEnd.setDate(newEnd.getDate() + 7);
        setEndDate(newEnd.toISOString().split('T')[0]);
    };

    const handleEndDateChange = (e) => {
        const newEnd = e.target.value;
        const newEndObj = new Date(newEnd);
        const startObj = new Date(startDate);

        if (newEndObj <= startObj) {
            const newStartObj = new Date(newEndObj);
            newStartObj.setDate(newStartObj.getDate() - 7);
            setStartDate(newStartObj.toISOString().split('T')[0]);
        }
        setEndDate(newEnd);
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

    const generateItinerary = async () => {
        if (!startLocation.trim() || !destination.trim() || !budget.trim()) {
            setError("Please fill in your Origin, Destination, and Budget.");
            return;
        }

        setError('');
        setStep('loading');

        const tripDays = calculateDays();
        const prompt = `
            Act as an expert travel planner and comedian for India. 
            The user is traveling from ${startLocation} to ${destination} from ${startDate} to ${endDate} (a ${tripDays}-day trip).
            Their absolute maximum budget for the entire trip is ${budget} INR.

            Step 1: Evaluate the budget. Is ${budget} INR realistic for a ${tripDays}-day trip from ${startLocation} to ${destination} including transport, hotel, and food?
            Step 2: If the budget is absurdly low (e.g., 500 INR for 5 days), set "is_budget_realistic" to false. Leave the itinerary blank, and write a hilarious, playful roast in "roast_message" telling them to wake up to reality, or suggest they walk there.
            Step 3: If the budget is realistic (even if it is a bit tight/budget-friendly), set "is_budget_realistic" to true. Provide a full itinerary and adjust the estimated costs to fit within or near their ${budget} INR budget.

            You MUST return ONLY a valid JSON object matching this exact structure, with no markdown formatting:
            {
                "is_budget_realistic": true,
                "roast_message": "Fill this only if budget is false. Make it funny.",
                "itinerary": [
                    { "day": "Day 1: Arrival", "activities": "Brief description", "dining": "Restaurant tips" }
                ],
                "highlights": [
                    { "name": "Key Place", "description": "Brief detail" }
                ],
                "communication_tips": "Brief tip on local transport or language.",
                "costs": {
                    "transport": 0,
                    "hotel": 0,
                    "food": 0
                }
            }
        `;

        try {
            const data = await fetchWithRetry({ contents: [{ parts: [{ text: prompt }] }] });
            setResults(data);
            if (data.is_budget_realistic === false) {
                setStep('roast');
            } else {
                setStep('results');
            }
        } catch (err) {
            setError("Failed to generate itinerary. Please try again. " + err.message);
            setStep('input');
        }
    };

    const formatPrice = (num) => '₹' + num.toLocaleString('en-IN');
    const days = calculateDays();

    return (
        <div className="antialiased selection:bg-emerald-500 selection:text-white bg-slate-900 text-slate-100 min-h-screen relative overflow-x-hidden">
            <div className="fixed -z-10 blur-[80px] opacity-30 top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-indigo-600 rounded-full animate-pulse"></div>
            <div className="fixed -z-10 blur-[80px] opacity-30 bottom-[20%] right-[-10%] w-[50vw] h-[50vw] bg-pink-500 rounded-full animate-pulse delay-700"></div>
            <div className="fixed -z-10 blur-[80px] opacity-20 top-[40%] right-[10%] w-[30vw] h-[30vw] bg-emerald-500 rounded-full animate-pulse delay-1000"></div>

            <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 rounded-full px-6 py-3 w-[95%] max-w-7xl mx-auto flex justify-between items-center transition-all duration-300 bg-slate-900/50 backdrop-blur-2xl border border-white/10 shadow-lg">
                <Link to="/" className="flex items-center gap-2">
                    <span className="font-extrabold text-2xl tracking-tight text-white">India<span className="text-emerald-500">Xplore</span></span>
                </Link>
                <Link to="/" className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors bg-white/5 px-4 py-2 rounded-full border border-white/10">
                    <ArrowLeft className="w-4 h-4" /> Back to Home
                </Link>
            </nav>

            <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto min-h-screen flex flex-col gap-12 relative">

                <div className="text-center max-w-3xl mx-auto">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 mb-6 ring-1 ring-emerald-500/30">
                        <Map className="w-8 h-8" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-serif">State Tourism Portal</h1>
                    <p className="text-slate-300 text-lg">Tell us where you want to go, when, and how much you want to spend. Our AI will craft the perfect itinerary tailored entirely to your budget.</p>
                </div>

                <div className="bg-white/5 backdrop-blur-md rounded-[32px] p-8 md:p-12 border border-t-white/20 border-white/10 shadow-2xl relative overflow-hidden max-w-5xl mx-auto w-full">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 relative z-10">
                        <div className="relative w-full">
                            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Starting From</label>
                            <div className="absolute bottom-0 left-0 pl-4 pb-4 flex items-center pointer-events-none">
                                <MapPin className="w-5 h-5 text-slate-500" />
                            </div>
                            <input type="text" value={startLocation} onChange={e => setStartLocation(e.target.value)} placeholder="e.g. Mumbai, London"
                                className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:border-emerald-500 transition-colors placeholder-slate-500" />
                        </div>

                        <div className="relative w-full">
                            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Destination</label>
                            <div className="absolute bottom-0 left-0 pl-4 pb-4 flex items-center pointer-events-none">
                                <Navigation className="w-5 h-5 text-slate-500" />
                            </div>
                            <input type="text" value={destination} onChange={e => setDestination(e.target.value)} placeholder="e.g. Kashmir, Goa, Shimla"
                                className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:border-emerald-500 transition-colors placeholder-slate-500" />
                        </div>

                        <div className="relative w-full flex gap-4">
                            <div className="flex-1">
                                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Start Date</label>
                                <input type="date" value={startDate} onChange={handleStartDateChange} style={{ colorScheme: 'dark' }}
                                    className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl px-4 py-4 focus:outline-none focus:border-emerald-500 transition-colors text-sm" />
                            </div>
                            <div className="flex-1">
                                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">End Date</label>
                                <input type="date" value={endDate} onChange={handleEndDateChange} style={{ colorScheme: 'dark' }}
                                    className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl px-4 py-4 focus:outline-none focus:border-emerald-500 transition-colors text-sm" />
                            </div>
                        </div>

                        <div className="relative w-full">
                            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Total Budget (INR)</label>
                            <div className="absolute bottom-0 left-0 pl-4 pb-4 flex items-center pointer-events-none">
                                <IndianRupee className="w-5 h-5 text-emerald-500" />
                            </div>
                            <input type="number" value={budget} onChange={e => setBudget(e.target.value)} placeholder="e.g. 50000" min="1"
                                className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:border-emerald-500 transition-colors placeholder-slate-500" />
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-700/50 pt-8 relative z-10">
                        <div className="text-sm flex flex-wrap items-center gap-2">
                            <span className="text-white font-bold px-3 py-1.5 bg-white/10 rounded-lg shadow-inner">{startLocation || 'Origin'}</span>
                            <ArrowLeft className="w-4 h-4 text-emerald-500 rotate-180" />
                            <span className="text-white font-bold px-3 py-1.5 bg-white/10 rounded-lg shadow-inner">{destination || 'Destination'}</span>
                            <span className="text-slate-400 ml-2 font-medium text-sm border-l border-slate-600 pl-3">{days} Days</span>
                            <span className="text-emerald-400 font-bold text-sm border-l border-slate-600 pl-3">Budget: {budget ? `₹${Number(budget).toLocaleString('en-IN')}` : 'TBD'}</span>
                        </div>
                        <button onClick={generateItinerary} disabled={step === 'loading'} className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold py-4 px-8 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed">
                            <Sparkles className="w-5 h-5" /> Generate Custom Plan
                        </button>
                    </div>

                    {step === 'loading' && (
                        <div className="flex flex-col items-center justify-center py-10 mt-4 animate-in fade-in">
                            <div className="w-10 h-10 border-4 border-white/10 border-b-emerald-500 rounded-full animate-spin mb-4"></div>
                            <p className="text-emerald-400 font-medium animate-pulse">Consulting our AI travel experts...</p>
                            <p className="text-xs text-slate-500 mt-2">Checking real-world costs and availability...</p>
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mt-6 text-sm flex items-start gap-3 relative z-10">
                            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                            <span>{error}</span>
                        </div>
                    )}
                </div>

                {step === 'roast' && results && (
                    <div className="max-w-3xl mx-auto w-full animate-in zoom-in-95">
                        <div className="bg-rose-500/10 border border-rose-500/30 rounded-[32px] p-8 md:p-12 text-center relative overflow-hidden shadow-[0_0_40px_rgba(244,63,94,0.1)]">
                            <div className="w-20 h-20 mx-auto bg-rose-500/20 rounded-full flex items-center justify-center mb-6 ring-1 ring-rose-500/40">
                                <Flame className="w-10 h-10 text-rose-500" />
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-4">Hold Up There, Explorer!</h2>
                            <p className="text-lg text-rose-200 leading-relaxed italic">
                                "{results.roast_message}"
                            </p>
                            <button onClick={() => setStep('input')} className="mt-8 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors border border-white/10 text-sm font-medium">
                                Adjust My Budget
                            </button>
                        </div>
                    </div>
                )}

                {step === 'results' && results && (
                    <div className="max-w-5xl mx-auto w-full flex-col gap-6 flex animate-in slide-in-from-bottom-5">
                        <div className="bg-white/5 backdrop-blur-md rounded-[32px] p-8 md:p-10 border border-white/10">
                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2"><Camera className="text-emerald-400" /> Key Highlights</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {results.highlights?.map((h, i) => (
                                    <div key={i} className="bg-slate-900/40 p-4 rounded-2xl border border-white/5 hover:bg-white/5 transition-colors group">
                                        <h4 className="font-bold text-white mb-2 flex items-center justify-between">
                                            {h.name}
                                            <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(h.name + ', ' + destination)}`} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-emerald-400 transition-colors">
                                                <ExternalLink className="w-4 h-4" />
                                            </a>
                                        </h4>
                                        <p className="text-xs text-slate-400 leading-relaxed">{h.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="bg-white/5 backdrop-blur-md rounded-[32px] p-8 md:p-10 lg:col-span-2 border border-white/10">
                                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2"><Map className="text-emerald-400" /> Your Itinerary</h3>

                                <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 mb-8 flex gap-4">
                                    <Info className="w-6 h-6 text-blue-400 shrink-0" />
                                    <p className="text-sm text-slate-300 leading-relaxed">{results.communication_tips || "Enjoy your trip!"}</p>
                                </div>

                                <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent">
                                    {results.itinerary?.map((day, i) => (
                                        <div key={i} className="relative flex items-start group">
                                            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#0f172a] bg-emerald-500 text-slate-900 shadow shrink-0 relative z-10 ml-0.5 mt-2">
                                                <MapPin className="w-4 h-4" />
                                            </div>
                                            <div className="ml-6 bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-2xl w-full">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="font-bold text-emerald-400 text-sm">{day.day}</span>
                                                </div>
                                                <p className="text-sm text-slate-300 mb-3"><span className="text-white font-medium">Visit:</span> {day.activities}</p>
                                                <p className="text-xs text-slate-400 flex items-start gap-1">
                                                    <Utensils className="w-3 h-3 shrink-0 mt-0.5" />
                                                    <span>{day.dining}</span>
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white/5 backdrop-blur-md rounded-[32px] p-8 border border-emerald-500/30 relative overflow-hidden h-fit sticky top-32">
                                <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

                                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2"><Receipt className="text-emerald-400" /> Estimate</h3>

                                <div className="space-y-4 text-sm font-medium mb-8">
                                    <div className="flex justify-between items-center pb-4 border-b border-slate-700/50">
                                        <span className="text-slate-400 flex items-center gap-2"><Plane className="w-4 h-4" /> Transport</span>
                                        <span className="text-white">{formatPrice(results.costs?.transport || 0)}</span>
                                    </div>
                                    <div className="flex justify-between items-center pb-4 border-b border-slate-700/50">
                                        <span className="text-slate-400 flex items-center gap-2"><Hotel className="w-4 h-4" /> Accommodations</span>
                                        <span className="text-white">{formatPrice(results.costs?.hotel || 0)}</span>
                                    </div>
                                    <div className="flex justify-between items-center pb-4 border-b border-slate-700/50">
                                        <span className="text-slate-400 flex items-center gap-2"><Utensils className="w-4 h-4" /> Dining & Activities</span>
                                        <span className="text-white">{formatPrice(results.costs?.food || 0)}</span>
                                    </div>
                                    <div className="flex justify-between items-center pb-4 border-b border-slate-700/50">
                                        <span className="text-slate-400 flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> Platform Fee</span>
                                        <span className="text-white">₹499</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-2 text-lg">
                                        <span className="text-white font-bold">Total Cost</span>
                                        <span className="text-emerald-400 font-bold text-2xl">
                                            {formatPrice((results.costs?.transport || 0) + (results.costs?.hotel || 0) + (results.costs?.food || 0) + 499)}
                                        </span>
                                    </div>
                                </div>

                                <button className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold text-lg py-4 rounded-xl shadow-[0_0_25px_rgba(16,185,129,0.3)] transition-all flex items-center justify-center gap-2 cursor-pointer group">
                                    <CreditCard className="w-6 h-6 group-hover:scale-110 transition-transform" />
                                    Book Package
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="max-w-5xl mx-auto w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent my-4"></div>

                <div className="max-w-7xl mx-auto w-full text-center mt-6">
                    <h2 className="text-3xl font-bold text-white mb-3">Prefer to book individually?</h2>
                    <p className="text-slate-400 mb-10 max-w-2xl mx-auto">Don't want the full package? No problem. You can book flights, trains, hotels, and cabs separately right here.</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl flex flex-col items-center text-center transition-all duration-300 hover:bg-white/10 group border border-white/10">
                            <div className="w-20 h-20 mb-6 flex items-center justify-center bg-blue-500/20 text-blue-400 rounded-2xl relative transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-2">
                                <Plane className="w-10 h-10" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Flights</h3>
                            <p className="text-sm text-slate-400 mb-6 flex-1">Compare and book the cheapest domestic & international flights.</p>
                            <Link to="/flight" className="block w-full py-3 rounded-xl border border-blue-500/50 text-blue-400 hover:bg-blue-500 hover:text-white transition-colors font-medium">Search Flights</Link>
                        </div>

                        <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl flex flex-col items-center text-center transition-all duration-300 hover:bg-white/10 group border border-white/10">
                            <div className="w-20 h-20 mb-6 flex items-center justify-center bg-orange-500/20 text-orange-400 rounded-2xl relative transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-2">
                                <MapPin className="w-10 h-10" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Trains</h3>
                            <p className="text-sm text-slate-400 mb-6 flex-1">Book official IRCTC train tickets instantly with PNR status tracking.</p>
                            <Link to="/rail" className="block w-full py-3 rounded-xl border border-orange-500/50 text-orange-400 hover:bg-orange-500 hover:text-white transition-colors font-medium">Book Trains</Link>
                        </div>

                        <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl flex flex-col items-center text-center transition-all duration-300 hover:bg-white/10 group border border-white/10">
                            <div className="w-20 h-20 mb-6 flex items-center justify-center bg-purple-500/20 text-purple-400 rounded-2xl relative transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-2">
                                <Hotel className="w-10 h-10" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Hotels</h3>
                            <p className="text-sm text-slate-400 mb-6 flex-1">From budget stays to luxury resorts, find your perfect room.</p>
                            <Link to="/hotels" className="block w-full py-3 rounded-xl border border-purple-500/50 text-purple-400 hover:bg-purple-500 hover:text-white transition-colors font-medium">Find Hotels</Link>
                        </div>

                        <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl flex flex-col items-center text-center transition-all duration-300 hover:bg-white/10 group border border-white/10">
                            <div className="w-20 h-20 mb-6 flex items-center justify-center bg-yellow-500/20 text-yellow-500 rounded-2xl relative transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-2">
                                <MapPin className="w-10 h-10" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Cabs</h3>
                            <p className="text-sm text-slate-400 mb-6 flex-1">Outstation cabs and local car rentals for seamless travel.</p>
                            <Link to="/cab" className="block w-full py-3 rounded-xl border border-yellow-500/50 text-yellow-400 hover:bg-yellow-500 hover:text-slate-900 transition-colors font-medium">Rent a Car</Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Tourism;
