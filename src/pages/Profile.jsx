import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import BackgroundBlobs from '../components/BackgroundBlobs';
import { User, Users, Plus, Trash2, Camera, Save, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [familyMembers, setFamilyMembers] = useState([]);
    const [newMember, setNewMember] = useState({ name: '', age: '', relation: '', profilePic: '' });
    const [isAdding, setIsAdding] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (!storedUser) {
            navigate('/login');
            return;
        }

        const fetchProfile = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/profile/${storedUser._id}`);
                const data = await res.json();
                setUser(data);
                setFamilyMembers(data.familyMembers || []);
            } catch (err) {
                console.error("Error fetching profile:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [navigate]);

    const handleAddMember = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/profile/${user._id}/family`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newMember)
            });
            const updatedMembers = await res.json();
            setFamilyMembers(updatedMembers);
            setNewMember({ name: '', age: '', relation: '', profilePic: '' });
            setIsAdding(false);
        } catch (err) {
            alert("Failed to add family member");
        }
    };

    const handleRemoveMember = async (memberId) => {
        if (!window.confirm("Remove this family member?")) return;
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/profile/${user._id}/family/${memberId}`, {
                method: 'DELETE'
            });
            const updatedMembers = await res.json();
            setFamilyMembers(updatedMembers);
        } catch (err) {
            alert("Failed to remove member");
        }
    };

    if (loading) return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">Loading...</div>;

    return (
        <div className="min-h-screen bg-slate-900 text-white">
            <BackgroundBlobs variant="security" />
            <Navbar minimal />

            <main className="pt-32 pb-24 px-6 max-w-4xl mx-auto relative z-10">
                <div className="flex items-center gap-4 mb-12">
                    <button onClick={() => navigate('/travel-pass')} className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                        <ArrowLeft className="w-5 h-5 text-white" />
                    </button>
                    <h1 className="text-4xl font-bold font-serif">My Profile</h1>
                </div>

                {/* Main User Info */}
                <div className="glass-panel rounded-3xl p-8 mb-8 border border-white/10 bg-slate-800/50">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="w-32 h-32 rounded-full bg-blue-600/20 border-4 border-blue-500/30 flex items-center justify-center">
                            <User className="w-16 h-16 text-blue-400" />
                        </div>
                        <div className="text-center md:text-left">
                            <h2 className="text-2xl font-bold mb-1">{user?.name}</h2>
                            <p className="text-slate-400 mb-4">{user?.email}</p>
                            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                                <span className="px-3 py-1 rounded-full bg-slate-700 text-xs font-bold text-slate-300 border border-white/5 uppercase tracking-wider">
                                    {user?.role}
                                </span>
                                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-xs font-bold text-emerald-400 border border-emerald-500/20">
                                    {user?.mobileNumber}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Family Members Section */}
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                        <Users className="w-5 h-5 text-blue-400" /> Family Members
                    </h3>
                    <button
                        onClick={() => setIsAdding(!isAdding)}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-xl text-sm font-bold transition-all"
                    >
                        {isAdding ? <Plus className="w-4 h-4 rotate-45" /> : <Plus className="w-4 h-4" />}
                        {isAdding ? 'Cancel' : 'Add Member'}
                    </button>
                </div>

                {isAdding && (
                    <form onSubmit={handleAddMember} className="glass-panel rounded-3xl p-6 mb-8 border border-white/10 bg-blue-500/5 animate-in fade-in slide-in-from-top-4 duration-300">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <input
                                required
                                placeholder="Name"
                                className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none"
                                value={newMember.name}
                                onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                            />
                            <input
                                required
                                type="number"
                                placeholder="Age"
                                className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none"
                                value={newMember.age}
                                onChange={(e) => setNewMember({ ...newMember, age: e.target.value })}
                            />
                            <select
                                required
                                className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none"
                                value={newMember.relation}
                                onChange={(e) => setNewMember({ ...newMember, relation: e.target.value })}
                            >
                                <option value="">Select Relation</option>
                                <option value="Spouse">Spouse</option>
                                <option value="Child">Child</option>
                                <option value="Parent">Parent</option>
                                <option value="Sibling">Sibling</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex-1 relative">
                                <Camera className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                <input
                                    placeholder="Profile Picture URL (Optional)"
                                    className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-xs focus:border-blue-500 outline-none"
                                    value={newMember.profilePic}
                                    onChange={(e) => setNewMember({ ...newMember, profilePic: e.target.value })}
                                />
                            </div>
                            <button type="submit" className="bg-emerald-600 hover:bg-emerald-500 p-3 rounded-xl transition-colors">
                                <Save className="w-5 h-5" />
                            </button>
                        </div>
                    </form>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {familyMembers.length === 0 ? (
                        <div className="col-span-full py-12 text-center text-slate-500 border-2 border-dashed border-slate-800 rounded-3xl">
                            No family members added yet.
                        </div>
                    ) : familyMembers.map((member) => (
                        <div key={member._id} className="glass-panel p-5 rounded-3xl border border-white/5 bg-slate-800/30 flex items-center justify-between group">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-slate-700 bg-slate-800">
                                    {member.profilePic ? (
                                        <img src={member.profilePic} alt={member.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <User className="w-full h-full p-3 text-slate-600" />
                                    )}
                                </div>
                                <div>
                                    <h4 className="font-bold text-white leading-tight">{member.name}</h4>
                                    <p className="text-xs text-slate-500">{member.relation} • {member.age} yrs</p>
                                </div>
                            </div>
                            <button
                                onClick={() => handleRemoveMember(member._id)}
                                className="p-2 rounded-lg text-slate-600 hover:bg-red-500/10 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Profile;
