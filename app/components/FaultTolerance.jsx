import React, { useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Search, User, Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FaultDashboard = ({ darkMode}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('pie');
  const [selectedFault, setSelectedFault] = useState(null);
  const [selectedView, setSelectedView] = useState('dashboard');
  const [selectedEntity, setSelectedEntity] = useState(null);

  // Pie chart data for fault types
  const faultData = [
    { name: 'Late Delivery', value: 35, color: '#ef4444', key: 'lateDelivery' },
    { name: 'Food Quality', value: 28, color: '#f59e0b', key: 'foodQuality' },
    { name: 'Order Missing', value: 20, color: '#3b82f6', key: 'orderMissing' },
    { name: 'Other', value: 17, color: '#8b5cf6', key: 'other' }
  ];

  // Bar chart data for monthly trends
  const monthlyData = [
    { month: 'Jan', lateDelivery: 45, foodQuality: 32, orderMissing: 28, other: 15 },
    { month: 'Feb', lateDelivery: 52, foodQuality: 28, orderMissing: 25, other: 18 },
    { month: 'Mar', lateDelivery: 48, foodQuality: 35, orderMissing: 30, other: 20 },
    { month: 'Apr', lateDelivery: 38, foodQuality: 30, orderMissing: 22, other: 16 },
    { month: 'May', lateDelivery: 42, foodQuality: 33, orderMissing: 26, other: 19 },
    { month: 'Jun', lateDelivery: 35, foodQuality: 28, orderMissing: 20, other: 17 }
  ];

  // Refund data
  const refundOverview = [
    { month: 'Jan', pending: 12, approved: 28, processed: 45 },
    { month: 'Feb', pending: 15, approved: 32, processed: 48 },
    { month: 'Mar', pending: 18, approved: 30, processed: 52 },
    { month: 'Apr', pending: 10, approved: 25, processed: 38 },
    { month: 'May', pending: 14, approved: 29, processed: 42 },
    { month: 'Jun', pending: 20, approved: 22, processed: 35 }
  ];

  const refundStats = {
    pending: 20,
    approved: 22,
    processed: 35,
    totalAmount: 15420
  };

  const totalFaults = faultData.reduce((sum, item) => sum + item.value, 0);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  // Handle pie chart click
  const handlePieClick = (data, index) => {
    setSelectedFault(faultData[index]);
    setViewMode('bar');
  };

  // Handle back to pie chart
  const handleBackToPie = () => {
    setViewMode('pie');
    setSelectedFault(null);
  };

  // Get detailed data for selected fault
  const getDetailedData = (faultKey) => {
    return monthlyData.map(item => ({
      month: item.month,
      count: item[faultKey]
    }));
  };

  const statCards = [
    {
      title: 'Pending Refunds',
      value: refundStats.pending,
      color: 'yellow',
      icon: '⏳',
      bg: darkMode ? 'bg-yellow-900' : 'bg-yellow-100'
    },
    {
      title: 'Approved Refunds',
      value: refundStats.approved,
      color: 'green',
      icon: '✓',
      bg: darkMode ? 'bg-green-900' : 'bg-green-100'
    },
    {
      title: 'Processed Refunds',
      value: refundStats.processed,
      color: 'blue',
      icon: '✔',
      bg: darkMode ? 'bg-blue-900' : 'bg-blue-100'
    },
    {
      title: 'Total Amount',
      value: `₹${refundStats.totalAmount.toLocaleString()}`,
      color: 'purple',
      icon: '₹',
      bg: darkMode ? 'bg-purple-900' : 'bg-purple-100'
    }
  ];

  const summaryStats = [
    {
      label: 'Avg Pending Time',
      value: '2.3 days',
      color: 'yellow',
      bg: darkMode ? 'bg-yellow-900 bg-opacity-20' : 'bg-yellow-50'
    },
    {
      label: 'Approval Rate',
      value: '94.5%',
      color: 'green',
      bg: darkMode ? 'bg-green-900 bg-opacity-20' : 'bg-green-50'
    },
    {
      label: 'Avg Refund Amount',
      value: '₹200',
      color: 'blue',
      bg: darkMode ? 'bg-blue-900 bg-opacity-20' : 'bg-blue-50'
    }
  ];

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}
    >
   

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Refund Stats Cards */}
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
        >
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              variants={cardVariants}
              whileHover={{ 
                y: -8, 
                scale: 1.03,
                transition: { duration: 0.2 }
              }}
              className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-5 cursor-pointer`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}
                  >
                    {stat.title}
                  </motion.p>
                  <motion.p 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      delay: index * 0.1 + 0.4,
                      type: "spring",
                      stiffness: 200
                    }}
                    className={`text-2xl font-bold text-${stat.color}-600`}
                  >
                    {stat.value}
                  </motion.p>
                </div>
                <motion.div 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className={`w-12 h-12 ${stat.bg} rounded-full flex items-center justify-center`}
                >
                  <span className={`text-${stat.color}-600 text-xl`}>{stat.icon}</span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Side - Pie Chart (35% width on large screens) */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-5 space-y-6"
          >
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ boxShadow: darkMode ? '0 20px 40px rgba(0, 0, 0, 0.5)' : '0 20px 40px rgba(0, 0, 0, 0.1)' }}
              className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6 transition-shadow duration-300`}
            >
              <div className="flex items-center justify-between mb-6">
                <motion.h2 
                  layout
                  className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}
                >
                  {viewMode === 'pie' ? 'Fault Distribution' : `${selectedFault?.name} Details`}
                </motion.h2>
                <AnimatePresence>
                  {viewMode === 'bar' && (
                    <motion.button
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleBackToPie}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      ← Back to Overview
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>

              <AnimatePresence mode="wait">
                {viewMode === 'pie' ? (
                  <motion.div
                    key="pie-view"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={faultData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            onClick={handlePieClick}
                            style={{ cursor: 'pointer' }}
                            animationBegin={0}
                            animationDuration={800}
                          >
                            {faultData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                              border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                              borderRadius: '8px',
                              padding: '8px 12px'
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </motion.div>
                    
                    {/* Legend with counts */}
                    <div className="mt-6 space-y-3">
                      {faultData.map((item, index) => (
                        <motion.div 
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                          whileHover={{ 
                            x: 5,
                            scale: 1.02,
                            backgroundColor: darkMode ? 'rgba(55, 65, 81, 0.8)' : 'rgba(249, 250, 251, 1)',
                            transition: { duration: 0.2 }
                          }}
                          className={`flex items-center justify-between cursor-pointer p-3 rounded transition-all`}
                          onClick={() => handlePieClick(item, index)}
                        >
                          <div className="flex items-center gap-2">
                            <motion.div 
                              whileHover={{ scale: 1.3, rotate: 180 }}
                              transition={{ duration: 0.3 }}
                              className="w-4 h-4 rounded"
                              style={{ backgroundColor: item.color }}
                            />
                            <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{item.name}</span>
                          </div>
                          <span className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {item.value} ({((item.value / totalFaults) * 100).toFixed(1)}%)
                          </span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Total */}
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.9 }}
                      className={`mt-4 pt-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Total Faults</span>
                        <motion.span 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200, delay: 1 }}
                          className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}
                        >
                          {totalFaults}
                        </motion.span>
                      </div>
                    </motion.div>
                    
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.1 }}
                      className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-4 text-center`}
                    >
                      Click on any section to view detailed breakdown
                    </motion.p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="bar-view"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={getDetailedData(selectedFault.key)}>
                          <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
                          <XAxis dataKey="month" stroke={darkMode ? '#9ca3af' : '#6b7280'} />
                          <YAxis stroke={darkMode ? '#9ca3af' : '#6b7280'} />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                              border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                              borderRadius: '8px',
                              padding: '8px 12px'
                            }}
                          />
                          <Bar 
                            dataKey="count" 
                            fill={selectedFault.color}
                            name={selectedFault.name}
                            animationBegin={0}
                            animationDuration={800}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </motion.div>

                    {/* Statistics */}
                    <div className="mt-6 space-y-3">
                      {[
                        { label: 'Current Month', value: getDetailedData(selectedFault.key)[5].count, colored: true },
                        { 
                          label: 'Average', 
                          value: (getDetailedData(selectedFault.key).reduce((sum, item) => sum + item.count, 0) / 6).toFixed(1),
                          colored: false
                        },
                        { 
                          label: 'Total (6 months)', 
                          value: getDetailedData(selectedFault.key).reduce((sum, item) => sum + item.count, 0),
                          colored: false
                        }
                      ].map((stat, index) => (
                        <motion.div
                          key={stat.label}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 + index * 0.1 }}
                          whileHover={{ scale: 1.03, x: 5 }}
                          className={`flex items-center justify-between p-3 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded cursor-pointer`}
                        >
                          <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{stat.label}</span>
                          <span 
                            className="text-lg font-bold"
                            style={stat.colored ? { color: selectedFault.color } : {}}
                          >
                            {stat.value}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>

          {/* Right Side - Bar Chart (65% width on large screens) */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-7"
          >
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ boxShadow: darkMode ? '0 20px 40px rgba(0, 0, 0, 0.5)' : '0 20px 40px rgba(0, 0, 0, 0.1)' }}
              className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6 transition-shadow duration-300`}
            >
              <motion.h2 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'} mb-6`}
              >
                Refund Request Overview
              </motion.h2>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.3 }}
                >
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={refundOverview}>
                      <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
                      <XAxis dataKey="month" stroke={darkMode ? '#9ca3af' : '#6b7280'} />
                      <YAxis stroke={darkMode ? '#9ca3af' : '#6b7280'} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                          border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                          color: darkMode ? '#ffffff' : '#000000',
                          borderRadius: '8px',
                          padding: '10px 14px',
                          boxShadow: darkMode ? '0 4px 12px rgba(0, 0, 0, 0.3)' : '0 4px 12px rgba(0, 0, 0, 0.1)'
                        }}
                        cursor={{ fill: darkMode ? 'rgba(55, 65, 81, 0.3)' : 'rgba(229, 231, 235, 0.5)' }}
                      />
                      <Legend />
                      <Bar 
                        dataKey="pending" 
                        name="Pending" 
                        fill="#eab308" 
                        stackId="a"
                        animationBegin={0}
                        animationDuration={800}
                        radius={[0, 0, 0, 0]}
                      />
                      <Bar 
                        dataKey="approved" 
                        name="Approved" 
                        fill="#22c55e" 
                        stackId="a"
                        animationBegin={200}
                        animationDuration={800}
                        radius={[0, 0, 0, 0]}
                      />
                      <Bar 
                        dataKey="processed" 
                        name="Processed" 
                        fill="#3b82f6" 
                        stackId="a"
                        animationBegin={400}
                        animationDuration={800}
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </motion.div>
              </motion.div>
              
              {/* Summary Stats Below Chart */}
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                {summaryStats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    variants={cardVariants}
                    custom={index}
                    whileHover={{ 
                      y: -5,
                      scale: 1.03,
                      boxShadow: darkMode ? '0 8px 20px rgba(0, 0, 0, 0.4)' : '0 8px 20px rgba(0, 0, 0, 0.15)',
                      transition: { duration: 0.2 }
                    }}
                    className={`text-center p-4 ${stat.bg} rounded-lg cursor-pointer transition-all`}
                  >
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 + index * 0.1 }}
                      className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}
                    >
                      {stat.label}
                    </motion.p>
                    <motion.p 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ 
                        delay: 1.1 + index * 0.1,
                        type: "spring",
                        stiffness: 200
                      }}
                      className={`text-xl font-bold text-${stat.color}-600`}
                    >
                      {stat.value}
                    </motion.p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default FaultDashboard;
