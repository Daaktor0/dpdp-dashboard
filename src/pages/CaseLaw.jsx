import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gavel, Search, ExternalLink, Loader2, Star, Clock, X, Info } from 'lucide-react';

import { landmarkCases, caseTopics } from '../data/landmarkCases';

const TABS = [
  { id: 'landmark', label: 'Landmark', icon: Star },
  { id: 'recent', label: 'Recent', icon: Clock }
];

// Normalise a curated case into the same shape the API returns.
const fromLandmark = (c) => ({
  id: c.id,
  title: c.title,
  date: c.date,
  court: c.court,
  summary: c.summary,
  url: c.url,
  citation: c.citation,
  topics: c.topics || [],
  curated: true
});

function matchesQuery(item, q) {
  if (!q) return true;
  const hay = [item.title, item.court, item.summary, item.citation]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
  return q
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => hay.includes(term));
}

const CaseLaw = () => {
  const [tab, setTab] = useState('landmark');
  const [topic, setTopic] = useState('all');
  const [query, setQuery] = useState('');
  const [debounced, setDebounced] = useState('');

  const [liveCases, setLiveCases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState(null); // 'live' | 'fallback' | 'unconfigured' | 'error'

  const curated = useMemo(() => landmarkCases.map(fromLandmark), []);
  const debounceRef = useRef();

  // Debounce the search box.
  useEffect(() => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setDebounced(query.trim()), 400);
    return () => clearTimeout(debounceRef.current);
  }, [query]);

  // Fetch from the serverless API whenever the active query, tab or topic changes.
  const fetchCases = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    const topicLabel =
      topic !== 'all' ? (caseTopics.find((t) => t.id === topic)?.label || '') : '';
    const effectiveQuery = [debounced, topicLabel].filter(Boolean).join(' ');
    if (effectiveQuery) params.set('q', effectiveQuery);
    if (tab === 'recent') params.set('mode', 'recent');

    try {
      const res = await fetch(`/api/cases?${params.toString()}`);
      const json = await res.json();
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        setLiveCases(json.data);
        setApiStatus('live');
      } else {
        setLiveCases([]);
        setApiStatus(json.configured === false ? 'unconfigured' : 'fallback');
      }
    } catch (err) {
      setLiveCases([]);
      setApiStatus('error');
    } finally {
      setLoading(false);
    }
  }, [debounced, tab, topic]);

  useEffect(() => {
    fetchCases();
  }, [fetchCases]);

  // Decide what to show.
  const displayed = useMemo(() => {
    let base;
    if (tab === 'landmark') {
      const liveExtra = liveCases.filter((l) => !curated.some((c) => c.id === l.id));
      base = [...curated, ...liveExtra];
    } else {
      base =
        liveCases.length > 0
          ? liveCases
          : [...curated].sort((a, b) => (b.date || '').localeCompare(a.date || ''));
    }

    // Topic filter: curated cases carry topic tags; live results don't.
    if (topic !== 'all') {
      base = base.filter((c) => (c.curated ? (c.topics || []).includes(topic) : true));
    }

    // Client-side text filter — guarantees search works even without the API.
    return base.filter((c) => matchesQuery(c, debounced));
  }, [tab, topic, liveCases, curated, debounced]);

  const statusNote = {
    live: 'Live results from the IndianKanoon API.',
    fallback: 'Showing curated landmark cases. Live search is temporarily unavailable.',
    unconfigured:
      'Showing curated landmark cases. Set INDIANKANOON_API_KEY on the server to enable live search.',
    error: 'Showing curated landmark cases. Could not reach the case-law service.'
  }[apiStatus];

  return (
    <div className="p-6 max-w-7xl mx-auto text-gray-100">
      <div className="flex items-center space-x-3 mb-6">
        <Gavel className="w-8 h-8 text-blue-400" />
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            DPDP Case Law Database
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Landmark and recent Indian judgments on data protection &amp; privacy.
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="mb-4 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search cases by keyword, court, party or citation…"
          className="w-full bg-[rgba(26,26,40,0.6)] border border-gray-700 rounded-lg py-3 pl-10 pr-10 text-gray-200 focus:outline-none focus:border-blue-500 transition-colors"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            aria-label="Clear search"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Tabs + topic filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
        <div className="flex rounded-lg overflow-hidden border border-gray-700 w-fit">
          {TABS.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${
                  tab === t.id
                    ? 'bg-blue-500/20 text-blue-300'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                {t.label}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-2">
          {caseTopics.map((tp) => (
            <button
              key={tp.id}
              onClick={() => setTopic(tp.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                topic === tp.id
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                  : 'bg-white/5 text-gray-400 hover:text-white border border-transparent'
              }`}
            >
              {tp.label}
            </button>
          ))}
        </div>
      </div>

      {/* Status note */}
      {statusNote && (
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
          <Info className="w-3.5 h-3.5" />
          <span>{statusNote}</span>
        </div>
      )}

      {/* Results */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
        </div>
      ) : displayed.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <Search className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="text-white font-medium mb-1">No cases found</p>
          <p className="text-sm">Try a different keyword, topic or switch tabs.</p>
        </div>
      ) : (
        <>
          <p className="text-xs text-gray-500 mb-3">
            {displayed.length} case{displayed.length !== 1 ? 's' : ''}
            {debounced ? ` matching “${debounced}”` : ''}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {displayed.map((caseItem, index) => (
                <motion.div
                  key={caseItem.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: Math.min(index * 0.04, 0.3) }}
                  className="bg-[rgba(26,26,40,0.6)] border border-gray-800 rounded-xl p-6 hover:border-gray-600 transition-all shadow-lg backdrop-blur-sm flex flex-col"
                >
                  <div className="flex justify-between items-start mb-3 gap-3">
                    <h3 className="text-lg font-semibold text-blue-300">{caseItem.title}</h3>
                    <a
                      href={caseItem.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-400 flex-shrink-0"
                      aria-label="Open on IndianKanoon"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400 mb-3">
                    {caseItem.date && (
                      <span className="bg-gray-800 px-2 py-1 rounded">{caseItem.date}</span>
                    )}
                    <span>{caseItem.court}</span>
                    {caseItem.citation && <span className="text-gray-500">· {caseItem.citation}</span>}
                    {caseItem.curated && (
                      <span className="inline-flex items-center gap-1 text-amber-400">
                        <Star className="w-3 h-3" /> Landmark
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-300 line-clamp-4">{caseItem.summary}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </>
      )}
    </div>
  );
};

export default CaseLaw;
