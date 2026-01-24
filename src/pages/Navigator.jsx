import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Search,
  ChevronRight,
  ChevronDown,
  ChevronLeft,
  BookOpen,
  FileText,
  Building2,
  Users,
  Globe,
  Landmark,
  Gavel,
  Scale,
  AlertTriangle,
  ExternalLink,
  ScrollText
} from 'lucide-react';

import { chapters, sections, actInfo } from '../data/actStructure';
import { getRuleByNumber } from '../data/rulesStructure';
import RuleModal from '../components/rules/RuleModal';

const iconMap = {
  BookOpen,
  Building2,
  Users,
  Globe,
  Landmark,
  Gavel,
  Scale,
  AlertTriangle,
  FileText
};

export default function Navigator() {
  const [searchParams] = useSearchParams();
  const initialSection = searchParams.get('section');
  const initialChapter = searchParams.get('chapter');

  const [searchQuery, setSearchQuery] = useState('');
  const [expandedChapters, setExpandedChapters] = useState(
    initialChapter ? [parseInt(initialChapter)] : [1]
  );
  const [selectedSection, setSelectedSection] = useState(
    initialSection ? parseInt(initialSection) : null
  );
  const [selectedRule, setSelectedRule] = useState(null);

  // Filter sections based on search
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) {
      return chapters.map(chapter => ({
        ...chapter,
        filteredSections: sections.filter(s => s.chapter === chapter.id)
      }));
    }

    const query = searchQuery.toLowerCase();
    return chapters.map(chapter => ({
      ...chapter,
      filteredSections: sections.filter(s =>
        s.chapter === chapter.id && (
          s.title.toLowerCase().includes(query) ||
          s.summary?.toLowerCase().includes(query) ||
          s.number.includes(query) ||
          s.keyPoints?.some(kp => kp.toLowerCase().includes(query))
        )
      )
    })).filter(c => c.filteredSections.length > 0);
  }, [searchQuery]);

  const toggleChapter = (chapterId) => {
    setExpandedChapters(prev =>
      prev.includes(chapterId)
        ? prev.filter(id => id !== chapterId)
        : [...prev, chapterId]
    );
  };

  const selectedSectionData = selectedSection
    ? sections.find(s => s.id === selectedSection)
    : null;

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 h-auto lg:h-[calc(100vh-8rem)]">
      {/* Left Panel - Chapter/Section Tree */}
      <div
        className={`
          w-full lg:w-96 flex-shrink-0 rounded-2xl overflow-hidden flex flex-col
          ${selectedSection ? 'hidden lg:flex' : 'flex'}
          max-h-[70vh] lg:max-h-none
        `}
        style={{
          background: 'rgba(26, 26, 40, 0.6)',
          border: '1px solid rgba(255, 255, 255, 0.08)'
        }}
      >
        {/* Search */}
        <div className="p-4 border-b border-white/5">
          <div
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.08)'
            }}
          >
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search sections..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-sm"
            />
          </div>
        </div>

        {/* Tree */}
        <div className="flex-1 overflow-y-auto p-2">
          {filteredData.map((chapter) => {
            const Icon = iconMap[chapter.icon] || FileText;
            const isExpanded = expandedChapters.includes(chapter.id);

            return (
              <div key={chapter.id} className="mb-1">
                {/* Chapter Header */}
                <button
                  onClick={() => toggleChapter(chapter.id)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl text-left hover:bg-white/5 transition-colors"
                >
                  <motion.div
                    animate={{ rotate: isExpanded ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronRight className="w-4 h-4 text-gray-500" />
                  </motion.div>
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: 'rgba(0, 212, 255, 0.15)' }}
                  >
                    <Icon className="w-4 h-4 text-[#00d4ff]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500">Chapter {chapter.number}</p>
                    <p className="font-medium text-white truncate">{chapter.title}</p>
                  </div>
                  <span className="text-xs text-gray-500 px-2 py-1 rounded bg-white/5">
                    {chapter.filteredSections.length}
                  </span>
                </button>

                {/* Sections */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="ml-8 pl-4 border-l border-white/5">
                        {chapter.filteredSections.map((section) => (
                          <button
                            key={section.id}
                            onClick={() => setSelectedSection(section.id)}
                            className={`
                              w-full flex items-center gap-3 p-2.5 rounded-lg text-left transition-all
                              ${selectedSection === section.id
                                ? 'bg-[#00d4ff]/10 text-white'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                              }
                            `}
                          >
                            <span className="text-xs font-mono w-8">S.{section.number}</span>
                            <span className="flex-1 text-sm truncate">{section.title}</span>
                            {section.implementingRules && section.implementingRules.length > 0 && (
                              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#10b981]/20 flex items-center justify-center" title="Has implementing rules">
                                <ScrollText className="w-3 h-3 text-[#10b981]" />
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Stats Footer */}
        <div className="p-4 border-t border-white/5">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{actInfo.totalChapters} Chapters</span>
            <span>{actInfo.totalSections} Sections</span>
          </div>
        </div>
      </div>

      {/* Right Panel - Section Details */}
      <div
        className={`
          flex-1 rounded-2xl overflow-hidden flex flex-col
          ${!selectedSection ? 'hidden lg:flex' : 'flex'}
        `}
        style={{
          background: 'rgba(26, 26, 40, 0.6)',
          border: '1px solid rgba(255, 255, 255, 0.08)'
        }}
      >
        {selectedSectionData ? (
          <motion.div
            key={selectedSectionData.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 overflow-y-auto p-4 lg:p-6"
          >
            {/* Mobile Back Button */}
            <button
              onClick={() => setSelectedSection(null)}
              className="lg:hidden flex items-center gap-2 mb-4 text-gray-400 hover:text-white transition-colors"
            >
              <ChevronLeft size={20} />
              <span className="text-sm">Back to sections</span>
            </button>

            {/* Section Header */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#00d4ff]/20 text-[#00d4ff]">
                  Section {selectedSectionData.number}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-gray-400">
                  Chapter {chapters.find(c => c.id === selectedSectionData.chapter)?.number}
                </span>
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">
                {selectedSectionData.title}
              </h1>
              <p className="text-gray-400">
                {selectedSectionData.summary}
              </p>
            </div>

            {/* Key Points */}
            {selectedSectionData.keyPoints && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                  <div className="w-1 h-4 rounded-full bg-[#00d4ff]" />
                  Key Points
                </h3>
                <div className="space-y-2">
                  {selectedSectionData.keyPoints.map((point, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3 p-3 rounded-lg bg-white/5"
                    >
                      <div className="w-5 h-5 rounded-full bg-[#00d4ff]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs text-[#00d4ff]">{index + 1}</span>
                      </div>
                      <span className="text-sm text-gray-300">{point}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Content */}
            {selectedSectionData.content && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                  <div className="w-1 h-4 rounded-full bg-[#3b82f6]" />
                  Provisions
                </h3>
                <div
                  className="p-4 rounded-xl text-sm text-gray-300 leading-relaxed whitespace-pre-wrap"
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.05)'
                  }}
                >
                  {selectedSectionData.content}
                </div>
              </div>
            )}

            {/* Implementing Rules */}
            {selectedSectionData.implementingRules && selectedSectionData.implementingRules.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                  <div className="w-1 h-4 rounded-full bg-[#10b981]" />
                  Implementing Rules (DPDP Rules 2025)
                </h3>
                <div className="space-y-2">
                  {selectedSectionData.implementingRules.map((ruleNum) => {
                    const rule = getRuleByNumber(ruleNum);
                    if (!rule) return null;
                    return (
                      <button
                        key={ruleNum}
                        onClick={() => setSelectedRule(rule)}
                        className="w-full flex items-center gap-3 p-3 rounded-lg bg-[#10b981]/10 border border-[#10b981]/20 hover:bg-[#10b981]/20 transition-colors group text-left"
                      >
                        <div className="w-8 h-8 rounded-lg bg-[#10b981]/20 flex items-center justify-center flex-shrink-0">
                          <ScrollText className="w-4 h-4 text-[#10b981]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white truncate">
                            Rule {rule.number}: {rule.title}
                          </p>
                          <p className="text-xs text-gray-500">
                            {rule.phase === 1 ? 'Active' : rule.phase === 2 ? 'Nov 2026' : 'May 2027'}
                          </p>
                        </div>
                        <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-[#10b981] transition-colors flex-shrink-0" />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Stats */}
            <div className="flex flex-wrap gap-4">
              {selectedSectionData.definitionCount && (
                <div className="px-4 py-3 rounded-xl bg-[#8a5cf6]/10 border border-[#8a5cf6]/20">
                  <p className="text-xs text-gray-400">Definitions</p>
                  <p className="text-lg font-bold text-[#8a5cf6]">{selectedSectionData.definitionCount}</p>
                </div>
              )}
              {selectedSectionData.legitimateUses && (
                <div className="px-4 py-3 rounded-xl bg-[#22c55e]/10 border border-[#22c55e]/20">
                  <p className="text-xs text-gray-400">Legitimate Uses</p>
                  <p className="text-lg font-bold text-[#22c55e]">{selectedSectionData.legitimateUses}</p>
                </div>
              )}
              {selectedSectionData.duties && (
                <div className="px-4 py-3 rounded-xl bg-[#d4a84b]/10 border border-[#d4a84b]/20">
                  <p className="text-xs text-gray-400">Duties</p>
                  <p className="text-lg font-bold text-[#d4a84b]">{selectedSectionData.duties}</p>
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-center p-8">
            <div>
              <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Select a Section</h3>
              <p className="text-gray-500 max-w-md">
                Choose a section from the chapter tree on the left to view its details, key points, and provisions.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Rule Modal */}
      {selectedRule && (
        <RuleModal rule={selectedRule} onClose={() => setSelectedRule(null)} />
      )}
    </div>
  );
}
