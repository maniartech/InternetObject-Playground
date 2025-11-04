/**
 * Performance instrumentation utility for the IO Playground.
 * Logs metrics in development mode only to help track parse/render performance.
 */

const isDev = process.env.NODE_ENV === 'development';

export interface PerfMetrics {
  parseDuration?: number;
  markerUpdateDuration?: number;
  decorationBuildDuration?: number;
  markerCount?: number;
  decorationCount?: number;
}

/**
 * Mark the start of a performance measurement.
 */
export function perfStart(label: string): void {
  if (!isDev) return;
  performance.mark(`${label}-start`);
}

/**
 * Mark the end and measure duration since start.
 * Returns the duration in milliseconds.
 */
export function perfEnd(label: string): number | undefined {
  if (!isDev) return undefined;
  
  const startMark = `${label}-start`;
  const endMark = `${label}-end`;
  
  performance.mark(endMark);
  
  try {
    const measure = performance.measure(label, startMark, endMark);
    const duration = measure.duration;
    
    // Clean up marks
    performance.clearMarks(startMark);
    performance.clearMarks(endMark);
    performance.clearMeasures(label);
    
    return duration;
  } catch (e) {
    // Mark might not exist; return undefined
    return undefined;
  }
}

/**
 * Log performance metrics to console (dev only).
 */
export function logPerfMetrics(context: string, metrics: PerfMetrics): void {
  if (!isDev) return;
  
  const entries: string[] = [];
  
  if (metrics.parseDuration !== undefined) {
    entries.push(`parse: ${metrics.parseDuration.toFixed(2)}ms`);
  }
  if (metrics.markerUpdateDuration !== undefined) {
    entries.push(`markers: ${metrics.markerUpdateDuration.toFixed(2)}ms`);
  }
  if (metrics.decorationBuildDuration !== undefined) {
    entries.push(`decorations: ${metrics.decorationBuildDuration.toFixed(2)}ms`);
  }
  if (metrics.markerCount !== undefined) {
    entries.push(`${metrics.markerCount} markers`);
  }
  if (metrics.decorationCount !== undefined) {
    entries.push(`${metrics.decorationCount} decorations`);
  }
  
  if (entries.length > 0) {
    console.log(`[Perf] ${context}: ${entries.join(', ')}`);
  }
}

/**
 * Simple wrapper to measure a sync function.
 */
export function measureSync<T>(label: string, fn: () => T): T {
  perfStart(label);
  const result = fn();
  const duration = perfEnd(label);
  
  if (duration !== undefined && isDev) {
    console.log(`[Perf] ${label}: ${duration.toFixed(2)}ms`);
  }
  
  return result;
}

/**
 * Simple wrapper to measure an async function.
 */
export async function measureAsync<T>(label: string, fn: () => Promise<T>): Promise<T> {
  perfStart(label);
  const result = await fn();
  const duration = perfEnd(label);
  
  if (duration !== undefined && isDev) {
    console.log(`[Perf] ${label}: ${duration.toFixed(2)}ms`);
  }
  
  return result;
}
