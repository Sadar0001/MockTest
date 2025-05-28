// src/app/admin/test/removetest.js
"use client";
import { useState, useEffect } from 'react';

export default function RemoveTestPage() {
  const [tests, setTests] = useState([]);

  useEffect(() => {
    fetch('/api/test')
      .then(res => res.json())
      .then(data => setTests(data.tests));
  }, []);

  const handleDelete = async (id) => {
    const res = await fetch(`/api/test`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    const result = await res.json();
    alert(result.message);
    setTests(tests.filter(t => t._id !== id));
  };

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Remove Test</h1>
      <ul className="space-y-4">
        {tests.map(test => (
          <li key={test._id} className="p-4 border rounded flex justify-between items-center">
            <span>{test.title}</span>
            <button onClick={() => handleDelete(test._id)} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}