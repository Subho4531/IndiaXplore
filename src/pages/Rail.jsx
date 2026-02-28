import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowLeft, MapPin, ArrowRightLeft, Search, AlertCircle,
    ArrowRight, Train, Lock, TrainFront, CheckCircle
} from 'lucide-react';

const apiKey = "AIzaSyBYMyDqUZe_hKSc2KTS80IacTJ5caloadk";

const Rail = () => {
    const [step, setStep] = useState('search'); // 'search', 'loading', 'results', 'checkout', 'processing', 'success'
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [date, setDate] = useState('');

    const [trains, setTrains] = useState([]);
    const [selectedTrain, setSelectedTrain] = useState(null);
    const [error, setError] = useState('');
    const [confData, setConfData] = useState(null);

    useEffect(() => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        setDate(tomorrow.toISOString().split('T')[0]);
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

    const handleSearch = async () => {
        if (!origin.trim() || !destination.trim()) {
            setError("Please enter both Origin and Destination stations/cities.");
            return;
        }

        setError('');
        setStep('loading');

        const prompt = `
            Act as a live Indian Railways (IRCTC) booking aggregator.
            The user is searching for trains from "${origin}" to "${destination}" on ${date}.
            Generate 4 realistic train options. Mix train types (e.g., Vande Bharat Express, Rajdhani, Shatabdi, Superfast Express).
            Calculate a realistic train journey duration between these two cities and set departure/arrival times.
            Provide realistic prices in INR for a standard AC class (e.g., 3A or CC).

            You MUST return ONLY a valid JSON object matching this exact structure, with no markdown formatting:
            {
                "trains": [
                    {
                        "train_name": "Vande Bharat Express",
                        "train_number": "22435",
                        "departure_time": "06:00 AM",
                        "arrival_time": "02:00 PM",
                        "duration": "8h 00m",
                        "class_type": "CC",
                        "price": 1250
                    }
                ]
            }
        `;

        try {
            const data = await fetchWithRetry({ contents: [{ parts: [{ text: prompt }] }] });
            setTrains(data.trains || []);
            setStep('results');
        } catch (err) {
            setError("Unable to fetch trains. Please try different stations. " + err.message);
            setStep('search');
        }
    };

    const processPayment = () => {
        setStep('processing');
        setTimeout(() => {
            const coaches = ['A1', 'A2', 'B1', 'B2', 'B3', 'B4', 'C1', 'C2', 'S1', 'S2'];
            const randomCoach = coaches[Math.floor(Math.random() * coaches.length)];
            const randomSeat = Math.floor(Math.random() * 72) + 1;

            setConfData({
                pnr: Math.floor(1000000000 + Math.random() * 9000000000),
                seat: `${randomCoach} / ${randomSeat}`
            });
            setStep('success');
        }, 2500);
    };

    const formatPrice = (num) => '₹' + num.toLocaleString('en-IN');
    const getTrainColor = (name) => {
        const n = name.toLowerCase();
        if (n.includes('vande')) return 'text-blue-400';
        if (n.includes('rajdhani')) return 'text-rose-500';
        return 'text-orange-400';
    };

    return (
        <div className="antialiased selection:bg-orange-500 selection:text-white bg-slate-900 text-slate-100 min-h-screen relative overflow-x-hidden">
            <div className="fixed -z-10 blur-[80px] opacity-30 top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-orange-500 rounded-full animate-pulse"></div>
            <div className="fixed -z-10 blur-[80px] opacity-30 bottom-[20%] right-[-10%] w-[50vw] h-[50vw] bg-yellow-500 rounded-full animate-pulse delay-700"></div>

            <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 rounded-full px-6 py-3 w-[95%] max-w-7xl mx-auto flex justify-between items-center transition-all duration-300 bg-slate-900/50 backdrop-blur-2xl border border-white/10 shadow-lg">
                <Link to="/" className="flex items-center gap-2">
                    <span className="font-extrabold text-2xl tracking-tight text-white">India<span className="text-orange-500">Xplore</span></span>
                </Link>
                <Link to="/tourism" className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors bg-white/5 px-4 py-2 rounded-full border border-white/10">
                    <ArrowLeft className="w-4 h-4" /> Back
                </Link>
            </nav>

            <main className="pt-32 pb-24 px-6 max-w-5xl mx-auto min-h-screen flex flex-col gap-8 relative">

                {step === 'search' && (
                    <div className="w-full animate-in zoom-in-95">
                        <div className="text-center mb-10">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-orange-500/20 text-orange-400 mb-6 ring-1 ring-orange-500/30 shadow-[0_0_30px_rgba(249,115,22,0.3)]">
                                <TrainFront className="w-10 h-10 drop-shadow-[0_2px_10px_rgba(249,115,22,0.4)] text-orange-500" />
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-serif">Book Trains</h1>
                            <p className="text-slate-300 max-w-2xl mx-auto">Discover seamless railway journeys. Find Express, Rajdhani, and Vande Bharat routes with instant seat availability estimates.</p>
                        </div>

                        <div className="bg-white/5 backdrop-blur-md rounded-[32px] p-6 md:p-10 border border-t-orange-500/30 border-white/10 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>

                            <div className="flex flex-col md:flex-row gap-4 items-end relative z-10">
                                <div className="w-full relative">
                                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">From Station/City</label>
                                    <div className="absolute bottom-0 left-0 pl-4 pb-4 flex items-center pointer-events-none">
                                        <MapPin className="w-5 h-5 text-slate-500" />
                                    </div>
                                    <input type="text" value={origin} onChange={e => setOrigin(e.target.value)} placeholder="e.g. NDLS, Mumbai"
                                        className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:border-orange-500 transition-colors placeholder-slate-500" />
                                </div>

                                <div className="hidden md:flex shrink-0 pb-4 justify-center items-center w-10">
                                    <ArrowRightLeft className="w-5 h-5 text-slate-500" />
                                </div>

                                <div className="w-full relative">
                                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">To Station/City</label>
                                    <div className="absolute bottom-0 left-0 pl-4 pb-4 flex items-center pointer-events-none">
                                        <MapPin className="w-5 h-5 text-slate-500" />
                                    </div>
                                    <input type="text" value={destination} onChange={e => setDestination(e.target.value)} placeholder="e.g. HWH, Chennai"
                                        className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:border-orange-500 transition-colors placeholder-slate-500" />
                                </div>

                                <div className="w-full md:w-64 relative shrink-0">
                                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Journey Date</label>
                                    <input type="date" value={date} onChange={e => setDate(e.target.value)} style={{ colorScheme: 'dark' }}
                                        className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl px-4 py-4 focus:outline-none focus:border-orange-500 transition-colors" />
                                </div>
                            </div>

                            <button onClick={handleSearch} className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(234,88,12,0.4)] transition-all flex items-center justify-center gap-2 mt-8 relative z-10">
                                <Search className="w-5 h-5" /> Search Trains
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
                        <div className="w-12 h-12 border-4 border-white/10 border-b-orange-500 rounded-full animate-spin mb-6"></div>
                        <h2 className="text-2xl font-bold text-white mb-2">Connecting to IRCTC Network...</h2>
                        <p className="text-orange-400 font-medium animate-pulse">Checking seat availability and schedules.</p>
                    </div>
                )}

                {step === 'results' && (
                    <div className="w-full flex-col gap-6 animate-in slide-in-from-bottom-5">
                        <div className="flex items-center justify-between mb-2">
                            <div>
                                <h2 className="text-2xl md:text-3xl font-bold text-white mb-1 flex items-center gap-2 uppercase">
                                    <span>{origin}</span>
                                    <ArrowRight className="w-5 h-5 text-orange-500" />
                                    <span>{destination}</span>
                                </h2>
                                <p className="text-slate-400 text-sm">
                                    {new Date(date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                                </p>
                            </div>
                            <button onClick={() => setStep('search')} className="text-slate-400 hover:text-white px-4 py-2 border border-slate-700 rounded-lg text-sm bg-slate-800/50">
                                Modify Search
                            </button>
                        </div>

                        <div className="space-y-4">
                            {trains.map((t, i) => (
                                <div key={i} className="bg-white/5 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-white/5 hover:border-orange-500/30 transition-all flex flex-col md:flex-row items-center gap-6 group shadow-lg">
                                    <div className="flex items-center gap-4 w-full md:w-1/4">
                                        <div className={`w-12 h-12 rounded-full bg-white/5 flex items-center justify-center ${getTrainColor(t.train_name)}`}>
                                            <TrainFront className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-white text-lg leading-tight mb-1">{t.train_name}</h3>
                                            <span className="text-xs font-mono bg-slate-800 px-2 py-0.5 rounded text-slate-300">#{t.train_number}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between w-full md:w-2/4 px-2">
                                        <div className="text-center md:text-right">
                                            <span className="block font-bold text-white text-xl">{t.departure_time}</span>
                                            <span className="text-xs text-slate-400 uppercase">Depart</span>
                                        </div>

                                        <div className="flex-1 px-4 flex flex-col items-center">
                                            <span className="text-xs text-slate-400 mb-1">{t.duration}</span>
                                            <div className="h-0.5 w-full bg-slate-700 repeating-linear-gradient(to right, #64748b 0, #64748b 4px, transparent 4px, transparent 8px) my-1"></div>
                                            <span className="text-[10px] text-emerald-400 mt-1 font-semibold tracking-wide">AVAILABLE</span>
                                        </div>

                                        <div className="text-center md:text-left">
                                            <span className="block font-bold text-white text-xl">{t.arrival_time}</span>
                                            <span className="text-xs text-slate-400 uppercase">Arrive</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-row md:flex-col items-center justify-between w-full md:w-1/4 border-t md:border-t-0 md:border-l border-slate-700/50 pt-4 md:pt-0 md:pl-6">
                                        <div className="text-left md:text-center md:mb-3 flex flex-col items-start md:items-center">
                                            <span className="block font-bold text-white text-2xl text-orange-400">{formatPrice(t.price)}</span>
                                            <div className="flex items-center gap-2 mt-0.5">
                                                <span className="text-[10px] text-slate-500 uppercase">Class:</span>
                                                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-1.5 rounded">{t.class_type}</span>
                                            </div>
                                        </div>
                                        <button onClick={() => { setSelectedTrain(t); setStep('checkout'); }} className="px-8 py-3 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl transition-colors shadow-lg">
                                            Book Now
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {step === 'checkout' && selectedTrain && (
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
                            <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>

                            <div className="bg-slate-900/60 rounded-2xl p-6 border border-slate-700/50 mb-6 relative z-10">
                                <h3 className="text-lg font-bold text-white mb-4 border-b border-slate-700/50 pb-3">Journey Summary</h3>
                                <div className="flex justify-between items-center text-sm mb-3">
                                    <span className="text-slate-400">Route</span>
                                    <span className="text-white font-bold text-base uppercase"><span>{origin.substring(0, 4)}</span> <Train className="inline w-4 h-4 mx-1 text-orange-400" /> <span>{destination.substring(0, 4)}</span></span>
                                </div>
                                <div className="flex justify-between items-center text-sm mb-3">
                                    <span className="text-slate-400">Train</span>
                                    <span className="text-white font-medium">{selectedTrain.train_name} ({selectedTrain.train_number})</span>
                                </div>
                                <div className="flex justify-between items-center text-sm mb-3">
                                    <span className="text-slate-400">Class</span>
                                    <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">{selectedTrain.class_type}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-400">Date & Departure</span>
                                    <span className="text-white font-medium">{new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} | {selectedTrain.departure_time}</span>
                                </div>
                            </div>

                            <div className="bg-slate-900/60 rounded-2xl p-6 border border-slate-700/50 mb-8 relative z-10">
                                <h3 className="text-lg font-bold text-white mb-4 border-b border-slate-700/50 pb-3">Fare Breakdown</h3>
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-400">Ticket Fare (1 Adult)</span>
                                        <span className="text-white">{formatPrice(selectedTrain.price)}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-400">IRCTC Convenience Fee</span>
                                        <span className="text-white">₹35</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-4 mt-2 border-t border-slate-700/50 text-lg">
                                        <span className="text-white font-bold">Total Amount</span>
                                        <span className="text-orange-400 font-bold text-2xl">{formatPrice(selectedTrain.price + 35)}</span>
                                    </div>
                                </div>
                            </div>

                            <button onClick={processPayment} className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold text-lg py-4 rounded-xl shadow-[0_0_25px_rgba(234,88,12,0.4)] transition-all flex items-center justify-center gap-2 relative z-10">
                                <Lock className="w-5 h-5" /> Secure Pay <span>{formatPrice(selectedTrain.price + 35)}</span>
                            </button>
                        </div>
                    </div>
                )}

                {step === 'processing' && (
                    <div className="flex flex-col items-center justify-center py-20 w-full animate-in fade-in">
                        <div className="w-12 h-12 border-4 border-white/10 border-b-emerald-500 rounded-full animate-spin mb-6"></div>
                        <h2 className="text-2xl font-bold text-white mb-2">Processing Payment...</h2>
                        <p className="text-emerald-400 font-medium animate-pulse">Generating your PNR and Seat number.</p>
                    </div>
                )}

                {step === 'success' && selectedTrain && confData && (
                    <div className="w-full animate-in zoom-in-95">
                        <div className="max-w-2xl mx-auto">
                            <div className="text-center mb-8 flex flex-col items-center">
                                <div className="w-20 h-20 mb-4 bg-emerald-500/20 rounded-full flex items-center justify-center">
                                    <CheckCircle className="w-12 h-12 text-emerald-400" />
                                </div>
                                <h2 className="text-3xl font-bold text-white font-serif">Ticket Confirmed!</h2>
                                <p className="text-slate-400">Your IRCTC e-ticket has been generated successfully.</p>
                            </div>

                            <div className="bg-[#fdfbf7] rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-slate-300">
                                <div className="bg-orange-600 p-4 flex justify-between items-center text-white border-b-4 border-orange-800">
                                    <div className="flex items-center gap-2">
                                        <Train className="w-6 h-6" />
                                        <span className="font-bold tracking-wider uppercase text-sm">Indian Railways</span>
                                    </div>
                                    <div className="text-right flex items-center gap-2">
                                        <span className="block text-xs text-orange-200 uppercase">PNR No:</span>
                                        <span className="font-bold tracking-widest text-lg bg-orange-800 px-2 py-0.5 rounded">{confData.pnr}</span>
                                    </div>
                                </div>

                                <div className="p-6 relative text-slate-800">
                                    <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                                        <TrainFront className="w-64 h-64" />
                                    </div>

                                    <div className="flex justify-between items-start mb-6 border-b border-slate-300 pb-4">
                                        <div>
                                            <span className="block text-xs font-bold text-slate-500 uppercase">Train Name / No.</span>
                                            <span className="font-black text-xl text-slate-900">{selectedTrain.train_name} ({selectedTrain.train_number})</span>
                                        </div>
                                        <div className="text-right">
                                            <span className="block text-xs font-bold text-slate-500 uppercase">Date of Journey</span>
                                            <span className="font-bold text-lg text-slate-900">{new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center mb-6">
                                        <div>
                                            <span className="block text-3xl font-black text-slate-900 uppercase">{origin.substring(0, 4)}</span>
                                            <span className="text-sm font-bold text-slate-600">{selectedTrain.departure_time}</span>
                                        </div>

                                        <div className="flex-1 px-6 flex flex-col items-center">
                                            <span className="text-xs text-slate-500 font-bold mb-1">{selectedTrain.duration}</span>
                                            <div className="h-[3px] w-full bg-slate-400"></div>
                                        </div>

                                        <div className="text-right">
                                            <span className="block text-3xl font-black text-slate-900 uppercase">{destination.substring(0, 4)}</span>
                                            <span className="text-sm font-bold text-slate-600">{selectedTrain.arrival_time}</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-4 border-t border-slate-300 pt-4 relative z-10">
                                        <div>
                                            <span className="block text-xs font-bold text-slate-500 uppercase">Class</span>
                                            <span className="font-bold text-lg text-slate-900">{selectedTrain.class_type}</span>
                                        </div>
                                        <div>
                                            <span className="block text-xs font-bold text-slate-500 uppercase">Status</span>
                                            <span className="font-bold text-lg text-emerald-600">CNF</span>
                                        </div>
                                        <div>
                                            <span className="block text-xs font-bold text-slate-500 uppercase">Coach/Seat</span>
                                            <span className="font-bold text-lg text-slate-900">{confData.seat}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-slate-200 p-4 px-6 flex justify-between items-center border-t border-slate-300 relative z-10">
                                    <div>
                                        <span className="block text-xs font-bold text-slate-500 uppercase">Total Fare</span>
                                        <span className="font-black text-slate-900 text-xl">{formatPrice(selectedTrain.price + 35)}</span>
                                    </div>
                                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=60x60&data=IRCTC-Ticket" alt="QR Code" className="w-12 h-12 mix-blend-multiply border border-slate-400 p-0.5 rounded" />
                                </div>
                            </div>

                            <div className="text-center mt-8">
                                <button onClick={() => {
                                    setStep('search');
                                    setOrigin('');
                                    setDestination('');
                                    setSelectedTrain(null);
                                    setConfData(null);
                                }} className="text-orange-400 hover:text-white transition-colors underline font-medium">Book another train</button>
                            </div>
                        </div>
                    </div>
                )}

            </main>
        </div>
    );
};

export default Rail;
