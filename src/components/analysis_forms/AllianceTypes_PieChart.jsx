import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { getAllianceTypeDistribution } from '../../api/historical_analysis/alliancesApi';
import { Shield, Loader2, AlertCircle } from 'lucide-react';

// Component to display a pie chart of alliance types
const AllianceTypesPieChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Define colors for the pie chart slices
  // const SHADES_GREEN_COLORS = ['#059669', '#10b981', '#34d399', '#6ee7b7', '#a7f3d0', '#d1fae5']; // Old: Emerald shades
  const COLORS = [
    '#93C5FD', // Light Blue
    '#6EE7B7', // Light Green
    '#FCD34D', // Soft Yellow
    '#FCA5A5', // Light Red (coral)
    '#67E8F9', // Light Teal
    '#C4B5FD', // Light Purple
  ]; // New: Expanded pastel color palette for more variety

  // Map API alliance_type values to display names
  const ALLIANCE_TYPE_LABELS = {
    'defense': 'Defense Pact',
    'nonaggression': 'Non-Aggression Pact',
    'entente': 'Entente',
    'neutrality': 'Neutrality Pact',
    'undefined': 'Other'
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getAllianceTypeDistribution();

        // Transform the API data to match the expected simplified format for the pie chart
        const transformedData = (response.data || []).map(item => ({
          type: ALLIANCE_TYPE_LABELS[item.alliance_type] || item.alliance_type,
          count: item.count,
        }));

        setData(transformedData);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
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

  const total = data.reduce((sum, item) => sum + item.count, 0);

  // Custom label function for the pie chart
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    if (!percent || percent < 0.05) return null; // Don't show label for very small slices
    
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize="12"
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-2xl shadow-lg p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-emerald-600 p-3 rounded-xl">
          <Shield className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Alliance Type Distribution</h2>
          <p className="text-sm text-gray-600">Breakdown of formal alliances by type</p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm">
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={120}
              fill="#8884d8"
              dataKey="count"
              nameKey="type"
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              iconType="circle"
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Stats Cards */}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
        {data.map((item, index) => (
          <div 
            key={index}
            className="bg-white rounded-lg p-3 border-l-4 shadow-sm"
            style={{ borderLeftColor: COLORS[index % COLORS.length] }}
          >
            <div className="text-xs text-gray-500 uppercase">{item.type}</div>
            <div className="text-lg font-bold text-gray-800">{item.count}</div>
            <div className="text-xs text-gray-600">
              {((item.count / total) * 100).toFixed(1)}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllianceTypesPieChart;
