const KEY = "authState";

export const saveAuth = (state: boolean) => {
  localStorage.setItem(KEY, JSON.stringify(state));
};

export const loadAuth = (): boolean => {
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : false;
};
