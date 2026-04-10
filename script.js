var allRates = {};
var lastResult = null;
var majorCurrencies = ["USD", "INR", "EUR", "GBP"];

var saved = localStorage.getItem("favorites");
var favorites = saved ? JSON.parse(saved) : [];

function debounce(fn, delay) {
  var timer;
  return function() {
    clearTimeout(timer);
    timer = setTimeout(fn, delay);
  };
}

fetch("https://api.exchangerate-api.com/v4/latest/USD")
  .then(function(res) { return res.json(); })
  .then(function(data) {
    allRates = data.rates;
    renderRates();
  });

document.getElementById("search").oninput = debounce(renderRates, 300);

function convert() {
  var amount = document.getElementById("amount").value;
  var from = document.getElementById("from").value;
  var to = document.getElementById("to").value;
  var loading = document.getElementById("loading");
  var result = document.getElementById("result");

  loading.innerHTML = "<span class='loader'>Converting<span>.</span><span>.</span><span>.</span></span>";
  result.innerText = "";
  document.getElementById("fav-btn").style.display = "none";

  fetch("https://api.exchangerate-api.com/v4/latest/" + from)
    .then(function(res) { return res.json(); })
    .then(function(data) {
      var rate = data.rates[to];
      var final = (amount * rate).toFixed(2);
      loading.innerHTML = "";
      result.innerText = final + " " + to;
      lastResult = { amount: amount, from: from, to: to, result: final, rate: rate.toFixed(4) };
      document.getElementById("fav-btn").style.display = "block";
    })
    .catch(function() {
      loading.innerHTML = "";
      result.innerText = "Error";
    });
}

function renderRates() {
  var search = document.getElementById("search").value.toLowerCase();
  var sort = document.getElementById("sort").value;
  var filter = document.getElementById("filter").value;

  var entries = Object.keys(allRates).map(function(code) {
    return { code: code, rate: allRates[code] };
  });

  var filtered = entries.filter(function(item) {
    var matchSearch = item.code.toLowerCase().includes(search);
    var matchFilter = filter === "all" || majorCurrencies.includes(item.code);
    return matchSearch && matchFilter;
  });

  var sorted = filtered.sort(function(a, b) {
    if (sort === "asc") return a.rate - b.rate;
    if (sort === "desc") return b.rate - a.rate;
    if (sort === "alpha") return a.code.localeCompare(b.code);
    return 0;
  });

  var html = sorted.map(function(item) {
    return "<div class='rate-item'><span>" + item.code + "</span><span>" + item.rate.toFixed(4) + " USD</span></div>";
  }).join("");

  document.getElementById("rates-list").innerHTML = html || "<p>No results found.</p>";
}

function saveFavorite() {
  if (!lastResult) return;

  var exists = favorites.find(function(f) {
    return f.from === lastResult.from && f.to === lastResult.to && f.amount === lastResult.amount;
  });

  if (exists) {
    alert("Already saved!");
    return;
  }

  favorites.push(lastResult);
  renderFavorites();
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

function renderFavorites() {
  var html = favorites.map(function(f, index) {
    return "<div class='fav-item'>"
      + "<span>" + f.amount + " " + f.from + " = " + f.result + " " + f.to + " (Rate: " + f.rate + ")</span>"
      + "<button onclick='removeFavorite(" + index + ")'>Remove</button>"
      + "</div>";
  }).join("");

  document.getElementById("favorites-list").innerHTML = html || "<p>No favorites saved.</p>";
}

function removeFavorite(index) {
  favorites = favorites.filter(function(_, i) { return i !== index; });
  renderFavorites();
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

function toggleTheme() {
  document.body.classList.toggle("dark");
  var btn = document.getElementById("theme-btn");
  var isDark = document.body.classList.contains("dark");
  btn.innerText = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
  localStorage.setItem("theme", isDark ? "dark" : "light");
}

var savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark");
  document.getElementById("theme-btn").innerText = "☀️ Light Mode";
}

renderFavorites();