import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, AlertCircle, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4"
    >
      <div
        className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6"
        style={{ background: 'rgba(239, 68, 68, 0.15)' }}
      >
        <AlertCircle className="w-10 h-10 text-red-400" />
      </div>

      <h1 className="text-5xl font-bold text-white mb-3">404</h1>
      <p className="text-xl text-gray-300 mb-2">Page Not Found</p>
      <p className="text-sm text-gray-500 max-w-md mb-8">
        The page you're looking for doesn't exist or may have been moved.
        Check the URL or navigate back to the dashboard.
      </p>

      <div className="flex items-center gap-4">
        <Link
          to="/"
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all"
          style={{
            background: 'linear-gradient(135deg, #00d4ff 0%, #3b82f6 100%)',
            color: 'white'
          }}
        >
          <Home className="w-4 h-4" />
          Back to Dashboard
        </Link>
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium bg-white/5 text-gray-300 hover:bg-white/10 transition-colors"
          style={{ border: '1px solid rgba(255, 255, 255, 0.1)' }}
        >
          <ArrowLeft className="w-4 h-4" />
          Go Back
        </button>
      </div>
    </motion.div>
  );
}
