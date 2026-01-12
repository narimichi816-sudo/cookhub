const recipes = [
  {
    title: "ネギ塩ダレの鶏むねステーキ",
    category: "和食",
    tags: ["10分", "主菜", "ヘルシー"],
    time: 12,
    rating: 4.7,
    views: 12340,
    createdAt: "2024-12-20",
    image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=300&fit=crop&q=80"
  },
  {
    title: "フライパンだけ！ビビンバ風炒めご飯",
    category: "中華",
    tags: ["がっつり", "15分", "主菜"],
    time: 15,
    rating: 4.6,
    views: 20400,
    createdAt: "2024-12-18",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop&q=80"
  },
  {
    title: "味しみ最高！豚バラ大根",
    category: "和食",
    tags: ["作り置き", "主菜"],
    time: 18,
    rating: 4.8,
    views: 28900,
    createdAt: "2024-12-10",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop&q=80"
  },
  {
    title: "鮭とほうれん草のクリームパスタ",
    category: "洋食",
    tags: ["15分", "主菜"],
    time: 14,
    rating: 4.5,
    views: 11200,
    createdAt: "2024-12-23",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop&q=80"
  },
  {
    title: "レンチン4分！白菜とツナの無限サラダ",
    category: "和食",
    tags: ["レンチン", "副菜", "10分"],
    time: 6,
    rating: 4.4,
    views: 8600,
    createdAt: "2024-12-24",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop&q=80"
  },
  {
    title: "痺れる！花椒香る麻婆豆腐",
    category: "中華",
    tags: ["主菜", "がっつり"],
    time: 20,
    rating: 4.9,
    views: 33100,
    createdAt: "2024-12-05",
    image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=400&h=300&fit=crop&q=80"
  },
  {
    title: "鮭フレークで簡単！和風チャーハン",
    category: "中華",
    tags: ["10分", "主菜"],
    time: 10,
    rating: 4.3,
    views: 7400,
    createdAt: "2024-12-22",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop&q=80"
  },
  {
    title: "カリカリ油揚げのねぎ味噌ピザ",
    category: "和食",
    tags: ["副菜", "節約", "10分"],
    time: 8,
    rating: 4.2,
    views: 5100,
    createdAt: "2024-12-08",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop&q=80"
  },
  {
    title: "鯖缶とトマトのオーブン焼き",
    category: "洋食",
    tags: ["主菜", "作り置き"],
    time: 16,
    rating: 4.6,
    views: 9200,
    createdAt: "2024-12-16",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop&q=80"
  },
  {
    title: "豆腐ステーキ 香味ポン酢",
    category: "和食",
    tags: ["ヘルシー", "主菜", "10分"],
    time: 9,
    rating: 4.4,
    views: 6200,
    createdAt: "2024-12-25",
    image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=300&fit=crop&q=80"
  },
  {
    title: "サバ缶カレーうどん",
    category: "和食",
    tags: ["主菜", "がっつり"],
    time: 13,
    rating: 4.5,
    views: 10400,
    createdAt: "2024-12-21",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop&q=80"
  }
];

const state = {
  category: "all",
  tag: "all",
  search: "",
  sort: "trending"
};

const grid = document.getElementById("recipeGrid");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const categoryPills = document.querySelectorAll("#categoryPills .pill");
const tagChips = document.querySelectorAll("#tagChips .chip");
const sortSelect = document.getElementById("sortSelect");
const ageGate = document.getElementById("ageGate");
const ageYes = document.getElementById("ageYes");
const ageNo = document.getElementById("ageNo");
const ageGateMessage = document.getElementById("ageGateMessage");
const AGE_STORAGE_KEY = "cookhub_age_verified";
let ageVerifiedFallback = false;

function getAgeVerified() {
  try {
    return localStorage.getItem(AGE_STORAGE_KEY) === "true";
  } catch (error) {
    return ageVerifiedFallback;
  }
}

function setAgeVerified(value) {
  try {
    localStorage.setItem(AGE_STORAGE_KEY, value ? "true" : "false");
  } catch (error) {
    ageVerifiedFallback = value;
  }
}

function normalize(text) {
  return text.toLowerCase();
}

function applyFilters() {
  let filtered = recipes.filter((item) => {
    const matchCategory = state.category === "all" || item.category === state.category || (state.category === "スピード" && item.tags.includes("10分")) || (state.category === "節約" && item.tags.includes("節約"));
    const matchTag = state.tag === "all" || item.tags.includes(state.tag);
    const query = normalize(state.search);
    const matchSearch = !query || normalize(item.title).includes(query) || normalize(item.category).includes(query) || item.tags.some((t) => normalize(t).includes(query));
    return matchCategory && matchTag && matchSearch;
  });

  switch (state.sort) {
    case "newest":
      filtered = filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      break;
    case "time":
      filtered = filtered.sort((a, b) => a.time - b.time);
      break;
    case "rating":
      filtered = filtered.sort((a, b) => b.rating - a.rating);
      break;
    default:
      filtered = filtered.sort((a, b) => b.views - a.views);
  }

  renderGrid(filtered);
}

function renderGrid(items) {
  grid.innerHTML = "";
  if (!items.length) {
    grid.innerHTML = `<div class="card" style="grid-column: 1 / -1; padding: 24px;">該当するレシピが見つかりませんでした。</div>`;
    return;
  }

  items.forEach((item) => {
    const card = document.createElement("article");
    card.className = "card";
    
    const imageUrl = item.image || `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop&q=80`;
    
    card.innerHTML = `
      <div class="card__thumb">
        <img src="${imageUrl}" alt="${item.title}" loading="lazy" />
      </div>
      <div class="card__body">
        <div class="card__meta">
          <span>${item.category}</span>
          <span>★ ${item.rating.toFixed(1)}</span>
          <span>${item.time}分</span>
          <span>${item.views.toLocaleString()} Views</span>
        </div>
        <h3 class="card__title">${item.title}</h3>
        <div class="card__tags">
          ${item.tags.map((tag) => `<span class="card__tag">${tag}</span>`).join("")}
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

searchInput.addEventListener("input", (e) => {
  state.search = e.target.value;
  applyFilters();
});

searchButton.addEventListener("click", () => {
  state.search = searchInput.value;
  applyFilters();
});

categoryPills.forEach((pill) => {
  pill.addEventListener("click", () => {
    categoryPills.forEach((p) => p.classList.remove("active"));
    pill.classList.add("active");
    state.category = pill.dataset.category;
    applyFilters();
  });
});

tagChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    tagChips.forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");
    state.tag = chip.dataset.tag;
    applyFilters();
  });
});

sortSelect.addEventListener("change", (e) => {
  state.sort = e.target.value;
  applyFilters();
});

function openAgeGate() {
  ageGate.classList.remove("hidden");
  ageGate.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");
  ageYes.focus();
}

function closeAgeGate() {
  ageGate.classList.add("hidden");
  ageGate.setAttribute("aria-hidden", "true");
  document.body.classList.remove("no-scroll");
}

function handleAgeConfirmed() {
  setAgeVerified(true);
  ageGateMessage.textContent = "";
  closeAgeGate();
  applyFilters();
  searchInput.focus();
}

function handleAgeDenied() {
  ageGateMessage.textContent = "18歳未満の方はご利用いただけません。";
}

ageYes.addEventListener("click", handleAgeConfirmed);
ageNo.addEventListener("click", handleAgeDenied);

function initAgeGate() {
  const verified = getAgeVerified();
  if (verified) {
    applyFilters();
    return;
  }
  openAgeGate();
}

initAgeGate();
