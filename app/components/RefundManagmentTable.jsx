import React, { useState } from 'react';
import { Search, Filter, Download, Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const RefundManagementTable = ({ darkMode: initialDarkMode = false }) => {
  const [darkMode, setDarkMode] = useState(initialDarkMode);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Sample data
  const refundData = [
    {
      orderId: 'ORD-2024-1001',
      customerName: 'Rajesh Kumar',
      restaurant: 'Spice Garden',
      refundReason: 'Wrong item delivered',
      status: 'Approved',
      amount: 450,
      deliveryPartner: 'Amit Singh',
      trustScore: 85,
      risk: 'Low'
    },
    {
      orderId: 'ORD-2024-1002',
      customerName: 'Priya Sharma',
      restaurant: 'Pizza Palace',
      refundReason: 'Late delivery',
      status: 'Pending',
      amount: 320,
      deliveryPartner: 'Rohit Verma',
      trustScore: 72,
      risk: 'Medium'
    },
    {
      orderId: 'ORD-2024-1003',
      customerName: 'Ankur Patel',
      restaurant: 'Biryani House',
      refundReason: 'Food quality issue',
      status: 'Processed',
      amount: 580,
      deliveryPartner: 'Suresh Yadav',
      trustScore: 90,
      risk: 'Low'
    },
    {
      orderId: 'ORD-2024-1004',
      customerName: 'Neha Gupta',
      restaurant: 'Burger Junction',
      refundReason: 'Missing items',
      status: 'Rejected',
      amount: 250,
      deliveryPartner: 'Vikram Das',
      trustScore: 45,
      risk: 'High'
    },
    {
      orderId: 'ORD-2024-1005',
      customerName: 'Sanjay Mehta',
      restaurant: 'Chinese Wok',
      refundReason: 'Order cancelled',
      status: 'Approved',
      amount: 670,
      deliveryPartner: 'Ravi Kumar',
      trustScore: 88,
      risk: 'Low'
    },
    {
      orderId: 'ORD-2024-1006',
      customerName: 'Kavita Reddy',
      restaurant: 'Dosa Corner',
      refundReason: 'Wrong address delivery',
      status: 'Pending',
      amount: 180,
      deliveryPartner: 'Manoj Singh',
      trustScore: 55,
      risk: 'Medium'
    }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'Approved': return '#22c55e';
      case 'Pending': return '#eab308';
      case 'Processed': return '#3b82f6';
      case 'Rejected': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusBgColor = (status) => {
    switch(status) {
      case 'Approved': return darkMode ? 'bg-green-900 bg-opacity-20' : 'bg-green-100';
      case 'Pending': return darkMode ? 'bg-yellow-900 bg-opacity-20' : 'bg-yellow-100';
      case 'Processed': return darkMode ? 'bg-blue-900 bg-opacity-20' : 'bg-blue-100';
      case 'Rejected': return darkMode ? 'bg-red-900 bg-opacity-20' : 'bg-red-100';
      default: return darkMode ? 'bg-gray-800' : 'bg-gray-100';
    }
  };

  const getRiskColor = (risk) => {
    switch(risk) {
      case 'Low': return '#22c55e';
      case 'Medium': return '#f59e0b';
      case 'High': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getRiskBgColor = (risk) => {
    switch(risk) {
      case 'Low': return darkMode ? 'bg-green-900 bg-opacity-20' : 'bg-green-100';
      case 'Medium': return darkMode ? 'bg-orange-900 bg-opacity-20' : 'bg-orange-100';
      case 'High': return darkMode ? 'bg-red-900 bg-opacity-20' : 'bg-red-100';
      default: return darkMode ? 'bg-gray-800' : 'bg-gray-100';
    }
  };

  const getTrustScoreColor = (score) => {
    if (score >= 80) return '#22c55e';
    if (score >= 60) return '#f59e0b';
    return '#ef4444';
  };

  const filteredData = refundData.filter(item => {
    const matchesSearch = 
      item.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.restaurant.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  const stats = {
    total: refundData.length,
    pending: refundData.filter(r => r.status === 'Pending').length,
    approved: refundData.filter(r => r.status === 'Approved').length,
    processed: refundData.filter(r => r.status === 'Processed').length,
    totalAmount: refundData.reduce((sum, r) => sum + r.amount, 0)
  };

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

  const statsCards = [
    { 
      label: 'Total Requests', 
      value: stats.total, 
      bg: darkMode ? 'bg-gray-800' : 'bg-white', 
      textColor: darkMode ? 'text-white' : 'text-gray-900',
      valueColor: null
    },
    { 
      label: 'Pending', 
      value: stats.pending, 
      bg: darkMode ? 'bg-yellow-900 bg-opacity-20' : 'bg-yellow-100', 
      textColor: null,
      valueColor: '#eab308' 
    },
    { 
      label: 'Approved', 
      value: stats.approved, 
      bg: darkMode ? 'bg-green-900 bg-opacity-20' : 'bg-green-100', 
      textColor: null,
      valueColor: '#22c55e' 
    },
    { 
      label: 'Processed', 
      value: stats.processed, 
      bg: darkMode ? 'bg-blue-900 bg-opacity-20' : 'bg-blue-100', 
      textColor: null,
      valueColor: '#3b82f6' 
    },
    { 
      label: 'Total Amount', 
      value: `₹${stats.totalAmount}`, 
      bg: darkMode ? 'bg-gray-800' : 'bg-white', 
      textColor: darkMode ? 'text-white' : 'text-gray-900',
      valueColor: null
    }
  ];

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} p-6 transition-colors duration-300`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          variants={itemVariants}
          className="mb-6 flex justify-between items-start"
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
              Fault Attribution Refund System
            </h1>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Manage and track customer refund requests
            </p>
          </motion.div>
          
          <motion.button
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, rotate: -180 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => setDarkMode(!darkMode)}
            className={`p-3 rounded-lg ${darkMode ? 'bg-gray-800 text-yellow-400' : 'bg-white text-gray-700'} shadow hover:shadow-lg transition-shadow`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={darkMode ? 'sun' : 'moon'}
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 180, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6"
        >
          {statsCards.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              whileHover={{ 
                y: -8, 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.98 }}
              className={`${stat.bg} p-4 rounded-lg shadow cursor-pointer`}
            >
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}
              >
                {stat.label}
              </motion.div>
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  delay: index * 0.1 + 0.4,
                  type: "spring",
                  stiffness: 200
                }}
                className={`text-2xl font-bold ${stat.textColor || ''}`}
                style={stat.valueColor ? { color: stat.valueColor } : {}}
              >
                {stat.value}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Filters and Search */}
        <motion.div 
          variants={itemVariants}
          className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg shadow mb-6`}
        >
          <div className="flex flex-col md:flex-row gap-4">
            <motion.div 
              className="flex-1 relative"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none z-10">
                <Search className={`${darkMode ? 'text-gray-500' : 'text-gray-400'}`} size={20} />
              </div>
              <motion.input
                type="text"
                placeholder="Search by Order ID, Customer, or Restaurant..."
                className={`w-full pl-10 pr-4 py-2 border ${darkMode ? 'border-gray-700 bg-gray-900 text-white placeholder-gray-500' : 'border-gray-300 bg-white text-gray-900'} rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                whileFocus={{ 
                  scale: 1.02,
                  boxShadow: darkMode ? "0 0 0 3px rgba(59, 130, 246, 0.3)" : "0 0 0 3px rgba(59, 130, 246, 0.2)"
                }}
              />
            </motion.div>
            
            <div className="flex gap-2">
              <motion.div 
                className="relative"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none z-10">
                  <Filter className={`${darkMode ? 'text-gray-500' : 'text-gray-400'}`} size={20} />
                </div>
                <select
                  className={`pl-10 pr-4 py-2 border ${darkMode ? 'border-gray-700 bg-gray-900 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer shadow-sm`}
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option>All</option>
                  <option>Pending</option>
                  <option>Approved</option>
                  <option>Processed</option>
                  <option>Rejected</option>
                </select>
              </motion.div>
              
              {/* Export button - TODO: Implement export functionality */}
              {/* <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2 transition-colors"
              >
                <Download size={20} />
                Export
              </motion.button> */}
            </div>
          </div>
        </motion.div>

        {/* Table */}
        <motion.div 
          variants={itemVariants}
          className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow overflow-hidden`}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <motion.thead 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className={`${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-gray-100 border-gray-200'} border-b`}
              >
                <tr>
                  {['Order ID', 'Customer Name', 'Restaurant', 'Refund Reason', 'Status', 'Amount', 'Trust Score', 'Risk', 'Delivery Partner'].map((header, index) => (
                    <motion.th
                      key={header}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.05 }}
                      className={`px-6 py-3 text-left text-xs font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} uppercase tracking-wider`}
                    >
                      {header}
                    </motion.th>
                  ))}
                </tr>
              </motion.thead>
              
              <tbody className={`${darkMode ? 'divide-gray-700' : 'divide-gray-200'} divide-y`}>
                <AnimatePresence mode="popLayout">
                  {currentData.map((item, index) => (
                    <motion.tr 
                      key={item.orderId}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      transition={{ 
                        duration: 0.3, 
                        delay: index * 0.05,
                        type: "spring",
                        stiffness: 100
                      }}
                      whileHover={{ 
                        scale: 1.01,
                        transition: { duration: 0.2 }
                      }}
                      className={`cursor-pointer ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition-colors`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.05 + 0.2 }}
                          className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}
                        >
                          {item.orderId}
                        </motion.div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>{item.customerName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>{item.restaurant}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{item.refundReason}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <motion.span 
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          animate={
                            item.status === 'Pending' || item.status === 'Rejected'
                              ? {
                                  boxShadow: [
                                    `0 0 0px ${getStatusColor(item.status)}`,
                                    `0 0 8px ${getStatusColor(item.status)}`,
                                    `0 0 0px ${getStatusColor(item.status)}`
                                  ]
                                }
                              : {}
                          }
                          transition={
                            item.status === 'Pending' || item.status === 'Rejected'
                              ? {
                                  duration: 2,
                                  repeat: Infinity,
                                  ease: "easeInOut"
                                }
                              : {}
                          }
                          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBgColor(item.status)} cursor-pointer`}
                          style={{ color: getStatusColor(item.status) }}
                        >
                          {item.status}
                        </motion.span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>₹{item.amount}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2 overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${item.trustScore}%` }}
                              transition={{ 
                                delay: index * 0.05 + 0.3,
                                duration: 0.8,
                                ease: "easeOut"
                              }}
                              className="h-2 rounded-full"
                              style={{ backgroundColor: getTrustScoreColor(item.trustScore) }}
                            />
                          </div>
                          <motion.span 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.05 + 0.5 }}
                            className="text-sm font-semibold"
                            style={{ color: getTrustScoreColor(item.trustScore) }}
                          >
                            {item.trustScore}
                          </motion.span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <motion.span 
                          whileHover={{ scale: 1.1 }}
                          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getRiskBgColor(item.risk)}`}
                          style={{ color: getRiskColor(item.risk) }}
                        >
                          {item.risk}
                        </motion.span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>{item.deliveryPartner}</div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
          
          <AnimatePresence>
            {currentData.length === 0 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className={`text-center py-12 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
              >
                <motion.div
                  animate={{ 
                    y: [0, -10, 0],
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  No refund requests found matching your criteria
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Pagination */}
        <AnimatePresence>
          {filteredData.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className={`mt-6 flex items-center justify-between ${darkMode ? 'bg-gray-800' : 'bg-white'} px-6 py-4 rounded-lg shadow`}
            >
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
              >
                Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} results
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="flex items-center gap-2"
              >
                <motion.button
                  whileHover={{ scale: currentPage === 1 ? 1 : 1.05 }}
                  whileTap={{ scale: currentPage === 1 ? 1 : 0.95 }}
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentPage === 1
                      ? `${darkMode ? 'bg-gray-700 text-gray-500' : 'bg-gray-100 text-gray-400'} cursor-not-allowed`
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  Previous
                </motion.button>
                
                <div className="flex gap-1">
                  {[...Array(totalPages)].map((_, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + i * 0.05 }}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                        currentPage === i + 1
                          ? 'bg-blue-500 text-white'
                          : `${darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`
                      }`}
                    >
                      {i + 1}
                    </motion.button>
                  ))}
                </div>
                
                <motion.button
                  whileHover={{ scale: currentPage === totalPages ? 1 : 1.05 }}
                  whileTap={{ scale: currentPage === totalPages ? 1 : 0.95 }}
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentPage === totalPages
                      ? `${darkMode ? 'bg-gray-700 text-gray-500' : 'bg-gray-100 text-gray-400'} cursor-not-allowed`
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  Next
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-4 text-center`}
        >
          Showing {filteredData.length} of {refundData.length} refund requests
        </motion.div>
      </div>
    </motion.div>
  );
};

export default RefundManagementTable;