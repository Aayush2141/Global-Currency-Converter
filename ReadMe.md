# 💱 Global Currency Converter

A responsive currency converter web app built with vanilla HTML, CSS, and JavaScript. It fetches live exchange rates from a public API and lets users convert, search, filter, sort, and save favorite conversions — all with a clean fintech-style UI and dark mode support.

---

## 🎯 Purpose

This project was built to practice working with external APIs, asynchronous JavaScript (fetch + `.then()`), DOM manipulation, and JavaScript array Higher-Order Functions (`map`, `filter`, `sort`, `find`). Milestone 4 added localStorage persistence and UI polish.

---

## 🔌 API Used

**ExchangeRate API**  
`https://api.exchangerate-api.com/v4/latest/{BASE}`

- Returns live exchange rates in JSON
- No API key or authentication required
- Base currency changes dynamically based on user selection

---

## ✨ Features

- **Live currency conversion** — fetches real-time rates on every convert
- **All exchange rates list** — shows all available currencies with their USD rate
- **Search** — filter currencies by code with debounced input (300ms delay)
- **Sort** — sort by rate low to high, high to low, or alphabetically
- **Filter** — show all currencies or major ones only (USD, INR, EUR, GBP)
- **Favorites** — save conversions and remove them; persists across page refreshes
- **Dark mode** — toggle between light and dark; preference is saved in localStorage
- **Animated loading indicator** — shows animated dots while the API fetches data
- **Error handling** — shows an error message if the API call fails

---

## 🛠️ Technologies Used

- HTML5
- CSS3 (Flexbox, transitions, keyframe animations, Google Fonts)
- JavaScript (ES6 — fetch, HOFs, debounce, localStorage)
- ExchangeRate API (public, no auth)

---

## 🗂️ File Structure

```
global currency/
├── index.html     — app structure and markup
├── style.css      — all styling (light + dark mode)
├── script.js      — all logic (fetch, convert, render, localStorage)
└── ReadMe.md
```

## 📦 Milestones

| Milestone | What was built |
|---|---|
| M1 | Basic HTML structure, amount input, currency dropdowns, convert button |
| M2 | Fetch integration, live API conversion, loading + error states |
| M3 | Exchange rates list, search, sort, filter (HOFs), favorites, dark mode toggle |
| M4 | localStorage (favorites + theme), debounced search, animated loader, CSS polish |
