import Fuse from 'fuse.js';

/**
 * Prepare searchable data from various sources
 */
export const prepareSearchData = (sections, definitions, stakeholders, chapters) => {
  const data = [];

  // Add sections
  sections.forEach(section => {
    const chapter = chapters.find(c => c.id === section.chapter);
    data.push({
      type: 'section',
      id: section.id,
      title: `Section ${section.number}: ${section.title}`,
      number: section.number,
      chapter: section.chapter,
      chapterTitle: chapter?.title || '',
      content: section.summary || '',
      keyPoints: section.keyPoints?.join(' ') || '',
      path: `/navigator?section=${section.id}`
    });
  });

  // Add definitions
  definitions.forEach(def => {
    data.push({
      type: 'definition',
      id: def.id,
      title: def.term,
      category: def.category,
      content: def.definition,
      section: def.section,
      path: `/glossary?term=${def.id}`
    });
  });

  // Add stakeholders
  stakeholders.forEach(stakeholder => {
    data.push({
      type: 'stakeholder',
      id: stakeholder.id,
      title: stakeholder.name,
      content: stakeholder.description,
      section: stakeholder.section,
      path: `/stakeholders?id=${stakeholder.id}`
    });
  });

  return data;
};

/**
 * Fuse.js configuration for fuzzy search
 */
const fuseOptions = {
  keys: [
    { name: 'title', weight: 2.0 },
    { name: 'number', weight: 1.5 },
    { name: 'content', weight: 1.0 },
    { name: 'keyPoints', weight: 0.8 },
    { name: 'category', weight: 0.5 },
    { name: 'chapterTitle', weight: 0.5 }
  ],
  includeScore: true,
  includeMatches: true,
  threshold: 0.4,
  ignoreLocation: true,
  minMatchCharLength: 2,
  findAllMatches: true
};

/**
 * Create a Fuse search index
 */
export const createSearchIndex = (data) => {
  return new Fuse(data, fuseOptions);
};

/**
 * Highlight matched text in a string
 * Returns an array of {text, highlighted} segments
 */
export const getHighlightedSegments = (text, matches, key) => {
  if (!text || !matches) return [{ text, highlighted: false }];

  const keyMatches = matches.filter(m => m.key === key);
  if (keyMatches.length === 0) return [{ text, highlighted: false }];

  // Collect all match indices
  const allIndices = [];
  keyMatches.forEach(m => {
    if (m.indices) {
      m.indices.forEach(([start, end]) => {
        allIndices.push({ start, end: end + 1 });
      });
    }
  });

  if (allIndices.length === 0) return [{ text, highlighted: false }];

  // Sort by start position
  allIndices.sort((a, b) => a.start - b.start);

  // Merge overlapping indices
  const merged = [];
  let current = allIndices[0];
  for (let i = 1; i < allIndices.length; i++) {
    if (allIndices[i].start <= current.end) {
      current.end = Math.max(current.end, allIndices[i].end);
    } else {
      merged.push(current);
      current = allIndices[i];
    }
  }
  merged.push(current);

  // Build segments
  const segments = [];
  let lastEnd = 0;

  merged.forEach(({ start, end }) => {
    if (start > lastEnd) {
      segments.push({ text: text.slice(lastEnd, start), highlighted: false });
    }
    segments.push({ text: text.slice(start, end), highlighted: true });
    lastEnd = end;
  });

  if (lastEnd < text.length) {
    segments.push({ text: text.slice(lastEnd), highlighted: false });
  }

  return segments;
};

/**
 * Perform search with filters
 */
export const performSearch = (fuse, query, filters = {}) => {
  if (!query.trim()) return [];

  let results = fuse.search(query);

  // Apply type filter
  if (filters.type && filters.type !== 'all') {
    results = results.filter(r => r.item.type === filters.type);
  }

  // Apply chapter filter (for sections only)
  if (filters.chapter && filters.chapter !== 'all') {
    results = results.filter(r =>
      r.item.type !== 'section' || r.item.chapter === parseInt(filters.chapter)
    );
  }

  // Apply category filter (for definitions only)
  if (filters.category && filters.category !== 'all') {
    results = results.filter(r =>
      r.item.type !== 'definition' ||
      r.item.category?.toLowerCase() === filters.category.toLowerCase()
    );
  }

  return results;
};
