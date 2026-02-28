import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Shield, Loader2, CheckCheck, CheckCircle2, Scan, X, AlertTriangle, Globe, ShieldCheck, Car } from 'lucide-react';

const avatars = [
    "/People/Woman 2.png",
    "/People/Guy 3.png",
    "/People/Guy 4.png",
    "/People/Woman 2.png",
    "/People/Guy 3.png"
];

const Verify = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const type = searchParams.get('type') || 'indian';
    const uidsParam = searchParams.get('uids');
    const vehicleParam = searchParams.get('vehicle');

    const [status, setStatus] = useState('loading'); // 'loading', 'success', 'error'
    const [uids, setUids] = useState([]);
    const [timestamp, setTimestamp] = useState('');

    useEffect(() => {
        // Simulate API Check Delay
        const timer = setTimeout(() => {
            const parsedUids = uidsParam ? uidsParam.split(',') : [];

            if (parsedUids.length > 0) {
                setUids(parsedUids);
                const now = new Date();
                const options = { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' };
                setTimestamp(now.toLocaleDateString('en-IN', options));
                setStatus('success');
            } else {
                setStatus('error');
            }
        }, 1200);

        return () => clearTimeout(timer);
    }, [uidsParam]);

    const isIndian = type === 'indian';
    const identityText = isIndian ? 'Indian Citizen' : 'Foreign National';
    const idLabel = isIndian ? 'Aadhar' : 'Passport';

    return (
        <div className="antialiased selection:bg-emerald-500 selection:text-white flex flex-col min-h-screen bg-[#020617] text-[#f8fafc]">
            {/* Official Header */}
            <header className="bg-slate-900 border-b border-white/10 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                        <Shield className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="font-bold text-white leading-tight">IndiaXplore</h1>
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Authority Portal</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-full border border-white/5 text-xs text-slate-300 font-mono">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    System Online
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex flex-col items-center justify-center p-6 relative">

                {/* Loading State */}
                {status === 'loading' && (
                    <div className="flex flex-col items-center text-center">
                        <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
                        <h2 className="text-xl font-bold text-white">Verifying Blockchain Record...</h2>
                        <p className="text-sm text-slate-400">Authenticating Group QR signature</p>
                    </div>
                )}

                {/* Success State */}
                {status === 'success' && (
                    <div className="w-full max-w-md">
                        <div className="text-center mb-6">
                            <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3 animate-success-pulse border-4 border-emerald-400/30">
                                <CheckCheck className="w-10 h-10 text-white" />
                            </div>
                            <h2 className="text-3xl font-black text-emerald-400 tracking-tight uppercase">Group Verified</h2>
                            <p className="text-slate-300 text-md font-medium mt-1"><span>{uids.length}</span> Travelers Authenticated</p>
                        </div>

                        {/* Global Security Info */}
                        <div className="grid grid-cols-2 gap-4 text-center mb-6">
                            <div className="bg-slate-900 rounded-xl p-3 border border-slate-700">
                                <span className="block text-[10px] text-slate-500 uppercase font-bold mb-1">Clearance</span>
                                <span className="text-emerald-400 font-medium text-sm flex items-center justify-center gap-1"><CheckCircle2 className="w-3 h-3" /> All States</span>
                            </div>
                            <div className="bg-slate-900 rounded-xl p-3 border border-slate-700">
                                <span className="block text-[10px] text-slate-500 uppercase font-bold mb-1">Scan Timestamp</span>
                                <span className="text-slate-300 font-mono text-xs">{timestamp}</span>
                            </div>
                        </div>

                        {/* Vehicle Info */}
                        {vehicleParam && (
                            <div className="bg-slate-900 rounded-xl p-4 border border-blue-500/30 mb-6 flex items-center justify-between shadow-[0_0_15px_rgba(59,130,246,0.15)]">
                                <div>
                                    <span className="block text-[10px] text-slate-500 uppercase font-bold mb-1">Registered Vehicle</span>
                                    <span className="text-white font-bold text-lg tracking-widest font-mono bg-slate-800 px-3 py-1 rounded-lg border border-slate-600">{vehicleParam}</span>
                                </div>
                                <div className="bg-blue-500/20 p-3 rounded-full text-blue-400 border border-blue-500/30">
                                    <Car className="w-6 h-6" />
                                </div>
                            </div>
                        )}

                        {/* Dynamic List of Travelers */}
                        <div className="space-y-4">
                            {uids.map((uid, index) => (
                                <div key={index} className="glass-panel rounded-2xl overflow-hidden border border-emerald-500/20 relative p-4 flex items-center gap-4">
                                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-slate-700 bg-slate-800 shrink-0">
                                        <img src={avatars[index % avatars.length]} className="w-full h-full object-cover opacity-80 mix-blend-luminosity" alt="Traveler" />
                                        <div className="verify-scan-line"></div>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-white font-bold text-md mb-0.5">{uids.length === 1 ? 'Primary Traveler' : `Traveler ${index + 1}`}</p>
                                        <div className="flex items-center gap-3 text-xs">
                                            <span className="flex items-center gap-1 text-slate-400">
                                                {isIndian ? (
                                                    <img src="https://upload.wikimedia.org/wikipedia/en/thumb/c/cf/Aadhaar_Logo.svg/1200px-Aadhaar_Logo.svg.png" className="h-3 brightness-0 invert opacity-80" alt="Aadhar" />
                                                ) : (
                                                    <Globe className="w-3 h-3 text-blue-400" />
                                                )}
                                                {identityText}
                                            </span>
                                        </div>
                                        <p className="text-emerald-400 font-mono text-sm tracking-widest mt-1 bg-emerald-500/10 inline-block px-2 py-0.5 rounded border border-emerald-500/20">
                                            <span className="text-slate-400 text-[10px] uppercase font-sans mr-1">{idLabel}:</span> **** {uid}
                                        </p>
                                    </div>
                                    <div className="shrink-0 bg-emerald-500/20 p-2 rounded-full text-emerald-400">
                                        <ShieldCheck className="w-5 h-5" />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button onClick={() => navigate('/travel-pass')} className="w-full mt-8 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition-colors border border-white/10 flex items-center justify-center gap-2">
                            <Scan className="w-5 h-5" /> Scan Another QR
                        </button>
                    </div>
                )}

                {/* Error State */}
                {status === 'error' && (
                    <div className="w-full max-w-md">
                        <div className="text-center mb-8">
                            <div className="w-24 h-24 bg-rose-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-error-pulse border-4 border-rose-400/30">
                                <X className="w-12 h-12 text-white" />
                            </div>
                            <h2 className="text-4xl font-black text-rose-500 tracking-tight uppercase">Invalid QR</h2>
                            <p className="text-slate-300 text-lg font-medium mt-1">Authentication Failed</p>
                        </div>

                        <div className="glass-panel rounded-3xl p-8 border border-rose-500/30 bg-rose-500/5 text-center">
                            <AlertTriangle className="w-12 h-12 text-rose-400 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">No Record Found</h3>
                            <p className="text-slate-400 text-sm leading-relaxed mb-6">
                                This QR code is invalid, expired, or was not generated by the IndiaXplore system.
                            </p>
                            <div className="bg-slate-900 rounded-lg p-3 border border-slate-700 inline-block text-left text-xs font-mono text-slate-500">
                                ERR_CODE: 404_UID_MISSING<br />
                                ACTION: DENY_ENTRY
                            </div>
                        </div>

                        <button onClick={() => navigate('/travel-pass')} className="w-full mt-8 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition-colors border border-white/10 flex items-center justify-center gap-2">
                            <Scan className="w-5 h-5" /> Try Scanning Again
                        </button>
                    </div>
                )}

            </main>
        </div>
    );
};

export default Verify;
