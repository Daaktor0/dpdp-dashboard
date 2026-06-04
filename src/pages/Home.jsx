import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Users,
  AlertTriangle,
  ArrowRight,
  Scale,
  Shield,
  FileText,
  Landmark,
  BookMarked,
  RefreshCw,
  Calendar,
  Check
} from 'lucide-react';

import { actInfo, chapters } from '../data/actStructure';
import { penalties, penaltyStats } from '../data/penalties';
import { stakeholders } from '../data/stakeholders';
import { phases, getPhaseStatus, getDaysUntil } from '../data/enforcementTimeline';
import { definitions } from '../data/definitions';
import { rules } from '../data/rulesStructure';
import EnforcementTimeline from '../components/timeline/EnforcementTimeline';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const sectionLinks = [
  { id: 'overview', label: 'Overview' },
  { id: 'summary', label: 'Executive Summary' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'hotspots', label: 'Risk Hotspots' },
  { id: 'quick-access', label: 'Quick Access' },
  { id: 'faqs', label: 'FAQs' }
];

const heroStats = [
  { label: 'Sections', value: actInfo.totalSections, accent: '#00d4ff' },
  { label: 'Chapters', value: actInfo.totalChapters, accent: '#3b82f6' },
  { label: 'Rights', value: '5', accent: '#10b981' },
  { label: 'Max Penalty', value: '₹250 Cr', accent: '#ef4444' }
];

const quickLinks = [
  {
    title: 'Act Navigator',
    description: 'Explore all 44 sections across 9 chapters',
    icon: BookOpen,
    path: '/navigator',
    color: '#00d4ff',
    stats: '44 Sections'
  },
  {
    title: 'DPDP Rules 2025',
    description: 'New rules with enforcement timeline',
    icon: Calendar,
    path: '/rules',
    color: '#10b981',
    stats: `${rules.length} Rules`,
    isNew: true
  },
  {
    title: 'Data Lifecycle',
    description: 'Complete data flow stages per DPDP Act',
    icon: RefreshCw,
    path: '/lifecycle',
    color: '#06b6d4',
    stats: '6 Stages'
  },
  {
    title: 'Stakeholders',
    description: 'Understand roles, rights, and obligations',
    icon: Users,
    path: '/stakeholders',
    color: '#f59e0b',
    stats: '6 Stakeholders'
  },
  {
    title: 'Penalty Dashboard',
    description: 'Understand the penalty framework',
    icon: AlertTriangle,
    path: '/penalties',
    color: '#8b5cf6',
    stats: 'Up to ₹250 Cr'
  },
  {
    title: 'Glossary',
    description: 'Key definitions and terminology explained',
    icon: BookMarked,
    path: '/glossary',
    color: '#3b82f6',
    stats: `${definitions.length} Definitions`
  }
];

const keyHighlights = [
  {
    title: 'Data Principal Rights',
    value: '5',
    subtitle: 'Access, Correction, Grievance, Nomination, Withdraw',
    icon: Shield,
    color: '#00d4ff'
  },
  {
    title: 'Data Principal Duties',
    value: '5',
    subtitle: 'Legal, No Impersonation, Authentic Info',
    icon: FileText,
    color: '#f59e0b'
  },
  {
    title: 'Legitimate Uses',
    value: '9',
    subtitle: 'Processing without explicit consent',
    icon: Scale,
    color: '#10b981'
  },
  {
    title: 'Max Penalty',
    value: '₹250 Cr',
    subtitle: 'For security safeguard breaches',
    icon: AlertTriangle,
    color: '#ef4444'
  }
];

const executiveSummary = [
  {
    title: 'What it is',
    text: 'The DPDP Act 2023 sets legal guardrails for processing digital personal data in India, with the 2025 Rules detailing phased enforcement.'
  },
  {
    title: 'What changes',
    text: 'Phase 1 is active (foundational definitions + Board setup). Phase 2 adds consent managers, while Phase 3 activates full compliance duties.'
  },
  {
    title: 'What to prepare',
    text: 'Tighten consent records, breach response, and child-data handling while documenting lawful purposes and retention logic.'
  },
  {
    title: 'What’s next',
    text: 'Align notices, security safeguards, and data minimization programs ahead of full compliance in Phase 3.'
  }
];

const riskHotspots = [
  {
    title: 'Children’s data',
    description: 'Verifiable parental consent, no tracking/targeted advertising, and stricter safeguards.'
  },
  {
    title: 'Consent quality',
    description: 'Prove consent was valid, track withdrawals, and ensure notices stay clear and standalone.'
  },
  {
    title: 'Data minimization',
    description: 'Collect only what is necessary, enforce retention limits, and erase once purpose ends.'
  }
];

const rightsList = [
  'Access information',
  'Correction and erasure',
  'Grievance redressal',
  'Nomination',
  'Withdraw consent'
];

const dutiesList = [
  'Comply with applicable laws',
  'No impersonation',
  'No suppression of material facts',
  'No false or frivolous complaints',
  'Provide authentic information'
];

const stakeholderList = [
  'Data Principal',
  'Data Fiduciary',
  'Data Processor',
  'Consent Manager',
  'Significant Data Fiduciary',
  'Data Protection Board'
];

const faqs = [
  {
    question: 'What is the DPDP Act and how do the Rules fit in?',
    answer: 'The DPDP Act 2023 is the primary law; the 2025 Rules operationalize it through phased enforcement and procedural detail.'
  },
  {
    question: 'Is Phase 1 active already?',
    answer: 'Yes. Phase 1 has been active since November 14, 2025.'
  },
  {
    question: 'When does Phase 2 start?',
    answer: 'Phase 2 begins on November 14, 2026, one year after the Rules were published.'
  },
  {
    question: 'When does Phase 3 start?',
    answer: 'Phase 3 begins on May 14, 2027, eighteen months after publication.'
  },
  {
    question: 'What are the five Data Principal rights?',
    answer: 'Access, correction/erasure, grievance redressal, nomination, and withdrawal of consent.'
  },
  {
    question: 'What is the maximum penalty under the Act?',
    answer: 'Up to ₹250 crore for breaches of reasonable security safeguards.'
  },
  {
    question: 'How large is the Act?',
    answer: 'The Act contains 44 sections across 9 chapters.'
  }
];

export default function Home() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((value) => value + 1);
    }, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const phaseTagData = useMemo(() => {
    return phases.map((phase) => {
      const status = getPhaseStatus(phase.id);
      const daysUntil = getDaysUntil(phase.date);
      const daysRemaining = Math.max(daysUntil, 0);
      const label = status === 'active' ? 'Active' : `in ${daysRemaining} days`;

      return {
        ...phase,
        status,
        daysRemaining,
        label,
        tag: `Phase ${phase.id} ${label}`
      };
    });
  }, [tick]);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-12"
    >
      {/* Hero Section */}
      <motion.section
        id="overview"
        variants={itemVariants}
        className="relative overflow-hidden rounded-3xl p-8 md:p-12 scroll-mt-24"
      >
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.12) 0%, rgba(59, 130, 246, 0.12) 100%)'
          }}
        />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(0, 212, 255, 0.25) 0%, transparent 50%),
                             radial-gradient(circle at 80% 50%, rgba(59, 130, 246, 0.25) 0%, transparent 50%)`
          }}
        />

        <div className="relative z-10 grid gap-10 lg:grid-cols-[1.2fr,0.8fr]">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div
                className="p-3 rounded-xl"
                style={{ background: 'linear-gradient(135deg, #00d4ff 0%, #3b82f6 100%)' }}
              >
                <Scale className="w-7 h-7 text-white" />
              </div>
              <span className="text-xs uppercase tracking-[0.2em] text-gray-400">
                DPDP Act 2023 + Rules 2025
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {actInfo.title}
            </h1>

            <p className="text-lg text-gray-300 max-w-2xl mb-6">
              {actInfo.purpose}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {phaseTagData.map((phase) => (
                <span
                  key={phase.id}
                  className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide"
                  style={{
                    background: `${phase.color}20`,
                    color: phase.color,
                    border: `1px solid ${phase.color}40`
                  }}
                >
                  {phase.tag}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {heroStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl p-4"
                  style={{
                    background: 'rgba(13, 17, 23, 0.65)',
                    border: '1px solid rgba(255, 255, 255, 0.08)'
                  }}
                >
                  <p className="text-2xl font-bold text-white" style={{ color: stat.accent }}>
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Landmark className="w-4 h-4 text-[#00d4ff]" />
                  <span className="text-gray-400">Act Enacted:</span>
                  <span className="text-white font-medium">{actInfo.dateEnacted}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#10b981]" />
                  <span className="text-gray-400">Rules Notified:</span>
                  <a 
                    href="https://www.meity.gov.in/documents/act-and-policies/digital-personal-data-protection-rules-2025-gDOxUjMtQWa" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-[#10b981] font-medium hover:underline transition-colors flex items-center gap-1"
                  >
                    14 Nov 2025
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                Last updated: {typeof __BUILD_DATE__ !== 'undefined' ? new Date(__BUILD_DATE__).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}
              </div>
            </div>
          </div>

          <div
            className="rounded-2xl p-5 h-fit"
            style={{
              background: 'rgba(13, 17, 23, 0.7)',
              border: '1px solid rgba(255, 255, 255, 0.08)'
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                Phase Snapshot
              </h3>
              <span className="text-xs text-gray-500">{actInfo.totalSections} sections</span>
            </div>

            <div className="space-y-3">
              {phaseTagData.map((phase) => (
                <div key={phase.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{
                        background: phase.color,
                        opacity: phase.status === 'future' ? 0.35 : 0.9
                      }}
                    />
                    <span className="text-sm font-medium text-white">Phase {phase.id}</span>
                    <span className="text-xs text-gray-500">{phase.shortName}</span>
                  </div>
                  <span className="text-sm font-semibold" style={{ color: phase.color }}>
                    {phase.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-5">
              <p className="text-xs text-gray-400 mb-2">Visual timeline</p>
              <div className="flex h-2 rounded-full overflow-hidden bg-white/5">
                {phaseTagData.map((phase) => (
                  <div
                    key={phase.id}
                    className="h-full"
                    style={{
                      width: `${100 / phaseTagData.length}%`,
                      background: phase.color,
                      opacity: phase.status === 'future' ? 0.35 : 0.85
                    }}
                  />
                ))}
              </div>
              <div className="mt-2 flex justify-between text-[10px] text-gray-500">
                {phaseTagData.map((phase) => (
                  <span key={phase.id}>Phase {phase.id}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Sticky Section Navigation */}
      <motion.nav
        variants={itemVariants}
        className="sticky top-20 z-20"
        aria-label="Section navigation"
      >
        <div
          className="flex items-center gap-2 overflow-x-auto px-3 py-2 rounded-2xl"
          style={{
            background: 'rgba(13, 17, 23, 0.85)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            backdropFilter: 'blur(12px)'
          }}
        >
          <span className="text-xs uppercase tracking-[0.2em] text-gray-500 px-2">
            Jump to
          </span>
          {sectionLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="px-3 py-1.5 rounded-full text-xs font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-colors whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
        </div>
      </motion.nav>

      {/* Executive Summary */}
      <motion.section
        id="summary"
        variants={itemVariants}
        className="scroll-mt-24"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-white/5">
            <FileText className="w-6 h-6 text-[#00d4ff]" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-white">Executive Summary</h2>
            <p className="text-sm text-gray-400">3-minute overview of what matters most</p>
          </div>
        </div>
        <div
          className="rounded-2xl p-6 md:p-8"
          style={{
            background: 'rgba(13, 17, 23, 0.6)',
            border: '1px solid rgba(30, 37, 48, 0.8)'
          }}
        >
          <ul className="space-y-4">
            {executiveSummary.map((item, index) => (
              <li key={item.title} className="flex items-start gap-4">
                <div
                  className="flex items-center justify-center h-8 w-8 rounded-full text-xs font-bold"
                  style={{ background: 'rgba(0, 212, 255, 0.15)', color: '#00d4ff' }}
                >
                  {index + 1}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white mb-1">{item.title}</p>
                  <p className="text-sm text-gray-400 max-w-3xl">{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </motion.section>

      {/* Enforcement Timeline Section */}
      <motion.section
        id="timeline"
        variants={itemVariants}
        className="p-6 md:p-8 rounded-2xl scroll-mt-24"
        style={{
          background: 'rgba(13, 17, 23, 0.6)',
          border: '1px solid rgba(30, 37, 48, 0.8)'
        }}
      >
        <EnforcementTimeline />
      </motion.section>

      {/* Risk Hotspots */}
      <motion.section
        id="hotspots"
        variants={itemVariants}
        className="scroll-mt-24"
      >
        <div
          className="rounded-2xl p-6 md:p-8 border-l-4"
          style={{
            background: 'rgba(26, 26, 40, 0.6)',
            borderColor: 'rgba(245, 158, 11, 0.8)'
          }}
        >
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-amber-500/15">
              <AlertTriangle className="w-6 h-6 text-amber-400" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-semibold text-white">Risk Hotspots</h2>
              <p className="text-sm text-gray-400 mt-1 max-w-2xl">
                Areas likely to trigger regulatory scrutiny or compliance incidents.
              </p>
              <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
                {riskHotspots.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-xl p-4"
                    style={{
                      background: 'rgba(13, 17, 23, 0.7)',
                      border: '1px solid rgba(255, 255, 255, 0.06)'
                    }}
                  >
                    <p className="text-sm font-semibold text-white mb-1">{item.title}</p>
                    <p className="text-xs text-gray-400">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Quick Links Grid */}
      <motion.section id="quick-access" variants={itemVariants} className="scroll-mt-24">
        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-5">Quick Access</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {quickLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <Link key={index} to={link.path}>
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative h-full p-6 rounded-2xl overflow-hidden transition-all duration-300"
                  style={{
                    background: 'rgba(26, 26, 40, 0.6)',
                    border: '1px solid rgba(255, 255, 255, 0.08)'
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${link.color}15 0%, transparent 100%)`
                    }}
                  />

                  <div className="relative z-10">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                      style={{ background: `${link.color}20` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: link.color }} />
                    </div>

                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold text-white group-hover:text-[#00d4ff] transition-colors">
                        {link.title}
                      </h3>
                      {link.isNew && (
                        <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-green-500/20 text-green-400 uppercase">
                          New
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-400 mb-3 max-w-sm">{link.description}</p>

                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium px-2 py-1 rounded-md bg-white/5 text-gray-300">
                        {link.stats}
                      </span>
                      <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </motion.section>

      {/* Key Highlights */}
      <motion.section id="highlights" variants={itemVariants} className="scroll-mt-24">
        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-5">Key Highlights</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {keyHighlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="p-5 rounded-2xl"
                style={{
                  background: 'rgba(26, 26, 40, 0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.08)'
                }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                  style={{ background: `${item.color}20` }}
                >
                  <Icon className="w-5 h-5" style={{ color: item.color }} />
                </div>
                <p className="text-2xl font-bold text-white mb-1">{item.value}</p>
                <p className="text-sm font-medium text-gray-300">{item.title}</p>
                <p className="text-xs text-gray-500 mt-1">{item.subtitle}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Rights, Duties, Stakeholders */}
      <motion.section id="key-lists" variants={itemVariants} className="scroll-mt-24">
        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-5">Key Lists</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            className="rounded-2xl p-5"
            style={{ background: 'rgba(26, 26, 40, 0.6)', border: '1px solid rgba(255, 255, 255, 0.08)' }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-4 h-4 text-[#00d4ff]" />
              <h3 className="text-sm font-semibold text-white">Rights</h3>
            </div>
            <ul className="space-y-2">
              {rightsList.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-gray-400">
                  <Check className="w-4 h-4 mt-0.5 text-[#00d4ff]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div
            className="rounded-2xl p-5"
            style={{ background: 'rgba(26, 26, 40, 0.6)', border: '1px solid rgba(255, 255, 255, 0.08)' }}
          >
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-4 h-4 text-[#f59e0b]" />
              <h3 className="text-sm font-semibold text-white">Duties</h3>
            </div>
            <ul className="space-y-2">
              {dutiesList.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-gray-400">
                  <Check className="w-4 h-4 mt-0.5 text-[#f59e0b]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div
            className="rounded-2xl p-5"
            style={{ background: 'rgba(26, 26, 40, 0.6)', border: '1px solid rgba(255, 255, 255, 0.08)' }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-4 h-4 text-[#10b981]" />
              <h3 className="text-sm font-semibold text-white">Stakeholders</h3>
            </div>
            <ul className="space-y-2">
              {stakeholderList.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-gray-400">
                  <Check className="w-4 h-4 mt-0.5 text-[#10b981]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.section>

      {/* Chapters Overview */}
      <motion.section id="chapters" variants={itemVariants} className="scroll-mt-24">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl md:text-3xl font-semibold text-white">Chapters at a Glance</h2>
          <Link
            to="/navigator"
            className="text-sm text-[#00d4ff] hover:text-[#3b82f6] transition-colors flex items-center gap-1"
          >
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {chapters.slice(0, 6).map((chapter) => (
            <Link key={chapter.id} to={`/navigator?chapter=${chapter.id}`}>
              <motion.div
                whileHover={{ x: 4 }}
                className="p-4 rounded-xl flex items-start gap-4 transition-colors hover:bg-white/5"
                style={{
                  background: 'rgba(13, 17, 23, 0.6)',
                  border: '1px solid rgba(30, 37, 48, 0.8)'
                }}
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-[#00d4ff]/20 to-[#3b82f6]/20 text-[#00d4ff] font-bold">
                  {chapter.number}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-white truncate">{chapter.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {chapter.sections.length} sections
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.section>

      {/* Stakeholders Preview */}
      <motion.section id="stakeholders" variants={itemVariants} className="scroll-mt-24">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl md:text-3xl font-semibold text-white">Key Stakeholders</h2>
          <Link
            to="/stakeholders"
            className="text-sm text-[#00d4ff] hover:text-[#3b82f6] transition-colors flex items-center gap-1"
          >
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {stakeholders.slice(0, 4).map((stakeholder) => (
            <Link key={stakeholder.id} to={`/stakeholders?id=${stakeholder.id}`}>
              <motion.div
                whileHover={{ y: -2 }}
                className="flex-shrink-0 w-64 p-5 rounded-2xl"
                style={{
                  background: 'rgba(26, 26, 40, 0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.08)'
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                  style={{ background: `${stakeholder.color}20` }}
                >
                  <Users className="w-6 h-6" style={{ color: stakeholder.color }} />
                </div>
                <h3 className="font-semibold text-white mb-1">{stakeholder.name}</h3>
                <p className="text-xs text-gray-500">Section {stakeholder.section}</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.section>

      {/* Penalty Scale Preview */}
      <motion.section id="penalties" variants={itemVariants} className="scroll-mt-24">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl md:text-3xl font-semibold text-white">Penalty Framework</h2>
          <Link
            to="/penalties"
            className="text-sm text-[#00d4ff] hover:text-[#3b82f6] transition-colors flex items-center gap-1"
          >
            View details <ArrowRight size={14} />
          </Link>
        </div>
        <div
          className="p-6 rounded-2xl"
          style={{
            background: 'rgba(13, 17, 23, 0.6)',
            border: '1px solid rgba(30, 37, 48, 0.8)'
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm text-gray-400">Maximum Penalty</p>
              <p className="text-3xl font-bold text-[#ef4444]">{penaltyStats.maxTotalDisplay}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Minimum (Data Principal)</p>
              <p className="text-xl font-bold text-[#3b82f6]">{penaltyStats.minDataPrincipalDisplay}</p>
            </div>
          </div>

          {/* Penalty bars */}
          <div className="space-y-3">
            {penalties.slice(0, 4).map((penalty) => (
              <div key={penalty.id} className="flex items-center gap-4">
                <div className="w-32 text-xs text-gray-400 truncate">S.{penalty.section}</div>
                <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(penalty.maxPenalty / penaltyStats.maxTotal) * 100}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full rounded-full"
                    style={{ background: penalty.color }}
                  />
                </div>
                <div className="w-24 text-right text-sm font-medium text-white">
                  {penalty.maxPenaltyDisplay}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* FAQs */}
      <motion.section id="faqs" variants={itemVariants} className="scroll-mt-24">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-white/5">
            <BookOpen className="w-6 h-6 text-[#00d4ff]" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-white">FAQs</h2>
            <p className="text-sm text-gray-400">Quick answers to the most common questions</p>
          </div>
        </div>
        <div className="space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-2xl p-5"
              style={{
                background: 'rgba(13, 17, 23, 0.6)',
                border: '1px solid rgba(30, 37, 48, 0.8)'
              }}
            >
              <summary className="flex cursor-pointer items-center justify-between text-sm font-semibold text-white">
                {faq.question}
                <span className="text-xs text-gray-500 group-open:text-[#00d4ff]">Toggle</span>
              </summary>
              <p className="text-sm text-gray-400 mt-3 max-w-3xl">{faq.answer}</p>
            </details>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
}
