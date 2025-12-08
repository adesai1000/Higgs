const DATA_KEY = "higgs:data";
const META_KEY = "higgs:meta";

export function getMeta() {
  const raw = localStorage.getItem(META_KEY);
  return raw ? JSON.parse(raw) : { onboarded: false };
}

export function setMeta(meta) {
  localStorage.setItem(META_KEY, JSON.stringify(meta));
}

export function load() {
  const raw = localStorage.getItem(DATA_KEY);
  const parsed = raw ? JSON.parse(raw) : {};

  return {
    monthly: parsed.monthly || {},
    incomes: parsed.incomes || [],
    expenses: parsed.expenses || [],
    assets: parsed.assets || [],
    user: parsed.user || null,
    categories: parsed.categories || [],
    investments: parsed.investments || [],
    loans: parsed.loans || [],
    activity: parsed.activity || [],
    version: parsed.version || 1,
  };
}

export function save(data) {
  localStorage.setItem(DATA_KEY, JSON.stringify(data));
}

export function resetAll() {
  localStorage.removeItem(DATA_KEY);
  localStorage.removeItem(META_KEY);
}