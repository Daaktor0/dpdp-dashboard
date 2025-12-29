// DPDP Act 2023 - Penalty Schedule (THE SCHEDULE - Section 33(1))

export const penalties = [
  {
    id: 1,
    breach: 'Breach in observing the obligation of Data Fiduciary to take reasonable security safeguards to prevent personal data breach',
    section: '8(5)',
    sectionTitle: 'General obligations of Data Fiduciary - Security safeguards',
    maxPenalty: 25000000000, // 250 crore
    maxPenaltyDisplay: '₹250 Crore',
    severity: 'critical',
    color: '#e94560',
    description: 'Failure to implement reasonable security safeguards to prevent unauthorized access, disclosure, or breach of personal data.',
    examples: [
      'Inadequate encryption of sensitive data',
      'Lack of access controls',
      'No intrusion detection systems',
      'Unpatched security vulnerabilities',
      'Insufficient employee security training'
    ]
  },
  {
    id: 2,
    breach: 'Breach in observing the obligation to give the Board or affected Data Principal notice of a personal data breach',
    section: '8(6)',
    sectionTitle: 'General obligations of Data Fiduciary - Breach notification',
    maxPenalty: 20000000000, // 200 crore
    maxPenaltyDisplay: '₹200 Crore',
    severity: 'high',
    color: '#f4d160',
    description: 'Failure to notify the Data Protection Board and affected individuals about a personal data breach in prescribed manner and time.',
    examples: [
      'Delayed breach notification',
      'Failure to notify affected individuals',
      'Incomplete breach information',
      'Not notifying the Board',
      'Concealing breach incidents'
    ]
  },
  {
    id: 3,
    breach: 'Breach in observance of additional obligations in relation to children',
    section: '9',
    sectionTitle: 'Processing of personal data of children',
    maxPenalty: 20000000000, // 200 crore
    maxPenaltyDisplay: '₹200 Crore',
    severity: 'high',
    color: '#f4d160',
    description: 'Violation of special protections for children including parental consent, tracking, behavioral monitoring, or targeted advertising.',
    examples: [
      'Processing without verifiable parental consent',
      'Tracking children\'s online behavior',
      'Behavioral monitoring of children',
      'Targeted advertising to children',
      'Processing detrimental to child well-being'
    ]
  },
  {
    id: 4,
    breach: 'Breach in observance of additional obligations of Significant Data Fiduciary',
    section: '10',
    sectionTitle: 'Additional obligations of Significant Data Fiduciary',
    maxPenalty: 15000000000, // 150 crore
    maxPenaltyDisplay: '₹150 Crore',
    severity: 'high',
    color: '#f4d160',
    description: 'Failure by Significant Data Fiduciary to appoint DPO, conduct audits, or perform Data Protection Impact Assessments.',
    examples: [
      'No Data Protection Officer appointed',
      'DPO not based in India',
      'No independent data auditor',
      'Missing DPIA',
      'No periodic audits'
    ]
  },
  {
    id: 5,
    breach: 'Breach in observance of the duties under section 15',
    section: '15',
    sectionTitle: 'Duties of Data Principal',
    maxPenalty: 10000, // 10 thousand
    maxPenaltyDisplay: '₹10,000',
    severity: 'low',
    color: '#4361ee',
    description: 'Data Principal violating duties such as impersonation, suppressing information, or filing false complaints.',
    examples: [
      'Impersonating another person',
      'Suppressing material information',
      'Filing false grievances',
      'Filing frivolous complaints',
      'Providing inauthentic information'
    ]
  },
  {
    id: 6,
    breach: 'Breach of any term of voluntary undertaking accepted by the Board',
    section: '32',
    sectionTitle: 'Voluntary undertaking',
    maxPenalty: null, // Variable
    maxPenaltyDisplay: 'As applicable for original breach',
    severity: 'variable',
    color: '#7209b7',
    description: 'Failure to comply with terms of a voluntary undertaking accepted by the Board.',
    examples: [
      'Not implementing agreed remedial measures',
      'Missing agreed timelines',
      'Failing to publish undertaking',
      'Continuing prohibited practices',
      'Incomplete compliance'
    ]
  },
  {
    id: 7,
    breach: 'Breach of any other provision of this Act or the rules made thereunder',
    section: 'Other',
    sectionTitle: 'Other provisions',
    maxPenalty: 5000000000, // 50 crore
    maxPenaltyDisplay: '₹50 Crore',
    severity: 'medium',
    color: '#00d4ff',
    description: 'Violation of any other provision not specifically listed above.',
    examples: [
      'Processing without lawful ground',
      'Invalid consent mechanisms',
      'Missing privacy notices',
      'Not responding to grievances',
      'Improper cross-border transfers'
    ]
  }
];

export const penaltyFactors = [
  {
    id: 'nature',
    factor: 'Nature, gravity and duration of the breach',
    section: '33(2)(a)',
    description: 'How serious was the breach and how long did it persist?',
    weight: 'high'
  },
  {
    id: 'data-type',
    factor: 'Type and nature of the personal data affected by the breach',
    section: '33(2)(b)',
    description: 'Was sensitive personal data involved? Financial, health, biometric?',
    weight: 'high'
  },
  {
    id: 'repetitive',
    factor: 'Repetitive nature of the breach',
    section: '33(2)(c)',
    description: 'Is this a repeat offense or first-time violation?',
    weight: 'high'
  },
  {
    id: 'gain-loss',
    factor: 'Whether the person has realised a gain or avoided any loss',
    section: '33(2)(d)',
    description: 'Did the violator profit from the breach or avoid costs?',
    weight: 'medium'
  },
  {
    id: 'mitigation',
    factor: 'Action taken to mitigate effects and consequences',
    section: '33(2)(e)',
    description: 'What remedial steps were taken? How quickly and effectively?',
    weight: 'medium'
  },
  {
    id: 'proportionality',
    factor: 'Proportionality and effectiveness of penalty',
    section: '33(2)(f)',
    description: 'Is the penalty appropriate to deter future breaches?',
    weight: 'medium'
  },
  {
    id: 'impact',
    factor: 'Likely impact of the penalty on the person',
    section: '33(2)(g)',
    description: 'Consider the financial capacity of the violator.',
    weight: 'medium'
  }
];

export const penaltyStats = {
  maxTotal: 25000000000,
  maxTotalDisplay: '₹250 Crore',
  minDataPrincipal: 10000,
  minDataPrincipalDisplay: '₹10,000',
  categoryCounts: {
    critical: 1,
    high: 3,
    medium: 1,
    low: 1,
    variable: 1
  }
};

export default { penalties, penaltyFactors, penaltyStats };
