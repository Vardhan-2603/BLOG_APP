import React from 'react'
import { useNavigate, NavLink } from 'react-router';
import { useAuth } from '../Store/AuthStore'
import { PenTool, FileText, UserCircle, PlusCircle } from 'lucide-react';

function AuthorDashboard() {
  const currentUser = useAuth(state => state.currentUser)
  const logout = useAuth(state => state.logout)
  const navigate = useNavigate();

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto w-full">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-3xl p-8 md:p-12 mb-10 text-white shadow-xl relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[150%] bg-white opacity-5 rounded-full blur-3xl transform rotate-12"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[30%] h-[100%] bg-brand-500 opacity-20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
          <div className="shrink-0">
            {currentUser?.profileImageUrl ? (
              <img
                src={currentUser.profileImageUrl}
                alt="profile"
                className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-slate-700 shadow-2xl"
              />
            ) : (
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-slate-700 border-4 border-slate-600 flex items-center justify-center shadow-2xl">
                <UserCircle size={48} className="text-slate-400" />
              </div>
            )}
          </div>
          
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-500/20 text-brand-300 border border-brand-500/30 mb-4 uppercase tracking-wider">
              <PenTool size={12} />
              Author Account
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-3 tracking-tight">
              Hello, {currentUser?.firstName || 'Author'}
            </h1>
            <p className="text-slate-400 text-lg max-w-xl leading-relaxed">
              Welcome to your creative space. What would you like to share with your readers today?
            </p>
          </div>
        </div>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Write New Article Card */}
        <NavLink 
          to="/addartical"
          className="group bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-brand-300 transition-all duration-300 text-left flex flex-col h-full"
        >
          <div className="w-14 h-14 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-600 mb-6 group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white transition-all duration-300">
            <PlusCircle size={28} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Write New Article</h2>
          <p className="text-slate-600 leading-relaxed flex-grow">
            Draft a new story, tutorial, or opinion piece. Use our intuitive editor to format your thoughts beautifully.
          </p>
        </NavLink>

        {/* Manage Articles Card */}
        <NavLink 
          to="/articles"
          className="group bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-indigo-300 transition-all duration-300 text-left flex flex-col h-full"
        >
          <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
            <FileText size={28} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Manage My Articles</h2>
          <p className="text-slate-600 leading-relaxed flex-grow">
            View, edit, or delete your published articles. Keep track of your content portfolio all in one place.
          </p>
        </NavLink>
      </div>

    </div>
  )
}

export default AuthorDashboard