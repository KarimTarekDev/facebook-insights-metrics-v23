import { readFileSync } from 'fs';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import { Metric, Level, Period, DataType, normalizePeriod, normalizeDataType, inferLevel, extractTags } from './schema';

export interface ParsedMetric {
  name: string;
  level: Level;
  description: string;
  periods: Period[];
  dataType: DataType;
  notes?: string;
  tags?: string[];
  deprecated?: boolean;
}

export class MarkdownParser {
  private content: string = '';

  constructor(markdownPath: string) {
    this.content = readFileSync(markdownPath, 'utf-8');
  }

  /**
   * Parse the markdown file and extract all metrics
   */
  parseMetrics(): ParsedMetric[] {
    const metrics: ParsedMetric[] = [];
    const lines = this.content.split('\n');
    
    let currentSection = '';
    let inTable = false;
    let tableHeaders: string[] = [];
    let tableStartIndex = -1;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Detect section headers
      if (line.startsWith('###') || line.startsWith('##')) {
        currentSection = line.replace(/^#+\s*/, '');
        inTable = false;
        continue;
      }

      // Detect table start - look for tables with "Metric Name" column
      if (line.startsWith('|') && line.includes('Metric Name')) {
        inTable = true;
        tableHeaders = this.parseTableHeaders(line);
        tableStartIndex = i;
        continue;
      }

      // Detect table end - empty line or non-table content
      if (inTable && (line === '' || (!line.startsWith('|') && line !== ''))) {
        inTable = false;
        continue;
      }

      // Parse table rows
      if (inTable && line.startsWith('|') && !line.match(/^\|[\s\-|]*\|$/) && line.includes('|')) {
        const metric = this.parseTableRow(line, tableHeaders, currentSection);
        if (metric) {
          metrics.push(metric);
        }
      }
    }
    return metrics;
  }

  private parseTableHeaders(headerLine: string): string[] {
    return headerLine
      .split('|')
      .map(cell => cell.trim())
      .filter(cell => cell.length > 0);
  }

  private parseTableRow(row: string, headers: string[], section: string): ParsedMetric | null {
    const cells = row
      .split('|')
      .map(cell => cell.trim())
      .filter(cell => cell.length > 0);

    if (cells.length < 2) return null;

    const metricName = cells[0];
    if (!metricName || metricName === 'Metric Name' || metricName.includes('---')) return null;

    // Skip deprecated metrics section
    if (section.toLowerCase().includes('deprecated')) return null;

    const description = cells[1] || '';
    const periods = this.parsePeriods(cells[2] || '');
    const dataType = this.parseDataType(cells[3] || '');
    const notes = cells[4] || '';

    // Check if deprecated
    const isDeprecated = description.toLowerCase().includes('deprecated') || 
                        notes.toLowerCase().includes('deprecated') ||
                        section.toLowerCase().includes('deprecated');

    const level = inferLevel(section);
    const tags = extractTags(metricName, description);

    return {
      name: metricName.replace(/`/g, ''), // Remove backticks
      level,
      description: description.replace(/\*\*/g, ''), // Remove markdown bold
      periods,
      dataType,
      notes: notes || undefined,
      tags,
      deprecated: isDeprecated
    };
  }

  private parsePeriods(periodsStr: string): Period[] {
    if (!periodsStr) return [];
    
    return periodsStr
      .split(',')
      .map(p => p.trim())
      .filter(p => p.length > 0)
      .map(p => {
        try {
          return normalizePeriod(p);
        } catch {
          // Handle common variations
          const normalized = p.toLowerCase()
            .replace(/\s+/g, '_')
            .replace(/28_days?/g, 'days_28')
            .replace(/lifetime/g, 'lifetime')
            .replace(/monthly/g, 'month');
          
          if (normalized === 'days_28' || normalized === '28_days') return 'days_28';
          if (normalized === 'lifetime') return 'lifetime';
          if (normalized === 'month') return 'month';
          if (normalized === 'week') return 'week';
          if (normalized === 'day') return 'day';
          
          return 'day' as Period; // Default fallback
        }
      });
  }

  private parseDataType(dataTypeStr: string): DataType {
    if (!dataTypeStr) return 'String';
    
    try {
      return normalizeDataType(dataTypeStr);
    } catch {
      return 'String'; // Default fallback
    }
  }

  /**
   * Get the version from the markdown file
   */
  getVersion(): string {
    const versionMatch = this.content.match(/API Version:\s*v(\d+\.\d+)/i);
    if (versionMatch) {
      const today = new Date();
      const dateStr = today.toISOString().split('T')[0].replace(/-/g, '-');
      return `v${versionMatch[1]}.${dateStr}`;
    }
    return 'v23.0.unknown';
  }

  /**
   * Get the last updated date
   */
  getLastUpdated(): string {
    const dateMatch = this.content.match(/Last Updated:\s*([^\n]+)/i);
    if (dateMatch) {
      return new Date(dateMatch[1]).toISOString();
    }
    return new Date().toISOString();
  }
}
