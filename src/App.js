import React, { useState } from 'react';
import { Upload, TrendingUp, MessageSquare, BarChart3, LogOut, DollarSign } from 'lucide-react';

const API_BASE_URL = 'http://localhost:8000';

const Andre = () => {
  const [currentPage, setCurrentPage] = useState('upload');
  const [transactionData, setTransactionData] = useState(null);
  const [sentimentInput, setSentimentInput] = useState('');
  const [sentimentResponse, setSentimentResponse] = useState('');
  const [stockTickers, setStockTickers] = useState('');
  const [stockData, setStockData] = useState(null);
  const [newsData, setNewsData] = useState(null);
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${API_BASE_URL}/upload-transactions`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setTransactionData(data);
      setCurrentPage('dashboard');
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSentimentSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/get-sentiment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: 'user123',
          sentiment: sentimentInput,
        }),
      });
      const data = await response.json();
      setSentimentResponse(data.sentiment);
    } catch (error) {
      console.error('Sentiment submission failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStockData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/get-stock-data?tickers=${stockTickers}`);
      const data = await response.json();
      setStockData(data);
    } catch (error) {
      console.error('Stock data fetch failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/get-news?tickers=${stockTickers}`);
      const data = await response.json();
      setNewsData(data);
    } catch (error) {
      console.error('News fetch failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const analyzePortfolio = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: 'user123',
          sentiment: sentimentInput,
          transaction_history: transactionData?.preview || [],
          current_metrics: stockData?.data || [],
          news_summaries: newsData?.headlines || [],
        }),
      });
      const data = await response.json();
      setAnalysisData(data);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetApp = () => {
    setCurrentPage('upload');
    setTransactionData(null);
    setSentimentInput('');
    setSentimentResponse('');
    setStockTickers('');
    setStockData(null);
    setNewsData(null);
    setAnalysisData(null);
  };

  const renderHeader = () => (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 shadow-lg">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <DollarSign className="w-8 h-8" />
            Andre
          </h1>
          <p className="text-blue-100 mt-1">Your Best Smart Wall Street BFF</p>
        </div>
        {currentPage !== 'upload' && (
          <button
            onClick={resetApp}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        )}
      </div>
    </header>
  );

  const renderNavigation = () => {
    if (currentPage === 'upload') return null;
    
    const navItems = [
      { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
      { id: 'whatsup', label: "What's Up", icon: MessageSquare },
      { id: 'market', label: 'Get Market Data', icon: TrendingUp },
      { id: 'analysis', label: 'Analysis my Portfolio', icon: Upload },
    ];

    return (
      <nav className="bg-white shadow-md border-b">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex space-x-1">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setCurrentPage(id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                  currentPage === id
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </nav>
    );
  };

  const renderUploadPage = () => (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Link to Your Account</h2>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600 mb-4">Upload your transaction history CSV file</p>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg cursor-pointer transition-colors"
          >
            Choose CSV File
          </label>
        </div>
        {loading && (
          <div className="mt-4 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-2 text-gray-600">Processing...</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      {transactionData && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Transaction History Preview</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 px-4 py-2 text-left">Ticker</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Buy Date</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Quantity</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Price</th>
                </tr>
              </thead>
              <tbody>
                {transactionData.preview?.map((transaction, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">{transaction.ticker}</td>
                    <td className="border border-gray-300 px-4 py-2">{transaction.buy_date}</td>
                    <td className="border border-gray-300 px-4 py-2">{transaction.quantity}</td>
                    <td className="border border-gray-300 px-4 py-2">${transaction.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );

  const renderWhatsUp = () => (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">What's Up</h2>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Daily Sentiment Chat</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">How are you feeling about the market today?</label>
            <textarea
              value={sentimentInput}
              onChange={(e) => setSentimentInput(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="3"
              placeholder="Share your thoughts..."
            />
          </div>
          <button
            onClick={handleSentimentSubmit}
            disabled={loading || !sentimentInput.trim()}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg disabled:opacity-50 transition-colors"
          >
            {loading ? 'Processing...' : 'Submit'}
          </button>
          {sentimentResponse && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Response:</h4>
              <p className="text-blue-800">{sentimentResponse}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderMarketData = () => (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Get Market Data</h2>
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Stock Data</h3>
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              value={stockTickers}
              onChange={(e) => setStockTickers(e.target.value)}
              placeholder="Enter tickers (e.g., AAPL,GOOGL,MSFT)"
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={fetchStockData}
              disabled={loading || !stockTickers.trim()}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg disabled:opacity-50 transition-colors"
            >
              Get Stock Data
            </button>
            <button
              onClick={fetchNews}
              disabled={loading}
              className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg disabled:opacity-50 transition-colors"
            >
              Get News
            </button>
          </div>
          
          {stockData && (
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Stock Metrics</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {stockData.data?.map((stock, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <h5 className="font-bold text-lg">{stock.ticker}</h5>
                    <p className="text-sm text-gray-600">PE Ratio: {stock.pe_ratio}</p>
                    <p className="text-sm text-gray-600">EPS: {stock.eps}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {newsData && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Latest News</h3>
            <div className="space-y-3">
              {newsData.headlines?.map((news, index) => (
                <div key={index} className="p-3 border border-gray-200 rounded-lg">
                  <h4 className="font-medium">{news.title}</h4>
                  <p className="text-sm text-gray-600">Source: {news.source}</p>
                  {news.link && (
                    <a href={news.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-sm hover:underline">
                      Read more
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderAnalysis = () => (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Analysis my Portfolio</h2>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <button
          onClick={analyzePortfolio}
          disabled={loading}
          className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg disabled:opacity-50 transition-colors mb-6"
        >
          {loading ? 'Analyzing...' : 'Analyze Portfolio'}
        </button>
        
        {analysisData && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Recommendations</h3>
            <div className="space-y-4">
              {analysisData.recommendations?.map((rec, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-lg">{rec.ticker}</h4>
                    <span className={`px-2 py-1 rounded text-sm ${
                      rec.recommendation === 'BUY' ? 'bg-green-100 text-green-800' :
                      rec.recommendation === 'SELL' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {rec.recommendation}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Confidence: {rec.confidence}</p>
                  <p className="text-sm">{rec.reasoning}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'upload':
        return renderUploadPage();
      case 'dashboard':
        return renderDashboard();
      case 'whatsup':
        return renderWhatsUp();
      case 'market':
        return renderMarketData();
      case 'analysis':
        return renderAnalysis();
      default:
        return renderUploadPage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {renderHeader()}
      {renderNavigation()}
      <main className="py-8">
        {renderCurrentPage()}
      </main>
    </div>
  );
};

export default Andre;
