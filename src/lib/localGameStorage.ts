export function readGameState<T>(key: string, version: number): T | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const value = JSON.parse(raw) as { version?: number; data?: T };
    if (value.version !== version) return null;
    return value.data ?? null;
  } catch {
    return null;
  }
}

export function writeGameState<T>(key: string, version: number, data: T): void {
  localStorage.setItem(key, JSON.stringify({ version, data }));
}
