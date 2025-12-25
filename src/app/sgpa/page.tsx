'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Subject, calculateSGPA, percentageToGrade, percentageToGradePoint } from '@/utils/gpaCalculator';
import { getGPAInterpretation } from '@/utils/gpaInterpretation';

export default function SGPACalculator() {
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: '1', name: '', creditHours: 3, marks: 0 },
  ]);
  const [sgpa, setSgpa] = useState<number | null>(null);

  const addSubject = () => {
    const newSubject: Subject = {
      id: Date.now().toString(),
      name: '',
      creditHours: 3,
      marks: 0,
    };
    setSubjects([...subjects, newSubject]);
  };

  const removeSubject = (id: string) => {
    if (subjects.length > 1) {
      setSubjects(subjects.filter((subject) => subject.id !== id));
    }
  };

  const updateSubject = (id: string, field: keyof Subject, value: string | number) => {
    setSubjects(
      subjects.map((subject) =>
        subject.id === id ? { ...subject, [field]: value } : subject
      )
    );
  };

  const calculate = () => {
    const result = calculateSGPA(subjects);
    setSgpa(result);
  };

  const reset = () => {
    setSubjects([{ id: '1', name: '', creditHours: 3, marks: 0 }]);
    setSgpa(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline">
            ← Back to Home
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 md:p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            SGPA Calculator
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Calculate your Semester Grade Point Average
          </p>

          <div className="space-y-4">
            {subjects.map((subject, index) => (
              <div
                key={subject.id}
                className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-3"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Subject {index + 1}
                  </h3>
                  {subjects.length > 1 && (
                    <button
                      onClick={() => removeSubject(subject.id)}
                      className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="grid md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Subject Name
                    </label>
                    <input
                      type="text"
                      value={subject.name}
                      onChange={(e) => updateSubject(subject.id, 'name', e.target.value)}
                      placeholder="e.g., Mathematics"
                      aria-label="Subject Name"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Credit Hours
                    </label>
                    <input
                      type="number"
                      value={subject.creditHours}
                      onChange={(e) =>
                        updateSubject(subject.id, 'creditHours', parseInt(e.target.value) || 0)
                      }
                      min="1"
                      max="10"
                      aria-label="Credit Hours"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Marks (%)
                    </label>
                    <input
                      type="number"
                      value={subject.marks}
                      onChange={(e) =>
                        updateSubject(subject.id, 'marks', parseFloat(e.target.value) || 0)
                      }
                      min="0"
                      max="100"
                      step="0.01"
                      aria-label="Marks Percentage"
                      placeholder="0-100"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                    />
                    {subject.marks > 0 && (
                      <p className="text-xs mt-1 text-gray-600 dark:text-gray-400">
                        Grade: {percentageToGrade(subject.marks)} ({percentageToGradePoint(subject.marks).toFixed(1)} GP)
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={addSubject}
            className="mt-4 w-full md:w-auto px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            + Add Subject
          </button>

          <div className="mt-6 flex gap-4">
            <button
              onClick={calculate}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-semibold"
            >
              Calculate SGPA
            </button>
            <button
              onClick={reset}
              className="px-6 py-3 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors font-semibold"
            >
              Reset
            </button>
          </div>

          {sgpa !== null && (
            <div className="mt-6 p-6 bg-green-50 dark:bg-green-900/20 border-2 border-green-500 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Your SGPA
              </h2>
              <p className="text-4xl font-bold text-green-600 dark:text-green-400">
                {sgpa.toFixed(2)}
              </p>
              {(() => {
                const interpretation = getGPAInterpretation(sgpa);
                return interpretation ? (
                  <div className="mt-3 pt-3 border-t border-green-300 dark:border-green-700">
                    <p className={`text-lg font-semibold ${interpretation.color}`}>
                      {interpretation.label}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {interpretation.description}
                    </p>
                  </div>
                ) : null;
              })()}
              
              <div className="mt-4 pt-3 border-t border-green-300 dark:border-green-700">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>Total Credits:</strong> {subjects.reduce((sum, s) => sum + s.creditHours, 0)}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                  <strong>Total Subjects:</strong> {subjects.length}
                </p>
              </div>
              
              <div className="mt-3 p-2 bg-blue-50 dark:bg-blue-900/20 rounded text-xs text-gray-600 dark:text-gray-400">
                <strong>Formula:</strong> SGPA = Σ(Grade Point × Credit Hours) / Σ(Credit Hours)
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
