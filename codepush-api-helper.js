#!/usr/bin/env node

/**
 * CodePush API Helper
 * Direct API access to your self-hosted CodePush server
 */

const https = require('https');

const CONFIG = {
  SERVER: 'code-push-server-production.up.railway.app',
  ACCESS_KEY: 'dOhWA681QkeHV7S2Bs6WysJiVmmZ4ksvOXqog'
};

function apiRequest(path, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: CONFIG.SERVER,
      port: 443,
      path: path,
      method: method,
      headers: {
        'Authorization': `Bearer ${CONFIG.ACCESS_KEY}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        try {
          const parsed = JSON.parse(responseData);
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(parsed);
          } else {
            reject(new Error(`HTTP ${res.statusCode}: ${responseData}`));
          }
        } catch (e) {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(responseData);
          } else {
            reject(new Error(`HTTP ${res.statusCode}: ${responseData}`));
          }
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

// API Methods
const CodePushAPI = {
  // List all apps
  async listApps() {
    console.log('📱 Fetching apps...');
    const result = await apiRequest('/apps');
    console.log('\nYour Apps:');
    if (result.apps && result.apps.length > 0) {
      result.apps.forEach(app => {
        console.log(`  - ${app.name} (${app.os})`);
      });
    } else {
      console.log('  No apps found. Create one first!');
    }
    return result;
  },

  // Create new app
  async createApp(name, os = 'iOS', platform = 'React-Native') {
    console.log(`📱 Creating app: ${name} (${os}, ${platform})...`);
    const result = await apiRequest('/apps', 'POST', { name, os, platform });
    console.log(`✅ App created successfully!`);
    return result;
  },

  // Get app deployments and keys
  async getApp(appName) {
    console.log(`📱 Fetching deployments for: ${appName}...`);
    const result = await apiRequest(`/apps/${appName}/deployments`);
    console.log(`\nApp: ${appName}`);
    console.log(`Deployments:`);
    if (result.deployments && result.deployments.length > 0) {
      result.deployments.forEach(dep => {
        console.log(`\n  📦 ${dep.name}:`);
        console.log(`     Key: ${dep.key}`);
      });
    } else {
      console.log('  No deployments found.');
    }
    return result;
  },

  // Get account info
  async getAccount() {
    console.log('👤 Fetching account info...');
    const result = await apiRequest('/account');
    console.log(`\nAccount: ${result.account.email}`);
    console.log(`Name: ${result.account.name}`);
    return result;
  },

  // Check authentication
  async checkAuth() {
    console.log('🔐 Checking authentication...');
    const result = await apiRequest('/authenticated');
    if (result.authenticated) {
      console.log('✅ Authentication successful!');
    } else {
      console.log('❌ Authentication failed!');
    }
    return result;
  }
};

// CLI Interface
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  try {
    switch (command) {
      case 'auth':
      case 'check':
        await CodePushAPI.checkAuth();
        break;

      case 'account':
        await CodePushAPI.getAccount();
        break;

      case 'apps':
      case 'list':
        await CodePushAPI.listApps();
        break;

      case 'create':
        const appName = args[1];
        const os = args[2] || 'iOS';
        const platform = args[3] || 'React-Native';
        if (!appName) {
          console.error('❌ Usage: node codepush-api-helper.js create <app-name> [iOS|Android] [React-Native|Cordova]');
          process.exit(1);
        }
        await CodePushAPI.createApp(appName, os, platform);
        break;

      case 'app':
      case 'details':
        const name = args[1];
        if (!name) {
          console.error('❌ Usage: node codepush-api-helper.js app <app-name>');
          process.exit(1);
        }
        await CodePushAPI.getApp(name);
        break;

      default:
        console.log(`
CodePush API Helper
===================

Usage: node codepush-api-helper.js <command>

Commands:
  auth, check                    Check if authentication is working
  account                        Show account information
  apps, list                     List all apps
  create <name> [os] [platform]  Create new app
  app <name>                     Get app details and deployment keys

Examples:
  node codepush-api-helper.js auth
  node codepush-api-helper.js apps
  node codepush-api-helper.js create MyApp-iOS iOS React-Native
  node codepush-api-helper.js create MyApp-Android Android React-Native
  node codepush-api-helper.js app MyApp-iOS

Server: ${CONFIG.SERVER}
Access Key: ${CONFIG.ACCESS_KEY.substring(0, 10)}...
        `);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = CodePushAPI;
