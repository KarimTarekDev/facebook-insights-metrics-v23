import { z } from 'zod';

export const PeriodSchema = z.enum(['day', 'week', 'days_28', 'month', 'lifetime']);

export const DataTypeSchema = z.enum(['Integer', 'Float', 'JSON', 'String']);

export const LevelSchema = z.enum(['page', 'post', 'video', 'monetization', 'reels', 'story']);

export const MetricSchema = z.object({
  name: z.string(),
  level: LevelSchema,
  description: z.string(),
  periods: z.array(PeriodSchema),
  dataType: DataTypeSchema,
  notes: z.string().optional(),
  tags: z.array(z.string()).optional(),
  deprecated: z.boolean().optional()
});

export const MetricsFileSchema = z.object({
  version: z.string(),
  updatedAt: z.string(),
  metrics: z.array(MetricSchema)
});

export type Metric = z.infer<typeof MetricSchema>;
export type MetricsFile = z.infer<typeof MetricsFileSchema>;
export type Period = z.infer<typeof PeriodSchema>;
export type DataType = z.infer<typeof DataTypeSchema>;
export type Level = z.infer<typeof LevelSchema>;

// Helper functions for parsing
export function normalizePeriod(period: string): Period {
  const normalized = period.toLowerCase()
    .replace(/\s+/g, '_')
    .replace(/28_days?/g, 'days_28')
    .replace(/lifetime/g, 'lifetime')
    .replace(/monthly/g, 'month');
  
  if (normalized === '28_days' || normalized === 'days_28') return 'days_28';
  if (normalized === 'lifetime') return 'lifetime';
  if (normalized === 'month') return 'month';
  if (normalized === 'week') return 'week';
  if (normalized === 'day') return 'day';
  
  throw new Error(`Invalid period: ${period}`);
}

export function normalizeDataType(dataType: string): DataType {
  const normalized = dataType.toLowerCase();
  if (normalized.includes('integer') || normalized.includes('count') || normalized.includes('number')) return 'Integer';
  if (normalized.includes('float') || normalized.includes('decimal') || normalized.includes('earnings')) return 'Float';
  if (normalized.includes('json') || normalized.includes('breakdown') || normalized.includes('object')) return 'JSON';
  return 'String';
}

export function inferLevel(sectionTitle: string): Level {
  const title = sectionTitle.toLowerCase();
  if (title.includes('post') && !title.includes('page')) return 'post';
  if (title.includes('video')) return 'video';
  if (title.includes('monetization') || title.includes('earnings')) return 'monetization';
  if (title.includes('reels')) return 'reels';
  if (title.includes('story')) return 'story';
  return 'page'; // Default to page level
}

export function extractTags(metricName: string, description: string): string[] {
  const tags: string[] = [];
  const text = `${metricName} ${description}`.toLowerCase();
  
  // Common tag patterns
  if (text.includes('impression')) tags.push('impressions');
  if (text.includes('engagement')) tags.push('engagement');
  if (text.includes('video')) tags.push('video');
  if (text.includes('paid')) tags.push('paid');
  if (text.includes('organic')) tags.push('organic');
  if (text.includes('viral')) tags.push('viral');
  if (text.includes('unique')) tags.push('unique');
  if (text.includes('reaction')) tags.push('reactions');
  if (text.includes('follow')) tags.push('follows');
  if (text.includes('fan')) tags.push('fans');
  if (text.includes('view')) tags.push('views');
  if (text.includes('click')) tags.push('clicks');
  if (text.includes('complete')) tags.push('completion');
  if (text.includes('repeat')) tags.push('repeat');
  if (text.includes('autoplay')) tags.push('autoplay');
  if (text.includes('demographic')) tags.push('demographics');
  if (text.includes('geographic')) tags.push('geographic');
  if (text.includes('locale')) tags.push('locale');
  if (text.includes('country')) tags.push('country');
  if (text.includes('city')) tags.push('city');
  if (text.includes('age')) tags.push('age');
  if (text.includes('gender')) tags.push('gender');
  if (text.includes('earnings')) tags.push('earnings');
  if (text.includes('monetization')) tags.push('monetization');
  
  return [...new Set(tags)]; // Remove duplicates
}


