import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Command } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { sections } from '../../data/actStructure';
import { definitions } from '../../data/definitions';
import { stakeholders } from '../../data/stakeholders';

export default function Header({ sidebarCollapsed }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Search across all data
  const getSearchResults = () => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase();
    const results = [];

    // Search sections
    sections.forEach(section => {
      if (
        section.title.toLowerCase().includes(query) ||
        section.summary?.toLowerCase().includes(query) ||
        section.number.includes(query)
      ) {
        results.push({
          type: 'section',
          label: `Section ${section.number}: ${section.title}`,
          description: section.summary?.slice(0, 80) + '...',
          path: `/navigator?section=${section.id}`
        });
      }
    });

    // Search definitions
    definitions.forEach(def => {
      if (
        def.term.toLowerCase().includes(query) ||
        def.definition.toLowerCase().includes(query)
      ) {
        results.push({
          type: 'definition',
          label: def.term,
          description: def.definition.slice(0, 80) + '...',
          path: `/glossary?term=${def.id}`
        });
      }
    });

    // Search stakeholders
    stakeholders.forEach(stakeholder => {
      if (
        stakeholder.name.toLowerCase().includes(query) ||
        stakeholder.description.toLowerCase().includes(query)
      ) {
        results.push({
          type: 'stakeholder',
          label: stakeholder.name,
          description: stakeholder.description.slice(0, 80) + '...',
          path: `/stakeholders?id=${stakeholder.id}`
        });
      }
    });

    return results.slice(0, 8);
  };

  const results = getSearchResults();

  const handleResultClick = (path) => {
    navigate(path);
    setSearchOpen(false);
    setSearchQuery('');
  };

  return (
    <>
      <motion.header
        initial={false}
        animate={{ marginLeft: sidebarCollapsed ? 80 : 280 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed top-0 right-0 z-30 h-16 flex items-center justify-between px-6"
        style={{
          left: 0,
          background: 'rgba(10, 10, 15, 0.8)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
        }}
      >
        {/* Page Title - Dynamic based on route */}
        <div>
          {/* This can be made dynamic with useLocation */}
        </div>

        {/* Search Button */}
        <button
          onClick={() => setSearchOpen(true)}
          className="flex items-center gap-3 px-4 py-2 rounded-xl text-gray-400 hover:text-white transition-colors"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}
        >
          <Search size={18} />
          <span className="text-sm">Search the Act...</span>
          <div className="flex items-center gap-1 text-xs text-gray-500 ml-4">
            <Command size={12} />
            <span>K</span>
          </div>
        </button>

        {/* Quick Stats */}
        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-xs text-gray-500">Enacted</p>
            <p className="text-sm font-medium text-white">11 Aug 2023</p>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div className="text-right">
            <p className="text-xs text-gray-500">Sections</p>
            <p className="text-sm font-medium text-white">44</p>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div className="text-right">
            <p className="text-xs text-gray-500">Chapters</p>
            <p className="text-sm font-medium text-white">9</p>
          </div>
        </div>
      </motion.header>

      {/* Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSearchOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />

            {/* Search Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
              className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl"
            >
              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  background: 'rgba(26, 26, 40, 0.95)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                }}
              >
                {/* Search Input */}
                <div className="flex items-center gap-3 p-4 border-b border-white/5">
                  <Search className="text-gray-400" size={20} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search sections, definitions, stakeholders..."
                    className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-lg"
                    autoFocus
                  />
                  <button
                    onClick={() => setSearchOpen(false)}
                    className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Results */}
                <div className="max-h-96 overflow-y-auto">
                  {results.length > 0 ? (
                    <div className="p-2">
                      {results.map((result, index) => (
                        <motion.button
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => handleResultClick(result.path)}
                          className="w-full flex items-start gap-3 p-3 rounded-xl text-left hover:bg-white/5 transition-colors"
                        >
                          <span className={`
                            px-2 py-1 rounded text-xs font-medium uppercase
                            ${result.type === 'section' ? 'bg-[#e94560]/20 text-[#e94560]' : ''}
                            ${result.type === 'definition' ? 'bg-[#4361ee]/20 text-[#4361ee]' : ''}
                            ${result.type === 'stakeholder' ? 'bg-[#f4d160]/20 text-[#f4d160]' : ''}
                          `}>
                            {result.type}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-white truncate">{result.label}</p>
                            <p className="text-sm text-gray-500 truncate">{result.description}</p>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  ) : searchQuery ? (
                    <div className="p-8 text-center text-gray-500">
                      <p>No results found for "{searchQuery}"</p>
                    </div>
                  ) : (
                    <div className="p-8 text-center text-gray-500">
                      <p>Start typing to search the Act...</p>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="p-3 border-t border-white/5 flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 rounded bg-white/5">↑↓</kbd> Navigate
                    </span>
                    <span className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 rounded bg-white/5">↵</kbd> Select
                    </span>
                  </div>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-white/5">Esc</kbd> Close
                  </span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
