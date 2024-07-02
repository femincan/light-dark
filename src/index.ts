export type Theme = 'light' | 'dark';

const storageKey = 'theme';
const customThemeEventName = 'themeSet';
const systemDarkModePreference = window.matchMedia(
  '(prefers-color-scheme: dark)',
);

export function setupTheme() {
  if (!isClient()) return;

  // Set initial theme
  setThemeClass();

  // Set theme change event listeners
  setThemeChangeListeners();
}

export function setTheme(theme: Theme) {
  if (!isClient()) return;

  setLocalTheme(theme);

  document.dispatchEvent(new CustomEvent(customThemeEventName));
}

export function getTheme() {
  if (!isClient()) return null;

  const theme = localStorage.getItem(storageKey);

  // Check if there is a theme property in local storage and it is well formed
  if (theme && (theme === 'light' || theme === 'dark')) {
    return theme;
  }

  return null;
}

export function toggleTheme() {
  if (!isClient()) return;

  const theme = getTheme();

  if (!theme) return;

  setTheme(theme === 'light' ? 'dark' : 'light');
}

function setLocalTheme(theme: Theme) {
  localStorage.setItem(storageKey, theme);
}

function setThemeClass() {
  let theme: Theme;

  const localTheme = getTheme();

  if (localTheme) {
    theme = localTheme;
  } else {
    const themePreference = getThemePreference();
    setLocalTheme(themePreference);
    theme = themePreference;
  }

  const documentClassList = document.documentElement.classList;
  documentClassList[theme === 'dark' ? 'add' : 'remove']('dark');
}

function getThemePreference(): Theme {
  let themePreference: Theme = 'light';
  if (systemDarkModePreference.matches) {
    themePreference = 'dark';
  }

  return themePreference;
}

function setThemeChangeListeners() {
  // Listen for changes in local storage by different window
  // (such as directly changing theme value from devtools)
  window.addEventListener('storage', (storageEvent) => {
    if (storageEvent.key === storageKey) {
      setThemeClass();
    }
  });

  // Listen for changes in local storage by the same window
  document.addEventListener(customThemeEventName, setThemeClass);

  // Listen for changes in user theme preference
  systemDarkModePreference.addEventListener('change', ({ matches }) => {
    setTheme(matches ? 'dark' : 'light');
  });
}

function isClient() {
  return (
    typeof localStorage !== 'undefined' &&
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}
