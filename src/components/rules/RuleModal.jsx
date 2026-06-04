import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  X,
  Calendar,
  CheckCircle2,
  Timer,
  BookOpen,
  ExternalLink
} from 'lucide-react';

import { phaseIcons, phaseColors } from '../../utils/phaseUtils';

import { getEnforcementStatus } from '../../data/rulesStructure';



const phaseNames = {
  1: 'Phase 1 Active',
  2: 'Phase 2 (Nov 2026)',
  3: 'Phase 3 (May 2027)'
};

export default function RuleModal({ rule, onClose }) {
  if (!rule) return null;

  const PhaseIcon = phaseIcons[rule.phase];
  const status = getEnforcementStatus(rule.enforcementDate);

  const getStatusBadge = () => {
    if (status === 'active') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
          <CheckCircle2 className="w-3 h-3" />
          Active
        </span>
      );
    }
    if (status === 'upcoming') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-500/20 text-amber-400">
          <Timer className="w-3 h-3" />
          Upcoming
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-gray-500/20 text-gray-400">
        <Circle className="w-3 h-3" />
        Future
      </span>
    );
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl max-h-[85vh] overflow-hidden rounded-2xl"
          style={{
            background: 'rgba(26, 26, 40, 0.98)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div
            className="sticky top-0 z-10 p-4 border-b border-white/10"
            style={{
              background: `linear-gradient(135deg, ${phaseColors[rule.phase]}15 0%, transparent 100%)`
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${phaseColors[rule.phase]}20` }}
                >
                  <span className="text-lg font-bold" style={{ color: phaseColors[rule.phase] }}>
                    {rule.number}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h2 className="text-xl font-bold text-white">{rule.title}</h2>
                    {getStatusBadge()}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(rule.enforcementDate).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                    <span className="flex items-center gap-1" style={{ color: phaseColors[rule.phase] }}>
                      <PhaseIcon className="w-3 h-3" />
                      {phaseNames[rule.phase]}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 overflow-y-auto max-h-[calc(85vh-180px)] space-y-4">
            {/* Summary */}
            <p className="text-gray-400">{rule.summary}</p>

            {/* Content */}
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-2">Rule Content</h4>
              <pre
                className="text-sm text-gray-400 whitespace-pre-wrap font-sans p-3 rounded-lg"
                style={{ background: 'rgba(0, 0, 0, 0.3)' }}
              >
                {rule.content}
              </pre>
            </div>

            {/* Key Points */}
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-2">Key Points</h4>
              <ul className="space-y-1">
                {rule.keyPoints.map((point, i) => (
                  <li key={i} className="text-sm text-gray-400 flex items-start gap-2">
                    <span style={{ color: phaseColors[rule.phase] }}>•</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {/* Linked Act Sections */}
            {rule.linkedActSections && rule.linkedActSections.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-300 mb-2">Related Act Sections</h4>
                <div className="flex flex-wrap gap-2">
                  {rule.linkedActSections.map((section) => (
                    <Link
                      key={section}
                      to={`/navigator?section=${section}`}
                      onClick={onClose}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#00d4ff]/10 text-[#00d4ff] hover:bg-[#00d4ff]/20 transition-colors"
                    >
                      <BookOpen className="w-3 h-3" />
                      Section {section}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 p-4 border-t border-white/10 bg-[rgba(26,26,40,0.98)]">
            <div className="flex items-center justify-between">
              <Link
                to={`/rules?rule=${rule.number}`}
                onClick={onClose}
                className="inline-flex items-center gap-2 text-sm text-[#00d4ff] hover:text-white transition-colors"
              >
                View in Rules Navigator
                <ExternalLink className="w-4 h-4" />
              </Link>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-white/5 text-white hover:bg-white/10 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
