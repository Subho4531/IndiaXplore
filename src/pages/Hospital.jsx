import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowLeft, MapPin, Search, AlertCircle,
    Stethoscope, Activity, Building2, Lock, CheckCircle, IndianRupee
} from 'lucide-react';

const apiKey = "AIzaSyBYMyDqUZe_hKSc2KTS80IacTJ5caloadk";

const Hospital = () => {
    const [step, setStep] = useState('search'); // 'search', 'loading', 'recommendations', 'checkout', 'success'
    const [city, setCity] = useState('');
    const [treatment, setTreatment] = useState('');
    const [hospitalPref, setHospitalPref] = useState('');

    const [recommendations, setRecommendations] = useState([]);
    const [selectedHospital, setSelectedHospital] = useState(null);
    const [error, setError] = useState('');

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
        if (!city.trim() || !treatment.trim()) {
            setError("City and Treatment are required fields.");
            return;
        }

        setError('');

        if (hospitalPref.trim()) {
            // User specified a hospital, go straight to checkout
            setSelectedHospital({ name: hospitalPref, consult_fee: 'Standard Hospital Rates' });
            setStep('checkout');
        } else {
            setStep('loading');

            const prompt = `
                Act as a medical directory for India.
                The user needs treatment for "${treatment}" in the city of "${city}".
                Recommend 3 top, highly-rated hospitals in ${city} that specialize in ${treatment}. Provide a realistic consultation fee estimate in INR (e.g., "₹1000 - ₹2500").

                You MUST return ONLY a valid JSON object matching this exact structure, with no markdown formatting:
                {
                    "hospitals": [
                        {
                            "name": "Exact Hospital Name",
                            "specialty": "1 sentence on why it is good for this specific treatment.",
                            "consult_fee": "₹1500"
                        }
                    ]
                }
            `;

            try {
                const data = await fetchWithRetry({ contents: [{ parts: [{ text: prompt }] }] });
                setRecommendations(data.hospitals || []);
                setStep('recommendations');
            } catch (err) {
                setError("Unable to fetch hospital recommendations. Please try a different city or specify a hospital manualy. " + err.message);
                setStep('search');
            }
        }
    };

    const processPayment = () => {
        setSelectedHospital(prev => ({ ...prev, processing: true }));

        setTimeout(() => {
            setStep('success');
            setSelectedHospital(prev => ({ ...prev, processing: false }));
        }, 1500);
    };

    const getTomorrowDateStr = () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    };

    return (
        <div className="antialiased selection:bg-rose-500 selection:text-white bg-slate-900 text-slate-100 min-h-screen relative overflow-x-hidden">
            <div className="fixed -z-10 blur-[80px] opacity-40 top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-rose-600 rounded-full animate-pulse"></div>
            <div className="fixed -z-10 blur-[80px] opacity-40 bottom-[20%] right-[-10%] w-[50vw] h-[50vw] bg-blue-500 rounded-full animate-pulse delay-700"></div>

            <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 rounded-full px-6 py-3 w-[95%] max-w-7xl mx-auto flex justify-between items-center transition-all duration-300 bg-slate-900/50 backdrop-blur-2xl border border-white/10 shadow-lg">
                <Link to="/" className="flex items-center gap-2">
                    <span className="font-extrabold text-2xl tracking-tight text-white">India<span className="text-rose-500">Xplore</span></span>
                </Link>
                <Link to="/medical" className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors bg-white/5 px-4 py-2 rounded-full border border-white/10">
                    <ArrowLeft className="w-4 h-4" /> Back to Portal
                </Link>
            </nav>

            <main className="pt-32 pb-24 px-6 max-w-4xl mx-auto min-h-screen flex flex-col gap-8 relative">

                {step === 'search' && (
                    <div className="w-full animate-in zoom-in-95">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-rose-500/20 text-rose-400 mb-6 ring-1 ring-rose-500/30 shadow-[0_0_30px_rgba(225,29,72,0.3)]">
                                <Stethoscope className="w-8 h-8" />
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-serif">Book an Appointment</h1>
                            <p className="text-slate-300 max-w-2xl mx-auto">Fast, hassle-free hospital appointments across India. Let us handle the queue.</p>
                        </div>

                        <div className="bg-white/5 backdrop-blur-md rounded-[32px] p-8 md:p-10 border border-t-rose-500/30 border-white/10 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>

                            <div className="space-y-6 relative z-10">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Target City *</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <MapPin className="w-5 h-5 text-slate-500" />
                                        </div>
                                        <input type="text" value={city} onChange={e => setCity(e.target.value)} placeholder="e.g. Bangalore, Delhi, Chennai"
                                            className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:border-rose-500 transition-colors" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Treatment / Specialty *</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Activity className="w-5 h-5 text-slate-500" />
                                        </div>
                                        <input type="text" value={treatment} onChange={e => setTreatment(e.target.value)} placeholder="e.g. Cardiology, Orthopedics, General Checkup"
                                            className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:border-rose-500 transition-colors" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-rose-300 uppercase tracking-wider mb-2">Preferred Hospital (Optional)</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Building2 className="w-5 h-5 text-slate-500" />
                                        </div>
                                        <input type="text" value={hospitalPref} onChange={e => setHospitalPref(e.target.value)} placeholder="If blank, we will recommend the best options"
                                            className="w-full bg-slate-900/50 border border-rose-500/30 text-white rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:border-rose-500 transition-colors" />
                                    </div>
                                </div>

                                <button onClick={handleSearch} className="w-full bg-rose-500 hover:bg-rose-400 text-white font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(244,63,94,0.4)] transition-all flex items-center justify-center gap-2 mt-4 relative z-10">
                                    <Search className="w-5 h-5" /> Find Availability
                                </button>

                                {error && (
                                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm flex items-start gap-3 mt-4 relative z-10">
                                        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                                        <span>{error}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {step === 'loading' && (
                    <div className="flex flex-col items-center justify-center py-20 w-full animate-in fade-in">
                        <div className="w-12 h-12 border-4 border-white/10 border-b-rose-500 rounded-full animate-spin mb-6"></div>
                        <h2 className="text-2xl font-bold text-white mb-2">Searching Medical Network...</h2>
                        <p className="text-rose-400 font-medium animate-pulse">Finding the best specialists for your treatment.</p>
                    </div>
                )}

                {step === 'recommendations' && (
                    <div className="w-full animate-in slide-in-from-bottom-5">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-3xl font-bold text-white mb-2 font-serif">Recommended Hospitals</h2>
                                <p className="text-slate-400 text-sm">Based on your requirement for <span className="text-rose-400 font-bold">{treatment}</span> in <span className="text-rose-400 font-bold">{city}</span>.</p>
                            </div>
                            <button onClick={() => setStep('search')} className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10 text-slate-400 hover:text-white">
                                <Search className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            {recommendations.map((h, i) => (
                                <div key={i} className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:border-rose-500/50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 group shadow-lg">
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-1">{h.name}</h3>
                                        <p className="text-sm text-slate-400 mb-2">{h.specialty}</p>
                                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">
                                            <IndianRupee className="w-3 h-3" /> Est. Consult: {h.consult_fee}
                                        </span>
                                    </div>
                                    <button onClick={() => { setSelectedHospital(h); setStep('checkout'); }} className="shrink-0 px-6 py-3 bg-white/10 group-hover:bg-rose-500 group-hover:text-white text-rose-300 font-medium rounded-xl transition-all border border-rose-500/30 whitespace-nowrap shadow-md">
                                        Select & Book
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {step === 'checkout' && selectedHospital && (
                    <div className="w-full animate-in slide-in-from-right-5">
                        <div className="flex items-center gap-4 mb-8">
                            <button onClick={() => selectedHospital.consult_fee === 'Standard Hospital Rates' ? setStep('search') : setStep('recommendations')} className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10 text-white">
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                            <h2 className="text-3xl font-bold text-white font-serif">Confirm Appointment</h2>
                        </div>

                        <div className="bg-white/5 backdrop-blur-md rounded-[32px] p-8 border border-white/10 relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

                            <div className="bg-slate-900/60 rounded-2xl p-6 border border-slate-700/50 mb-8 relative z-10">
                                <h3 className="text-xl font-bold text-white mb-6 border-b border-slate-700/50 pb-4">Booking Details</h3>

                                <div className="space-y-4 text-sm">
                                    <div className="flex justify-between items-start">
                                        <span className="text-slate-400">Hospital</span>
                                        <span className="text-white font-bold text-right max-w-[60%]">{selectedHospital.name}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-400">Treatment</span>
                                        <span className="text-rose-400 font-medium bg-rose-500/10 px-3 py-1 rounded-full">{treatment}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-400">Date & Time</span>
                                        <span className="text-white font-medium">{getTomorrowDateStr()}, 10:30 AM</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-slate-900/60 rounded-2xl p-6 border border-slate-700/50 mb-8 relative z-10">
                                <h3 className="text-lg font-bold text-white mb-4 border-b border-slate-700/50 pb-3">Payment Summary</h3>

                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-400">Est. Consultation Fee (Pay at Hospital)</span>
                                        <span className="text-white">{selectedHospital.consult_fee}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-rose-400">
                                        <span>IndiaXplore Fast-Track Fee</span>
                                        <span>₹499</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-4 mt-2 border-t border-slate-700/50 text-lg">
                                        <span className="text-white font-bold">Amount to Pay Now</span>
                                        <span className="text-white font-bold text-2xl">₹499</span>
                                    </div>
                                </div>
                            </div>

                            <button onClick={processPayment} disabled={selectedHospital?.processing} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg py-4 rounded-xl shadow-[0_0_25px_rgba(37,99,235,0.4)] transition-all flex items-center justify-center gap-2 relative z-10 disabled:opacity-80 disabled:cursor-not-allowed">
                                {selectedHospital?.processing ? (
                                    <><div className="w-5 h-5 border-[2px] border-white/20 border-b-white rounded-full animate-spin"></div> Processing...</>
                                ) : (
                                    <><Lock className="w-5 h-5" /> Secure Pay ₹499 & Confirm</>
                                )}
                            </button>
                        </div>
                    </div>
                )}

                {step === 'success' && selectedHospital && (
                    <div className="flex flex-col items-center justify-center py-16 w-full text-center animate-in zoom-in-95">
                        <div className="w-24 h-24 mb-6 bg-emerald-500/20 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-12 h-12 text-emerald-400" />
                        </div>
                        <h2 className="text-4xl font-bold text-white mb-4 font-serif">Appointment Confirmed!</h2>
                        <p className="text-slate-300 mb-8 max-w-md mx-auto">Your fast-track appointment at <span className="font-bold text-white">{selectedHospital.name}</span> has been successfully booked. We have sent the confirmation details to your registered email/phone.</p>

                        <button onClick={() => {
                            setStep('search');
                            setCity('');
                            setTreatment('');
                            setHospitalPref('');
                            setSelectedHospital(null);
                        }} className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium rounded-full transition-colors shadow-lg">
                            Book Another Appointment
                        </button>
                    </div>
                )}

            </main>
        </div>
    );
};

export default Hospital;
