# 📰 Basic News App

A simple and responsive React-based News App that fetches top headlines and search results from the [NewsAPI](https://newsapi.org/). Built for learning purposes, styled with Tailwind CSS, and deployed on GitHub Pages.

---

## 🚀 Features

- Top headlines by category (General, Sports, Technology, etc.)
- Real-time search with `everything` endpoint
- Responsive grid layout for news cards
- Fallback images for articles without thumbnails
- Smooth UX with loading states and error handling

---

## 🛠️ Tech Stack

- ⚛️ React + Vite
- 🎨 Tailwind CSS
- 📡 NewsAPI

---

## 📦 Installation

```bash
git clone https://github.com/your-username/news-app.git
cd news-app
npm install
```
---

## 🔐 Environment Variables

Create a `.env` file in the root of your project and add your NewsAPI key:

```.env
VITE_API_KEY=your_news_api_key
```
You can get a free API key from: https://newsapi.org

---

## 🧑‍💻 Running Locally
```bash
npm run dev
```
The app will be available at: http://localhost:5173

---

## 📂 Folder Structure
```pgsql
news-app/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── NewsBoard.jsx
│   │   └── NewsCard.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env
├── package.json
└── vite.config.js
```
---

## 🌐 API Endpoints Used

Top Headlines:
```
https://newsapi.org/v2/top-headlines?category={category}&apiKey=YOUR_API_KEY
```

Search Everything:
```
https://newsapi.org/v2/everything?q={query}&apiKey=YOUR_API_KEY
```

---

## 📜 License

This project is for **educational purposes only**. You are free to fork, modify, and use it for learning.
