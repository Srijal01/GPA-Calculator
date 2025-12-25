// GPA Score Interpretation for Nepali Universities (TU, PU, KU)
export interface GPAInterpretation {
  label: string;
  description: string;
  minGPA: number;
  maxGPA: number;
  color: string;
}

export const gpaInterpretations: GPAInterpretation[] = [
  {
    label: 'Distinction',
    description: 'Outstanding Performance',
    minGPA: 3.6,
    maxGPA: 4.0,
    color: 'text-green-600 dark:text-green-400',
  },
  {
    label: 'First Division',
    description: 'Excellent Performance',
    minGPA: 3.0,
    maxGPA: 3.59,
    color: 'text-blue-600 dark:text-blue-400',
  },
  {
    label: 'Second Division',
    description: 'Good Performance',
    minGPA: 2.0,
    maxGPA: 2.99,
    color: 'text-yellow-600 dark:text-yellow-400',
  },
  {
    label: 'Fail',
    description: 'Below Passing Grade',
    minGPA: 0.0,
    maxGPA: 1.99,
    color: 'text-red-600 dark:text-red-400',
  },
];

export function getGPAInterpretation(gpa: number): GPAInterpretation | null {
  return gpaInterpretations.find(
    (interp) => gpa >= interp.minGPA && gpa <= interp.maxGPA
  ) || null;
}
