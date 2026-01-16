import React from 'react';
import { LayoutDashboard, FileText, BarChart3, Users, Settings, LogIn, UserPlus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ darkMode, sidebarOpen, setSidebarOpen, currentPage, setCurrentPage }) => {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'complaints', icon: FileText, label: 'Complaints' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics' },
    { id: 'sessions', icon: Users, label: 'Sessions' },
    { id: 'settings', icon: Settings, label: 'Settings' }
  ];

  // Animation variants
  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    closed: {
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  const overlayVariants = {
    open: {
      opacity: 1,
      transition: {
        duration: 0.3
      }
    },
    closed: {
      opacity: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  const menuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (index) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.3
      }
    })
  };

  return (
    <>
      {/* Overlay for mobile */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div 
            initial="closed"
            animate="open"
            exit="closed"
            variants={overlayVariants}
            className="fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside 
        initial="closed"
        animate={sidebarOpen ? "open" : "closed"}
        variants={sidebarVariants}
        className={`fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-r transition-colors duration-300 z-40`}
      >
        <nav className="p-4 space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <motion.button
                key={item.id}
                custom={index}
                initial="hidden"
                animate={sidebarOpen ? "visible" : "hidden"}
                variants={menuItemVariants}
                whileHover={{ 
                  scale: 1.05,
                  x: 5,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentPage(item.id);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-300 ${
                  isActive
                    ? darkMode 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-blue-500 text-white'
                    : darkMode
                      ? 'text-gray-300 hover:bg-gray-700'
                      : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <motion.div
                  animate={isActive ? { 
                    rotate: [0, -10, 10, -10, 0],
                    scale: [1, 1.1, 1.1, 1.1, 1]
                  } : {}}
                  transition={{ duration: 0.5 }}
                >
                  <Icon className="w-5 h-5" />
                </motion.div>
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="ml-auto w-2 h-2 rounded-full bg-white"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                )}
              </motion.button>
            );
          })}
        </nav>

        {/* Mobile Auth Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={sidebarOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.5 }}
          className="p-4 space-y-2 sm:hidden border-t border-gray-200 dark:border-gray-700 mt-4"
        >
          <motion.button 
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className={`w-full flex items-center justify-center gap-2 px-4 py-2 ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-700'} rounded-lg transition-colors duration-300`}
          >
            <LogIn className="w-4 h-4" />
            <span className="text-sm font-medium">Login</span>
          </motion.button>
          
          <motion.button 
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            <UserPlus className="w-4 h-4" />
            <span className="text-sm font-medium">Sign Up</span>
          </motion.button>
        </motion.div>
      </motion.aside>
    </>
  );
};

export default Sidebar;