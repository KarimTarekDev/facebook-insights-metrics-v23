#!/usr/bin/env tsx
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs_1 = require("fs");
const parser_1 = require("../src/parser");
const loader_1 = require("../src/loader");
async function refreshMetrics() {
    const markdownPath = (0, path_1.resolve)(process.cwd(), 'FACEBOOK_API_V23_METRICS_REFERENCE.md');
    const dataPath = process.env.METRICS_DATA_PATH || (0, path_1.join)(process.cwd(), 'src', 'data', 'metrics.json');
    console.log('🔄 Refreshing Facebook Insights Metrics v23...');
    console.log(`📄 Markdown source: ${markdownPath}`);
    console.log(`💾 Data output: ${dataPath}`);
    // Check if markdown file exists
    if (!(0, fs_1.existsSync)(markdownPath)) {
        console.error(`❌ Markdown file not found: ${markdownPath}`);
        process.exit(1);
    }
    try {
        // Parse the markdown file
        console.log('📖 Parsing markdown file...');
        const parser = new parser_1.MarkdownParser(markdownPath);
        const parsedMetrics = parser.parseMetrics();
        console.log(`✅ Parsed ${parsedMetrics.length} metrics from markdown`);
        // Create metrics file structure
        const metricsFile = {
            version: parser.getVersion(),
            updatedAt: parser.getLastUpdated(),
            metrics: parsedMetrics
        };
        // Save to JSON file
        console.log('💾 Saving metrics to JSON...');
        const loader = new loader_1.MetricsLoader(dataPath);
        loader.saveMetrics(metricsFile);
        // Display summary
        console.log('\n📊 Metrics Summary:');
        console.log(`   Version: ${metricsFile.version}`);
        console.log(`   Updated: ${metricsFile.updatedAt}`);
        console.log(`   Total Metrics: ${metricsFile.metrics.length}`);
        // Group by level
        const byLevel = metricsFile.metrics.reduce((acc, metric) => {
            acc[metric.level] = (acc[metric.level] || 0) + 1;
            return acc;
        }, {});
        console.log('\n📈 By Level:');
        Object.entries(byLevel).forEach(([level, count]) => {
            console.log(`   ${level}: ${count} metrics`);
        });
        // Group by data type
        const byDataType = metricsFile.metrics.reduce((acc, metric) => {
            acc[metric.dataType] = (acc[metric.dataType] || 0) + 1;
            return acc;
        }, {});
        console.log('\n🔢 By Data Type:');
        Object.entries(byDataType).forEach(([type, count]) => {
            console.log(`   ${type}: ${count} metrics`);
        });
        // Deprecated metrics
        const deprecated = metricsFile.metrics.filter(m => m.deprecated);
        if (deprecated.length > 0) {
            console.log(`\n⚠️  Deprecated: ${deprecated.length} metrics`);
        }
        console.log('\n✅ Refresh completed successfully!');
    }
    catch (error) {
        console.error('❌ Failed to refresh metrics:', error);
        process.exit(1);
    }
}
// Run the refresh
refreshMetrics();
//# sourceMappingURL=refresh.js.map