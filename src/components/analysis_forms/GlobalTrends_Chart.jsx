import { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getGlobalTrends } from '../../api/historical_analysis/globalApi';
import { Globe, Loader2, AlertCircle, LayoutGrid } from 'lucide-react';

// Component to display global trends of wars and alliances with various controls
const GlobalTrendsChart = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // User inputs
  const [startYear, setStartYear] = useState(1816);
  const [endYear, setEndYear] = useState(2010);
  const [chartType, setChartType] = useState('bar'); // 'bar', 'line', 'stacked'
  const [dataView, setDataView] = useState('both'); // 'both', 'wars', 'alliances'
  const [groupBy, setGroupBy] = useState(1); // 1, 5, 10 years

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getGlobalTrends();
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

  // Apply filters and grouping
  useEffect(() => {
    if (data.length > 0) {
      let filtered = data.filter(item => 
        item.year >= startYear && item.year <= endYear
      );

      // Group data if needed
      if (groupBy > 1) {
        const grouped = [];
        for (let i = 0; i < filtered.length; i += groupBy) {
          const chunk = filtered.slice(i, i + groupBy);
          if (chunk.length > 0) {
            grouped.push({
              year: chunk[0].year,
              wars: Math.round(chunk.reduce((sum, d) => sum + d.wars, 0) / chunk.length),
              alliances: Math.round(chunk.reduce((sum, d) => sum + d.alliances, 0) / chunk.length)
            });
          }
        }
        filtered = grouped;
      }

      setFilteredData(filtered);
    }
  }, [data, startYear, endYear, groupBy]);

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-2xl shadow-lg p-8 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-10 h-10 text-emerald-600 animate-spin" />
          <p className="text-emerald-700 font-medium">Loading global trends...</p>
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

  const totalWars = filteredData.reduce((sum, d) => sum + d.wars, 0);
  const totalAlliances = filteredData.reduce((sum, d) => sum + d.alliances, 0);

  const renderChart = () => {
    switch (chartType) {
      case 'line':
        return (
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
            <Legend />
            {(dataView === 'both' || dataView === 'wars') && (
              <Line 
                type="monotone" 
                dataKey="wars" 
                stroke="#dc2626" 
                strokeWidth={2}
                name="Wars"
                dot={{ fill: '#dc2626', r: 2 }}
              />
            )}
            {(dataView === 'both' || dataView === 'alliances') && (
              <Line 
                type="monotone" 
                dataKey="alliances" 
                stroke="#059669" 
                strokeWidth={2}
                name="Alliances"
                dot={{ fill: '#059669', r: 2 }}
              />
            )}
          </LineChart>
        );
      
      case 'stacked':
        return (
          <BarChart data={filteredData}>
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
            <Legend />
            {(dataView === 'both' || dataView === 'wars') && (
              <Bar 
                dataKey="wars" 
                stackId="a"
                fill="#dc2626" 
                name="Wars"
              />
            )}
            {(dataView === 'both' || dataView === 'alliances') && (
              <Bar 
                dataKey="alliances" 
                stackId="a"
                fill="#059669" 
                name="Alliances"
              />
            )}
          </BarChart>
        );
      
      default: // bar
        return (
          <BarChart data={filteredData}>
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
            <Legend />
            {(dataView === 'both' || dataView === 'wars') && (
              <Bar 
                dataKey="wars" 
                fill="#dc2626" 
                name="Wars"
                radius={[4, 4, 0, 0]}
              />
            )}
            {(dataView === 'both' || dataView === 'alliances') && (
              <Bar 
                dataKey="alliances" 
                fill="#059669" 
                name="Alliances"
                radius={[4, 4, 0, 0]}
              />
            )}
          </BarChart>
        );
    }
  };

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-2xl shadow-lg p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-emerald-600 p-3 rounded-xl">
          <Globe className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-800">Global Trends Analysis</h2>
          <p className="text-sm text-gray-600">Wars vs Alliances over time</p>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
        <div className="flex items-center gap-2 mb-4">
          <LayoutGrid className="w-5 h-5 text-emerald-600" />
          <h3 className="font-semibold text-gray-800">Visualization Controls</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Year Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Year Range: <span className="text-emerald-600 font-bold">{startYear} - {endYear}</span>
            </label>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-600">Start Year</label>
                <input
                  type="range"
                  min="1816"
                  max="2010"
                  step="10"
                  value={startYear}
                  onChange={(e) => setStartYear(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
              </div>
              <div>
                <label className="text-xs text-gray-600">End Year</label>
                <input
                  type="range"
                  min="1816"
                  max="2010"
                  step="10"
                  value={endYear}
                  onChange={(e) => setEndYear(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
              </div>
            </div>
          </div>

          {/* Display Options */}
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
                <option value="bar">Side-by-Side Bars</option>
                <option value="stacked">Stacked Bars</option>
                <option value="line">Line Chart</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Show Data
                </label>
                <select
                  value={dataView}
                  onChange={(e) => setDataView(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none bg-white text-sm"
                >
                  <option value="both">Both</option>
                  <option value="wars">Wars Only</option>
                  <option value="alliances">Alliances Only</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Group By
                </label>
                <select
                  value={groupBy}
                  onChange={(e) => setGroupBy(Number(e.target.value))}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none bg-white text-sm"
                >
                  <option value={1}>1 Year</option>
                  <option value={5}>5 Years</option>
                  <option value={10}>10 Years</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="mt-4">
          <p className="text-xs text-gray-600 mb-2 font-medium">Quick Periods:</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => { setStartYear(1816); setEndYear(1914); }}
              className="px-3 py-1.5 bg-gray-100 hover:bg-emerald-100 text-gray-700 hover:text-emerald-700 rounded-lg text-xs font-medium transition-colors"
            >
              Pre-WWI (1816-1914)
            </button>
            <button
              onClick={() => { setStartYear(1914); setEndYear(1945); }}
              className="px-3 py-1.5 bg-gray-100 hover:bg-emerald-100 text-gray-700 hover:text-emerald-700 rounded-lg text-xs font-medium transition-colors"
            >
              World Wars (1914-1945)
            </button>
            <button
              onClick={() => { setStartYear(1945); setEndYear(1991); }}
              className="px-3 py-1.5 bg-gray-100 hover:bg-emerald-100 text-gray-700 hover:text-emerald-700 rounded-lg text-xs font-medium transition-colors"
            >
              Cold War (1945-1991)
            </button>
            <button
              onClick={() => { setStartYear(1991); setEndYear(2010); }}
              className="px-3 py-1.5 bg-gray-100 hover:bg-emerald-100 text-gray-700 hover:text-emerald-700 rounded-lg text-xs font-medium transition-colors"
            >
              Post-Cold War (1991-2010)
            </button>
          </div>
        </div>

        {/* Reset Button */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => {
              setStartYear(1816);
              setEndYear(2010);
              setChartType('bar');
              setDataView('both');
              setGroupBy(1);
            }}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
          >
            Reset All
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <ResponsiveContainer width="100%" height={400}>
          {renderChart()}
        </ResponsiveContainer>
      </div>

      {/* Statistics Grid */}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-red-500">
          <p className="text-xs text-gray-500 uppercase mb-1">Total Wars</p>
          <p className="text-2xl font-bold text-red-600">{totalWars}</p>
          <p className="text-xs text-gray-600 mt-1">In selected period</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-emerald-500">
          <p className="text-xs text-gray-500 uppercase mb-1">Total Alliances</p>
          <p className="text-2xl font-bold text-emerald-600">{totalAlliances}</p>
          <p className="text-xs text-gray-600 mt-1">In selected period</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-blue-500">
          <p className="text-xs text-gray-500 uppercase mb-1">Ratio</p>
          <p className="text-2xl font-bold text-blue-600">
            {totalWars > 0 ? (totalAlliances / totalWars).toFixed(2) : '0'}
          </p>
          <p className="text-xs text-gray-600 mt-1">Alliances per War</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-purple-500">
          <p className="text-xs text-gray-500 uppercase mb-1">Years Shown</p>
          <p className="text-2xl font-bold text-purple-600">{filteredData.length}</p>
          <p className="text-xs text-gray-600 mt-1">Data points</p>
        </div>
      </div>

      {/* Insight */}
      <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
        <p className="text-xs text-blue-800">
          💡 <strong>Insight:</strong> This chart shows the relationship between international conflicts and diplomatic 
          cooperation over time. Higher alliance formation may indicate attempts to prevent wars or prepare for them.
        </p>
      </div>
    </div>
  );
};

export default GlobalTrendsChart;
