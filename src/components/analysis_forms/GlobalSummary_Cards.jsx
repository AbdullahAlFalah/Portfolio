import { useState, useEffect } from 'react';
import { getGlobalSummary } from '../../api/historical_analysis/globalApi';
import { Swords, Shield, AlertTriangle, Loader2, AlertCircle } from 'lucide-react';

// Component to display global summary cards for wars, alliances, and disputes
const GlobalSummaryCards = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getGlobalSummary();
        if (response.data && response.data.length > 0) {
          setData(response.data[0]);
        }
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-2xl shadow-lg p-6 flex items-center justify-center min-h-[150px]">
            <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
          </div>
        ))}
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

  const cards = [
    {
      title: 'Total Wars',
      value: data?.total_wars?.total_wars || 0,
      icon: Swords,
      color: 'from-red-500 to-red-600',
      bgColor: 'from-red-50 to-rose-100'
    },
    {
      title: 'Total Alliances',
      value: data?.total_alliances?.total_alliances || 0,
      icon: Shield,
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'from-emerald-50 to-green-100'
    },
    {
      title: 'Total Disputes',
      value: data?.total_mids?.total_mids || 0,
      icon: AlertTriangle,
      color: 'from-amber-500 to-amber-600',
      bgColor: 'from-amber-50 to-yellow-100'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div 
            key={index}
            className={`bg-gradient-to-br ${card.bgColor} rounded-2xl shadow-lg p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 uppercase tracking-wide mb-2">
                  {card.title}
                </p>
                <p className="text-4xl font-bold text-gray-800">
                  {card.value.toLocaleString()}
                </p>
              </div>
              <div className={`bg-gradient-to-br ${card.color} p-4 rounded-xl shadow-md`}>
                <Icon className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                Historical records analyzed
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GlobalSummaryCards;
