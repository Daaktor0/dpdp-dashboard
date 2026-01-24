import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import {
  User,
  Building2,
  Building,
  Server,
  KeyRound,
  Landmark,
  ChevronRight,
  Shield,
  FileText,
  AlertCircle,
  CheckCircle2,
  UserCog,
  ClipboardCheck,
  Search,
  Eye,
  Edit,
  MessageSquare,
  UserPlus,
  XCircle,
  ScrollText,
  ExternalLink
} from 'lucide-react';

import { stakeholders, stakeholderRelationships } from '../data/stakeholders';
import { getRuleByNumber } from '../data/rulesStructure';
import RuleModal from '../components/rules/RuleModal';

const iconMap = {
  User,
  Building2,
  Building,
  Server,
  KeyRound,
  Landmark,
  UserCog,
  ClipboardCheck,
  FileSearch: Search,
  Search,
  Eye,
  Edit,
  MessageSquare,
  UserPlus,
  XCircle
};

export default function Stakeholders() {
  const [searchParams] = useSearchParams();
  const initialId = searchParams.get('id');

  const [selectedStakeholder, setSelectedStakeholder] = useState(
    initialId || 'data-principal'
  );
  const [selectedRule, setSelectedRule] = useState(null);

  const currentStakeholder = stakeholders.find(s => s.id === selectedStakeholder);

  return (
    <div className="space-y-6">
      {/* Stakeholder Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stakeholders.map((stakeholder) => {
          const Icon = iconMap[stakeholder.icon] || User;
          const isSelected = selectedStakeholder === stakeholder.id;

          return (
            <motion.button
              key={stakeholder.id}
              onClick={() => setSelectedStakeholder(stakeholder.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`
                relative p-4 rounded-2xl text-left transition-all
                ${isSelected
                  ? 'ring-2 ring-offset-2 ring-offset-[#0a0a0f]'
                  : ''
                }
              `}
              style={{
                background: isSelected
                  ? `linear-gradient(135deg, ${stakeholder.color}20 0%, transparent 100%)`
                  : 'rgba(26, 26, 40, 0.6)',
                border: `1px solid ${isSelected ? stakeholder.color + '40' : 'rgba(255, 255, 255, 0.08)'}`,
                '--tw-ring-color': stakeholder.color
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                style={{ background: `${stakeholder.color}20` }}
              >
                <Icon className="w-5 h-5" style={{ color: stakeholder.color }} />
              </div>
              <h3 className="font-semibold text-white text-sm mb-1">{stakeholder.shortName}</h3>
              <p className="text-xs text-gray-500">S.{stakeholder.section}</p>
            </motion.button>
          );
        })}
      </div>

      {/* Selected Stakeholder Details */}
      <AnimatePresence mode="wait">
        {currentStakeholder && (
          <motion.div
            key={currentStakeholder.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* Main Info */}
            <div
              className="lg:col-span-2 rounded-2xl p-6"
              style={{
                background: 'rgba(26, 26, 40, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              {/* Header */}
              <div className="flex items-start gap-4 mb-6">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{ background: `${currentStakeholder.color}20` }}
                >
                  {(() => {
                    const Icon = iconMap[currentStakeholder.icon] || User;
                    return <Icon className="w-7 h-7" style={{ color: currentStakeholder.color }} />;
                  })()}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{currentStakeholder.name}</h2>
                  <p className="text-gray-400 mt-1">{currentStakeholder.definition}</p>
                  <span
                    className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      background: `${currentStakeholder.color}20`,
                      color: currentStakeholder.color
                    }}
                  >
                    Section {currentStakeholder.section}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-300 mb-6">{currentStakeholder.description}</p>

              {/* Implementing Rules (DPDP Rules 2025) */}
              {currentStakeholder.implementingRules && currentStakeholder.implementingRules.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                    <div className="w-1 h-4 rounded-full bg-[#10b981]" />
                    Implementing Rules (DPDP Rules 2025)
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {currentStakeholder.implementingRules.map((ruleNum) => {
                      const rule = getRuleByNumber(ruleNum);
                      if (!rule) return null;
                      return (
                        <button
                          key={ruleNum}
                          onClick={() => setSelectedRule(rule)}
                          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#10b981]/10 border border-[#10b981]/20 hover:bg-[#10b981]/20 transition-colors group text-left"
                        >
                          <ScrollText className="w-4 h-4 text-[#10b981]" />
                          <span className="text-sm text-white">Rule {rule.number}</span>
                          <span className="text-xs text-gray-500 hidden md:inline">{rule.title}</span>
                          <ExternalLink className="w-3 h-3 text-gray-500 group-hover:text-[#10b981]" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Includes */}
              {currentStakeholder.includes && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                    <div className="w-1 h-4 rounded-full" style={{ background: currentStakeholder.color }} />
                    Includes
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {currentStakeholder.includes.map((item, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 rounded-lg text-sm bg-white/5 text-gray-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Criteria (for SDF) */}
              {currentStakeholder.criteria && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                    <div className="w-1 h-4 rounded-full" style={{ background: currentStakeholder.color }} />
                    Notification Criteria
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {currentStakeholder.criteria.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 p-3 rounded-lg bg-white/5"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#10b981]" />
                        <span className="text-sm text-gray-300">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Characteristics (for Consent Manager and Board) */}
              {currentStakeholder.characteristics && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                    <div className="w-1 h-4 rounded-full" style={{ background: currentStakeholder.color }} />
                    Characteristics
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {currentStakeholder.characteristics.map((item, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 rounded-lg text-sm bg-white/5 text-gray-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Rights/Obligations Panel */}
            <div className="space-y-4">
              {/* Rights */}
              {currentStakeholder.rights && (
                <div
                  className="rounded-2xl p-5"
                  style={{
                    background: 'rgba(26, 26, 40, 0.6)',
                    border: '1px solid rgba(255, 255, 255, 0.08)'
                  }}
                >
                  <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-[#10b981]" />
                    Rights ({currentStakeholder.rights.length})
                  </h3>
                  <div className="space-y-3">
                    {currentStakeholder.rights.map((right) => {
                      const Icon = iconMap[right.icon] || Shield;
                      return (
                        <motion.div
                          key={right.id}
                          whileHover={{ x: 4 }}
                          className="p-3 rounded-xl bg-white/5 hover:bg-white/8 transition-colors"
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <Icon className="w-4 h-4 text-[#10b981]" />
                            <span className="font-medium text-white text-sm">{right.title}</span>
                          </div>
                          <p className="text-xs text-gray-500 ml-6">{right.description}</p>
                          <span className="text-xs text-gray-600 ml-6">Section {right.section}</span>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Duties */}
              {currentStakeholder.duties && (
                <div
                  className="rounded-2xl p-5"
                  style={{
                    background: 'rgba(26, 26, 40, 0.6)',
                    border: '1px solid rgba(255, 255, 255, 0.08)'
                  }}
                >
                  <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#f59e0b]" />
                    Duties ({currentStakeholder.duties.length})
                  </h3>
                  <div className="space-y-3">
                    {currentStakeholder.duties.map((duty) => (
                      <motion.div
                        key={duty.id}
                        whileHover={{ x: 4 }}
                        className="p-3 rounded-xl bg-white/5 hover:bg-white/8 transition-colors"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <AlertCircle className="w-4 h-4 text-[#f59e0b]" />
                          <span className="font-medium text-white text-sm">{duty.title}</span>
                        </div>
                        <p className="text-xs text-gray-500 ml-6">{duty.description}</p>
                        <span className="text-xs text-gray-600 ml-6">Section {duty.section}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Obligations */}
              {currentStakeholder.obligations && (
                <div
                  className="rounded-2xl p-5"
                  style={{
                    background: 'rgba(26, 26, 40, 0.6)',
                    border: '1px solid rgba(255, 255, 255, 0.08)'
                  }}
                >
                  <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                    <ClipboardCheck className="w-4 h-4 text-[#00d4ff]" />
                    Obligations ({currentStakeholder.obligations.length})
                  </h3>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {currentStakeholder.obligations.map((obligation) => (
                      <motion.div
                        key={obligation.id}
                        whileHover={{ x: 4 }}
                        className="p-3 rounded-xl bg-white/5 hover:bg-white/8 transition-colors"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-2 h-2 rounded-full bg-[#00d4ff]" />
                          <span className="font-medium text-white text-sm">{obligation.title}</span>
                        </div>
                        <p className="text-xs text-gray-500 ml-4">{obligation.description}</p>
                        <div className="flex items-center gap-2 mt-1 ml-4">
                          <span className="text-xs text-gray-600">S.{obligation.section}</span>
                          <span className="text-xs px-2 py-0.5 rounded bg-white/5 text-gray-500">
                            {obligation.category}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Additional Obligations (SDF) */}
              {currentStakeholder.additionalObligations && (
                <div
                  className="rounded-2xl p-5"
                  style={{
                    background: 'rgba(26, 26, 40, 0.6)',
                    border: '1px solid rgba(255, 255, 255, 0.08)'
                  }}
                >
                  <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                    <Building className="w-4 h-4 text-[#8b5cf6]" />
                    Additional Obligations
                  </h3>
                  <div className="space-y-3">
                    {currentStakeholder.additionalObligations.map((obligation) => {
                      const Icon = iconMap[obligation.icon] || FileText;
                      return (
                        <motion.div
                          key={obligation.id}
                          whileHover={{ x: 4 }}
                          className="p-3 rounded-xl bg-white/5 hover:bg-white/8 transition-colors"
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <Icon className="w-4 h-4 text-[#8b5cf6]" />
                            <span className="font-medium text-white text-sm">{obligation.title}</span>
                          </div>
                          <p className="text-xs text-gray-500 ml-6">{obligation.description}</p>
                          <span className="text-xs text-gray-600 ml-6">Section {obligation.section}</span>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Key Points (Data Processor) */}
              {currentStakeholder.keyPoints && (
                <div
                  className="rounded-2xl p-5"
                  style={{
                    background: 'rgba(26, 26, 40, 0.6)',
                    border: '1px solid rgba(255, 255, 255, 0.08)'
                  }}
                >
                  <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                    <Server className="w-4 h-4 text-[#3b82f6]" />
                    Key Points
                  </h3>
                  <div className="space-y-3">
                    {currentStakeholder.keyPoints.map((point) => (
                      <motion.div
                        key={point.id}
                        whileHover={{ x: 4 }}
                        className="p-3 rounded-xl bg-white/5 hover:bg-white/8 transition-colors"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-2 h-2 rounded-full bg-[#3b82f6]" />
                          <span className="font-medium text-white text-sm">{point.title}</span>
                        </div>
                        <p className="text-xs text-gray-500 ml-4">{point.description}</p>
                        <span className="text-xs text-gray-600 ml-4">Section {point.section}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Requirements (Consent Manager) */}
              {currentStakeholder.requirements && (
                <div
                  className="rounded-2xl p-5"
                  style={{
                    background: 'rgba(26, 26, 40, 0.6)',
                    border: '1px solid rgba(255, 255, 255, 0.08)'
                  }}
                >
                  <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                    <KeyRound className="w-4 h-4 text-[#00d4ff]" />
                    Requirements
                  </h3>
                  <div className="space-y-3">
                    {currentStakeholder.requirements.map((req) => (
                      <motion.div
                        key={req.id}
                        whileHover={{ x: 4 }}
                        className="p-3 rounded-xl bg-white/5 hover:bg-white/8 transition-colors"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-2 h-2 rounded-full bg-[#00d4ff]" />
                          <span className="font-medium text-white text-sm">{req.title}</span>
                        </div>
                        <p className="text-xs text-gray-500 ml-4">{req.description}</p>
                        <span className="text-xs text-gray-600 ml-4">Section {req.section}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Functions (Board) */}
              {currentStakeholder.functions && (
                <div
                  className="rounded-2xl p-5"
                  style={{
                    background: 'rgba(26, 26, 40, 0.6)',
                    border: '1px solid rgba(255, 255, 255, 0.08)'
                  }}
                >
                  <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                    <Landmark className="w-4 h-4 text-[#10b981]" />
                    Functions
                  </h3>
                  <div className="space-y-3">
                    {currentStakeholder.functions.map((func) => (
                      <motion.div
                        key={func.id}
                        whileHover={{ x: 4 }}
                        className="p-3 rounded-xl bg-white/5 hover:bg-white/8 transition-colors"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-2 h-2 rounded-full bg-[#10b981]" />
                          <span className="font-medium text-white text-sm">{func.title}</span>
                        </div>
                        <p className="text-xs text-gray-500 ml-4">{func.description}</p>
                        <span className="text-xs text-gray-600 ml-4">Section {func.section}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Rule Modal */}
      {selectedRule && (
        <RuleModal rule={selectedRule} onClose={() => setSelectedRule(null)} />
      )}
    </div>
  );
}
