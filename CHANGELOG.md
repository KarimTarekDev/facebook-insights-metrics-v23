# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial release preparation
- Comprehensive documentation
- GitHub issue and PR templates

## [1.0.0] - 2025-09-19

### Added
- Initial release of Facebook Insights Metrics v23 MCP Server
- Support for 120+ Facebook Graph API v23.0 Insights metrics
- MCP tools for metrics discovery and search:
  - `metrics.list` - List all available metrics
  - `metrics.get` - Get specific metric details
  - `metrics.search` - Fuzzy search across metrics
  - `metrics.refreshNow` - Refresh metrics from source
- MCP resource for complete metrics data:
  - `mcp://facebook-insights-metrics-v23/metrics.json` - Full metrics dataset
- Intelligent fuzzy search powered by Fuse.js
- Dynamic metrics parsing from Markdown reference
- TypeScript support with Zod validation
- Comprehensive test suite
- Support for multiple metric levels:
  - Page-level metrics (59 metrics)
  - Post-level metrics (33 metrics)
  - Video metrics (26 metrics)
  - Monetization metrics (3 metrics)
- Support for multiple data types:
  - Integer (counts and totals)
  - Float (earnings and rates)
  - JSON (complex breakdowns)
  - String (text data)
- Support for multiple time periods:
  - day, week, days_28, month, lifetime
- CLI options for rebuild and custom data paths
- Professional documentation and examples
- MIT license
- Comprehensive contributing guidelines

### Technical Details
- Built with TypeScript and Node.js v22+
- Uses Model Context Protocol SDK v1.18.1
- Powered by Fuse.js for search functionality
- Markdown parsing with unified/remark
- Zod for runtime type validation
- Full test coverage with automated testing

### Documentation
- Comprehensive README with installation and usage instructions
- API reference with examples
- Contributing guidelines
- Issue and PR templates
- Code of conduct
- License information

[Unreleased]: https://github.com/your-username/facebook-insights-metrics-v23/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/your-username/facebook-insights-metrics-v23/releases/tag/v1.0.0
