// Nepali University Grading System (TU, PU, KU)
// Step-by-Step SGPA/CGPA Logic Implementation

// Step 1: Percentage to Grade Point conversion
// Follows official Nepal university grading scale
export function percentageToGradePoint(marks: number): number {
  if (marks >= 90) return 4.0;  // A+
  if (marks >= 80) return 3.6;  // A
  if (marks >= 70) return 3.2;  // B+
  if (marks >= 60) return 2.8;  // B
  if (marks >= 50) return 2.4;  // C+
  if (marks >= 40) return 2.0;  // C
  return 0.0; // F - Below 40% = Fail (Credit still counted)
}

// Step 2: Convert marks to grade letter
export function percentageToGrade(marks: number): string {
  if (marks >= 90) return 'A+';
  if (marks >= 80) return 'A';
  if (marks >= 70) return 'B+';
  if (marks >= 60) return 'B';
  if (marks >= 50) return 'C+';
  if (marks >= 40) return 'C';
  return 'F'; // Fail
}

export const gradePoints: { [key: string]: number } = {
  'A+': 4.0,
  'A': 3.6,
  'B+': 3.2,
  'B': 2.8,
  'C+': 2.4,
  'C': 2.0,
  'F': 0.0,
};

export const grades = ['A+', 'A', 'B+', 'B', 'C+', 'C', 'F'];

export interface Subject {
  id: string;
  name: string;
  creditHours: number;
  marks: number; // Percentage marks (0-100)
  grade?: string; // Auto-calculated
  gradePoint?: number; // Auto-calculated
}

export interface Semester {
  id: string;
  semesterNumber: number;
  subjects: Subject[];
  sgpa: number;
  totalCredits: number;
}

// Step 3: Calculate SGPA for a single semester
// SGPA = Σ(Grade Point × Credit Hour) / Σ(Credit Hour)
// 
// Example: Math(85%,3cr) + Physics(72%,4cr) + English(65%,2cr)
//          = (3.6×3 + 3.2×4 + 2.8×2) / (3+4+2)
//          = (10.8 + 12.8 + 5.6) / 9
//          = 29.2 / 9 = 3.24
export function calculateSGPA(subjects: Subject[]): number {
  let totalGradePoints = 0;
  let totalCredits = 0;

  subjects.forEach((subject) => {
    // Step 3.1: Convert marks to grade point
    const gradePoint = percentageToGradePoint(subject.marks);
    // Step 3.2: Multiply grade point × credit hours
    totalGradePoints += gradePoint * subject.creditHours;
    // Step 3.3: Sum all credit hours (including failed subjects)
    totalCredits += subject.creditHours;
  });

  // Step 3.4: Divide by total credit hours
  return totalCredits > 0 ? totalGradePoints / totalCredits : 0;
}

// Step 4: Calculate CGPA across multiple semesters
// CGPA = Σ(SGPA × Semester Credits) / Σ(Semester Credits)
// 
// Example: Sem1(SGPA:3.10,18cr) + Sem2(SGPA:3.40,20cr) + Sem3(SGPA:3.00,19cr)
//          = (3.10×18 + 3.40×20 + 3.00×19) / (18+20+19)
//          = (55.8 + 68.0 + 57.0) / 57
//          = 180.8 / 57 = 3.17
export function calculateCGPA(semesters: Semester[]): number {
  let totalWeightedSGPA = 0;
  let totalCredits = 0;

  semesters.forEach((semester) => {
    // Step 4.1: Get total credits for this semester
    const semesterCredits = semester.subjects.reduce((sum, s) => sum + s.creditHours, 0);
    // Step 4.2: Calculate SGPA for this semester
    const semesterSGPA = calculateSGPA(semester.subjects);
    
    // Step 4.3: Multiply SGPA × semester credits
    totalWeightedSGPA += semesterSGPA * semesterCredits;
    // Step 4.4: Sum all semester credits
    totalCredits += semesterCredits;
  });

  // Step 4.5: Divide weighted SGPA by total credits
  return totalCredits > 0 ? totalWeightedSGPA / totalCredits : 0;
}

// Alternative: Direct calculation method (gives mathematically same result)
// This directly calculates from all subjects across all semesters
// Useful for verification purposes
export function calculateCGPADirect(semesters: Semester[]): number {
  let totalGradePoints = 0;
  let totalCredits = 0;

  semesters.forEach((semester) => {
    semester.subjects.forEach((subject) => {
      const gradePoint = percentageToGradePoint(subject.marks);
      totalGradePoints += gradePoint * subject.creditHours;
      totalCredits += subject.creditHours;
    });
  });

  return totalCredits > 0 ? totalGradePoints / totalCredits : 0;
}

// IMPORTANT: Fail (F) Subject Rules
// ✓ Fail subject contributes 0.0 grade point
// ✓ Credit is STILL counted in SGPA calculation
// ✓ If re-exam passed later → update marks, latest grade replaces old grade
