// Data Lifecycle stages as per the DPDP Act, 2023

export const lifecycleStages = [
  {
    id: 'collection',
    name: 'Collection',
    shortName: 'Collect',
    icon: 'Download',
    color: '#00d4ff',
    description: 'The point where personal data is gathered from the Data Principal',
    sections: ['4', '5', '6'],
    keyObligations: [
      { text: 'Provide notice before collection', section: '5' },
      { text: 'Obtain valid consent (or rely on legitimate use)', section: '6' },
      { text: 'Collect only necessary data (purpose limitation)', section: '4' }
    ],
    penalties: 'Up to Rs. 50 Crore for non-compliance with consent requirements',
    dataPrincipalRights: [
      'Right to be informed about data collection',
      'Right to give or refuse consent'
    ]
  },
  {
    id: 'storage',
    name: 'Storage',
    shortName: 'Store',
    icon: 'Database',
    color: '#3b82f6',
    description: 'Secure storage of personal data with appropriate safeguards',
    sections: ['8'],
    keyObligations: [
      { text: 'Implement reasonable security safeguards', section: '8(5)' },
      { text: 'Protect data from breaches', section: '8(6)' },
      { text: 'Ensure data accuracy and completeness', section: '8(3)' }
    ],
    penalties: 'Up to Rs. 250 Crore for security safeguard breaches',
    dataPrincipalRights: [
      'Right to data security',
      'Right to be notified of breaches'
    ]
  },
  {
    id: 'processing',
    name: 'Processing',
    shortName: 'Process',
    icon: 'Cpu',
    color: '#8b5cf6',
    description: 'Any operation performed on personal data',
    sections: ['4', '7'],
    keyObligations: [
      { text: 'Process only for lawful purpose', section: '4' },
      { text: 'Limit processing to stated purpose', section: '7' },
      { text: 'Ensure data minimization', section: '4(2)' }
    ],
    penalties: 'Up to Rs. 200 Crore for processing violations',
    dataPrincipalRights: [
      'Right to know processing purpose',
      'Right to access personal data'
    ]
  },
  {
    id: 'sharing',
    name: 'Sharing',
    shortName: 'Share',
    icon: 'Share2',
    color: '#f59e0b',
    description: 'Disclosure or transfer of data to third parties or across borders',
    sections: ['8', '16', '17'],
    keyObligations: [
      { text: 'Contractual obligations with Data Processors', section: '8(2)' },
      { text: 'Cross-border transfer restrictions', section: '16' },
      { text: 'Government data access requirements', section: '17' }
    ],
    penalties: 'Up to Rs. 200 Crore for unauthorized cross-border transfers',
    dataPrincipalRights: [
      'Right to know who data is shared with',
      'Right to restrict certain transfers'
    ]
  },
  {
    id: 'retention',
    name: 'Retention',
    shortName: 'Retain',
    icon: 'Clock',
    color: '#06b6d4',
    description: 'Holding data only as long as necessary for the purpose',
    sections: ['8(7)'],
    keyObligations: [
      { text: 'Retain only as long as necessary', section: '8(7)' },
      { text: 'Implement retention policies', section: '8(7)' },
      { text: 'Document retention periods', section: '8(7)' }
    ],
    penalties: 'Part of general obligation violations - Up to Rs. 50 Crore',
    dataPrincipalRights: [
      'Right to know retention period',
      'Right to request deletion after purpose is fulfilled'
    ]
  },
  {
    id: 'deletion',
    name: 'Deletion',
    shortName: 'Delete',
    icon: 'Trash2',
    color: '#ef4444',
    description: 'Secure erasure of personal data when no longer needed',
    sections: ['8(7)', '12'],
    keyObligations: [
      { text: 'Erase data when purpose is fulfilled', section: '8(7)' },
      { text: 'Honor erasure requests', section: '12(3)' },
      { text: 'Ensure complete deletion from all systems', section: '8(7)' }
    ],
    penalties: 'Up to Rs. 50 Crore for failure to erase data',
    dataPrincipalRights: [
      'Right to erasure of personal data',
      'Right to withdraw consent and have data deleted'
    ]
  }
];

export const lifecycleConnections = [
  { from: 'collection', to: 'storage', label: 'Data received' },
  { from: 'storage', to: 'processing', label: 'Data retrieved' },
  { from: 'processing', to: 'sharing', label: 'Data disclosed' },
  { from: 'processing', to: 'storage', label: 'Data returned' },
  { from: 'sharing', to: 'retention', label: 'After use' },
  { from: 'storage', to: 'retention', label: 'Time-based' },
  { from: 'retention', to: 'deletion', label: 'Purpose fulfilled' }
];

export const lifecycleStats = {
  totalStages: 6,
  sectionsInvolved: 12,
  maxPenalty: '250 Crore',
  principalRights: 10
};
