// DPDP Act 2023 - Complete Act Structure
export const actInfo = {
  title: 'The Digital Personal Data Protection Act, 2023',
  number: 'No. 22 of 2023',
  dateEnacted: '11th August, 2023',
  purpose: 'An Act to provide for the processing of digital personal data in a manner that recognises both the right of individuals to protect their personal data and the need to process such personal data for lawful purposes and for matters connected therewith or incidental thereto.',
  totalChapters: 9,
  totalSections: 44
};

export const chapters = [
  {
    id: 1,
    number: 'I',
    title: 'Preliminary',
    description: 'Defines the short title, commencement, key definitions, and scope of the Act',
    sections: [1, 2, 3],
    icon: 'BookOpen'
  },
  {
    id: 2,
    number: 'II',
    title: 'Obligations of Data Fiduciary',
    description: 'Establishes grounds for processing, notice requirements, consent framework, and obligations',
    sections: [4, 5, 6, 7, 8, 9, 10],
    icon: 'Building2'
  },
  {
    id: 3,
    number: 'III',
    title: 'Rights and Duties of Data Principal',
    description: 'Defines the rights of individuals and their corresponding duties',
    sections: [11, 12, 13, 14, 15],
    icon: 'Users'
  },
  {
    id: 4,
    number: 'IV',
    title: 'Special Provisions',
    description: 'Covers cross-border data transfer and exemptions',
    sections: [16, 17],
    icon: 'Globe'
  },
  {
    id: 5,
    number: 'V',
    title: 'Data Protection Board of India',
    description: 'Establishes the Board, its composition, qualifications, and administrative matters',
    sections: [18, 19, 20, 21, 22, 23, 24, 25, 26],
    icon: 'Landmark'
  },
  {
    id: 6,
    number: 'VI',
    title: 'Powers, Functions and Procedure to be followed by Board',
    description: 'Defines the powers, functions, and procedures of the Data Protection Board',
    sections: [27, 28],
    icon: 'Gavel'
  },
  {
    id: 7,
    number: 'VII',
    title: 'Appeal and Alternate Dispute Resolution',
    description: 'Covers appeals to Appellate Tribunal, mediation, and voluntary undertakings',
    sections: [29, 30, 31, 32],
    icon: 'Scale'
  },
  {
    id: 8,
    number: 'VIII',
    title: 'Penalties and Adjudication',
    description: 'Specifies penalties for breaches and adjudication process',
    sections: [33, 34],
    icon: 'AlertTriangle'
  },
  {
    id: 9,
    number: 'IX',
    title: 'Miscellaneous',
    description: 'Contains miscellaneous provisions including protection, rules, and amendments',
    sections: [35, 36, 37, 38, 39, 40, 41, 42, 43, 44],
    icon: 'FileText'
  }
];

export const sections = [
  // Chapter I - Preliminary
  {
    id: 1,
    number: '1',
    title: 'Short title and commencement',
    chapter: 1,
    summary: 'Names the Act and provides for its commencement on dates notified by the Central Government.',
    content: `(1) This Act may be called the Digital Personal Data Protection Act, 2023.
(2) It shall come into force on such date as the Central Government may, by notification in the Official Gazette, appoint and different dates may be appointed for different provisions of this Act.`,
    keyPoints: [
      'Act named "Digital Personal Data Protection Act, 2023"',
      'Comes into force on dates notified by Central Government',
      'Different provisions may commence on different dates'
    ]
  },
  {
    id: 2,
    number: '2',
    title: 'Definitions',
    chapter: 1,
    summary: 'Provides 28 key definitions including Data Principal, Data Fiduciary, Personal Data, Processing, etc.',
    content: 'Contains 28 definitions from (a) to (zb) defining key terms used throughout the Act.',
    keyPoints: [
      '28 definitions covering all key terms',
      'Data Principal = individual whose data is processed',
      'Data Fiduciary = entity determining purpose/means of processing',
      'Processing = collection, storage, use, sharing, erasure, etc.'
    ],
    definitionCount: 28
  },
  {
    id: 3,
    number: '3',
    title: 'Application of Act',
    chapter: 1,
    summary: 'Defines territorial scope - applies to digital personal data processing within India and to foreign entities serving Indians.',
    content: `Subject to the provisions of this Act, it shall—
(a) apply to the processing of digital personal data within the territory of India where the personal data is collected—
    (i) in digital form; or
    (ii) in non-digital form and digitised subsequently;
(b) also apply to processing of digital personal data outside the territory of India, if such processing is in connection with any activity related to offering of goods or services to Data Principals within the territory of India;
(c) not apply to—
    (i) personal data processed by an individual for any personal or domestic purpose; and
    (ii) personal data that is made or caused to be made publicly available.`,
    keyPoints: [
      'Applies to digital data processing within India',
      'Applies to digitised non-digital data',
      'Extra-territorial application for foreign entities serving Indians',
      'Exempts personal/domestic processing',
      'Exempts publicly available data'
    ]
  },
  // Chapter II - Obligations of Data Fiduciary
  {
    id: 4,
    number: '4',
    title: 'Grounds for processing personal data',
    chapter: 2,
    summary: 'Personal data can only be processed with consent or for certain legitimate uses, for lawful purposes.',
    content: `(1) A person may process the personal data of a Data Principal only in accordance with the provisions of this Act and for a lawful purpose—
(a) for which the Data Principal has given her consent; or
(b) for certain legitimate uses.
(2) For the purposes of this section, the expression "lawful purpose" means any purpose which is not expressly forbidden by law.`,
    keyPoints: [
      'Two grounds: consent OR legitimate uses',
      'Must be for lawful purpose (not forbidden by law)',
      'Must comply with Act provisions'
    ]
  },
  {
    id: 5,
    number: '5',
    title: 'Notice',
    chapter: 2,
    summary: 'Data Fiduciary must provide notice to Data Principal before or with consent request.',
    content: `Every request made to a Data Principal for consent shall be accompanied or preceded by a notice informing her:
(i) the personal data and the purpose for which it is proposed to be processed;
(ii) the manner in which she may exercise her rights under section 6 and section 13;
(iii) the manner in which she may make a complaint to the Board.
Notice must be available in English or any Eighth Schedule language.`,
    keyPoints: [
      'Notice must precede or accompany consent request',
      'Must specify data and purpose',
      'Must explain how to exercise rights',
      'Must explain how to complain to Board',
      'Available in English or 22 scheduled languages'
    ]
  },
  {
    id: 6,
    number: '6',
    title: 'Consent',
    chapter: 2,
    summary: 'Consent must be free, specific, informed, unconditional, unambiguous with clear affirmative action.',
    content: `Key provisions:
(1) Consent must be free, specific, informed, unconditional, unambiguous with clear affirmative action
(4) Data Principal has right to withdraw consent with ease comparable to giving consent
(7) Consent can be given/managed through Consent Manager
(10) Data Fiduciary bears burden of proving valid consent was obtained`,
    keyPoints: [
      'Free, specific, informed, unconditional, unambiguous',
      'Clear affirmative action required',
      'Limited to necessary data for specified purpose',
      'Right to withdraw with comparable ease',
      'Consent Manager can facilitate consent management',
      'Burden of proof on Data Fiduciary'
    ]
  },
  {
    id: 7,
    number: '7',
    title: 'Certain legitimate uses',
    chapter: 2,
    summary: 'Nine scenarios where processing is permitted without consent (legitimate uses).',
    content: `A Data Fiduciary may process personal data without consent for:
(a) Voluntarily provided data where principal hasn't objected
(b) State provision of subsidies, benefits, services, certificates, licences, permits
(c) State functions, sovereignty, integrity, security
(d) Legal disclosure obligations
(e) Compliance with court judgments/orders
(f) Medical emergencies (threat to life/health)
(g) Medical treatment during epidemics/outbreaks
(h) Disaster safety and assistance
(i) Employment purposes and employer safeguarding`,
    keyPoints: [
      '9 legitimate use scenarios',
      'State functions and services',
      'Legal and court compliance',
      'Medical emergencies and epidemics',
      'Disasters and public order',
      'Employment purposes'
    ],
    legitimateUses: 9
  },
  {
    id: 8,
    number: '8',
    title: 'General obligations of Data Fiduciary',
    chapter: 2,
    summary: 'Comprehensive obligations including security, accuracy, breach notification, and data erasure.',
    content: `Key obligations:
(1) Responsible for compliance regardless of agreements or Data Principal failures
(2) Data Processor engagement only under valid contract
(3) Ensure data accuracy for decisions/disclosures
(4) Implement appropriate technical and organisational measures
(5) Take reasonable security safeguards to prevent breach
(6) Notify Board and affected Data Principals of breach
(7) Erase data when consent withdrawn or purpose served
(9) Publish Data Protection Officer contact
(10) Establish grievance redressal mechanism`,
    keyPoints: [
      'Ultimate responsibility for compliance',
      'Data Processor contracts required',
      'Data accuracy for decisions',
      'Technical and organizational measures',
      'Security safeguards mandatory',
      'Breach notification to Board and individuals',
      'Data erasure when purpose served',
      'Grievance redressal mechanism required'
    ]
  },
  {
    id: 9,
    number: '9',
    title: 'Processing of personal data of children',
    chapter: 2,
    summary: 'Special protections for children including parental consent and restrictions on tracking/advertising.',
    content: `(1) Obtain verifiable consent of parent before processing child data
(2) No processing likely to cause detrimental effect on child well-being
(3) No tracking, behavioural monitoring, or targeted advertising directed at children
(4) Exemptions may be prescribed for certain classes/purposes
(5) Government may notify "verifiably safe" exemptions for specific Data Fiduciaries`,
    keyPoints: [
      'Child = under 18 years',
      'Verifiable parental consent required',
      'No detrimental processing',
      'No tracking or behavioural monitoring',
      'No targeted advertising to children',
      'Exemptions possible for safe processors'
    ]
  },
  {
    id: 10,
    number: '10',
    title: 'Additional obligations of Significant Data Fiduciary',
    chapter: 2,
    summary: 'Enhanced obligations for large/high-risk Data Fiduciaries including DPO, audits, and impact assessments.',
    content: `(1) Central Government may notify Significant Data Fiduciaries based on:
    (a) Volume and sensitivity of personal data
    (b) Risk to Data Principal rights
    (c) Impact on sovereignty and integrity of India
    (d) Risk to electoral democracy
    (e) Security of the State
    (f) Public order
(2) Significant Data Fiduciary shall:
    (a) Appoint Data Protection Officer (India-based, Board responsible)
    (b) Appoint independent data auditor
    (c) Conduct periodic Data Protection Impact Assessment
    (c)(ii) Conduct periodic audit`,
    keyPoints: [
      'Notified by Central Government',
      'Based on volume, sensitivity, risk factors',
      'Must appoint DPO (India-based)',
      'Must appoint independent auditor',
      'Periodic DPIA required',
      'Periodic audits required'
    ]
  },
  // Chapter III - Rights and Duties of Data Principal
  {
    id: 11,
    number: '11',
    title: 'Right to access information about personal data',
    chapter: 3,
    summary: 'Data Principals can request summary of their data, processing activities, and sharing details.',
    content: `Data Principal has right to obtain:
(a) Summary of personal data being processed and processing activities
(b) Identities of all Data Fiduciaries and Processors with whom data was shared
(c) Other prescribed information
Exception: Does not apply to sharing for prevention/detection/investigation of offences.`,
    keyPoints: [
      'Right to data summary',
      'Right to know processing activities',
      'Right to know who data was shared with',
      'Exception for law enforcement sharing'
    ]
  },
  {
    id: 12,
    number: '12',
    title: 'Right to correction and erasure of personal data',
    chapter: 3,
    summary: 'Data Principals can request correction, completion, updating, and erasure of their data.',
    content: `(1) Right to correction, completion, updating and erasure
(2) Data Fiduciary shall correct inaccurate, complete incomplete, update personal data
(3) Data Principal may request erasure; Fiduciary shall erase unless retention necessary for specified purpose or legal compliance`,
    keyPoints: [
      'Right to correction of inaccurate data',
      'Right to completion of incomplete data',
      'Right to updating of data',
      'Right to erasure (with limitations)'
    ]
  },
  {
    id: 13,
    number: '13',
    title: 'Right of grievance redressal',
    chapter: 3,
    summary: 'Data Principals have right to grievance redressal from Data Fiduciary before approaching Board.',
    content: `(1) Right to grievance redressal from Data Fiduciary or Consent Manager
(2) Must respond within prescribed period
(3) Data Principal must exhaust this remedy before approaching Board`,
    keyPoints: [
      'Grievance mechanism must be available',
      'Response within prescribed timeline',
      'Must exhaust before approaching Board'
    ]
  },
  {
    id: 14,
    number: '14',
    title: 'Right to nominate',
    chapter: 3,
    summary: 'Data Principals can nominate someone to exercise their rights upon death or incapacity.',
    content: `(1) Right to nominate any individual to exercise rights in case of death or incapacity
(2) "Incapacity" means inability to exercise rights due to unsoundness of mind or infirmity of body`,
    keyPoints: [
      'Nomination for death or incapacity',
      'Nominee exercises Data Principal rights',
      'Incapacity = mental or physical inability'
    ]
  },
  {
    id: 15,
    number: '15',
    title: 'Duties of Data Principal',
    chapter: 3,
    summary: 'Data Principals must not impersonate, suppress information, file false complaints, or provide inauthentic data.',
    content: `Data Principal shall:
(a) Comply with applicable laws while exercising rights
(b) Not impersonate another person
(c) Not suppress material information for government documents
(d) Not register false or frivolous grievance/complaint
(e) Furnish only verifiably authentic information for correction/erasure`,
    keyPoints: [
      'Comply with laws',
      'No impersonation',
      'No suppression of material information',
      'No false/frivolous complaints',
      'Only authentic information for corrections'
    ],
    duties: 5
  },
  // Chapter IV - Special Provisions
  {
    id: 16,
    number: '16',
    title: 'Processing of personal data outside India',
    chapter: 4,
    summary: 'Central Government may restrict transfer to certain countries; higher protection laws prevail.',
    content: `(1) Central Government may restrict transfer to notified countries/territories
(2) Other laws providing higher protection shall prevail`,
    keyPoints: [
      'Government can restrict cross-border transfers',
      'Restricted countries notified',
      'Higher protection laws take precedence'
    ]
  },
  {
    id: 17,
    number: '17',
    title: 'Exemptions',
    chapter: 4,
    summary: 'Various exemptions including for legal proceedings, state security, research, and startups.',
    content: `(1) Chapter II (except 8(1),(5)) and Chapter III and Section 16 don't apply for:
(a) Enforcing legal rights/claims
(b) Court/tribunal/regulatory functions
(c) Prevention/detection/investigation/prosecution of offences
(d) Foreign contracts for non-Indian Data Principals
(e) M&A/restructuring schemes
(f) Loan default assessment

(2) Complete exemption for:
(a) Notified state instrumentalities for security/sovereignty
(b) Research/archiving/statistics (with standards)

(3) Startups may be exempted from sections 5, 8(3), 8(7), 10, 11
(4) State processing exemptions
(5) Five-year exemption power for Data Fiduciary classes`,
    keyPoints: [
      'Legal proceedings exemption',
      'Court/regulatory functions exemption',
      'Law enforcement exemption',
      'State security exemption',
      'Research and statistics exemption',
      'Startup exemptions possible',
      '5-year transitional exemption power'
    ]
  },
  // Chapter V - Data Protection Board
  {
    id: 18,
    number: '18',
    title: 'Establishment of Board',
    chapter: 5,
    summary: 'Establishes the Data Protection Board of India as a body corporate.',
    content: `(1) Board established on date notified by Central Government
(2) Body corporate with perpetual succession and common seal
(3) Headquarters at place notified by Central Government`,
    keyPoints: [
      'Data Protection Board of India established',
      'Body corporate status',
      'Perpetual succession',
      'Headquarters as notified'
    ]
  },
  {
    id: 19,
    number: '19',
    title: 'Composition and qualifications for appointment of Chairperson and Members',
    chapter: 5,
    summary: 'Board consists of Chairperson and Members with expertise in relevant fields.',
    content: `(1) Chairperson and Members as notified by Central Government
(2) Appointed in prescribed manner
(3) Must have ability, integrity, standing with expertise in data governance, law, technology, etc.
At least one member shall be expert in law.`,
    keyPoints: [
      'Chairperson + Members',
      'Expertise in data governance, law, technology required',
      'At least one legal expert mandatory'
    ]
  },
  {
    id: 20,
    number: '20',
    title: 'Salary, allowances payable to and term of office',
    chapter: 5,
    summary: 'Two-year term with eligibility for reappointment; terms cannot be varied disadvantageously.',
    content: `(1) Salary, allowances as prescribed, not varied to disadvantage after appointment
(2) Two-year term, eligible for re-appointment`,
    keyPoints: [
      '2-year term',
      'Eligible for re-appointment',
      'Terms cannot be varied adversely'
    ]
  },
  {
    id: 21,
    number: '21',
    title: 'Disqualifications for appointment and continuation as Chairperson and Members of Board',
    chapter: 5,
    summary: 'Disqualifications include insolvency, conviction, incapacity, conflict of interest, and abuse of position.',
    content: `Disqualified if:
(a) Adjudged insolvent
(b) Convicted of offence involving moral turpitude
(c) Physically or mentally incapable
(d) Financial/other prejudicial interest
(e) Abused position prejudicial to public interest
Removal only after opportunity of being heard.`,
    keyPoints: [
      'Insolvency disqualifies',
      'Moral turpitude conviction disqualifies',
      'Incapacity disqualifies',
      'Conflict of interest disqualifies',
      'Hearing required before removal'
    ]
  },
  {
    id: 22,
    number: '22',
    title: 'Resignation by Members and filling of vacancy',
    chapter: 5,
    summary: 'Resignation process and 1-year cooling off period before joining former parties.',
    content: `(1) Resignation effective on Government permission or 3 months from notice
(2) Vacancies filled by fresh appointment
(3) One-year cooling off before joining Data Fiduciary against whom proceedings were initiated`,
    keyPoints: [
      'Resignation with 3-month notice',
      'Vacancies filled by fresh appointment',
      '1-year post-employment restriction'
    ]
  },
  {
    id: 23,
    number: '23',
    title: 'Proceedings of Board',
    chapter: 5,
    summary: 'Board procedures including digital meetings; senior-most member acts when Chairperson unavailable.',
    content: `(1) Procedure including digital meetings as prescribed
(2) Acts not invalid merely for vacancy/defect in constitution/appointment/procedure
(3) Senior-most Member acts as Chairperson when unavailable`,
    keyPoints: [
      'Digital meetings permitted',
      'Proceedings not invalid for procedural defects',
      'Senior member acts for absent Chairperson'
    ]
  },
  {
    id: 24,
    number: '24',
    title: 'Officers and employees of Board',
    chapter: 5,
    summary: 'Board may appoint officers and employees with Central Government approval.',
    content: 'Board may appoint officers and employees with previous approval of Central Government on prescribed terms.',
    keyPoints: [
      'Central Government approval needed',
      'Terms as prescribed'
    ]
  },
  {
    id: 25,
    number: '25',
    title: 'Members and officers to be public servants',
    chapter: 5,
    summary: 'Board members and officers are public servants under IPC Section 21.',
    content: 'Chairperson, Members, officers and employees are public servants under section 21 of IPC (corresponding to Section 2(24) of Bharatiya Nyaya Sanhita, 2023).',
    keyPoints: [
      'Public servant status',
      'IPC Section 21 applies'
    ]
  },
  {
    id: 26,
    number: '26',
    title: 'Powers of Chairperson',
    chapter: 5,
    summary: 'Chairperson has superintendence powers and can delegate to Members.',
    content: `Chairperson powers:
(a) General superintendence and direction on administrative matters
(b) Authorize officer to scrutinise intimations/complaints
(c) Authorize performance by individual/groups of Members and allocate proceedings`,
    keyPoints: [
      'Administrative superintendence',
      'Delegation to officers',
      'Allocation of proceedings to Members'
    ]
  },
  // Chapter VI - Powers, Functions and Procedure
  {
    id: 27,
    number: '27',
    title: 'Powers and functions of Board',
    chapter: 6,
    summary: 'Board handles breach intimations, complaints, inquiries, and imposes penalties.',
    content: `Board powers and functions:
(a) On breach intimation: direct remedial measures, inquire, impose penalty
(b) On Data Principal complaint: inquire into breach of obligations/rights, impose penalty
(c) On Consent Manager complaint: inquire and impose penalty
(d) On Consent Manager registration breach: inquire and impose penalty
(e) On Central Government reference re intermediary: inquire and impose penalty

(2) May issue binding directions after hearing
(3) May modify/suspend/withdraw/cancel directions on representation`,
    keyPoints: [
      'Handles breach intimations',
      'Handles Data Principal complaints',
      'Handles Consent Manager issues',
      'Can issue binding directions',
      'Can impose penalties'
    ]
  },
  {
    id: 28,
    number: '28',
    title: 'Procedure to be followed by Board',
    chapter: 6,
    summary: 'Board functions as digital office following natural justice principles with civil court powers.',
    content: `(1) Independent body, digital office by design
(3) Determine if sufficient grounds to proceed
(4) May close for insufficient grounds
(5) May inquire into affairs if sufficient grounds
(6) Follow natural justice principles
(7) Civil court powers for summoning, evidence, inspection
(8) Cannot prevent premises access or take equipment affecting daily functioning
(10) May issue interim orders
(11) After hearing, close or proceed to penalties
(12) May warn or impose costs for false/frivolous complaints`,
    keyPoints: [
      'Functions as digital office',
      'Natural justice principles apply',
      'Civil court-like powers',
      'Can issue interim orders',
      'Can penalize frivolous complaints'
    ]
  },
  // Chapter VII - Appeal and ADR
  {
    id: 29,
    number: '29',
    title: 'Appeal to Appellate Tribunal',
    chapter: 7,
    summary: 'Appeals to TDSAT within 60 days; disposal targeted within 6 months.',
    content: `(1) Appeal to Appellate Tribunal (TDSAT) against Board orders
(2) Within 60 days, in prescribed form with fee
(3) May entertain late appeals with sufficient cause
(4) May confirm, modify, or set aside Board order
(6) Endeavour to dispose within 6 months
(10) Appellate Tribunal functions as digital office`,
    keyPoints: [
      'Appeal to TDSAT',
      '60-day appeal period',
      'Late appeals with cause',
      '6-month disposal target',
      'Digital proceedings'
    ]
  },
  {
    id: 30,
    number: '30',
    title: 'Orders passed by Appellate Tribunal to be executable as decree',
    chapter: 7,
    summary: 'Tribunal orders executable as civil court decrees.',
    content: `(1) Tribunal order executable as decree of civil court
(2) May transmit to civil court for execution`,
    keyPoints: [
      'Executable as civil decree',
      'Can be executed by civil court'
    ]
  },
  {
    id: 31,
    number: '31',
    title: 'Alternate dispute resolution',
    chapter: 7,
    summary: 'Board may direct mediation for suitable complaints.',
    content: 'Board may direct parties to attempt mediation through mutually agreed mediator or as per law.',
    keyPoints: [
      'Mediation option available',
      'Mutually agreed mediator',
      'Alternative to formal proceedings'
    ]
  },
  {
    id: 32,
    number: '32',
    title: 'Voluntary undertaking',
    chapter: 7,
    summary: 'Board can accept voluntary undertakings; breach treated as Act violation.',
    content: `(1) Board may accept voluntary undertaking at any stage
(2) May include time-bound actions or restraints
(3) May vary terms with consent
(4) Acceptance bars further proceedings on same matter
(5) Breach of undertaking = breach of Act, leads to penalties`,
    keyPoints: [
      'Voluntary commitments possible',
      'Bars further proceedings',
      'Breach = Act violation',
      'Can be varied with consent'
    ]
  },
  // Chapter VIII - Penalties
  {
    id: 33,
    number: '33',
    title: 'Penalties',
    chapter: 8,
    summary: 'Penalties up to ₹250 crore based on breach severity, nature, mitigation, and impact.',
    content: `(1) Board may impose Schedule penalties for significant breach
(2) Factors for determining penalty:
(a) Nature, gravity and duration
(b) Type and nature of data affected
(c) Repetitive nature
(d) Gain/loss resulting
(e) Mitigation actions taken
(f) Proportionality and deterrence
(g) Impact on person`,
    keyPoints: [
      'Penalties per Schedule',
      'Considers breach severity',
      'Considers data type affected',
      'Considers repetition',
      'Considers gain/loss',
      'Considers mitigation efforts',
      'Must be proportionate'
    ]
  },
  {
    id: 34,
    number: '34',
    title: 'Crediting sums realised by way of penalties to Consolidated Fund of India',
    chapter: 8,
    summary: 'All penalty amounts credited to Consolidated Fund of India.',
    content: 'All sums realised by way of penalties shall be credited to the Consolidated Fund of India.',
    keyPoints: [
      'Penalties go to Consolidated Fund',
      'Government revenue'
    ]
  },
  // Chapter IX - Miscellaneous
  {
    id: 35,
    number: '35',
    title: 'Protection of action taken in good faith',
    chapter: 9,
    summary: 'No suit against Government or Board for good faith actions.',
    content: 'No suit, prosecution or legal proceedings against Central Government, Board, Chairperson, Members, officers, employees for good faith actions under this Act.',
    keyPoints: [
      'Good faith protection',
      'Covers all Board personnel',
      'Covers Central Government'
    ]
  },
  {
    id: 36,
    number: '36',
    title: 'Power to call for information',
    chapter: 9,
    summary: 'Central Government may require information from Board, Data Fiduciaries, or intermediaries.',
    content: 'Central Government may require Board and any Data Fiduciary or intermediary to furnish information.',
    keyPoints: [
      'Government information power',
      'Applies to Board and entities'
    ]
  },
  {
    id: 37,
    number: '37',
    title: 'Power of Central Government to issue directions',
    chapter: 9,
    summary: 'Government can direct blocking of access for repeat offender Data Fiduciaries.',
    content: `(1) On Board reference for multiple penalty impositions, Government may direct blocking of Data Fiduciary's information for public interest
(2) Intermediaries must comply with such directions`,
    keyPoints: [
      'Blocking power for repeat offenders',
      'Requires Board reference',
      'Public interest basis',
      'Intermediary compliance mandatory'
    ]
  },
  {
    id: 38,
    number: '38',
    title: 'Consistency with other laws',
    chapter: 9,
    summary: 'Act is additional to other laws; prevails in case of conflict.',
    content: `(1) This Act is in addition to, not in derogation of, other laws
(2) In case of conflict, this Act prevails`,
    keyPoints: [
      'Supplementary to other laws',
      'Prevails in conflicts'
    ]
  },
  {
    id: 39,
    number: '39',
    title: 'Bar of jurisdiction',
    chapter: 9,
    summary: 'Civil courts have no jurisdiction where Board is empowered.',
    content: 'No civil court jurisdiction for matters where Board is empowered; no injunctions against Board actions.',
    keyPoints: [
      'Civil courts excluded',
      'No injunctions against Board'
    ]
  },
  {
    id: 40,
    number: '40',
    title: 'Power to make rules',
    chapter: 9,
    summary: 'Central Government can make rules for implementing the Act.',
    content: 'Central Government may make rules by notification with prior publication for all matters requiring prescription.',
    keyPoints: [
      'Rule-making power',
      'Prior publication required',
      '26 specific rule-making areas listed'
    ]
  },
  {
    id: 41,
    number: '41',
    title: 'Laying of rules and certain notifications',
    chapter: 9,
    summary: 'Rules and notifications must be laid before Parliament.',
    content: 'Rules and section 16/42 notifications must be laid before Parliament for 30 days for modification/annulment.',
    keyPoints: [
      'Parliamentary oversight',
      '30-day review period',
      'Modification/annulment possible'
    ]
  },
  {
    id: 42,
    number: '42',
    title: 'Power to amend Schedule',
    chapter: 9,
    summary: 'Government can amend penalty schedule but cannot more than double penalties.',
    content: `(1) Central Government may amend Schedule by notification, but penalties cannot exceed double original
(2) Amendments effective from notification date`,
    keyPoints: [
      'Schedule amendment power',
      'Maximum 2x original penalty',
      'By notification'
    ]
  },
  {
    id: 43,
    number: '43',
    title: 'Power to remove difficulties',
    chapter: 9,
    summary: 'Government can issue orders to remove difficulties within three years.',
    content: `(1) Government may issue orders to remove difficulties
(2) Only within 3 years of commencement
(3) Orders laid before Parliament`,
    keyPoints: [
      'Difficulty removal power',
      '3-year limit',
      'Parliamentary laying required'
    ]
  },
  {
    id: 44,
    number: '44',
    title: 'Amendments to certain Acts',
    chapter: 9,
    summary: 'Consequential amendments to TRAI Act, IT Act, and RTI Act.',
    content: `Amendments to:
(1) TRAI Act 1997 - adds DPDP Act to Appellate Tribunal jurisdiction
(2) IT Act 2000 - omits section 43A, adds DPDP to section 81 proviso, omits section 87(2)(ob)
(3) RTI Act 2005 - section 8(1)(j) simplified to "personal information"`,
    keyPoints: [
      'TRAI Act amended for appeals',
      'IT Act Section 43A omitted',
      'RTI Act privacy exemption simplified'
    ]
  }
];

export default { actInfo, chapters, sections };
