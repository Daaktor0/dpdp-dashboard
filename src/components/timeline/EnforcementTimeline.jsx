import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  CheckCircle2,
  Timer,
  Circle,
  ChevronRight,
  Landmark,
  Users,
  Shield,
  ArrowRight
} from 'lucide-react';

import {
  phases,
  getCurrentStatus,
  getPhaseStatus,
  getDaysUntil
} from '../../data/enforcementTimeline';

const phaseIcons = {
  1: Landmark,
  2: Users,
  3: Shield
};

export default function EnforcementTimeline() {
  const [status, setStatus] = useState(getCurrentStatus());
  const [expandedPhase, setExpandedPhase] = useState(null);

  // Update status periodically (every minute)
  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(getCurrentStatus());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (phaseId) => {
    const phaseStatus = getPhaseStatus(phaseId);
    if (phaseStatus === 'active') {
      return <CheckCircle2 className="w-5 h-5" />;
    }
    if (phaseStatus === 'upcoming') {
      return <Timer className="w-5 h-5" />;
    }
    return <Circle className="w-5 h-5" />;
  };

  const getStatusLabel = (phaseId) => {
    const phaseStatus = getPhaseStatus(phaseId);
    if (phaseStatus === 'active') return 'Active';
    if (phaseStatus === 'upcoming') return 'Upcoming';
    return 'Future';
  };

  return (
    <div className="space-y-6">
      {/* Header with Countdown */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#00d4ff]" />
            DPDP Rules 2025 Enforcement Timeline
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            {status.activeRuleCount} of {status.totalRules} rules currently in effect
          </p>
        </div>

        {/* Countdown Widget */}
        {status.nextPhase && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-4 px-5 py-3 rounded-xl"
            style={{
              background: `${status.nextPhase.bgColor}`,
              border: `1px solid ${status.nextPhase.borderColor}`
            }}
          >
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" style={{ color: status.nextPhase.color }} />
              <div>
                <p className="text-xs text-gray-400">Next: {status.nextPhase.name}</p>
                <p className="text-lg font-bold text-white">{status.countdown.text}</p>
              </div>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div className="text-right">
              <p className="text-xs text-gray-400">{status.nextPhase.displayDate}</p>
              <p className="text-xs text-gray-500">{status.countdown.detail}</p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Visual Timeline Strip */}
      <div className="space-y-3">
        <div className="flex overflow-hidden rounded-full border border-white/10 bg-white/5">
          {phases.map((phase) => {
            const phaseStatus = getPhaseStatus(phase.id);
            const opacity = phaseStatus === 'active' ? 1 : phaseStatus === 'upcoming' ? 0.8 : 0.5;
            return (
              <div
                key={phase.id}
                className="flex-1 h-10 flex items-center justify-center text-xs font-semibold"
                style={{ background: `${phase.color}40`, color: phase.color, opacity }}
              >
                Phase {phase.id}
              </div>
            );
          })}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {phases.map((phase) => {
            const phaseStatus = getPhaseStatus(phase.id);
            const daysUntil = getDaysUntil(phase.date);
            return (
              <div
                key={phase.id}
                className="p-3 rounded-xl text-sm"
                style={{
                  background: 'rgba(13, 17, 23, 0.5)',
                  border: '1px solid rgba(30, 37, 48, 0.8)'
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white">{phase.name}</span>
                  <span className="text-xs font-medium" style={{ color: phase.color }}>
                    {getStatusLabel(phase.id)}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
                  <span>{phase.displayDate}</span>
                  {phaseStatus !== 'active' && daysUntil > 0 && (
                    <span>{daysUntil} days</span>
                  )}
                  {phaseStatus === 'active' && (
                    <span>In effect</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative">
        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${status.progress}%` }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="h-full rounded-full"
            style={{
              background: 'linear-gradient(90deg, #10b981 0%, #00d4ff 50%, #3b82f6 100%)'
            }}
          />
        </div>

        {/* Phase markers on progress bar */}
        <div className="absolute top-0 left-0 right-0 flex justify-between">
          {phases.map((phase, index) => {
            const position = index === 0 ? 0 : index === phases.length - 1 ? 100 : 50;
            const phaseStatus = getPhaseStatus(phase.id);

            return (
              <div
                key={phase.id}
                className="relative"
                style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
              >
                <div
                  className={`w-4 h-4 rounded-full border-2 -mt-1 ${
                    phaseStatus === 'active'
                      ? 'bg-white border-white'
                      : phaseStatus === 'upcoming'
                      ? 'bg-transparent border-white/50'
                      : 'bg-transparent border-white/20'
                  }`}
                  style={
                    phaseStatus === 'active'
                      ? { boxShadow: `0 0 12px ${phase.color}` }
                      : {}
                  }
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Phase Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {phases.map((phase) => {
          const PhaseIcon = phaseIcons[phase.id];
          const phaseStatus = getPhaseStatus(phase.id);
          const daysUntil = getDaysUntil(phase.date);
          const isExpanded = expandedPhase === phase.id;

          return (
            <motion.div
              key={phase.id}
              whileHover={{ y: -2 }}
              onClick={() => setExpandedPhase(isExpanded ? null : phase.id)}
              className={`relative p-5 rounded-2xl cursor-pointer transition-all overflow-hidden ${
                phaseStatus === 'active' ? 'ring-2' : ''
              }`}
              style={{
                background: phase.bgColor,
                border: `1px solid ${phase.borderColor}`,
                ringColor: phaseStatus === 'active' ? phase.color : 'transparent'
              }}
            >
              {/* Status Badge */}
              <div className="absolute top-4 right-4">
                <span
                  className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                    phaseStatus === 'active'
                      ? 'bg-green-500/20 text-green-400'
                      : phaseStatus === 'upcoming'
                      ? 'bg-amber-500/20 text-amber-400'
                      : 'bg-gray-500/20 text-gray-400'
                  }`}
                >
                  {getStatusIcon(phase.id)}
                  {getStatusLabel(phase.id)}
                </span>
              </div>

              {/* Phase Header */}
              <div className="flex items-start gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${phase.color}30` }}
                >
                  <PhaseIcon className="w-5 h-5" style={{ color: phase.color }} />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{phase.name}</h3>
                  <p className="text-xs text-gray-400">{phase.shortName}</p>
                </div>
              </div>

              {/* Date */}
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-300">{phase.displayDate}</span>
                {daysUntil > 0 && (
                  <span className="text-xs text-gray-500">({daysUntil} days)</span>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-gray-400 mb-4">{phase.description}</p>

              {/* Rules Count */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  {phase.ruleCount} rule{phase.ruleCount > 1 ? 's' : ''}
                </span>
                <ChevronRight
                  className={`w-4 h-4 text-gray-500 transition-transform ${
                    isExpanded ? 'rotate-90' : ''
                  }`}
                />
              </div>

              {/* Expanded Content */}
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 pt-4 border-t border-white/10"
                >
                  <p className="text-xs font-medium text-gray-300 mb-2">Key Requirements:</p>
                  <ul className="space-y-1">
                    {phase.keyItems.slice(0, 5).map((item, i) => (
                      <li key={i} className="text-xs text-gray-400 flex items-start gap-2">
                        <span style={{ color: phase.color }}>•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={`/rules?phase=${phase.id}`}
                    className="inline-flex items-center gap-1 mt-3 text-xs font-medium hover:underline"
                    style={{ color: phase.color }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    View all Phase {phase.id} rules
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* View All Rules Link */}
      <div className="text-center">
        <Link
          to="/rules"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-[#00d4ff] hover:bg-white/5 transition-colors"
        >
          View complete DPDP Rules 2025
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
