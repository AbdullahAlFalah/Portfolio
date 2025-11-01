import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { getMostActiveAlliances } from '../../api/historical_analysis/alliancesApi';
import { Users, Loader2, AlertCircle, Filter } from 'lucide-react';
import { getCountryNameByCode } from '../../utils/COW_Country_Mapper';

// Component to display most active alliances chart with customization options
const MostActiveAlliancesChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // User inputs
  const [topN, setTopN] = useState(15);
  const [chartType, setChartType] = useState('Vbar'); // 'Vbar' or 'Hbar'
  const [colorScheme, setColorScheme] = useState('emerald'); // 'emerald', 'blue', 'purple'

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getMostActiveAlliances(topN);

      // Add country names to the data
      const dataWithNames = (response.data || []).map(item => ({
        ...item,
        country_name: getCountryNameByCode(item.country_code)
      }));

      setData(dataWithNames);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topN]);

  const getColor = () => {
    switch (colorScheme) {
      case 'blue': return '#3b82f6';
      case 'purple': return '#a855f7';
      default: return '#059669';
    }
  };

  if (loading && data.length === 0) {
    return (
      <div className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-2xl shadow-lg p-8 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-10 h-10 text-emerald-600 animate-spin" />
          <p className="text-emerald-700 font-medium">Loading alliance data...</p>
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
          <Users className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-800">Most Active Alliance Partners</h2>
          <p className="text-sm text-gray-600">Countries ranked by alliance participation</p>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-emerald-600" />
          <h3 className="font-semibold text-gray-800">Visualization Options</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Top N Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Countries
            </label>
            <div className="flex flex-wrap gap-2">
              {[10, 15, 20, 25, 30].map(num => (
                <button
                  key={num}
                  onClick={() => setTopN(num)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    topN === num
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* Chart Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Chart Orientation
            </label>
            <select
              value={chartType}
              onChange={(e) => setChartType(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none bg-white"
            >
              <option value="bar">Vertical Bars</option>
              <option value="horizontal">Horizontal Bars</option>
            </select>
          </div>

          {/* Color Scheme */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Color Scheme
            </label>
            <select
              value={colorScheme}
              onChange={(e) => setColorScheme(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none bg-white"
            >
              <option value="emerald">Emerald Green</option>
              <option value="blue">Ocean Blue</option>
              <option value="purple">Royal Purple</option>
            </select>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        {chartType === 'Vbar' ? (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart 
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                type="category"
                dataKey="country_name"
                stroke="#6b7280"
                style={{ fontSize: '12px' }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis
                type="number"
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
              <Bar 
                dataKey="alliance_count" 
                fill={getColor()}
                radius={[4, 4, 0, 0]}
                name="Alliance Count"
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height={450}>
            <BarChart 
              data={data}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                type="number"
                stroke="#6b7280"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                type="category"
                dataKey="country_name"
                stroke="#6b7280"
                style={{ fontSize: '11px' }}
                width={35}
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
              <Bar 
                dataKey="alliance_count" 
                fill={getColor()}
                radius={[0, 4, 4, 0]}
                name="Alliance Count"
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Top Countries Grid */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {data.slice(0, 5).map((item, index) => (
          <div 
            key={index}
            className="bg-white rounded-lg p-3 shadow-sm border-l-4"
            style={{ borderLeftColor: getColor() }}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-gray-500">#{index + 1}</span>
              <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold`}
                    style={{ 
                      borderLeftColor: getColor(), 
                      backgroundColor: "white",
                      color: getColor(), // Text color matches border
                      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.15)", // Clean neutral shadow
                    }}
              >
                {item.country_name}
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-800">{item.alliance_count}</div>
            <div className="text-xs text-gray-600">alliances</div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white rounded-lg p-3 shadow-sm">
          <div className="text-xs text-gray-500 uppercase">Total Countries</div>
          <div className="text-lg font-bold text-gray-800">{data.length}</div>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm">
          <div className="text-xs text-gray-500 uppercase">Total Alliances</div>
          <div className="text-lg font-bold" style={{ color: getColor() }}>
            {data.reduce((sum, d) => sum + d.alliance_count, 0)}
          </div>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm">
          <div className="text-xs text-gray-500 uppercase">Avg/Country</div>
          <div className="text-lg font-bold text-blue-600">
            {data.length > 0 
              ? (data.reduce((sum, d) => sum + d.alliance_count, 0) / data.length).toFixed(1)
              : 0
            }
          </div>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm">
          <div className="text-xs text-gray-500 uppercase">Most Active</div>
          <div className="text-lg font-bold text-purple-600">
            {data.length > 0 ? data[0].country_code : '-'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MostActiveAlliancesChart;
