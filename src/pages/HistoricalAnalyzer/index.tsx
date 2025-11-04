import {
    AIChatbot,
    AlliancesByDecadeChart,
    AllianceTypesPieChart,
    CapabilitiesBarChart as InteractiveCapabilities,
    DeadliestWarsTable as InteractiveDeadliestWars,
    GlobalSummaryCards,
    GlobalTrendsChart,
    InteractiveCountryAnalysis,
    MostActiveAlliancesChart,
    PowerDistributionChart,
    WarsByRegionChart,
    WarsByYearChart as InteractiveWarsChart
} from '../../components/analysis_forms';

export default function HistoricalAnalyzer() {

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Introductory Message */}
            <div className="container px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
                <div className='text-center my-8 sm:mb-12 lg:my-16'>
                    <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4'>
                        This is my <span className='text-green-700 capitalize'>historical analyzer!</span>
                    </h1>
                    <p className="text-lg sm:text-xl lg:text-2xl text-gray-800 max-w-3xl mx-auto mb-8">
                        An All in One Historical Data Analysis Tool
                    </p>
                    <p className='text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed'>
                        Explore wars, alliances, national capabilities, and leverage AI for insights.<br />
                        Dive deep into historical data with interactive visualizations and an AI assistant.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Global Overview Section */}
                <div className="space-y-8 mb-16">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                            Global Overview
                        </h2>
                        <p className="text-gray-600">
                            High-level statistics and trends across the entire historical dataset
                        </p>
                    </div>

                    <GlobalSummaryCards />
                    <GlobalTrendsChart />
                    <PowerDistributionChart />
                </div>

                {/* Wars Analysis Tab */}
                <div className="space-y-8">
                    {/* Instructions */}
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                        <h3 className="font-semibold text-blue-900 mb-3">💡 How to Use:</h3>
                        <ul className="space-y-2 text-sm text-blue-800">
                            <li>• <strong>Wars Over Time:</strong> Use sliders to filter by year range and minimum wars threshold</li>
                            <li>• <strong>Deadliest Wars:</strong> Select number of results, sort order, and filter by century</li>
                            <li>• <strong>Wars by Region:</strong> Adjust display options to see geographic distribution</li>
                            <li>• <strong>Interactive Stats:</strong> View real-time statistics as you adjust filters</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                            Wars Analysis
                        </h2>
                        <p className="text-gray-600">
                            Filter wars by year range, minimum threshold, and view detailed rankings
                        </p>
                    </div>

                    <InteractiveWarsChart />
                    <InteractiveDeadliestWars />
                    <WarsByRegionChart />
                </div>

                {/* Country Search Tab */}
                <div className="space-y-8">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2 mt-6">
                            Country Analysis
                        </h2>
                        <p className="text-gray-600">
                            Search by country code to view wars, alliances, and timeline
                        </p>
                    </div>
                    <InteractiveCountryAnalysis />
                </div>

                {/* Capabilities Tab */}
                <div className="space-y-8">
                    {/* Tips */}
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mt-6">
                        <h3 className="font-semibold text-amber-900 mb-3">📊 Analysis Tips:</h3>
                        <ul className="space-y-2 text-sm text-amber-800">
                            <li>• <strong>CINC Index:</strong> Composite Index of National Capability - measures overall power</li>
                            <li>• <strong>GDP:</strong> Economic strength indicator</li>
                            <li>• <strong>Year Range:</strong> 1800-2020 (data availability varies)</li>
                            <li>• <strong>Suggested Years:</strong> 1918 (WWI), 1945 (WWII), 1991 (Cold War End), 2010 (Modern Era)</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                            National Capabilities
                        </h2>
                        <p className="text-gray-600">
                            Compare countries by GDP or composite power index for any year
                        </p>
                    </div>
                    <InteractiveCapabilities />                      
                </div>

                {/* Alliances Tab */}
                <div className="space-y-8">
                    <div className='mt-6'>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                            Alliances Analysis
                        </h2>
                        <p className="text-gray-600">
                            Explore alliance trends, types, and most active participants
                        </p>
                    </div>

                    <AlliancesByDecadeChart />
                    <AllianceTypesPieChart />
                    <MostActiveAlliancesChart />
                </div>

                {/* AI Assistant Tab */}
                <div className="space-y-8">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2 mt-6">
                            AI Analysis Assistant
                        </h2>
                        <p className="text-gray-600">
                            Ask questions in natural language or use quick actions
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <AIChatbot />
                        </div>

                        {/* Tips Sidebar */}
                        <div className="space-y-4">
                            <div className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-xl p-6 shadow-lg">
                                <h3 className="font-bold text-lg text-gray-900 mb-3">
                                    💡 Tips for Better Results
                                </h3>
                                <ul className="space-y-2 text-sm text-gray-700">
                                    <li className="flex gap-2">
                                    <span className="text-emerald-600">→</span>
                                    <span>Be specific with your questions</span>
                                    </li>
                                    <li className="flex gap-2">
                                    <span className="text-emerald-600">→</span>
                                    <span>Use keywords like "deadliest", "most", "average"</span>
                                    </li>
                                    <li className="flex gap-2">
                                    <span className="text-emerald-600">→</span>
                                    <span>Request specific time periods or regions</span>
                                    </li>
                                    <li className="flex gap-2">
                                    <span className="text-emerald-600">→</span>
                                    <span>Ask for comparisons and trends</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 shadow-lg">
                                <h3 className="font-bold text-lg text-gray-900 mb-3">
                                    🎯 What You Can Ask
                                </h3>
                                <div className="space-y-2 text-sm text-gray-700">
                                    <p className="font-semibold text-blue-900">Wars:</p>
                                    <p className="text-xs">Deadliest wars, wars by region, average duration</p>
                                        
                                    <p className="font-semibold text-blue-900 mt-3">Alliances:</p>
                                    <p className="text-xs">Most active countries, types, trends over time</p>
                                        
                                    <p className="font-semibold text-blue-900 mt-3">Global:</p>
                                    <p className="text-xs">Power distribution, peace index, historical trends</p>
                                        
                                    <p className="font-semibold text-blue-900 mt-3">Comparisons:</p>
                                    <p className="text-xs">Compare wars vs alliances, power shifts</p>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-xl p-6 shadow-lg">
                                <h3 className="font-bold text-lg text-gray-900 mb-3">
                                    ⚡ Quick Actions
                                </h3>
                                <p className="text-sm text-gray-700 mb-3">
                                    Use the quick action buttons in the chat for common queries
                                </p>
                                <div className="text-xs text-purple-800 space-y-1">
                                    <p>• Click any suggested question</p>
                                    <p>• Use recent history to repeat queries</p>
                                    <p>• Clear chat to start fresh</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

        </div>
    );
}
