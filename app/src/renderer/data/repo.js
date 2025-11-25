const DATA_KEY = "higgs:data";
const META_KEY = "higgs:meta";

export const getMeta = () => {
  const raw = localStorage.getItem(META_KEY);
  return raw ? JSON.parse(raw) : { onboarded: false };
};
export const setMeta = (m) => localStorage.setItem(META_KEY, JSON.stringify(m));

export const load = () => {
  const raw = localStorage.getItem(DATA_KEY);
  return raw ? JSON.parse(raw) : null;
};
export const save = (data) => localStorage.setItem(DATA_KEY, JSON.stringify(data));

export const resetAll = () => {
  localStorage.removeItem(DATA_KEY);
  localStorage.removeItem(META_KEY);
};