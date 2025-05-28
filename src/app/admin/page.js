// src/app/admin/page.js
"use client";
import Link from 'next/link';

export default function AdminPanel() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-blue-300 mb-12 drop-shadow-lg">
          Admin Dashboard
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Tests Panel */}
          <div className="bg-gradient-to-br from-blue-900/70 via-black/70 to-pink-900/70 rounded-2xl overflow-hidden shadow-2xl border border-blue-400/30">
            <div className="bg-gradient-to-r from-blue-900 to-black p-6 border-b border-pink-500/30">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-blue-300">
                Test Management
              </h2>
              <p className="text-gray-300 mt-2">Create, update or remove tests</p>
            </div>
            <div className="p-6 space-y-4">
              <Link href="/admin/test/alltest">
                <button className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-medium transition-all transform hover:scale-[1.02] shadow-lg">
                  View All Tests
                </button>
              </Link>
              <Link href="/admin/test/addtest">
                <button className="w-full py-3 px-6 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white rounded-lg font-medium transition-all transform hover:scale-[1.02] shadow-lg">
                  Add New Test
                </button>
              </Link>
              <Link href="/admin/test/removetest">
                <button className="w-full py-3 px-6 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white rounded-lg font-medium transition-all transform hover:scale-[1.02] shadow-lg">
                  Remove Test
                </button>
              </Link>
            </div>
          </div>

          {/* Questions Panel */}
          <div className="bg-gradient-to-br from-blue-900/70 via-black/70 to-pink-900/70 rounded-2xl overflow-hidden shadow-2xl border border-blue-400/30">
            <div className="bg-gradient-to-r from-pink-900 to-black p-6 border-b border-blue-500/30">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-pink-300">
                Question Management
              </h2>
              <p className="text-gray-300 mt-2">Manage test questions</p>
            </div>
            <div className="p-6 space-y-4">
              <Link href="/admin/question/updatequestion">
                <button className="w-full py-3 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all transform hover:scale-[1.02] shadow-lg">
                  Update Question
                </button>
              </Link>
              <Link href="/admin/question/addquestion">
                <button className="w-full py-3 px-6 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white rounded-lg font-medium transition-all transform hover:scale-[1.02] shadow-lg">
                  Add New Question
                </button>
              </Link>
              <Link href="/admin/question/removequestion">
                <button className="w-full py-3 px-6 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white rounded-lg font-medium transition-all transform hover:scale-[1.02] shadow-lg">
                  Remove Question
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats/Quick Actions Section */}
        <div className="mt-12 bg-gradient-to-br from-gray-800/70 to-gray-900/70 rounded-2xl p-6 border border-gray-700/30">
          <h3 className="text-xl font-semibold text-gray-300 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link href="/admin/users" className="bg-gray-700/50 hover:bg-gray-600/50 p-4 rounded-lg transition border border-gray-600/30">
              <h4 className="font-medium text-blue-300">User Management</h4>
              <p className="text-sm text-gray-400 mt-1">View all users</p>
            </Link>
            <Link href="/admin/results" className="bg-gray-700/50 hover:bg-gray-600/50 p-4 rounded-lg transition border border-gray-600/30">
              <h4 className="font-medium text-green-300">Test Results</h4>
              <p className="text-sm text-gray-400 mt-1">View all test results</p>
            </Link>
            <Link href="/admin/settings" className="bg-gray-700/50 hover:bg-gray-600/50 p-4 rounded-lg transition border border-gray-600/30">
              <h4 className="font-medium text-purple-300">System Settings</h4>
              <p className="text-sm text-gray-400 mt-1">Configure platform</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}