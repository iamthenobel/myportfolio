
import React, { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL?.replace(/['"]+/g, "") || "";
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD?.replace(/['"]+/g, "") || "";

const Messages = () => {
  const [showModal, setShowModal] = useState(true);
  const [inputPassword, setInputPassword] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthorized) {
      setIsLoading(true);
      fetch(`${API_URL.replace(/\/$/, "")}/api/messages`)
        .then((res) => res.json())
        .then((data) => {
          setMessages(data);
          setIsLoading(false);
        })
        .catch(() => {
          setError("Failed to fetch messages.");
          setIsLoading(false);
        });
    }
  }, [isAuthorized]);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (inputPassword === ADMIN_PASSWORD) {
      setIsAuthorized(true);
      setShowModal(false);
      setError("");
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl border border-gray-200 p-6 w-full max-w-sm shadow-xl">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-gray-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">Admin Authentication</h2>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <input
                  type="password"
                  className="w-full px-4 py-3 text-gray-700 border border-gray-300 rounded-lg focus:ring-1 focus:ring-gray-800 focus:border-gray-800 transition-all"
                  placeholder="Enter admin password"
                  value={inputPassword}
                  onChange={(e) => setInputPassword(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 active:bg-gray-700 transition-all font-medium"
              >
                Access Messages Dashboard
              </button>
              {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
            </form>
          </div>
        </div>
      )}
      
      {isAuthorized && (
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Contact Messages</h1>
              <p className="text-gray-500 text-sm">View and manage all incoming messages</p>
            </div>
            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
              {messages.length} {messages.length === 1 ? 'message' : 'messages'}
            </span>
          </div>

          {isLoading ? (
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-800 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading messages...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
              <svg className="w-10 h-10 text-red-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p className="mt-3 text-red-600 font-medium">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                Try Again
              </button>
            </div>
          ) : messages.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
              <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <h3 className="mt-3 text-lg font-medium text-gray-900">No messages yet</h3>
              <p className="mt-1 text-gray-500">All incoming contact messages will appear here</p>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Message
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {messages.map((msg) => (
                      <tr key={msg.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{msg.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{msg.email}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-700 line-clamp-2 max-w-xs">{msg.message}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{formatDate(msg.created_at)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <a
                              href={`mailto:${msg.email}`}
                              className="text-blue-600 hover:text-blue-900 flex items-center"
                              title="Reply"
                            >
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                              Reply
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Messages;