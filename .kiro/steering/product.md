# Product Overview

CodePush Server is a self-hosted hot update service for React Native and Cordova applications. It provides an alternative to Microsoft's CodePush cloud service, allowing teams to host their own update infrastructure.

## Core Functionality

- Over-the-air (OTA) updates for React Native and Cordova apps
- Multiple storage backend support (local, Qiniu, AWS S3, Aliyun OSS, Tencent Cloud)
- Differential patch generation to minimize update sizes
- Multi-platform support (iOS and Android require separate apps)
- Web-based management interface
- CLI integration via code-push client

## Key Constraints

- Updates only affect JavaScript/resource files, not native code
- iOS requires silent updates per Apple guidelines
- Android markets in China require silent updates
- Native dependency changes require full app store releases with version bumps
- Each platform (iOS/Android) needs separate CodePush app configurations
