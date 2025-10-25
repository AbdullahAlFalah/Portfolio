import { useState, useRef, useEffect } from 'react';
import { askAI } from '../../api/historical_analysis/aiApi';
import { Send, Bot, User, Loader2, AlertCircle, Sparkles, Zap, History } from 'lucide-react';

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
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
  };

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-2xl shadow-lg p-6 md:p-8 flex flex-col h-[700px] max-h-[80vh]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-3 rounded-xl shadow-lg">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">AI Analysis Assistant</h2>
            <p className="text-sm text-gray-600">Ask questions or use quick actions</p>
          </div>
        </div>
        <button
          onClick={clearChat}
          className="px-3 py-1.5 bg-white hover:bg-gray-100 text-gray-700 rounded-lg text-sm transition-colors"
        >
          Clear
        </button>
      </div>

      {/* Messages Container */}
      <div className="flex-1 bg-white rounded-xl shadow-sm p-4 mb-4 overflow-y-auto space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            {/* Avatar */}
            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
              message.type === 'user' 
                ? 'bg-gradient-to-br from-blue-500 to-blue-600' 
                : message.type === 'error'
                ? 'bg-gradient-to-br from-red-500 to-red-600'
                : 'bg-gradient-to-br from-emerald-500 to-emerald-600'
            }`}>
              {message.type === 'user' ? (
                <User className="w-5 h-5 text-white" />
              ) : message.type === 'error' ? (
                <AlertCircle className="w-5 h-5 text-white" />
              ) : (
                <Bot className="w-5 h-5 text-white" />
              )}
            </div>

            {/* Message Bubble */}
            <div className={`flex-1 max-w-[80%] ${message.type === 'user' ? 'items-end' : 'items-start'}`}>
              <div className={`rounded-2xl p-4 ${
                message.type === 'user'
                  ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white'
                  : message.type === 'error'
                  ? 'bg-gradient-to-br from-red-50 to-rose-100 text-red-800 border border-red-200'
                  : 'bg-gradient-to-br from-emerald-50 to-green-100 text-gray-800 border border-emerald-200'
              }`}>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                {message.matchedRoute && (
                  <p className="text-xs mt-2 opacity-75">
                    📍 {message.matchedRoute}
                  </p>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1 px-2">{formatTime(message.timestamp)}</p>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-2xl p-4 border border-emerald-200">
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 text-emerald-600 animate-spin" />
                <span className="text-sm text-gray-600">Analyzing your question...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      {messages.length <= 2 && (
        <div className="mb-4 space-y-3">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-emerald-600" />
            <p className="text-xs text-gray-600 font-medium">Quick Actions:</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {quickActions.map((category, i) => (
              <div key={i} className="bg-white rounded-lg p-3 shadow-sm">
                <h4 className="text-sm font-semibold text-gray-800 mb-2 flex items-center gap-1">
                  <span>{category.icon}</span>
                  {category.category}
                </h4>
                <div className="space-y-1">
                  {category.questions.map((q, j) => (
                    <button
                      key={j}
                      onClick={() => handleSubmit(q)}
                      className="w-full text-left text-xs text-gray-700 hover:text-emerald-700 hover:bg-emerald-50 px-2 py-1.5 rounded transition-colors"
                    >
                      • {q}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent History */}
      {conversationHistory.length > 0 && messages.length > 2 && (
        <div className="mb-4 bg-white rounded-lg p-3 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <History className="w-4 h-4 text-gray-600" />
            <p className="text-xs text-gray-600 font-medium">Recent:</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {conversationHistory.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSubmit(q)}
                className="text-xs bg-gray-100 hover:bg-emerald-100 text-gray-700 hover:text-emerald-700 px-3 py-1 rounded-full transition-colors"
              >
                {q.length > 40 ? q.substring(0, 40) + '...' : q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask about wars, alliances, or global trends..."
          disabled={loading}
          className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:outline-none bg-white text-gray-800 placeholder-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed transition-colors duration-200"
        />
        <button
          onClick={() => handleSubmit()}
          disabled={loading || !input.trim()}
          className="bg-gradient-to-br from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white p-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Send className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
};

export default AIChatbot;
