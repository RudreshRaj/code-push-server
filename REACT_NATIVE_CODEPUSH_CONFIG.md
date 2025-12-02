# ✅ CodePush Configuration for afto-ecommerce-app

## 🎉 Your Apps Are Ready!

### iOS App: `afto-ecommerce-iOS`
- **Production Key**: `ZVywt5FTzzHw5vfdtWE8WGRVTQQ24ksvOXqog`
- **Staging Key**: `SkOPvp3gLyq3TwPT9Isedcv8LhnO4ksvOXqog`

### Android App: `afto-ecommerce-Android`
- **Production Key**: `rfBp6V3TMMQW5Tl7pLAy2fo6gtS34ksvOXqog`
- **Staging Key**: `g5MzV5VvcjDQsl4eITndSGHOYrUG4ksvOXqog`

### Server Details
- **Server URL**: `https://code-push-server-production.up.railway.app/`
- **Access Token**: `dOhWA681QkeHV7S2Bs6WysJiVmmZ4ksvOXqog`

---

## 📱 React Native Configuration

### 1. Install CodePush SDK

```bash
cd C:\Users\rudre\OneDrive\Desktop\Work\afto\afto-ecommerce-app
npm install --save react-native-code-push
# or
yarn add react-native-code-push
```

### 2. iOS Configuration

#### File: `ios/afto_ecommerce_app/Info.plist`

Add these keys inside the `<dict>` tag:

```xml
<key>CodePushDeploymentKey</key>
<string>$(CODEPUSH_KEY)</string>
<key>CodePushServerURL</key>
<string>https://code-push-server-production.up.railway.app/</string>
```

#### File: `ios/afto_ecommerce_app.xcodeproj/project.pbxproj`

Or configure in Xcode:
1. Open your project in Xcode
2. Select your target
3. Go to Build Settings
4. Add User-Defined Settings:
   - For Debug: `CODEPUSH_KEY = SkOPvp3gLyq3TwPT9Isedcv8LhnO4ksvOXqog`
   - For Release: `CODEPUSH_KEY = ZVywt5FTzzHw5vfdtWE8WGRVTQQ24ksvOXqog`

### 3. Android Configuration

#### File: `android/app/build.gradle`

Add inside the `android` block:

```gradle
android {
    ...
    
    defaultConfig {
        ...
        resValue "string", "CodePushServerURL", "https://code-push-server-production.up.railway.app/"
    }
    
    buildTypes {
        debug {
            ...
            resValue "string", "CodePushDeploymentKey", "g5MzV5VvcjDQsl4eITndSGHOYrUG4ksvOXqog"
        }
        
        release {
            ...
            resValue "string", "CodePushDeploymentKey", "rfBp6V3TMMQW5Tl7pLAy2fo6gtS34ksvOXqog"
            minifyEnabled enableProguardInReleaseBuilds
            proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"
        }
    }
}
```

#### File: `android/app/src/main/java/.../MainApplication.java` (or `.kt`)

```java
import com.microsoft.codepush.react.CodePush;

public class MainApplication extends Application implements ReactApplication {
  
  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    
    @Override
    protected String getJSBundleFile() {
      return CodePush.getJSBundleFile();
    }
    
    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new CodePush(
              getResources().getString(R.string.CodePushDeploymentKey),
              getApplicationContext(),
              BuildConfig.DEBUG,
              getResources().getString(R.string.CodePushServerURL)
          )
      );
    }
  };
}
```

### 4. App Code Integration

#### File: `App.js` or `App.tsx`

```javascript
import React from 'react';
import codePush from 'react-native-code-push';

const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.ON_NEXT_RESUME,
  minimumBackgroundDuration: 60 * 10, // 10 minutes
};

function App() {
  // Your existing app code
  return (
    // Your app JSX
  );
}

export default codePush(codePushOptions)(App);
```

---

## 🚀 Deploying Updates

### Option 1: Using the API Helper Script

```bash
# From the code-push-server directory
node codepush-api-helper.js apps
```

### Option 2: Manual Deployment Script

Create `deploy-codepush.js` in your React Native project:

```javascript
const https = require('https');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const CONFIG = {
  SERVER: 'code-push-server-production.up.railway.app',
  ACCESS_KEY: 'dOhWA681QkeHV7S2Bs6WysJiVmmZ4ksvOXqog',
  IOS_APP: 'afto-ecommerce-iOS',
  ANDROID_APP: 'afto-ecommerce-Android',
};

// Get platform and deployment from command line
const platform = process.argv[2]; // 'ios' or 'android'
const deployment = process.argv[3] || 'Staging'; // 'Staging' or 'Production'

if (!platform || !['ios', 'android'].includes(platform)) {
  console.error('Usage: node deploy-codepush.js <ios|android> [Staging|Production]');
  process.exit(1);
}

const appName = platform === 'ios' ? CONFIG.IOS_APP : CONFIG.ANDROID_APP;

console.log(`📦 Deploying ${platform} to ${deployment}...`);
console.log(`App: ${appName}`);

// Note: You'll need to implement the actual bundle creation and upload
// This is a template - the actual implementation requires:
// 1. Creating a bundle with react-native bundle
// 2. Zipping the bundle
// 3. Uploading via multipart/form-data to the release endpoint

console.log('⚠️  Manual deployment steps:');
console.log('1. Create bundle: react-native bundle ...');
console.log('2. Zip the bundle');
console.log(`3. Upload to: /apps/${appName}/deployments/${deployment}/release`);
console.log(`   With Authorization: Bearer ${CONFIG.ACCESS_KEY}`);
```

### Option 3: Use code-push-cli-cn (Community Fork)

This fork works better with self-hosted servers:

```bash
npm install -g code-push-cli-cn

# Login
code-push-cli-cn login https://code-push-server-production.up.railway.app/ --accessKey dOhWA681QkeHV7S2Bs6WysJiVmmZ4ksvOXqog

# Deploy
code-push-cli-cn release-react afto-ecommerce-iOS ios
code-push-cli-cn release-react afto-ecommerce-Android android
```

---

## ✅ Testing Your Setup

### 1. Verify Authentication

```bash
curl https://code-push-server-production.up.railway.app/authenticated \
  -H "Authorization: Bearer dOhWA681QkeHV7S2Bs6WysJiVmmZ4ksvOXqog"
```

Should return: `{"authenticated":true}`

### 2. Test in Your App

Add this to your app for testing:

```javascript
import codePush from 'react-native-code-push';

// Check for updates manually
codePush.sync({
  updateDialog: true,
  installMode: codePush.InstallMode.IMMEDIATE,
});

// Or check status
codePush.getUpdateMetadata().then((update) => {
  if (update) {
    console.log('Current CodePush version:', update.label);
  }
});
```

---

## 📝 Quick Reference

| Environment | Platform | Deployment | Key |
|------------|----------|------------|-----|
| Development | iOS | Staging | `SkOPvp3gLyq3TwPT9Isedcv8LhnO4ksvOXqog` |
| Production | iOS | Production | `ZVywt5FTzzHw5vfdtWE8WGRVTQQ24ksvOXqog` |
| Development | Android | Staging | `g5MzV5VvcjDQsl4eITndSGHOYrUG4ksvOXqog` |
| Production | Android | Production | `rfBp6V3TMMQW5Tl7pLAy2fo6gtS34ksvOXqog` |

---

## 🎯 Next Steps

1. ✅ Apps created
2. ✅ Deployment keys generated
3. ⏭️ Configure your React Native app with the keys above
4. ⏭️ Test the integration
5. ⏭️ Deploy your first update!

Your CodePush server is fully configured and ready to use! 🚀
