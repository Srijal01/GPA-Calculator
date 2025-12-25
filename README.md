# GPA Calculator for Nepali Universities

A modern web application built with Next.js for calculating CGPA (Cumulative Grade Point Average) and SGPA (Semester Grade Point Average) based on the Nepali university grading system.

## Features

- **SGPA Calculator**: Calculate Grade Point Average for a single semester
- **CGPA Calculator**: Calculate cumulative GPA across multiple semesters
- **Nepali Grading System**: Supports the standard Nepali university grading scale
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark Mode**: Automatic dark mode support based on system preferences
- **User-Friendly Interface**: Clean and intuitive design with Tailwind CSS

## Nepali University Grading System

| Grade | Grade Point |Percentage (%) |
|-------|-------------|---------------|
| A+    | 4.0         |90 – 100       |
| A     | 3.6         |80 – <90       |
| B+    | 3.2         |70 – <80       |
| B     | 2.8         |60 – <70       |
| C+    | 2.4         |50 – <60       |
| C     | 2.0         |40 – <50       |
| D+    | 1.6         |30 - <40       |
| F     | 0.0         |< 30           |

## Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd GPA_Calculator
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### SGPA Calculator

1. Navigate to the SGPA Calculator page
2. Add subjects with their names, credit hours, and grades
3. Click "Add Subject" to include more subjects
4. Click "Calculate SGPA" to see your semester GPA
5. Use "Reset" to start over

### CGPA Calculator

1. Navigate to the CGPA Calculator page
2. Add semesters and subjects within each semester
3. Specify credit hours and grades for each subject
4. Click "Add Semester" to include more semesters
5. Click "Calculate CGPA" to see your cumulative GPA
6. Each semester's SGPA will also be displayed
7. Use "Reset" to start over

## Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI**: React 18
- **Deployment Ready**: Optimized for Vercel

## Project Structure

```
GPA_Calculator/
├── src/
│   ├── app/
│   │   ├── cgpa/
│   │   │   └── page.tsx          # CGPA Calculator page
│   │   ├── sgpa/
│   │   │   └── page.tsx          # SGPA Calculator page
│   │   ├── globals.css           # Global styles
│   │   ├── layout.tsx            # Root layout
│   │   └── page.tsx              # Home page
│   └── utils/
│       └── gpaCalculator.ts      # GPA calculation logic
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.ts
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Author

**Srijal Dangol**

Built for Nepali university students to easily calculate their GPAs.
