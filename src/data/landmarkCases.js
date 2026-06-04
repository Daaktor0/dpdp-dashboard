// Curated landmark Indian judgments on data protection & privacy.
// These always render on the Case Law page as a baseline so the
// page is useful even when the live IndianKanoon API is unavailable.
// Each entry links to the public document on indiankanoon.org.

export const caseTopics = [
  { id: 'all', label: 'All Topics' },
  { id: 'privacy', label: 'Right to Privacy' },
  { id: 'surveillance', label: 'Surveillance' },
  { id: 'aadhaar', label: 'Aadhaar / Identity' },
  { id: 'children', label: 'Children & Consent' },
  { id: 'speech', label: 'Free Speech / Internet' },
  { id: 'data-sharing', label: 'Data Sharing' }
];

export const landmarkCases = [
  {
    id: 'puttaswamy-2017',
    title: 'Justice K.S. Puttaswamy (Retd.) v. Union of India',
    citation: '(2017) 10 SCC 1',
    date: '2017-08-24',
    court: 'Supreme Court of India',
    bench: '9-Judge Constitution Bench',
    topics: ['privacy'],
    relatedSections: ['Preamble', '3', '4'],
    summary:
      'Declared the right to privacy a fundamental right intrinsic to Article 21 (life and personal liberty). This is the constitutional foundation on which the DPDP Act rests, and it set out the tests of legality, necessity and proportionality for any state intrusion into privacy.',
    url: 'https://indiankanoon.org/doc/91938676/'
  },
  {
    id: 'puttaswamy-aadhaar-2018',
    title: 'Justice K.S. Puttaswamy (Retd.) v. Union of India (Aadhaar)',
    citation: '(2019) 1 SCC 1',
    date: '2018-09-26',
    court: 'Supreme Court of India',
    bench: '5-Judge Constitution Bench',
    topics: ['aadhaar', 'privacy'],
    relatedSections: ['7', '8'],
    summary:
      'Upheld the Aadhaar scheme but read down several provisions, applying the proportionality test from the 2017 privacy judgment. Restricted private entities from demanding Aadhaar and struck down Section 57 of the Aadhaar Act, shaping how identity data may be collected and used.',
    url: 'https://indiankanoon.org/doc/127517806/'
  },
  {
    id: 'pucl-1997',
    title: "People's Union for Civil Liberties (PUCL) v. Union of India",
    citation: '(1997) 1 SCC 301',
    date: '1996-12-18',
    court: 'Supreme Court of India',
    bench: '2-Judge Bench',
    topics: ['surveillance', 'privacy'],
    relatedSections: ['3'],
    summary:
      'The telephone-tapping case. Held that unauthorised phone tapping violates the right to privacy under Article 21 and laid down procedural safeguards for lawful interception — an early articulation of privacy as a protected interest.',
    url: 'https://indiankanoon.org/doc/31276692/'
  },
  {
    id: 'karmanya-whatsapp-2016',
    title: 'Karmanya Singh Sareen v. Union of India',
    citation: 'W.P.(C) 7663/2016',
    date: '2016-09-23',
    court: 'Delhi High Court',
    bench: 'Division Bench',
    topics: ['data-sharing', 'privacy'],
    relatedSections: ['6', '8'],
    summary:
      "Challenge to WhatsApp's 2016 privacy policy and its data-sharing with Facebook. Highlighted the absence of a statutory data-protection framework and is frequently cited in debates that led to the DPDP Act.",
    url: 'https://indiankanoon.org/doc/13591465/'
  },
  {
    id: 'anuradha-bhasin-2020',
    title: 'Anuradha Bhasin v. Union of India',
    citation: '(2020) 3 SCC 637',
    date: '2020-01-10',
    court: 'Supreme Court of India',
    bench: '3-Judge Bench',
    topics: ['speech', 'surveillance'],
    relatedSections: ['3'],
    summary:
      'On internet shutdowns in Jammu & Kashmir. Held that access to the internet is protected under Article 19(1)(a) and that restrictions must satisfy proportionality and be subject to periodic review — relevant to state access to and control of digital information.',
    url: 'https://indiankanoon.org/doc/82461587/'
  },
  {
    id: 'shreya-singhal-2015',
    title: 'Shreya Singhal v. Union of India',
    citation: '(2015) 5 SCC 1',
    date: '2015-03-24',
    court: 'Supreme Court of India',
    bench: '2-Judge Bench',
    topics: ['speech'],
    relatedSections: ['3', '17'],
    summary:
      'Struck down Section 66A of the IT Act as unconstitutional and read down the intermediary-liability regime under Section 79. A cornerstone of internet-freedom jurisprudence that frames how online content and intermediaries are regulated.',
    url: 'https://indiankanoon.org/doc/110813550/'
  },
  {
    id: 'ritesh-sinha-2019',
    title: 'Ritesh Sinha v. State of Uttar Pradesh',
    citation: '(2019) 8 SCC 1',
    date: '2019-08-02',
    court: 'Supreme Court of India',
    bench: '3-Judge Bench',
    topics: ['privacy'],
    relatedSections: ['3'],
    summary:
      'Permitted courts to direct the taking of voice samples for investigation, balancing investigative needs against the right to privacy and the protection against self-incrimination — an example of the proportionality test applied to personal data.',
    url: 'https://indiankanoon.org/doc/120170581/'
  },
  {
    id: 'subhranshu-rout-2020',
    title: 'Subhranshu Rout @ Gugul v. State of Odisha',
    citation: 'BLAPL No. 4592 of 2020',
    date: '2020-11-23',
    court: 'Orissa High Court',
    bench: 'Single Judge',
    topics: ['privacy', 'children'],
    relatedSections: ['12', '13'],
    summary:
      'Discussed the "right to be forgotten" and removal of objectionable content from social media in the context of a sexual-offence case, anticipating data-erasure and correction rights now reflected in the DPDP Act.',
    url: 'https://indiankanoon.org/doc/195670691/'
  }
];

export default landmarkCases;
