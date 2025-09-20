#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema, ListResourcesRequestSchema, ReadResourceRequestSchema, InitializeRequestSchema, InitializedNotificationSchema } from '@modelcontextprotocol/sdk/types.js';
import { MetricsLoader } from './loader';
import { MetricsSearch } from './search';
import { MarkdownParser } from './parser';
import { Metric, MetricsFile } from './schema';
import { join } from 'path';

class FacebookInsightsServer {
  private server: Server;
  private metricsLoader: MetricsLoader;
  private searchEngine: MetricsSearch | null = null;
  private markdownPath: string;

  constructor() {
    this.server = new Server(
      {
        name: 'facebook-insights-metrics-v23',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {
            listChanged: true
          },
          resources: {
            subscribe: true,
            listChanged: true
          },
        },
      }
    );

    this.markdownPath = join(__dirname, '..', 'FACEBOOK_API_V23_METRICS_REFERENCE.md');
    this.metricsLoader = new MetricsLoader();
    
    this.setupInitialization();
    this.setupTools();
    this.setupResources();
  }

  private setupInitialization() {
    // Handle initialization
    this.server.setRequestHandler(InitializeRequestSchema, async (request) => {
      return {
        protocolVersion: request.params.protocolVersion,
        capabilities: {
          tools: {
            listChanged: true
          },
          resources: {
            subscribe: true,
            listChanged: true
          },
        },
        serverInfo: {
          name: 'facebook-insights-metrics-v23',
          version: '1.0.0',
        },
      };
    });

    // Handle initialized notification
    this.server.setNotificationHandler(InitializedNotificationSchema, async () => {
      // Server is now ready to handle requests
    });
  }

  private setupTools() {
    // List tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: 'metrics.list',
            description: 'Returns a list of all metrics with basic information',
            inputSchema: {
              type: 'object',
              properties: {},
            },
          },
          {
            name: 'metrics.get',
            description: 'Returns full details of a metric by exact name',
            inputSchema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  description: 'The exact name of the metric to retrieve',
                },
              },
              required: ['name'],
            },
          },
          {
            name: 'metrics.search',
            description: 'Performs fuzzy search over metrics by name, description, or tags',
            inputSchema: {
              type: 'object',
              properties: {
                q: {
                  type: 'string',
                  description: 'Search query',
                },
                limit: {
                  type: 'number',
                  description: 'Maximum number of results (default: 20)',
                  default: 20,
                },
              },
              required: ['q'],
            },
          },
          {
            name: 'metrics.refreshNow',
            description: 'Re-parses the Markdown file and reloads the in-memory cache',
            inputSchema: {
              type: 'object',
              properties: {},
            },
          },
        ],
      };
    });

    // Call tool
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case 'metrics.list': {
            const metrics = this.getMetrics();
            const result = metrics.map(metric => ({
              name: metric.name,
              level: metric.level,
              periods: metric.periods,
              dataType: metric.dataType,
              deprecated: metric.deprecated || false
            }));

            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(result, null, 2)
                }
              ]
            };
          }

          case 'metrics.get': {
            const { name: metricName } = args as { name: string };
            if (!metricName) {
              throw new Error('name parameter is required');
            }

            const metric = this.metricsLoader.getMetric(metricName);
            if (!metric) {
              throw new Error(`Metric not found: ${metricName}`);
            }

            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(metric, null, 2)
                }
              ]
            };
          }

          case 'metrics.search': {
            const { q, limit = 20 } = args as { q: string; limit?: number };
            if (!q) {
              throw new Error('q parameter is required');
            }

            const searchEngine = this.getSearchEngine();
            const results = searchEngine.search(q, limit);
            
            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(results, null, 2)
                }
              ]
            };
          }

          case 'metrics.refreshNow': {
            await this.refreshMetrics();
            return {
              content: [
                {
                  type: 'text',
                  text: 'Metrics refreshed successfully'
                }
              ]
            };
          }

          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
            }
          ],
          isError: true
        };
      }
    });
  }

  private setupResources() {
    // List resources
    this.server.setRequestHandler(ListResourcesRequestSchema, async () => {
      return {
        resources: [
          {
            uri: 'mcp://facebook-insights-metrics-v23/metrics.json',
            name: 'Facebook Insights Metrics v23',
            description: 'Complete JSON data of all Facebook Graph API v23.0 Insights metrics',
            mimeType: 'application/json',
          },
        ],
      };
    });

    // Read resource
    this.server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
      const { uri } = request.params;

      if (uri === 'mcp://facebook-insights-metrics-v23/metrics.json') {
        try {
          const metricsFile = this.metricsLoader.loadMetrics();
          return {
            contents: [
              {
                uri,
                mimeType: 'application/json',
                text: JSON.stringify(metricsFile, null, 2)
              }
            ]
          };
        } catch (error) {
          return {
            contents: [
              {
                uri,
                mimeType: 'text/plain',
                text: `Error loading metrics: ${error instanceof Error ? error.message : 'Unknown error'}`
              }
            ]
          };
        }
      }

      return {
        contents: [
          {
            uri,
            mimeType: 'text/plain',
            text: `Unknown resource: ${uri}`
          }
        ]
      };
    });
  }

  private getMetrics(): Metric[] {
    return this.metricsLoader.getAllMetrics();
  }

  private getSearchEngine(): MetricsSearch {
    if (!this.searchEngine) {
      const metrics = this.getMetrics();
      this.searchEngine = new MetricsSearch(metrics);
    }
    return this.searchEngine;
  }

  private async refreshMetrics(): Promise<void> {
    try {
      const parser = new MarkdownParser(this.markdownPath);
      const parsedMetrics = parser.parseMetrics();
      
      const metricsFile: MetricsFile = {
        version: parser.getVersion(),
        updatedAt: parser.getLastUpdated(),
        metrics: parsedMetrics
      };

      this.metricsLoader.saveMetrics(metricsFile);
      this.metricsLoader.clearCache();
      
      // Update search engine
      this.searchEngine = new MetricsSearch(parsedMetrics);
      
      // console.log(`Refreshed ${parsedMetrics.length} metrics from markdown`);
    } catch (error) {
      console.error('Failed to refresh metrics:', error);
      throw error;
    }
  }

  async start() {
    // Check if we need to rebuild metrics
    const shouldRebuild = process.argv.includes('--rebuild') || !this.metricsLoader.hasMetricsFile();
    
    if (shouldRebuild) {
      // console.log('Rebuilding metrics from markdown...');
      try {
        await this.refreshMetrics();
      } catch (error) {
        console.error('Failed to rebuild metrics:', error);
        if (!this.metricsLoader.hasMetricsFile()) {
          console.error('No metrics file available and rebuild failed. Exiting.');
          process.exit(1);
        }
        // console.log('Continuing with existing metrics file...');
      }
    }

    // Initialize search engine
    try {
      const metrics = this.getMetrics();
      this.searchEngine = new MetricsSearch(metrics);
      // console.log(`Initialized search engine with ${metrics.length} metrics`);
    } catch (error) {
      console.error('Failed to initialize search engine:', error);
      process.exit(1);
    }

    // Start the server
    const transport = new StdioServerTransport();
    await this.server.connect(transport);

    // console.log('Facebook Insights Metrics v23 MCP Server started');
  }
}

// Handle CLI arguments
const dataPath = process.argv.find(arg => arg.startsWith('--data='))?.split('=')[1];

if (dataPath) {
  process.env.METRICS_DATA_PATH = dataPath;
}

// Start the server
const server = new FacebookInsightsServer();
server.start().catch(console.error);