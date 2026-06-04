// DPDP Rules 2025 - Enforcement Timeline Data
// Based on Rule 1 (Short title and commencement)

export const timelineInfo = {
  baseDate: '2025-11-13', // Date of publication in Official Gazette
  title: 'DPDP Rules 2025 Enforcement Timeline',
  description: 'Three-phase implementation of the Digital Personal Data Protection Rules, 2025'
};

export const phases = [
  {
    id: 1,
    name: 'Phase 1',
    shortName: 'Foundation',
    date: '2025-11-13',
    displayDate: 'November 13, 2025',
    rules: [1, 2, 17, 18, 19, 20, 21],
    ruleCount: 7,
    color: '#10b981', // Green
    bgColor: 'rgba(16, 185, 129, 0.15)',
    borderColor: 'rgba(16, 185, 129, 0.4)',
    description: 'Data Protection Board establishment and foundational definitions',
    keyItems: [
      'DPDP Rules commencement',
      'Key definitions established',
      'Data Protection Board constituted',
      'Board procedures defined',
      'Digital office operations enabled'
    ],
    detailedScope: {
      'Definitions': 'Techno-legal measures, user account, verifiable consent',
      'Board Setup': 'Chairperson and Member appointments via Search-cum-Selection Committee',
      'Board Operations': 'Meeting procedures, quorum (1/3), digital office functioning',
      'Compensation': 'Chairperson Rs. 4.5 lakh/month, Members Rs. 4 lakh/month'
    }
  },
  {
    id: 2,
    name: 'Phase 2',
    shortName: 'Consent',
    date: '2026-11-13',
    displayDate: 'November 13, 2026',
    rules: [4],
    ruleCount: 1,
    color: '#f59e0b', // Amber
    bgColor: 'rgba(245, 158, 11, 0.15)',
    borderColor: 'rgba(245, 158, 11, 0.4)',
    description: 'Consent Manager framework becomes operational',
    keyItems: [
      'Consent Manager registration opens',
      'Rs. 2 crore net worth requirement',
      'Board oversight of Consent Managers',
      'First Schedule obligations apply'
    ],
    detailedScope: {
      'Registration': 'Application to Board with prescribed particulars',
      'Requirements': 'Indian company, Rs. 2 Cr net worth, sound management',
      'Obligations': '7-year record retention, no sub-contracting, fiduciary duty',
      'Enforcement': 'Board may suspend/cancel registration for non-compliance'
    }
  },
  {
    id: 3,
    name: 'Phase 3',
    shortName: 'Full Compliance',
    date: '2027-05-13',
    displayDate: 'May 13, 2027',
    rules: [3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 22, 23],
    ruleCount: 15,
    color: '#3b82f6', // Blue
    bgColor: 'rgba(59, 130, 246, 0.15)',
    borderColor: 'rgba(59, 130, 246, 0.4)',
    description: 'Full compliance requirements come into effect',
    keyItems: [
      'Notice requirements mandatory',
      'Security safeguards enforced',
      '72-hour breach notification',
      'Data retention limits apply',
      'Child consent verification',
      'SDF obligations active',
      'Cross-border transfer rules',
      'Appellate process operational'
    ],
    detailedScope: {
      'Notices': 'Clear, itemised notice with withdrawal and rights info',
      'Security': 'Encryption, access control, logging (1 year minimum)',
      'Breaches': 'Immediate intimation + 72-hour detailed report to Board',
      'Children': 'Verifiable parental consent with identity verification',
      'SDFs': 'Annual DPIA, audits, algorithmic accountability, data localisation',
      'Rights': '90-day grievance response, nomination procedures',
      'Transfers': 'Subject to Central Government requirements'
    }
  }
];

// Calculate current phase based on today's date
export const getCurrentPhase = () => {
  const today = new Date();

  for (let i = phases.length - 1; i >= 0; i--) {
    const phaseDate = new Date(phases[i].date);
    if (today >= phaseDate) {
      return phases[i];
    }
  }

  return null; // Before any phase
};

// Get the next upcoming phase
export const getNextPhase = () => {
  const today = new Date();

  for (const phase of phases) {
    const phaseDate = new Date(phase.date);
    if (today < phaseDate) {
      return phase;
    }
  }

  return null; // All phases complete
};

// Calculate days until a specific date
export const getDaysUntil = (targetDate) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const target = new Date(targetDate);
  target.setHours(0, 0, 0, 0);

  const diffTime = target - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
};

// Get days until next phase
export const getDaysUntilNextPhase = () => {
  const nextPhase = getNextPhase();
  if (!nextPhase) return null;

  return getDaysUntil(nextPhase.date);
};

// Calculate progress percentage through all phases
export const getTimelineProgress = () => {
  const today = new Date();
  const startDate = new Date(phases[0].date);
  const endDate = new Date(phases[phases.length - 1].date);

  if (today < startDate) return 0;
  if (today >= endDate) return 100;

  const totalDuration = endDate - startDate;
  const elapsed = today - startDate;

  return Math.round((elapsed / totalDuration) * 100);
};

// Get status for a specific phase
export const getPhaseStatus = (phaseId) => {
  const today = new Date();
  const phase = phases.find(p => p.id === phaseId);

  if (!phase) return 'unknown';

  const phaseDate = new Date(phase.date);

  if (today >= phaseDate) {
    // Check if this is the latest active phase (i.e., the "current" one)
    const currentPhase = getCurrentPhase();
    if (currentPhase && currentPhase.id === phaseId) {
      return 'active';
    }
    // Past phase — its window has ended
    return 'completed';
  }

  // Check if next phase
  const currentPhase = getCurrentPhase();
  if (currentPhase && phase.id === currentPhase.id + 1) {
    return 'upcoming';
  }

  return 'future';
};

// Get all rules currently in effect
export const getActiveRules = () => {
  const today = new Date();
  let activeRules = [];

  for (const phase of phases) {
    const phaseDate = new Date(phase.date);
    if (today >= phaseDate) {
      activeRules = [...activeRules, ...phase.rules];
    }
  }

  return activeRules;
};

// Get all rules coming in next phase
export const getUpcomingRules = () => {
  const nextPhase = getNextPhase();
  return nextPhase ? nextPhase.rules : [];
};

// Format countdown display
export const formatCountdown = (days) => {
  if (days === null) return { text: 'All phases complete', detail: '' };
  if (days < 0) return { text: 'In effect', detail: `${Math.abs(days)} days ago` };
  if (days === 0) return { text: 'Today', detail: 'Enforcement begins today' };
  if (days === 1) return { text: '1 day', detail: 'Tomorrow' };
  if (days < 30) return { text: `${days} days`, detail: 'Less than a month' };
  if (days < 365) {
    const months = Math.floor(days / 30);
    return { text: `${days} days`, detail: `~${months} month${months > 1 ? 's' : ''}` };
  }
  const years = Math.floor(days / 365);
  const remainingMonths = Math.floor((days % 365) / 30);
  return {
    text: `${days} days`,
    detail: `~${years} year${years > 1 ? 's' : ''}${remainingMonths > 0 ? ` ${remainingMonths} month${remainingMonths > 1 ? 's' : ''}` : ''}`
  };
};

// Get formatted current status
export const getCurrentStatus = () => {
  const currentPhase = getCurrentPhase();
  const nextPhase = getNextPhase();
  const daysUntilNext = getDaysUntilNextPhase();
  const progress = getTimelineProgress();
  const activeRules = getActiveRules();

  return {
    currentPhase,
    nextPhase,
    daysUntilNext,
    countdown: formatCountdown(daysUntilNext),
    progress,
    activeRuleCount: activeRules.length,
    activeRules,
    totalRules: phases.reduce((sum, p) => sum + p.rules.length, 0)
  };
};

export default {
  timelineInfo,
  phases,
  getCurrentPhase,
  getNextPhase,
  getDaysUntil,
  getDaysUntilNextPhase,
  getTimelineProgress,
  getPhaseStatus,
  getActiveRules,
  getUpcomingRules,
  formatCountdown,
  getCurrentStatus
};
