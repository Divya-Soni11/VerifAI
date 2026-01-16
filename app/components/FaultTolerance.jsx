'use client';
import React, { useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Search, User, Moon, Sun } from 'lucide-react';

const FaultDashboard = ( { darkMode, setDarkMode }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('pie'); // 'pie' or 'bar'
  const [selectedFault, setSelectedFault] = useState(null);
 

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

  // Table data
  const [selectedView, setSelectedView] = useState('dashboard'); // 'dashboard', 'customer', 'restaurant', 'partner'
  const [selectedEntity, setSelectedEntity] = useState(null);

  const tableData = [
    { 
      orderId: 'ORD-2024-1001', 
      customerName: 'Harmandeep Singh', 
      restaurant: 'Pizza Paradise', 
      status: 'Pending', 
      amount: 450, 
      deliveryPartner: 'Rajesh Kumar',
      customerTrust: 85,
      restaurantTrust: 92,
      partnerTrust: 78
    },
    { 
      orderId: 'ORD-2024-1002', 
      customerName: 'Priya Sharma', 
      restaurant: 'Burger King', 
      status: 'Approved', 
      amount: 320, 
      deliveryPartner: 'Amit Singh',
      customerTrust: 92,
      restaurantTrust: 88,
      partnerTrust: 95
    },
    { 
      orderId: 'ORD-2024-1003', 
      customerName: 'Rohit Verma', 
      restaurant: 'Sushi Express', 
      status: 'Processed', 
      amount: 680, 
      deliveryPartner: 'Vikram Patel',
      customerTrust: 78,
      restaurantTrust: 95,
      partnerTrust: 82
    },
    { 
      orderId: 'ORD-2024-1004', 
      customerName: 'Anjali Gupta', 
      restaurant: 'Tandoor House', 
      status: 'Pending', 
      amount: 550, 
      deliveryPartner: 'Suresh Reddy',
      customerTrust: 88,
      restaurantTrust: 90,
      partnerTrust: 76
    },
    { 
      orderId: 'ORD-2024-1005', 
      customerName: 'Karan Mehta', 
      restaurant: 'Pizza Paradise', 
      status: 'Rejected', 
      amount: 290, 
      deliveryPartner: 'Rajesh Kumar',
      customerTrust: 65,
      restaurantTrust: 92,
      partnerTrust: 78
    },
    { 
      orderId: 'ORD-2024-1006', 
      customerName: 'Neha Kapoor', 
      restaurant: 'Chinese Wok', 
      status: 'Approved', 
      amount: 420, 
      deliveryPartner: 'Amit Singh',
      customerTrust: 94,
      restaurantTrust: 87,
      partnerTrust: 95
    },
    { 
      orderId: 'ORD-2024-1007', 
      customerName: 'Vikas Joshi', 
      restaurant: 'Burger King', 
      status: 'Processed', 
      amount: 380, 
      deliveryPartner: 'Vikram Patel',
      customerTrust: 82,
      restaurantTrust: 88,
      partnerTrust: 82
    },
    { 
      orderId: 'ORD-2024-1008', 
      customerName: 'Simran Kaur', 
      restaurant: 'Tandoor House', 
      status: 'Pending', 
      amount: 720, 
      deliveryPartner: 'Suresh Reddy',
      customerTrust: 90,
      restaurantTrust: 90,
      partnerTrust: 76
    }
  ];

  const handleEntityClick = (type, data) => {
    setSelectedView(type);
    setSelectedEntity(data);
  };

  const handleBackToDashboard = () => {
    setSelectedView('dashboard');
    setSelectedEntity(null);
  };

  const totalFaults = faultData.reduce((sum, item) => sum + item.value, 0);

  // Get status color
  const getStatusColor = (status) => {
    switch(status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Approved': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Processed': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'Rejected': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Get trust score color
  const getTrustScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-yellow-600';
    return 'text-red-600';
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

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} shadow-sm border-b`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Fault Analytics</h1>
           
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Refund Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-5`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Pending Refunds</p>
                <p className="text-2xl font-bold text-yellow-600">{refundStats.pending}</p>
              </div>
              <div className={`w-12 h-12 ${darkMode ? 'bg-yellow-900' : 'bg-yellow-100'} rounded-full flex items-center justify-center`}>
                <span className="text-yellow-600 text-xl">⏳</span>
              </div>
            </div>
          </div>

          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-5`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Approved Refunds</p>
                <p className="text-2xl font-bold text-green-600">{refundStats.approved}</p>
              </div>
              <div className={`w-12 h-12 ${darkMode ? 'bg-green-900' : 'bg-green-100'} rounded-full flex items-center justify-center`}>
                <span className="text-green-600 text-xl">✓</span>
              </div>
            </div>
          </div>

          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-5`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Processed Refunds</p>
                <p className="text-2xl font-bold text-blue-600">{refundStats.processed}</p>
              </div>
              <div className={`w-12 h-12 ${darkMode ? 'bg-blue-900' : 'bg-blue-100'} rounded-full flex items-center justify-center`}>
                <span className="text-blue-600 text-xl">✔</span>
              </div>
            </div>
          </div>

          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-5`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Total Amount</p>
                <p className="text-2xl font-bold text-purple-600">₹{refundStats.totalAmount.toLocaleString()}</p>
              </div>
              <div className={`w-12 h-12 ${darkMode ? 'bg-purple-900' : 'bg-purple-100'} rounded-full flex items-center justify-center`}>
                <span className="text-purple-600 text-xl">₹</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Left Side - Pie Charts (30-40% width) */}
          <div className="w-2/5 space-y-6">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6`}>
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  {viewMode === 'pie' ? 'Fault Distribution' : `${selectedFault?.name} Details`}
                </h2>
                {viewMode === 'bar' && (
                  <button
                    onClick={handleBackToPie}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    ← Back to Overview
                  </button>
                )}
              </div>

              {viewMode === 'pie' ? (
                <>
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
                      >
                        {faultData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  
                  {/* Legend with counts */}
                  <div className="mt-6 space-y-3">
                    {faultData.map((item, index) => (
                      <div 
                        key={index} 
                        className={`flex items-center justify-between cursor-pointer ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} p-2 rounded transition`}
                        onClick={() => handlePieClick(item, index)}
                      >
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-4 h-4 rounded"
                            style={{ backgroundColor: item.color }}
                          />
                          <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{item.name}</span>
                        </div>
                        <span className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {item.value} ({((item.value / totalFaults) * 100).toFixed(1)}%)
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Total */}
                  <div className={`mt-4 pt-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Total Faults</span>
                      <span className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{totalFaults}</span>
                    </div>
                  </div>
                  
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-4 text-center`}>
                    Click on any section to view detailed breakdown
                  </p>
                </>
              ) : (
                <>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={getDetailedData(selectedFault.key)}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar 
                        dataKey="count" 
                        fill={selectedFault.color}
                        name={selectedFault.name}
                      />
                    </BarChart>
                  </ResponsiveContainer>

                  {/* Statistics */}
                  <div className="mt-6 space-y-3">
                    <div className={`flex items-center justify-between p-3 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded`}>
                      <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Current Month</span>
                      <span className="text-lg font-bold" style={{ color: selectedFault.color }}>
                        {getDetailedData(selectedFault.key)[5].count}
                      </span>
                    </div>
                    <div className={`flex items-center justify-between p-3 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded`}>
                      <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Average</span>
                      <span className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {(getDetailedData(selectedFault.key).reduce((sum, item) => sum + item.count, 0) / 6).toFixed(1)}
                      </span>
                    </div>
                    <div className={`flex items-center justify-between p-3 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded`}>
                      <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Total (6 months)</span>
                      <span className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {getDetailedData(selectedFault.key).reduce((sum, item) => sum + item.count, 0)}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right Side - Bar Chart (60-70% width) */}
          <div className="flex-1">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6`}>
              <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'} mb-6`}>Refund Request Overview</h2>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={refundOverview}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
                  <XAxis dataKey="month" stroke={darkMode ? '#9ca3af' : '#6b7280'} />
                  <YAxis stroke={darkMode ? '#9ca3af' : '#6b7280'} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                      border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                      color: darkMode ? '#ffffff' : '#000000'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="pending" name="Pending" fill="#eab308" stackId="a" />
                  <Bar dataKey="approved" name="Approved" fill="#22c55e" stackId="a" />
                  <Bar dataKey="processed" name="Processed" fill="#3b82f6" stackId="a" />
                </BarChart>
              </ResponsiveContainer>
              
              {/* Summary Stats Below Chart */}
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className={`text-center p-4 ${darkMode ? 'bg-yellow-900 bg-opacity-20' : 'bg-yellow-50'} rounded-lg`}>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Avg Pending Time</p>
                  <p className="text-xl font-bold text-yellow-600">2.3 days</p>
                </div>
                <div className={`text-center p-4 ${darkMode ? 'bg-green-900 bg-opacity-20' : 'bg-green-50'} rounded-lg`}>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Approval Rate</p>
                  <p className="text-xl font-bold text-green-600">94.5%</p>
                </div>
                <div className={`text-center p-4 ${darkMode ? 'bg-blue-900 bg-opacity-20' : 'bg-blue-50'} rounded-lg`}>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Avg Refund Amount</p>
                  <p className="text-xl font-bold text-blue-600">₹200</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default FaultDashboard;

