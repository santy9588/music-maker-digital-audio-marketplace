export function getUrlParameter(paramName: string): string | null {
  const urlParams = new URLSearchParams(window.location.search);
  const regularParam = urlParams.get(paramName);
  if (regularParam !== null) return regularParam;
  const hash = window.location.hash;
  const queryStartIndex = hash.indexOf("?");
  if (queryStartIndex !== -1) {
    const hashParams = new URLSearchParams(hash.substring(queryStartIndex + 1));
    return hashParams.get(paramName);
  }
  return null;
}

export function storeSessionParameter(key: string, value: string): void {
  try {
    sessionStorage.setItem(key, value);
  } catch {
    /* ignore */
  }
}

export function getSessionParameter(key: string): string | null {
  try {
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

export function getSecretFromHash(paramName: string): string | null {
  const existing = getSessionParameter(paramName);
  if (existing !== null) return existing;
  const hash = window.location.hash;
  if (!hash || hash.length <= 1) return null;
  const params = new URLSearchParams(hash.substring(1));
  const secret = params.get(paramName);
  if (secret) {
    storeSessionParameter(paramName, secret);
    return secret;
  }
  return null;
}

export function getSecretParameter(paramName: string): string | null {
  return getSecretFromHash(paramName);
}
