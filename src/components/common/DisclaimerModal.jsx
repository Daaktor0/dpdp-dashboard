import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, CheckCircle } from 'lucide-react';

const DISCLAIMER_KEY = 'dpdp_disclaimer_acknowledged';

export default function DisclaimerModal() {
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [acknowledged, setAcknowledged] = useState(false);

  useEffect(() => {
    const isAcknowledged = sessionStorage.getItem(DISCLAIMER_KEY);
    if (!isAcknowledged) {
      setShowDisclaimer(true);
    }
  }, []);

  const handleContinue = () => {
    sessionStorage.setItem(DISCLAIMER_KEY, 'true');
    setShowDisclaimer(false);
  };

  return (
    <AnimatePresence>
      {showDisclaimer && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-full max-w-lg mx-4"
          >
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: 'rgba(26, 26, 40, 0.98)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)'
              }}
            >
              {/* Header */}
              <div className="p-6 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div
                    className="p-3 rounded-xl"
                    style={{ background: 'rgba(0, 212, 255, 0.15)' }}
                  >
                    <AlertTriangle className="text-[#00d4ff]" size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white">Legal Disclaimer</h2>
                    <p className="text-sm text-gray-400">Please read before continuing</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <p className="text-gray-300 leading-relaxed">
                  This dashboard is designed for <span className="text-white font-medium">educational and informational purposes only</span>.
                  The content presented does not constitute legal advice and should not be relied upon as such.
                </p>

                <ul className="space-y-3 text-sm text-gray-400">
                  <li className="flex items-start gap-2">
                    <span className="text-[#00d4ff] mt-1">•</span>
                    <span>This tool provides a simplified interpretation of the Digital Personal Data Protection Act, 2023</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00d4ff] mt-1">•</span>
                    <span>For legal compliance, consult a qualified legal professional</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00d4ff] mt-1">•</span>
                    <span>Information may not reflect the latest amendments or interpretations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00d4ff] mt-1">•</span>
                    <span>The creators assume no liability for decisions made based on this content</span>
                  </li>
                </ul>

                {/* Checkbox */}
                <label className="flex items-start gap-3 p-4 rounded-xl cursor-pointer transition-colors hover:bg-white/5"
                  style={{ border: '1px solid rgba(255, 255, 255, 0.08)' }}
                >
                  <input
                    type="checkbox"
                    checked={acknowledged}
                    onChange={(e) => setAcknowledged(e.target.checked)}
                    className="mt-0.5 w-5 h-5 rounded border-gray-600 text-[#00d4ff] focus:ring-[#00d4ff] focus:ring-offset-0 bg-transparent"
                  />
                  <span className="text-sm text-gray-300">
                    I understand that this dashboard is for educational purposes only and does not constitute legal advice
                  </span>
                </label>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-white/5">
                <button
                  onClick={handleContinue}
                  disabled={!acknowledged}
                  className={`
                    w-full py-3 px-6 rounded-xl font-medium
                    flex items-center justify-center gap-2 transition-all
                    ${acknowledged
                      ? 'bg-[#00d4ff] hover:bg-[#33dfff] text-black cursor-pointer'
                      : 'bg-gray-700 text-white cursor-not-allowed opacity-50'
                    }
                  `}
                >
                  <CheckCircle size={18} />
                  Continue to Dashboard
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
