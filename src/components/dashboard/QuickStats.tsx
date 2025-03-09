import { motion } from 'framer-motion';
import { FiUser, FiDollarSign, FiActivity } from 'react-icons/fi';
import { UserData } from '@/types/dashboard';

interface QuickStatsProps {
  userData: UserData;
}

export const QuickStats = ({ userData }: QuickStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm p-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Contact Info</p>
            <p className="text-lg font-semibold text-gray-900">{userData.mobile}</p>
            <p className="text-sm text-gray-600">{userData.email}</p>
          </div>
          <div className="p-3 bg-blue-50 rounded-full">
            <FiUser className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-sm p-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Location</p>
            <p className="text-lg font-semibold text-gray-900">{userData.city}</p>
            <p className="text-sm text-gray-600">Current City</p>
          </div>
          <div className="p-3 bg-green-50 rounded-full">
            <FiDollarSign className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-sm p-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Account Status</p>
            <p className="text-lg font-semibold text-gray-900">{userData.status}</p>
            <p className="text-sm text-gray-600">Current Status</p>
          </div>
          <div className="p-3 bg-purple-50 rounded-full">
            <FiActivity className="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}; 