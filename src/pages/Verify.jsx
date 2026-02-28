import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Shield, Loader2, CheckCheck, CheckCircle2, Scan, X, AlertTriangle, Globe, ShieldCheck, Car, MapPin, Send, Clock, Edit3 } from 'lucide-react';

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

    const idParam = searchParams.get('id');

    const [status, setStatus] = useState('loading'); // 'loading', 'success', 'error'
    const [passData, setPassData] = useState(null);
    const [checkpointLocation, setCheckpointLocation] = useState('');
    const [checkpointNotes, setCheckpointNotes] = useState('');
    const [validityDuration, setValidityDuration] = useState('24'); // Default 24 hours
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Check local auth to see if the scanner is a "verifier"
    const userStr = localStorage.getItem('user');
    const localUser = userStr ? JSON.parse(userStr) : null;
    const isVerifier = localUser?.role === 'verifier';

    useEffect(() => {
        if (!idParam) {
            setStatus('error');
            return;
        }

        const fetchPass = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/pass/${idParam}`);
                if (!res.ok) throw new Error("Not found");
                const data = await res.json();

                setTimeout(() => {
                    setPassData(data);
                    setStatus('success');
                }, 1000); // Artificial delay to show loading animation
            } catch (err) {
                setTimeout(() => setStatus('error'), 1000);
            }
        };

        fetchPass();
    }, [idParam]);

    const handleAddCheckpoint = async () => {
        if (!checkpointLocation.trim()) return alert("Location is required");
        setIsSubmitting(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/pass/${idParam}/verify`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    verifierId: localUser._id,
                    location: checkpointLocation.trim(),
                    notes: checkpointNotes.trim(),
                    validityDuration: validityDuration
                })
            });

            if (!res.ok) throw new Error("Failed to add checkpoint");
            const updatedPass = await res.json();
            setPassData(updatedPass);
            setCheckpointLocation('');
            setCheckpointNotes('');
        } catch (err) {
            console.error(err);
            alert("Failed to save checkpoint. Please ensure your session is active.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const isIndian = passData?.passType === 'indian';
    const identityText = isIndian ? 'Indian Citizen' : 'Foreign National';
    const idLabel = isIndian ? 'Aadhar' : 'Passport';

    return (
        <div className="antialiased selection:bg-emerald-500 selection:text-white flex flex-col min-h-screen bg-[#020617] text-[#f8fafc]">
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

            <main className="flex-1 flex flex-col items-center p-6 relative">
                {status === 'loading' && (
                    <div className="flex-1 flex flex-col justify-center items-center text-center py-20">
                        <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
                        <h2 className="text-xl font-bold text-white">Verifying Database Record...</h2>
                        <p className="text-sm text-slate-400">Authenticating Pass ID via secure tunnel</p>
                    </div>
                )}

                {status === 'success' && passData && (
                    <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8">
                        {/* LEFT COLUMN: Travel Pass Details */}
                        <div className="w-full">
                            <div className="text-left mb-6 flex items-center gap-4">
                                <div className="inline-flex w-16 h-16 bg-emerald-500 rounded-full items-center justify-center animate-success-pulse border-4 border-emerald-400/30 shadow-lg shadow-emerald-500/20 shrink-0">
                                    <CheckCheck className="w-8 h-8 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-3xl font-black text-emerald-400 tracking-tight uppercase">Pass Verified</h2>
                                    <p className="text-slate-400 text-sm font-medium mt-1">Reg. by <span className="text-white">{passData.user?.name || 'Unknown'}</span></p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-center mb-6">
                                <div className="bg-slate-900 rounded-xl p-3 border border-emerald-500/30">
                                    <span className="block text-[10px] text-slate-500 uppercase font-bold mb-1">Clearance</span>
                                    <span className="text-emerald-400 font-medium text-sm flex items-center justify-center gap-1"><CheckCircle2 className="w-3 h-3" /> Approved</span>
                                </div>
                                <div className="bg-slate-900 rounded-xl p-3 border border-slate-700">
                                    <span className="block text-[10px] text-slate-500 uppercase font-bold mb-1">Pass Created</span>
                                    <span className="text-slate-300 font-mono text-xs">{new Date(passData.createdAt).toLocaleDateString('en-IN')}</span>
                                </div>
                                {passData.validUntil && (
                                    <div className="bg-slate-900 rounded-xl p-3 border border-blue-500/50 col-span-2">
                                        <span className="block text-[10px] text-slate-500 uppercase font-bold mb-1">Expires On</span>
                                        <span className="text-blue-400 font-bold text-sm flex items-center justify-center gap-2">
                                            <Clock className="w-4 h-4" />
                                            {new Date(passData.validUntil).toLocaleString('en-IN')}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {passData.vehicle && (
                                <div className="bg-slate-900 rounded-xl p-4 border border-blue-500/30 mb-6 flex items-center justify-between shadow-[0_0_15px_rgba(59,130,246,0.15)]">
                                    <div>
                                        <span className="block text-[10px] text-slate-500 uppercase font-bold mb-1">Registered Vehicle</span>
                                        <span className="text-white font-bold text-lg tracking-widest font-mono bg-slate-800 px-3 py-1 rounded-lg border border-slate-600">{passData.vehicle}</span>
                                    </div>
                                    <div className="bg-blue-500/20 p-3 rounded-full text-blue-400 border border-blue-500/30">
                                        <Car className="w-6 h-6" />
                                    </div>
                                </div>
                            )}

                            <div className="space-y-4 mb-8">
                                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Authenticated Travelers ({passData.uids.length})</h3>
                                {passData.uids.map((uid, idx) => {
                                    // Try to find if this UID is a family member name to get the pic
                                    const familyMember = passData.user?.familyMembers?.find(fm => fm.name === uid);

                                    return (
                                        <div key={idx} className="glass-panel rounded-2xl overflow-hidden border border-emerald-500/20 relative p-4 flex items-center gap-4">
                                            <div className="w-14 h-14 rounded-full overflow-hidden bg-slate-800 border-2 border-slate-700 flex items-center justify-center">
                                                {familyMember?.profilePic ? (
                                                    <img src={familyMember.profilePic} alt="" className="w-full h-full object-cover" />
                                                ) : (
                                                    <Users className="w-6 h-6 text-slate-600" />
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-white font-bold">{uid}</span>
                                                    {familyMember && (
                                                        <span className="text-[10px] text-blue-400 font-bold uppercase tracking-tighter bg-blue-400/10 px-1.5 py-0.5 rounded-md">Verified Profile</span>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-2 text-[10px] text-slate-500 font-medium mt-1">
                                                    <Fingerprint className="w-3 h-3" />
                                                    {familyMember ? `${familyMember.relation} • ${familyMember.age} yrs` : 'Masked Traveller ID'}
                                                </div>
                                            </div>
                                            <div className="shrink-0 bg-emerald-500/20 p-1.5 rounded-full text-emerald-400">
                                                <ShieldCheck className="w-4 h-4" />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Checkpoint Tracking */}
                        <div className="w-full bg-slate-900/50 rounded-[32px] p-6 sm:p-8 border border-white/5 h-fit shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2 relative z-10"><MapPin className="text-blue-500" /> Checkpoint History</h3>

                            {passData.checkpoints.length === 0 ? (
                                <div className="text-center py-8 bg-slate-800/50 rounded-2xl border border-slate-700 border-dashed relative z-10">
                                    <Clock className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                                    <p className="text-slate-400 text-sm">No checkpoints recorded yet.</p>
                                </div>
                            ) : (
                                <div className="space-y-4 mb-8 relative z-10">
                                    {passData.checkpoints.map((cp, idx) => (
                                        <div key={idx} className="relative pl-6 border-l-2 border-blue-500/30 pb-4 last:border-0 last:pb-0">
                                            <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-blue-500 border-4 border-slate-900"></div>
                                            <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700 shadow-lg">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h4 className="font-bold text-white">{cp.location}</h4>
                                                    <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-1 rounded">
                                                        {new Date(cp.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                                                    <ShieldCheck className="w-3 h-3 text-emerald-500" />
                                                    <span>Verified by: <strong className="text-slate-300">{cp.verifier?.name || 'Authorized Officer'}</strong></span>
                                                </div>
                                                {cp.notes && (
                                                    <p className="text-sm text-slate-300 bg-slate-900/50 p-3 rounded-lg border border-slate-700/50 mt-3 leading-relaxed">
                                                        <span className="text-slate-500 text-[10px] block mb-1 uppercase font-bold tracking-widest">Notes</span>
                                                        {cp.notes}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Add Checkpoint Form (Verifier Only) */}
                            {isVerifier && (
                                <div className="mt-8 pt-6 border-t border-slate-700/50 relative z-10">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Edit3 className="w-5 h-5 text-orange-accent" />
                                        <h4 className="font-bold text-white text-lg">Log New Checkpoint</h4>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Location Name</label>
                                            <input
                                                type="text"
                                                value={checkpointLocation}
                                                onChange={(e) => setCheckpointLocation(e.target.value)}
                                                placeholder="e.g. State Border South, Checkpost Alpha..."
                                                className="w-full bg-slate-800/80 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors shadow-inner"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Pass Validity (Hours)</label>
                                            <select
                                                value={validityDuration}
                                                onChange={(e) => setValidityDuration(e.target.value)}
                                                className="w-full bg-slate-800/80 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors shadow-inner"
                                            >
                                                <option value="4">4 Hours (Temporary)</option>
                                                <option value="12">12 Hours (Short Visit)</option>
                                                <option value="24">24 Hours (Standard)</option>
                                                <option value="48">48 Hours (Weekend)</option>
                                                <option value="168">7 Days (Week)</option>
                                                <option value="720">30 Days (Monthly)</option>
                                            </select>
                                        </div>
                                        <button
                                            onClick={handleAddCheckpoint}
                                            disabled={isSubmitting}
                                            className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all flex items-center justify-center gap-2"
                                        >
                                            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                                            Authorize & Log Checkpoint
                                        </button>
                                    </div>
                                </div>
                            )}

                            {!isVerifier && (
                                <div className="mt-8 pt-6 border-t border-slate-700/50 text-center relative z-10 bg-slate-800/30 rounded-2xl p-4">
                                    <Shield className="w-6 h-6 text-slate-500 mx-auto mb-2" />
                                    <p className="text-xs text-slate-400 leading-relaxed">You are viewing this pass as a registered Traveler. Only authorized Verifier personnel can append official checkpoint logs to this digital passport.</p>
                                </div>
                            )}

                            <button onClick={() => navigate('/travel-pass')} className="w-full mt-6 py-3 rounded-xl bg-slate-800/50 hover:bg-slate-700 text-white font-bold transition-colors border border-white/5 flex items-center justify-center gap-2 relative z-10">
                                <Scan className="w-4 h-4" /> Go Back
                            </button>
                        </div>
                    </div>
                )}

                {status === 'error' && (
                    <div className="w-full max-w-md mt-12 bg-slate-900/50 p-8 rounded-3xl border border-white/5 shadow-2xl">
                        <div className="text-center mb-8">
                            <div className="w-24 h-24 bg-rose-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-error-pulse border-4 border-rose-400/30 shadow-[0_0_30px_rgba(244,63,94,0.3)]">
                                <X className="w-12 h-12 text-white" />
                            </div>
                            <h2 className="text-4xl font-black text-rose-500 tracking-tight uppercase">Invalid QR</h2>
                            <p className="text-slate-300 text-lg font-medium mt-1">Authentication Failed</p>
                        </div>

                        <div className="glass-panel rounded-2xl p-6 border border-rose-500/30 bg-rose-500/10 text-center">
                            <AlertTriangle className="w-10 h-10 text-rose-400 mx-auto mb-3" />
                            <h3 className="text-xl font-bold text-white mb-2">Pass Not Found</h3>
                            <p className="text-slate-400 text-sm leading-relaxed mb-6">
                                This Pass ID does not exist in the secure registry or has been corrupted.
                            </p>
                            <div className="bg-slate-900 rounded-lg p-3 border border-slate-700 inline-block text-left text-xs font-mono text-slate-500">
                                ERR_CODE: 404_PASS_MISSING<br />
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
