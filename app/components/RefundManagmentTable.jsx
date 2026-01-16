// import React, { useState } from 'react';
// import { Search, Filter, Download, Moon, Sun } from 'lucide-react';

// const RefundManagementTable = ( { darkMode}) => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('All');
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   // Sample data
//   const refundData = [
//     {
//       orderId: 'ORD-2024-1001',
//       customerName: 'Rajesh Kumar',
//       restaurant: 'Spice Garden',
//       refundReason: 'Wrong item delivered',
//       status: 'Approved',
//       amount: 450,
//       deliveryPartner: 'Amit Singh'
//     },
//     {
//       orderId: 'ORD-2024-1002',
//       customerName: 'Priya Sharma',
//       restaurant: 'Pizza Palace',
//       refundReason: 'Late delivery',
//       status: 'Pending',
//       amount: 320,
//       deliveryPartner: 'Rohit Verma'
//     },
//     {
//       orderId: 'ORD-2024-1003',
//       customerName: 'Ankur Patel',
//       restaurant: 'Biryani House',
//       refundReason: 'Food quality issue',
//       status: 'Processed',
//       amount: 580,
//       deliveryPartner: 'Suresh Yadav'
//     },
//     {
//       orderId: 'ORD-2024-1004',
//       customerName: 'Neha Gupta',
//       restaurant: 'Burger Junction',
//       refundReason: 'Missing items',
//       status: 'Rejected',
//       amount: 250,
//       deliveryPartner: 'Vikram Das'
//     },
//     {
//       orderId: 'ORD-2024-1005',
//       customerName: 'Sanjay Mehta',
//       restaurant: 'Chinese Wok',
//       refundReason: 'Order cancelled',
//       status: 'Approved',
//       amount: 670,
//       deliveryPartner: 'Ravi Kumar'
//     },
//     {
//       orderId: 'ORD-2024-1006',
//       customerName: 'Kavita Reddy',
//       restaurant: 'Dosa Corner',
//       refundReason: 'Wrong address delivery',
//       status: 'Pending',
//       amount: 180,
//       deliveryPartner: 'Manoj Singh'
//     }
//   ];

//   const getStatusColor = (status) => {
//     switch(status) {
//       case 'Approved': return '#22c55e';
//       case 'Pending': return '#eab308';
//       case 'Processed': return '#3b82f6';
//       case 'Rejected': return '#ef4444';
//       default: return '#6b7280';
//     }
//   };

//   const getStatusBgColor = (status) => {
//     switch(status) {
//       case 'Approved': return darkMode ? 'bg-green-900 bg-opacity-20' : 'bg-green-100';
//       case 'Pending': return darkMode ? 'bg-yellow-900 bg-opacity-20' : 'bg-yellow-100';
//       case 'Processed': return darkMode ? 'bg-blue-900 bg-opacity-20' : 'bg-blue-100';
//       case 'Rejected': return darkMode ? 'bg-red-900 bg-opacity-20' : 'bg-red-100';
//       default: return darkMode ? 'bg-gray-800' : 'bg-gray-100';
//     }
//   };

//   const filteredData = refundData.filter(item => {
//     const matchesSearch = 
//       item.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.restaurant.toLowerCase().includes(searchTerm.toLowerCase());
    
//     const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    
//     return matchesSearch && matchesStatus;
//   });

//   // Pagination calculations
//   const totalPages = Math.ceil(filteredData.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const currentData = filteredData.slice(startIndex, endIndex);

//   // Reset to page 1 when filters change
//   React.useEffect(() => {
//     setCurrentPage(1);
//   }, [searchTerm, statusFilter]);

//   const stats = {
//     total: refundData.length,
//     pending: refundData.filter(r => r.status === 'Pending').length,
//     approved: refundData.filter(r => r.status === 'Approved').length,
//     processed: refundData.filter(r => r.status === 'Processed').length,
//     totalAmount: refundData.reduce((sum, r) => sum + r.amount, 0)
//   };

//   return (
//     <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} p-6`}>
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-6 flex justify-between items-start">
//           <div>
//             <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Fault Attribution Refund System</h1>
//             <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Manage and track customer refund requests</p>
//           </div>
//           <button
//             onClick={() => setDarkMode(!darkMode)}
//             className={`p-3 rounded-lg ${darkMode ? 'bg-gray-800 text-yellow-400' : 'bg-white text-gray-700'} shadow hover:shadow-lg transition-all`}
//           >
//             {darkMode ? <Sun size={20} /> : <Moon size={20} />}
//           </button>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
//           <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg shadow`}>
//             <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Total Requests</div>
//             <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{stats.total}</div>
//           </div>
//           <div className={`${darkMode ? 'bg-yellow-900 bg-opacity-20' : 'bg-yellow-100'} p-4 rounded-lg shadow`}>
//             <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Pending</div>
//             <div className="text-2xl font-bold" style={{ color: '#eab308' }}>{stats.pending}</div>
//           </div>
//           <div className={`${darkMode ? 'bg-green-900 bg-opacity-20' : 'bg-green-100'} p-4 rounded-lg shadow`}>
//             <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Approved</div>
//             <div className="text-2xl font-bold" style={{ color: '#22c55e' }}>{stats.approved}</div>
//           </div>
//           <div className={`${darkMode ? 'bg-blue-900 bg-opacity-20' : 'bg-blue-100'} p-4 rounded-lg shadow`}>
//             <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Processed</div>
//             <div className="text-2xl font-bold" style={{ color: '#3b82f6' }}>{stats.processed}</div>
//           </div>
//           <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg shadow`}>
//             <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Total Amount</div>
//             <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>₹{stats.totalAmount}</div>
//           </div>
//         </div>

//         {/* Filters and Search */}
//         <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg shadow mb-6`}>
//           <div className="flex flex-col md:flex-row gap-4">
//             <div className="flex-1 relative">
//               <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} size={20} />
//               <input
//                 type="text"
//                 placeholder="Search by Order ID, Customer, or Restaurant..."
//                 className={`w-full pl-10 pr-4 py-2 border ${darkMode ? 'border-gray-700 bg-gray-900 text-white placeholder-gray-500' : 'border-gray-300 bg-white text-gray-900'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//             <div className="flex gap-2">
//               <div className="relative">
//                 <Filter className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} size={20} />
//                 <select
//                   className={`pl-10 pr-4 py-2 border ${darkMode ? 'border-gray-700 bg-gray-900 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none`}
//                   value={statusFilter}
//                   onChange={(e) => setStatusFilter(e.target.value)}
//                 >
//                   <option>All</option>
//                   <option>Pending</option>
//                   <option>Approved</option>
//                   <option>Processed</option>
//                   <option>Rejected</option>
//                 </select>
//               </div>
//               <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2">
//                 <Download size={20} />
//                 Export
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Table */}
//         <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow overflow-hidden`}>
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className={`${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-gray-100 border-gray-200'} border-b`}>
//                 <tr>
//                   <th className={`px-6 py-3 text-left text-xs font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} uppercase tracking-wider`}>Order ID</th>
//                   <th className={`px-6 py-3 text-left text-xs font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} uppercase tracking-wider`}>Customer Name</th>
//                   <th className={`px-6 py-3 text-left text-xs font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} uppercase tracking-wider`}>Restaurant</th>
//                   <th className={`px-6 py-3 text-left text-xs font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} uppercase tracking-wider`}>Refund Reason</th>
//                   <th className={`px-6 py-3 text-left text-xs font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} uppercase tracking-wider`}>Status</th>
//                   <th className={`px-6 py-3 text-left text-xs font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} uppercase tracking-wider`}>Amount</th>
//                   <th className={`px-6 py-3 text-left text-xs font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} uppercase tracking-wider`}>Delivery Partner</th>
//                 </tr>
//               </thead>
//               <tbody className={`${darkMode ? 'divide-gray-700' : 'divide-gray-200'} divide-y`}>
//                 {currentData.map((item, index) => (
//                   <tr key={index} className={`${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition-colors`}>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{item.orderId}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>{item.customerName}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>{item.restaurant}</div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{item.refundReason}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span 
//                         className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBgColor(item.status)}`}
//                         style={{ color: getStatusColor(item.status) }}
//                       >
//                         {item.status}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>₹{item.amount}</div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>{item.deliveryPartner}</div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
          
//           {currentData.length === 0 && (
//             <div className={`text-center py-12 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//               No refund requests found matching your criteria
//             </div>
//           )}
//         </div>

//         {/* Pagination */}
//         {filteredData.length > 0 && (
//           <div className={`mt-6 flex items-center justify-between ${darkMode ? 'bg-gray-800' : 'bg-white'} px-6 py-4 rounded-lg shadow`}>
//             <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//               Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} results
//             </div>
            
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                 disabled={currentPage === 1}
//                 className={`px-4 py-2 rounded-lg font-medium transition-colors ${
//                   currentPage === 1
//                     ? `${darkMode ? 'bg-gray-700 text-gray-500' : 'bg-gray-100 text-gray-400'} cursor-not-allowed`
//                     : 'bg-blue-500 text-white hover:bg-blue-600'
//                 }`}
//               >
//                 Previous
//               </button>
              
//               <div className="flex gap-1">
//                 {[...Array(totalPages)].map((_, i) => (
//                   <button
//                     key={i}
//                     onClick={() => setCurrentPage(i + 1)}
//                     className={`w-10 h-10 rounded-lg font-medium transition-colors ${
//                       currentPage === i + 1
//                         ? 'bg-blue-500 text-white'
//                         : `${darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`
//                     }`}
//                   >
//                     {i + 1}
//                   </button>
//                 ))}
//               </div>
              
//               <button
//                 onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//                 disabled={currentPage === totalPages}
//                 className={`px-4 py-2 rounded-lg font-medium transition-colors ${
//                   currentPage === totalPages
//                     ? `${darkMode ? 'bg-gray-700 text-gray-500' : 'bg-gray-100 text-gray-400'} cursor-not-allowed`
//                     : 'bg-blue-500 text-white hover:bg-blue-600'
//                 }`}
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Footer */}
//         <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-4 text-center`}>
//           Showing {filteredData.length} of {refundData.length} refund requests
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RefundManagementTable;

import React, { useState } from 'react';
import { Search, Filter, Download, Moon, Sun } from 'lucide-react';

const RefundManagementTable = ({ darkMode }) => {
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

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} p-6`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex justify-between items-start">
          <div>
            <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Fault Attribution Refund System</h1>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Manage and track customer refund requests</p>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-3 rounded-lg ${darkMode ? 'bg-gray-800 text-yellow-400' : 'bg-white text-gray-700'} shadow hover:shadow-lg transition-all`}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg shadow`}>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Total Requests</div>
            <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{stats.total}</div>
          </div>
          <div className={`${darkMode ? 'bg-yellow-900 bg-opacity-20' : 'bg-yellow-100'} p-4 rounded-lg shadow`}>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Pending</div>
            <div className="text-2xl font-bold" style={{ color: '#eab308' }}>{stats.pending}</div>
          </div>
          <div className={`${darkMode ? 'bg-green-900 bg-opacity-20' : 'bg-green-100'} p-4 rounded-lg shadow`}>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Approved</div>
            <div className="text-2xl font-bold" style={{ color: '#22c55e' }}>{stats.approved}</div>
          </div>
          <div className={`${darkMode ? 'bg-blue-900 bg-opacity-20' : 'bg-blue-100'} p-4 rounded-lg shadow`}>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Processed</div>
            <div className="text-2xl font-bold" style={{ color: '#3b82f6' }}>{stats.processed}</div>
          </div>
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg shadow`}>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Total Amount</div>
            <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>₹{stats.totalAmount}</div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg shadow mb-6`}>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} size={20} />
              <input
                type="text"
                placeholder="Search by Order ID, Customer, or Restaurant..."
                className={`w-full pl-10 pr-4 py-2 border ${darkMode ? 'border-gray-700 bg-gray-900 text-white placeholder-gray-500' : 'border-gray-300 bg-white text-gray-900'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Filter className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} size={20} />
                <select
                  className={`pl-10 pr-4 py-2 border ${darkMode ? 'border-gray-700 bg-gray-900 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none`}
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option>All</option>
                  <option>Pending</option>
                  <option>Approved</option>
                  <option>Processed</option>
                  <option>Rejected</option>
                </select>
              </div>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2">
                <Download size={20} />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow overflow-hidden`}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={`${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-gray-100 border-gray-200'} border-b`}>
                <tr>
                  <th className={`px-6 py-3 text-left text-xs font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} uppercase tracking-wider`}>Order ID</th>
                  <th className={`px-6 py-3 text-left text-xs font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} uppercase tracking-wider`}>Customer Name</th>
                  <th className={`px-6 py-3 text-left text-xs font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} uppercase tracking-wider`}>Restaurant</th>
                  <th className={`px-6 py-3 text-left text-xs font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} uppercase tracking-wider`}>Refund Reason</th>
                  <th className={`px-6 py-3 text-left text-xs font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} uppercase tracking-wider`}>Status</th>
                  <th className={`px-6 py-3 text-left text-xs font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} uppercase tracking-wider`}>Amount</th>
                  <th className={`px-6 py-3 text-left text-xs font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} uppercase tracking-wider`}>Trust Score</th>
                  <th className={`px-6 py-3 text-left text-xs font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} uppercase tracking-wider`}>Risk</th>
                  <th className={`px-6 py-3 text-left text-xs font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} uppercase tracking-wider`}>Delivery Partner</th>
                </tr>
              </thead>
              <tbody className={`${darkMode ? 'divide-gray-700' : 'divide-gray-200'} divide-y`}>
                {currentData.map((item, index) => (
                  <tr key={index} className={`${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition-colors`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{item.orderId}</div>
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
                      <span 
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBgColor(item.status)}`}
                        style={{ color: getStatusColor(item.status) }}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>₹{item.amount}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full transition-all"
                            style={{ 
                              width: `${item.trustScore}%`,
                              backgroundColor: getTrustScoreColor(item.trustScore)
                            }}
                          />
                        </div>
                        <span 
                          className="text-sm font-semibold"
                          style={{ color: getTrustScoreColor(item.trustScore) }}
                        >
                          {item.trustScore}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span 
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getRiskBgColor(item.risk)}`}
                        style={{ color: getRiskColor(item.risk) }}
                      >
                        {item.risk}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>{item.deliveryPartner}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {currentData.length === 0 && (
            <div className={`text-center py-12 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              No refund requests found matching your criteria
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredData.length > 0 && (
          <div className={`mt-6 flex items-center justify-between ${darkMode ? 'bg-gray-800' : 'bg-white'} px-6 py-4 rounded-lg shadow`}>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} results
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentPage === 1
                    ? `${darkMode ? 'bg-gray-700 text-gray-500' : 'bg-gray-100 text-gray-400'} cursor-not-allowed`
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                Previous
              </button>
              
              <div className="flex gap-1">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                      currentPage === i + 1
                        ? 'bg-blue-500 text-white'
                        : `${darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentPage === totalPages
                    ? `${darkMode ? 'bg-gray-700 text-gray-500' : 'bg-gray-100 text-gray-400'} cursor-not-allowed`
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-4 text-center`}>
          Showing {filteredData.length} of {refundData.length} refund requests
        </div>
      </div>
    </div>
  );
};

export default RefundManagementTable;