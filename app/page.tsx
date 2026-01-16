'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

type LoginMode = 'user' | 'admin';
type MessageType = 'success' | 'error' | null;

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<LoginMode>('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<{ text: string; type: MessageType }>({ text: '', type: null });
  const [iconKey, setIconKey] = useState(0);

  const switchMode = (newMode: LoginMode) => {
    setMode(newMode);
    setIconKey(prev => prev + 1);
    setMessage({ text: '', type: null });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email && password) {
      showMessage(`Successfully logged in as ${mode}!`, 'success');
      
      // Redirect after a short delay to show the success message
      setTimeout(() => {
        if (mode === 'admin') {
          router.push('./Login/adminLogin');
        } else {
          router.push('./Login/userLogin');
        }
      }, 1500);
    }
  };

  const showMessage = (text: string, type: MessageType) => {
    setMessage({ text, type });
    setTimeout(() => {
      setMessage({ text: '', type: null });
    }, 3000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-5 bg-gradient-to-br from-gray-900 via-slate-900 to-black">
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .container {
          animation: slideIn 0.5s ease-out;
        }

        .icon {
          animation: bounce 0.6s ease;
        }

        .message {
          animation: slideDown 0.3s ease;
        }

        .input-focus:focus {
          transform: translateY(-2px);
        }

        .btn-hover:hover {
          transform: translateY(-2px);
        }

        .btn-hover:active {
          transform: translateY(0);
        }

        .btn-hover::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.15);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }

        .btn-hover:hover::before {
          width: 300px;
          height: 300px;
        }

        .slider {
          transition: transform 0.3s ease;
        }
      `}</style>

      <div className="container bg-gray-900 border border-gray-800 rounded-3xl shadow-2xl shadow-black/50 overflow-hidden w-full max-w-md">
        <div className="flex bg-gray-800/50 relative">
          <div 
            className={`slider absolute top-0 left-0 w-1/2 h-full bg-gradient-to-br from-indigo-600 to-purple-600 ${
              mode === 'admin' ? 'translate-x-full' : ''
            }`}
          />
          <button
            onClick={() => switchMode('user')}
            className={`flex-1 py-5 text-center font-semibold transition-all z-10 ${
              mode === 'user' ? 'text-white' : 'text-gray-400'
            }`}
          >
            User Login
          </button>
          <button
            onClick={() => switchMode('admin')}
            className={`flex-1 py-5 text-center font-semibold transition-all z-10 ${
              mode === 'admin' ? 'text-white' : 'text-gray-400'
            }`}
          >
            Admin Login
          </button>
        </div>

        <div className="p-10">
          <div className="text-center mb-8">
            <div 
              key={iconKey}
              className="icon inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full text-4xl text-white shadow-lg shadow-indigo-500/50"
            >
              {mode === 'user' ? '👤' : '🔐'}
            </div>
          </div>

          <h2 className="text-3xl font-bold text-center text-white mb-8">
            {mode === 'user' ? 'User Login' : 'Admin Login'}
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="email" className="block mb-2 text-gray-300 font-medium text-sm">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className="input-focus w-full px-4 py-3 bg-gray-800 border-2 border-gray-700 text-white placeholder-gray-500 rounded-xl text-base transition-all outline-none focus:border-indigo-500 focus:shadow-lg focus:shadow-indigo-500/20"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block mb-2 text-gray-300 font-medium text-sm">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className="input-focus w-full px-4 py-3 bg-gray-800 border-2 border-gray-700 text-white placeholder-gray-500 rounded-xl text-base transition-all outline-none focus:border-indigo-500 focus:shadow-lg focus:shadow-indigo-500/20"
              />
            </div>

            <div className="text-right mb-6">
              <button
                type="button"
                onClick={() => showMessage('Password reset link sent!', 'success')}
                className="text-indigo-400 text-sm hover:text-indigo-300 transition-colors"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              className="btn-hover relative overflow-hidden w-full py-4 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-xl text-base font-semibold transition-all shadow-lg shadow-indigo-600/30 hover:shadow-xl hover:shadow-indigo-600/40"
            >
              <span className="relative z-10">Login</span>
            </button>

            {message.text && (
              <div className={`message mt-5 p-4 rounded-xl text-center font-medium ${
                message.type === 'success' 
                  ? 'bg-green-900/50 text-green-300 border border-green-700' 
                  : 'bg-red-900/50 text-red-300 border border-red-700'
              }`}>
                {message.text}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}