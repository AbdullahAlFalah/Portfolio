import { useState, useEffect } from 'react';
import { AreaChart, Area, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { getAlliancesByDecade } from '../../api/historical_analysis/alliancesApi';
import { Calendar, Loader2, AlertCircle, Eye } from 'lucide-react';

// Component to display alliances formed by decade with various chart types and trendline option
const AlliancesByDecadeChart = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // User inputs
  const [startDecade, setStartDecade] = useState(1800);
  const [endDecade, setEndDecade] = useState(2000);
  const [chartType, setChartType] = useState('area'); // 'area', 'line', 'bar'
  const [showTrendline, setShowTrendline] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getAlliancesByDecade();
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

  // Apply filters
  useEffect(() => {
    if (data.length > 0) {
      const filtered = data.filter(item => 
        item.decade >= startDecade && item.decade <= endDecade
      );
      setFilteredData(filtered);
    }
  }, [data, startDecade, endDecade]);

  // Calculate trendline (simple moving average)
  const getTrendlineData = () => {
    if (filteredData.length < 3) return [];
    
    return filteredData.map((item, index, arr) => {
      if (index === 0 || index === arr.length - 1) return null;
      const avg = (arr[index - 1].total_alliances + item.total_alliances + arr[index + 1].total_alliances) / 3;
      return { ...item, trend: avg };
    }).filter(Boolean);
  };

  const trendlineData = showTrendline ? getTrendlineData() : [];

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-2xl shadow-lg p-8 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-10 h-10 text-emerald-600 animate-spin" />
          <p className="text-emerald-700 font-medium">Loading decade data...</p>
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

  const peakDecade = filteredData.reduce((max, d) => 
    d.total_alliances > (max?.total_alliances || 0) ? d : max
  , {});

  const renderChart = () => {
    const chartData = showTrendline && trendlineData.length > 0 
      ? filteredData.map(item => ({
          ...item,
          trend: trendlineData.find(t => t.decade === item.decade)?.trend
        }))
      : filteredData;

    switch (chartType) {
      case 'line':
        return (
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="decade" 
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
              tickFormatter={(value) => `${value}s`}
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
              labelFormatter={(value) => `${value}s`}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="total_alliances" 
              stroke="#059669" 
              strokeWidth={3}
              dot={{ fill: '#059669', r: 4 }}
              activeDot={{ r: 6 }}
              name="Alliances Formed"
            />
            {showTrendline && (
              <Line 
                type="monotone" 
                dataKey="trend" 
                stroke="#3b82f6" 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                name="Trend"
              />
            )}
          </LineChart>
        );
      
      case 'bar':
        return (
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="decade" 
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
              tickFormatter={(value) => `${value}s`}
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
              labelFormatter={(value) => `${value}s`}
            />
            <Legend />
            <Bar 
              dataKey="total_alliances" 
              fill="#059669"
              radius={[4, 4, 0, 0]}
              name="Alliances Formed"
            />
          </BarChart>
        );
      
      default: // area
        return (
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorAlliances" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#059669" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#059669" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="decade" 
              stroke="#6b7280"
              style={{ fontSize: '12px' }}
              tickFormatter={(value) => `${value}s`}
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
              labelFormatter={(value) => `${value}s`}
            />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="total_alliances" 
              stroke="#059669" 
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorAlliances)"
              name="Alliances Formed"
            />
            {showTrendline && (
              <Line 
                type="monotone" 
                dataKey="trend" 
                stroke="#3b82f6" 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                name="Trend"
              />
            )}
          </AreaChart>
        );
    }
  };

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-2xl shadow-lg p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-emerald-600 p-3 rounded-xl">
          <Calendar className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-800">Alliance Formation by Decade</h2>
          <p className="text-sm text-gray-600">Historical trends with customizable view</p>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Eye className="w-5 h-5 text-emerald-600" />
          <h3 className="font-semibold text-gray-800">Visualization Controls</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Decade Range: <span className="text-emerald-600 font-bold">{startDecade}s - {endDecade}s</span>
            </label>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-600">Start Decade</label>
                <input
                  type="range"
                  min="1800"
                  max="2000"
                  step="10"
                  value={startDecade}
                  onChange={(e) => setStartDecade(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
              </div>
              <div>
                <label className="text-xs text-gray-600">End Decade</label>
                <input
                  type="range"
                  min="1800"
                  max="2000"
                  step="10"
                  value={endDecade}
                  onChange={(e) => setEndDecade(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
              </div>
            </div>
          </div>

          {/* Chart Options */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Chart Type
              </label>
              <select
                value={chartType}
                onChange={(e) => setChartType(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none bg-white"
              >
                <option value="area">Area Chart</option>
                <option value="line">Line Chart</option>
                <option value="bar">Bar Chart</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="trendline"
                checked={showTrendline}
                onChange={(e) => setShowTrendline(e.target.checked)}
                className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
              />
              <label htmlFor="trendline" className="text-sm font-medium text-gray-700">
                Show Trendline
              </label>
            </div>
          </div>
        </div>

        {/* Reset Button */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => {
              setStartDecade(1800);
              setEndDecade(2000);
              setChartType('area');
              setShowTrendline(false);
            }}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
          >
            Reset All
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="overflow-x-auto">
          <div style={{ minWidth: `${filteredData.length * 60}px` }}>
            <ResponsiveContainer width="100%" height={350}>
              {renderChart()}
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-emerald-500">
          <p className="text-xs text-gray-500 uppercase mb-1">Peak Decade</p>
          <p className="text-2xl font-bold text-emerald-600">{peakDecade.decade}s</p>
          <p className="text-xs text-gray-600 mt-1">{peakDecade.total_alliances} alliances</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-blue-500">
          <p className="text-xs text-gray-500 uppercase mb-1">Total Alliances</p>
          <p className="text-2xl font-bold text-blue-600">
            {filteredData.reduce((sum, d) => sum + d.total_alliances, 0)}
          </p>
          <p className="text-xs text-gray-600 mt-1">In selected range</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-purple-500">
          <p className="text-xs text-gray-500 uppercase mb-1">Avg Per Decade</p>
          <p className="text-2xl font-bold text-purple-600">
            {filteredData.length > 0 
              ? Math.round(filteredData.reduce((sum, d) => sum + d.total_alliances, 0) / filteredData.length)
              : 0
            }
          </p>
          <p className="text-xs text-gray-600 mt-1">alliances</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-amber-500">
          <p className="text-xs text-gray-500 uppercase mb-1">Decades Shown</p>
          <p className="text-2xl font-bold text-amber-600">{filteredData.length}</p>
          <p className="text-xs text-gray-600 mt-1">data points</p>
        </div>
      </div>
    </div>
  );
};

export default AlliancesByDecadeChart;
