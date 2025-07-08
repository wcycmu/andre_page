# Andre - Your Best Smart Wall Street BFF

A modern React frontend for the Andre MVP API that provides stock analysis, sentiment tracking, and portfolio management capabilities.

## Features

- **Transaction Upload**: Upload CSV files with transaction history
- **Dashboard**: View transaction history and portfolio overview
- **Sentiment Chat**: Daily sentiment tracking with chatbot interface
- **Market Data**: Real-time stock data and news headlines
- **Portfolio Analysis**: AI-powered portfolio recommendations

## Tech Stack

- **Frontend**: React 18, Tailwind CSS, Lucide React Icons
- **Backend**: FastAPI (localhost:8000)
- **Deployment**: GitHub Pages
- **Build Tool**: Create React App

## Local Development

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Running Andre API backend on localhost:8000

### Setup

1. Clone the repository:
```bash
git clone git@github.com:wcycmu/andre_page.git
cd andre_page
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## GitHub Pages Deployment

### Method 1: Automatic Deployment with GitHub Actions (Recommended)

1. **Push your code to GitHub**:
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Click on "Settings" tab
   - Scroll down to "Pages" section
   - Under "Source", select "GitHub Actions"

3. **The deployment will trigger automatically** when you push to the main branch

### Method 2: Manual Deployment

1. **Install gh-pages** (if not already installed):
```bash
npm install --save-dev gh-pages
```

2. **Deploy manually**:
```bash
npm run deploy
```

3. **Enable GitHub Pages**:
   - Go to your repository settings
   - In the "Pages" section, select "gh-pages" branch as the source

## Project Structure

```
andre_page/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── App.js          # Main React component
│   ├── index.js        # React entry point
│   └── index.css       # Global styles
├── .github/
│   └── workflows/
│       └── deploy.yml  # GitHub Actions workflow
├── package.json
└── README.md
```

## API Endpoints

The frontend connects to the following FastAPI endpoints:

- `POST /upload-transactions` - Upload CSV transaction history
- `POST /get-sentiment` - Submit daily sentiment
- `GET /get-stock-data` - Fetch stock financial data
- `GET /get-news` - Fetch news headlines
- `POST /analyze` - Get portfolio analysis and recommendations

## Configuration

### API Base URL

Update the `API_BASE_URL` in `src/App.js` if your backend is running on a different port:

```javascript
const API_BASE_URL = 'http://localhost:8000'; // Change this as needed
```

### GitHub Pages Configuration

The app is configured to deploy to: `https://wcycmu.github.io/andre_page`

If you fork this repository, update the `homepage` field in `package.json`:

```json
{
  "homepage": "https://yourusername.github.io/your-repo-name"
}
```

## Pages and Navigation

### 1. Upload Page
- **Route**: `/upload-transactions`
- **Function**: CSV file upload for transaction history
- **Redirects to**: Dashboard after successful upload

### 2. Dashboard
- **Function**: Display uploaded transaction data
- **Navigation**: Access to all other pages via top navigation

### 3. What's Up
- **Function**: Daily sentiment chat interface
- **API**: `/get-sentiment`

### 4. Get Market Data
- **Function**: Stock data and news retrieval
- **APIs**: `/get-stock-data`, `/get-news`

### 5. Analysis my Portfolio
- **Function**: Portfolio analysis and recommendations
- **API**: `/analyze`

## Styling

The application uses Tailwind CSS for styling with:
- Responsive design for mobile and desktop
- Modern gradient backgrounds
- Interactive hover effects
- Loading states and animations
- Consistent color scheme (blue/purple theme)

## Development Notes

### CORS Configuration

Make sure your FastAPI backend has CORS enabled for localhost:3000:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### File Upload Requirements

The CSV upload expects files with the following structure:
- ticker
- buy_date
- quantity
- price

## Troubleshooting

### Common Issues

1. **Build fails**: Check that all dependencies are installed with `npm install`
2. **API calls fail**: Ensure the backend is running on localhost:8000
3. **GitHub Pages not updating**: Check the Actions tab for deployment status
4. **CSS not loading**: Verify Tailwind CSS is properly configured

### Debug Steps

1. Check browser console for JavaScript errors
2. Verify API backend is running and accessible
3. Check GitHub Actions logs for deployment issues
4. Test locally with `npm start` before deploying

## License

MIT License - feel free to use this project for your own purposes.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

For issues or questions, please open an issue in the GitHub repository.
