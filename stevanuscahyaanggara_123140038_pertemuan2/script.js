// ============== Utilities (ES6) ==============
const $ = (sel) => document.querySelector(sel);                         // Arrow fn
const $$ = (sel) => Array.from(document.querySelectorAll(sel));         // Arrow fn
const sleep = (ms) => new Promise((res) => setTimeout(res, ms));        // Arrow fn
const PRIORITY_ORDER = { "Tinggi": 3, "Sedang": 2, "Rendah": 1 };

// Format tanggal ringkas
const fmtDate = (ts) =>
  new Date(ts).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" });

// ============== Data Model (Classes) ==============
class WatchItem {
  constructor({ id, title, category, priority, status = "Belum", createdAt = Date.now() }) {
    this.id = id ?? crypto.randomUUID();
    this.title = title.trim();
    this.category = category;
    this.priority = priority;
    this.status = status;       // "Belum" | "Selesai"
    this.createdAt = createdAt;
  }
}

class WatchlistStore {
  #key = "watchlist:data@v1";

  async load() {
    // Simulasi I/O kecil (memenuhi async/await)
    await sleep(120);
    const raw = localStorage.getItem(this.#key);
    const arr = raw ? JSON.parse(raw) : [];
    return arr.map((x) => new WatchItem(x));
  }

  async save(items) {
    await sleep(80);
    localStorage.setItem(this.#key, JSON.stringify(items));
  }

  async add(items, payload) {
    const item = new WatchItem(payload);
    const next = [item, ...items];
    await this.save(next);
    return next;
  }

  async remove(items, id) {
    const next = items.filter((x) => x.id !== id);
    await this.save(next);
    return next;
  }

  async toggle(items, id) {
    const next = items.map((x) =>
      x.id === id ? { ...x, status: x.status === "Belum" ? "Selesai" : "Belum" } : x
    );
    await this.save(next);
    return next;
  }

  async clearFinished(items) {
    const next = items.filter((x) => x.status !== "Selesai");
    await this.save(next);
    return next;
  }
}

// ============== State & DOM Refs ==============
const store = new WatchlistStore();
let state = {
  items: [],
  search: ""
};

// refs
const form = $("#watch-form");
const titleEl = $("#title");
const categoryEl = $("#category");
const priorityEl = $("#priority");
const searchEl = $("#search");
const listEl = $("#watch-list");
const emptyEl = $("#empty");
const statsEl = $("#stats");
const clearFinishedBtn = $("#clear-finished");

// ============== Rendering ==============
const renderStats = () => {
  const total = state.items.length;
  const done = state.items.filter((x) => x.status === "Selesai").length;
  statsEl.textContent = `${total} item • ${done} selesai`;
};

const sortRows = (rows) => {
  // 1) Belum dulu, Selesai ke bawah
  // 2) Prioritas Tinggi > Sedang > Rendah
  // 3) Terbaru di atas dalam prioritas yang sama
  return rows.sort((a, b) => {
    if (a.status !== b.status) return a.status === "Belum" ? -1 : 1;
    const pa = PRIORITY_ORDER[a.priority], pb = PRIORITY_ORDER[b.priority];
    if (pa !== pb) return pb - pa;
    return b.createdAt - a.createdAt;
  });
};

const applyView = () => {
  let rows = [...state.items];

  // filter teks
  if (state.search) {
    const q = state.search.toLowerCase();
    rows = rows.filter((x) => x.title.toLowerCase().includes(q));
  }

  // sort otomatis sesuai ketentuan
  rows = sortRows(rows);

  // render
  listEl.innerHTML = "";
  if (rows.length === 0) {
    emptyEl.classList.remove("hidden");
  } else {
    emptyEl.classList.add("hidden");
    const tpl = $("#item-template");
    rows.forEach((x) => {
      const li = tpl.content.firstElementChild.cloneNode(true);
      li.dataset.id = x.id;
      if (x.status === "Selesai") li.classList.add("done");

      li.querySelector(".badge.category").textContent = x.category;
      li.querySelector(".title").textContent = x.title;
      li.querySelector(".badge.priority").textContent = `Prioritas: ${x.priority}`;
      li.querySelector(".status").innerHTML =
        x.status === "Selesai"
          ? `<span class="status ok">Selesai</span>`
          : `<span class="status">Belum</span>`;
      li.querySelector(".meta").textContent = `Ditambahkan: ${fmtDate(x.createdAt)}`;

      li.querySelector(".toggle").textContent =
        x.status === "Belum" ? "Tandai Selesai" : "Batalkan Selesai";

      listEl.appendChild(li);
    });
  }
  renderStats();
};

// ============== Event Handlers ==============
const onSubmit = async (e) => {
  e.preventDefault();
  const title = titleEl.value.trim();
  const category = categoryEl.value;
  const priority = priorityEl.value;

  if (!title || !category || !priority) return;

  state.items = await store.add(state.items, { title, category, priority });
  form.reset();
  $("#btn-reset")?.focus();
  applyView();
};

const onListClick = async (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  const li = e.target.closest("li.watch-item");
  if (!li) return;
  const id = li.dataset.id;

  if (btn.classList.contains("toggle")) {
    state.items = await store.toggle(state.items, id);
    applyView();
  }
  if (btn.classList.contains("remove")) {
    state.items = await store.remove(state.items, id);
    applyView();
  }
};

// ============== Init ==============
async function init() {
  state.items = await store.load();
  applyView();

  // listeners
  form.addEventListener("submit", onSubmit);
  listEl.addEventListener("click", onListClick);

  searchEl.addEventListener("input", (e) => {
    state.search = e.target.value;
    applyView();
  });

  clearFinishedBtn.addEventListener("click", async () => {
    state.items = await store.clearFinished(state.items);
    applyView();
  });
}

document.addEventListener("DOMContentLoaded", init);
