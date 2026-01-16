import React, { useState } from 'react';
import { Moon, Sun, Menu, X, LayoutDashboard, FileText, BarChart3, Users, Settings, LogIn, UserPlus, User } from 'lucide-react';

// Header Component
const Header = ({ darkMode, setDarkMode, sidebarOpen, setSidebarOpen }) => {
  return (
    <header className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} shadow-sm border-b transition-all duration-300 fixed w-full top-0 z-50`}>
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left Section - Logo and Menu */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`p-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded-lg transition-all duration-300`}
            >
              {sidebarOpen ? (
                <X className={`w-6 h-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} />
              ) : (
                <Menu className={`w-6 h-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} />
              )}
            </button>
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 ${darkMode ? 'bg-blue-600' : 'bg-blue-500'} rounded-lg flex items-center justify-center`}>
                <span className="text-white font-bold text-xl">🍕</span>
              </div>
              <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>
                FoodCo
              </h1>
            </div>
            <div className="hidden md:block">
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300 ml-4 pl-4 border-l ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
                Fault Analytics
              </h2>
            </div>
          </div>

          {/* Right Section - Actions */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded-lg transition-all duration-300 transform hover:scale-110`}
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </button>

            <button 
              className={`hidden sm:flex items-center gap-2 px-4 py-2 ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'} rounded-lg transition-all duration-300 transform hover:scale-105`}
            >
              
              <span className="text-sm font-medium">Logged as admin</span>
            </button>

            <button className={`p-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded-full transition-all duration-300 transform hover:scale-110`}>
              <User className={`w-5 h-5 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;