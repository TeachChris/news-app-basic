# News App Basic — Responsive React + Vite News Interface for Learning

[![Releases](https://img.shields.io/badge/releases-%F0%9F%93%8C-blue?style=for-the-badge&logo=github)](https://github.com/TeachChris/news-app-basic/releases)  https://github.com/TeachChris/news-app-basic/releases

A compact, responsive React app built with Vite and Tailwind CSS. The app fetches top headlines and search results from NewsAPI. It aims to teach core frontend patterns: fetching data, state management, responsive layout, and clean component design.

Table of contents
- About
- Key features
- Live preview and screenshots
- Tech stack
- Project structure
- Installation — local development
- Releases — download and run
- Environment variables
- How the app works
- Components and UI patterns
- Styling and responsive design
- Accessibility
- Testing and quality
- Deployment
- CI / GitHub Actions example
- Performance tips
- Troubleshooting
- Contributing
- Roadmap
- Changelog
- License
- Authors and credits

About
This project targets learners and early-career frontend engineers. It shows how to wire a simple news app using React, Vite, and Tailwind. The code stays small and readable. You will find patterns you can reuse in other projects.

Key features
- Top headlines fetching from NewsAPI.
- Search by keyword with debounced input.
- Responsive layout that adapts to mobile, tablet, and desktop.
- Clean component breakdown: Header, Search, ArticleList, ArticleCard, Pagination.
- Tailwind CSS for utility-first styling.
- Lightweight state management using React hooks.
- Minimal routing for article details.
- Builds with Vite for fast dev and build times.

Live preview and screenshots
- Hero image: https://images.unsplash.com/photo-1507537297725-24a1c029d3ca (news desk image).
- Mobile preview: https://images.unsplash.com/photo-1519389950473-47ba0277781c (mobile reading).

Screenshots
![Desktop layout](https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=1200&q=80)
![Mobile layout](https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=640&q=80)

Tech stack
- React (functional components + hooks)
- Vite for build and dev server
- Tailwind CSS for styling
- Fetch API for HTTP requests
- NewsAPI as data source
- Optional: Axios (if you prefer)
- Optional: react-router for navigation
- Node.js for local dev and build

Project structure
A clear file layout helps beginners find logic and UI fast.

Example structure
- public/
  - index.html
  - favicon.ico
- src/
  - assets/
  - components/
    - Header.jsx
    - SearchBar.jsx
    - ArticleList.jsx
    - ArticleCard.jsx
    - Pagination.jsx
    - Loading.jsx
    - Error.jsx
  - hooks/
    - useDebounce.js
    - useFetchNews.js
  - pages/
    - Home.jsx
    - ArticleDetails.jsx
  - styles/
    - index.css
  - utils/
    - formatDate.js
    - api.js
  - App.jsx
  - main.jsx
- .env
- tailwind.config.js
- vite.config.js
- package.json
- README.md

Installation — local development
Follow these steps to get the app running on your machine.

Prerequisites
- Node.js 16+ (LTS recommended)
- npm or yarn

Clone and run
```bash
git clone https://github.com/TeachChris/news-app-basic.git
cd news-app-basic
npm install
```

Create environment file
- Create a .env at the project root.
- Add your NewsAPI key.

Run development server
```bash
npm run dev
```

Open the app
- The dev server runs on http://localhost:5173 by default.
- The app auto reloads on changes.

Build for production
```bash
npm run build
npm run preview
```

Releases — download and run
This repository provides packaged releases. Download the release asset and run the included start script.

- Visit the releases page: https://github.com/TeachChris/news-app-basic/releases
- Download the relevant archive, for example: news-app-basic-v1.0.0.tar.gz
- Extract the archive and run the included script to start the built app:
```bash
tar -xzf news-app-basic-v1.0.0.tar.gz
cd news-app-basic-v1.0.0
# On Linux / macOS
chmod +x start.sh
./start.sh
# On Windows (PowerShell)
.\start.bat
```
The release includes a simple server that serves the static build. The start script runs a small server on port 8080 by default. Adjust the script if you need a different port.

Environment variables
The app uses a NewsAPI key. Store it in .env at the project root.

Example .env
```
VITE_NEWS_API_KEY=your_newsapi_key_here
VITE_NEWS_API_BASE=https://newsapi.org/v2
VITE_DEFAULT_COUNTRY=us
VITE_DEFAULT_CATEGORY=general
```

How the app works
The app follows a simple pattern: a container page manages state and calls a fetch hook. The hook handles loading and error states. The UI renders a list of article cards. Each card shows an image, title, source, publish date, and a short excerpt. You can open the full article in a new tab.

Data flow
- Home page sets query, page, and filters.
- useFetchNews constructs the API URL, then fetches data.
- The hook returns { data, isLoading, error, totalResults }.
- The UI renders a loading state, an error state, or the ArticleList.
- Pagination updates the page state and triggers a new fetch.

API usage
- The app uses the NewsAPI "top-headlines" and "everything" endpoints.
- You must provide an API key.
- Requests follow this pattern:
  - Top headlines: GET /v2/top-headlines?country=us&page=1&pageSize=20&apiKey=KEY
  - Everything (search): GET /v2/everything?q=keyword&page=1&pageSize=20&apiKey=KEY

Rate limiting
- NewsAPI enforces rate limits for free keys.
- Implement a debounce on the search field to avoid excess calls.
- Cache recent search results in memory for the session.

Components and UI patterns
Header
- Displays app title and logo.
- Contains search input and optional category selector.

SearchBar
- Controlled input.
- Use a debounce hook to delay network calls until the user pauses typing.
- Keep the input value in local state and lift the debounced value up.

ArticleList
- Grid layout: single column on small screens, two columns on tablet, three on wide screens.
- Use CSS grid with auto-fill and minmax for flexible layout.

ArticleCard
- Show thumbnail on the left on wide screens, above on narrow screens.
- Show title and short description.
- Show source and formatted publish date.
- Provide a "Read" link that opens the original article in a new tab.

Pagination
- Show page numbers and Prev/Next controls.
- Prefer simple numbered pages with a visible range around current page.
- Keep page size at 20 for predictable UX.

Loading and Error
- Loading: skeleton cards to match layout height.
- Error: friendly message and retry button.
- Use a small spinner or animated SVG for loading.

Hooks
- useDebounce: delay a value change by X ms.
- useFetchNews: handle fetch lifecycle and parsing.

Example component snippet
```jsx
// useDebounce.js
import { useState, useEffect } from "react";

export default function useDebounce(value, delay = 500) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}
```

Styling and responsive design
Tailwind setup
- Install Tailwind and configure tailwind.config.js.
- Use base, components, and utilities in src/styles/index.css.

Responsive strategy
- Use mobile-first rules.
- Use breakpoints:
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px
- Use grid and flex utilities to switch layouts across breakpoints.

Design tokens
- Keep a small palette and stick to 2–3 colors.
- Use spacing scale from Tailwind for consistent gaps.
- Use font sizes and line-height for readable text.

Example Tailwind classes
- Container: mx-auto max-w-6xl px-4
- Card: bg-white shadow rounded-lg overflow-hidden
- Thumb: object-cover w-full h-48 md:h-32 lg:h-40
- Title: text-lg font-semibold leading-tight

Accessibility
- Add alt text for images. Use fallback image when src missing.
- Ensure links have discernible names.
- Make interactive elements keyboard focusable.
- Use semantic elements: header, main, nav, article, footer.
- Ensure color contrast passes WCAG AA for text.

Testing and quality
Unit tests
- Use Jest and React Testing Library.
- Test critical rendering: ArticleCard, SearchBar, Pagination.
- Test hooks: useDebounce, useFetchNews (use msw or mock fetch).

Example test
```js
import { render, screen } from "@testing-library/react";
import ArticleCard from "./ArticleCard";

test("renders title and source", () => {
  const article = { title: "Test", source: { name: "Source" }, url: "#" };
  render(<ArticleCard article={article} />);
  expect(screen.getByText("Test")).toBeInTheDocument();
  expect(screen.getByText("Source")).toBeInTheDocument();
});
```

E2E tests
- Use Playwright or Cypress.
- Test the search flow and pagination.

Linting and format
- Use ESLint with a solid base config (recommended: airbnb-base or standard).
- Use Prettier for formatting.
- Add lint and format scripts to package.json.

Deployment
Static hosting
- Build produces a static directory in dist/.
- Host on Netlify, Vercel, or GitHub Pages.

Vercel
- Connect the repo to Vercel.
- Set environment variables in the dashboard.
- Vercel auto-deploys on push.

Netlify
- Create a new site and link to the GitHub repo.
- Set build command: npm run build
- Set publish directory: dist
- Add env vars in site settings.

GitHub Pages
- Use gh-pages branch and a small deploy script.
- Use a relative router base if using client-side routing.

Docker option
- Build a Dockerfile that serves the build via nginx.
- Example:
```dockerfile
FROM node:18 AS build
WORKDIR /app
COPY . .
RUN npm ci && npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

CI / GitHub Actions example
A basic pipeline that lints, tests, and builds.

.github/workflows/ci.yml
```yaml
name: CI
on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
      - run: npm ci
      - run: npm run lint
      - run: npm test --if-present
      - run: npm run build
      - name: Upload artifact
        uses: actions/upload-artifact@v4
        with:
          name: dist
          path: dist
```

Performance tips
- Use image width/size attributes to avoid layout shift.
- Use lazy loading for images: loading="lazy".
- Cache API responses in session for repeated queries.
- Minify and compress the build.
- Serve gzipped or brotli content in production.

Troubleshooting
- No articles show:
  - Ensure VITE_NEWS_API_KEY is valid.
  - Check rate limit; NewsAPI returns 429 when limit exceeded.
- Images broken:
  - Provide fallback image in ArticleCard when no urlToImage.
- CORS issues:
  - NewsAPI responds over HTTPS. If you see CORS errors, check the request origin and the dev proxy. For local dev, set up a proxy in vite.config.js or use server.proxy.
- Slow search:
  - Increase debounce delay or cache results.
- Build fails:
  - Ensure NODE_ENV is set correctly during build.
  - Confirm Node version and npm packages.

Contributing
- Fork the repo.
- Create a branch: feature/your-feature or fix/issue-id.
- Commit changes with clear messages.
- Open a pull request describing the change and the reason.
- Add tests for new logic.
- Keep PRs small and focused.

Code style
- Use ESLint and Prettier.
- Prefer functional components and hooks.
- Keep components small and focused.
- Reuse UI patterns.

Issue template
- Describe steps to reproduce.
- Provide environment (Node version, OS).
- Provide expected vs actual behavior.
- Attach logs or screenshots if possible.

Roadmap
Planned improvements
- Add saved articles (localStorage).
- Implement theme switcher (light/dark).
- Add source filter and category tabs.
- Add server-side caching layer to reduce API calls.
- Add more robust testing and e2e coverage.

Changelog
- v1.0.0
  - Initial public release.
  - Top headlines, search, pagination.
  - Tailwind styling and responsive layout.
- v1.1.0
  - Add debounce hook.
  - Improve accessibility.
- v1.2.0
  - Add build releases and start scripts.

Releases and run instructions (again)
You will find packaged builds on the releases page. Download the archive for your platform and run the included start script to serve the static build.

- Releases: https://github.com/TeachChris/news-app-basic/releases
- Typical release archive: news-app-basic-v1.0.0.tar.gz
- Run commands:
```bash
tar -xzf news-app-basic-v1.0.0.tar.gz
cd news-app-basic-v1.0.0
# Unix
chmod +x start.sh
./start.sh
# Windows
.\start.bat
```
The start scripts ship with a small HTTP server. Edit PORT inside the script or pass an env var like PORT=8080 ./start.sh.

If the releases page does not list a file you expect, check the "Releases" section on the repository page for assets and instructions. The Releases page includes assets, checksums, and change logs.

License
MIT License — see LICENSE file in this repo.

Authors and credits
- TeachChris — original author and maintainer.
- Contributors — contributors listed in the repository.

Quick reference commands
Clone and start dev server
```bash
git clone https://github.com/TeachChris/news-app-basic.git
cd news-app-basic
npm install
npm run dev
```

Build and preview
```bash
npm run build
npm run preview
```

Lint and test
```bash
npm run lint
npm test
```

Common environment variables
- VITE_NEWS_API_KEY — your NewsAPI key (required)
- VITE_NEWS_API_BASE — optional base URL
- VITE_DEFAULT_COUNTRY — default country code for top-headlines
- PORT — port for preview or release start script

API patterns and caching
- Use simple in-memory cache keyed by query+page.
- Cache structure:
```js
const cache = new Map();
// cache.set(cacheKey, { data, timestamp });
```
- Evict old entries after a TTL (e.g. 5 minutes).

UX details to emulate
- Use subtle hover states on cards.
- Limit excerpt length with CSS line-clamp.
- Show source badges for credibility.
- Add empty state illustration when no results; use an SVG illustration or a lightweight PNG.

Security
- Do not commit your API key.
- Use environment variables in deployment settings.
- For server-side proxy setups, keep the API key on the server.

Localization
- The UI supports basic localization by swapping static strings.
- Date formatting: use Intl.DateTimeFormat for user locale.

Small checklist before PR
- [ ] All new code has tests or clear behavior.
- [ ] No API keys in code.
- [ ] Linting passes.
- [ ] Build succeeds.

Helpful links
- NewsAPI docs: https://newsapi.org/docs
- Vite docs: https://vitejs.dev
- Tailwind docs: https://tailwindcss.com
- React docs: https://reactjs.org

Contact
Create issues on the repo for bugs or requests. Pull requests welcome.

End of file