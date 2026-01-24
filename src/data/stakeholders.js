// DPDP Act 2023 - Stakeholder Data

export const stakeholders = [
  {
    id: 'data-principal',
    name: 'Data Principal',
    shortName: 'Individual',
    definition: 'The individual to whom the personal data relates',
    section: '2(j)',
    icon: 'User',
    color: '#f4d160',
    gradient: 'from-yellow-500 to-orange-500',
    description: 'You are a Data Principal if any organization processes your personal data. This includes customers, employees, citizens, and any individual whose data is collected.',
    implementingRules: [14],
    includes: [
      'Any individual whose data is processed',
      'Parents/guardians of children (under 18)',
      'Lawful guardians of persons with disability'
    ],
    rights: [
      {
        id: 'access',
        title: 'Right to Access Information',
        section: '11',
        description: 'Obtain summary of personal data, processing activities, and sharing details',
        icon: 'Eye'
      },
      {
        id: 'correction',
        title: 'Right to Correction and Erasure',
        section: '12',
        description: 'Request correction, completion, updating, and erasure of personal data',
        icon: 'Edit'
      },
      {
        id: 'grievance',
        title: 'Right to Grievance Redressal',
        section: '13',
        description: 'Access grievance mechanism from Data Fiduciary before approaching Board',
        icon: 'MessageSquare'
      },
      {
        id: 'nominate',
        title: 'Right to Nominate',
        section: '14',
        description: 'Nominate someone to exercise rights in case of death or incapacity',
        icon: 'UserPlus'
      },
      {
        id: 'consent',
        title: 'Right to Withdraw Consent',
        section: '6(4)',
        description: 'Withdraw consent with ease comparable to giving consent',
        icon: 'XCircle'
      }
    ],
    duties: [
      {
        id: 'comply',
        title: 'Comply with Laws',
        section: '15(a)',
        description: 'Comply with all applicable laws while exercising rights'
      },
      {
        id: 'no-impersonation',
        title: 'No Impersonation',
        section: '15(b)',
        description: 'Not impersonate another person while providing personal data'
      },
      {
        id: 'no-suppress',
        title: 'No Suppression',
        section: '15(c)',
        description: 'Not suppress material information for government documents'
      },
      {
        id: 'no-false-complaints',
        title: 'No False Complaints',
        section: '15(d)',
        description: 'Not register false or frivolous grievances or complaints'
      },
      {
        id: 'authentic-info',
        title: 'Authentic Information',
        section: '15(e)',
        description: 'Furnish only verifiably authentic information for corrections'
      }
    ]
  },
  {
    id: 'data-fiduciary',
    name: 'Data Fiduciary',
    shortName: 'Organization',
    definition: 'Any person who determines the purpose and means of processing personal data',
    section: '2(i)',
    icon: 'Building2',
    color: '#e94560',
    gradient: 'from-red-500 to-pink-500',
    description: 'Organizations that decide why and how to process personal data. This includes businesses, government bodies, and any entity that collects and uses personal data.',
    includes: [
      'Companies and businesses',
      'Government departments',
      'Non-profit organizations',
      'Educational institutions',
      'Healthcare providers'
    ],
    implementingRules: [3, 6, 7, 8, 9],
    obligations: [
      {
        id: 'lawful-processing',
        title: 'Lawful Processing',
        section: '4',
        description: 'Process only with consent or for legitimate uses, for lawful purposes',
        category: 'Core'
      },
      {
        id: 'notice',
        title: 'Provide Notice',
        section: '5',
        description: 'Give notice before or with consent request explaining data use and rights',
        category: 'Consent'
      },
      {
        id: 'valid-consent',
        title: 'Obtain Valid Consent',
        section: '6',
        description: 'Ensure consent is free, specific, informed, unconditional, unambiguous',
        category: 'Consent'
      },
      {
        id: 'accuracy',
        title: 'Ensure Data Accuracy',
        section: '8(3)',
        description: 'Ensure completeness, accuracy, consistency of data for decisions',
        category: 'Data Quality'
      },
      {
        id: 'security',
        title: 'Security Safeguards',
        section: '8(5)',
        description: 'Implement reasonable security safeguards to prevent breach',
        category: 'Security'
      },
      {
        id: 'breach-notify',
        title: 'Breach Notification',
        section: '8(6)',
        description: 'Notify Board and affected individuals of any personal data breach',
        category: 'Security'
      },
      {
        id: 'erasure',
        title: 'Data Erasure',
        section: '8(7)',
        description: 'Erase data when consent withdrawn or purpose served',
        category: 'Data Lifecycle'
      },
      {
        id: 'dpo-contact',
        title: 'Publish DPO Contact',
        section: '8(9)',
        description: 'Publish business contact of Data Protection Officer or authorized person',
        category: 'Transparency'
      },
      {
        id: 'grievance',
        title: 'Grievance Mechanism',
        section: '8(10)',
        description: 'Establish effective mechanism to redress Data Principal grievances',
        category: 'Accountability'
      },
      {
        id: 'children',
        title: 'Children Protection',
        section: '9',
        description: 'Obtain parental consent, no tracking/targeted ads for children',
        category: 'Special Categories'
      }
    ]
  },
  {
    id: 'significant-data-fiduciary',
    name: 'Significant Data Fiduciary',
    shortName: 'Large Entity',
    definition: 'Data Fiduciary notified by Central Government based on volume, sensitivity, and risk',
    section: '2(z), 10',
    icon: 'Building',
    color: '#7209b7',
    gradient: 'from-purple-600 to-violet-600',
    description: 'Large or high-risk Data Fiduciaries designated by the government. They have additional compliance obligations due to the scale or sensitivity of data they process.',
    implementingRules: [13],
    criteria: [
      'Volume and sensitivity of data processed',
      'Risk to Data Principal rights',
      'Impact on sovereignty and integrity of India',
      'Risk to electoral democracy',
      'Security of the State',
      'Public order'
    ],
    additionalObligations: [
      {
        id: 'dpo',
        title: 'Appoint Data Protection Officer',
        section: '10(2)(a)',
        description: 'Must be India-based, responsible to Board of Directors, point of contact for grievances',
        icon: 'UserCog'
      },
      {
        id: 'auditor',
        title: 'Appoint Independent Data Auditor',
        section: '10(2)(b)',
        description: 'Independent auditor to evaluate compliance with the Act',
        icon: 'ClipboardCheck'
      },
      {
        id: 'dpia',
        title: 'Data Protection Impact Assessment',
        section: '10(2)(c)(i)',
        description: 'Periodic DPIA covering rights, purpose, and risk management',
        icon: 'FileSearch'
      },
      {
        id: 'audit',
        title: 'Periodic Audit',
        section: '10(2)(c)(ii)',
        description: 'Regular audits of data protection practices',
        icon: 'Search'
      }
    ]
  },
  {
    id: 'data-processor',
    name: 'Data Processor',
    shortName: 'Processor',
    definition: 'Any person who processes personal data on behalf of a Data Fiduciary',
    section: '2(k)',
    icon: 'Server',
    color: '#4361ee',
    gradient: 'from-blue-500 to-indigo-500',
    description: 'Entities that process data on behalf of Data Fiduciaries. They act under instructions and don\'t determine the purpose of processing.',
    includes: [
      'Cloud service providers',
      'IT service companies',
      'Payroll processors',
      'Marketing agencies',
      'Analytics providers'
    ],
    keyPoints: [
      {
        id: 'contract',
        title: 'Valid Contract Required',
        section: '8(2)',
        description: 'Must operate under a valid contract with the Data Fiduciary'
      },
      {
        id: 'fiduciary-responsible',
        title: 'Fiduciary Remains Responsible',
        section: '8(1)',
        description: 'Data Fiduciary remains responsible for Processor actions'
      },
      {
        id: 'erasure',
        title: 'Erasure Obligation',
        section: '8(7)(b)',
        description: 'Must erase data when instructed by Data Fiduciary'
      }
    ]
  },
  {
    id: 'consent-manager',
    name: 'Consent Manager',
    shortName: 'Consent Mgr',
    definition: 'A person registered with the Board to help Data Principals manage consent',
    section: '2(g)',
    icon: 'KeyRound',
    color: '#00d4ff',
    gradient: 'from-cyan-500 to-teal-500',
    description: 'Registered intermediaries that provide platforms for Data Principals to give, manage, review, and withdraw consent across multiple Data Fiduciaries.',
    implementingRules: [4],
    characteristics: [
      'Registered with the Board',
      'Single point of contact for consent',
      'Accessible, transparent, interoperable platform',
      'Accountable to Data Principal'
    ],
    requirements: [
      {
        id: 'registration',
        title: 'Board Registration',
        section: '6(9)',
        description: 'Must register with Board subject to technical, operational, financial conditions'
      },
      {
        id: 'accountability',
        title: 'Accountability',
        section: '6(8)',
        description: 'Accountable to Data Principal and must act on their behalf'
      },
      {
        id: 'platform',
        title: 'Platform Requirements',
        section: '2(g)',
        description: 'Must provide accessible, transparent, and interoperable platform'
      }
    ]
  },
  {
    id: 'dpb',
    name: 'Data Protection Board of India',
    shortName: 'Board',
    definition: 'The regulatory body established under Section 18 for adjudication and enforcement',
    section: '18-28',
    icon: 'Landmark',
    color: '#10b981',
    gradient: 'from-emerald-500 to-green-500',
    description: 'The independent regulatory body responsible for enforcing the Act, handling complaints, conducting inquiries, and imposing penalties.',
    implementingRules: [17, 18, 19, 20, 21],
    characteristics: [
      'Body corporate with perpetual succession',
      'Digital office by design',
      'Independent functioning',
      'Civil court-like powers'
    ],
    functions: [
      {
        id: 'breach',
        title: 'Handle Breach Intimations',
        section: '27(1)(a)',
        description: 'Direct remedial measures and impose penalties for data breaches'
      },
      {
        id: 'complaints',
        title: 'Handle Complaints',
        section: '27(1)(b)',
        description: 'Inquire into complaints from Data Principals'
      },
      {
        id: 'directions',
        title: 'Issue Directions',
        section: '27(2)',
        description: 'Issue binding directions after hearing'
      },
      {
        id: 'penalties',
        title: 'Impose Penalties',
        section: '33',
        description: 'Impose monetary penalties as per Schedule'
      },
      {
        id: 'consent-manager',
        title: 'Register Consent Managers',
        section: '6(9)',
        description: 'Register and oversee Consent Managers'
      }
    ],
    composition: {
      chairperson: 'Chairperson appointed by Central Government',
      members: 'Members as notified by Central Government',
      term: '2 years, eligible for re-appointment',
      qualifications: 'Expertise in data governance, law, technology, etc.'
    }
  }
];

export const stakeholderRelationships = [
  {
    from: 'data-principal',
    to: 'data-fiduciary',
    label: 'Gives consent / Exercises rights',
    type: 'consent'
  },
  {
    from: 'data-fiduciary',
    to: 'data-principal',
    label: 'Processes data / Provides notice',
    type: 'processing'
  },
  {
    from: 'data-fiduciary',
    to: 'data-processor',
    label: 'Engages under contract',
    type: 'contract'
  },
  {
    from: 'data-processor',
    to: 'data-fiduciary',
    label: 'Processes on behalf',
    type: 'processing'
  },
  {
    from: 'data-principal',
    to: 'consent-manager',
    label: 'Manages consent through',
    type: 'consent'
  },
  {
    from: 'consent-manager',
    to: 'data-fiduciary',
    label: 'Communicates consent',
    type: 'consent'
  },
  {
    from: 'data-principal',
    to: 'dpb',
    label: 'Files complaints',
    type: 'complaint'
  },
  {
    from: 'dpb',
    to: 'data-fiduciary',
    label: 'Enforces / Penalizes',
    type: 'enforcement'
  },
  {
    from: 'dpb',
    to: 'consent-manager',
    label: 'Registers / Oversees',
    type: 'regulation'
  }
];

export default { stakeholders, stakeholderRelationships };
