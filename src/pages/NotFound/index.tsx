import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-9xl font-bold text-emerald-600">404</h1>
        <h2 className="text-3xl font-semibold mt-4 text-gray-800">Page Not Found</h2>
        <p className="text-gray-600 mt-2">
          Oops! The page you are looking for doesn't exist or has been moved.
        </p>
        
        <Link to="/">
          <button className="mt-6 px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-all active:scale-95">
            Back to Home
          </button>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
