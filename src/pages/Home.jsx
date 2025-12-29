import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Users,
  ClipboardCheck,
  AlertTriangle,
  ArrowRight,
  Scale,
  Shield,
  FileText,
  Landmark,
  TrendingUp
} from 'lucide-react';

import { actInfo, chapters } from '../data/actStructure';
import { penalties, penaltyStats } from '../data/penalties';
import { stakeholders } from '../data/stakeholders';

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

const quickLinks = [
  {
    title: 'Act Navigator',
    description: 'Explore all 44 sections across 9 chapters',
    icon: BookOpen,
    path: '/navigator',
    color: '#e94560',
    stats: '44 Sections'
  },
  {
    title: 'Stakeholders',
    description: 'Understand roles, rights, and obligations',
    icon: Users,
    path: '/stakeholders',
    color: '#f4d160',
    stats: '6 Stakeholders'
  },
  {
    title: 'Compliance Tracker',
    description: 'Track your organization\'s compliance status',
    icon: ClipboardCheck,
    path: '/compliance',
    color: '#4361ee',
    stats: '8 Categories'
  },
  {
    title: 'Penalty Dashboard',
    description: 'Understand the penalty framework',
    icon: AlertTriangle,
    path: '/penalties',
    color: '#7209b7',
    stats: 'Up to ₹250 Cr'
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
    color: '#f4d160'
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
    color: '#e94560'
  }
];

export default function Home() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Hero Section */}
      <motion.section variants={itemVariants} className="relative overflow-hidden rounded-3xl p-8 md:p-12">
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(233, 69, 96, 0.15) 0%, rgba(15, 52, 96, 0.15) 100%)'
          }}
        />
        <div className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(233, 69, 96, 0.3) 0%, transparent 50%),
                             radial-gradient(circle at 80% 50%, rgba(67, 97, 238, 0.3) 0%, transparent 50%)`
          }}
        />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl" style={{ background: 'linear-gradient(135deg, #e94560 0%, #0f3460 100%)' }}>
              <Scale className="w-8 h-8 text-white" />
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white border border-white/20">
              No. 22 of 2023
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {actInfo.title}
          </h1>

          <p className="text-lg text-gray-300 max-w-3xl mb-6">
            {actInfo.purpose}
          </p>

          <div className="flex flex-wrap items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Landmark className="w-4 h-4 text-[#e94560]" />
              <span className="text-gray-400">Enacted:</span>
              <span className="text-white font-medium">{actInfo.dateEnacted}</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#4361ee]" />
              <span className="text-gray-400">Chapters:</span>
              <span className="text-white font-medium">{actInfo.totalChapters}</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#f4d160]" />
              <span className="text-gray-400">Sections:</span>
              <span className="text-white font-medium">{actInfo.totalSections}</span>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Quick Links Grid */}
      <motion.section variants={itemVariants}>
        <h2 className="text-xl font-semibold text-white mb-4">Quick Access</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

                    <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-[#e94560] transition-colors">
                      {link.title}
                    </h3>
                    <p className="text-sm text-gray-400 mb-3">{link.description}</p>

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
      <motion.section variants={itemVariants}>
        <h2 className="text-xl font-semibold text-white mb-4">Key Highlights</h2>
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

      {/* Chapters Overview */}
      <motion.section variants={itemVariants}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">Chapters at a Glance</h2>
          <Link
            to="/navigator"
            className="text-sm text-[#e94560] hover:text-[#f4d160] transition-colors flex items-center gap-1"
          >
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {chapters.slice(0, 6).map((chapter, index) => (
            <Link key={chapter.id} to={`/navigator?chapter=${chapter.id}`}>
              <motion.div
                whileHover={{ x: 4 }}
                className="p-4 rounded-xl flex items-start gap-4 transition-colors hover:bg-white/5"
                style={{
                  background: 'rgba(26, 26, 40, 0.4)',
                  border: '1px solid rgba(255, 255, 255, 0.05)'
                }}
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-[#e94560]/20 to-[#0f3460]/20 text-[#e94560] font-bold">
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
      <motion.section variants={itemVariants}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">Key Stakeholders</h2>
          <Link
            to="/stakeholders"
            className="text-sm text-[#e94560] hover:text-[#f4d160] transition-colors flex items-center gap-1"
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
      <motion.section variants={itemVariants}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">Penalty Framework</h2>
          <Link
            to="/penalties"
            className="text-sm text-[#e94560] hover:text-[#f4d160] transition-colors flex items-center gap-1"
          >
            View details <ArrowRight size={14} />
          </Link>
        </div>
        <div
          className="p-6 rounded-2xl"
          style={{
            background: 'rgba(26, 26, 40, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm text-gray-400">Maximum Penalty</p>
              <p className="text-3xl font-bold text-[#e94560]">{penaltyStats.maxTotalDisplay}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Minimum (Data Principal)</p>
              <p className="text-xl font-bold text-[#4361ee]">{penaltyStats.minDataPrincipalDisplay}</p>
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
    </motion.div>
  );
}
