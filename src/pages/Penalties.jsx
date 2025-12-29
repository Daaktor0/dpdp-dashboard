import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle,
  TrendingUp,
  Info,
  ChevronDown,
  ChevronUp,
  Scale,
  Shield,
  Users,
  Baby,
  Building,
  FileText,
  Gavel
} from 'lucide-react';

import { penalties, penaltyFactors, penaltyStats } from '../data/penalties';

export default function Penalties() {
  const [selectedPenalty, setSelectedPenalty] = useState(null);
  const [showFactors, setShowFactors] = useState(false);

  const formatCurrency = (value) => {
    if (!value) return 'Variable';
    if (value >= 10000000) {
      return `₹${(value / 10000000).toFixed(0)} Cr`;
    }
    if (value >= 100000) {
      return `₹${(value / 100000).toFixed(0)} L`;
    }
    return `₹${value.toLocaleString()}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Max Penalty */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-2xl relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(233, 69, 96, 0.15) 0%, rgba(233, 69, 96, 0.05) 100%)',
            border: '1px solid rgba(233, 69, 96, 0.2)'
          }}
        >
          <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
            <AlertTriangle className="w-full h-full text-[#e94560]" />
          </div>
          <div className="relative z-10">
            <p className="text-sm text-gray-400 mb-1">Maximum Penalty</p>
            <p className="text-4xl font-bold text-[#e94560]">{penaltyStats.maxTotalDisplay}</p>
            <p className="text-sm text-gray-500 mt-2">For security safeguard breaches (S.8(5))</p>
          </div>
        </motion.div>

        {/* Min Data Principal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(67, 97, 238, 0.15) 0%, rgba(67, 97, 238, 0.05) 100%)',
            border: '1px solid rgba(67, 97, 238, 0.2)'
          }}
        >
          <p className="text-sm text-gray-400 mb-1">Data Principal Penalty</p>
          <p className="text-4xl font-bold text-[#4361ee]">{penaltyStats.minDataPrincipalDisplay}</p>
          <p className="text-sm text-gray-500 mt-2">For breach of duties under S.15</p>
        </motion.div>

        {/* Severity Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-2xl"
          style={{
            background: 'rgba(26, 26, 40, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}
        >
          <p className="text-sm text-gray-400 mb-3">Severity Distribution</p>
          <div className="flex gap-2">
            <div className="flex-1 text-center p-2 rounded-lg bg-[#e94560]/10">
              <p className="text-xl font-bold text-[#e94560]">{penaltyStats.categoryCounts.critical}</p>
              <p className="text-xs text-gray-500">Critical</p>
            </div>
            <div className="flex-1 text-center p-2 rounded-lg bg-[#f4d160]/10">
              <p className="text-xl font-bold text-[#f4d160]">{penaltyStats.categoryCounts.high}</p>
              <p className="text-xs text-gray-500">High</p>
            </div>
            <div className="flex-1 text-center p-2 rounded-lg bg-[#4361ee]/10">
              <p className="text-xl font-bold text-[#4361ee]">{penaltyStats.categoryCounts.medium + penaltyStats.categoryCounts.low}</p>
              <p className="text-xs text-gray-500">Medium/Low</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Penalty Scale Visualization */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="p-6 rounded-2xl"
        style={{
          background: 'rgba(26, 26, 40, 0.6)',
          border: '1px solid rgba(255, 255, 255, 0.08)'
        }}
      >
        <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
          <Scale className="w-5 h-5 text-[#e94560]" />
          Penalty Schedule (THE SCHEDULE - Section 33(1))
        </h3>

        <div className="space-y-4">
          {penalties.map((penalty, index) => {
            const widthPercentage = penalty.maxPenalty
              ? (penalty.maxPenalty / penaltyStats.maxTotal) * 100
              : 20;

            return (
              <motion.div
                key={penalty.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                onClick={() => setSelectedPenalty(selectedPenalty === penalty.id ? null : penalty.id)}
                className="cursor-pointer group"
              >
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-20 text-right">
                    <span className="text-xs font-mono text-gray-500">S.{penalty.section}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                        {penalty.sectionTitle}
                      </span>
                      <span
                        className="text-sm font-semibold"
                        style={{ color: penalty.color }}
                      >
                        {penalty.maxPenaltyDisplay}
                      </span>
                    </div>
                    <div className="h-8 rounded-lg bg-white/5 overflow-hidden relative">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${widthPercentage}%` }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.1, ease: 'easeOut' }}
                        className="h-full rounded-lg relative"
                        style={{
                          background: `linear-gradient(90deg, ${penalty.color}40 0%, ${penalty.color} 100%)`
                        }}
                      >
                        <div
                          className="absolute inset-0 opacity-50"
                          style={{
                            background: `repeating-linear-gradient(90deg, transparent, transparent 10px, ${penalty.color}20 10px, ${penalty.color}20 20px)`
                          }}
                        />
                      </motion.div>
                      <div className="absolute inset-0 flex items-center px-3">
                        <span className={`
                          text-xs px-2 py-0.5 rounded font-medium
                          ${penalty.severity === 'critical' ? 'bg-[#e94560]/30 text-white' : ''}
                          ${penalty.severity === 'high' ? 'bg-[#f4d160]/30 text-white' : ''}
                          ${penalty.severity === 'medium' ? 'bg-[#00d4ff]/30 text-white' : ''}
                          ${penalty.severity === 'low' ? 'bg-[#4361ee]/30 text-white' : ''}
                          ${penalty.severity === 'variable' ? 'bg-[#7209b7]/30 text-white' : ''}
                        `}>
                          {penalty.severity}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                <AnimatePresence>
                  {selectedPenalty === penalty.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden ml-24"
                    >
                      <div
                        className="p-4 rounded-xl mt-2 space-y-3"
                        style={{
                          background: 'rgba(255, 255, 255, 0.03)',
                          border: '1px solid rgba(255, 255, 255, 0.05)'
                        }}
                      >
                        <p className="text-sm text-gray-400">{penalty.description}</p>
                        <div>
                          <p className="text-xs text-gray-500 mb-2">Example Scenarios:</p>
                          <div className="flex flex-wrap gap-2">
                            {penalty.examples.map((example, idx) => (
                              <span
                                key={idx}
                                className="text-xs px-2 py-1 rounded bg-white/5 text-gray-400"
                              >
                                {example}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Scale Legend */}
        <div className="mt-6 pt-4 border-t border-white/5">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>₹0</span>
            <span>₹50 Cr</span>
            <span>₹100 Cr</span>
            <span>₹150 Cr</span>
            <span>₹200 Cr</span>
            <span>₹250 Cr</span>
          </div>
        </div>
      </motion.div>

      {/* Penalty Determination Factors */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="rounded-2xl overflow-hidden"
        style={{
          background: 'rgba(26, 26, 40, 0.6)',
          border: '1px solid rgba(255, 255, 255, 0.08)'
        }}
      >
        <button
          onClick={() => setShowFactors(!showFactors)}
          className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Gavel className="w-5 h-5 text-[#f4d160]" />
            <div>
              <h3 className="text-lg font-semibold text-white">Penalty Determination Factors</h3>
              <p className="text-sm text-gray-500">Section 33(2) - Factors considered when imposing penalties</p>
            </div>
          </div>
          <motion.div
            animate={{ rotate: showFactors ? 180 : 0 }}
            className="text-gray-500"
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </button>

        <AnimatePresence>
          {showFactors && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {penaltyFactors.map((factor, index) => (
                  <motion.div
                    key={factor.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 rounded-xl bg-white/5 hover:bg-white/8 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`
                        w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0
                        ${factor.weight === 'high' ? 'bg-[#e94560]/20' : 'bg-[#4361ee]/20'}
                      `}>
                        <span className={`
                          text-xs font-bold
                          ${factor.weight === 'high' ? 'text-[#e94560]' : 'text-[#4361ee]'}
                        `}>
                          {String.fromCharCode(97 + index)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-white text-sm mb-1">{factor.factor}</p>
                        <p className="text-xs text-gray-500">{factor.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs text-gray-600">S.{factor.section}</span>
                          <span className={`
                            text-xs px-2 py-0.5 rounded
                            ${factor.weight === 'high' ? 'bg-[#e94560]/20 text-[#e94560]' : 'bg-[#4361ee]/20 text-[#4361ee]'}
                          `}>
                            {factor.weight} weight
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Comparison Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="p-6 rounded-2xl"
        style={{
          background: 'rgba(26, 26, 40, 0.6)',
          border: '1px solid rgba(255, 255, 255, 0.08)'
        }}
      >
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-[#10b981]" />
          Penalty Comparison
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {penalties.slice(0, 4).map((penalty) => (
            <div
              key={penalty.id}
              className="p-4 rounded-xl text-center"
              style={{
                background: `${penalty.color}10`,
                border: `1px solid ${penalty.color}30`
              }}
            >
              <p className="text-xs text-gray-500 mb-2">Section {penalty.section}</p>
              <p className="text-2xl font-bold" style={{ color: penalty.color }}>
                {penalty.maxPenaltyDisplay}
              </p>
              <p className="text-xs text-gray-400 mt-2 truncate">{penalty.sectionTitle.split(' - ')[0]}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
