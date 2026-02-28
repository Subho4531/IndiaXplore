import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowLeft, HeartPulse, MapPin, Navigation, IndianRupee,
    Building2, Stethoscope, Activity, AlertCircle,
    ClipboardList, ShieldAlert, Receipt, Plane, Hotel, ShieldCheck,
    CheckCircle, ExternalLink, Utensils
} from 'lucide-react';

const apiKey = "AIzaSyBYMyDqUZe_hKSc2KTS80IacTJ5caloadk";

const Medical = () => {
    const [startLocation, setStartLocation] = useState('');
    const [destination, setDestination] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [budget, setBudget] = useState('');
    const [hospital, setHospital] = useState('');
    const [treatment, setTreatment] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [results, setResults] = useState(null);

    useEffect(() => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tenDaysLater = new Date(tomorrow);
        tenDaysLater.setDate(tenDaysLater.getDate() + 10);

        setStartDate(tomorrow.toISOString().split('T')[0]);
        setEndDate(tenDaysLater.toISOString().split('T')[0]);
    }, []);

    const calculateDays = () => {
        if (!startDate || !endDate) return 1;
        const start = new Date(startDate);
        const end = new Date(endDate);
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

    const generateMedicalPlan = async () => {
        if (!startLocation.trim() || !destination.trim() || !budget || !treatment.trim()) {
            setError("Please fill in your Origin, Destination, Budget, and Treatment required.");
            return;
        }

        setError('');
        setLoading(true);
        setResults(null);

        const tripDays = calculateDays();

        const prompt = `
            Act as an expert medical tourism coordinator and comedian for India. 
            The user is traveling from ${startLocation} to ${destination} for a ${tripDays}-day medical trip.
            Treatment required: ${treatment}. 
            Preferred hospital: ${hospital || "None specified, please recommend the best one"}.
            Their absolute maximum budget for the entire trip (including treatment, flights, hotel) is ${budget} INR.

            Step 1: Evaluate the budget. Is ${budget} INR realistic for ${treatment} including ${tripDays} days of travel/stay in ${destination}?
            Step 2: If the budget is absurdly low for a medical procedure (e.g., 500 INR for heart surgery), set "is_budget_realistic" to false. Leave the itinerary blank, and write a hilarious, slightly sarcastic roast in "roast_message" telling them medical miracles aren't that cheap.
            Step 3: If the budget is realistic (even if tight), set "is_budget_realistic" to true. Provide top hospital recommendations, a medical-focused itinerary (consultation, procedure, recovery), and adjust costs to fit near ${budget} INR.

            You MUST return ONLY a valid JSON object matching this exact structure, with no markdown formatting:
            {
                "is_budget_realistic": true,
                "roast_message": "Fill this only if budget is false. Make it funny.",
                "hospitals": [
                    { "name": "Hospital Name", "description": "Why it's good for this treatment" }
                ],
                "itinerary": [
                    { "day": "Day 1: Arrival & Consult", "activities": "Brief description", "dining": "Recovery diet or hotel room service tips" }
                ],
                "medical_tips": "Brief tip on local medical visas, insurance, or recovery transport.",
                "costs": {
                    "transport": 0,
                    "treatment": 0,
                    "hotel": 0
                }
            }
        `;

        try {
            const data = await fetchWithRetry({ contents: [{ parts: [{ text: prompt }] }] });
            setResults(data);
            setTimeout(() => {
                document.getElementById('results-area')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        } catch (err) {
            setError("API Error: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    const formatPrice = (num) => '₹' + num.toLocaleString('en-IN');
    const platformFee = 2499;

    return (
        <div className="antialiased selection:bg-rose-500 selection:text-white bg-slate-900 text-slate-100 min-h-screen relative overflow-x-hidden">
            <div className="fixed -z-10 blur-[80px] opacity-40 top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-rose-600 rounded-full animate-pulse"></div>
            <div className="fixed -z-10 blur-[80px] opacity-40 bottom-[20%] right-[-10%] w-[50vw] h-[50vw] bg-indigo-600 rounded-full animate-pulse delay-700"></div>

            <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 rounded-full px-6 py-3 w-[95%] max-w-7xl mx-auto flex justify-between items-center transition-all duration-300 bg-slate-900/50 backdrop-blur-2xl border border-white/10 shadow-lg">
                <Link to="/" className="flex items-center gap-2">
                    <span className="font-extrabold text-2xl tracking-tight text-white">India<span className="text-rose-500">Xplore</span></span>
                </Link>
                <Link to="/" className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors bg-white/5 px-4 py-2 rounded-full border border-white/10">
                    <ArrowLeft className="w-4 h-4" /> Back to Home
                </Link>
            </nav>

            <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto min-h-screen flex flex-col gap-12">
                <div className="text-center max-w-3xl mx-auto">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-rose-500/20 text-rose-400 mb-6 ring-1 ring-rose-500/30">
                        <HeartPulse className="w-8 h-8" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-serif">Medical Travel Planner</h1>
                    <p className="text-slate-300 text-lg">World-class healthcare combined with seamless travel. Tell us your medical needs, and our AI will coordinate the perfect healing journey.</p>
                </div>

                <div className="bg-white/5 backdrop-blur-md rounded-[32px] p-8 md:p-12 border border-white/10 border-t-rose-500/30 shadow-2xl relative overflow-hidden max-w-5xl mx-auto w-full">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 relative z-10">
                        <div className="relative w-full">
                            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Traveling From</label>
                            <div className="absolute bottom-0 left-0 pl-4 pb-4 flex items-center pointer-events-none">
                                <MapPin className="w-5 h-5 text-slate-500" />
                            </div>
                            <input type="text" value={startLocation} onChange={e => setStartLocation(e.target.value)} placeholder="e.g. London, Dubai"
                                className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:border-rose-500 transition-colors placeholder-slate-500" />
                        </div>

                        <div className="relative w-full">
                            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Destination City</label>
                            <div className="absolute bottom-0 left-0 pl-4 pb-4 flex items-center pointer-events-none">
                                <Navigation className="w-5 h-5 text-slate-500" />
                            </div>
                            <input type="text" value={destination} onChange={e => setDestination(e.target.value)} placeholder="e.g. Chennai, Mumbai, Delhi"
                                className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:border-rose-500 transition-colors placeholder-slate-500" />
                        </div>

                        <div className="relative w-full flex gap-4">
                            <div className="flex-1">
                                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Arrival Date</label>
                                <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} style={{ colorScheme: 'dark' }}
                                    className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl px-4 py-4 focus:outline-none focus:border-rose-500 transition-colors text-sm" />
                            </div>
                            <div className="flex-1">
                                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Departure Date</label>
                                <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} style={{ colorScheme: 'dark' }}
                                    className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl px-4 py-4 focus:outline-none focus:border-rose-500 transition-colors text-sm" />
                            </div>
                        </div>

                        <div className="relative w-full">
                            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Total Budget (INR)</label>
                            <div className="absolute bottom-0 left-0 pl-4 pb-4 flex items-center pointer-events-none">
                                <IndianRupee className="w-5 h-5 text-rose-500" />
                            </div>
                            <input type="number" value={budget} onChange={e => setBudget(e.target.value)} placeholder="e.g. 150000" min="1"
                                className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:border-rose-500 transition-colors placeholder-slate-500" />
                        </div>

                        <div className="relative w-full">
                            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 text-rose-300">Preferred Hospital (Optional)</label>
                            <div className="absolute bottom-0 left-0 pl-4 pb-4 flex items-center pointer-events-none">
                                <Building2 className="w-5 h-5 text-slate-500" />
                            </div>
                            <input type="text" value={hospital} onChange={e => setHospital(e.target.value)} placeholder="e.g. Apollo, Fortis"
                                className="w-full bg-slate-900/50 border border-rose-500/30 text-white rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:border-rose-500 transition-colors placeholder-slate-500" />
                        </div>

                        <div className="relative w-full">
                            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 text-rose-300">Treatment or Condition Required</label>
                            <div className="absolute bottom-0 left-0 pl-4 pb-4 flex items-center pointer-events-none">
                                <Stethoscope className="w-5 h-5 text-slate-500" />
                            </div>
                            <input type="text" value={treatment} onChange={e => setTreatment(e.target.value)} placeholder="e.g. Cardiology, Dental"
                                className="w-full bg-slate-900/50 border border-rose-500/30 text-white rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:border-rose-500 transition-colors placeholder-slate-500" />
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-700/50 pt-8 relative z-10">
                        <div className="text-sm flex flex-wrap items-center gap-2">
                            <span className="text-white font-bold px-3 py-1.5 bg-white/10 rounded-lg shadow-inner">{startLocation || 'Origin'}</span>
                            <ArrowRightLeft className="w-4 h-4 text-rose-500" />
                            <span className="text-white font-bold px-3 py-1.5 bg-white/10 rounded-lg shadow-inner">{destination || 'Destination'}</span>
                            <span className="text-slate-400 ml-2 font-medium text-sm border-l border-slate-600 pl-3">{calculateDays()} Days</span>
                            <span className="text-rose-400 font-bold text-sm border-l border-slate-600 pl-3">Budget: {budget ? formatPrice(Number(budget)) : 'TBD'}</span>
                        </div>
                        <button onClick={generateMedicalPlan} disabled={loading} className={`w-full sm:w-auto bg-rose-500 hover:bg-rose-400 text-white font-bold py-4 px-8 rounded-xl shadow-[0_0_20px_rgba(244,63,94,0.4)] transition-all flex items-center justify-center gap-2 whitespace-nowrap ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                            <Activity className="w-5 h-5" /> Generate Medical Plan
                        </button>
                    </div>

                    {loading && (
                        <div className="flex flex-col items-center justify-center py-10 mt-4 relative z-10">
                            <div className="w-10 h-10 border-4 border-white/10 border-b-rose-500 rounded-full animate-spin mb-4"></div>
                            <p className="text-rose-400 font-medium animate-pulse">Consulting our AI medical coordinators...</p>
                            <p className="text-xs text-slate-500 mt-2">Finding top specialists, accommodations, and planning recovery...</p>
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mt-6 text-sm flex items-start gap-3 relative z-10">
                            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                            <span>{error}</span>
                        </div>
                    )}
                </div>

                <div id="results-area">
                    {results && results.is_budget_realistic === false && (
                        <div className="max-w-3xl mx-auto w-full animate-in zoom-in-95">
                            <div className="bg-rose-600/10 border border-rose-500/30 rounded-[32px] p-8 md:p-12 text-center relative overflow-hidden shadow-[0_0_40px_rgba(244,63,94,0.2)]">
                                <div className="w-20 h-20 mx-auto bg-rose-500/20 rounded-full flex items-center justify-center mb-6 ring-1 ring-rose-500/40">
                                    <Activity className="w-10 h-10 text-rose-500" />
                                </div>
                                <h2 className="text-3xl font-bold text-white mb-4">Is this a joke?</h2>
                                <p className="text-lg text-rose-200 leading-relaxed italic">
                                    "{results.roast_message}"
                                </p>
                            </div>
                        </div>
                    )}

                    {results && results.is_budget_realistic === true && (
                        <div className="max-w-5xl mx-auto w-full flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-5">
                            <div className="bg-white/5 backdrop-blur-md rounded-[32px] p-8 md:p-10 border border-white/10 border-t-rose-500/20 shadow-2xl">
                                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-white"><Building2 className="text-rose-400" /> Recommended Medical Centers</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {results.hospitals?.map((h, i) => (
                                        <div key={i} className="bg-slate-900/40 p-5 rounded-2xl border border-rose-500/20 hover:border-rose-500/50 transition-colors group">
                                            <h4 className="font-bold text-white mb-2 flex items-center justify-between">
                                                {h.name}
                                                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(h.name + ', ' + destination)}`} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-rose-400 transition-colors">
                                                    <ExternalLink className="w-4 h-4" />
                                                </a>
                                            </h4>
                                            <p className="text-xs text-slate-400 leading-relaxed">{h.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                <div className="bg-white/5 backdrop-blur-md rounded-[32px] p-8 md:p-10 lg:col-span-2 border border-white/10 shadow-2xl">
                                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-white"><ClipboardList className="text-rose-400" /> Medical Itinerary</h3>

                                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 mb-8 flex gap-4">
                                        <ShieldAlert className="w-6 h-6 text-blue-400 shrink-0 mt-1" />
                                        <p className="text-sm text-slate-300 leading-relaxed">{results.medical_tips}</p>
                                    </div>

                                    <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent">
                                        {results.itinerary?.map((day, idx) => (
                                            <div key={idx} className="relative flex items-start group">
                                                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-slate-900 bg-rose-500 text-white shadow shrink-0 relative z-10 ml-0.5 mt-2">
                                                    <Activity className="w-4 h-4" />
                                                </div>
                                                <div className="ml-6 bg-slate-900/40 p-5 rounded-2xl w-full border border-white/5 hover:border-rose-500/30 transition-colors shadow-lg">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="font-bold text-rose-400 text-sm">{day.day}</span>
                                                    </div>
                                                    <p className="text-sm text-slate-300 mb-3"><span className="text-white font-medium">Focus:</span> {day.activities}</p>
                                                    <p className="text-xs text-slate-400 flex items-start gap-1">
                                                        <Utensils className="w-3 h-3 shrink-0 mt-0.5 text-green-400" />
                                                        <span>{day.dining}</span>
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-white/5 backdrop-blur-md rounded-[32px] p-8 border border-rose-500/30 relative overflow-hidden h-fit sticky top-32 shadow-2xl">
                                    <div className="absolute top-0 right-0 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>

                                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-white"><Receipt className="text-rose-400" /> Estimate</h3>

                                    <div className="space-y-4 text-sm font-medium mb-8">
                                        <div className="flex justify-between items-center pb-4 border-b border-slate-700/50">
                                            <span className="text-slate-400 flex items-center gap-2"><Plane className="w-4 h-4" /> Flights/Transport</span>
                                            <span className="text-white">{formatPrice(results.costs?.transport || 0)}</span>
                                        </div>
                                        <div className="flex justify-between items-center pb-4 border-b border-slate-700/50">
                                            <span className="text-slate-400 flex items-center gap-2"><Stethoscope className="w-4 h-4 text-rose-400" /> Treatment Est.</span>
                                            <span className="text-white">{formatPrice(results.costs?.treatment || 0)}</span>
                                        </div>
                                        <div className="flex justify-between items-center pb-4 border-b border-slate-700/50">
                                            <span className="text-slate-400 flex items-center gap-2"><Hotel className="w-4 h-4" /> Accommodations</span>
                                            <span className="text-white">{formatPrice(results.costs?.hotel || 0)}</span>
                                        </div>
                                        <div className="flex justify-between items-center pb-4 border-b border-slate-700/50">
                                            <span className="text-slate-400 flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> Medical Concierge</span>
                                            <span className="text-white">{formatPrice(platformFee)}</span>
                                        </div>
                                        <div className="flex justify-between items-center pt-2 text-lg">
                                            <span className="text-white font-bold">Total Cost</span>
                                            <span className="text-rose-400 font-bold text-2xl">{formatPrice((results.costs?.transport || 0) + (results.costs?.treatment || 0) + (results.costs?.hotel || 0) + platformFee)}</span>
                                        </div>
                                    </div>

                                    <button className="w-full bg-rose-500 hover:bg-rose-400 text-white font-bold text-lg py-4 rounded-xl shadow-[0_0_25px_rgba(225,29,72,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer group">
                                        <CheckCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
                                        Request Booking
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Medical;
