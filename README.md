# Facebook Insights Metrics v23 MCP Server

[![npm version](https://badge.fury.io/js/facebook-insights-metrics-v23.svg)](https://badge.fury.io/js/facebook-insights-metrics-v23)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D22.0.0-brightgreen)](https://nodejs.org/)

A comprehensive Model Context Protocol (MCP) server that exposes Facebook Graph API v23.0 Insights metrics to any LLM via MCP tools and resources. This server provides access to 120+ Facebook metrics with intelligent search capabilities and real-time data updates.

## Table of Contents

- [Features](#features)
- [Quick Start](#quick-start)
- [Installation](#installation)
- [Configuration](#configuration)
- [MCP Tools](#mcp-tools)
- [MCP Resources](#mcp-resources)
- [Metrics Categories](#metrics-categories)
- [API Reference](#api-reference)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Complete Metrics Coverage**: 121+ Facebook Graph API v23.0 Insights metrics
- **Fast Fuzzy Search**: Powered by Fuse.js for intelligent metric discovery
- **Dynamic Updates**: Parse and refresh metrics from Markdown reference
- **Type Safety**: Full TypeScript support with Zod validation
- **MCP Compatible**: Works with any MCP-compatible LLM client

## Quick Start

### Prerequisites

- Node.js v22.0.0 or higher
- npm or yarn
- An MCP-compatible client (Claude Desktop, Cline, etc.)

### Installation

#### Option 1: NPM (Recommended)

```bash
# Install globally
npm install -g facebook-insights-metrics-v23

# Or install locally
npm install facebook-insights-metrics-v23
```

#### Option 2: From Source

```bash
# Clone the repository
git clone https://github.com/your-username/facebook-insights-metrics-v23.git
cd facebook-insights-metrics-v23

# Install dependencies
npm install

# Build the project
npm run build

# Generate initial metrics data
npm run refresh
```

## Configuration

### MCP Client Configuration

Add the server to your MCP client configuration:

#### Claude Desktop (claude_desktop_config.json)

```json
{
  "mcpServers": {
    "facebook-insights-metrics-v23": {
      "command": "node",
      "args": ["/path/to/facebook-insights-metrics-v23/dist/server.js"]
    }
  }
}
```

#### Cline

```json
{
  "mcpServers": {
    "facebook-insights-metrics-v23": {
      "command": "node",
      "args": ["/path/to/facebook-insights-metrics-v23/dist/server.js"]
    }
  }
}
```

### Environment Variables

- `METRICS_DATA_PATH`: Custom path to metrics.json file (optional)
- `DEBUG`: Enable debug logging (optional)

### Quick Fix for "No parameters" Error

If you're getting "No parameters" error, run this:

```bash
# Complete setup and test
npm install && npm run build && npm run refresh && npm run test
```

### Running the Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm run build
npm start

# Force rebuild from Markdown
npm run dev -- --rebuild
```

## MCP Tools

The server provides the following MCP tools:

### `metrics.list`
Returns a list of all metrics with basic information.

**Response:**
```json
[
  {
    "name": "page_impressions_unique",
    "level": "page",
    "periods": ["day", "week", "days_28"],
    "dataType": "Integer",
    "deprecated": false
  }
]
```

### `metrics.get`
Returns full details of a specific metric by exact name.

**Parameters:**
- `name` (string): The exact name of the metric

**Response:**
```json
{
  "name": "page_impressions_unique",
  "level": "page",
  "description": "Number of people who had Page content enter their screen",
  "periods": ["day", "week", "days_28"],
  "dataType": "Integer",
  "notes": "Estimated metric",
  "tags": ["impressions", "unique"],
  "deprecated": false
}
```

### `metrics.search`
Performs fuzzy search over metrics by name, description, or tags.

**Parameters:**
- `q` (string): Search query
- `limit` (number, optional): Maximum number of results (default: 20)

**Response:**
```json
[
  {
    "item": {
      "name": "page_impressions_unique",
      "level": "page",
      "description": "Number of people who had Page content enter their screen",
      "periods": ["day", "week", "days_28"],
      "dataType": "Integer",
      "notes": "Estimated metric",
      "tags": ["impressions", "unique"],
      "deprecated": false
    },
    "score": 0.1,
    "matches": [...]
  }
]
```

### `metrics.refreshNow`
Re-parses the Markdown reference file and reloads the in-memory cache.

**Response:**
```json
{
  "content": [
    {
      "type": "text",
      "text": "Metrics refreshed successfully"
    }
  ]
}
```

## MCP Resources

### `mcp://facebook-insights-metrics-v23/metrics.json`
Complete JSON data of all Facebook Graph API v23.0 Insights metrics.

**Content Type:** `application/json`

**Response:**
```json
{
  "version": "v23.0.2025-09-19",
  "updatedAt": "2025-09-19T12:00:00.000Z",
  "metrics": [
    {
      "name": "page_impressions_unique",
      "level": "page",
      "description": "Number of people who had Page content enter their screen",
      "periods": ["day", "week", "days_28"],
      "dataType": "Integer",
      "notes": "Estimated metric",
      "tags": ["impressions", "unique"],
      "deprecated": false
    }
    // ... 120+ more metrics
  ]
}
```

## Metrics Categories

### Page-Level Metrics (59 metrics)
- **Page Content & Tab**: Tab views and content metrics
- **Page CTA & Actions**: Call-to-action interactions
- **Page Engagement**: Follows, unfollows, and engagement metrics
- **Page Impressions**: Reach and impression tracking
- **Page Posts Impressions**: Post-specific reach metrics
- **Page Video Performance**: Video views and completion rates
- **Page Fan/Demographics**: Follower demographics and growth
- **Page Content & Views**: Profile page visits
- **Page Stories & Activity**: Story creation and activity metrics

### Post-Level Metrics (33 metrics)
- **Post Impressions**: Post reach and visibility
- **Post Engagement & Activity**: Post interactions and clicks
- **Post Reactions**: Individual reaction counts
- **Post Video Performance**: Post-specific video metrics

### Video Metrics (26 metrics)
- Video views, completion rates, and retention
- Demographic breakdowns by age, gender, and location
- Attribution tracking (paid vs organic)

### Monetization Metrics (3 metrics)
- Content monetization earnings
- Revenue tracking and estimates

## Data Types

- **Integer**: Counts, totals, and whole numbers
- **Float**: Earnings, rates, and decimal values
- **JSON**: Complex objects with breakdowns (demographics, attribution)
- **String**: Text-based data

## Supported Periods

- **day**: Daily data points
- **week**: Weekly aggregated data
- **days_28**: 28-day rolling periods
- **month**: Monthly data
- **lifetime**: All-time totals since Page creation

## CLI Options

```bash
# Force rebuild from Markdown
facebook-insights-metrics-v23 --rebuild

# Override metrics.json location
facebook-insights-metrics-v23 --data /path/to/metrics.json
```

## Development

### Project Structure

```
facebook-insights-metrics-v23/
├── package.json              # Project configuration
├── mcp.json                  # MCP server configuration
├── tsconfig.json             # TypeScript configuration
├── src/
│   ├── server.ts             # MCP server implementation
│   ├── schema.ts             # Zod schemas and types
│   ├── loader.ts             # Metrics data loader
│   ├── search.ts             # Fuzzy search implementation
│   ├── parser.ts             # Markdown parser
│   └── data/
│       └── metrics.json      # Generated metrics data
├── scripts/
│   └── refresh.ts            # Refresh script
└── FACEBOOK_API_V23_METRICS_REFERENCE.md  # Source markdown
```

### Available Scripts

```bash
# Development
npm run dev          # Start server in development mode
npm run build        # Build TypeScript to JavaScript
npm run refresh      # Parse Markdown and update metrics.json

# Production
npm start            # Start built server
```

### Adding New Metrics

1. Update the `FACEBOOK_API_V23_METRICS_REFERENCE.md` file
2. Run `npm run refresh` to parse and update metrics
3. The server will automatically reload with new metrics

### Customization

- **Search Threshold**: Modify `threshold` in `src/search.ts` (default: 0.35)
- **Data Path**: Set `METRICS_DATA_PATH` environment variable
- **Tags**: Customize tag extraction in `src/schema.ts`

## API Reference

### Facebook Graph API v23.0

This MCP server is based on the official Facebook Graph API v23.0 Insights documentation. All metrics are sourced from the comprehensive reference document and include:

- Complete metric definitions
- Supported time periods
- Data types and formats
- Deprecation status
- Usage notes and limitations

### Rate Limits

- **MCP Server**: No built-in rate limiting
- **Facebook API**: 200 calls per hour per app (when used with actual API)
- **Search**: Optimized with Fuse.js for fast local searches

## Troubleshooting

### Common Issues

1. **"No parameters" error**: This is the most common issue. Follow these steps:
   ```bash
   # 1. Ensure proper installation
   npm install
   npm run build
   npm run refresh
   
   # 2. Test the server
   npm run test
   
   # 3. Use correct mcp.json configuration
   ```
   
   **Correct mcp.json:**
   ```json
   {
     "mcpServers": {
       "facebook-insights-metrics-v23": {
         "command": "node",
         "args": ["/full/path/to/facebook-insights-metrics-v23/dist/server.js"]
       }
     }
   }
   ```

2. **No metrics found**: Run `npm run refresh` to generate metrics.json
3. **Build errors**: Ensure Node.js v22+ and run `npm install`
4. **Search not working**: Check that metrics.json exists and is valid

### Debug Mode

```bash
# Enable debug logging
DEBUG=* npm run dev
```

## Development

### Project Structure

```
facebook-insights-metrics-v23/
├── src/                          # TypeScript source code
│   ├── server.ts                 # MCP server implementation
│   ├── schema.ts                 # Zod schemas and types
│   ├── loader.ts                 # Metrics data loader
│   ├── search.ts                 # Fuzzy search implementation
│   ├── parser.ts                 # Markdown parser
│   └── data/
│       └── metrics.json          # Generated metrics data
├── scripts/
│   └── refresh.ts                # Refresh script
├── .github/                      # GitHub templates
├── dist/                         # Compiled JavaScript
├── FACEBOOK_API_V23_METRICS_REFERENCE.md  # Source markdown
└── test-mcp.js                   # Test script
```

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build TypeScript to JavaScript
npm run refresh      # Parse Markdown and update metrics.json
npm start            # Start production server
npm test             # Run MCP server tests
npm run test:quick   # Quick MCP test
```

### Adding New Metrics

1. Update `FACEBOOK_API_V23_METRICS_REFERENCE.md` with new metrics
2. Run `npm run refresh` to parse and update metrics
3. Test the new metrics with `npm test`

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Quick Start for Contributors

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `npm test`
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

## Support

- 📖 [Documentation](README.md)
- 🐛 [Report Issues](https://github.com/your-username/facebook-insights-metrics-v23/issues)
- 💬 [Discussions](https://github.com/your-username/facebook-insights-metrics-v23/discussions)
- 📧 [Contact](mailto:your-email@example.com)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Facebook Graph API team for the comprehensive metrics documentation
- Model Context Protocol team for the MCP specification
- All contributors who help improve this project

---

**Version**: 1.0.0  
**Node.js**: v22.0.0+  
**Facebook API**: v23.0  
**Last Updated**: September 19, 2025


