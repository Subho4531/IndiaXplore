import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, User, Mail, Lock, Fingerprint, LogIn } from 'lucide-react';

const Register = () => {
    const [role, setRole] = useState('traveller');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        aadharNumber: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, role })
            });
            const data = await res.json();

            if (res.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data));

                if (data.role === 'verifier') {
                    navigate('/verify');
                } else {
                    navigate('/travel-pass');
                }
            } else {
                setError(data.message || 'Registration failed');
            }
        } catch (err) {
            setError('Server error connecting to backend.');
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 selection:bg-orange-accent selection:text-white">
            <Link to="/" className="mb-4 flex items-center gap-2">
                <Shield className="w-8 h-8 text-blue-500" />
                <span className="text-2xl font-bold text-white">IndiaXplore</span>
            </Link>

            <div className="max-w-md w-full glass-panel rounded-3xl p-8 bg-slate-800/80 border border-white/10 shadow-2xl">
                <div>
                    <h2 className="mt-2 text-center text-3xl font-extrabold text-white">
                        Create Account
                    </h2>
                    <p className="mt-2 text-center text-sm text-slate-400">
                        Join us as a Traveller or Verifier
                    </p>
                </div>

                <div className="mt-6 flex justify-center gap-4 border-b border-slate-700 pb-4">
                    <button
                        type="button"
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${role === 'traveller' ? 'bg-orange-accent text-white' : 'text-slate-400 hover:text-white'}`}
                        onClick={() => setRole('traveller')}
                    >
                        Traveller
                    </button>
                    <button
                        type="button"
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${role === 'verifier' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
                        onClick={() => setRole('verifier')}
                    >
                        Verifier
                    </button>
                </div>

                <form className="mt-6 space-y-5" onSubmit={handleRegister}>
                    {error && (
                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/50 text-red-500 text-sm text-center">
                            {error}
                        </div>
                    )}
                    <div className="space-y-4">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User className="h-5 w-5 text-slate-400" />
                            </div>
                            <input
                                name="name"
                                type="text"
                                required
                                className="w-full pl-10 pr-3 py-3 border border-slate-700 rounded-xl bg-slate-900/50 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-slate-400" />
                            </div>
                            <input
                                name="email"
                                type="email"
                                required
                                className="w-full pl-10 pr-3 py-3 border border-slate-700 rounded-xl bg-slate-900/50 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="Email address"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-slate-400" />
                            </div>
                            <input
                                name="password"
                                type="password"
                                required
                                className="w-full pl-10 pr-3 py-3 border border-slate-700 rounded-xl bg-slate-900/50 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Fingerprint className="h-5 w-5 text-slate-400" />
                            </div>
                            <input
                                name="aadharNumber"
                                type="text"
                                required
                                className="w-full pl-10 pr-3 py-3 border border-slate-700 rounded-xl bg-slate-900/50 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="Aadhar Number (12 Digits)"
                                value={formData.aadharNumber}
                                onChange={handleChange}
                            />
                            <p className="mt-1 text-xs text-slate-500 px-1">We cryptographically hash your ID.</p>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white ${role === 'traveller' ? 'bg-orange-accent hover:bg-orange-500' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all shadow-lg`}
                    >
                        Sign Up
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <p className="text-sm text-slate-400">
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-blue-400 hover:text-blue-300">
                            Login here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
