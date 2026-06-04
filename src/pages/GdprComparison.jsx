import React from 'react';
import { motion } from 'framer-motion';
import { Scale, Check, X, AlertCircle } from 'lucide-react';

const comparisonData = [
  {
    feature: "Consent",
    dpdp: "Must be free, specific, informed, unconditional, and unambiguous. Focus on notice and clear affirmative action.",
    gdpr: "Must be freely given, specific, informed, and unambiguous. Requires clear affirmative action."
  },
  {
    feature: "Children's Data",
    dpdp: "Requires verifiable parental consent for individuals under 18. Prohibition on tracking/behavioral monitoring.",
    gdpr: "Requires parental consent for children under 16 (member states can lower to 13). Special protection rules apply."
  },
  {
    feature: "Cross-border Transfer",
    dpdp: "Allowed by default unless restricted by the Government to specific notified countries (Blacklist approach).",
    gdpr: "Restricted by default. Allowed only to countries with adequate protection, or via SCCs/BCRs."
  },
  {
    feature: "Data Protection Officer",
    dpdp: "Mandatory only for Significant Data Fiduciaries (SDFs). Must be based in India.",
    gdpr: "Mandatory for public authorities, or where core activities require regular/systematic monitoring or involve special data."
  },
  {
    feature: "Max Penalty",
    dpdp: "Up to ₹250 Crores per instance for severe breaches.",
    gdpr: "Up to €20 Million or 4% of global annual turnover, whichever is higher."
  }
];

const GdprComparison = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto text-gray-100">
      <div className="flex items-center space-x-4 mb-8 justify-center">
        <Scale className="w-10 h-10 text-teal-400" />
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500">
          DPDP Act vs GDPR
        </h1>
      </div>
      
      <p className="text-center text-gray-400 max-w-3xl mx-auto mb-12">
        A high-level comparison between India's Digital Personal Data Protection Act (2023) and the EU's General Data Protection Regulation.
      </p>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[rgba(26,26,40,0.6)] border border-gray-800 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-900/50 border-b border-gray-800">
                <th className="p-5 font-semibold text-gray-300 w-1/4">Key Aspect</th>
                <th className="p-5 font-semibold text-blue-400 w-3/8 text-lg border-l border-gray-800">DPDP Act (India)</th>
                <th className="p-5 font-semibold text-purple-400 w-3/8 text-lg border-l border-gray-800">GDPR (EU)</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, index) => (
                <tr 
                  key={index} 
                  className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors"
                >
                  <td className="p-5 text-gray-300 font-medium align-top">
                    {row.feature}
                  </td>
                  <td className="p-5 text-gray-400 border-l border-gray-800 align-top leading-relaxed">
                    {row.dpdp}
                  </td>
                  <td className="p-5 text-gray-400 border-l border-gray-800 align-top leading-relaxed">
                    {row.gdpr}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
      
      <div className="mt-8 flex items-start space-x-3 bg-blue-900/20 p-4 rounded-lg border border-blue-900/50 text-blue-200/80 text-sm">
        <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
        <p>
          Disclaimer: This comparison is for informational purposes only and does not constitute legal advice. Organizations should consult legal counsel for compliance requirements specific to their operations.
        </p>
      </div>
    </div>
  );
};

export default GdprComparison;
