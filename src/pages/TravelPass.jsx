import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import BackgroundBlobs from '../components/BackgroundBlobs';
import { ArrowLeft, Fingerprint, Globe, Smartphone, Car, Check, ShieldCheck, Users, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TravelPass = () => {
    const [step, setStep] = useState(1);
    const [userType, setUserType] = useState('indian');
    const [memberCount, setMemberCount] = useState(1);
    const [travelerIds, setTravelerIds] = useState(['']);
    const [travelVehicle, setTravelVehicle] = useState('');
    const [isTravelingByCar, setIsTravelingByCar] = useState(false);
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [errors, setErrors] = useState({ details: false, otp: false, vehicle: false });
    const [passId, setPassId] = useState(null);
    const navigate = useNavigate();

    const handleNationalitySelect = (type) => {
        setUserType(type);
        setMemberCount(1);
        setTravelerIds(['']);
        setStep(2);
    };

    const handleMemberCountChange = (e) => {
        const count = parseInt(e.target.value, 10);
        setMemberCount(count);
        const newIds = Array(count).fill('');
        for (let i = 0; i < Math.min(count, travelerIds.length); i++) {
            newIds[i] = travelerIds[i];
        }
        setTravelerIds(newIds);
    };

    const handleTravelerIdChange = (index, value) => {
        let formattedValue = value;
        if (userType === 'indian') {
            let val = value.replace(/\D/g, '');
            formattedValue = val.match(/.{1,4}/g)?.join(' ') || val;
        } else {
            formattedValue = value.toUpperCase();
        }
        const newIds = [...travelerIds];
        newIds[index] = formattedValue;
        setTravelerIds(newIds);
    };

    const validateDetailsAndProceed = () => {
        let isValid = true;
        const cleanedIds = travelerIds.map(id => {
            let val = id.trim();
            if (userType === 'indian') {
                val = val.replace(/\s/g, '');
                if (val.length !== 12) isValid = false;
            } else {
                if (val.length < 5) isValid = false;
            }
            return val;
        });

        if (!isValid) {
            setErrors({ ...errors, details: true });
            return;
        }

        setErrors({ ...errors, details: false });
        // Proceed to OTP
        setStep(3);
    };

    const handleOtpChange = (index, value) => {
        if (value.length > 1) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto focus next input logic (simplified for React)
        if (value.length === 1 && index < 5) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            if (nextInput) nextInput.focus();
        }
    };

    const verifyOtp = () => {
        const otpVal = otp.join('');
        if (otpVal.length !== 6) {
            setErrors({ ...errors, otp: true });
            return;
        }
        setErrors({ ...errors, otp: false });
        setStep(4); // Vehicle step
    };

    const proceedToProcessing = async () => {
        if (isTravelingByCar) {
            const vNum = travelVehicle.trim();
            if (vNum.length < 4) {
                setErrors({ ...errors, vehicle: true });
                return;
            }
            setErrors({ ...errors, vehicle: false });
        } else {
            setTravelVehicle('');
        }

        const cleanedIds = travelerIds.map(id => userType === 'indian' ? id.trim().replace(/\s/g, '') : id.trim());

        try {
            setStep(5); // Processing
            const userStr = localStorage.getItem('user');
            if (!userStr) {
                alert("Please log in first.");
                navigate('/login');
                return;
            }
            const userData = JSON.parse(userStr);

            const res = await fetch(`${import.meta.env.VITE_API_URL}/pass/generate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: userData._id,
                    passType: userType,
                    uids: cleanedIds,
                    vehicle: isTravelingByCar ? travelVehicle.trim() : ''
                })
            });

            if (!res.ok) throw new Error("Failed to generate pass");
            const data = await res.json();

            // Artificial delay for UI effect
            setTimeout(() => {
                setPassId(data._id);
                setStep(6); // Success
            }, 1000);

        } catch (error) {
            console.error(error);
            alert("Error generating pass securely. Please try again.");
            setStep(4);
        }
    };

    // Generate QR URL based on final state
    let verifyUrl = '';
    if (step === 6 && passId) {
        verifyUrl = `${window.location.origin}/verify?id=${passId}`;
    }

    const qrColor = userType === 'foreign' ? '3b82f6' : '059669';
    const qrApiUrl = verifyUrl ? `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(verifyUrl)}&color=${qrColor}&bgcolor=ffffff` : '';

    return (
        <div className="antialiased selection:bg-emerald-500 selection:text-white">
            <BackgroundBlobs variant="security" />
            <Navbar minimal />

            <main className="pt-32 pb-24 px-6 max-w-6xl mx-auto min-h-screen flex flex-col items-center gap-8 relative">

                {/* Step 1: Nationality Selection */}
                {step === 1 && (
                    <div className="w-full transition-all duration-500 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                        <div className="flex-1 text-center lg:text-left z-10 w-full max-w-lg mx-auto lg:mx-0">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/20 mb-6 ring-1 ring-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                                <img src="/scan-qrcode-ecommerce-svgrepo-com.png" alt="QR Scanner" className="w-10 h-10 object-contain drop-shadow-[0_2px_10px_rgba(16,185,129,0.5)]" />
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight font-serif">Digital Travel Pass</h1>
                            <p className="text-slate-300 max-w-lg mx-auto lg:mx-0 text-lg mb-8">Generate your digital travel identity for seamless hotel check-ins, airport security, and state border crossings.</p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                                <button onClick={() => handleNationalitySelect('indian')} className="glass-panel p-6 rounded-3xl border border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all group flex flex-col items-center text-center cursor-pointer relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <div className="w-14 h-14 bg-slate-800 rounded-full flex items-center justify-center mb-4 ring-2 ring-slate-900 shadow-xl z-10">
                                        <Fingerprint className="w-6 h-6 text-emerald-400 group-hover:scale-110 transition-transform" />
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-1 z-10">Indian Citizen</h3>
                                    <p className="text-xs text-slate-400 z-10">Verify via Aadhar</p>
                                </button>

                                <button onClick={() => handleNationalitySelect('foreign')} className="glass-panel p-6 rounded-3xl border border-white/10 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all group flex flex-col items-center text-center cursor-pointer relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <div className="w-14 h-14 bg-slate-800 rounded-full flex items-center justify-center mb-4 ring-2 ring-slate-900 shadow-xl z-10">
                                        <Globe className="w-6 h-6 text-blue-400 group-hover:scale-110 transition-transform" />
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-1 z-10">Foreign National</h3>
                                    <p className="text-xs text-slate-400 z-10">Verify via Passport</p>
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 relative flex justify-center items-center w-full mt-10 lg:mt-0 max-w-md mx-auto">
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-emerald-500/20 rounded-full blur-3xl z-0 pointer-events-none"></div>
                            <div className="relative z-10 w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96">
                                <img src="/WhatsApp Image 2026-02-27 at 19.22.14.jpeg" alt="Verification Scan" className="w-full h-full object-cover rounded-full border-4 border-emerald-500/40 shadow-[0_0_40px_rgba(16,185,129,0.3)] relative z-10" />
                                <div className="absolute -top-2 -left-6 md:-left-10 glass-panel bg-slate-800/95 px-4 py-3 rounded-2xl flex items-center gap-3 shadow-2xl border border-emerald-500/40 animate-[bounce_3s_infinite] z-20">
                                    <div className="bg-emerald-500/20 p-2 rounded-full text-emerald-400 shrink-0">
                                        <Users className="w-5 h-5" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] text-slate-400 uppercase tracking-wider mb-0.5">Group Pass</span>
                                        <span className="text-sm font-bold text-white whitespace-nowrap">Multi-Member</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 2: Traveler Details */}
                {step === 2 && (
                    <div className="w-full transition-all duration-500 max-w-2xl mx-auto">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-4">
                                <button onClick={() => setStep(1)} className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                                    <ArrowLeft className="w-5 h-5 text-white" />
                                </button>
                                <h2 className="text-3xl font-bold text-white font-serif">{userType === 'indian' ? 'Aadhar Verification' : 'Passport Verification'}</h2>
                            </div>
                        </div>

                        <div className="glass-panel rounded-[32px] p-8 border border-white/10 relative overflow-hidden shadow-2xl">
                            <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl pointer-events-none ${userType === 'indian' ? 'bg-emerald-500/10' : 'bg-blue-500/10'}`}></div>

                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-slate-900/40 p-4 rounded-2xl border border-white/5">
                                <div>
                                    <h3 className="font-bold text-white mb-1">Number of Travelers</h3>
                                    <p className="text-xs text-slate-400">Generate a single pass for your whole group.</p>
                                </div>
                                <select value={memberCount} onChange={handleMemberCountChange} className="bg-slate-800 border border-slate-600 text-white rounded-xl px-4 py-2 focus:outline-none focus:border-emerald-500 cursor-pointer min-w-[100px]">
                                    {[1, 2, 3, 4, 5].map(num => <option key={num} value={num}>{num} Member{num > 1 ? 's' : ''}</option>)}
                                </select>
                            </div>

                            <div className="space-y-6 mb-8">
                                {travelerIds.map((val, idx) => (
                                    <div className="relative" key={idx}>
                                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                                            {memberCount === 1 ? 'Traveler' : `Traveler ${idx + 1}`} - {userType === 'indian' ? '12-Digit Aadhar' : 'Passport Number'}
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                {userType === 'indian' ? <Fingerprint className="w-5 h-5 text-emerald-500" /> : <Globe className="w-5 h-5 text-blue-500" />}
                                            </div>
                                            <input
                                                type="text"
                                                maxLength={userType === 'indian' ? 14 : 15}
                                                placeholder={userType === 'indian' ? 'XXXX XXXX XXXX' : 'e.g. A1234567'}
                                                value={val}
                                                onChange={(e) => handleTravelerIdChange(idx, e.target.value)}
                                                className={`w-full bg-slate-900/50 border ${errors.details ? 'border-red-500' : 'border-slate-700'} text-white font-mono text-lg tracking-widest rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:border-${userType === 'indian' ? 'emerald' : 'blue'}-500 transition-colors uppercase`}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {errors.details && <p className="text-red-400 text-sm mt-2 mb-4 font-medium text-center">Please ensure all fields are filled correctly.</p>}

                            <button onClick={validateDetailsAndProceed} className={`w-full text-white font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all flex items-center justify-center gap-2 ${userType === 'indian' ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-blue-600 hover:bg-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.3)]'}`}>
                                Verify & Generate OTP
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 3: OTP Verification */}
                {step === 3 && (
                    <div className="w-full transition-all duration-500 max-w-xl mx-auto">
                        <div className="flex items-center gap-4 mb-8">
                            <button onClick={() => setStep(2)} className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                                <ArrowLeft className="w-5 h-5 text-white" />
                            </button>
                            <h2 className="text-3xl font-bold text-white font-serif">Verify OTP</h2>
                        </div>
                        <div className="glass-panel rounded-[32px] p-8 border border-white/10 relative overflow-hidden shadow-2xl">
                            <div className="text-center mb-8">
                                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${userType === 'indian' ? 'bg-emerald-500/20' : 'bg-blue-500/20'}`}>
                                    <Smartphone className={`w-8 h-8 ${userType === 'indian' ? 'text-emerald-400' : 'text-blue-400'}`} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Check your device</h3>
                                <p className="text-slate-400 text-sm">We've sent a 6-digit code to the primary contact linked to {userType === 'indian' ? 'Aadhar' : 'Passport'} ending in <strong className="text-white">{travelerIds[0].slice(-4)}</strong>.</p>
                            </div>

                            <div className="flex justify-center gap-2 md:gap-4 mb-8">
                                {[0, 1, 2, 3, 4, 5].map(idx => (
                                    <input
                                        key={idx}
                                        id={`otp-${idx}`}
                                        type="text"
                                        maxLength="1"
                                        value={otp[idx]}
                                        onChange={(e) => handleOtpChange(idx, e.target.value)}
                                        className="otp-input bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:border-emerald-500 focus:outline-none transition-colors"
                                    />
                                ))}
                            </div>

                            {errors.otp && <p className="text-red-400 text-xs mt-2 text-center mb-4 font-medium">Please enter the full 6-digit OTP.</p>}

                            <button onClick={verifyOtp} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all flex items-center justify-center gap-2">
                                Verify & Generate Pass
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 4: Vehicle Details */}
                {step === 4 && (
                    <div className="w-full transition-all duration-500 max-w-xl mx-auto">
                        <div className="flex items-center gap-4 mb-8">
                            <button onClick={() => setStep(3)} className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                                <ArrowLeft className="w-5 h-5 text-white" />
                            </button>
                            <h2 className="text-3xl font-bold text-white font-serif">Travel Mode</h2>
                        </div>

                        <div className="glass-panel rounded-[32px] p-8 border border-white/10 relative overflow-hidden shadow-2xl">
                            <div className="text-center mb-8">
                                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Car className="w-8 h-8 text-blue-400" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Are you traveling by Car?</h3>
                                <p className="text-slate-400 text-sm">Register your vehicle number to link it directly to your digital pass for seamless border and checkpoint scans.</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <button onClick={() => setIsTravelingByCar(true)} className={`py-4 rounded-xl border font-medium transition-colors ${isTravelingByCar ? 'border-blue-500 bg-blue-500/20 text-white' : 'border-slate-600 bg-slate-800 text-white hover:border-slate-500 hover:bg-slate-700'}`}>Yes, by Car</button>
                                <button onClick={() => setIsTravelingByCar(false)} className={`py-4 rounded-xl border font-medium transition-colors ${!isTravelingByCar ? 'border-blue-500 bg-blue-500/20 text-white' : 'border-slate-600 bg-slate-800 text-white hover:border-slate-500 hover:bg-slate-700'}`}>No / Public Transit</button>
                            </div>

                            {isTravelingByCar && (
                                <div className="mb-8 relative">
                                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Vehicle Registration Number</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="e.g. MH 01 AB 1234"
                                            value={travelVehicle}
                                            onChange={(e) => setTravelVehicle(e.target.value.toUpperCase())}
                                            className={`w-full bg-slate-900/50 border ${errors.vehicle ? 'border-red-500' : 'border-slate-700'} text-white font-mono text-lg tracking-widest rounded-xl pl-4 pr-4 py-4 focus:outline-none focus:border-blue-500 transition-colors uppercase`}
                                        />
                                    </div>
                                    {errors.vehicle && <p className="text-red-400 text-xs mt-2 font-medium">Please enter a valid vehicle number.</p>}
                                </div>
                            )}

                            <button onClick={proceedToProcessing} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all flex items-center justify-center gap-2">
                                Finalize & Generate Pass
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 5: Processing */}
                {step === 5 && (
                    <div className="flex flex-col items-center justify-center py-20 w-full transition-all duration-500">
                        <span className="loader w-12 h-12 mb-6"></span>
                        <h2 className="text-2xl font-bold text-white mb-2 font-serif">Verifying Group Credentials...</h2>
                        <p className="text-emerald-400 font-medium animate-pulse">Generating your secure Multi-Member QR.</p>
                    </div>
                )}

                {/* Step 6: Success */}
                {step === 6 && (
                    <div className="w-full transition-all duration-500 flex flex-col items-center">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 mb-4 ring-2 ring-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.4)]">
                                <Check className="w-8 h-8 text-emerald-400" />
                            </div>
                            <h2 className="text-3xl font-bold text-white font-serif">Group Pass Created!</h2>
                            <p className="text-slate-400">Your digital Travel Pass is ready for use.</p>
                        </div>

                        <div className="w-full max-w-sm relative group perspective-1000">
                            <div className="glass-panel rounded-3xl overflow-hidden border border-emerald-500/40 shadow-[0_20px_60px_rgba(16,185,129,0.2)] bg-gradient-to-br from-slate-900 to-slate-800 relative transform transition-transform duration-500 group-hover:scale-[1.02]">
                                <div className="hologram"></div>

                                <div className="bg-emerald-600/90 backdrop-blur-md p-5 flex justify-between items-center border-b border-emerald-400/30">
                                    <div className="flex items-center gap-2">
                                        <ShieldCheck className="w-6 h-6 text-white" />
                                        <span className="font-bold text-white tracking-widest text-sm uppercase">IndiaXplore Verified</span>
                                    </div>
                                    <div className="flex items-center gap-1 bg-black/20 px-2 py-1 rounded text-emerald-100 text-xs font-bold">
                                        <Users className="w-3 h-3" /> <span>{memberCount}</span>
                                    </div>
                                </div>

                                <div className="p-8 flex flex-col items-center relative z-10">
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Official Group QR</p>

                                    <div className="bg-white p-3 rounded-2xl shadow-xl mb-6 relative">
                                        <div className="absolute inset-0 bg-emerald-400/20 rounded-2xl animate-pulse"></div>
                                        <img src={qrApiUrl} alt="Travel QR" className="w-48 h-48 relative z-10 mix-blend-multiply" />
                                    </div>

                                    <div className="w-full space-y-3 text-center">
                                        <div className="bg-emerald-500/10 rounded-lg p-3 border border-emerald-500/30">
                                            <span className="text-sm font-bold text-emerald-400 flex items-center justify-center gap-2"><CheckCircle2 className="w-4 h-4" /> Active for all members</span>
                                        </div>
                                        {travelVehicle && (
                                            <div className="bg-blue-500/10 rounded-lg p-2 border border-blue-500/30">
                                                <span className="text-xs font-bold text-blue-400 flex items-center justify-center gap-1 font-mono tracking-wider"><Car className="w-3 h-3" /> <span>{travelVehicle}</span></span>
                                            </div>
                                        )}
                                        <p className="text-xs text-slate-500 mt-2">Scan at checkpoints to verify all linked IDs simultaneously.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button onClick={() => window.location.reload()} className="mt-10 text-emerald-400 hover:text-white transition-colors underline text-sm font-medium">Verify another group</button>
                    </div>
                )}

            </main>
        </div>
    );
};

export default TravelPass;
