import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Filter } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

import { sections, chapters } from '../../data/actStructure';
import { definitions } from '../../data/definitions';
import { stakeholders } from '../../data/stakeholders';
import { prepareSearchData, createSearchIndex, performSearch, getHighlightedSegments } from '../../utils/search';

const filterTypes = [
  { id: 'all', label: 'All' },
  { id: 'section', label: 'Sections' },
  { id: 'definition', label: 'Definitions' },
  { id: 'stakeholder', label: 'Stakeholders' }
];

// Route-to-title mapping for dynamic page title
const routeTitles = {
  '/': 'Overview',
  '/navigator': 'Act Navigator',
  '/rules': 'Rules 2025',
  '/lifecycle': 'Data Lifecycle',
  '/stakeholders': 'Stakeholders',
  '/penalties': 'Penalties',
  '/glossary': 'Glossary'
};

export default function Header({ sidebarCollapsed }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ type: 'all', chapter: 'all' });
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const navigate = useNavigate();
  const location = useLocation();
  const searchInputRef = useRef(null);
  const resultsContainerRef = useRef(null);

  // Dynamic page title
  const pageTitle = routeTitles[location.pathname] || 'DPDP Dashboard';

  // Open search with K key (when not in an input)
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Escape to close search
      if (event.key === 'Escape' && searchOpen) {
        handleClose();
        return;
      }

      if (event.key.toLowerCase() !== 'k') return;
      if (event.altKey || event.metaKey || event.ctrlKey) return;

      const activeElement = document.activeElement;
      const isEditable = activeElement?.isContentEditable;
      const tagName = activeElement?.tagName;
      if (isEditable || tagName === 'INPUT' || tagName === 'TEXTAREA' || tagName === 'SELECT') {
        return;
      }

      event.preventDefault();
      setSearchOpen(true);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen]);

  // Focus input when search opens
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [searchOpen]);

  // Prepare search data and create index
  const searchData = useMemo(() =>
    prepareSearchData(sections, definitions, stakeholders, chapters),
    []
  );

  const fuse = useMemo(() => createSearchIndex(searchData), [searchData]);

  // Get search results with fuzzy matching
  const results = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const searchResults = performSearch(fuse, searchQuery, filters);

    return searchResults.slice(0, 15).map(result => ({
      ...result.item,
      score: result.score,
      matches: result.matches,
      label: result.item.title,
      description: result.item.content?.slice(0, 100) + (result.item.content?.length > 100 ? '...' : '')
    }));
  }, [searchQuery, filters, fuse]);

  // Reset selected index when results change
  useEffect(() => {
    setSelectedIndex(-1);
  }, [results]);

  // Keyboard navigation handler for search results
  const handleSearchKeyDown = useCallback((event) => {
    if (!searchOpen || results.length === 0) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setSelectedIndex(prev => {
          const next = prev < results.length - 1 ? prev + 1 : 0;
          // Scroll selected item into view
          const container = resultsContainerRef.current;
          if (container) {
            const items = container.querySelectorAll('[data-result-item]');
            items[next]?.scrollIntoView({ block: 'nearest' });
          }
          return next;
        });
        break;
      case 'ArrowUp':
        event.preventDefault();
        setSelectedIndex(prev => {
          const next = prev > 0 ? prev - 1 : results.length - 1;
          const container = resultsContainerRef.current;
          if (container) {
            const items = container.querySelectorAll('[data-result-item]');
            items[next]?.scrollIntoView({ block: 'nearest' });
          }
          return next;
        });
        break;
      case 'Enter':
        event.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < results.length) {
          handleResultClick(results[selectedIndex].path);
        }
        break;
      default:
        break;
    }
  }, [searchOpen, results, selectedIndex]);

  const handleResultClick = (path) => {
    navigate(path);
    setSearchOpen(false);
    setSearchQuery('');
    setFilters({ type: 'all', chapter: 'all' });
    setSelectedIndex(-1);
  };

  const handleClose = () => {
    setSearchOpen(false);
    setSearchQuery('');
    setFilters({ type: 'all', chapter: 'all' });
    setSelectedIndex(-1);
  };

  // Render highlighted text
  const HighlightedText = ({ text, matches, fieldKey }) => {
    const segments = getHighlightedSegments(text, matches, fieldKey);
    return (
      <>
        {segments.map((segment, i) => (
          segment.highlighted ? (
            <mark key={i} className="bg-[#00d4ff]/30 text-white rounded px-0.5">
              {segment.text}
            </mark>
          ) : (
            <span key={i}>{segment.text}</span>
          )
        ))}
      </>
    );
  };

  return (
    <>
      <motion.header
        initial={false}
        animate={{ marginLeft: sidebarCollapsed ? 80 : 280 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed top-0 right-0 z-30 h-16 flex items-center justify-between px-4 md:px-6"
        style={{
          left: 0,
          background: 'rgba(10, 10, 15, 0.8)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
        }}
      >
        {/* Page Title - Dynamic based on route */}
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-white hidden sm:block">{pageTitle}</h2>
        </div>

        {/* Search Button */}
        <button
          onClick={() => setSearchOpen(true)}
          className="flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 rounded-xl text-gray-400 hover:text-white transition-colors"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}
        >
          <Search size={18} />
          <span className="hidden sm:inline text-sm">Search the Act</span>
          <div className="hidden md:flex items-center gap-2 text-xs text-gray-500 ml-2 md:ml-4">
            <span>Press</span>
            <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-gray-300">K</kbd>
            <span>to search</span>
          </div>
        </button>

        {/* Quick Stats - Derived from data */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6">
          <div className="text-right">
            <p className="text-xs text-gray-500">Enacted</p>
            <p className="text-sm font-medium text-white">11 Aug 2023</p>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div className="text-right">
            <p className="text-xs text-gray-500">Sections</p>
            <p className="text-sm font-medium text-white">{sections.length}</p>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div className="text-right">
            <p className="text-xs text-gray-500">Chapters</p>
            <p className="text-sm font-medium text-white">{chapters.length}</p>
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
              onClick={handleClose}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />

            {/* Search Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
              className="fixed top-16 md:top-20 left-1/2 -translate-x-1/2 z-50 w-[95%] md:w-full max-w-2xl mx-auto"
              role="dialog"
              aria-modal="true"
              aria-label="Search the DPDP Act"
            >
              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  background: 'rgba(26, 26, 40, 0.95)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                }}
                onKeyDown={handleSearchKeyDown}
              >
                {/* Search Input */}
                <div className="flex items-center gap-3 p-4 border-b border-white/5">
                  <Search className="text-gray-400 flex-shrink-0" size={20} />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search sections, definitions, stakeholders..."
                    className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-base md:text-lg"
                    autoFocus
                    aria-label="Search query"
                    aria-autocomplete="list"
                    aria-controls="search-results"
                    aria-activedescendant={selectedIndex >= 0 ? `search-result-${selectedIndex}` : undefined}
                  />
                  <button
                    onClick={handleClose}
                    className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                    aria-label="Close search"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-2 p-3 border-b border-white/5">
                  <Filter size={14} className="text-gray-500" />
                  {filterTypes.map(type => (
                    <button
                      key={type.id}
                      onClick={() => setFilters(f => ({ ...f, type: type.id }))}
                      className={`
                        px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                        ${filters.type === type.id
                          ? 'bg-[#00d4ff] text-black font-semibold'
                          : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                        }
                      `}
                    >
                      {type.label}
                    </button>
                  ))}

                  {/* Chapter filter - only show when sections selected */}
                  {filters.type === 'section' && (
                    <select
                      value={filters.chapter}
                      onChange={(e) => setFilters(f => ({ ...f, chapter: e.target.value }))}
                      className="ml-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#0d1117] text-gray-200 border border-[#1e2530] outline-none focus:border-[#00d4ff] cursor-pointer"
                      style={{ colorScheme: 'dark' }}
                    >
                      <option value="all" className="bg-[#0d1117] text-gray-200">All Chapters</option>
                      {chapters.map(c => (
                        <option key={c.id} value={c.id} className="bg-[#0d1117] text-gray-200">Ch. {c.number}: {c.title.slice(0, 20)}{c.title.length > 20 ? '...' : ''}</option>
                      ))}
                    </select>
                  )}
                </div>

                {/* Results */}
                <div
                  id="search-results"
                  ref={resultsContainerRef}
                  className="max-h-80 md:max-h-96 overflow-y-auto"
                  role="listbox"
                  aria-label="Search results"
                >
                  {results.length > 0 ? (
                    <div className="p-2">
                      {results.map((result, index) => (
                        <motion.button
                          key={`${result.type}-${result.id}`}
                          id={`search-result-${index}`}
                          data-result-item
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.03 }}
                          onClick={() => handleResultClick(result.path)}
                          className={`w-full flex items-start gap-3 p-3 rounded-xl text-left transition-colors group ${
                            selectedIndex === index
                              ? 'bg-white/10 ring-1 ring-[#00d4ff]/40'
                              : 'hover:bg-white/5'
                          }`}
                          role="option"
                          aria-selected={selectedIndex === index}
                        >
                          <span className={`
                            px-2 py-1 rounded text-xs font-medium uppercase flex-shrink-0
                            ${result.type === 'section' ? 'bg-[#00d4ff]/20 text-[#00d4ff]' : ''}
                            ${result.type === 'definition' ? 'bg-[#3b82f6]/20 text-[#3b82f6]' : ''}
                            ${result.type === 'stakeholder' ? 'bg-[#f59e0b]/20 text-[#f59e0b]' : ''}
                          `}>
                            {result.type.slice(0, 3)}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-white truncate group-hover:text-[#00d4ff] transition-colors">
                              <HighlightedText text={result.label} matches={result.matches} fieldKey="title" />
                            </p>
                            <p className="text-sm text-gray-500 truncate">
                              <HighlightedText text={result.description} matches={result.matches} fieldKey="content" />
                            </p>
                            {result.score !== undefined && (
                              <div className="flex items-center gap-2 mt-1">
                                <div className="h-1 w-16 bg-white/10 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-[#00d4ff] rounded-full"
                                    style={{ width: `${Math.max(10, (1 - result.score) * 100)}%` }}
                                  />
                                </div>
                                <span className="text-xs text-gray-600">
                                  {Math.round((1 - result.score) * 100)}% match
                                </span>
                              </div>
                            )}
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  ) : searchQuery ? (
                    <div className="p-8 text-center text-gray-500">
                      <Search className="w-12 h-12 mx-auto mb-3 opacity-30" />
                      <p className="text-white font-medium mb-1">No results found</p>
                      <p className="text-sm">Try different keywords or check your spelling</p>
                    </div>
                  ) : (
                    <div className="p-8 text-center text-gray-500">
                      <p>Start typing to search the Act...</p>
                      <p className="text-xs mt-2 text-gray-600">Fuzzy search enabled - typos are okay!</p>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="p-3 border-t border-white/5 flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-4">
                    <span className="hidden sm:flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 rounded bg-white/5">↑↓</kbd> Navigate
                    </span>
                    <span className="hidden sm:flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 rounded bg-white/5">↵</kbd> Select
                    </span>
                    {results.length > 0 && (
                      <span className="text-[#00d4ff]">{results.length} result{results.length !== 1 ? 's' : ''}</span>
                    )}
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
