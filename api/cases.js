// Vercel Serverless Function — Case Law search via the official IndianKanoon API.
//
// Auth: set INDIANKANOON_API_KEY in your Vercel project env vars.
//   IMPORTANT: do NOT hardcode the token here. A previously committed token
//   was exposed in git history and should be rotated in your IndianKanoon
//   account settings.
//
// Query params:
//   q       - free-text search terms (optional)
//   mode    - "recent" (date-restricted) | default (relevance)
//   section - optional Act section to bias the query
//   page    - page number (IndianKanoon pages start at 0)

const BASE_TERMS =
  'Digital Personal Data Protection ANDD (privacy ORR "personal data" ORR "data protection")';

// A result is only kept if its title/summary touches one of these topics.
// Keeps the feed strictly about data protection / privacy / breaches and the
// laws that surround them, even when IndianKanoon's ranking returns tangents.
const RELEVANCE_TERMS = [
  'data protection',
  'personal data',
  'data breach',
  'data privacy',
  'privacy',
  'right to privacy',
  'puttaswamy',
  'aadhaar',
  'information technology act',
  'it act',
  'sensitive personal',
  'data principal',
  'data fiduciary',
  'data protection board',
  'dpdp',
  'surveillance',
  'interception',
  'right to be forgotten',
  'data localis',
  'data localiz',
  'cyber',
  'identity theft',
  'unauthorised access',
  'unauthorized access'
];

function isRelevant(c) {
  const hay = `${c.title} ${c.summary} ${c.court}`.toLowerCase();
  return RELEVANCE_TERMS.some((term) => hay.includes(term));
}

function buildFormInput({ q, mode, section }) {
  const parts = [];

  if (q && q.trim()) {
    parts.push(q.trim());
    parts.push('ANDD (privacy ORR "data protection" ORR "personal data")');
  } else {
    parts.push(BASE_TERMS);
  }

  if (section && section !== 'all') {
    parts.push(`ANDD "Section ${section}"`);
  }

  parts.push('doctypes: judgments');

  if (mode === 'recent') {
    const from = new Date();
    from.setFullYear(from.getFullYear() - 4);
    const dd = String(from.getDate()).padStart(2, '0');
    const mm = String(from.getMonth() + 1).padStart(2, '0');
    parts.push(`fromdate: ${dd}-${mm}-${from.getFullYear()}`);
  }

  return parts.join(' ');
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { q = '', mode = '', section = '', page = '0' } = req.query;
  const apiKey = process.env.INDIANKANOON_API_KEY;

  if (!apiKey) {
    res.status(200).json({
      success: false,
      configured: false,
      error: 'INDIANKANOON_API_KEY is not set on the server.',
      data: [],
      source: 'none'
    });
    return;
  }

  const formInput = buildFormInput({ q, mode, section });
  const pageNum = Number.isNaN(parseInt(page, 10)) ? 0 : parseInt(page, 10);
  const apiUrl = `https://api.indiankanoon.org/search/?formInput=${encodeURIComponent(
    formInput
  )}&pagenum=${pageNum}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { Authorization: `Token ${apiKey}`, Accept: 'application/json' }
    });

    if (!response.ok) {
      throw new Error(`IndianKanoon API returned ${response.status}`);
    }

    const data = await response.json();
    const clean = (s) => (s ? String(s).replace(/<[^>]+>/g, '').trim() : '');

    const mapped = (data.docs || []).map((doc) => ({
      id: doc.tid != null ? doc.tid.toString() : Math.random().toString(36).slice(2),
      title: clean(doc.title) || 'Untitled judgment',
      date: doc.publishdate || '',
      court: clean(doc.docsource) || 'Unknown Court',
      summary: clean(doc.headline) || 'No summary available.',
      url: doc.tid != null ? `https://indiankanoon.org/doc/${doc.tid}/` : 'https://indiankanoon.org/',
      source: 'live'
    }));

    // Keep only on-topic judgments (data protection / privacy / breach / related law).
    const cases = mapped.filter(isRelevant);

    res.status(200).json({
      success: true,
      configured: true,
      count: cases.length,
      rawCount: mapped.length,
      total: data.found || cases.length,
      query: formInput,
      data: cases,
      source: 'IndianKanoon API'
    });
  } catch (error) {
    console.error('Error fetching from IndianKanoon:', error);
    res.status(200).json({
      success: false,
      configured: true,
      error: error.message,
      data: [],
      source: 'error'
    });
  }
}
