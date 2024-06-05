// Set data to session storage
export const setSessionData = (key, value) => {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting data to sessionStorage: ${error}`);
  }
};

// Get data from session storage
export const getSessionData = (key) => {
  try {
    const data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error(`Error getting data from sessionStorage: ${error}`);
    return null;
  }
};

// Remove data from session storage
export const removeSessionData = (key) => {
  try {
    sessionStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing data from sessionStorage: ${error}`);
  }
};

// Clear all data from session storage
export const clearSessionData = () => {
  try {
    sessionStorage.clear();
  } catch (error) {
    console.error(`Error clearing sessionStorage: ${error}`);
  }
};
