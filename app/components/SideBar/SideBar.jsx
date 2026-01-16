import { Moon, Sun, Menu, X, LayoutDashboard, FileText, BarChart3, Users, Settings, LogIn, UserPlus, User } from 'lucide-react';

const Sidebar = ({ darkMode, sidebarOpen, setSidebarOpen, currentPage, setCurrentPage }) => {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'complaints', icon: FileText, label: 'Complaints' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics' },
    { id: 'sessions', icon: Users, label: 'Sessions' },
    { id: 'settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-r transition-all duration-300 z-40 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  // Don't auto-close sidebar on larger screens
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                  isActive
                    ? darkMode 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-blue-500 text-white'
                    : darkMode
                      ? 'text-gray-300 hover:bg-gray-700'
                      : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Mobile Auth Buttons */}
        <div className="p-4 space-y-2 sm:hidden border-t border-gray-200 dark:border-gray-700 mt-4">
          <button className={`w-full flex items-center justify-center gap-2 px-4 py-2 ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-700'} rounded-lg transition-all duration-300`}>
            <LogIn className="w-4 h-4" />
            <span className="text-sm font-medium">Login</span>
          </button>
          <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg transition-all duration-300">
            <UserPlus className="w-4 h-4" />
            <span className="text-sm font-medium">Sign Up</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;