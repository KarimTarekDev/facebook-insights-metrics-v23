#!/usr/bin/env node

/**
 * MCP Server Test Script
 * Tests all tools to ensure they work correctly
 */

const { spawn } = require('child_process');
const path = require('path');

const MCP_SERVER_PATH = path.join(__dirname, 'dist', 'server.js');

console.log('🧪 Starting MCP Server tests...\n');

// Test cases
const tests = [
  {
    name: 'List Tools',
    request: {
      jsonrpc: '2.0',
      id: 1,
      method: 'tools/list',
      params: {}
    }
  },
  {
    name: 'List Metrics',
    request: {
      jsonrpc: '2.0',
      id: 2,
      method: 'tools/call',
      params: {
        name: 'metrics.list',
        arguments: {}
      }
    }
  },
  {
    name: 'Search Metrics',
    request: {
      jsonrpc: '2.0',
      id: 3,
      method: 'tools/call',
      params: {
        name: 'metrics.search',
        arguments: {
          q: 'page',
          limit: 5
        }
      }
    }
  },
  {
    name: 'Get Specific Metric',
    request: {
      jsonrpc: '2.0',
      id: 4,
      method: 'tools/call',
      params: {
        name: 'metrics.get',
        arguments: {
          name: 'page_impressions'
        }
      }
    }
  },
  {
    name: 'Refresh Data',
    request: {
      jsonrpc: '2.0',
      id: 5,
      method: 'tools/call',
      params: {
        name: 'metrics.refreshNow',
        arguments: {}
      }
    }
  }
];

async function runTest(test) {
  return new Promise((resolve, reject) => {
    console.log(`🔍 Testing: ${test.name}`);
    
    const child = spawn('node', [MCP_SERVER_PATH], {
      stdio: ['pipe', 'pipe', 'pipe']
    });
    
    let output = '';
    let error = '';
    
    child.stdout.on('data', (data) => {
      output += data.toString();
    });
    
    child.stderr.on('data', (data) => {
      error += data.toString();
    });
    
    child.on('close', (code) => {
      if (code !== 0) {
        console.log(`❌ Failed: ${test.name}`);
        console.log(`Error: ${error}`);
        reject(new Error(`Test failed with code ${code}`));
        return;
      }
      
      try {
        const response = JSON.parse(output);
        if (response.error) {
          console.log(`❌ Response error: ${response.error.message}`);
          reject(new Error(response.error.message));
          return;
        }
        
        console.log(`✅ Passed: ${test.name}`);
        if (response.result) {
          console.log(`   Result: ${JSON.stringify(response.result).substring(0, 100)}...`);
        }
        resolve(response);
      } catch (e) {
        console.log(`❌ JSON parse error: ${e.message}`);
        console.log(`Response: ${output}`);
        reject(e);
      }
    });
    
    // Send request
    child.stdin.write(JSON.stringify(test.request) + '\n');
    child.stdin.end();
  });
}

async function runAllTests() {
  console.log(`📁 MCP Server path: ${MCP_SERVER_PATH}\n`);
  
  // Check if file exists
  const fs = require('fs');
  if (!fs.existsSync(MCP_SERVER_PATH)) {
    console.log('❌ MCP Server file not found!');
    console.log('Please run: npm run build');
    process.exit(1);
  }
  
  let passed = 0;
  let failed = 0;
  
  for (const test of tests) {
    try {
      await runTest(test);
      passed++;
    } catch (error) {
      console.log(`❌ Test failed: ${error.message}`);
      failed++;
    }
    console.log(''); // Empty line
  }
  
  console.log('📊 Test Results:');
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`📈 Success Rate: ${Math.round((passed / (passed + failed)) * 100)}%`);
  
  if (failed === 0) {
    console.log('\n🎉 All tests passed! MCP Server is working perfectly.');
  } else {
    console.log('\n⚠️  Some tests failed. Please check the configuration.');
  }
}

// Run tests
runAllTests().catch(console.error);


