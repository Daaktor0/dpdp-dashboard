// Vercel Serverless Function - Mock Regulatory News Feed
export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const news = [
    {
      id: 'n1',
      date: '2026-05-15',
      title: 'MeitY releases draft guidelines for Consent Managers',
      source: 'Ministry of Electronics and IT',
      type: 'notification',
      url: '#',
      impact: 'High'
    },
    {
      id: 'n2',
      date: '2026-04-10',
      title: 'Data Protection Board chairperson appointment expected next month',
      source: 'The Hindu',
      type: 'news',
      url: '#',
      impact: 'Medium'
    },
    {
      id: 'n3',
      date: '2026-02-28',
      title: 'Industry associations request extension for Phase 3 compliance',
      source: 'Economic Times',
      type: 'news',
      url: '#',
      impact: 'Medium'
    }
  ];

  res.status(200).json({
    success: true,
    data: news
  });
}
