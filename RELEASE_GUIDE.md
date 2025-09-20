# GitHub Release Guide

## 🚀 How to Create a GitHub Release

### Option 1: Using the Automated Script

1. **Set up GitHub Token**:
   ```bash
   # Go to https://github.com/settings/tokens
   # Generate a new token with 'repo' permissions
   export GITHUB_TOKEN=your_token_here
   ```

2. **Run the Release Script**:
   ```bash
   ./create_release.sh
   ```

### Option 2: Manual Release via GitHub Web Interface

1. **Go to your repository**: https://github.com/KarimTarekDev/facebook-insights-metrics-v23

2. **Click "Releases"** (on the right side of the repository page)

3. **Click "Create a new release"**

4. **Fill in the release details**:
   - **Tag version**: `v1.0.0`
   - **Release title**: `Facebook Insights Metrics v23 MCP Server v1.0.0`
   - **Description**: Copy the content from `RELEASE_NOTES.md`

5. **Publish the release**

### Option 3: Using GitHub CLI (if installed)

```bash
gh release create v1.0.0 \
  --title "Facebook Insights Metrics v23 MCP Server v1.0.0" \
  --notes-file RELEASE_NOTES.md \
  --latest
```

## 📋 Release Checklist

- [ ] All tests passing
- [ ] Documentation updated
- [ ] Version tagged in git
- [ ] Release notes prepared
- [ ] GitHub release created
- [ ] NPM package published (optional)
- [ ] Community announcement (optional)

## 🎯 After Creating the Release

1. **Share the release** on social media
2. **Post in MCP communities** about the new server
3. **Update any documentation** that references the project
4. **Monitor for issues** and community feedback

## 📊 Release Metrics

- **Version**: v1.0.0
- **Files**: 67 files
- **Package Size**: 38.6 kB (compressed)
- **Unpacked Size**: 235.4 kB
- **Test Coverage**: 100%
- **Dependencies**: 7 production, 3 development
