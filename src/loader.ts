import { readFileSync, existsSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { MetricsFile, MetricsFileSchema, Metric } from './schema';

export class MetricsLoader {
  private dataPath: string;
  private metricsCache: MetricsFile | null = null;

  constructor(dataPath?: string) {
    this.dataPath = dataPath || join(process.cwd(), 'src', 'data', 'metrics.json');
  }

  /**
   * Load metrics from JSON file with validation
   */
  loadMetrics(): MetricsFile {
    if (this.metricsCache) {
      return this.metricsCache;
    }

    try {
      if (!existsSync(this.dataPath)) {
        throw new Error(`Metrics file not found at ${this.dataPath}`);
      }

      const rawData = readFileSync(this.dataPath, 'utf-8');
      const jsonData = JSON.parse(rawData);
      
      // Validate with Zod schema
      const validatedData = MetricsFileSchema.parse(jsonData);
      this.metricsCache = validatedData;
      
      // console.log(`Loaded ${validatedData.metrics.length} metrics from ${this.dataPath}`);
      return validatedData;
    } catch (error) {
      console.error('Failed to load metrics:', error);
      throw new Error(`Invalid metrics file: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Save metrics to JSON file
   */
  saveMetrics(metrics: MetricsFile): void {
    try {
      // Ensure directory exists
      const dir = dirname(this.dataPath);
      if (!existsSync(dir)) {
        require('fs').mkdirSync(dir, { recursive: true });
      }

      // Validate before saving
      const validatedData = MetricsFileSchema.parse(metrics);
      
      writeFileSync(this.dataPath, JSON.stringify(validatedData, null, 2));
      this.metricsCache = validatedData;
      
      // console.log(`Saved ${validatedData.metrics.length} metrics to ${this.dataPath}`);
    } catch (error) {
      console.error('Failed to save metrics:', error);
      throw new Error(`Failed to save metrics: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get a specific metric by name
   */
  getMetric(name: string): Metric | undefined {
    const metrics = this.loadMetrics();
    return metrics.metrics.find(metric => metric.name === name);
  }

  /**
   * Get all metrics
   */
  getAllMetrics(): Metric[] {
    const metrics = this.loadMetrics();
    return metrics.metrics;
  }

  /**
   * Get metrics by level
   */
  getMetricsByLevel(level: string): Metric[] {
    const metrics = this.loadMetrics();
    return metrics.metrics.filter(metric => metric.level === level);
  }

  /**
   * Get metrics by data type
   */
  getMetricsByDataType(dataType: string): Metric[] {
    const metrics = this.loadMetrics();
    return metrics.metrics.filter(metric => metric.dataType === dataType);
  }

  /**
   * Get deprecated metrics
   */
  getDeprecatedMetrics(): Metric[] {
    const metrics = this.loadMetrics();
    return metrics.metrics.filter(metric => metric.deprecated === true);
  }

  /**
   * Clear cache to force reload
   */
  clearCache(): void {
    this.metricsCache = null;
  }

  /**
   * Check if metrics file exists
   */
  hasMetricsFile(): boolean {
    return existsSync(this.dataPath);
  }

  /**
   * Get file path
   */
  getDataPath(): string {
    return this.dataPath;
  }
}


