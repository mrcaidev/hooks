export function matchMedia(query: string) {
  const defaultMediaQueryList = getDefaultMediaQueryList();

  const widthQueryResult = getWidthQueryResult(query);
  if (widthQueryResult !== undefined) {
    return {
      ...defaultMediaQueryList,
      matches: widthQueryResult,
    };
  }

  const themeQueryResult = getThemeQueryResult(query);
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

function getThemeQueryResult(query: string) {
  const regex = /prefers-color-scheme:\s*(light|dark)/;
  const regexResult = query.match(regex);
  if (!regexResult) {
    return undefined;
  }

  const theme = regexResult[1];
  if (!theme) {
    return undefined;
  }

  return theme === "dark";
}
