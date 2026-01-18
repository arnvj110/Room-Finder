import { Home, LogOut, User } from 'lucide-react'
import React from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const Header = ({view, setView}) => {
    const {user, logout} = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
      try {
        await logout();
        toast.success('Logged out successfully!');
        navigate('/login');
      } catch (error) {
        toast.error('Failed to logout');
        console.error(error);
      }
    };

  return (
    <header className="bg-[#1f1f1f] shadow-lg sticky top-0 z-40 border-b border-[#2f2f2f]">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Home className="w-8 h-8 text-indigo-500" />
              <h1 className="text-2xl font-bold text-gray-100">RoomFinder</h1>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setView('finder')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  view === 'finder'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-[#2f2f2f] text-gray-300 hover:bg-[#3f3f3f] border border-[#3f3f3f]'
                }`}
              >
                Find Rooms
              </button>
              <button
                onClick={() => setView('owner')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  view === 'owner'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-[#2f2f2f] text-gray-300 hover:bg-[#3f3f3f] border border-[#3f3f3f]'
                }`}
              >
                My Listings
              </button>

              {/* User Info & Logout */}
              {user && (
                <div className="flex items-center gap-2 ml-2 pl-2 border-l border-[#3f3f3f]">
                  <div className="flex items-center gap-2 px-3 py-2 bg-[#2f2f2f] rounded-lg border border-[#3f3f3f]">
                    <User className="w-4 h-4 text-indigo-400" />
                    <span className="text-sm font-medium text-gray-300">
                      {user.email?.split('@')[0]}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-600 bg-opacity-20 hover:bg-opacity-30 text-red-100 rounded-lg font-medium transition-all border border-red-600 border-opacity-30 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
  )
}

export default Header