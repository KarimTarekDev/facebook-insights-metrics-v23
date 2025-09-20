# Contributing to Facebook Insights Metrics v23 MCP Server

Thank you for your interest in contributing to the Facebook Insights Metrics v23 MCP Server! This document provides guidelines and information for contributors.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Contributing Guidelines](#contributing-guidelines)
- [Pull Request Process](#pull-request-process)
- [Issue Reporting](#issue-reporting)
- [Development Workflow](#development-workflow)

## Code of Conduct

This project follows a code of conduct that we expect all contributors to adhere to. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/facebook-insights-metrics-v23.git
   cd facebook-insights-metrics-v23
   ```
3. **Add the upstream remote**:
   ```bash
   git remote add upstream https://github.com/original-owner/facebook-insights-metrics-v23.git
   ```

## Development Setup

### Prerequisites

- Node.js v22.0.0 or higher
- npm or yarn
- Git

### Installation

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Generate initial metrics data
npm run refresh

# Run tests
npm test
```

### Development Commands

```bash
# Start development server
npm run dev

# Build TypeScript
npm run build

# Refresh metrics from markdown
npm run refresh

# Run tests
npm test

# Quick test
npm run test:quick
```

## Contributing Guidelines

### What Can You Contribute?

- **Bug fixes**: Report and fix bugs
- **New features**: Add new functionality
- **Documentation**: Improve README, code comments, or API docs
- **Tests**: Add or improve test coverage
- **Performance**: Optimize existing code
- **Metrics updates**: Update Facebook API metrics when new versions are released

### Code Style

- Use TypeScript for all new code
- Follow existing code patterns and conventions
- Use meaningful variable and function names
- Add JSDoc comments for public APIs
- Ensure all code is in English

### Commit Messages

Use clear, descriptive commit messages:

```
feat: add new metric search functionality
fix: resolve issue with data parsing
docs: update README with installation instructions
test: add unit tests for search module
```

### Branch Naming

- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation updates
- `test/description` - Test improvements

## Pull Request Process

1. **Create a feature branch** from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following the guidelines above

3. **Test your changes**:
   ```bash
   npm test
   npm run build
   ```

4. **Commit your changes** with descriptive messages

5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request** on GitHub with:
   - Clear title and description
   - Reference any related issues
   - Include screenshots for UI changes
   - List any breaking changes

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Other (please describe)

## Testing
- [ ] Tests pass locally
- [ ] New tests added for new functionality
- [ ] Manual testing completed

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes (or clearly documented)
```

## Issue Reporting

### Before Creating an Issue

1. Check existing issues to avoid duplicates
2. Ensure you're using the latest version
3. Try to reproduce the issue

### Issue Template

```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. See error

**Expected behavior**
What you expected to happen.

**Environment:**
- OS: [e.g. macOS, Windows, Linux]
- Node.js version: [e.g. 22.0.0]
- Package version: [e.g. 1.0.0]

**Additional context**
Add any other context about the problem here.
```

## Development Workflow

### Adding New Metrics

1. Update `FACEBOOK_API_V23_METRICS_REFERENCE.md` with new metrics
2. Run `npm run refresh` to parse and update metrics
3. Test the new metrics with `npm test`
4. Update documentation if needed

### Modifying Existing Code

1. Make changes in TypeScript source files
2. Ensure all tests pass
3. Update documentation if API changes
4. Test with different MCP clients

### Updating Dependencies

1. Update package.json with new versions
2. Run `npm install` to update lock file
3. Test thoroughly to ensure compatibility
4. Update documentation if needed

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Quick MCP test
npm run test:quick

# Test specific functionality
node test-mcp.js
```

### Test Coverage

- Unit tests for individual functions
- Integration tests for MCP tools
- End-to-end tests for complete workflows

## Documentation

### Updating Documentation

- Keep README.md up to date
- Update API documentation for changes
- Add examples for new features
- Ensure all code examples work

### Documentation Standards

- Use clear, concise language
- Include code examples
- Keep formatting consistent
- Update version numbers and dates

## Release Process

1. Update version in package.json
2. Update CHANGELOG.md
3. Create release notes
4. Tag the release
5. Publish to npm (maintainers only)

## Getting Help

- Check existing issues and discussions
- Create a new issue for questions
- Join our community discussions
- Contact maintainers directly

## Recognition

Contributors will be recognized in:
- CONTRIBUTORS.md file
- Release notes
- Project documentation

Thank you for contributing to the Facebook Insights Metrics v23 MCP Server! 🚀
