/**
 * Parse competition code to remove year prefix
 * @param code - Full competition code (e.g., "2020casj")
 * @returns Competition code without year (e.g., "CASJ")
 */
export function parseCompetitionCode(code: string | null): string {
  if (!code) return 'N/A';
  
  const match = code.match(/^\d{4}(.+)$/);
  if (match && match[1]) {
    return match[1].toUpperCase();
  }
  return code.toUpperCase();
}

/**
 * Extract year from competition code
 * @param code - Full competition code (e.g., "2020casj")
 * @returns Year string or null (e.g., "2020")
 */
export function extractYear(code: string): string | null {
  const match = code.match(/^(\d{4})/);
  return match ? match[1] : null;
}
