/**
 * Performance Monitor Utility
 * Tracks and logs performance metrics for testing
 */

interface PerformanceMetric {
  timestamp: number;
  metric: string;
  value: number;
  unit: string;
  metadata?: Record<string, any>;
}

interface PerformanceSession {
  id: string;
  startTime: number;
  endTime?: number;
  metrics: PerformanceMetric[];
  summary?: PerformanceSummary;
}

interface PerformanceSummary {
  duration: number;
  memoryPeak: number;
  memoryAverage: number;
  activityCount: number;
  accuracyRate: number;
}

class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private sessions: Map<string, PerformanceSession> = new Map();
  private currentSessionId: string | null = null;
  private memorySnapshots: number[] = [];
  private performanceObserver: any = null;

  private constructor() {
    // Private constructor for singleton
  }

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  /**
   * Start a new performance monitoring session
   */
  startSession(sessionId: string = `session_${Date.now()}`): string {
    const session: PerformanceSession = {
      id: sessionId,
      startTime: Date.now(),
      metrics: [],
    };

    this.sessions.set(sessionId, session);
    this.currentSessionId = sessionId;
    this.memorySnapshots = [];

    // Start memory monitoring
    this.startMemoryMonitoring();

    console.log('[PerformanceMonitor] Session started:', sessionId);
    return sessionId;
  }

  /**
   * Stop the current performance monitoring session
   */
  stopSession(sessionId?: string): PerformanceSession | null {
    const sid = sessionId || this.currentSessionId;
    if (!sid) {
      console.warn('[PerformanceMonitor] No active session to stop');
      return null;
    }

    const session = this.sessions.get(sid);
    if (!session) {
      console.warn('[PerformanceMonitor] Session not found:', sid);
      return null;
    }

    session.endTime = Date.now();
    session.summary = this.generateSummary(session);

    // Stop memory monitoring
    this.stopMemoryMonitoring();

    console.log('[PerformanceMonitor] Session stopped:', sid);
    console.log('[PerformanceMonitor] Summary:', session.summary);

    if (this.currentSessionId === sid) {
      this.currentSessionId = null;
    }

    return session;
  }

  /**
   * Log a performance metric
   */
  logMetric(
    metric: string,
    value: number,
    unit: string,
    metadata?: Record<string, any>,
  ): void {
    if (!this.currentSessionId) {
      console.warn('[PerformanceMonitor] No active session for metric:', metric);
      return;
    }

    const session = this.sessions.get(this.currentSessionId);
    if (!session) {
      return;
    }

    const performanceMetric: PerformanceMetric = {
      timestamp: Date.now(),
      metric,
      value,
      unit,
      metadata,
    };

    session.metrics.push(performanceMetric);

    console.log(
      `[PerformanceMonitor] Metric: ${metric} = ${value} ${unit}`,
      metadata || '',
    );
  }

  /**
   * Log activity detection event
   */
  logActivity(
    activity: string,
    duration: number,
    accuracy: number,
  ): void {
    this.logMetric('activity_detection', duration, 'seconds', {
      activity,
      accuracy,
    });
  }

  /**
   * Log memory usage
   */
  logMemory(memoryMB: number): void {
    this.memorySnapshots.push(memoryMB);
    this.logMetric('memory_usage', memoryMB, 'MB');
  }

  /**
   * Log response time
   */
  logResponseTime(operation: string, timeMs: number): void {
    this.logMetric('response_time', timeMs, 'ms', {operation});
  }

  /**
   * Get current session
   */
  getCurrentSession(): PerformanceSession | null {
    if (!this.currentSessionId) {
      return null;
    }
    return this.sessions.get(this.currentSessionId) || null;
  }

  /**
   * Get all sessions
   */
  getAllSessions(): PerformanceSession[] {
    return Array.from(this.sessions.values());
  }

  /**
   * Export session data as JSON
   */
  exportSession(sessionId: string): string | null {
    const session = this.sessions.get(sessionId);
    if (!session) {
      return null;
    }
    return JSON.stringify(session, null, 2);
  }

  /**
   * Export all sessions as JSON
   */
  exportAllSessions(): string {
    const sessions = this.getAllSessions();
    return JSON.stringify(sessions, null, 2);
  }

  /**
   * Clear all sessions
   */
  clearAllSessions(): void {
    this.sessions.clear();
    this.currentSessionId = null;
    this.memorySnapshots = [];
    console.log('[PerformanceMonitor] All sessions cleared');
  }

  /**
   * Start memory monitoring (simulated)
   */
  private startMemoryMonitoring(): void {
    // In real implementation, this would use React Native's performance APIs
    // or native modules to get actual memory usage
    // For now, this is a placeholder for testing

    // Example: Use setInterval to periodically check memory (if available)
    if (typeof global.performance !== 'undefined') {
      // Performance API available
      this.performanceObserver = setInterval(() => {
        // Simulated memory reading
        // In production, use actual memory APIs
        const simulatedMemory = Math.random() * 50 + 50; // 50-100 MB
        this.logMemory(simulatedMemory);
      }, 10000); // Every 10 seconds
    }
  }

  /**
   * Stop memory monitoring
   */
  private stopMemoryMonitoring(): void {
    if (this.performanceObserver) {
      clearInterval(this.performanceObserver);
      this.performanceObserver = null;
    }
  }

  /**
   * Generate performance summary
   */
  private generateSummary(session: PerformanceSession): PerformanceSummary {
    const duration = session.endTime
      ? session.endTime - session.startTime
      : 0;

    const memoryMetrics = session.metrics.filter(
      m => m.metric === 'memory_usage',
    );
    const memoryPeak =
      memoryMetrics.length > 0
        ? Math.max(...memoryMetrics.map(m => m.value))
        : 0;
    const memoryAverage =
      memoryMetrics.length > 0
        ? memoryMetrics.reduce((sum, m) => sum + m.value, 0) /
          memoryMetrics.length
        : 0;

    const activityMetrics = session.metrics.filter(
      m => m.metric === 'activity_detection',
    );
    const activityCount = activityMetrics.length;

    const accuracyMetrics = activityMetrics
      .filter(m => m.metadata?.accuracy !== undefined)
      .map(m => m.metadata!.accuracy);
    const accuracyRate =
      accuracyMetrics.length > 0
        ? accuracyMetrics.reduce((sum, acc) => sum + acc, 0) /
          accuracyMetrics.length
        : 0;

    return {
      duration,
      memoryPeak,
      memoryAverage,
      activityCount,
      accuracyRate,
    };
  }

  /**
   * Format summary as readable string
   */
  formatSummary(summary: PerformanceSummary): string {
    const durationMin = Math.floor(summary.duration / 60000);
    const durationSec = Math.floor((summary.duration % 60000) / 1000);

    return `
Performance Summary
===================
Duration: ${durationMin}m ${durationSec}s
Memory Peak: ${summary.memoryPeak.toFixed(2)} MB
Memory Average: ${summary.memoryAverage.toFixed(2)} MB
Activity Count: ${summary.activityCount}
Accuracy Rate: ${(summary.accuracyRate * 100).toFixed(2)}%
    `.trim();
  }
}

export default PerformanceMonitor;
export type {PerformanceMetric, PerformanceSession, PerformanceSummary};
