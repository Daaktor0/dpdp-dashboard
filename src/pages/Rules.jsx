import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  ChevronDown,
  ChevronRight,
  Calendar,
  CheckCircle2,
  Timer,
  Circle,
  BookOpen,
  ExternalLink,
  ListTree
} from 'lucide-react';

import { phaseIcons, phaseColors } from '../utils/phaseUtils';

import {
  rulesInfo,
  rules,
  schedules,
  enforcementPhases,
  getEnforcementStatus
} from '../data/rulesStructure';
import { getCurrentStatus } from '../data/enforcementTimeline';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};



export default function Rules() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPhase, setSelectedPhase] = useState(
    searchParams.get('phase') ? parseInt(searchParams.get('phase')) : null
  );
  const [expandedRule, setExpandedRule] = useState(null);
  const [expandedSchedule, setExpandedSchedule] = useState(null);
  const [viewMode, setViewMode] = useState('rules'); // 'rules' or 'schedules'

  const status = getCurrentStatus();

  // Filter rules based on search and phase
  const filteredRules = useMemo(() => {
    return rules.filter(rule => {
      const matchesSearch = searchQuery === '' ||
        rule.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rule.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rule.keyPoints.some(kp => kp.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesPhase = selectedPhase === null || rule.phase === selectedPhase;

      return matchesSearch && matchesPhase;
    });
  }, [searchQuery, selectedPhase]);

  const getStatusBadge = (enforcementDate) => {
    const status = getEnforcementStatus(enforcementDate);

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

  const handlePhaseFilter = (phaseId) => {
    if (selectedPhase === phaseId) {
      setSelectedPhase(null);
      searchParams.delete('phase');
    } else {
      setSelectedPhase(phaseId);
      searchParams.set('phase', phaseId.toString());
    }
    setSearchParams(searchParams);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center gap-3 mb-2">
          <div
            className="p-3 rounded-xl"
            style={{ background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)' }}
          >
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">{rulesInfo.title}</h1>
            <p className="text-sm text-gray-400">
              {rulesInfo.notificationNumber} | Published: {rulesInfo.datePublished}
            </p>
          </div>
        </div>
        <p className="text-gray-400 mt-2">
          Implementation rules for the {rulesInfo.parentAct}
        </p>
      </motion.div>

      {/* Stats Bar */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <div
          className="p-4 rounded-xl"
          style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)' }}
        >
          <p className="text-2xl font-bold text-green-400">{status.activeRuleCount}</p>
          <p className="text-xs text-gray-400">Active Rules</p>
        </div>
        <div
          className="p-4 rounded-xl"
          style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.2)' }}
        >
          <p className="text-2xl font-bold text-amber-400">
            {status.nextPhase ? status.nextPhase.rules.length : 0}
          </p>
          <p className="text-xs text-gray-400">Coming Next</p>
        </div>
        <div
          className="p-4 rounded-xl"
          style={{ background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)' }}
        >
          <p className="text-2xl font-bold text-blue-400">{rules.length}</p>
          <p className="text-xs text-gray-400">Total Rules</p>
        </div>
        <div
          className="p-4 rounded-xl"
          style={{ background: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.2)' }}
        >
          <p className="text-2xl font-bold text-purple-400">{schedules.length}</p>
          <p className="text-xs text-gray-400">Schedules</p>
        </div>
      </motion.div>

      {/* View Toggle & Search */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row gap-4">
        {/* View Toggle */}
        <div className="flex rounded-lg overflow-hidden" style={{ background: 'rgba(26, 26, 40, 0.6)' }}>
          <button
            onClick={() => setViewMode('rules')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              viewMode === 'rules'
                ? 'bg-[#00d4ff]/20 text-[#00d4ff]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <span className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Rules ({rules.length})
            </span>
          </button>
          <button
            onClick={() => setViewMode('schedules')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              viewMode === 'schedules'
                ? 'bg-[#00d4ff]/20 text-[#00d4ff]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <span className="flex items-center gap-2">
              <ListTree className="w-4 h-4" />
              Schedules ({schedules.length})
            </span>
          </button>
        </div>

        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search rules..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff]/50"
          />
        </div>
      </motion.div>

      {/* Phase Filters */}
      {viewMode === 'rules' && (
        <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
          <span className="flex items-center gap-1 text-sm text-gray-400">
            <Filter className="w-4 h-4" />
            Filter by Phase:
          </span>
          {enforcementPhases.map((phase) => {
            const PhaseIcon = phaseIcons[phase.id];
            const isSelected = selectedPhase === phase.id;

            return (
              <button
                key={phase.id}
                onClick={() => handlePhaseFilter(phase.id)}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  isSelected
                    ? 'ring-2'
                    : 'hover:bg-white/5'
                }`}
                style={{
                  background: isSelected ? `${phaseColors[phase.id]}20` : 'rgba(26, 26, 40, 0.6)',
                  borderColor: phaseColors[phase.id],
                  boxShadow: isSelected ? `0 0 0 2px ${phaseColors[phase.id]}` : 'none',
                  color: isSelected ? phaseColors[phase.id] : '#9ca3af'
                }}
              >
                <PhaseIcon className="w-4 h-4" />
                Phase {phase.id}
                <span className="text-xs opacity-70">({phase.rules.length})</span>
              </button>
            );
          })}
          {selectedPhase && (
            <button
              onClick={() => handlePhaseFilter(selectedPhase)}
              className="text-xs text-gray-500 hover:text-white"
            >
              Clear filter
            </button>
          )}
        </motion.div>
      )}

      {/* Rules List */}
      {viewMode === 'rules' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          {filteredRules.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No rules found matching your criteria
            </div>
          ) : (
            filteredRules.map((rule) => {
              const isExpanded = expandedRule === rule.id;
              const PhaseIcon = phaseIcons[rule.phase];

              return (
                <motion.div
                  key={rule.id}
                  layout
                  className="rounded-xl overflow-hidden"
                  style={{
                    background: 'rgba(26, 26, 40, 0.6)',
                    border: '1px solid rgba(255, 255, 255, 0.08)'
                  }}
                >
                  {/* Rule Header */}
                  <button
                    onClick={() => setExpandedRule(isExpanded ? null : rule.id)}
                    className="w-full p-4 flex items-start gap-4 text-left hover:bg-white/5 transition-colors"
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: `${phaseColors[rule.phase]}20` }}
                    >
                      <span className="text-sm font-bold" style={{ color: phaseColors[rule.phase] }}>
                        {rule.number}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-white">{rule.title}</h3>
                        {getStatusBadge(rule.enforcementDate)}
                      </div>
                      <p className="text-sm text-gray-400 mt-1 line-clamp-2">{rule.summary}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(rule.enforcementDate).toLocaleDateString('en-IN', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <PhaseIcon className="w-3 h-3" />
                          Phase {rule.phase}
                        </span>
                        {rule.linkedActSections.length > 0 && (
                          <span className="flex items-center gap-1">
                            <BookOpen className="w-3 h-3" />
                            Act S.{rule.linkedActSections.join(', ')}
                          </span>
                        )}
                      </div>
                    </div>

                    <ChevronDown
                      className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* Rule Content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="border-t border-white/10"
                      >
                        <div className="p-4 space-y-4">
                          {/* Content */}
                          <div>
                            <h4 className="text-sm font-medium text-gray-300 mb-2">Rule Content</h4>
                            <pre className="text-sm text-gray-400 whitespace-pre-wrap font-sans bg-black/20 p-3 rounded-lg">
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

                          {/* Related Links */}
                          <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
                            {rule.linkedActSections.map((section) => (
                              <Link
                                key={section}
                                to={`/navigator?section=${section}`}
                                className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-[#00d4ff]/10 text-[#00d4ff] hover:bg-[#00d4ff]/20 transition-colors"
                              >
                                <BookOpen className="w-3 h-3" />
                                View Act Section {section}
                                <ExternalLink className="w-3 h-3" />
                              </Link>
                            ))}
                            {rule.relatedSchedule && (
                              <button
                                onClick={() => {
                                  setViewMode('schedules');
                                  setExpandedSchedule(rule.relatedSchedule);
                                }}
                                className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 transition-colors"
                              >
                                <ListTree className="w-3 h-3" />
                                View Schedule {rule.relatedSchedule}
                              </button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          )}
        </motion.div>
      )}

      {/* Schedules List */}
      {viewMode === 'schedules' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          {schedules.map((schedule) => {
            const isExpanded = expandedSchedule === schedule.id;

            return (
              <motion.div
                key={schedule.id}
                layout
                className="rounded-xl overflow-hidden"
                style={{
                  background: 'rgba(26, 26, 40, 0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.08)'
                }}
              >
                {/* Schedule Header */}
                <button
                  onClick={() => setExpandedSchedule(isExpanded ? null : schedule.id)}
                  className="w-full p-4 flex items-start gap-4 text-left hover:bg-white/5 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-purple-500/20">
                    <ListTree className="w-5 h-5 text-purple-400" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white">{schedule.name}</h3>
                    <p className="text-sm text-gray-400 mt-1">{schedule.title}</p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                      <span>
                        Referenced by Rule {schedule.linkedRule || schedule.linkedRules?.join(', ')}
                      </span>
                    </div>
                  </div>

                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Schedule Content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="border-t border-white/10"
                    >
                      <div className="p-4 space-y-4">
                        {/* Parts */}
                        {schedule.parts && schedule.parts.map((part) => (
                          <div key={part.id} className="bg-black/20 p-3 rounded-lg">
                            <h4 className="text-sm font-medium text-white mb-2">
                              Part {part.id}: {part.title}
                            </h4>
                            {part.content && (
                              <ul className="space-y-1">
                                {part.content.map((item, i) => (
                                  <li key={i} className="text-sm text-gray-400 flex items-start gap-2">
                                    <span className="text-purple-400">{i + 1}.</span>
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            )}
                            {part.exemptions && (
                              <div className="space-y-2 mt-2">
                                {part.exemptions.map((ex, i) => (
                                  <div key={i} className="text-sm">
                                    <p className="text-gray-300">{ex.class || ex.purpose}</p>
                                    <p className="text-xs text-gray-500 mt-1">Condition: {ex.condition}</p>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}

                        {/* Standards */}
                        {schedule.standards && (
                          <div className="bg-black/20 p-3 rounded-lg">
                            <h4 className="text-sm font-medium text-white mb-2">Standards</h4>
                            <ul className="space-y-1">
                              {schedule.standards.map((item, i) => (
                                <li key={i} className="text-sm text-gray-400 flex items-start gap-2">
                                  <span className="text-purple-400">•</span>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Categories (for Third Schedule) */}
                        {schedule.categories && (
                          <div className="space-y-3">
                            {schedule.categories.map((cat, i) => (
                              <div key={i} className="bg-black/20 p-3 rounded-lg">
                                <p className="text-sm font-medium text-white">{cat.class}</p>
                                <p className="text-xs text-gray-400 mt-1">Purposes: {cat.purposes}</p>
                                <p className="text-xs text-green-400 mt-1">Retention: {cat.period}</p>
                              </div>
                            ))}
                            {schedule.notes && (
                              <div className="bg-black/20 p-3 rounded-lg border-l-2 border-amber-500/50">
                                <h4 className="text-xs font-medium text-amber-400 mb-2">Notes</h4>
                                <ul className="space-y-1">
                                  {schedule.notes.map((note, i) => (
                                    <li key={i} className="text-xs text-gray-500">{note}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Terms (for Fifth Schedule - with salary) */}
                        {schedule.terms && schedule.terms.salary && (
                          <div className="space-y-3">
                            <div className="bg-black/20 p-3 rounded-lg">
                              <h4 className="text-sm font-medium text-white mb-2">Compensation</h4>
                              <div className="space-y-1 text-sm text-gray-400">
                                <p>Chairperson: {schedule.terms.salary.chairperson}</p>
                                <p>Member: {schedule.terms.salary.member}</p>
                                <p className="text-xs text-gray-500">{schedule.terms.salary.facilities}</p>
                              </div>
                            </div>
                            {schedule.terms.travelAllowance && (
                              <div className="bg-black/20 p-3 rounded-lg">
                                <h4 className="text-sm font-medium text-white mb-2">Travel Allowance</h4>
                                <div className="space-y-1 text-sm text-gray-400">
                                  <p>Chairperson: {schedule.terms.travelAllowance.chairperson}</p>
                                  <p>Member: {schedule.terms.travelAllowance.member}</p>
                                </div>
                              </div>
                            )}
                            {schedule.terms.otherConditions && (
                              <div className="bg-black/20 p-3 rounded-lg">
                                <h4 className="text-sm font-medium text-white mb-2">Other Conditions</h4>
                                <ul className="space-y-1">
                                  {schedule.terms.otherConditions.map((item, i) => (
                                    <li key={i} className="text-sm text-gray-400 flex items-start gap-2">
                                      <span className="text-purple-400">•</span>
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Terms (for Sixth Schedule - employees) */}
                        {schedule.terms && schedule.terms.classes && (
                          <div className="space-y-3">
                            <div className="bg-black/20 p-3 rounded-lg">
                              <h4 className="text-sm font-medium text-white mb-2">Eligible Classes</h4>
                              <ul className="space-y-1">
                                {schedule.terms.classes.map((item, i) => (
                                  <li key={i} className="text-sm text-gray-400 flex items-start gap-2">
                                    <span className="text-purple-400">{i + 1}.</span>
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="bg-black/20 p-3 rounded-lg">
                              <h4 className="text-sm font-medium text-white mb-2">Terms</h4>
                              <div className="space-y-1 text-sm text-gray-400">
                                <p><span className="text-gray-500">Period:</span> {schedule.terms.period}</p>
                                <p><span className="text-gray-500">Gratuity:</span> {schedule.terms.gratuity}</p>
                                <p><span className="text-gray-500">Travel:</span> {schedule.terms.travelAllowance}</p>
                                <p><span className="text-gray-500">Medical:</span> {schedule.terms.medicalAssistance}</p>
                                <p><span className="text-gray-500">Leave:</span> {schedule.terms.leave}</p>
                                <p><span className="text-gray-500">Conduct:</span> {schedule.terms.conduct}</p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Purposes (for Seventh Schedule) */}
                        {schedule.purposes && (
                          <div className="space-y-3">
                            {schedule.purposes.map((item, i) => (
                              <div key={i} className="bg-black/20 p-3 rounded-lg">
                                <p className="text-sm text-white">{item.purpose}</p>
                                <p className="text-xs text-gray-500 mt-1">
                                  Authorised: {item.authorisedPerson}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </motion.div>
  );
}
