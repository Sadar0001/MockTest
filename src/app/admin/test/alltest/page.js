'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AnimatedBackground from '../../../../components/AnimatedBackground';
import TestCard from '../../../../components/TestCard';

export default function AllTestPage() {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const res = await fetch('/api/test');
        const data = await res.json();
        setTests(data.tests || []);
      } catch (error) {
        console.error('Error fetching tests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, []);

  if (loading) {
    return (
      <AnimatedBackground variant="centent">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-white text-xl">Loading tests...</div>
        </div>
      </AnimatedBackground>
    );
  }

  return (
    <AnimatedBackground variant="centent">
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-white mb-12 drop-shadow-lg">
            Available Tests
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {tests.map((test) => (
              <div
                key={test._id}
                className="flex justify-center z-20 cursor-pointer"
                onClick={() => router.push(`/admin/test/${encodeURIComponent(test.title)}`)}
              >
                <TestCard test={test} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedBackground>
  );
}
