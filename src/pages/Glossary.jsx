import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  BookMarked,
  ExternalLink,
  Filter,
  Building2,
  User,
  Cpu,
  Scale,
  Landmark,
  ChevronLeft
} from 'lucide-react';

import { definitions, definitionCategories } from '../data/definitions';

const categoryIcons = {
  Entity: Building2,
  Individual: User,
  Technical: Cpu,
  Legal: Scale,
  Institutional: Landmark
};

export default function Glossary() {
  const [searchParams] = useSearchParams();
  const initialTerm = searchParams.get('term');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDefinition, setSelectedDefinition] = useState(initialTerm);

  // Filter definitions
  const filteredDefinitions = useMemo(() => {
    return definitions.filter(def => {
      const matchesSearch = !searchQuery ||
        def.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        def.definition.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' ||
        def.category.toLowerCase() === selectedCategory.toLowerCase();
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const currentDefinition = definitions.find(d => d.id === selectedDefinition);

  // Group by first letter for alphabetical index
  const alphabeticalGroups = useMemo(() => {
    const groups = {};
    filteredDefinitions.forEach(def => {
      const letter = def.term[0].toUpperCase();
      if (!groups[letter]) {
        groups[letter] = [];
      }
      groups[letter].push(def);
    });
    return groups;
  }, [filteredDefinitions]);

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 h-auto lg:h-[calc(100vh-8rem)]">
      {/* Left Panel - Definition List */}
      <div
        className={`
          w-full lg:w-96 flex-shrink-0 rounded-2xl overflow-hidden flex flex-col
          ${selectedDefinition ? 'hidden lg:flex' : 'flex'}
          max-h-[70vh] lg:max-h-none
        `}
        style={{
          background: 'rgba(26, 26, 40, 0.6)',
          border: '1px solid rgba(255, 255, 255, 0.08)'
        }}
      >
        {/* Search & Filter */}
        <div className="p-4 border-b border-white/5 space-y-3">
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
              placeholder="Search definitions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-sm"
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`
                flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                ${selectedCategory === 'all'
                  ? 'bg-[#00d4ff] text-black font-semibold'
                  : 'bg-white/5 text-gray-400 hover:text-white'
                }
              `}
            >
              All
            </button>
            {definitionCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`
                  flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                  ${selectedCategory === cat.id
                    ? 'text-white'
                    : 'bg-white/5 text-gray-400 hover:text-white'
                  }
                `}
                style={{
                  background: selectedCategory === cat.id ? cat.color : undefined
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Definition List */}
        <div className="flex-1 overflow-y-auto p-3">
          {Object.entries(alphabeticalGroups).map(([letter, defs]) => (
            <div key={letter} className="mb-4">
              <div className="sticky top-0 bg-[#0a0a0f] px-2 py-1 text-xs font-bold text-[#00d4ff] uppercase z-10">
                {letter}
              </div>
              <div className="space-y-1">
                {defs.map(def => {
                  const category = definitionCategories.find(c => c.id === def.category.toLowerCase());
                  const Icon = categoryIcons[def.category] || BookMarked;

                  return (
                    <motion.button
                      key={def.id}
                      onClick={() => setSelectedDefinition(def.id)}
                      whileHover={{ x: 4 }}
                      className={`
                        w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all
                        ${selectedDefinition === def.id
                          ? 'bg-[#00d4ff]/10 border border-[#00d4ff]/30'
                          : 'hover:bg-white/5'
                        }
                      `}
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: `${category?.color || '#5a7ff0'}20` }}
                      >
                        <Icon className="w-4 h-4" style={{ color: category?.color || '#5a7ff0' }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`font-medium truncate ${selectedDefinition === def.id ? 'text-white' : 'text-gray-300'}`}>
                          {def.term}
                        </p>
                        <p className="text-xs text-gray-500">Section {def.section}</p>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          ))}

          {filteredDefinitions.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <BookMarked className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No definitions found</p>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="p-4 border-t border-white/5 flex items-center justify-between text-xs text-gray-500">
          <span>{filteredDefinitions.length} definitions</span>
          <span>Section 2(a) to 2(zb)</span>
        </div>
      </div>

      {/* Right Panel - Definition Detail */}
      <div
        className={`
          flex-1 rounded-2xl overflow-hidden
          ${!selectedDefinition ? 'hidden lg:block' : 'block'}
        `}
        style={{
          background: 'rgba(26, 26, 40, 0.6)',
          border: '1px solid rgba(255, 255, 255, 0.08)'
        }}
      >
        <AnimatePresence mode="wait">
          {currentDefinition ? (
            <motion.div
              key={currentDefinition.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-4 lg:p-8 h-full overflow-y-auto"
            >
              {/* Mobile Back Button */}
              <button
                onClick={() => setSelectedDefinition(null)}
                className="lg:hidden flex items-center gap-2 mb-4 text-gray-400 hover:text-white transition-colors"
              >
                <ChevronLeft size={20} />
                <span className="text-sm">Back to definitions</span>
              </button>

              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      background: `${definitionCategories.find(c => c.id === currentDefinition.category.toLowerCase())?.color || '#5a7ff0'}20`,
                      color: definitionCategories.find(c => c.id === currentDefinition.category.toLowerCase())?.color || '#5a7ff0'
                    }}
                  >
                    {currentDefinition.category}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-gray-400">
                    Section {currentDefinition.section}
                  </span>
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">{currentDefinition.term}</h1>
              </div>

              {/* Definition */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  Definition
                </h3>
                <div
                  className="p-6 rounded-xl"
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.05)'
                  }}
                >
                  <p className="text-lg text-gray-200 leading-relaxed">
                    "{currentDefinition.definition}"
                  </p>
                </div>
              </div>

              {/* Related Sections */}
              {currentDefinition.relatedSections && currentDefinition.relatedSections.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    Related Sections
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {currentDefinition.relatedSections.map(section => (
                      <span
                        key={section}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 text-gray-300 hover:bg-white/10 transition-colors cursor-pointer"
                      >
                        <span className="text-[#00d4ff] font-mono">S.{section}</span>
                        <ExternalLink className="w-3 h-3 text-gray-500" />
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Visual Representation */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  Category Context
                </h3>
                <div className="grid grid-cols-3 lg:grid-cols-5 gap-2 lg:gap-3">
                  {definitionCategories.map(cat => {
                    const isActive = cat.id === currentDefinition.category.toLowerCase();
                    const count = definitions.filter(d => d.category.toLowerCase() === cat.id).length;
                    const Icon = categoryIcons[cat.name] || BookMarked;

                    return (
                      <div
                        key={cat.id}
                        className={`
                          p-4 rounded-xl text-center transition-all
                          ${isActive ? 'ring-2' : 'opacity-50'}
                        `}
                        style={{
                          background: `${cat.color}10`,
                          borderColor: cat.color,
                          '--tw-ring-color': cat.color
                        }}
                      >
                        <Icon className="w-6 h-6 mx-auto mb-2" style={{ color: cat.color }} />
                        <p className="text-xs font-medium text-white">{cat.name}</p>
                        <p className="text-xs text-gray-500">{count} terms</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Plain English */}
              <div
                className="p-6 rounded-xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)',
                  border: '1px solid rgba(0, 212, 255, 0.2)'
                }}
              >
                <h3 className="text-sm font-semibold text-[#00d4ff] mb-2 flex items-center gap-2">
                  <BookMarked className="w-4 h-4" />
                  In Simple Terms
                </h3>
                <p className="text-gray-300">
                  {getSimpleExplanation(currentDefinition.id)}
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full flex items-center justify-center text-center p-8"
            >
              <div>
                <BookMarked className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Select a Definition</h3>
                <p className="text-gray-500 max-w-md">
                  Choose a term from the list on the left to view its complete definition, related sections, and plain English explanation.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Helper function for simple explanations
function getSimpleExplanation(id) {
  const explanations = {
    'data-principal': 'Simply put, this is YOU - the person whose data is being collected and used. If a company has your name, email, or phone number, you are the Data Principal for that data.',
    'data-fiduciary': 'This is the organization or company that collects and decides what to do with your data. For example, when you sign up for an app, that app becomes the Data Fiduciary for your information.',
    'data-processor': 'Think of this as a contractor. If a company uses another service to handle your data (like a cloud storage provider), that service is the Data Processor.',
    'personal-data': 'Any information that can identify you - your name, email, phone number, location, even your IP address. If someone can figure out who you are from the data, it\'s personal data.',
    'processing': 'Anything done with your data - collecting it, storing it, using it, sharing it, or deleting it. Even just looking at your data counts as processing.',
    'consent': 'Your clear agreement to let an organization use your data. It must be freely given, specific to the purpose, and you must know exactly what you\'re agreeing to.',
    'personal-data-breach': 'When your data gets exposed without permission - like a hack, accidental leak, or unauthorized access. It compromises the safety of your information.',
    'significant-data-fiduciary': 'Large organizations that handle lots of sensitive data and pose greater risks. They have extra responsibilities and are specifically identified by the government.',
    'consent-manager': 'A registered service that helps you manage your consent across different organizations from one place - like a consent dashboard.',
    'child': 'Anyone under 18 years old. Children get extra protections under the Act because they may not fully understand data privacy.',
    'board': 'The Data Protection Board of India - the official authority that enforces this Act, handles complaints, and imposes penalties.',
    'appellate-tribunal': 'If you disagree with a decision from the Data Protection Board, you can appeal to this higher authority (the Telecom Disputes Tribunal).'
  };

  return explanations[id] || 'This term defines an important concept in data protection law that helps establish clear rules and responsibilities for handling personal data.';
}
