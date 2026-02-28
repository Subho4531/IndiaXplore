import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { Database, ShieldAlert, Lock, Hash } from 'lucide-react';

const AdminDB = () => {
    const [records, setRecords] = useState([]);

    useEffect(() => {
        // Read from localStorage inside useEffect as requested
        const saved = localStorage.getItem('secureVaultRecords');
        if (saved) {
            setRecords(JSON.parse(saved));
        }
    }, []);

    return (
        <div className="antialiased selection:bg-rose-500 selection:text-white flex flex-col min-h-screen bg-[#0f172a] text-[#f8fafc]">
            <Navbar minimal />

            <main className="pt-32 pb-24 px-6 max-w-6xl mx-auto flex-1 w-full">
                <div className="mb-10 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold font-serif text-white flex items-center gap-3">
                            <Database className="w-8 h-8 text-rose-500" /> Secure Vault DB
                        </h1>
                        <p className="text-slate-400 mt-2">Administrative view of encrypted travel pass records.</p>
                    </div>
                    <div className="bg-rose-500/10 border border-rose-500/20 px-4 py-2 rounded-lg flex items-center gap-2">
                        <Lock className="w-4 h-4 text-rose-400" />
                        <span className="text-xs font-bold text-rose-400 uppercase tracking-widest">End-to-End Encrypted</span>
                    </div>
                </div>

                <div className="glass-panel rounded-3xl overflow-hidden border border-white/10 shadow-xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-800/80 border-b border-white/10 text-xs uppercase tracking-widest text-slate-400">
                                    <th className="p-4 font-semibold">Record ID</th>
                                    <th className="p-4 font-semibold">Timestamp</th>
                                    <th className="p-4 font-semibold">Hashed UIDs (SHA-256)</th>
                                    <th className="p-4 font-semibold">Linked Vehicle</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {records.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="p-10 text-center text-slate-500">
                                            <ShieldAlert className="w-10 h-10 mx-auto mb-3 opacity-50 text-slate-400" />
                                            <p>No secure records found in local vault.</p>
                                        </td>
                                    </tr>
                                ) : (
                                    records.map((record) => (
                                        <tr key={record.id} className="hover:bg-white/5 transition-colors">
                                            <td className="p-4 text-xs font-mono text-slate-300">{record.id.split('-')[0]}...</td>
                                            <td className="p-4 text-sm text-slate-300">{new Date(record.timestamp).toLocaleString()}</td>
                                            <td className="p-4">
                                                <div className="flex flex-col gap-1 text-[10px] font-mono text-emerald-400/80">
                                                    {record.hashedUids.map((hash, i) => (
                                                        <div key={i} className="flex items-center gap-1">
                                                            <Hash className="w-3 h-3 text-slate-500" />
                                                            <span className="truncate w-48 block">{hash}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="p-4 text-sm text-slate-300 font-mono">
                                                {record.vehicle || <span className="text-slate-500 italic">None</span>}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDB;
