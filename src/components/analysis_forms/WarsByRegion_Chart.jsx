import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getWarsByRegion } from '../../api/historical_analysis/warsApi';
import { MapPin, Loader2, AlertCircle, Sliders } from 'lucide-react';

// Component to display a bar chart of wars by region with filters
const WarsByRegionChart = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // User inputs
  const [limit, setLimit] = useState(15);
  const [minWars, setMinWars] = useState(0);
  const [sortOrder, setSortOrder] = useState('desc'); // 'desc' or 'asc'

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getWarsByRegion(50); // Fetch max, filter client-side
      setData(response.data || []);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Apply filters whenever data or filter values change
  useEffect(() => {
    if (data.length > 0) {
      let filtered = data.filter(item => item.total_wars >= minWars);
      
      // Sort
      filtered.sort((a, b) => {
        return sortOrder === 'desc' 
          ? b.total_wars - a.total_wars 
          : a.total_wars - b.total_wars;
      });
      
      // Limit
      filtered = filtered.slice(0, limit);
      
      setFilteredData(filtered);
    }
  }, [data, limit, minWars, sortOrder]);

  if (loading && data.length === 0) {
    return (
      <div className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-2xl shadow-lg p-8 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-10 h-10 text-emerald-600 animate-spin" />
          <p className="text-emerald-700 font-medium">Loading regional data...</p>
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

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-2xl shadow-lg p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-emerald-600 p-3 rounded-xl">
          <MapPin className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-800">Wars by Region</h2>
          <p className="text-sm text-gray-600">Geographic distribution with filters</p>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Sliders className="w-5 h-5 text-emerald-600" />
          <h3 className="font-semibold text-gray-800">Display Options</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Number of Regions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Show Top: <span className="text-emerald-600 font-bold">{limit}</span> regions
            </label>
            <input
              type="range"
              min="5"
              max="30"
              step="5"
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>5</span>
              <span>30</span>
            </div>
          </div>

          {/* Minimum Wars Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Min Wars: <span className="text-emerald-600 font-bold">{minWars}</span>
            </label>
            <input
              type="range"
              min="0"
              max="50"
              step="5"
              value={minWars}
              onChange={(e) => setMinWars(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0</span>
              <span>50+</span>
            </div>
          </div>

          {/* Sort Order */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sort Order
            </label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none bg-white"
            >
              <option value="desc">Highest First</option>
              <option value="asc">Lowest First</option>
            </select>
          </div>
        </div>

        {/* Reset Button */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => {
              setLimit(15);
              setMinWars(0);
              setSortOrder('desc');
            }}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <ResponsiveContainer width="100%" height={450}>
          <BarChart 
            data={filteredData} 
            layout="vertical"
            margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              type="number"
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              type="category"
              dataKey="region" 
              stroke="#6b7280"
              style={{ fontSize: '11px' }}
              width={95}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}
            />
            <Bar 
              dataKey="total_wars" 
              fill="#059669"
              radius={[0, 4, 4, 0]}
              name="Total Wars"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Statistics */}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white rounded-lg p-3 shadow-sm border-l-4 border-emerald-500">
          <div className="text-xs text-gray-500 uppercase">Regions Shown</div>
          <div className="text-lg font-bold text-gray-800">{filteredData.length}</div>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border-l-4 border-blue-500">
          <div className="text-xs text-gray-500 uppercase">Total Wars</div>
          <div className="text-lg font-bold text-blue-600">
            {filteredData.reduce((sum, d) => sum + d.total_wars, 0)}
          </div>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border-l-4 border-purple-500">
          <div className="text-xs text-gray-500 uppercase">Top Region</div>
          <div className="text-lg font-bold text-purple-600">
            {filteredData.length > 0 ? filteredData[0].region : '-'}
          </div>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border-l-4 border-amber-500">
          <div className="text-xs text-gray-500 uppercase">Avg/Region</div>
          <div className="text-lg font-bold text-amber-600">
            {filteredData.length > 0 
              ? (filteredData.reduce((sum, d) => sum + d.total_wars, 0) / filteredData.length).toFixed(1)
              : 0
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarsByRegionChart;
