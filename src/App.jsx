import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';

import Sidebar from './components/common/Sidebar';
import Header from './components/common/Header';

import Home from './pages/Home';
import Navigator from './pages/Navigator';
import Stakeholders from './pages/Stakeholders';
import Compliance from './pages/Compliance';
import Penalties from './pages/Penalties';
import Glossary from './pages/Glossary';

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <Router>
      <div className="min-h-screen" style={{ background: 'var(--color-bg-primary)' }}>
        {/* Sidebar */}
        <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />

        {/* Header */}
        <Header sidebarCollapsed={sidebarCollapsed} />

        {/* Main Content */}
        <motion.main
          initial={false}
          animate={{ marginLeft: sidebarCollapsed ? 80 : 280 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="pt-20 pb-8 px-6 min-h-screen"
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/navigator" element={<Navigator />} />
            <Route path="/stakeholders" element={<Stakeholders />} />
            <Route path="/compliance" element={<Compliance />} />
            <Route path="/penalties" element={<Penalties />} />
            <Route path="/glossary" element={<Glossary />} />
          </Routes>
        </motion.main>
      </div>
    </Router>
  );
}

export default App;
