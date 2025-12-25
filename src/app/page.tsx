import Link from 'next/link';
import { gpaInterpretations } from '@/utils/gpaInterpretation';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Nepali University GPA Calculator
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Calculate your SGPA and CGPA based on Nepali university grading system
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Link href="/sgpa" className="block group">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-500 rounded-lg mb-4 mx-auto group-hover:bg-blue-600 transition-colors">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-center text-gray-900 dark:text-white mb-2">
                SGPA Calculator
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Calculate Semester Grade Point Average for a single semester
              </p>
            </div>
          </Link>

          <Link href="/cgpa" className="block group">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-center w-16 h-16 bg-green-500 rounded-lg mb-4 mx-auto group-hover:bg-green-600 transition-colors">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-center text-gray-900 dark:text-white mb-2">
                CGPA Calculator
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Calculate Cumulative Grade Point Average across multiple semesters
              </p>
            </div>
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Nepali University Grading System (TU / PU / KU)
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-2 text-gray-900 dark:text-white font-semibold">Percentage (%)</th>
                  <th className="px-4 py-2 text-gray-900 dark:text-white font-semibold">Grade</th>
                  <th className="px-4 py-2 text-gray-900 dark:text-white font-semibold">Grade Point</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { range: '90 – 100', grade: 'A+', point: '4.0' },
                  { range: '80 – <90', grade: 'A', point: '3.6' },
                  { range: '70 – <80', grade: 'B+', point: '3.2' },
                  { range: '60 – <70', grade: 'B', point: '2.8' },
                  { range: '50 – <60', grade: 'C+', point: '2.4' },
                  { range: '40 – <50', grade: 'C', point: '2.0' },
                  { range: '< 40', grade: 'F', point: '0.0', fail: true },
                ].map((item) => (
                  <tr key={item.grade} className={`border-b dark:border-gray-700 ${item.fail ? 'bg-red-50 dark:bg-red-900/20' : ''}`}>
                    <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{item.range}</td>
                    <td className="px-4 py-2 font-bold text-gray-900 dark:text-white">{item.grade}</td>
                    <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{item.point}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-red-600 dark:text-red-400 mt-3 font-semibold">
            * Below 40% = Fail (F)
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mt-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            GPA Score Interpretation
          </h3>
          <div className="space-y-3">
            {gpaInterpretations.map((interp) => (
              <div
                key={interp.label}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div className="flex-1">
                  <h4 className={`text-lg font-bold ${interp.color}`}>
                    {interp.label}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {interp.description}
                  </p>
                </div>
                <div className="text-right ml-4">
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    {interp.minGPA.toFixed(1)} - {interp.maxGPA.toFixed(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
