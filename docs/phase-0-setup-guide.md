# Phase 0 Setup Guide

## ✅ 완료된 작업

### 1. Git 브랜치 생성
```bash
✅ 브랜치: phase-0-setup
✅ 상태: main에서 분기 완료
```

### 2. 의존성 업데이트
**추가된 dependencies:**
- `react-native-background-geolocation`: ^4.16.2 (핵심 모션 감지)
- `@react-navigation/native`: ^6.1.9
- `@react-navigation/stack`: ^6.3.20
- `@react-navigation/bottom-tabs`: ^6.5.11
- `react-native-screens`: ^3.29.0
- `react-native-gesture-handler`: ^2.14.1
- `@react-native-async-storage/async-storage`: ^1.21.0

**추가된 devDependencies:**
- `@testing-library/react-native`: ^12.4.3
- `@testing-library/jest-native`: ^5.4.3
- `babel-plugin-module-resolver`: ^5.0.0

### 3. 프로젝트 구조
```
src/
├── components/       # 재사용 가능한 컴포넌트
├── screens/         # 화면 컴포넌트
├── services/        # 비즈니스 로직 (GeolocationService 등)
├── contexts/        # React Context (전역 상태)
├── hooks/           # Custom React Hooks
├── types/           # TypeScript 타입 정의
│   ├── index.ts
│   ├── navigation.ts
│   ├── geolocation.ts
│   └── theme.ts
├── utils/           # 유틸리티 함수
│   ├── logger.ts
│   └── validators.ts
├── navigation/      # 네비게이션 설정
├── theme/           # 테마 및 스타일
└── assets/          # 이미지, 폰트 등
    ├── images/
    └── fonts/

__tests__/           # 테스트 파일
├── components/
├── screens/
├── services/
└── utils/
```

### 4. TypeScript 설정 최적화
**tsconfig.json 업데이트:**
- ✅ Strict 모드 활성화
- ✅ Path alias 설정 (`@/`, `@components/` 등)
- ✅ 타입 체크 강화 (noUnusedLocals, noImplicitReturns 등)

**Babel 설정:**
- ✅ module-resolver 플러그인 추가
- ✅ Path alias와 동기화

### 5. 코드 품질 도구
**Prettier (.prettierrc.js):**
- printWidth: 100
- singleQuote: true
- trailingComma: 'all'

**ESLint (.eslintrc.js):**
- react-native/no-inline-styles: warn
- no-console: warn (allow: warn, error)
- @typescript-eslint/no-unused-vars: error

---

## 🚀 다음 단계: 의존성 설치 및 빌드 검증

### Step 1: 의존성 설치
```bash
npm install
```

예상 시간: 5-10분

### Step 2: iOS 네이티브 의존성 설치 (macOS만 해당)
```bash
cd ios && pod install && cd ..
```

예상 시간: 3-5분

### Step 3: 빌드 검증

#### Android 빌드
```bash
npm run android
```

**예상 결과:**
- 앱이 에뮬레이터 또는 실제 디바이스에서 실행됨
- Metro Bundler가 정상 작동
- 기본 화면 표시 (SafeAreaProvider 포함)

**문제 발생 시:**
1. Android Studio에서 프로젝트 열기
2. Gradle Sync 실행
3. Build → Clean Project → Rebuild Project

#### iOS 빌드 (macOS만 해당)
```bash
npm run ios
```

**예상 결과:**
- 앱이 시뮬레이터에서 실행됨
- Metro Bundler가 정상 작동
- 기본 화면 표시

**문제 발생 시:**
1. Xcode에서 ios/RnGeolocation4CCApp.xcworkspace 열기
2. Product → Clean Build Folder
3. Product → Build

### Step 4: TypeScript 타입 체크
```bash
npx tsc --noEmit
```

**예상 결과:**
- 타입 오류 없음 (현재는 기본 App.tsx만 있음)

### Step 5: Linting
```bash
npm run lint
```

**예상 결과:**
- 코드 스타일 오류 없음

---

## ⚠️ 주의사항

### 1. react-native-background-geolocation
이 라이브러리는 **네이티브 모듈 링크**가 필요합니다.

**Android:**
- `android/app/src/main/AndroidManifest.xml`에 권한 추가 필요 (Phase 3에서 진행)
- Gradle 설정 자동 링크됨 (React Native 0.60+)

**iOS:**
- `ios/RnGeolocation4CCApp/Info.plist`에 권한 추가 필요 (Phase 3에서 진행)
- CocoaPods 자동 링크됨

### 2. React Navigation
- `react-native-gesture-handler`는 엔트리 파일(index.js) 최상단에 import 필요
- Phase 1에서 네비게이션 설정 시 추가 예정

### 3. Path Alias
- TypeScript와 Babel 모두 설정 완료
- Metro Bundler 재시작 필요할 수 있음
- 사용 예: `import Button from '@components/Button';`

---

## ✅ Phase 0 완료 체크리스트

- [ ] `npm install` 실행 완료
- [ ] (iOS) `pod install` 실행 완료
- [ ] Android 빌드 성공
- [ ] iOS 빌드 성공 (macOS)
- [ ] TypeScript 타입 체크 통과
- [ ] ESLint 검사 통과
- [ ] Git 커밋 완료
- [ ] `/sc:save --checkpoint phase-0-complete` 실행

---

## 🎯 다음 Phase 미리보기

**Phase 1: 핵심 인프라**
- AppContext (전역 상태 관리)
- Theme System (라이트/다크 모드)
- Navigation (Stack + Bottom Tabs)
- Base Components (Button, Card, Badge 등)

예상 시간: 5-7일
예상 토큰: ~25k

---

## 📚 참고 문서

- [React Native Documentation](https://reactnative.dev/)
- [React Navigation](https://reactnavigation.org/)
- [react-native-background-geolocation](https://github.com/transistorsoft/react-native-background-geolocation)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## 💾 저장 명령어

Phase 0 완료 후 반드시 실행:
```bash
git add .
git commit -m "[Phase 0] Project setup complete

- Added core dependencies (background-geolocation, navigation, async-storage)
- Created project directory structure (src/, __tests__/)
- Optimized TypeScript configuration with strict mode and path aliases
- Updated ESLint and Prettier configurations
- Added testing libraries

Tests: Setup validation pending npm install"

/sc:save --checkpoint phase-0-complete
```