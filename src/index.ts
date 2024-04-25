type Theme = 'light' | 'dark';

const storageKey = 'theme';
const localThemeEventName = 'themeSet';
const systemDarkModePreference = window.matchMedia(
  '(prefers-color-scheme: dark)',
);

export function setupTheme() {
  // Set initial theme, if local storage is unavailable set initial theme to light
  setThemeClass();

  // If local storage is unavailable don't continue
  if (isLocalStorageUnavailable()) return;

  // Listen for changes in local storage by different window
  // (such as directly changing theme value from devtools)
  window.addEventListener('storage', (storageEvent) => {
    if (storageEvent.key === storageKey) {
      setThemeClass();
    }
  });

  // Listen for changes in local storage by the same window
  document.addEventListener(localThemeEventName, setThemeClass);

  // Listen for changes in user theme preference
  systemDarkModePreference.addEventListener(
    'change',
    ({ matches: darkModePreference }) => {
      setTheme(darkModePreference ? 'dark' : 'light');
    },
  );
}

export function setTheme(theme: Theme) {
  if (isLocalStorageUnavailable()) return;

  localStorage.setItem(storageKey, theme);
  document.dispatchEvent(new Event(localThemeEventName));
}

function setThemeClass() {
  const darkThemePreference = getThemePreference();
  const documentClassList = document.documentElement.classList;

  documentClassList[darkThemePreference === 'dark' ? 'add' : 'remove']('dark');
}

function getThemePreference(): Theme {
  if (isLocalStorageUnavailable()) return 'light';

  const localPreference = localStorage.getItem(storageKey);

  // Check if there is a local preference and it is well formed
  if (
    localPreference &&
    (localPreference === 'light' || localPreference === 'dark')
  ) {
    return localPreference;
  }

  let theme: Theme = 'light';
  if (systemDarkModePreference.matches) {
    theme = 'dark';
  }

  setTheme(theme);

  return theme;
}

function isLocalStorageUnavailable() {
  return typeof localStorage === 'undefined';
}
