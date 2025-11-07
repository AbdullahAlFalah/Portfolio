import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getWarsByYear } from '../../api/historical_analysis/warsApi';
import { TrendingUp, Loader2, AlertCircle, Calendar } from 'lucide-react';

// Component to display a line chart of wars by filtered year
const InteractiveWarsChart = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filter inputs
  const [startYear, setStartYear] = useState(1800);
  const [endYear, setEndYear] = useState(2020);
  const [minWars, setMinWars] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getWarsByYear();
        setData(response.data || []);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Apply filters whenever data or filter values change
  useEffect(() => {
    if (data.length > 0) {
      const filtered = data.filter(item => 
        item.year >= startYear && 
        item.year <= endYear &&
        item.total_wars >= minWars
      );
      setFilteredData(filtered);
    }
  }, [data, startYear, endYear, minWars]);

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-2xl shadow-lg p-8 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-10 h-10 text-emerald-600 animate-spin" />
          <p className="text-emerald-700 font-medium">Loading wars data...</p>
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

  const resetFilters = () => {
    setStartYear(1800);
    setEndYear(2020);
    setMinWars(0);
  };

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-2xl shadow-lg p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-emerald-600 p-3 rounded-xl">
          <TrendingUp className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-800">Wars Over Time</h2>
          <p className="text-sm text-gray-600">Filter and analyze historical conflicts</p>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-emerald-600" />
          <h3 className="font-semibold text-gray-800">Filters</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Start Year */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Year: <span className="text-emerald-600 font-bold">{startYear}</span>
            </label>
            <input
              type="range"
              min="1800"
              max="2020"
              value={startYear}
              onChange={(e) => setStartYear(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1800</span>
              <span>2020</span>
            </div>
          </div>

          {/* End Year */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Year: <span className="text-emerald-600 font-bold">{endYear}</span>
            </label>
            <input
              type="range"
              min="1800"
              max="2020"
              value={endYear}
              onChange={(e) => setEndYear(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1800</span>
              <span>2020</span>
            </div>
          </div>

          {/* Min Wars Threshold */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Min Wars: <span className="text-emerald-600 font-bold">{minWars}</span>
            </label>
            <input
              type="range"
              min="0"
              max="20"
              value={minWars}
              onChange={(e) => setMinWars(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0</span>
              <span>20+</span>
            </div>
          </div>
        </div>

        {/* Reset Button */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className='overflow-x-auto'>
          <div style={{ minWidth: `${data.length * 50}px` }}>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="year" 
                  stroke="#6b7280"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  stroke="#6b7280"
                  style={{ fontSize: '12px' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                />
                <Legend 
                  wrapperStyle={{ paddingTop: '20px' }}
                  iconType="circle"
                />
                <Line 
                  type="monotone" 
                  dataKey="total_wars" 
                  stroke="#059669" 
                  strokeWidth={3}
                  dot={{ fill: '#059669', r: 4 }}
                  activeDot={{ r: 6 }}
                  name="Total Wars"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white rounded-lg p-3 shadow-sm">
          <div className="text-xs text-gray-500 uppercase">Data Points</div>
          <div className="text-lg font-bold text-gray-800">{filteredData.length}</div>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm">
          <div className="text-xs text-gray-500 uppercase">Total Wars</div>
          <div className="text-lg font-bold text-emerald-600">
            {filteredData.reduce((sum, d) => sum + d.total_wars, 0)}
          </div>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm">
          <div className="text-xs text-gray-500 uppercase">Avg/Year</div>
          <div className="text-lg font-bold text-blue-600">
            {filteredData.length > 0 
              ? (filteredData.reduce((sum, d) => sum + d.total_wars, 0) / filteredData.length).toFixed(1)
              : 0
            }
          </div>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm">
          <div className="text-xs text-gray-500 uppercase">Peak Year</div>
          <div className="text-lg font-bold text-red-600">
            {filteredData.length > 0
              ? filteredData.reduce((max, d) => d.total_wars > max.total_wars ? d : max, filteredData[0]).year
              : '-'
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveWarsChart;
