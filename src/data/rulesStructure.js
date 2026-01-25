// DPDP Rules 2025 - Complete Rules Structure
// Published: November 13, 2025 (G.S.R. 846(E))

export const rulesInfo = {
  title: 'Digital Personal Data Protection Rules, 2025',
  notificationNumber: 'G.S.R. 846(E)',
  datePublished: '13th November, 2025',
  parentAct: 'Digital Personal Data Protection Act, 2023 (22 of 2023)',
  totalRules: 23,
  totalSchedules: 7
};

// Enforcement phases based on Rule 1 (Short title and commencement)
export const enforcementPhases = [
  {
    id: 1,
    name: 'Phase 1',
    date: '2025-11-13',
    displayDate: 'November 13, 2025',
    rules: [1, 2, 17, 18, 19, 20, 21],
    description: 'Foundational rules including definitions and Data Protection Board establishment',
    status: 'active',
    keyTopics: ['Definitions', 'Board Establishment', 'Board Procedures', 'Digital Office']
  },
  {
    id: 2,
    name: 'Phase 2',
    date: '2026-11-13',
    displayDate: 'November 13, 2026',
    rules: [4],
    description: 'Consent Manager registration and obligations framework',
    status: 'upcoming',
    keyTopics: ['Consent Manager Registration', 'Consent Manager Obligations']
  },
  {
    id: 3,
    name: 'Phase 3',
    date: '2027-05-13',
    displayDate: 'May 13, 2027',
    rules: [3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 22, 23],
    description: 'Full compliance requirements including notices, security, breach notification, and data rights',
    status: 'future',
    keyTopics: [
      'Notice Requirements',
      'Security Safeguards',
      'Breach Notification',
      'Data Retention',
      'Child Protection',
      'SDF Obligations',
      'Data Principal Rights',
      'Cross-border Transfer'
    ]
  }
];

// All 23 Rules
export const rules = [
  {
    id: 1,
    number: '1',
    title: 'Short title and commencement',
    phase: 1,
    enforcementDate: '2025-11-13',
    linkedActSections: [1],
    summary: 'Names the rules and specifies the phased commencement dates for different provisions.',
    content: `(1) These rules may be called the Digital Personal Data Protection Rules, 2025.
(2) Rules 1, 2 and 17 to 21 shall come into force on the date of their publication in the Official Gazette.
(3) Rule 4 shall come into force one year after the date of publication of this Gazette.
(4) Rules 3, 5 to 16, 22 and 23 shall come into force eighteen months after the date of publication of this Gazette.`,
    keyPoints: [
      'Three-phase implementation approach',
      'Phase 1 (Active): Rules 1, 2, 17-21',
      'Phase 2: Rule 4 (1 year - Nov 2026)',
      'Phase 3: Rules 3, 5-16, 22-23 (18 months - May 2027)'
    ]
  },
  {
    id: 2,
    number: '2',
    title: 'Definitions',
    phase: 1,
    enforcementDate: '2025-11-13',
    linkedActSections: [2],
    summary: 'Defines key terms used in the rules including techno-legal measures, user account, and verifiable consent.',
    content: `(1) In these rules, unless the context otherwise requires:
(a) "Act" means the Digital Personal Data Protection Act, 2023;
(b) "techno-legal measures" means as referred to under rules 20 and 22;
(c) "user account" means the online account registered by the Data Principal with the Data Fiduciary;
(d) "verifiable consent" means a consent as specified in rule 10 or 11.`,
    keyPoints: [
      'References parent DPDP Act 2023',
      'Defines techno-legal measures',
      'Defines user account broadly',
      'Defines verifiable consent'
    ]
  },
  {
    id: 3,
    number: '3',
    title: 'Notice given by Data Fiduciary to Data Principal',
    phase: 3,
    enforcementDate: '2027-05-13',
    linkedActSections: [5],
    summary: 'Specifies requirements for notices to Data Principals including language, clarity, and content.',
    content: `The notice given by the Data Fiduciary to the Data Principal shall:
(a) be presented and understandable independently of any other information;
(b) give, in clear and plain language, a fair account including:
    (i) an itemised description of such personal data; and
    (ii) the specified purpose or purposes of processing;
(c) give the communication link for accessing the website or app, and description of other means for:
    (i) withdrawing consent with comparable ease;
    (ii) exercising rights under the Act; and
    (iii) making a complaint to the Board.`,
    keyPoints: [
      'Notice must be standalone and understandable',
      'Clear and plain language required',
      'Must itemise personal data collected',
      'Must specify purposes clearly',
      'Must provide links for consent withdrawal, rights exercise, and complaints'
    ]
  },
  {
    id: 4,
    number: '4',
    title: 'Registration and obligations of Consent Manager',
    phase: 2,
    enforcementDate: '2026-11-13',
    linkedActSections: [6],
    summary: 'Establishes framework for Consent Manager registration with the Board and their ongoing obligations.',
    content: `(1) A person fulfilling conditions in Part A of First Schedule may apply to the Board for registration.
(2) Board may make inquiry and if satisfied, register the applicant as Consent Manager.
(3) Consent Manager shall have obligations as specified in Part B of First Schedule.
(4) Board may inform of non-adherence and direct measures.
(5) Board may suspend or cancel registration to protect Data Principals.
(6) Board may require information from Consent Manager.`,
    keyPoints: [
      'Registration with Board required',
      'Conditions in First Schedule Part A',
      'Obligations in First Schedule Part B',
      'Board can suspend/cancel registration',
      'Minimum net worth Rs. 2 crore required'
    ],
    relatedSchedule: 1
  },
  {
    id: 5,
    number: '5',
    title: 'Processing for State services',
    phase: 3,
    enforcementDate: '2027-05-13',
    linkedActSections: [7],
    summary: 'Standards for processing personal data for provision of subsidies, benefits, services, certificates, licences by State.',
    content: `(1) Processing personal data under this rule shall follow standards in Second Schedule.
(2) Reference to subsidy, benefit, service, certificate, licence or permit provided:
(a) under law - exercise of State power under any law;
(b) under policy - under Central or State Government policy;
(c) using public funds - expenditure from Consolidated Fund.`,
    keyPoints: [
      'Must follow Second Schedule standards',
      'Covers statutory services',
      'Covers policy-based services',
      'Covers publicly funded services'
    ],
    relatedSchedule: 2
  },
  {
    id: 6,
    number: '6',
    title: 'Reasonable security safeguards',
    phase: 3,
    enforcementDate: '2027-05-13',
    linkedActSections: [8],
    summary: 'Mandates specific security measures including encryption, access control, logging, and backups.',
    content: `(1) Data Fiduciary shall protect personal data by taking reasonable security safeguards including:
(a) encryption, obfuscation, masking or virtual tokens;
(b) access control to computer resources;
(c) logging, monitoring and review for detecting unauthorised access;
(d) data backups for continued processing;
(e) retain logs for minimum one year;
(f) appropriate contractual provisions with Data Processors;
(g) technical and organisational measures.`,
    keyPoints: [
      'Encryption/masking required',
      'Access controls mandatory',
      'Logging and monitoring required',
      'Data backups necessary',
      'Minimum 1 year log retention',
      'Data Processor contracts must include safeguards'
    ]
  },
  {
    id: 7,
    number: '7',
    title: 'Intimation of personal data breach',
    phase: 3,
    enforcementDate: '2027-05-13',
    linkedActSections: [8],
    summary: 'Detailed requirements for breach notification to both Data Principals and the Board.',
    content: `(1) On becoming aware of breach, Data Fiduciary shall intimate to each affected Data Principal:
(a) description of breach including nature, extent and timing;
(b) consequences likely to arise;
(c) measures implemented to mitigate risk;
(d) safety measures Data Principal may take;
(e) contact information for queries.

(2) Intimate to Board:
(a) without delay - description of breach;
(b) within 72 hours - detailed information, facts, measures, findings, remedial measures, report on intimations to Data Principals.`,
    keyPoints: [
      'Immediate intimation to affected Data Principals',
      'Must describe breach nature and extent',
      'Must provide mitigation guidance',
      'Board notification without delay',
      '72-hour detailed report to Board',
      'Must report remedial measures'
    ]
  },
  {
    id: 8,
    number: '8',
    title: 'Time period for erasure',
    phase: 3,
    enforcementDate: '2027-05-13',
    linkedActSections: [8],
    summary: 'Specifies data retention periods for different classes of Data Fiduciaries and purposes.',
    content: `(1) Data Fiduciary of classes in Third Schedule shall erase data if Data Principal neither approaches for specified purpose nor exercises rights for the corresponding time period.
(2) 48 hours before erasure, inform Data Principal.
(3) Retain personal data and logs for minimum one year for purposes in Seventh Schedule.`,
    keyPoints: [
      'Retention periods per Third Schedule',
      '48-hour erasure notice required',
      'Minimum 1 year for specified purposes',
      'E-commerce, gaming, social media: 3 years'
    ],
    relatedSchedule: 3
  },
  {
    id: 9,
    number: '9',
    title: 'Contact information of person to answer questions',
    phase: 3,
    enforcementDate: '2027-05-13',
    linkedActSections: [8],
    summary: 'Requires prominent publication of DPO or contact person information.',
    content: `Every Data Fiduciary shall prominently publish on its website or app, and mention in every response to Data Principal communications, the business contact information of the Data Protection Officer, if applicable, or a person able to answer questions about processing.`,
    keyPoints: [
      'Must publish contact on website/app',
      'Include in all responses to Data Principals',
      'DPO or designated contact person'
    ]
  },
  {
    id: 10,
    number: '10',
    title: 'Verifiable consent for processing of personal data of child',
    phase: 3,
    enforcementDate: '2027-05-13',
    linkedActSections: [9],
    summary: 'Requirements for obtaining verifiable parental consent for processing child data.',
    content: `(1) Data Fiduciary shall adopt appropriate measures to ensure verifiable consent of parent is obtained, and observe due diligence by reference to:
(a) reliable identity and age details with Data Fiduciary; or
(b) details voluntarily provided by individual or through virtual token from authorised entity.

(2) "adult" = individual who has completed 18 years
"authorised entity" = entity entrusted by law/Government for identity/age issuance, includes Digital Locker service provider.`,
    keyPoints: [
      'Verifiable parental consent required',
      'Due diligence on parent identity',
      'Can use existing identity data',
      'Can use Digital Locker verification',
      'Virtual tokens acceptable'
    ]
  },
  {
    id: 11,
    number: '11',
    title: 'Verifiable consent for persons with disability',
    phase: 3,
    enforcementDate: '2027-05-13',
    linkedActSections: [9],
    summary: 'Special provisions for obtaining consent from lawful guardians of persons with disabilities.',
    content: `(1) Data Fiduciary shall observe due diligence to verify that guardian is appointed by court of law, designated authority, or local level committee under applicable guardianship law.

(2) "person with disability" includes those with long-term impairments and those suffering from autism, cerebral palsy, mental retardation, or multiple disabilities who cannot take legally binding decisions despite support.`,
    keyPoints: [
      'Guardian verification required',
      'Court-appointed guardians',
      'Designated authority appointments',
      'Local level committee appointments',
      'Covers physical, mental, intellectual impairments'
    ]
  },
  {
    id: 12,
    number: '12',
    title: 'Exemptions for child data processing',
    phase: 3,
    enforcementDate: '2027-05-13',
    linkedActSections: [9],
    summary: 'Exemptions from parental consent requirements for specified Data Fiduciary classes and purposes.',
    content: `(1) Section 9(1) and (3) shall not apply to processing by classes of Data Fiduciaries in Part A of Fourth Schedule, subject to conditions.

(2) Section 9(1) and (3) shall not apply to processing for purposes in Part B of Fourth Schedule, subject to conditions.`,
    keyPoints: [
      'Healthcare providers exempt for health services',
      'Educational institutions exempt for education/safety',
      'Creche/daycare exempt for child safety',
      'Transport providers exempt for location tracking',
      'Email account creation exempt',
      'Age verification exempt'
    ],
    relatedSchedule: 4
  },
  {
    id: 13,
    number: '13',
    title: 'Additional obligations of Significant Data Fiduciary',
    phase: 3,
    enforcementDate: '2027-05-13',
    linkedActSections: [10],
    summary: 'Enhanced obligations for SDFs including annual DPIA, audits, and data localisation.',
    content: `(1) SDF shall undertake DPIA and audit every 12 months.
(2) Furnish report to Board with significant observations.
(3) Verify that algorithmic software does not pose risk to Data Principal rights.
(4) Ensure specified personal data and traffic data is not transferred outside India.
(5) Committee including MeitY officials may recommend data for localisation.`,
    keyPoints: [
      'Annual DPIA required',
      'Annual audit required',
      'Report to Board',
      'Algorithmic accountability',
      'Data localisation for specified data',
      'Traffic data restrictions'
    ]
  },
  {
    id: 14,
    number: '14',
    title: 'Rights of Data Principals',
    phase: 3,
    enforcementDate: '2027-05-13',
    linkedActSections: [11, 12, 13, 14],
    summary: 'Procedures for Data Principals to exercise their rights and grievance redressal timelines.',
    content: `(1) Data Fiduciary and Consent Manager shall prominently publish:
(a) means for making rights requests; and
(b) required particulars for identification.

(2) Data Principal may make request using published means.
(3) 90-day maximum response time for grievance redressal.
(4) Data Principal may nominate individuals for rights exercise.
(5) "identifier" includes customer ID, application reference number, email, mobile number, licence number.`,
    keyPoints: [
      'Must publish rights exercise procedures',
      'Maximum 90 days for grievance response',
      'Nomination for death/incapacity',
      'Various identifiers acceptable'
    ]
  },
  {
    id: 15,
    number: '15',
    title: 'Transfer of personal data outside India',
    phase: 3,
    enforcementDate: '2027-05-13',
    linkedActSections: [16],
    summary: 'Requirements for cross-border data transfers subject to Central Government specifications.',
    content: `Any personal data processed by a Data Fiduciary may be transferred outside India subject to the restriction that the Data Fiduciary shall meet such requirements as the Central Government may, by general or special order, specify in respect of making such personal data available to any foreign State, or to any person or entity under control of or any agency of such a State.`,
    keyPoints: [
      'Transfer outside India permitted',
      'Subject to Central Government requirements',
      'Restrictions for foreign States',
      'Restrictions for State-controlled entities'
    ]
  },
  {
    id: 16,
    number: '16',
    title: 'Exemption for research, archiving or statistical purposes',
    phase: 3,
    enforcementDate: '2027-05-13',
    linkedActSections: [17],
    summary: 'Exemption from Act provisions for research, archiving and statistics if conducted per Second Schedule standards.',
    content: `The provisions of the Act shall not apply to the processing of personal data necessary for research, archiving or statistical purposes if it is carried on in accordance with the standards specified in Second Schedule.`,
    keyPoints: [
      'Research exemption available',
      'Archiving exemption available',
      'Statistical purposes exempt',
      'Must follow Second Schedule standards'
    ],
    relatedSchedule: 2
  },
  {
    id: 17,
    number: '17',
    title: 'Appointment of Chairperson and other Members',
    phase: 1,
    enforcementDate: '2025-11-13',
    linkedActSections: [19],
    summary: 'Search-cum-Selection Committee process for appointing Board Chairperson and Members.',
    content: `(1) Central Government shall constitute Search-cum-Selection Committee with Cabinet Secretary as chairperson for Chairperson appointment.
(2) Committee with MeitY Secretary as chairperson for Member appointments.
(3) Central Government appoints after considering recommendations.
(4) Proceedings not invalid for vacancy or defect in committee.`,
    keyPoints: [
      'Cabinet Secretary heads Chairperson selection',
      'MeitY Secretary heads Member selection',
      'Includes legal and tech experts',
      'Final appointment by Central Government'
    ]
  },
  {
    id: 18,
    number: '18',
    title: 'Salary, allowances and terms of Chairperson and Members',
    phase: 1,
    enforcementDate: '2025-11-13',
    linkedActSections: [20],
    summary: 'Compensation and terms of service for Board Chairperson and Members as per Fifth Schedule.',
    content: `The Chairperson and every other Member shall receive such salary and allowances and shall have such other terms and conditions of service as are specified in Fifth Schedule.`,
    keyPoints: [
      'Chairperson: Rs. 4.5 lakh/month',
      'Members: Rs. 4 lakh/month',
      'No house or car facility',
      'Provident fund eligible',
      'No pension or gratuity'
    ],
    relatedSchedule: 5
  },
  {
    id: 19,
    number: '19',
    title: 'Procedure for meetings of Board',
    phase: 1,
    enforcementDate: '2025-11-13',
    linkedActSections: [23],
    summary: 'Board meeting procedures, quorum, voting, and authentication of orders.',
    content: `(1) Chairperson fixes date, time, place, approves agenda.
(2) Meetings chaired by Chairperson or chosen Member.
(3) One-third membership is quorum.
(4) Decisions by majority vote, Chairperson has casting vote.
(5) Conflict of interest: Member shall not participate.
(6) Emergency: Chairperson may take action, ratified at next meeting.
(7) Circulation decisions with majority approval.
(8) Orders authenticated by Chairperson/Member/authorised individual.
(9) Inquiry completed within 6 months, extendable by 3 months.`,
    keyPoints: [
      'One-third quorum',
      'Majority voting',
      'Chairperson casting vote',
      'Conflict of interest recusal',
      'Emergency powers',
      '6-month inquiry completion target'
    ]
  },
  {
    id: 20,
    number: '20',
    title: 'Functioning of Board as digital office',
    phase: 1,
    enforcementDate: '2025-11-13',
    linkedActSections: [23, 28],
    summary: 'Board operates as digital office using techno-legal measures for virtual proceedings.',
    content: `The Board shall function as a digital office, without prejudice to its power to summon and enforce the attendance of any person and examine her on oath, may adopt techno-legal measures to conduct proceedings in a manner that does not require physical presence of any individual.`,
    keyPoints: [
      'Digital-first operations',
      'Virtual proceedings',
      'Retains summoning power',
      'Oath examination retained',
      'No mandatory physical presence'
    ]
  },
  {
    id: 21,
    number: '21',
    title: 'Terms of officers and employees of Board',
    phase: 1,
    enforcementDate: '2025-11-13',
    linkedActSections: [24],
    summary: 'Appointment terms for Board officers and employees as per Sixth Schedule.',
    content: `(1) Board may, with Central Government approval, appoint officers and employees for efficient discharge of functions.
(2) Terms and conditions as specified in Sixth Schedule.`,
    keyPoints: [
      'Central Government approval needed',
      'Deputation from Government',
      'Up to 5 years deputation',
      'Terms per Sixth Schedule'
    ],
    relatedSchedule: 6
  },
  {
    id: 22,
    number: '22',
    title: 'Appeal to Appellate Tribunal',
    phase: 3,
    enforcementDate: '2027-05-13',
    linkedActSections: [29],
    summary: 'Procedures for filing appeals against Board orders with the Appellate Tribunal.',
    content: `(1) Aggrieved person may prefer appeal to Appellate Tribunal in digital form.
(2) Appeal fee same as TRAI Act appeals, payable digitally via UPI or RBI-authorised system.
(3) Appellate Tribunal:
(a) not bound by CPC, guided by natural justice, may regulate own procedure;
(b) functions as digital office using techno-legal measures.`,
    keyPoints: [
      'Digital filing required',
      'Fee same as TRAI appeals',
      'UPI payment accepted',
      'Natural justice principles',
      'Tribunal is digital office'
    ]
  },
  {
    id: 23,
    number: '23',
    title: 'Calling for information from Data Fiduciary or intermediary',
    phase: 3,
    enforcementDate: '2027-05-13',
    linkedActSections: [36],
    summary: 'Central Government power to require information from Data Fiduciaries and intermediaries.',
    content: `(1) Central Government may, for purposes in Seventh Schedule, require Data Fiduciary or intermediary to furnish information within specified period.
(2) If disclosure affects sovereignty/integrity/security, Government may restrict disclosure to Data Principal.
(3) "intermediary" has meaning under IT Act, 2000.`,
    keyPoints: [
      'Government information requests',
      'Purposes per Seventh Schedule',
      'Sovereignty/security restrictions',
      'Includes intermediaries'
    ],
    relatedSchedule: 7
  }
];

// All 7 Schedules
export const schedules = [
  {
    id: 1,
    name: 'First Schedule',
    title: 'Consent Manager',
    linkedRule: 4,
    parts: [
      {
        id: 'A',
        title: 'Conditions for registration of Consent Manager',
        content: [
          'Company incorporated in India',
          'Sufficient technical, operational and financial capacity',
          'Sound financial condition and management',
          'Net worth not less than Rs. 2 crore',
          'Adequate capital structure and earnings prospects',
          'Directors and senior management of good reputation',
          'MoA/AoA provisions for obligations adherence',
          'Operations in interest of Data Principals',
          'Independent certification of platform and measures'
        ]
      },
      {
        id: 'B',
        title: 'Obligations of Consent Manager',
        content: [
          'Enable consent management through platform',
          'Ensure personal data not readable by Consent Manager',
          'Maintain records of consents, notices, sharing',
          'Give Data Principal access to records',
          'Maintain records for at least 7 years',
          'Develop and maintain website/app',
          'No sub-contracting or assignment',
          'Take reasonable security safeguards',
          'Act in fiduciary capacity',
          'Avoid conflict of interest with Data Fiduciaries',
          'Publish information on promoters, directors, shareholders',
          'Effective audit mechanisms',
          'Control transfer only with Board approval'
        ]
      }
    ]
  },
  {
    id: 2,
    name: 'Second Schedule',
    title: 'Standards for State processing and research exemption',
    linkedRules: [5, 16],
    standards: [
      'Processing carried out lawfully',
      'Processing for specified uses/purposes',
      'Processing limited to necessary personal data',
      'Reasonable efforts for accuracy and consistency',
      'Retention only until purpose served or legal compliance',
      'Reasonable security safeguards',
      'For State processing: intimation to Data Principal with contact info and rights exercise means',
      'Accountability of person determining purpose and means'
    ]
  },
  {
    id: 3,
    name: 'Third Schedule',
    title: 'Data retention periods',
    linkedRule: 8,
    categories: [
      {
        class: 'E-commerce entity with 2+ crore registered users in India',
        purposes: 'All purposes except user account access and virtual tokens',
        period: '3 years from last approach or Rules commencement, whichever is latest'
      },
      {
        class: 'Online gaming intermediary with 50+ lakh registered users in India',
        purposes: 'All purposes except user account access and virtual tokens',
        period: '3 years from last approach or Rules commencement, whichever is latest'
      },
      {
        class: 'Social media intermediary with 2+ crore registered users in India',
        purposes: 'All purposes except user account access and virtual tokens',
        period: '3 years from last approach or Rules commencement, whichever is latest'
      }
    ],
    notes: [
      '"e-commerce entity" as defined in Consumer Protection Act, 2019',
      '"online gaming intermediary" = enables access to one or more online games',
      '"social media intermediary" as defined in IT Rules, 2021'
    ]
  },
  {
    id: 4,
    name: 'Fourth Schedule',
    title: 'Child data processing exemptions',
    linkedRule: 12,
    parts: [
      {
        id: 'A',
        title: 'Classes of Data Fiduciaries',
        exemptions: [
          { class: 'Clinical establishment, mental health establishment, healthcare professional', condition: 'Processing for health services to protect child health' },
          { class: 'Allied healthcare professional', condition: 'Supporting healthcare treatment and referral plan' },
          { class: 'Educational institution', condition: 'Tracking and monitoring for education or child safety' },
          { class: 'Individual caring for children in creche or daycare', condition: 'Tracking and monitoring for child safety' },
          { class: 'Transport provider for educational institutions', condition: 'Location tracking during travel for safety' }
        ]
      },
      {
        id: 'B',
        title: 'Purposes',
        exemptions: [
          { purpose: 'Exercise of powers under any law for child interests', condition: 'Limited to extent necessary' },
          { purpose: 'Provision of subsidy, benefit, service for child under Section 7(b)', condition: 'Limited to extent necessary' },
          { purpose: 'Creation of email user account', condition: 'Use limited to email communication' },
          { purpose: 'Determination of real-time location', condition: 'For safety, protection or security' },
          { purpose: 'Ensuring detrimental content not accessible', condition: 'Limited to necessary extent' },
          { purpose: 'Confirmation that user is not a child', condition: 'Due diligence under Rule 10' }
        ]
      }
    ]
  },
  {
    id: 5,
    name: 'Fifth Schedule',
    title: 'Terms of Chairperson and Members',
    linkedRule: 18,
    terms: {
      salary: {
        chairperson: 'Rs. 4,50,000 per month (consolidated)',
        member: 'Rs. 4,00,000 per month (consolidated)',
        facilities: 'Without house and car facility'
      },
      providentFund: 'Eligible to contribute to Board PF',
      pension: 'Not entitled to pension or gratuity',
      travelAllowance: {
        chairperson: 'Level 17 pay matrix entitlements',
        member: 'Level 15 pay matrix entitlements'
      },
      medicalAssistance: 'Group health insurance scheme',
      leave: 'As per Central Civil Services (Leave) Rules, 1972',
      ltc: 'As per Central Civil Services (LTC) Rules, 1988',
      otherConditions: [
        'Ensure absence of conflict of interest',
        'CCS (CCA) Rules 1965 apply',
        'No sitting fee for Board meetings',
        'No sumptuary allowance'
      ]
    }
  },
  {
    id: 6,
    name: 'Sixth Schedule',
    title: 'Terms of Board officers and employees',
    linkedRule: 21,
    terms: {
      classes: [
        'Deputation from Central/State Government',
        'Deputation from autonomous/statutory bodies',
        'Deputation from public sector enterprises',
        'Deputation from National Institute for Smart Government'
      ],
      period: 'Not exceeding 5 years',
      gratuity: 'As per Payment of Gratuity Act, 1972',
      travelAllowance: 'Same as Central Government officers',
      medicalAssistance: 'Group health insurance scheme',
      leave: 'As per Central Civil Services (Leave) Rules, 1972',
      ltc: 'As per Central Civil Services (LTC) Rules, 1988',
      conduct: 'Civil Service (Conduct) Rules, 1964 apply'
    }
  },
  {
    id: 7,
    name: 'Seventh Schedule',
    title: 'Purposes for government information requests',
    linkedRules: [8, 23],
    purposes: [
      {
        purpose: 'Use by State for sovereignty, integrity, security',
        authorisedPerson: 'Officer notified under Section 17(2)(a) as designated'
      },
      {
        purpose: 'Performance of function under any law or disclosure for legal obligations',
        authorisedPerson: 'Person authorised under applicable law'
      },
      {
        purpose: 'Assessment for notifying Significant Data Fiduciary',
        authorisedPerson: 'MeitY officer designated by Secretary'
      }
    ]
  }
];

// Helper function to get rule by number
export const getRuleByNumber = (number) => {
  return rules.find(rule => rule.number === String(number));
};

// Helper function to get rules by phase
export const getRulesByPhase = (phaseId) => {
  return rules.filter(rule => rule.phase === phaseId);
};

// Helper function to get schedule by ID
export const getScheduleById = (id) => {
  return schedules.find(schedule => schedule.id === id);
};

// Helper function to get enforcement status
export const getEnforcementStatus = (enforcementDate) => {
  const today = new Date();
  const enforcement = new Date(enforcementDate);

  if (today >= enforcement) {
    return 'active';
  }

  const sixMonthsFromNow = new Date();
  sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);

  if (enforcement <= sixMonthsFromNow) {
    return 'upcoming';
  }

  return 'future';
};

export default { rulesInfo, enforcementPhases, rules, schedules };
