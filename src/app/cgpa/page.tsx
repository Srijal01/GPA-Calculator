'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Subject, Semester, calculateCGPA, calculateSGPA, percentageToGrade, percentageToGradePoint } from '@/utils/gpaCalculator';
import { getGPAInterpretation } from '@/utils/gpaInterpretation';

export default function CGPACalculator() {
  const [semesters, setSemesters] = useState<Semester[]>([
    {
      id: '1',
      semesterNumber: 1,
      subjects: [{ id: '1', name: '', creditHours: 3, marks: 0 }],
      sgpa: 0,
      totalCredits: 0,
    },
  ]);
  const [cgpa, setCgpa] = useState<number | null>(null);

  const addSemester = () => {
    const newSemester: Semester = {
      id: Date.now().toString(),
      semesterNumber: semesters.length + 1,
      subjects: [{ id: Date.now().toString(), name: '', creditHours: 3, marks: 0 }],
      sgpa: 0,
      totalCredits: 0,
    };
    setSemesters([...semesters, newSemester]);
  };

  const removeSemester = (id: string) => {
    if (semesters.length > 1) {
      setSemesters(semesters.filter((semester) => semester.id !== id));
    }
  };

  const addSubject = (semesterId: string) => {
    setSemesters(
      semesters.map((semester) =>
        semester.id === semesterId
          ? {
              ...semester,
              subjects: [
                ...semester.subjects,
                {
                  id: Date.now().toString(),
                  name: '',
                  creditHours: 3,
                  marks: 0,
                },
              ],
            }
          : semester
      )
    );
  };

  const removeSubject = (semesterId: string, subjectId: string) => {
    setSemesters(
      semesters.map((semester) =>
        semester.id === semesterId && semester.subjects.length > 1
          ? {
              ...semester,
              subjects: semester.subjects.filter((subject) => subject.id !== subjectId),
            }
          : semester
      )
    );
  };

  const updateSubject = (
    semesterId: string,
    subjectId: string,
    field: keyof Subject,
    value: string | number
  ) => {
    setSemesters(
      semesters.map((semester) =>
        semester.id === semesterId
          ? {
              ...semester,
              subjects: semester.subjects.map((subject) =>
                subject.id === subjectId ? { ...subject, [field]: value } : subject
              ),
            }
          : semester
      )
    );
  };

  const calculate = () => {
    // First, calculate SGPA for each semester
    const updatedSemesters = semesters.map((semester) => {
      const totalCredits = semester.subjects.reduce((sum, s) => sum + s.creditHours, 0);
      const sgpa = calculateSGPA(semester.subjects);
      
      return {
        ...semester,
        sgpa: sgpa,
        totalCredits: totalCredits,
      };
    });
    
    setSemesters(updatedSemesters);
    
    // Then calculate CGPA using the SGPA values
    const result = calculateCGPA(updatedSemesters);
    setCgpa(result);
  };

  const reset = () => {
    setSemesters([
      {
        id: '1',
        semesterNumber: 1,
        subjects: [{ id: '1', name: '', creditHours: 3, marks: 0 }],
        sgpa: 0,
        totalCredits: 0,
      },
    ]);
    setCgpa(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <Link href="/" className="text-green-600 dark:text-green-400 hover:underline">
            ← Back to Home
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 md:p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            CGPA Calculator
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Calculate your Cumulative Grade Point Average across all semesters
          </p>

          <div className="space-y-6">
            {semesters.map((semester, semIndex) => (
              <div
                key={semester.id}
                className="border-2 border-gray-200 dark:border-gray-700 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Semester {semester.semesterNumber}
                  </h2>
                  {semesters.length > 1 && (
                    <button
                      onClick={() => removeSemester(semester.id)}
                      className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 font-semibold"
                    >
                      Remove Semester
                    </button>
                  )}
                </div>

                <div className="space-y-3">
                  {semester.subjects.map((subject, subIndex) => (
                    <div
                      key={subject.id}
                      className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Subject {subIndex + 1}
                        </span>
                        {semester.subjects.length > 1 && (
                          <button
                            onClick={() => removeSubject(semester.id, subject.id)}
                            className="text-red-600 hover:text-red-800 dark:text-red-400 text-sm"
                          >
                            Remove
                          </button>
                        )}
                      </div>

                      <div className="grid md:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Subject Name
                          </label>
                          <input
                            type="text"
                            value={subject.name}
                            onChange={(e) =>
                              updateSubject(semester.id, subject.id, 'name', e.target.value)
                            }
                            placeholder="e.g., Physics"
                            aria-label="Subject Name"
                            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Credit Hours
                          </label>
                          <input
                            type="number"
                            value={subject.creditHours}
                            onChange={(e) =>
                              updateSubject(
                                semester.id,
                                subject.id,
                                'creditHours',
                                parseInt(e.target.value) || 0
                              )
                            }
                            min="1"
                            max="10"
                            aria-label="Credit Hours"
                            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Marks (%)
                          </label>
                          <input
                            type="number"
                            value={subject.marks}
                            onChange={(e) =>
                              updateSubject(
                                semester.id,
                                subject.id,
                                'marks',
                                parseFloat(e.target.value) || 0
                              )
                            }
                            min="0"
                            max="100"
                            step="0.01"
                            aria-label="Marks Percentage"
                            placeholder="0-100"
                            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-white"
                          />
                          {subject.marks > 0 && (
                            <p className="text-xs mt-1 text-gray-600 dark:text-gray-400">
                              {percentageToGrade(subject.marks)} ({percentageToGradePoint(subject.marks).toFixed(1)})
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => addSubject(semester.id)}
                  className="mt-3 w-full md:w-auto px-4 py-2 text-sm bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  + Add Subject
                </button>

                {semester.sgpa > 0 && (
                  <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <span className="font-semibold">SGPA:</span>{' '}
                      <span className="text-blue-600 dark:text-blue-400 font-bold">
                        {semester.sgpa.toFixed(2)}
                      </span>
                      {' | '}
                      <span className="font-semibold">Credits:</span> {semester.totalCredits}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={addSemester}
            className="mt-6 w-full md:w-auto px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            + Add Semester
          </button>

          <div className="mt-6 flex gap-4">
            <button
              onClick={calculate}
              className="flex-1 px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-semibold"
            >
              Calculate CGPA
            </button>
            <button
              onClick={reset}
              className="px-6 py-3 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors font-semibold"
            >
              Reset
            </button>
          </div>

          {cgpa !== null && (
            <div className="mt-6 p-6 bg-green-50 dark:bg-green-900/20 border-2 border-green-500 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Your CGPA
              </h2>
              <p className="text-4xl font-bold text-green-600 dark:text-green-400">
                {cgpa.toFixed(2)}
              </p>
              {(() => {
                const interpretation = getGPAInterpretation(cgpa);
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
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Semester-wise Breakdown:
                </p>
                <div className="space-y-1">
                  {semesters.map((sem) => (
                    <div key={sem.id} className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                      <span>Semester {sem.semesterNumber}:</span>
                      <span>SGPA {sem.sgpa.toFixed(2)} ({sem.totalCredits} credits)</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-2 font-semibold">
                  Total Credits: {semesters.reduce((sum, sem) => sum + sem.totalCredits, 0)}
                </p>
              </div>
              
              <div className="mt-3 p-2 bg-blue-50 dark:bg-blue-900/20 rounded text-xs text-gray-600 dark:text-gray-400">
                <strong>Formula:</strong> CGPA = Σ(SGPA × Semester Credits) / Σ(Total Credits)
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
