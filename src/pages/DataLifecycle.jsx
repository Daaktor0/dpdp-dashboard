import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Download,
  Database,
  Cpu,
  Share2,
  Clock,
  Trash2,
  ChevronRight,
  Shield,
  AlertTriangle,
  FileText,
  ArrowRight
} from 'lucide-react';

import { lifecycleStages, lifecycleStats } from '../data/dataLifecycle';

const iconMap = {
  Download,
  Database,
  Cpu,
  Share2,
  Clock,
  Trash2
};

export default function DataLifecycle() {
  const [selectedStage, setSelectedStage] = useState('collection');

  const currentStage = lifecycleStages.find(s => s.id === selectedStage);
  const currentIndex = lifecycleStages.findIndex(s => s.id === selectedStage);

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.15) 0%, rgba(0, 212, 255, 0.05) 100%)',
            border: '1px solid rgba(0, 212, 255, 0.2)'
          }}
        >
          <p className="text-sm text-gray-400 mb-1">Lifecycle Stages</p>
          <p className="text-3xl font-bold text-[#00d4ff]">{lifecycleStats.totalStages}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-5 rounded-2xl"
          style={{
            background: 'rgba(13, 17, 23, 0.6)',
            border: '1px solid rgba(30, 37, 48, 0.8)'
          }}
        >
          <p className="text-sm text-gray-400 mb-1">Sections Involved</p>
          <p className="text-3xl font-bold text-[#3b82f6]">{lifecycleStats.sectionsInvolved}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-5 rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(239, 68, 68, 0.05) 100%)',
            border: '1px solid rgba(239, 68, 68, 0.2)'
          }}
        >
          <p className="text-sm text-gray-400 mb-1">Max Penalty</p>
          <p className="text-3xl font-bold text-[#ef4444]">{lifecycleStats.maxPenalty}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-5 rounded-2xl"
          style={{
            background: 'rgba(13, 17, 23, 0.6)',
            border: '1px solid rgba(30, 37, 48, 0.8)'
          }}
        >
          <p className="text-sm text-gray-400 mb-1">Principal Rights</p>
          <p className="text-3xl font-bold text-[#10b981]">{lifecycleStats.principalRights}</p>
        </motion.div>
      </div>

      {/* Lifecycle Flow Visualization */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="p-6 rounded-2xl overflow-x-auto"
        style={{
          background: 'rgba(13, 17, 23, 0.6)',
          border: '1px solid rgba(30, 37, 48, 0.8)'
        }}
      >
        <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
          <Cpu className="w-5 h-5 text-[#00d4ff]" />
          Data Lifecycle Flow
        </h3>

        {/* Flow diagram */}
        <div className="flex items-center justify-between gap-2 min-w-[800px] py-4">
          {lifecycleStages.map((stage, index) => {
            const Icon = iconMap[stage.icon] || Database;
            const isSelected = selectedStage === stage.id;
            const isCompleted = index < currentIndex;

            return (
              <div key={stage.id} className="flex items-center">
                <motion.button
                  onClick={() => setSelectedStage(stage.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    relative flex flex-col items-center gap-2 p-4 rounded-2xl transition-all
                    ${isSelected ? 'ring-2 ring-offset-2 ring-offset-[#0a0a0f]' : ''}
                  `}
                  style={{
                    background: isSelected
                      ? `linear-gradient(135deg, ${stage.color}25 0%, transparent 100%)`
                      : isCompleted
                        ? 'rgba(255, 255, 255, 0.05)'
                        : 'rgba(255, 255, 255, 0.02)',
                    border: `1px solid ${isSelected ? stage.color + '50' : 'rgba(255, 255, 255, 0.05)'}`,
                    '--tw-ring-color': stage.color
                  }}
                >
                  {/* Glow effect for selected */}
                  {isSelected && (
                    <motion.div
                      layoutId="stageGlow"
                      className="absolute inset-0 rounded-2xl"
                      style={{
                        background: `radial-gradient(circle at center, ${stage.color}20 0%, transparent 70%)`,
                        filter: 'blur(20px)'
                      }}
                    />
                  )}

                  <div
                    className="relative z-10 w-14 h-14 rounded-xl flex items-center justify-center"
                    style={{
                      background: `${stage.color}20`,
                      boxShadow: isSelected ? `0 0 20px ${stage.color}30` : 'none'
                    }}
                  >
                    <Icon className="w-7 h-7" style={{ color: stage.color }} />
                  </div>

                  <span className={`relative z-10 text-sm font-medium ${isSelected ? 'text-white' : 'text-gray-400'}`}>
                    {stage.shortName}
                  </span>

                  <span className="relative z-10 text-xs text-gray-600">
                    S.{stage.sections[0]}
                  </span>
                </motion.button>

                {/* Arrow between stages */}
                {index < lifecycleStages.length - 1 && (
                  <div className="flex items-center px-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: 40 }}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                      className="h-0.5 rounded-full"
                      style={{
                        background: index < currentIndex
                          ? `linear-gradient(90deg, ${lifecycleStages[index].color}, ${lifecycleStages[index + 1].color})`
                          : 'rgba(255, 255, 255, 0.1)'
                      }}
                    />
                    <ChevronRight
                      className="w-4 h-4"
                      style={{
                        color: index < currentIndex
                          ? lifecycleStages[index + 1].color
                          : 'rgba(255, 255, 255, 0.2)'
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Selected Stage Details */}
      <AnimatePresence mode="wait">
        {currentStage && (
          <motion.div
            key={currentStage.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* Main Info */}
            <div
              className="lg:col-span-2 rounded-2xl p-6"
              style={{
                background: 'rgba(13, 17, 23, 0.6)',
                border: '1px solid rgba(30, 37, 48, 0.8)'
              }}
            >
              <div className="flex items-start gap-4 mb-6">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{
                    background: `${currentStage.color}20`,
                    boxShadow: `0 0 30px ${currentStage.color}20`
                  }}
                >
                  {(() => {
                    const Icon = iconMap[currentStage.icon] || Database;
                    return <Icon className="w-8 h-8" style={{ color: currentStage.color }} />;
                  })()}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white mb-2">{currentStage.name}</h2>
                  <p className="text-gray-400">{currentStage.description}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {currentStage.sections.map(section => (
                      <span
                        key={section}
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{
                          background: `${currentStage.color}20`,
                          color: currentStage.color
                        }}
                      >
                        Section {section}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Key Obligations */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                  <div className="w-1 h-4 rounded-full" style={{ background: currentStage.color }} />
                  Key Obligations
                </h3>
                <div className="space-y-3">
                  {currentStage.keyObligations.map((obligation, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3 p-3 rounded-xl bg-white/5"
                    >
                      <div
                        className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: `${currentStage.color}20` }}
                      >
                        <FileText className="w-3 h-3" style={{ color: currentStage.color }} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-300">{obligation.text}</p>
                        <span className="text-xs text-gray-600">Section {obligation.section}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Penalty Warning */}
              <div
                className="p-4 rounded-xl"
                style={{
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.2)'
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-[#ef4444]" />
                  <span className="text-sm font-medium text-[#ef4444]">Penalty for Non-Compliance</span>
                </div>
                <p className="text-sm text-gray-400">{currentStage.penalties}</p>
              </div>
            </div>

            {/* Data Principal Rights */}
            <div
              className="rounded-2xl p-5"
              style={{
                background: 'rgba(13, 17, 23, 0.6)',
                border: '1px solid rgba(30, 37, 48, 0.8)'
              }}
            >
              <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#10b981]" />
                Data Principal Rights
              </h3>
              <div className="space-y-3">
                {currentStage.dataPrincipalRights.map((right, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 p-3 rounded-xl bg-white/5"
                  >
                    <div className="w-2 h-2 rounded-full bg-[#10b981] mt-1.5 flex-shrink-0" />
                    <span className="text-sm text-gray-300">{right}</span>
                  </motion.div>
                ))}
              </div>

              {/* Next Stage */}
              {currentIndex < lifecycleStages.length - 1 && (
                <motion.button
                  onClick={() => setSelectedStage(lifecycleStages[currentIndex + 1].id)}
                  whileHover={{ x: 4 }}
                  className="w-full mt-6 p-4 rounded-xl flex items-center justify-between text-left transition-colors hover:bg-white/5"
                  style={{
                    border: '1px solid rgba(255, 255, 255, 0.08)'
                  }}
                >
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Next Stage</p>
                    <p className="font-medium text-white">{lifecycleStages[currentIndex + 1].name}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-500" />
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
