import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowLeft, MapPin, CalendarDays, Sun, Calendar, CalendarCheck,
    Sparkles, AlertCircle, Camera, ExternalLink, Map, Info, Receipt,
    Plane, Hotel as HotelIcon, Utensils, ShieldCheck, CreditCard
} from 'lucide-react';

const apiKey = "AIzaSyBYMyDqUZe_hKSc2KTS80IacTJ5caloadk";

const Agra = () => {
    const [startLocation, setStartLocation] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [tripDays, setTripDays] = useState(7);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [results, setResults] = useState(null);

    // Initialize dates
    useEffect(() => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const sevenDaysLater = new Date(tomorrow);
        sevenDaysLater.setDate(sevenDaysLater.getDate() + 7);

        setStartDate(tomorrow.toISOString().split('T')[0]);
        setEndDate(sevenDaysLater.toISOString().split('T')[0]);
    }, []);

    // Effect to recalculate days when dates change
    useEffect(() => {
        if (startDate && endDate) {
            let start = new Date(startDate);
            let end = new Date(endDate);

            if (end <= start) {
                // If end is before or equal to start, push end date
                end = new Date(start);
                end.setDate(end.getDate() + 7);
                setEndDate(end.toISOString().split('T')[0]);
            }

            const diffTime = Math.abs(end - start);
            const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
            setTripDays(days);
        }
    }, [startDate, endDate]);

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
        if (!startLocation.trim()) {
            setError("Please enter your starting location first.");
            return;
        }

        setError('');
        setLoading(true);
        setResults(null);

        const prompt = `
            Act as an expert travel planner for India. 
            The user is traveling from ${startLocation} to Agra, Uttar Pradesh from ${startDate} to ${endDate} (a ${tripDays}-day trip).
            Generate a highly structured JSON response detailing this trip.
            Ensure the total cost closely approaches 15,000 INR to 20,000 INR (approx 18k) based on realistic estimations from their origin. Keep the platform fee fixed at 499.

            You MUST return ONLY a valid JSON object matching this exact structure, with no markdown formatting:
            {
                "itinerary": [
                    { "day": "Day 1: Arrival & Sunset Taj Mahal", "activities": "Brief description of places to visit", "dining": "Restaurant tips" }
                ],
                "highlights": [
                    { "name": "Taj Mahal", "description": "Brief detail" }
                ],
                "communication_tips": "Brief tip on local transport, language, or connectivity in Agra.",
                "costs": {
                    "transport": 3000,
                    "hotel": 8000,
                    "food": 5501
                }
            }
        `;

        const payload = { contents: [{ parts: [{ text: prompt }] }] };

        try {
            const data = await fetchWithRetry(payload);
            setResults(data);
            setTimeout(() => {
                document.getElementById('results-container')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        } catch (err) {
            setError("API Error: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    const formatPrice = (num) => '₹' + num.toLocaleString('en-IN');
    const platformFee = 499;

    return (
        <div className="antialiased selection:bg-orange-accent selection:text-white bg-slate-900 text-slate-100 min-h-screen relative overflow-x-hidden">
            {/* Ambient Background */}
            <div className="fixed -z-10 blur-[80px] opacity-50 top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-indigo-600 rounded-full animate-pulse"></div>
            <div className="fixed -z-10 blur-[80px] opacity-50 bottom-[20%] right-[-10%] w-[50vw] h-[50vw] bg-pink-600 rounded-full animate-pulse delay-700"></div>

            {/* Navbar */}
            <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 rounded-full px-6 py-3 w-[95%] max-w-7xl mx-auto flex justify-between items-center transition-all duration-300 bg-slate-900/50 backdrop-blur-2xl border border-white/10 shadow-lg">
                <Link to="/" className="flex items-center gap-2">
                    <span className="font-extrabold text-2xl tracking-tight text-white">India<span className="text-orange-accent">Xplore</span></span>
                </Link>
                <Link to="/" className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors bg-white/5 px-4 py-2 rounded-full border border-white/10">
                    <ArrowLeft className="w-4 h-4" /> Back to Home
                </Link>
            </nav>

            {/* Main Content */}
            <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto min-h-screen">
                <div className="flex flex-col lg:flex-row gap-10 items-start">

                    {/* Left Side */}
                    <div className="w-full lg:w-5/12 lg:sticky lg:top-32 relative">
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[32px] p-3 shadow-2xl">
                            <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
                                <img src="https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1171&auto=format&fit=crop" alt="Agra" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent"></div>
                                <div className="absolute bottom-8 left-8 right-8">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs font-semibold uppercase tracking-wider mb-3 shadow-md">
                                        <MapPin className="w-3 h-3 text-white" /> Uttar Pradesh
                                    </div>
                                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 shadow-sm font-serif">Agra</h1>
                                    <p className="text-slate-200 text-sm font-medium opacity-90">The City of Taj</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl flex flex-col items-center justify-center text-center shadow-lg">
                                <CalendarDays className="w-6 h-6 text-orange-accent mb-2" />
                                <span className="text-xs text-slate-400 uppercase tracking-widest">Duration</span>
                                <span className="font-bold text-lg text-white">7 Days</span>
                            </div>
                            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl flex flex-col items-center justify-center text-center shadow-lg">
                                <Sun className="w-6 h-6 text-yellow-400 mb-2" />
                                <span className="text-xs text-slate-400 uppercase tracking-widest">Best Time</span>
                                <span className="font-bold text-lg text-white">Oct - Mar</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="w-full lg:w-7/12 flex flex-col gap-6">
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[32px] p-8 md:p-10 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-accent/10 rounded-full blur-3xl"></div>

                            <h2 className="text-3xl font-bold mb-2 text-white">Plan Your Journey</h2>
                            <p className="text-slate-400 text-sm mb-8">Enter your starting location and our AI will craft a personalized itinerary, highlight must-visit spots, and estimate travel costs.</p>

                            <div className="flex flex-col gap-4 mb-6">
                                <div className="relative w-full">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <MapPin className="w-5 h-5 text-slate-500" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Where are you traveling from?"
                                        value={startLocation}
                                        onChange={(e) => setStartLocation(e.target.value)}
                                        className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:border-orange-accent transition-colors placeholder-slate-500"
                                    />
                                </div>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <div className="relative flex-1">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Calendar className="w-5 h-5 text-slate-500" />
                                        </div>
                                        <input
                                            type="date"
                                            value={startDate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                            style={{ colorScheme: 'dark' }}
                                            className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:border-orange-accent transition-colors text-sm"
                                        />
                                    </div>
                                    <div className="relative flex-1">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <CalendarCheck className="w-5 h-5 text-slate-500" />
                                        </div>
                                        <input
                                            type="date"
                                            value={endDate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                            style={{ colorScheme: 'dark' }}
                                            className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:border-orange-accent transition-colors text-sm"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div className="text-sm flex items-center gap-2">
                                    <span className="text-white font-bold text-sm md:text-base px-3 py-1.5 bg-white/10 rounded-lg shadow-inner">
                                        {startLocation || 'Origin'}
                                    </span>
                                    <ArrowLeft className="w-4 h-4 text-orange-accent rotate-180" />
                                    <span className="text-white font-bold text-sm md:text-base px-3 py-1.5 bg-white/10 rounded-lg shadow-inner">Agra</span>
                                    <span className="text-slate-400 ml-1 md:ml-2 font-medium text-xs md:text-sm whitespace-nowrap">{tripDays} Days Trip</span>
                                </div>
                                <button
                                    onClick={generateItinerary}
                                    disabled={loading || !startLocation}
                                    className={`w-full sm:w-auto bg-orange-accent hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-xl transition-all flex items-center justify-center gap-2 whitespace-nowrap shadow-[0_0_20px_rgba(241,165,1,0.3)] ${loading || !startLocation ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    <Sparkles className="w-5 h-5" /> Generate Plan
                                </button>
                            </div>

                            {loading && (
                                <div className="flex flex-col items-center justify-center py-10 mt-4">
                                    <div className="w-10 h-10 border-4 border-white/10 border-b-orange-accent rounded-full animate-spin mb-4"></div>
                                    <p className="text-orange-accent font-medium animate-pulse">Crafting your perfect Agra experience...</p>
                                </div>
                            )}

                            {error && (
                                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mt-6 text-sm flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                                    <span>{error}</span>
                                </div>
                            )}
                        </div>

                        {/* Results Container */}
                        {results && (
                            <div id="results-container" className="flex flex-col gap-6">
                                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl">
                                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-white"><Camera className="text-orange-accent" /> Key Highlights</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {results.highlights.map((h, i) => (
                                            <div key={i} className="bg-slate-900/40 p-4 rounded-2xl border border-white/5 hover:bg-white/5 transition-colors group">
                                                <h4 className="font-bold text-white mb-2 flex items-center justify-between">
                                                    {h.name}
                                                    <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(h.name + ', Agra')}`} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-orange-accent transition-colors">
                                                        <ExternalLink className="w-4 h-4" />
                                                    </a>
                                                </h4>
                                                <p className="text-xs text-slate-400 leading-relaxed">{h.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl">
                                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-white"><Map className="text-orange-accent" /> Your Itinerary</h3>
                                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 mb-8 flex gap-4">
                                        <Info className="w-6 h-6 text-blue-400 shrink-0" />
                                        <p className="text-sm text-slate-300 leading-relaxed">{results.communication_tips}</p>
                                    </div>

                                    <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent">
                                        {results.itinerary.map((day, idx) => (
                                            <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                                                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-slate-900 bg-orange-accent text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10">
                                                    <MapPin className="w-4 h-4" />
                                                </div>
                                                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white/5 border border-white/10 p-5 rounded-2xl shadow-lg">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="font-bold text-orange-accent text-sm">{day.day}</span>
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

                                <div className="bg-white/5 backdrop-blur-md border border-green-500/30 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl pointer-events-none"></div>
                                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-white"><Receipt className="text-green-400" /> Cost Estimate</h3>

                                    <div className="bg-slate-900/60 rounded-2xl p-6 mb-8 border border-slate-700">
                                        <div className="space-y-4 text-sm font-medium">
                                            <div className="flex justify-between items-center pb-4 border-b border-slate-700/50">
                                                <span className="text-slate-400 flex items-center gap-2"><Plane className="w-4 h-4" /> Flights/Transport</span>
                                                <span className="text-white">{formatPrice(results.costs.transport)}</span>
                                            </div>
                                            <div className="flex justify-between items-center pb-4 border-b border-slate-700/50">
                                                <span className="text-slate-400 flex items-center gap-2"><HotelIcon className="w-4 h-4" /> Accommodations ({tripDays} Days)</span>
                                                <span className="text-white">{formatPrice(results.costs.hotel)}</span>
                                            </div>
                                            <div className="flex justify-between items-center pb-4 border-b border-slate-700/50">
                                                <span className="text-slate-400 flex items-center gap-2"><Utensils className="w-4 h-4" /> Dining & Local Activities</span>
                                                <span className="text-white">{formatPrice(results.costs.food)}</span>
                                            </div>
                                            <div className="flex justify-between items-center pb-4 border-b border-slate-700/50">
                                                <span className="text-slate-400 flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> IndiaXplore Platform Fee</span>
                                                <span className="text-white">{formatPrice(platformFee)}</span>
                                            </div>
                                            <div className="flex justify-between items-center pt-2 text-lg">
                                                <span className="text-white font-bold">Total Estimated Cost</span>
                                                <span className="text-green-400 font-bold text-2xl">{formatPrice(results.costs.transport + results.costs.hotel + results.costs.food + platformFee)}</span>
                                            </div>
                                            <p className="text-xs text-slate-500 text-right mt-1">*Prices are estimated based on your origin.</p>
                                        </div>
                                    </div>

                                    <button className="w-full bg-green-500 hover:bg-green-400 text-slate-900 font-bold text-lg py-5 rounded-xl shadow-[0_0_25px_rgba(34,197,94,0.4)] transition-all flex items-center justify-center gap-2">
                                        <CreditCard className="w-6 h-6" /> Pay {formatPrice(results.costs.transport + results.costs.hotel + results.costs.food + platformFee)} Now
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Agra;
