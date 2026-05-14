import React from 'react';
import { NavLink, useNavigate, Link } from 'react-router';
import { useAuth } from '../Store/AuthStore';
import { Home, LogIn, UserPlus, LayoutDashboard, LogOut, BookOpen } from 'lucide-react';

function Header() {
  const navigate = useNavigate();
  const user = useAuth((state) => state.currentUser);
  const logout = useAuth((state) => state.logout);

  const dashboardPath =
    user?.role === "AUTHOR"
      ? "/authordashbord"
      : user?.role === "USER"
      ? "/userdashbord"
      : "/";

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
      isActive
        ? "bg-brand-50 text-brand-600 shadow-sm"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    }`;

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-gradient-to-br from-brand-500 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:shadow-indigo-500/30 transition-shadow">
              <BookOpen size={20} className="text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900 group-hover:text-brand-600 transition-colors">
              ArticleHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            <NavLink to="/" className={navLinkClass}>
              <Home size={18} />
              Home
            </NavLink>

            {/* Not Logged In */}
            {!user && (
              <>
                <div className="h-6 w-px bg-slate-200 mx-2"></div>
                <NavLink to="/login" className={navLinkClass}>
                  <LogIn size={18} />
                  Login
                </NavLink>
                <NavLink 
                  to="/register" 
                  className={({ isActive }) => 
                    `flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 shadow-sm ${
                      isActive 
                        ? "bg-brand-600 text-white shadow-brand-500/30" 
                        : "bg-slate-900 text-white hover:bg-slate-800 hover:shadow-md"
                    }`
                  }
                >
                  <UserPlus size={18} />
                  Register
                </NavLink>
              </>
            )}

            {/* Logged In */}
            {user && (
              <>
                <NavLink to={dashboardPath} className={navLinkClass}>
                  <LayoutDashboard size={18} />
                  Dashboard
                </NavLink>
                <div className="h-6 w-px bg-slate-200 mx-2"></div>
                
                {/* User Info & Logout */}
                <div className="flex items-center gap-4 ml-2">
                  <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                    <div className="w-6 h-6 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center font-bold text-xs uppercase">
                      {user.email.charAt(0)}
                    </div>
                    <span className="font-medium truncate max-w-[120px]">{user.email.split('@')[0]}</span>
                  </div>
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-2 rounded-md transition-colors"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              </>
            )}
          </nav>
          
          {/* Mobile Menu Button - Minimal version for now */}
          <div className="md:hidden flex items-center">
            <span className="text-sm text-slate-500">Menu (Resize for full nav)</span>
          </div>
          
        </div>
      </div>
    </header>
  );
}

export default Header;
