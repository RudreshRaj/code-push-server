# CodePush Setup Guide for React Native

## Your Server Details
- **Server URL**: `https://code-push-server-production.up.railway.app/`
- **Access Key**: `dOhWA681QkeHV7S2Bs6WysJiVmmZ4ksvOXqog`
- **Status**: ✅ Verified Working

## Step 1: Create Your App via API

Since the CLI doesn't work, create your app using the REST API:

```bash
# Create iOS app
curl -X POST https://code-push-server-production.up.railway.app/apps \
  -H "Authorization: Bearer dOhWA681QkeHV7S2Bs6WysJiVmmZ4ksvOXqog" \
  -H "Content-Type: application/json" \
  -d '{"name":"YourAppName-iOS","os":"iOS"}'

# Create Android app
curl -X POST https://code-push-server-production.up.railway.app/apps \
  -H "Authorization: Bearer dOhWA681QkeHV7S2Bs6WysJiVmmZ4ksvOXqog" \
  -H "Content-Type: application/json" \
  -d '{"name":"YourAppName-Android","os":"Android"}'
```

## Step 2: Get Deployment Keys

After creating apps, get the deployment keys:

```bash
# List all your apps
curl https://code-push-server-production.up.railway.app/apps \
  -H "Authorization: Bearer dOhWA681QkeHV7S2Bs6WysJiVmmZ4ksvOXqog"

# Get specific app details (replace APP_NAME)
curl https://code-push-server-production.up.railway.app/apps/APP_NAME \
  -H "Authorization: Bearer dOhWA681QkeHV7S2Bs6WysJiVmmZ4ksvOXqog"
```

## Step 3: Configure React Native App

### Install CodePush SDK

```bash
npm install --save react-native-code-push
# or
yarn add react-native-code-push
```

### iOS Configuration (ios/YourApp/Info.plist)

```xml
<key>CodePushDeploymentKey</key>
<string>YOUR_IOS_DEPLOYMENT_KEY</string>
<key>CodePushServerURL</key>
<string>https://code-push-server-production.up.railway.app/</string>
```

### Android Configuration (android/app/build.gradle)

```gradle
android {
    ...
    buildTypes {
        debug {
            ...
            resValue "string", "CodePushDeploymentKey", "YOUR_ANDROID_STAGING_KEY"
            resValue "string", "CodePushServerURL", "https://code-push-server-production.up.railway.app/"
        }
        release {
            ...
            resValue "string", "CodePushDeploymentKey", "YOUR_ANDROID_PRODUCTION_KEY"
            resValue "string", "CodePushServerURL", "https://code-push-server-production.up.railway.app/"
        }
    }
}
```

### App Code (App.js or App.tsx)

```javascript
import codePush from "react-native-code-push";

const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.ON_NEXT_RESUME,
};

function App() {
  // Your app code
}

export default codePush(codePushOptions)(App);
```

## Step 4: Deploy Updates via API

Create a deployment script instead of using the CLI:

```javascript
// deploy-update.js
const https = require('https');
const fs = require('fs');
const FormData = require('form-data');

const SERVER = 'code-push-server-production.up.railway.app';
const ACCESS_KEY = 'dOhWA681QkeHV7S2Bs6WysJiVmmZ4ksvOXqog';
const APP_NAME = 'YourAppName-iOS'; // or YourAppName-Android
const DEPLOYMENT = 'Production'; // or Staging

// 1. Create a bundle (use react-native bundle command)
// 2. Zip the bundle
// 3. Upload via API

const form = new FormData();
form.append('package', fs.createReadStream('./CodePush/bundle.zip'));
form.append('appVersion', '1.0.0');
form.append('description', 'Update description');
form.append('isMandatory', 'false');

const options = {
  hostname: SERVER,
  port: 443,
  path: `/apps/${APP_NAME}/deployments/${DEPLOYMENT}/release`,
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${ACCESS_KEY}`,
    ...form.getHeaders()
  }
};

const req = https.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
  res.on('data', (d) => {
    process.stdout.write(d);
  });
});

req.on('error', (error) => {
  console.error(error);
});

form.pipe(req);
```

## Alternative: Use code-push-cli Fork

There's a community fork that works better with self-hosted servers:

```bash
npm install -g code-push-cli-cn
```

Then configure it:

```bash
code-push-cli-cn login https://code-push-server-production.up.railway.app/ --accessKey dOhWA681QkeHV7S2Bs6WysJiVmmZ4ksvOXqog
```

## Verification

Your access key is already verified and working! You can test it anytime:

```bash
curl https://code-push-server-production.up.railway.app/authenticated \
  -H "Authorization: Bearer dOhWA681QkeHV7S2Bs6WysJiVmmZ4ksvOXqog"
```

Should return: `{"authenticated":true}`
