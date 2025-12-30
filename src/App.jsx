import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';

import Sidebar from './components/common/Sidebar';
import Header from './components/common/Header';
import DisclaimerModal from './components/common/DisclaimerModal';

import Home from './pages/Home';
import Navigator from './pages/Navigator';
import DataLifecycle from './pages/DataLifecycle';
import Stakeholders from './pages/Stakeholders';
import Penalties from './pages/Penalties';
import Glossary from './pages/Glossary';

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Auto-collapse sidebar on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarCollapsed(true);
      }
    };

    // Initial check
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Router>
      <div className="min-h-screen" style={{ background: 'var(--color-bg-primary)' }}>
        {/* Legal Disclaimer Modal */}
        <DisclaimerModal />

        {/* Sidebar */}
        <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />

        {/* Header */}
        <Header sidebarCollapsed={sidebarCollapsed} />

        {/* Main Content */}
        <motion.main
          initial={false}
          animate={{ marginLeft: sidebarCollapsed ? 80 : 280 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="pt-20 pb-8 px-4 md:px-6 min-h-screen"
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/navigator" element={<Navigator />} />
            <Route path="/lifecycle" element={<DataLifecycle />} />
            <Route path="/stakeholders" element={<Stakeholders />} />
            <Route path="/penalties" element={<Penalties />} />
            <Route path="/glossary" element={<Glossary />} />
          </Routes>
        </motion.main>
      </div>
    </Router>
  );
}

export default App;
