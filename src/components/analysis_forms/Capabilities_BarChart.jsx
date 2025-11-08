import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { getTopStatsCountries, getTopCountriesByIndex } from '../../api/historical_analysis/capabilitiesApi';
import { TrendingUp, Loader2, AlertCircle, Calendar, RotateCcw } from 'lucide-react';
import { getCountryNameByCode } from '../../utils/COW_Country_Mapper';

// Component for interactive national capabilities analysis
const InteractiveCapabilities = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // User inputs
  const [year, setYear] = useState(2000);
  const [topN, setTopN] = useState(10);
  const [dataType, setDataType] = useState('cinc'); // 'cinc' or 'population' or 'pec' or 'irst'
  const [sortBy, setSortBy] = useState('population'); // 'population' or 'energy' or 'steel'

  // Map data type to label
  const metricLabel = (type) => {
    switch (type) {
      case 'population': return 'Population';
      case 'pec': return 'Primary Energy Consumption';
      case 'irst': return 'Iron & Steel Production';
      case 'cinc': return 'CINC Index';
      default: return 'CINC Index';
    }
  };

  // Map data type to API's sort_by value
  const mapDataTypeToSortBy = (dataType) => {
    switch (dataType) {
      case 'population': return 'population'; // Maps to API's 'population' enum value
      case 'pec': return 'energy'; // Maps to API's 'energy' enum value
      case 'irst': return 'steel';  // Maps to API's 'steel' enum value
      default: return 'population';
    }
  }

  // Format values for display
  const formatValue = (value, type) => {
    if (value == null) return 'N/A';
    if (type === 'population') return (value * 1000).toLocaleString(); // convert thousands → real pop
    return value.toLocaleString();
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      let response;
      if (dataType !== 'cinc') {
        response = await getTopStatsCountries(year, sortBy, topN);
      } else {
        response = await getTopCountriesByIndex(year, topN);
      }

      // Add country names to the data
      const dataWithNames = (response.data || []).map(item => ({
        ...item,
        country_name: getCountryNameByCode(item.country_code)
      }));

      setData(dataWithNames);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Rework: Fetch data on component mount and whenever dependencies change
  useEffect(() => {
    if (year >= 1800 && year <= 2020) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, topN, dataType, sortBy]);

  const handleDataTypeChange = (e) => {
    const newDataType = e.target.value;
    setDataType(newDataType);
    
    // Automatically set the sorting key to match the display metric
    const newSortBy = mapDataTypeToSortBy(newDataType);
    setSortBy(newSortBy);
  }

  const handleReset = () => {
    setYear(2000);
    setTopN(10);
    setDataType('cinc');
    setSortBy('population');
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-2xl shadow-lg p-8 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-10 h-10 text-emerald-600 animate-spin" />
          <p className="text-emerald-700 font-medium">Loading capabilities data...</p>
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
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-emerald-600 p-3 rounded-xl">
          <TrendingUp className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-800">National Capabilities Analysis</h2>
          <p className="text-sm text-gray-600">Compare countries by power metrics</p>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-emerald-600" />
          <h3 className="font-semibold text-gray-800">Analysis Parameters</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Year Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Year
            </label>
            <input
              type="number"
              min="1800"
              max="2020"
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none"
              placeholder="e.g., 2000"
            />
            <p className="text-xs text-gray-500 mt-1">Range: 1800-2020</p>
          </div>

          {/* Top N Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Countries
            </label>
            <select
              value={topN}
              onChange={(e) => setTopN(Number(e.target.value))}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none bg-white"
            >
              <option value={5}>Top 5</option>
              <option value={10}>Top 10</option>
              <option value={15}>Top 15</option>
              <option value={20}>Top 20</option>
              <option value={25}>Top 25</option>
            </select>
          </div>

          {/* Data Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Metric
            </label>
            <select
              value={dataType}
              onChange={handleDataTypeChange}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none bg-white"
            >
              <option value="cinc">Composite Index (CINC)</option>
              <option value="population">Population (Total)</option>
              <option value="pec">Primary Energy Consumption</option>
              <option value="irst">Iron & Steel Production</option>
            </select>
          </div>
        </div>

        {/* Reset Button */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleReset}
            className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Reset Filters
          </button>
        </div>
      </div>

      {/* Chart */}
      {data.length > 0 && (
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="mb-4">
            <h3 className="font-semibold text-gray-800">
              Top {topN} Countries by {metricLabel(dataType)} in {year}
            </h3>
          </div>

          {/* Add scrollable wrapper */}
          <div className="overflow-x-auto">
            <div className="min-w-[900px]">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="country_name" 
                    stroke="#6b7280"
                    style={{ fontSize: '12px' }}
                    angle={-45}
                    textAnchor="end"
                    height={90}
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
                    formatter={(value) => formatValue(value, dataType)}
                  />
                  <Legend />
                  <Bar 
                    dataKey={
                      dataType === 'cinc' 
                        ? 'composite_index'
                        : dataType === 'population'
                          ? 'population'
                          : dataType === 'pec'
                            ? 'primary_energy_consumption'
                            : 'iron_steel_production'
                    } 
                    fill="#059669"
                    radius={[4, 4, 0, 0]}
                    name={metricLabel(dataType)}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Data Table */}
          <div className="mt-6 overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 uppercase">Rank</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 uppercase">Country Code</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 uppercase">Country Name</th>
                  <th className="px-4 py-2 text-right text-xs font-semibold text-gray-700 uppercase">
                    {metricLabel(dataType)}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm">
                      <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                        index < 3 ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-700'
                      }`}>
                        {index + 1}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                      {item.country_code}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                      {item.country_name}
                    </td>
                    <td className="px-4 py-3 text-sm text-right font-bold text-emerald-700">
                      {dataType === 'cinc' 
                        ? (item.composite_index?.toFixed(4) ?? 'N/A')
                        : formatValue(
                            dataType === 'population' 
                              ? item.population
                              : dataType === 'pec'
                                ? item.primary_energy_consumption
                                : item.iron_steel_production,
                            dataType
                          )
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveCapabilities;
