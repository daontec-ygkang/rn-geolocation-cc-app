# Phase 0 Technical Context

## Project Architecture

### Directory Structure
```
RnGeolocation4CCApp/
├── android/                    # Android native code
│   ├── app/
│   │   └── build.gradle       # App-level Gradle config
│   ├── build.gradle           # Project-level Gradle config
│   └── gradle.properties      # Gradle properties (newArchEnabled=false)
├── ios/                       # iOS native code (not configured yet)
├── src/                       # TypeScript source code
│   ├── components/            # Reusable UI components
│   ├── contexts/              # React contexts
│   ├── hooks/                 # Custom React hooks
│   ├── screens/               # Screen components
│   ├── services/              # Business logic services
│   ├── types/                 # TypeScript type definitions
│   ├── utils/                 # Utility functions
│   │   └── logger.ts          # Development logger utility
│   ├── navigation/            # Navigation configuration (Phase 1)
│   ├── theme/                 # Design tokens and theme
│   └── assets/                # Static assets
├── App.tsx                    # Root component
├── index.js                   # Entry point
├── babel.config.js            # Babel configuration
├── tsconfig.json              # TypeScript configuration
├── .eslintrc.js               # ESLint configuration
└── package.json               # Dependencies

```

### TypeScript Configuration
**File**: `tsconfig.json`
**Key Settings**:
- `extends`: "@react-native/typescript-config"
- `moduleResolution`: "bundler" (required for customConditions)
- `strict`: true (strict type checking)
- `baseUrl`: "." with path aliases (@components, @screens, etc.)

**Path Aliases**:
```typescript
@/*             → src/*
@components/*   → src/components/*
@screens/*      → src/screens/*
@services/*     → src/services/*
@contexts/*     → src/contexts/*
@hooks/*        → src/hooks/*
@types/*        → src/types/*
@utils/*        → src/utils/*
@navigation/*   → src/navigation/*
@theme/*        → src/theme/*
@assets/*       → src/assets/*
```

### Babel Configuration
**File**: `babel.config.js`
**Plugins**:
- `module-resolver`: Enables runtime path alias resolution
- Aliases match TypeScript paths exactly

### Android Build Configuration

#### Project-level Gradle (`android/build.gradle`)
```gradle
buildscript {
    ext {
        buildToolsVersion = "36.0.0"
        minSdkVersion = 24
        compileSdkVersion = 36
        targetSdkVersion = 36
        ndkVersion = "27.1.12297006"
        kotlinVersion = "2.1.20"
        googlePlayServicesLocationVersion = "21.0.1"
        appCompatVersion = "1.4.2"
    }
}

allprojects {
    repositories {
        google()
        mavenCentral()
        // Background Geolocation
        maven { url("${project(':react-native-background-geolocation').projectDir}/libs") }
        maven { url 'https://developer.huawei.com/repo/' }
        // Background Fetch
        maven { url("${project(':react-native-background-fetch').projectDir}/libs") }
    }
}
```

#### App-level Gradle (`android/app/build.gradle`)
```gradle
apply plugin: "com.android.application"
apply plugin: "org.jetbrains.kotlin.android"
apply plugin: "com.facebook.react"

// Background Geolocation plugin
Project background_geolocation = project(':react-native-background-geolocation')
apply from: "${background_geolocation.projectDir}/app.gradle"

buildTypes {
    release {
        minifyEnabled enableProguardInReleaseBuilds
        shrinkResources false  // Required for background-geolocation
    }
}
```

## Dependency Management

### Core Dependencies (Production)
- **react@19.1.0**: Core React library
- **react-native@0.81.4**: React Native framework
- **@react-native-async-storage/async-storage@^1.21.0**: Persistent storage
- **react-native-background-geolocation@^4.16.2**: Background location tracking
- **react-native-background-fetch@^4.2.8**: Background task scheduler
- **react-native-safe-area-context@^5.5.2**: Safe area handling

### Development Dependencies
- **typescript@^5.7.2**: TypeScript compiler
- **@react-native/eslint-config@0.81.4**: ESLint configuration
- **@react-native/babel-preset@0.81.4**: Babel preset
- **@react-native/typescript-config@0.81.4**: TypeScript base config
- **babel-plugin-module-resolver@^5.0.0**: Path alias resolution
- **jest@^29.6.3**: Testing framework
- **prettier@2.8.8**: Code formatter

### Deferred Dependencies (Phase 1)
- ~~react-native-screens~~
- ~~@react-navigation/native~~
- ~~@react-navigation/stack~~
- ~~@react-navigation/bottom-tabs~~
- ~~react-native-gesture-handler~~

**Reason**: Incompatibility with React Native 0.81.4 breaking API changes

## Build & Development Commands

### Metro Bundler
```bash
# Start with cache reset
npx react-native start --reset-cache

# Start normally
npm start
```

### Android Build
```bash
# Debug build
cd android && ./gradlew assembleDebug

# Clean build
cd android && ./gradlew clean && ./gradlew assembleDebug

# Run on device/emulator
npm run android
```

### Quality Checks
```bash
# TypeScript compilation
npx tsc --noEmit

# ESLint
npm run lint

# Combined check
npx tsc --noEmit && npm run lint
```

## Known Issues & Workarounds

### Issue 1: Navigation Library Compatibility
**Problem**: react-native-screens incompatible with RN 0.81.4
**Symptoms**: 
- `Unresolved reference 'ChoreographerCompat'`
- `Unresolved reference 'FabricViewStateManager'`
- Canvas nullability type errors

**Workaround**: Deferred to Phase 1
**Solutions**: See `.serena/memories/phase_0_navigation_solution.md`

### Issue 2: TypeScript ESLint Version Warning
**Problem**: TypeScript 5.9.2 not officially supported by @typescript-eslint/typescript-estree
**Solution**: Downgraded to TypeScript 5.7.2
**Impact**: None - 5.7.2 has all required features

### Issue 3: New Architecture Fabric Errors
**Problem**: Kotlin compilation errors with Fabric APIs
**Solution**: Set `newArchEnabled=false` in gradle.properties
**Future**: Can re-enable when library ecosystem supports RN 0.81.4 + New Arch

## Environment Requirements

### Development Machine
- **Node.js**: >=20 (specified in package.json engines)
- **npm**: Latest (comes with Node.js)
- **Java**: JDK 17+ (for Android build)
- **Android Studio**: Latest with SDK 36

### Android Device/Emulator
- **Min SDK**: 24 (Android 7.0)
- **Target SDK**: 36 (Android 14)
- **Google Play Services**: Required for location services

### Permissions (Android)
Required in `AndroidManifest.xml`:
- `ACCESS_FINE_LOCATION`
- `ACCESS_COARSE_LOCATION`
- `ACCESS_BACKGROUND_LOCATION` (Android 10+)
- `ACTIVITY_RECOGNITION` (Android 10+)

## Code Quality Standards

### ESLint Rules (`.eslintrc.js`)
```javascript
rules: {
  'react-native/no-inline-styles': 'warn',
  'no-console': ['warn', { allow: ['warn', 'error'] }],
  '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
}
```

### TypeScript Strict Mode
All strict checks enabled:
- `noUnusedLocals`: true
- `noUnusedParameters`: true
- `noImplicitReturns`: true
- `noFallthroughCasesInSwitch`: true

## Performance Considerations

### Build Performance
- Incremental builds: ~2 seconds
- Clean builds: ~30-60 seconds
- Metro bundler startup: ~3-5 seconds

### Runtime Performance
- Metro bundler memory: ~200-300MB
- Android Gradle daemon: ~1-2GB
- APK size: 99MB (debug), expect ~30-50MB (release with ProGuard)

## Git Workflow

### Current Branch
- `phase-0-setup` (feature branch)
- No merge conflicts expected with `main`

### Commit Strategy
- Incremental commits with descriptive messages
- All Phase 0 changes ready for single PR
- Clean history for review

### Files Modified
- `package.json`: Dependencies updated
- `tsconfig.json`: Module resolution fixed
- `android/build.gradle`: Maven repos added
- `android/app/build.gradle`: Background geolocation plugin
- `android/gradle.properties`: newArchEnabled=false
- `src/utils/logger.ts`: ESLint disable comment added