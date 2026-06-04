import { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';

import Sidebar from './components/common/Sidebar';
import Header from './components/common/Header';
import DisclaimerModal from './components/common/DisclaimerModal';
import ErrorBoundary from './components/common/ErrorBoundary';

// Route-level code splitting with React.lazy
const Home = lazy(() => import('./pages/Home'));
const Navigator = lazy(() => import('./pages/Navigator'));
const Rules = lazy(() => import('./pages/Rules'));
const DataLifecycle = lazy(() => import('./pages/DataLifecycle'));
const Stakeholders = lazy(() => import('./pages/Stakeholders'));
const Penalties = lazy(() => import('./pages/Penalties'));
const Glossary = lazy(() => import('./pages/Glossary'));
const CaseLaw = lazy(() => import('./pages/CaseLaw'));
const GdprComparison = lazy(() => import('./pages/GdprComparison'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Loading fallback component
function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        <div
          className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin"
          style={{ borderColor: 'rgba(0, 212, 255, 0.3)', borderTopColor: 'transparent' }}
        />
        <p className="text-sm text-gray-500">Loading...</p>
      </div>
    </div>
  );
}

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
    <ErrorBoundary>
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
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/navigator" element={<Navigator />} />
                <Route path="/rules" element={<Rules />} />
                <Route path="/lifecycle" element={<DataLifecycle />} />
                <Route path="/stakeholders" element={<Stakeholders />} />
                <Route path="/penalties" element={<Penalties />} />
                <Route path="/glossary" element={<Glossary />} />
                <Route path="/jurisprudence" element={<CaseLaw />} />
                <Route path="/gdpr-comparison" element={<GdprComparison />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </motion.main>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
