import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, ShoppingBag, Sparkles, ClipboardList, 
  Settings, Bell, LogOut 
} from 'lucide-react';

export default function FarmerLayout() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-900 overflow-hidden">
      {/* Sidebar (Your exact original layout structure) */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col justify-between shrink-0">
        <div>
          <div className="h-16 flex items-center px-6 border-b border-gray-200 font-bold text-lg text-gray-900">
            D-Agro Market AI
          </div>
          <div className="p-4">
            <div className="flex items-center gap-3 p-3 mb-6 rounded-xl bg-gray-50 border border-gray-100">
              <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 font-bold flex items-center justify-center text-sm shrink-0">
                AB
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-bold truncate">Abebe Bikila</p>
                <p className="text-xs text-gray-500 truncate">Verified Farmer • Oromia</p>
              </div>
            </div>
            
            <nav className="space-y-1">
              <Link 
                to="/farmer/dashboard" 
                className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  isActive('/farmer/dashboard') 
                    ? 'bg-orange-500 text-white shadow-sm shadow-orange-200 font-semibold' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <LayoutDashboard size={18} /> Dashboard
              </Link>

              <Link 
                to="/farmer/marketplace" 
                className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  isActive('/farmer/marketplace') 
                    ? 'bg-orange-500 text-white shadow-sm shadow-orange-200 font-semibold' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <ShoppingBag size={18} /> Marketplace
              </Link>

              <Link 
    to="/ai/crop-recommendation" 
    className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
      isActive('/ai/crop-recommendation') 
        ? 'bg-orange-500 text-white shadow-sm shadow-orange-200 font-semibold' 
        : 'text-gray-600 hover:bg-gray-50'
    }`}
  >
    <Sparkles size={18} /> AI Services
  </Link>

              <Link 
                to="/farmer/orders" 
                className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  isActive('/farmer/orders') 
                    ? 'bg-orange-500 text-white shadow-sm shadow-orange-200 font-semibold' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <ClipboardList size={18} /> Orders
              </Link>

              <Link 
                to="/farmer/profile" 
                className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  isActive('/farmer/profile') || isActive('/farmer/settings')
                    ? 'bg-orange-500 text-white shadow-sm shadow-orange-200 font-semibold' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Settings size={18} /> Settings & Profile
              </Link>
            </nav>
          </div>
        </div>

        <div className="p-4 border-t border-gray-200">
          <Link 
            to="/" 
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut size={18} /> Exit to Home
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto flex flex-col justify-between">
        <div>
          {/* Top Navbar */}
          <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
              <span className="hover:text-gray-900 cursor-pointer">Farmer Portal</span>
              <span>/</span>
              <span className="text-gray-900 capitalize">{location.pathname.split('/').pop()?.replace('-', ' ')}</span>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100">
                <Bell size={20} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full"></span>
              </button>
              <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center text-white text-xs font-bold">
                AB
              </div>
            </div>
          </header>

          {/* Child Component Rendering */}
          <div className="p-8 max-w-7xl mx-auto">
            <Outlet />
          </div>
        </div>

      </main>
    </div>
  );
}