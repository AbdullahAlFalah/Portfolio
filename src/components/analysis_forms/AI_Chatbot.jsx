import { useState, useRef, useEffect } from 'react';
import { askAI } from '../../api/historical_analysis/aiApi';
import { Send, Bot, User, Loader2, AlertCircle, Sparkles, Zap, History, Menu, X } from 'lucide-react';

// Component for AI-powered chatbot interface
const AIChatbot = () => {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: 'Hello! I\'m your AI assistant for historical conflict analysis. Ask me anything about wars, alliances, or global trends in the dataset!',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([]);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-hide quick actions after first message on mobile
  useEffect(() => {
    if (messages.length > 2 && window.innerWidth < 768) {
      setShowQuickActions(false);
    }
  }, [messages.length]);

  const handleSubmit = async (questionText = input) => {
    if (!questionText.trim() || loading) return;

    const userMessage = {
      type: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    // Save to history
    if (!conversationHistory.includes(questionText.trim())) {
      setConversationHistory(prev => [questionText.trim(), ...prev].slice(0, 5));
    }

    try {
      const response = await askAI(questionText.trim());
      
      const botMessage = {
        type: 'bot',
        content: response.analysis || 'I received your question but couldn\'t generate a response.',
        matchedRoute: response.matched_route,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        type: 'error',
        content: `Sorry, I encountered an error: ${error.message}`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const quickActions = [
    {
      category: 'Wars',
      icon: '⚔️',
      questions: [
        'What were the 5 deadliest wars?',
        'Show me wars by region',
        'What is the average war duration?',
        'Which wars lasted the longest?'
      ]
    },
    {
      category: 'Alliances',
      icon: '🤝',
      questions: [
        'Which countries have the most alliances?',
        'Show alliance types distribution',
        'How did alliances change by decade?',
      ]
    },
    {
      category: 'Global Trends',
      icon: '🌍',
      questions: [
        'Compare wars vs alliances over time',
        'Show global power distribution',
        'What are the global peace statistics?',
      ]
    }
  ];

  const clearChat = () => {
    setMessages([
      {
        type: 'bot',
        content: 'Chat cleared! How can I help you?',
        timestamp: new Date()
      }
    ]);
    setShowQuickActions(true);
  };

  const toggleQuickActions = () => {
    setShowQuickActions(!showQuickActions);
  };

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-2xl shadow-lg p-4 md:p-6 lg:p-8 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-2 md:p-3 rounded-xl shadow-lg">
            <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800">AI Analysis Assistant</h2>
            <p className="text-xs md:text-sm text-gray-600">Ask questions or use quick actions</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleQuickActions}
            className="md:hidden p-2 bg-white hover:bg-gray-100 text-gray-700 rounded-lg transition-colors"
            aria-label="Toggle quick actions"
          >
            {showQuickActions ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
          <button
            onClick={clearChat}
            className="px-3 py-1.5 bg-white hover:bg-gray-100 text-gray-700 rounded-lg text-sm transition-colors"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col gap-4 min-h-0 relative">
        {/* Messages Container - Always visible */}
        <div className="flex-1 bg-white rounded-xl shadow-sm p-3 md:p-4 overflow-y-auto space-y-3 md:space-y-4 min-h-0 flex-shrink-0">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-2 md:gap-3 ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Avatar */}
              <div className={`flex-shrink-0 w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center ${
                message.type === 'user' 
                  ? 'bg-gradient-to-br from-blue-500 to-blue-600' 
                  : message.type === 'error'
                  ? 'bg-gradient-to-br from-red-500 to-red-600'
                  : 'bg-gradient-to-br from-emerald-500 to-emerald-600'
              }`}>
                {message.type === 'user' ? (
                  <User className="w-4 h-4 md:w-5 md:h-5 text-white" />
                ) : message.type === 'error' ? (
                  <AlertCircle className="w-4 h-4 md:w-5 md:h-5 text-white" />
                ) : (
                  <Bot className="w-4 h-4 md:w-5 md:h-5 text-white" />
                )}
              </div>

              {/* Message Bubble */}
              <div className={`flex-1 min-w-0 ${message.type === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`rounded-xl md:rounded-2xl p-3 md:p-4 max-w-full ${
                  message.type === 'user'
                    ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white'
                    : message.type === 'error'
                    ? 'bg-gradient-to-br from-red-50 to-rose-100 text-red-800 border border-red-200'
                    : 'bg-gradient-to-br from-emerald-50 to-green-100 text-gray-800 border border-emerald-200'
                }`}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{message.content}</p>
                  {message.matchedRoute && (
                    <p className="text-xs mt-2 opacity-75 break-words">
                      📍 {message.matchedRoute}
                    </p>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1 px-1 md:px-2">{formatTime(message.timestamp)}</p>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-2 md:gap-3">
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                <Bot className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-xl md:rounded-2xl p-3 md:p-4 border border-emerald-200">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 text-emerald-600 animate-spin" />
                  <span className="text-sm text-gray-600">Analyzing your question...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions Sidebar - Responsive behavior */}
        {(showQuickActions && messages.length <= 2) && (
        <div className="bg-white rounded-xl shadow-sm p-3 md:p-4 overflow-y-auto w-full">
          <div className="space-y-3 md:space-y-4">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-600" />
              <p className="text-xs md:text-sm text-gray-600 font-medium">Quick Actions:</p>
            </div>
            <div className="space-y-3">
              {quickActions.map((category, i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-3">
                  <h4 className="text-sm font-semibold text-gray-800 mb-2 flex items-center gap-1">
                    <span>{category.icon}</span>
                    {category.category}
                  </h4>
                  <div className="space-y-1">
                    {category.questions.map((q, j) => (
                      <button
                        key={j}
                        onClick={() => handleSubmit(q)}
                        className="w-full text-left text-xs text-gray-700 hover:text-emerald-700 hover:bg-white px-2 py-1.5 rounded transition-colors break-words"
                      >
                        • {q}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        )}
      </div>

      {/* Recent History - Below messages on mobile */}
      {conversationHistory.length > 0 && messages.length > 2 && (
        <div className="mt-3 bg-white rounded-lg p-3 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <History className="w-4 h-4 text-gray-600" />
            <p className="text-xs text-gray-600 font-medium">Recent:</p>
          </div>
          <div className="flex flex-wrap gap-1 md:gap-2">
            {conversationHistory.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSubmit(q)}
                className="text-xs bg-gray-100 hover:bg-emerald-100 text-gray-700 hover:text-emerald-700 px-2 py-1 rounded-full transition-colors break-words max-w-full"
                style={{ wordBreak: 'break-word' }}
              >
                {q.length > 30 ? q.substring(0, 30) + '...' : q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="flex gap-2 mt-3 md:mt-4">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask about wars, alliances, or global trends..."
          disabled={loading}
          className="flex-1 px-3 md:px-4 py-2 md:py-3 rounded-lg md:rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none bg-white text-gray-800 placeholder-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed transition-colors duration-200 text-sm md:text-base"
        />
        <button
          onClick={() => handleSubmit()}
          disabled={loading || !input.trim()}
          className="bg-gradient-to-br from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white p-2 md:p-3 rounded-lg md:rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none flex-shrink-0"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin" />
          ) : (
            <Send className="w-4 h-4 md:w-5 md:h-5" />
          )}
        </button>
      </div>

      {/* Mobile Quick Actions Toggle Hint */}
      {!showQuickActions && messages.length <= 2 && (
        <div className="md:hidden mt-2 text-center">
          <button
            onClick={toggleQuickActions}
            className="text-xs text-emerald-600 hover:text-emerald-700 bg-white px-3 py-1 rounded-full border border-emerald-200 transition-colors"
          >
            Show Quick Actions
          </button>
        </div>
      )}
    </div>
  );
};

export default AIChatbot;
