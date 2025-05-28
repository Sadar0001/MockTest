// src/components/TestCard.js
'use client';
import Link from 'next/link';

export default function TestCard({ test }) {
  if (!test || !test._id) {
    return null; // or return a skeleton loader
  }

  const categoryColors = {
    math: 'bg-blue-100 text-blue-800',
    science: 'bg-green-100 text-green-800',
    history: 'bg-amber-100 text-amber-800',
    language: 'bg-purple-100 text-purple-800'
  };

  return (
    <Link href={`/admin/test/${test._id}`} className="w-full">
      <div className="bg-white rounded-xl shadow-md overflow-hidden w-full transform transition-all hover:scale-[1.02] hover:shadow-lg cursor-pointer group">
        <div className="p-6">
          <div className="flex justify-between items-start mb-3">
            <h2 className="text-xl font-bold text-gray-800 line-clamp-2">{test.title}</h2>
            <span className={`${categoryColors[test.category] || 'bg-gray-100 text-gray-800'} text-xs font-semibold px-2.5 py-0.5 rounded-full ml-2 whitespace-nowrap`}>
              {test.category}
            </span>
          </div>
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">{test.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-gray-500 text-sm">{test.duration} mins</span>
            <span className="text-lg font-bold text-gray-900">${test.price}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}