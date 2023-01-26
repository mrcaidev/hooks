type Device = {
  isDark?: boolean;
};

export function matchMedia(query: string, device: Device = {}) {
  const { isDark = true } = device;

  const defaultMediaQueryList = getDefaultMediaQueryList();

  const widthQueryResult = getWidthQueryResult(query);
  if (widthQueryResult !== undefined) {
    return {
      ...defaultMediaQueryList,
      matches: widthQueryResult,
    };
  }

  const themeQueryResult = getThemeQueryResult(query, isDark);
  if (themeQueryResult !== undefined) {
    return {
      ...defaultMediaQueryList,
      matches: themeQueryResult,
    };
  }

  return defaultMediaQueryList;
}

function getDefaultMediaQueryList() {
  return {
    matches: false,
    addEventListener: () => 0,
    removeEventListener: () => 0,
  } as unknown as MediaQueryList;
}

function getWidthQueryResult(query: string) {
  const regex = /(max|min)-width:\s*(\d+?)px/;
  const regexResult = query.match(regex);
  if (!regexResult) {
    return undefined;
  }

  const condition = regexResult[1];
  const width = Number(regexResult[2]);
  if (!condition || !width) {
    return undefined;
  }

  return condition === "max"
    ? window.innerWidth <= width
    : window.innerWidth >= width;
}

function getThemeQueryResult(query: string, isDarkDevice: boolean) {
  const regex = /prefers-color-scheme:\s*(light|dark)/;
  const regexResult = query.match(regex);
  if (!regexResult) {
    return undefined;
  }

  const theme = regexResult[1];
  if (!theme) {
    return undefined;
  }

  const deviceTheme = isDarkDevice ? "dark" : "light";
  return theme === deviceTheme;
}
