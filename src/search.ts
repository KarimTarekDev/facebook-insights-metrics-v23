import Fuse, { FuseResultMatch, IFuseOptions } from 'fuse.js';
import { Metric } from './schema';

export interface SearchResult {
  item: Metric;
  score?: number;
  matches?: FuseResultMatch[];
}

export class MetricsSearch {
  private fuse!: Fuse<Metric>;
  private metrics: Metric[] = [];

  constructor(metrics: Metric[]) {
    this.metrics = metrics;
    this.initializeFuse();
  }

  private initializeFuse(): void {
    const options: IFuseOptions<Metric> = {
      keys: [
        { name: 'name', weight: 0.4 },
        { name: 'description', weight: 0.3 },
        { name: 'tags', weight: 0.2 },
        { name: 'level', weight: 0.1 }
      ],
      threshold: 0.35, // Lower threshold = more strict matching
      includeScore: true,
      includeMatches: true,
      minMatchCharLength: 2,
      ignoreLocation: true,
      findAllMatches: true
    };

    this.fuse = new Fuse(this.metrics, options);
  }

  /**
   * Search for metrics with fuzzy matching
   */
  search(query: string, limit: number = 20): SearchResult[] {
    if (!query.trim()) {
      return this.metrics.slice(0, limit).map(metric => ({ item: metric }));
    }

    const results = this.fuse.search(query, { limit });
    return results.map(result => ({
      item: result.item,
      score: result.score,
      matches: result.matches ? [...result.matches] : undefined
    }));
  }

  /**
   * Search by exact name match
   */
  searchByName(name: string): Metric | undefined {
    return this.metrics.find(metric => metric.name === name);
  }

  /**
   * Search by level
   */
  searchByLevel(level: string): Metric[] {
    return this.metrics.filter(metric => metric.level === level);
  }

  /**
   * Search by data type
   */
  searchByDataType(dataType: string): Metric[] {
    return this.metrics.filter(metric => metric.dataType === dataType);
  }

  /**
   * Search by tags
   */
  searchByTags(tags: string[]): Metric[] {
    return this.metrics.filter(metric => 
      metric.tags && tags.some(tag => metric.tags!.includes(tag))
    );
  }

  /**
   * Search by periods
   */
  searchByPeriods(periods: string[]): Metric[] {
    return this.metrics.filter(metric => 
      periods.some(period => metric.periods.includes(period as any))
    );
  }

  /**
   * Get all unique tags
   */
  getAllTags(): string[] {
    const allTags = this.metrics
      .flatMap(metric => metric.tags || [])
      .filter((tag, index, array) => array.indexOf(tag) === index)
      .sort();
    
    return allTags;
  }

  /**
   * Get all unique levels
   */
  getAllLevels(): string[] {
    const levels = this.metrics
      .map(metric => metric.level)
      .filter((level, index, array) => array.indexOf(level) === index)
      .sort();
    
    return levels;
  }

  /**
   * Get all unique data types
   */
  getAllDataTypes(): string[] {
    const dataTypes = this.metrics
      .map(metric => metric.dataType)
      .filter((type, index, array) => array.indexOf(type) === index)
      .sort();
    
    return dataTypes;
  }

  /**
   * Get metrics count
   */
  getCount(): number {
    return this.metrics.length;
  }

  /**
   * Update metrics and rebuild search index
   */
  updateMetrics(metrics: Metric[]): void {
    this.metrics = metrics;
    this.initializeFuse();
  }

  /**
   * Get search suggestions based on query
   */
  getSuggestions(query: string, limit: number = 10): string[] {
    if (!query.trim()) {
      return this.metrics.slice(0, limit).map(metric => metric.name);
    }

    const results = this.search(query, limit);
    return results.map(result => result.item.name);
  }
}
