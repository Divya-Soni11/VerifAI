'use client';
import React, { useState } from 'react';
import { AlertCircle, Send, CheckCircle, Upload, X, Image } from 'lucide-react';

export default function ComplaintForm({ initialDarkMode = true }) {
  const [darkMode, setDarkMode] = useState(initialDarkMode);
  const [formData, setFormData] = useState({
    customerID: '',
    restaurantID:'',
    agentID:'',
    refundReason: '',
    description: '',
    photos: []
  });
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState('');

  const issues = [
    { value: 'wrongItem', label: 'Wrong Item Delivered', color: '#ef4444' },
    { value: 'damaged_spoiled', label: 'Damaged/spoiled Product', color: '#f59e0b' },
    { value: 'misconduct', label: 'delivery agent\'s misconduct', color: '#3b82f6' },
    { value: 'late', label: 'Late Delivery', color: '#8b5cf6' },
    { value: 'other', label: 'Other Issue', color: '#eab308' }
  ];

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    const newPhotos = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      name: file.name
    }));
    setFormData({ ...formData, photos: [...formData.photos, ...newPhotos] });
  };

  const removePhoto = (index) => {
    const newPhotos = formData.photos.filter((_, i) => i !== index);
    setFormData({ ...formData, photos: newPhotos });
  };

  const handleSubmit = async () => {
    if (formData.orderNumber && formData.issue && formData.description) {
      // Prepare data for MongoDB
      const complaintData = {
        customerID: formData.customerID,
        restaurantID:formData.restaurantID,
        agentID:formData.agentID,
        issue: formData.issue,
        description: formData.description,
        photos: formData.photos.map(p => p.name), // Store photo names/URLs
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      // Log the data structure for MongoDB
      console.log('MongoDB Document Structure:', complaintData);

      setSubmitted(true);
      setTimeout(() => {
        setFormData({ orderNumber: '', issue: '', description: '', photos: [] });
        setSubmitted(false);
      }, 3000);
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-800' : 'bg-white'} transition-all duration-500`}>
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        .fade-in-up {
          animation: fadeInUp 0.6s ease-out;
        }

        .slide-in-right {
          animation: slideInRight 0.5s ease-out;
        }

        .scale-in {
          animation: scaleIn 0.4s ease-out;
        }

        .pulse-animate {
          animation: pulse 2s infinite;
        }

        .shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          background-size: 1000px 100%;
          animation: shimmer 2s infinite;
        }

        .hover-lift {
          transition: all 0.3s ease;
        }

        .hover-lift:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2);
        }

        .issue-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .issue-card:hover {
          transform: translateX(4px);
        }

        .input-focus {
          transition: all 0.3s ease;
        }

        .input-focus:focus {
          transform: scale(1.01);
        }

        @keyframes checkmark {
          0% {
            transform: scale(0) rotate(0deg);
          }
          50% {
            transform: scale(1.2) rotate(180deg);
          }
          100% {
            transform: scale(1) rotate(360deg);
          }
        }

        .checkmark-animate {
          animation: checkmark 0.5s ease-out;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .float-animate {
          animation: float 3s ease-in-out infinite;
        }

        .photo-preview {
          transition: all 0.3s ease;
        }

        .photo-preview:hover {
          transform: scale(1.05);
        }
      `}</style>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 fade-in-up">
          <div>
            <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>
              File a Complaint
            </h1>
            <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'} transition-colors duration-300`}>
              Tell us what happened with your order
            </p>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`px-4 py-2 rounded-lg hover-lift ${
              darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'
            } transition-all duration-300`}
          >
            <span className="inline-block transition-transform duration-500" style={{
              transform: darkMode ? 'rotate(180deg)' : 'rotate(0deg)'
            }}>
              {darkMode ? '☀️' : '🌙'}
            </span>
          </button>
        </div>

        {/* Success Message */}
        {submitted && (
          <div className={`mb-6 p-4 rounded-lg scale-in ${
            darkMode ? 'bg-green-900 bg-opacity-20' : 'bg-green-50'
          } border-l-4 border-green-500`}>
            <div className="flex items-center">
              <div className="checkmark-animate">
                <CheckCircle className="text-green-500 mr-3" size={24} />
              </div>
              <div>
                <h3 className={`font-semibold ${darkMode ? 'text-green-400' : 'text-green-800'}`}>
                  Complaint Submitted Successfully
                </h3>
                <p className={`text-sm ${darkMode ? 'text-green-300' : 'text-green-700'}`}>
                  We'll review your complaint and get back to you soon.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Form Container */}
        <div className={`${
          darkMode ? 'bg-gray-700' : 'bg-gray-50'
        } rounded-lg p-6 shadow-lg hover-lift transition-all duration-500`} style={{
          animation: 'fadeInUp 0.8s ease-out'
        }}>
          {/* customerID */}
          <div className="mb-6 slide-in-right" style={{ animationDelay: '0.1s' }}>
            <label 
              htmlFor="customerID"
              className={`block text-sm font-medium mb-2 ${
                darkMode ? 'text-gray-200' : 'text-gray-700'
              } transition-colors duration-300`}
            >
              Customer ID
            </label>
            <div className="relative">
              <input
                type="text"
                id="customerID"
                value={formData.orderNumber}
                onChange={(e) => setFormData({ ...formData, customerID: e.target.value })}
                onFocus={() => setFocusedField('customerID')}
                onBlur={() => setFocusedField('')}
                placeholder="e.g., C-0056"
                className={`w-full px-4 py-3 rounded-lg border input-focus ${
                  darkMode 
                    ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
              />
              {focusedField === 'customerID' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 shimmer" />
              )}
            </div>
          </div>

          <div className="mb-6 slide-in-right" style={{ animationDelay: '0.1s' }}>
            <label 
              htmlFor="restaurantID"
              className={`block text-sm font-medium mb-2 ${
                darkMode ? 'text-gray-200' : 'text-gray-700'
              } transition-colors duration-300`}
            >
              Restaurant ID
            </label>
            <div className="relative">
              <input
                type="text"
                id="restaurantID"
                value={formData.orderNumber}
                onChange={(e) => setFormData({ ...formData, restaurantID: e.target.value })}
                onFocus={() => setFocusedField('restaurantID')}
                onBlur={() => setFocusedField('')}
                placeholder="e.g., R-0157"
                className={`w-full px-4 py-3 rounded-lg border input-focus ${
                  darkMode 
                    ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
              />
              {focusedField === 'restaurantID' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 shimmer" />
              )}
            </div>
          </div>

          <div className="mb-6 slide-in-right" style={{ animationDelay: '0.1s' }}>
            <label 
              htmlFor="agentID"
              className={`block text-sm font-medium mb-2 ${
                darkMode ? 'text-gray-200' : 'text-gray-700'
              } transition-colors duration-300`}
            >
              Agent ID
            </label>
            <div className="relative">
              <input
                type="text"
                id="agentID"
                value={formData.orderNumber}
                onChange={(e) => setFormData({ ...formData, agentID: e.target.value })}
                onFocus={() => setFocusedField('agentID')}
                onBlur={() => setFocusedField('')}
                placeholder="e.g., A-0004"
                className={`w-full px-4 py-3 rounded-lg border input-focus ${
                  darkMode 
                    ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
              />
              {focusedField === 'agentID' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 shimmer" />
              )}
            </div>
          </div>

          {/* Issue Type */}
          <div className="mb-6 slide-in-right" style={{ animationDelay: '0.2s' }}>
            <label 
              className={`block text-sm font-medium mb-2 ${
                darkMode ? 'text-gray-200' : 'text-gray-700'
              } transition-colors duration-300`}
            >
              What happened?
            </label>
            <div className="space-y-2">
              {issues.map((issue, idx) => (
                <label
                  key={issue.value}
                  className={`flex items-center p-4 rounded-lg border-2 cursor-pointer issue-card ${
                    formData.issue === issue.value
                      ? `${darkMode ? 'bg-gray-600' : 'bg-white'}`
                      : `${darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-white'} hover:border-gray-400`
                  }`}
                  style={{
                    borderColor: formData.issue === issue.value ? issue.color : undefined,
                    animationDelay: `${0.3 + idx * 0.1}s`
                  }}
                >
                  <input
                    type="radio"
                    value={issue.value}
                    checked={formData.issue === issue.value}
                    onChange={(e) => setFormData({ ...formData, issue: e.target.value })}
                    className="w-4 h-4 mr-3 transition-transform duration-200"
                    style={{ accentColor: issue.color }}
                  />
                  <span className={`flex-1 ${darkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>
                    {issue.label}
                  </span>
                  {formData.issue === issue.value && (
                    <div 
                      className="w-3 h-3 rounded-full pulse-animate"
                      style={{ backgroundColor: issue.color }}
                    />
                  )}
                </label>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="mb-6 slide-in-right" style={{ animationDelay: '0.8s' }}>
            <label 
              htmlFor="description"
              className={`block text-sm font-medium mb-2 ${
                darkMode ? 'text-gray-200' : 'text-gray-700'
              } transition-colors duration-300`}
            >
              Please describe what happened
            </label>
            <div className="relative">
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                onFocus={() => setFocusedField('description')}
                onBlur={() => setFocusedField('')}
                placeholder="Tell us more about the issue you experienced..."
                rows={5}
                className={`w-full px-4 py-3 rounded-lg border input-focus ${
                  darkMode 
                    ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                } focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-all duration-300`}
              />
              {focusedField === 'description' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 shimmer" />
              )}
            </div>
          </div>

          {/* Photo Upload */}
          <div className="mb-6 slide-in-right" style={{ animationDelay: '0.9s' }}>
            <label 
              className={`block text-sm font-medium mb-2 ${
                darkMode ? 'text-gray-200' : 'text-gray-700'
              } transition-colors duration-300`}
            >
              Add Photos (Optional)
            </label>
            
            <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-300 ${
              darkMode 
                ? 'bg-gray-600 border-gray-500 hover:bg-gray-550 hover:border-gray-400' 
                : 'bg-white border-gray-300 hover:bg-gray-50 hover:border-gray-400'
            }`}>
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className={`mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} size={32} />
                <p className={`mb-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  PNG, JPG or JPEG (MAX. 5MB each)
                </p>
              </div>
              <input 
                type="file" 
                className="hidden" 
                accept="image/*" 
                multiple 
                onChange={handlePhotoUpload}
              />
            </label>

            {/* Photo Previews */}
            {formData.photos.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-3">
                {formData.photos.map((photo, index) => (
                  <div key={index} className="relative group photo-preview">
                    <img 
                      src={photo.preview} 
                      alt={`Preview ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => removePhoto(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Info Box */}
          <div className={`mb-6 p-4 rounded-lg slide-in-right ${
            darkMode ? 'bg-blue-900 bg-opacity-20' : 'bg-blue-50'
          } border-l-4 border-blue-500 transition-all duration-300`} style={{ animationDelay: '1s' }}>
            <div className="flex">
              <div className="float-animate">
                <AlertCircle className="text-blue-500 mr-3 flex-shrink-0 mt-0.5" size={20} />
              </div>
              <p className={`text-sm ${darkMode ? 'text-blue-300' : 'text-blue-700'} transition-colors duration-300`}>
                We'll review your complaint within 24-48 hours and contact you with next steps.
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={submitted || !formData.orderNumber || !formData.issue || !formData.description}
            className={`w-full py-3 px-4 rounded-lg font-semibold flex items-center justify-center transition-all duration-300 slide-in-right ${
              submitted || !formData.orderNumber || !formData.issue || !formData.description
                ? 'bg-gray-400 cursor-not-allowed text-white' 
                : 'bg-blue-500 hover:bg-blue-600 text-white hover:shadow-lg transform hover:scale-105'
            }`}
            style={{ animationDelay: '1.1s' }}
          >
            <Send size={20} className="mr-2 transition-transform duration-300" style={{
              transform: submitted ? 'translateX(100px)' : 'translateX(0)'
            }} />
            {submitted ? 'Submitted' : 'Submit Complaint'}
          </button>
        </div>
      </div>
    </div>
      

      
    
  );
}