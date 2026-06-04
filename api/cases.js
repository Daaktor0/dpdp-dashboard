export default async function handler(req, res) {
  // Set CORS headers
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

  const { section } = req.query;
  const apiKey = process.env.INDIANKANOON_API_KEY || '752aa9e542e317070ba0c7c5a59d7ac1f5ab2ec3';
  
  // Base query for the Act
  let query = 'Digital Personal Data Protection Act';
  if (section && section !== 'all') {
    query += ` ${section}`;
  }

  try {
    const response = await fetch(`https://api.indiankanoon.org/search/?formInput=${encodeURIComponent(query)}&pagenum=0`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`IndianKanoon API returned ${response.status}`);
    }

    const data = await response.json();

    // Map IndianKanoon response to our frontend schema
    const cases = (data.docs || []).map(doc => {
      // Strip HTML tags from headline for a clean summary, or keep them if rendering safely
      const cleanSummary = doc.headline ? doc.headline.replace(/<[^>]+>/g, '') : 'No summary available.';
      
      return {
        id: doc.tid.toString(),
        title: doc.title ? doc.title.replace(/<[^>]+>/g, '') : 'Unknown Case',
        date: doc.publishdate || 'Unknown Date',
        court: doc.docsource || 'Unknown Court',
        summary: cleanSummary,
        url: `https://indiankanoon.org/doc/${doc.tid}/`
      };
    });

    res.status(200).json({
      success: true,
      count: cases.length,
      data: cases,
      source: 'IndianKanoon API'
    });
  } catch (error) {
    console.error('Error fetching from IndianKanoon:', error);
    
    // Fallback mock data in case of error (e.g. rate limit, bad token)
    res.status(200).json({
      success: false,
      error: error.message,
      data: [
        {
          id: '12345',
          title: 'Justice K.S. Puttaswamy (Retd.) vs Union Of India And Ors.',
          date: '2017-08-24',
          court: 'Supreme Court of India',
          summary: 'Landmark judgment declaring the right to privacy as a fundamental right under Article 21 of the Constitution. This forms the jurisprudential basis for the DPDP Act.',
          url: 'https://indiankanoon.org/doc/91938676/'
        }
      ],
      source: 'Mock Fallback'
    });
  }
}
