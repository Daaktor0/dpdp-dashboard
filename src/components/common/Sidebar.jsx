import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  BookOpen,
  Users,
  ClipboardCheck,
  AlertTriangle,
  BookMarked,
  ChevronLeft,
  ChevronRight,
  Scale
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
    path: '/stakeholders',
    label: 'Stakeholders',
    icon: Users,
    description: 'Roles & responsibilities'
  },
  {
    path: '/compliance',
    label: 'Compliance',
    icon: ClipboardCheck,
    description: 'Compliance tracker'
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
  }
];

export default function Sidebar({ collapsed, setCollapsed }) {
  const location = useLocation();

  return (
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
               style={{ background: 'linear-gradient(135deg, #e94560 0%, #0f3460 100%)' }}>
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
                      background: 'linear-gradient(135deg, rgba(233, 69, 96, 0.15) 0%, rgba(15, 52, 96, 0.15) 100%)',
                      border: '1px solid rgba(233, 69, 96, 0.3)'
                    }}
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}

                <div className={`
                  relative z-10 p-2 rounded-lg transition-colors
                  ${isActive ? 'bg-gradient-to-br from-[#e94560] to-[#0f3460] text-white' : 'bg-white/5'}
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
                  <span className="font-medium">{item.label}</span>
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
          <p className="text-xs text-gray-600 mt-1">No. 22 of 2023</p>
        </div>
      </motion.div>
    </motion.aside>
  );
}
