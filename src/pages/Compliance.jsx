import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Shield,
  AlertTriangle,
  Baby,
  Users,
  Trash2,
  Globe,
  Building,
  CheckCircle2,
  Circle,
  ChevronDown,
  ChevronRight,
  Download,
  RotateCcw
} from 'lucide-react';

import { complianceCategories, complianceChecklist, complianceStats } from '../data/compliance';

const iconMap = {
  FileText,
  Shield,
  AlertTriangle,
  Baby,
  Users,
  Trash2,
  Globe,
  Building
};

export default function Compliance() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [checkedItems, setCheckedItems] = useState({});
  const [expandedItems, setExpandedItems] = useState({});

  // Filter items based on category
  const filteredItems = selectedCategory === 'all'
    ? complianceChecklist
    : complianceChecklist.filter(item => item.category === selectedCategory);

  // Calculate progress
  const totalCheckItems = filteredItems.reduce((acc, item) => acc + item.checkItems.length, 0);
  const completedCheckItems = filteredItems.reduce((acc, item) => {
    return acc + (item.checkItems.filter((_, idx) => checkedItems[`${item.id}-${idx}`]).length);
  }, 0);
  const progressPercentage = totalCheckItems > 0 ? Math.round((completedCheckItems / totalCheckItems) * 100) : 0;

  const toggleCheckItem = (itemId, checkIndex) => {
    setCheckedItems(prev => ({
      ...prev,
      [`${itemId}-${checkIndex}`]: !prev[`${itemId}-${checkIndex}`]
    }));
  };

  const toggleExpanded = (itemId) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const resetProgress = () => {
    setCheckedItems({});
  };

  const getItemProgress = (item) => {
    const total = item.checkItems.length;
    const completed = item.checkItems.filter((_, idx) => checkedItems[`${item.id}-${idx}`]).length;
    return { total, completed, percentage: Math.round((completed / total) * 100) };
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Overall Progress */}
        <div
          className="md:col-span-2 p-6 rounded-2xl"
          style={{
            background: 'rgba(26, 26, 40, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-white">Overall Compliance</h3>
              <p className="text-sm text-gray-500">{completedCheckItems} of {totalCheckItems} items completed</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-[#e94560]">{progressPercentage}%</p>
            </div>
          </div>
          <div className="h-3 rounded-full bg-white/5 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="h-full rounded-full"
              style={{
                background: progressPercentage === 100
                  ? 'linear-gradient(90deg, #10b981 0%, #059669 100%)'
                  : 'linear-gradient(90deg, #e94560 0%, #f4d160 100%)'
              }}
            />
          </div>
        </div>

        {/* Quick Stats */}
        <div
          className="p-6 rounded-2xl"
          style={{
            background: 'rgba(26, 26, 40, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}
        >
          <p className="text-sm text-gray-500 mb-1">Total Requirements</p>
          <p className="text-2xl font-bold text-white">{complianceStats.totalItems}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs px-2 py-1 rounded bg-[#e94560]/20 text-[#e94560]">
              {complianceStats.byPriority.critical} Critical
            </span>
            <span className="text-xs px-2 py-1 rounded bg-[#f4d160]/20 text-[#f4d160]">
              {complianceStats.byPriority.high} High
            </span>
          </div>
        </div>

        {/* Actions */}
        <div
          className="p-6 rounded-2xl flex flex-col justify-center gap-3"
          style={{
            background: 'rgba(26, 26, 40, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}
        >
          <button
            onClick={resetProgress}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Reset Progress
          </button>
          <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#e94560]/20 hover:bg-[#e94560]/30 text-[#e94560] transition-colors">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`
            px-4 py-2 rounded-xl text-sm font-medium transition-all
            ${selectedCategory === 'all'
              ? 'bg-[#e94560] text-white'
              : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
            }
          `}
        >
          All Categories
        </button>
        {complianceCategories.map((category) => {
          const Icon = iconMap[category.icon] || FileText;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all
                ${selectedCategory === category.id
                  ? 'text-white'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }
              `}
              style={{
                background: selectedCategory === category.id ? `${category.color}30` : undefined,
                border: selectedCategory === category.id ? `1px solid ${category.color}50` : undefined
              }}
            >
              <Icon className="w-4 h-4" style={{ color: selectedCategory === category.id ? category.color : undefined }} />
              {category.title}
            </button>
          );
        })}
      </div>

      {/* Compliance Items */}
      <div className="space-y-3">
        {filteredItems.map((item) => {
          const category = complianceCategories.find(c => c.id === item.category);
          const Icon = iconMap[category?.icon] || FileText;
          const progress = getItemProgress(item);
          const isExpanded = expandedItems[item.id];

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl overflow-hidden"
              style={{
                background: 'rgba(26, 26, 40, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              {/* Item Header */}
              <button
                onClick={() => toggleExpanded(item.id)}
                className="w-full flex items-center gap-4 p-4 text-left hover:bg-white/5 transition-colors"
              >
                <motion.div
                  animate={{ rotate: isExpanded ? 90 : 0 }}
                  className="text-gray-500"
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.div>

                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${category?.color}20` }}
                >
                  <Icon className="w-5 h-5" style={{ color: category?.color }} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-white truncate">{item.requirement}</h3>
                    <span className={`
                      text-xs px-2 py-0.5 rounded font-medium
                      ${item.priority === 'critical' ? 'bg-[#e94560]/20 text-[#e94560]' : ''}
                      ${item.priority === 'high' ? 'bg-[#f4d160]/20 text-[#f4d160]' : ''}
                      ${item.priority === 'medium' ? 'bg-[#4361ee]/20 text-[#4361ee]' : ''}
                    `}>
                      {item.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 truncate">{item.description}</p>
                </div>

                <div className="flex items-center gap-4 flex-shrink-0">
                  <span className="text-xs text-gray-500">S.{item.section}</span>
                  <div className="w-24">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-gray-500">{progress.completed}/{progress.total}</span>
                      <span className={progress.percentage === 100 ? 'text-[#10b981]' : 'text-gray-400'}>
                        {progress.percentage}%
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress.percentage}%` }}
                        className="h-full rounded-full"
                        style={{
                          background: progress.percentage === 100 ? '#10b981' : category?.color
                        }}
                      />
                    </div>
                  </div>
                </div>
              </button>

              {/* Checklist */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 pt-2 ml-14 border-t border-white/5">
                      <p className="text-sm text-gray-400 mb-4">{item.description}</p>
                      <div className="space-y-2">
                        {item.checkItems.map((checkItem, idx) => {
                          const isChecked = checkedItems[`${item.id}-${idx}`];
                          return (
                            <motion.button
                              key={idx}
                              onClick={() => toggleCheckItem(item.id, idx)}
                              whileHover={{ x: 4 }}
                              className="w-full flex items-center gap-3 p-3 rounded-xl text-left hover:bg-white/5 transition-colors"
                            >
                              <div
                                className={`
                                  w-5 h-5 rounded-md flex items-center justify-center transition-all
                                  ${isChecked
                                    ? 'bg-[#10b981] text-white'
                                    : 'bg-white/5 border border-white/20'
                                  }
                                `}
                              >
                                {isChecked && <CheckCircle2 className="w-4 h-4" />}
                              </div>
                              <span className={`
                                text-sm transition-colors
                                ${isChecked ? 'text-gray-500 line-through' : 'text-gray-300'}
                              `}>
                                {checkItem}
                              </span>
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
