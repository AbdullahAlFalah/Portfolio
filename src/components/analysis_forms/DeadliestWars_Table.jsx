import { useState, useEffect } from 'react';
import { getDeadliestWars } from '../../api/historical_analysis/warsApi';
import { Skull, Loader2, AlertCircle, Sliders } from 'lucide-react';

// Component to display a table of the deadliest wars with user controls
const InteractiveDeadliestWars = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // User controls
  const [topN, setTopN] = useState(10);
  const [sortBy, setSortBy] = useState('casualties'); // 'casualties' or 'duration'
  const [yearFilter, setYearFilter] = useState('all'); // 'all', '1800s', '1900s', '2000s'

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getDeadliestWars(topN);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topN]);

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  // Apply filters and sorting
  const getFilteredData = () => {
    let filtered = [...data];

    // Year filter
    if (yearFilter !== 'all') {
      const century = parseInt(yearFilter);
      filtered = filtered.filter(war => {
        const year = war.start_year;
        return year >= century && year < century + 100;
      });
    }

    // Sort
    if (sortBy === 'duration') {
      filtered.sort((a, b) => (b.duration_years || 0) - (a.duration_years || 0)); // Use backend duration
    }

    return filtered;
  };

  const filteredData = getFilteredData();

  if (loading && data.length === 0) {
    return (
      <div className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-2xl shadow-lg p-8 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-10 h-10 text-emerald-600 animate-spin" />
          <p className="text-emerald-700 font-medium">Loading deadliest wars...</p>
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
          <Skull className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-800">Deadliest Wars in History</h2>
          <p className="text-sm text-gray-600">Customize view and filters</p>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Sliders className="w-5 h-5 text-emerald-600" />
          <h3 className="font-semibold text-gray-800">Controls</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Number of Wars */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Show Top: <span className="text-emerald-600 font-bold">{topN}</span> wars
            </label>
            <div className="flex gap-2">
              {[5, 10, 15, 20, 25].map(num => (
                <button
                  key={num}
                  onClick={() => setTopN(num)}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
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

          {/* Sort By */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none bg-white"
            >
              <option value="casualties">Casualties (Highest First)</option>
              <option value="duration">Duration (Longest First)</option>
            </select>
          </div>

          {/* Year Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time Period
            </label>
            <select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none bg-white"
            >
              <option value="all">All Periods</option>
              <option value="1800">1800s (19th Century)</option>
              <option value="1900">1900s (20th Century)</option>
              <option value="2000">2000s (21st Century)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-emerald-600 text-white">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">Rank</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">War Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Period</th>
                <th className="px-4 py-3 text-center text-sm font-semibold">Duration</th>
                <th className="px-4 py-3 text-right text-sm font-semibold">Casualties</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredData.map((war, index) => {
                return (
                  <tr 
                    key={index}
                    className="hover:bg-emerald-50 transition-colors duration-150"
                  >
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${
                        index < 3 
                          ? 'bg-emerald-600 text-white' 
                          : 'bg-gray-200 text-gray-700'
                      }`}>
                        {index + 1}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">{war.war_name}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm text-gray-600">
                        {war.start_year} - {war.end_year || 'Ongoing'}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      {/* Use backend duration_years */}
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {war.duration_years ? `${war.duration_years} years` : 'N/A'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      {/* Use backend total_casualties_formatted */}
                      <div className="font-bold text-red-600">
                        {war.total_casualties_formatted || formatNumber(war.total_casualties || 0)}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white rounded-lg p-3 shadow-sm border-l-4 border-emerald-500">
          <div className="text-xs text-gray-500 uppercase">Showing</div>
          <div className="text-lg font-bold text-gray-800">{filteredData.length}</div>
          <div className="text-xs text-gray-600">wars</div>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border-l-4 border-red-500">
          <div className="text-xs text-gray-500 uppercase">Total Casualties</div>
          <div className="text-lg font-bold text-red-600">
            {formatNumber(filteredData.reduce((sum, w) => sum + (w.total_casualties || 0), 0))}
          </div>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border-l-4 border-blue-500">
          <div className="text-xs text-gray-500 uppercase">Avg Duration</div>
          <div className="text-lg font-bold text-blue-600">
            {filteredData.length > 0
              ? (filteredData.reduce((sum, w) => sum + ((w.end_year || new Date().getFullYear()) - w.start_year), 0) / filteredData.length).toFixed(1)
              : 0
            } yrs
          </div>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border-l-4 border-purple-500">
          <div className="text-xs text-gray-500 uppercase">Deadliest</div>
          <div className="text-lg font-bold text-purple-600">
            {filteredData.length > 0
              ? formatNumber(Math.max(...filteredData.map(w => w.total_casualties || 0)))
              : 0
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveDeadliestWars;
