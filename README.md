# DPDP Act 2023 Dashboard

An interactive educational dashboard for exploring India's Digital Personal Data Protection Act, 2023.

## Overview

This dashboard provides a comprehensive, user-friendly interface for understanding the DPDP Act, including:

- **Act Navigator**: Browse all 44 sections across 9 chapters with key points and provisions
- **Stakeholder Guide**: Understand roles, rights, and obligations of Data Principals, Data Fiduciaries, and more
- **Penalty Framework**: Visualize the penalty schedule with amounts up to Rs. 250 Crore
- **Glossary**: 28 definitions from Section 2 with plain-English explanations
- **Fuzzy Search**: Find any section, definition, or stakeholder with typo-tolerant search

> **Disclaimer**: This dashboard is for educational purposes only and does not constitute legal advice. Please consult qualified legal professionals for compliance matters.

## Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router DOM 7
- **Search**: Fuse.js (fuzzy search)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project
cd dpdp-dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
dpdp-dashboard/
├── src/
│   ├── components/
│   │   └── common/
│   │       ├── Header.jsx          # Global header with search
│   │       ├── Sidebar.jsx         # Navigation sidebar
│   │       └── DisclaimerModal.jsx # Legal disclaimer popup
│   ├── pages/
│   │   ├── Home.jsx           # Dashboard overview
│   │   ├── Navigator.jsx      # Act sections explorer
│   │   ├── Stakeholders.jsx   # Stakeholder details
│   │   ├── Penalties.jsx      # Penalty visualization
│   │   └── Glossary.jsx       # Definitions browser
│   ├── data/
│   │   ├── actStructure.js    # Chapters & sections
│   │   ├── definitions.js     # Section 2 definitions
│   │   ├── stakeholders.js    # Stakeholder data
│   │   └── penalties.js       # Penalty schedule
│   ├── utils/
│   │   └── search.js          # Fuzzy search utilities
│   ├── App.jsx                # Root component
│   ├── main.jsx               # Entry point
│   └── index.css              # Global styles & theme
├── index.html
├── package.json
└── vite.config.js
```

## Features

- **Dark Theme**: Premium dark UI with glass morphism effects
- **Responsive Design**: Works on desktop and mobile devices
- **Fuzzy Search**: Typo-tolerant search across all content with filters
- **Interactive Navigation**: Animated transitions and hover effects
- **Session Disclaimer**: Legal disclaimer shown once per session

## Key Pages

### Act Navigator
Explore all 44 sections of the DPDP Act organized by chapter. Each section includes:
- Summary and key points
- Full provision text
- Related statistics (definitions, duties, legitimate uses)

### Stakeholders
Detailed breakdown of all stakeholders defined in the Act:
- Data Principal (you, the individual)
- Data Fiduciary (organizations collecting data)
- Data Processor (service providers)
- Significant Data Fiduciary
- Consent Manager
- Data Protection Board

### Penalties
Visual representation of the penalty framework:
- Maximum penalties for each violation type
- Color-coded severity indicators
- Penalty bars for quick comparison

### Glossary
All 28 definitions from Section 2 of the Act with:
- Category classification (Entity, Individual, Technical, Legal, Institutional)
- Plain English explanations
- Related section references

## License

Educational use only. The DPDP Act content is public domain government documentation.
