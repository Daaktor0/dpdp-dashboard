// DPDP Act 2023 - Compliance Checklist Data

export const complianceCategories = [
  {
    id: 'notice-consent',
    title: 'Notice & Consent',
    description: 'Requirements for informing Data Principals and obtaining valid consent',
    icon: 'FileText',
    color: '#e94560',
    sections: ['5', '6']
  },
  {
    id: 'security',
    title: 'Security Safeguards',
    description: 'Technical and organizational measures to protect personal data',
    icon: 'Shield',
    color: '#4361ee',
    sections: ['8(4)', '8(5)']
  },
  {
    id: 'breach',
    title: 'Breach Management',
    description: 'Procedures for detecting, responding to, and notifying data breaches',
    icon: 'AlertTriangle',
    color: '#f4d160',
    sections: ['8(6)']
  },
  {
    id: 'children',
    title: "Children's Data",
    description: 'Special protections for processing personal data of children',
    icon: 'Baby',
    color: '#7209b7',
    sections: ['9']
  },
  {
    id: 'rights',
    title: 'Data Principal Rights',
    description: 'Mechanisms to fulfill Data Principal rights requests',
    icon: 'Users',
    color: '#00d4ff',
    sections: ['11', '12', '13', '14']
  },
  {
    id: 'retention',
    title: 'Data Retention & Erasure',
    description: 'Policies for data retention limits and erasure procedures',
    icon: 'Trash2',
    color: '#10b981',
    sections: ['8(7)', '8(8)']
  },
  {
    id: 'cross-border',
    title: 'Cross-Border Transfers',
    description: 'Compliance with restrictions on international data transfers',
    icon: 'Globe',
    color: '#f97316',
    sections: ['16']
  },
  {
    id: 'sdf',
    title: 'SDF Obligations',
    description: 'Additional requirements for Significant Data Fiduciaries',
    icon: 'Building',
    color: '#8b5cf6',
    sections: ['10']
  }
];

export const complianceChecklist = [
  // Notice & Consent
  {
    id: 'notice-1',
    category: 'notice-consent',
    requirement: 'Privacy notice provided before or with consent request',
    section: '5(1)',
    description: 'Every consent request must be accompanied or preceded by a notice to the Data Principal.',
    priority: 'critical',
    checkItems: [
      'Notice clearly describes personal data to be collected',
      'Notice explains purpose of processing',
      'Notice explains how to exercise rights under Section 6 and 13',
      'Notice explains how to complain to the Board'
    ]
  },
  {
    id: 'notice-2',
    category: 'notice-consent',
    requirement: 'Notice available in multiple languages',
    section: '5(3)',
    description: 'Data Principal must have option to access notice in English or any Eighth Schedule language.',
    priority: 'high',
    checkItems: [
      'Notice available in English',
      'Notice available in Hindi',
      'Notice available in regional languages as relevant',
      'Language selection mechanism implemented'
    ]
  },
  {
    id: 'consent-1',
    category: 'notice-consent',
    requirement: 'Consent is free, specific, informed, unconditional, and unambiguous',
    section: '6(1)',
    description: 'Consent must meet all five criteria with a clear affirmative action.',
    priority: 'critical',
    checkItems: [
      'No coercion or undue influence in obtaining consent',
      'Consent specific to each purpose',
      'Data Principal informed of implications',
      'No bundled or conditional consent',
      'Clear affirmative action (not pre-ticked boxes)'
    ]
  },
  {
    id: 'consent-2',
    category: 'notice-consent',
    requirement: 'Data collection limited to necessary purposes',
    section: '6(1)',
    description: 'Personal data collected must be limited to what is necessary for the specified purpose.',
    priority: 'critical',
    checkItems: [
      'Data minimization principle implemented',
      'Purpose limitation documented',
      'Unnecessary data fields removed from forms',
      'Regular review of data collection practices'
    ]
  },
  {
    id: 'consent-3',
    category: 'notice-consent',
    requirement: 'Consent withdrawal mechanism with comparable ease',
    section: '6(4)',
    description: 'Data Principal must be able to withdraw consent as easily as they gave it.',
    priority: 'high',
    checkItems: [
      'Withdrawal mechanism clearly accessible',
      'Withdrawal process not more complex than consent',
      'Confirmation of withdrawal provided',
      'Processing ceased after withdrawal'
    ]
  },
  {
    id: 'consent-4',
    category: 'notice-consent',
    requirement: 'Contact details of DPO or authorized person provided',
    section: '6(3)',
    description: 'Consent request must include contact details for exercising rights.',
    priority: 'high',
    checkItems: [
      'DPO contact details provided (if applicable)',
      'Authorized person contact provided',
      'Contact mechanism is accessible',
      'Responses provided in reasonable time'
    ]
  },
  {
    id: 'consent-5',
    category: 'notice-consent',
    requirement: 'Records maintained to prove valid consent',
    section: '6(10)',
    description: 'Data Fiduciary must be able to prove notice was given and consent obtained.',
    priority: 'high',
    checkItems: [
      'Consent records maintained',
      'Timestamp of consent recorded',
      'Version of notice recorded',
      'Consent audit trail available'
    ]
  },
  // Security Safeguards
  {
    id: 'security-1',
    category: 'security',
    requirement: 'Technical and organizational measures implemented',
    section: '8(4)',
    description: 'Appropriate measures to ensure effective observance of the Act.',
    priority: 'critical',
    checkItems: [
      'Data protection policy documented',
      'Access control mechanisms in place',
      'Encryption implemented for sensitive data',
      'Regular security training for staff',
      'Incident response procedures defined'
    ]
  },
  {
    id: 'security-2',
    category: 'security',
    requirement: 'Reasonable security safeguards to prevent breach',
    section: '8(5)',
    description: 'Protect personal data including that processed by Data Processors.',
    priority: 'critical',
    checkItems: [
      'Firewall and intrusion detection systems',
      'Regular vulnerability assessments',
      'Secure data storage practices',
      'Secure data transmission protocols',
      'Physical security measures'
    ]
  },
  {
    id: 'security-3',
    category: 'security',
    requirement: 'Data Processor security requirements in contract',
    section: '8(2)',
    description: 'Data Processors engaged only under valid contract with security obligations.',
    priority: 'high',
    checkItems: [
      'Written contract with Data Processors',
      'Security obligations specified in contract',
      'Audit rights included in contract',
      'Sub-processor restrictions defined'
    ]
  },
  // Breach Management
  {
    id: 'breach-1',
    category: 'breach',
    requirement: 'Breach detection mechanisms in place',
    section: '8(6)',
    description: 'Ability to detect personal data breaches promptly.',
    priority: 'critical',
    checkItems: [
      'Monitoring systems for unauthorized access',
      'Log analysis and alerting configured',
      'Anomaly detection implemented',
      'Regular security audits conducted'
    ]
  },
  {
    id: 'breach-2',
    category: 'breach',
    requirement: 'Breach notification to Board',
    section: '8(6)',
    description: 'Notify Data Protection Board of personal data breach in prescribed form and manner.',
    priority: 'critical',
    checkItems: [
      'Breach notification procedure documented',
      'Board notification template prepared',
      'Designated person for breach reporting',
      'Timeline for notification defined'
    ]
  },
  {
    id: 'breach-3',
    category: 'breach',
    requirement: 'Breach notification to affected Data Principals',
    section: '8(6)',
    description: 'Notify each affected Data Principal of personal data breach.',
    priority: 'critical',
    checkItems: [
      'Individual notification procedure documented',
      'Communication channels identified',
      'Notification content defined',
      'Support mechanisms for affected individuals'
    ]
  },
  // Children's Data
  {
    id: 'children-1',
    category: 'children',
    requirement: 'Verifiable parental consent for children',
    section: '9(1)',
    description: 'Obtain verifiable consent of parent before processing child data.',
    priority: 'critical',
    checkItems: [
      'Age verification mechanism implemented',
      'Parental consent collection process',
      'Verification of parental authority',
      'Records of parental consent maintained'
    ]
  },
  {
    id: 'children-2',
    category: 'children',
    requirement: 'No detrimental processing of children data',
    section: '9(2)',
    description: 'No processing likely to cause detrimental effect on child well-being.',
    priority: 'critical',
    checkItems: [
      'Impact assessment for children data',
      'Content appropriateness review',
      'Well-being considerations documented',
      'Regular review of processing activities'
    ]
  },
  {
    id: 'children-3',
    category: 'children',
    requirement: 'No tracking or behavioral monitoring of children',
    section: '9(3)',
    description: 'Tracking, behavioral monitoring, and targeted advertising prohibited for children.',
    priority: 'critical',
    checkItems: [
      'No tracking cookies for children',
      'No behavioral profiling of children',
      'No targeted advertising to children',
      'Technical controls implemented'
    ]
  },
  // Data Principal Rights
  {
    id: 'rights-1',
    category: 'rights',
    requirement: 'Access request mechanism available',
    section: '11',
    description: 'Data Principals can request summary of their data and processing activities.',
    priority: 'high',
    checkItems: [
      'Access request form available',
      'Process to verify requester identity',
      'Timeline for response defined',
      'Format of response determined'
    ]
  },
  {
    id: 'rights-2',
    category: 'rights',
    requirement: 'Correction and erasure mechanism available',
    section: '12',
    description: 'Data Principals can request correction, completion, updating, and erasure.',
    priority: 'high',
    checkItems: [
      'Correction request mechanism',
      'Erasure request mechanism',
      'Verification of requests',
      'Communication of actions taken'
    ]
  },
  {
    id: 'rights-3',
    category: 'rights',
    requirement: 'Grievance redressal mechanism established',
    section: '8(10), 13',
    description: 'Effective mechanism to redress Data Principal grievances.',
    priority: 'critical',
    checkItems: [
      'Grievance submission channel available',
      'Acknowledgment of grievances',
      'Timeline for resolution defined',
      'Escalation procedure documented'
    ]
  },
  {
    id: 'rights-4',
    category: 'rights',
    requirement: 'Response within prescribed period',
    section: '13(2)',
    description: 'Respond to grievances within prescribed period.',
    priority: 'high',
    checkItems: [
      'Response timeline tracked',
      'Automated reminders for pending grievances',
      'Quality of responses reviewed',
      'Statistics maintained'
    ]
  },
  // Data Retention & Erasure
  {
    id: 'retention-1',
    category: 'retention',
    requirement: 'Data erasure on consent withdrawal',
    section: '8(7)(a)',
    description: 'Erase personal data when Data Principal withdraws consent.',
    priority: 'critical',
    checkItems: [
      'Erasure triggered on consent withdrawal',
      'All copies identified and erased',
      'Data Processors instructed to erase',
      'Erasure confirmation provided'
    ]
  },
  {
    id: 'retention-2',
    category: 'retention',
    requirement: 'Data erasure when purpose served',
    section: '8(7)(a)',
    description: 'Erase personal data when specified purpose is no longer being served.',
    priority: 'critical',
    checkItems: [
      'Purpose completion criteria defined',
      'Automated erasure or review triggers',
      'Retention periods documented',
      'Legal retention requirements identified'
    ]
  },
  {
    id: 'retention-3',
    category: 'retention',
    requirement: 'Data Processor erasure instructions',
    section: '8(7)(b)',
    description: 'Cause Data Processors to erase personal data.',
    priority: 'high',
    checkItems: [
      'Erasure instructions sent to Processors',
      'Confirmation of erasure obtained',
      'Audit of Processor erasure practices',
      'Contractual obligations enforced'
    ]
  },
  // Cross-Border
  {
    id: 'cross-border-1',
    category: 'cross-border',
    requirement: 'Transfer restrictions compliance',
    section: '16',
    description: 'Comply with restrictions on transfer to notified countries.',
    priority: 'high',
    checkItems: [
      'List of restricted countries reviewed',
      'Transfer mapping documented',
      'Alternative arrangements identified',
      'Higher protection laws complied with'
    ]
  },
  // SDF Obligations
  {
    id: 'sdf-1',
    category: 'sdf',
    requirement: 'Data Protection Officer appointed',
    section: '10(2)(a)',
    description: 'Appoint DPO who is India-based and responsible to Board.',
    priority: 'critical',
    checkItems: [
      'DPO appointed and notified',
      'DPO based in India',
      'DPO reports to Board of Directors',
      'DPO contact published'
    ]
  },
  {
    id: 'sdf-2',
    category: 'sdf',
    requirement: 'Independent data auditor appointed',
    section: '10(2)(b)',
    description: 'Appoint independent auditor to evaluate compliance.',
    priority: 'critical',
    checkItems: [
      'Independent auditor selected',
      'Auditor independence verified',
      'Audit scope defined',
      'Audit schedule established'
    ]
  },
  {
    id: 'sdf-3',
    category: 'sdf',
    requirement: 'Periodic DPIA conducted',
    section: '10(2)(c)(i)',
    description: 'Conduct Data Protection Impact Assessment periodically.',
    priority: 'critical',
    checkItems: [
      'DPIA methodology defined',
      'Rights description included',
      'Purpose documentation complete',
      'Risk assessment conducted',
      'Mitigation measures identified'
    ]
  },
  {
    id: 'sdf-4',
    category: 'sdf',
    requirement: 'Periodic audit conducted',
    section: '10(2)(c)(ii)',
    description: 'Conduct periodic audit of data protection practices.',
    priority: 'high',
    checkItems: [
      'Audit frequency determined',
      'Audit scope comprehensive',
      'Findings documented',
      'Remediation actions tracked'
    ]
  }
];

export const complianceStats = {
  totalItems: complianceChecklist.length,
  byCategory: complianceCategories.map(cat => ({
    id: cat.id,
    title: cat.title,
    count: complianceChecklist.filter(item => item.category === cat.id).length
  })),
  byPriority: {
    critical: complianceChecklist.filter(item => item.priority === 'critical').length,
    high: complianceChecklist.filter(item => item.priority === 'high').length,
    medium: complianceChecklist.filter(item => item.priority === 'medium').length
  }
};

export default { complianceCategories, complianceChecklist, complianceStats };
