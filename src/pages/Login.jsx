import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Mail, Lock, LogIn, Fingerprint } from 'lucide-react';

const Login = () => {
    const [role, setRole] = useState('traveller');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [aadharNumber, setAadharNumber] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, aadharNumber, role })
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
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError('Server error connecting to backend.');
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 selection:bg-orange-accent selection:text-white">
            <Link to="/" className="mb-8 flex items-center gap-2">
                <Shield className="w-8 h-8 text-blue-500" />
                <span className="text-2xl font-bold text-white">IndiaXplore</span>
            </Link>

            <div className="max-w-md w-full glass-panel rounded-3xl p-8 bg-slate-800/80 border border-white/10 shadow-2xl">
                <div>
                    <h2 className="mt-2 text-center text-3xl font-extrabold text-white">
                        Welcome Back
                    </h2>
                    <p className="mt-2 text-center text-sm text-slate-400">
                        Sign in to access your portal
                    </p>
                </div>

                <div className="mt-8 flex justify-center gap-4 border-b border-slate-700 pb-4">
                    <button
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${role === 'traveller' ? 'bg-orange-accent text-white' : 'text-slate-400 hover:text-white'}`}
                        onClick={() => setRole('traveller')}
                    >
                        Traveller Login
                    </button>
                    <button
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${role === 'verifier' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
                        onClick={() => setRole('verifier')}
                    >
                        Verifier Login
                    </button>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    {error && (
                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/50 text-red-500 text-sm text-center">
                            {error}
                        </div>
                    )}
                    <div className="space-y-4">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-slate-400" />
                            </div>
                            <input
                                type="email"
                                required
                                className="w-full pl-10 pr-3 py-3 border border-slate-700 rounded-xl bg-slate-900/50 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-slate-400" />
                            </div>
                            <input
                                type="password"
                                required
                                className="w-full pl-10 pr-3 py-3 border border-slate-700 rounded-xl bg-slate-900/50 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Fingerprint className="h-5 w-5 text-slate-400" />
                            </div>
                            <input
                                type="text"
                                required
                                className="w-full pl-10 pr-3 py-3 border border-slate-700 rounded-xl bg-slate-900/50 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="Aadhar Number (12 Digits)"
                                value={aadharNumber}
                                onChange={(e) => setAadharNumber(e.target.value)}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white ${role === 'traveller' ? 'bg-orange-accent hover:bg-orange-500' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all shadow-lg`}
                    >
                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                            <LogIn className="h-5 w-5 text-white/50 group-hover:text-white/80" />
                        </span>
                        Sign In
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-slate-400">
                        Don't have an account?{' '}
                        <Link to="/register" className="font-medium text-blue-400 hover:text-blue-300">
                            Register here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
