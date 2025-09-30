# Phase 0 Navigation Dependencies Solution

## Issue Summary

During Phase 0 setup, react-native-screens library (required for React Navigation) had Kotlin compilation errors with React Native 0.81.4:

```
e: Unresolved reference 'ChoreographerCompat'
e: Unresolved reference 'FabricViewStateManager'
e: Type argument is not within its bounds
e: Argument type mismatch: actual type is 'Canvas?', but 'Canvas' was expected
```

## Root Cause

React Native 0.81.4 introduced breaking API changes:
- `ChoreographerCompat` API moved/removed
- Canvas nullability requirements changed
- Fabric API surface changes

react-native-screens versions tested (3.20.0, 3.18.2, 3.10.2) are not yet compatible with these changes.

## Solution Applied

**Removed navigation dependencies from Phase 0** as they are not required until Phase 1:

```bash
npm uninstall react-native-screens @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs react-native-gesture-handler
```

**Rationale**:
- Phase 0 only requires core dependencies (background-geolocation, async-storage, safe-area-context)
- Navigation is needed starting Phase 1 (screen implementation)
- Temporary removal unblocks development

## Phase 1 Implementation Options

### Option 1: Downgrade React Native (Recommended)
```bash
# Downgrade to stable version
npm install react-native@0.76.8 --save-exact
npm install @react-native/babel-preset@0.76.8 --save-dev
# Re-add navigation
npm install @react-navigation/native @react-navigation/stack react-native-screens react-native-gesture-handler
cd ios && pod install && cd ..
```

**Pros**: Proven stability, full library ecosystem compatibility
**Cons**: Miss out on RN 0.81.4 improvements

### Option 2: Wait for Library Update
Monitor react-native-screens releases for RN 0.81.4 compatibility:
- GitHub: https://github.com/software-mansion/react-native-screens/releases
- Expected timeline: 2-4 weeks for major RN version support

### Option 3: Alternative Navigation
Use react-native-navigation (Wix) which has better native integration:
```bash
npm install react-native-navigation
```
**Note**: Requires more complex native setup but better performance

## Current State (Phase 0 Complete)

✅ **Working Dependencies**:
- react-native-background-geolocation@4.16.2
- react-native-background-fetch@4.2.8
- @react-native-async-storage/async-storage@1.21.0
- react-native-safe-area-context@5.5.2

✅ **Build Status**: Android debug APK builds successfully (99MB)

⏳ **Deferred**: Navigation libraries (Phase 1 requirement)

## Recommended Action for Phase 1

Use **Option 1 (Downgrade React Native)** because:
1. Immediate unblocking of Phase 1 development
2. Stable ecosystem compatibility
3. Can upgrade later when libraries catch up
4. Project timeline prioritizes delivery over latest RN version