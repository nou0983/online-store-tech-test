export const getDataFromLocalStorage = (key: string) => {
  const data = localStorage.getItem(key);

  if (!data) {
    return null;
  }
  return JSON.parse(data);
};

export const addDataToLocalStorage = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};
