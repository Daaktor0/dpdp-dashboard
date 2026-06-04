import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  RefreshCw,
  Users,
  AlertTriangle,
  BookMarked,
  ChevronLeft,
  ChevronRight,
  Scale,
  Gavel,
} from 'lucide-react';

const navItems = [
  {
    path: '/',
    label: 'Overview',
    icon: LayoutDashboard,
    description: 'Dashboard home'
  },
  {
    path: '/navigator',
    label: 'Act Navigator',
    icon: BookOpen,
    description: 'Explore the Act'
  },
  {
    path: '/rules',
    label: 'Rules 2025',
    icon: FileText,
    description: 'DPDP Rules',
    isNew: true
  },
  {
    path: '/lifecycle',
    label: 'Data Lifecycle',
    icon: RefreshCw,
    description: 'Data flow stages'
  },
  {
    path: '/stakeholders',
    label: 'Stakeholders',
    icon: Users,
    description: 'Roles & responsibilities'
  },
  {
    path: '/penalties',
    label: 'Penalties',
    icon: AlertTriangle,
    description: 'Penalty framework'
  },
  {
    path: '/glossary',
    label: 'Glossary',
    icon: BookMarked,
    description: 'Key definitions'
  },
  {
    path: '/jurisprudence',
    label: 'Case Law',
    icon: Gavel,
    description: 'Jurisprudence feed',
    isNew: true
  },
  {
    path: '/gdpr-comparison',
    label: 'DPDP vs GDPR',
    icon: Scale,
    description: 'Comparative analysis'
  }
];

export default function Sidebar({ collapsed, setCollapsed }) {
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCollapsed(true)}
            className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
      initial={false}
      animate={{ width: collapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed left-0 top-0 h-screen z-40 flex flex-col"
      style={{
        background: 'linear-gradient(180deg, rgba(10, 10, 15, 0.98) 0%, rgba(18, 18, 26, 0.98) 100%)',
        borderRight: '1px solid rgba(255, 255, 255, 0.08)'
      }}
    >
      {/* Logo Section */}
      <div className="p-4 flex items-center justify-between border-b border-white/5">
        <motion.div
          initial={false}
          animate={{ opacity: collapsed ? 0 : 1, width: collapsed ? 0 : 'auto' }}
          className="flex items-center gap-3 overflow-hidden"
        >
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
               style={{ background: 'linear-gradient(135deg, #00d4ff 0%, #3b82f6 100%)' }}>
            <Scale className="w-5 h-5 text-white" />
          </div>
          <div className="whitespace-nowrap">
            <h1 className="font-bold text-white text-lg">DPDP Act</h1>
            <p className="text-xs text-gray-500">2023 Dashboard</p>
          </div>
        </motion.div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-white/5 transition-colors text-gray-400 hover:text-white"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className="block"
            >
              <motion.div
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  relative flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200
                  ${isActive
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }
                `}
              >
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-xl"
                    style={{
                      background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.15) 0%, rgba(59, 130, 246, 0.15) 100%)',
                      border: '1px solid rgba(0, 212, 255, 0.3)'
                    }}
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}

                <div className={`
                  relative z-10 p-2 rounded-lg transition-colors
                  ${isActive ? 'bg-gradient-to-br from-[#00d4ff] to-[#3b82f6] text-white' : 'bg-white/5'}
                `}>
                  <Icon size={20} />
                </div>

                <motion.div
                  initial={false}
                  animate={{
                    opacity: collapsed ? 0 : 1,
                    width: collapsed ? 0 : 'auto'
                  }}
                  className="relative z-10 overflow-hidden whitespace-nowrap"
                >
                  <span className="font-medium flex items-center gap-2">
                    {item.label}
                    {item.isNew && (
                      <span className="px-1.5 py-0.5 text-[9px] font-bold rounded bg-green-500/20 text-green-400 uppercase">
                        New
                      </span>
                    )}
                  </span>
                  {!collapsed && (
                    <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
                  )}
                </motion.div>
              </motion.div>
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <motion.div
        initial={false}
        animate={{ opacity: collapsed ? 0 : 1 }}
        className="p-4 border-t border-white/5"
      >
        <div className="text-center">
          <p className="text-xs text-gray-500">Digital Personal Data</p>
          <p className="text-xs text-gray-500">Protection Act, 2023</p>
          <p className="text-xs text-gray-500 mt-2">Created by Abhinav Sharma</p>
        </div>
      </motion.div>
    </motion.aside>
    </>
  );
}
