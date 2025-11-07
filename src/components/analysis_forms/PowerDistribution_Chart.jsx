import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getGlobalPowerDistribution } from '../../api/historical_analysis/globalApi';
import { TrendingUp, Loader2, AlertCircle } from 'lucide-react';

// Component to display global power distribution chart
const PowerDistributionChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getGlobalPowerDistribution();
        // Filter data for better visualization (e.g., from 1900 onwards)
        const filteredData = (response.data || []).filter(d => d.year >= 1900);
        setData(filteredData);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-2xl shadow-lg p-8 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-10 h-10 text-emerald-600 animate-spin" />
          <p className="text-emerald-700 font-medium">Loading power distribution...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-br from-red-50 to-rose-100 rounded-2xl shadow-lg p-8">
        <div className="flex items-center gap-3 text-red-700">
          <AlertCircle className="w-6 h-6" />
          <div>
            <h3 className="font-semibold text-lg">Error Loading Data</h3>
            <p className="text-sm mt-1">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  const avgShare = data.length > 0 
    ? (data.reduce((sum, d) => sum + d.top_10_share, 0) / data.length).toFixed(1)
    : 0;

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-2xl shadow-lg p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-emerald-600 p-3 rounded-xl">
          <TrendingUp className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Global Power Concentration</h2>
          <p className="text-sm text-gray-600">Top 10 countries' share of composite power index</p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className='overflow-x-auto'>
          <div style={{ minWidth: `${data.length * 50}px` }}>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="year" 
                  stroke="#6b7280"
                  style={{ fontSize: '12px' }}
                  interval="preserveStartEnd"
                />
                <YAxis 
                  stroke="#6b7280"
                  style={{ fontSize: '12px', fontWeight: '500' }}
                  domain={[0, 100]}
                  label={{ value: 'Share (%)', angle: -90, position: 'insideLeft', style: { fontSize: '12px' } }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                  formatter={(value) => `${value.toFixed(2)}%`}
                />
                <Legend 
                  wrapperStyle={{ paddingTop: '20px' }}
                  iconType="circle"
                />
                <Line 
                  type="monotone" 
                  dataKey="top_10_share" 
                  stroke="#059669" 
                  strokeWidth={3}
                  dot={{ fill: '#059669', r: 3 }}
                  activeDot={{ r: 5 }}
                  name="Top 10 Share"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-emerald-500">
          <p className="text-xs text-gray-500 uppercase mb-1">Average Share</p>
          <p className="text-2xl font-bold text-emerald-600">{avgShare}%</p>
          <p className="text-xs text-gray-600 mt-1">Since 1900</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-blue-500">
          <p className="text-xs text-gray-500 uppercase mb-1">Data Points</p>
          <p className="text-2xl font-bold text-blue-600">{data.length}</p>
          <p className="text-xs text-gray-600 mt-1">Years analyzed</p>
        </div>
      </div>

      <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
        <p className="text-xs text-blue-800">
          💡 <strong>Insight:</strong> Higher percentages indicate greater power concentration among top nations, 
          while lower percentages suggest a more multipolar world order.
        </p>
      </div>
    </div>
  );
};

export default PowerDistributionChart;
