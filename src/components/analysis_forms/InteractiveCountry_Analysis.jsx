import { useState } from 'react';
import { getCountrySummary, getCountryTimeline } from '../../api/historical_analysis/countryApi';
import { getCountryCodeByName, COUNTRY_CODE_MAP } from '../../utils/COW_Country_Mapper';
import { Search, Loader2, AlertCircle, Globe, Calendar, Shield, Swords } from 'lucide-react';
import { formatMilper } from '../../utils/Number_Utils';

// Component for interactive country analysis with summary and timeline views
const InteractiveCountryAnalysis = () => {
  const [countryInput, setCountryInput] = useState('');
  const [data, setData] = useState(null);
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [view, setView] = useState('summary'); // 'summary' or 'timeline'

  // Derive a small “popular” selection dynamically
  const commonCountries = ['United States', 'United Kingdom', 'France', 'Germany', 'Russia', 'China', 'Japan', 'Iraq'];

  const fetchCountryData = async (ccode) => {
    if (!ccode) return;
    try {
      setLoading(true);
      setError(null);

      const [summaryRes, timelineRes] = await Promise.all([
        getCountrySummary(ccode),
        getCountryTimeline(ccode),
      ]);

      setData(summaryRes.data[0]);
      setTimeline(timelineRes.data || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch country data.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    let code = parseInt(countryInput);
    if (isNaN(code)) {
      // Try resolving from name
      code = getCountryCodeByName(countryInput);
    }
    if (code && code > 0) fetchCountryData(code);
    else setError('Invalid country name or code');
  };

  const handleQuickSelect = (countryName) => {
    const code = getCountryCodeByName(countryName);
    if (code) {
      setCountryInput(countryName);
      fetchCountryData(code);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  const getEventIcon = (type) => {
    const icons = {
      war: <Swords className="w-4 h-4 text-red-500" />,
      alliance: <Shield className="w-4 h-4 text-emerald-500" />,
      mid: <AlertCircle className="w-4 h-4 text-amber-500" />,
      territory: <Globe className="w-4 h-4 text-blue-500" />,
    };
    return icons[type] || <Calendar className="w-4 h-4 text-gray-500" />;
  };

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-2xl shadow-lg p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-emerald-600 p-3 rounded-xl">
          <Globe className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-800">Country Analysis</h2>
          <p className="text-sm text-gray-600">Enter a COW country name or code</p>
        </div>
      </div>

      {/* Search Section */}
      <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <input
            type="text"
            value={countryInput}
            onChange={(e) => setCountryInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter country name or code (e.g., USA or 2)"
            className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none"
            disabled={loading}
          />
          <button
            onClick={handleSearch}
            disabled={loading || !countryInput}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="hidden sm:inline">Loading...</span>
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                <span className="sm:hidden">Search</span> {/* Only visible on mobile */}
                <span className="hidden sm:inline">Analyze</span> {/* Only visible on larger screens */}
              </>
            )}
          </button>
        </div>

        {/* Quick Select */}
        <div>
          <p className="text-xs text-gray-600 mb-2 font-medium">Quick Select:</p>
          <div className="flex flex-wrap gap-2">
            {commonCountries.map((name) => (
              <button
                key={name}
                onClick={() => handleQuickSelect(name)}
                className="px-3 py-1.5 bg-gray-100 hover:bg-emerald-100 text-gray-700 hover:text-emerald-700 rounded-lg text-xs font-medium transition-colors"
              >
                {name} ({COUNTRY_CODE_MAP[name]})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-3 text-red-700">
            <AlertCircle className="w-5 h-5" />
            <div>
              <h3 className="font-semibold">Error</h3>
              <p className="text-sm mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      {data && (
        <div className="space-y-6">
          {/* View Toggle */}
          <div className="flex gap-2 bg-white rounded-lg p-1 shadow-sm w-fit">
            {['summary', 'timeline'].map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  view === v
                    ? 'bg-emerald-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {v === 'summary' ? 'Summary' : `Timeline (${timeline.length})`}
              </button>
            ))}
          </div>

          {/* Summary View */}
          {view === 'summary' && (
            <div className="space-y-4">
              {/* Wars */}
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <Swords className="w-5 h-5 text-red-500" />
                  <h3 className="font-semibold text-gray-800">Wars Involvement</h3>
                  <span className="ml-auto bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
                    {data.wars?.length || 0} wars
                  </span>
                </div>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {data.wars?.length ? (
                    data.wars.map((war, i) => (
                      <div key={i} className="p-3 bg-gray-50 rounded-lg">
                        <div className="font-medium text-gray-900">War #{war.war_num}</div>
                        <div className="font-medium text-gray-900">Conflict's Name: {war.war_name}</div>
                        <div className="text-sm text-gray-600">
                          {war.start_year} - {war.end_year || 'Ongoing'}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500 italic">No war involvement recorded</p>
                  )}
                </div>
              </div>

              {/* Alliances */}
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="w-5 h-5 text-emerald-500" />
                  <h3 className="font-semibold text-gray-800">Alliance Participation</h3>
                  <span className="ml-auto bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-semibold">
                    {data.alliances?.length || 0} alliances
                  </span>
                </div>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {data.alliances?.length ? (
                    data.alliances.map((a, i) => (
                      <div key={i} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="font-medium text-gray-900">Alliance #{a.alliance_id}</div>
                          <div className="font-medium text-gray-900">Alliance Members: {a.memebers}</div>
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                            {a.alliance_type}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {a.year_start} - {a.year_end || 'Present'}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500 italic">No alliance participation recorded</p>
                  )}
                </div>
              </div>

              {/* Latest Capabilities */}
              {data.latest_capabilities?.length > 0 && (
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <Globe className="w-5 h-5 text-blue-500" />
                    <h3 className="font-semibold text-gray-800">Latest Capabilities</h3>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="text-xs text-gray-600">Year</div>
                      <div className="text-lg font-bold text-blue-700">
                        {data.latest_capabilities[0].year}
                      </div>
                    </div>
                    <div className="p-3 bg-emerald-50 rounded-lg">
                      <div className="text-xs text-gray-600">CINC Index</div>
                      <div className="text-lg font-bold text-emerald-700">
                        {data.latest_capabilities[0].cinc?.toFixed(6) || 'N/A'}
                      </div>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <div className="text-xs text-gray-600">Military Personnel</div>
                      <div className="text-lg font-bold text-purple-700">
                        {formatMilper(data.latest_capabilities[0].milper)}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Timeline View */}
          {view === 'timeline' && (
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="space-y-3 max-h-[500px] overflow-y-auto">
                {timeline.length > 0 ? (
                  timeline.map((event, i) => (
                    <div key={i} className="flex gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className="flex-shrink-0 mt-1">{getEventIcon(event.type)}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-gray-900">{event.year}</span>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                              event.type === 'war'
                                ? 'bg-red-100 text-red-700'
                                : event.type === 'alliance'
                                ? 'bg-emerald-100 text-emerald-700'
                                : event.type === 'mid'
                                ? 'bg-amber-100 text-amber-700'
                                : 'bg-blue-100 text-blue-700'
                            }`}
                          >
                            {event.type.toUpperCase()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-700">{event.title}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 py-8">No timeline events available</p>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Empty State */}
      {!data && !loading && !error && (
        <div className="bg-white rounded-xl p-8 text-center">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-emerald-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Ready to Analyze</h3>
          <p className="text-sm text-gray-600">
            Enter a country name or select from quick options to view detailed analysis
          </p>
        </div>
      )}
    </div>
  );
};

export default InteractiveCountryAnalysis;
