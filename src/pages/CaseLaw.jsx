import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Gavel, Search, ExternalLink, Loader2 } from 'lucide-react';

const CaseLaw = () => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating API fetch
    const fetchCases = async () => {
      try {
        const response = await fetch('/api/cases');
        if (!response.ok) throw new Error('API failed');
        const data = await response.json();
        setCases(data.data || []);
        setLoading(false);
      } catch (err) {
        // Mock data since /api/cases might not be accessible in local Vite dev without proxy
        setTimeout(() => {
          setCases([
            {
              id: '12345',
              title: 'Justice K.S. Puttaswamy (Retd.) vs Union Of India And Ors.',
              date: '2017-08-24',
              court: 'Supreme Court of India',
              summary: 'Landmark judgment declaring the right to privacy as a fundamental right under Article 21 of the Constitution. This forms the jurisprudential basis for the DPDP Act.',
              url: 'https://indiankanoon.org/doc/91938676/'
            },
            {
              id: '67890',
              title: 'Karmanya Singh Sareen vs Union Of India',
              date: '2016-09-23',
              court: 'Delhi High Court',
              summary: 'Case concerning WhatsApp privacy policy and data sharing with Facebook, highlighting the need for a comprehensive data protection regime prior to the DPDP Act.',
              url: 'https://indiankanoon.org/doc/13591465/'
            }
          ]);
          setLoading(false);
        }, 800);
      }
    };
    
    fetchCases();
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto text-gray-100">
      <div className="flex items-center space-x-3 mb-8">
        <Gavel className="w-8 h-8 text-blue-400" />
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          DPDP Case Law Database
        </h1>
      </div>

      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input 
          type="text" 
          placeholder="Search cases by section, keyword, or court..." 
          className="w-full bg-[rgba(26,26,40,0.6)] border border-gray-700 rounded-lg py-3 pl-10 pr-4 text-gray-200 focus:outline-none focus:border-blue-500 transition-colors"
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cases.map((caseItem, index) => (
            <motion.div
              key={caseItem.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[rgba(26,26,40,0.6)] border border-gray-800 rounded-xl p-6 hover:border-gray-600 transition-all shadow-lg backdrop-blur-sm"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-blue-300">{caseItem.title}</h3>
                <a href={caseItem.url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400">
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4">
                <span className="bg-gray-800 px-2 py-1 rounded">{caseItem.date}</span>
                <span>{caseItem.court}</span>
              </div>
              <p className="text-gray-300 line-clamp-3">
                {caseItem.summary}
              </p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CaseLaw;
