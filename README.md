# RnGeolocation4CCApp

React Native 모션 감지 애플리케이션 - 차량 하차 후 걷기/뛰기 활동 감지

## 📋 프로젝트 개요

이 애플리케이션은 사용자가 차량에서 하차한 후 걷기와 뛰기 활동을 실시간으로 감지하고 표시하는 크로스플랫폼 모바일 앱입니다.

### 주요 기능
- 🚶 **걷기 감지**: 보행 활동 실시간 감지 및 표시
- 🏃 **뛰기 감지**: 달리기 활동 실시간 감지 및 표시
- 🚗 **차량 하차 감지**: 운전 완료 후 하차 자동 감지
- 📊 **활동 통계**: 걷기/뛰기 시간 추적 및 통계
- 📱 **크로스플랫폼**: Android 및 iOS 지원

### 기술 스택
- **Framework**: React Native 0.81.4
- **Language**: TypeScript (Strict Mode)
- **Navigation**: React Navigation 6.x
- **State Management**: React Context API + AsyncStorage
- **Core Library**: react-native-background-geolocation
- **Testing**: Jest + React Native Testing Library

---

## 🚀 시작하기

### 필수 요구사항

#### 시스템 요구사항
- **Node.js**: >= 20.x
- **npm**: >= 9.x
- **React Native CLI**: 최신 버전

#### 플랫폼별 요구사항

**Android:**
- Android Studio (최신 버전)
- Android SDK (API Level 21+)
- JDK 17

**iOS (macOS만 해당):**
- Xcode 14.0+
- CocoaPods 1.11+
- iOS 11.0+ 타겟

### 환경 설정

React Native 개발 환경이 설정되지 않은 경우:
- [React Native - Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment)

---

## 📦 설치

### 1. 저장소 클론
```bash
git clone https://github.com/your-org/RnGeolocation4CCApp.git
cd RnGeolocation4CCApp
```

### 2. 의존성 설치
```bash
npm install
```

### 3. iOS 네이티브 의존성 설치 (macOS만)
```bash
cd ios && pod install && cd ..
```

---

## 🏃 실행

### 개발 서버 시작
```bash
npm start
```

### Android 실행
```bash
# 에뮬레이터 또는 연결된 디바이스에서 실행
npm run android
```

### iOS 실행 (macOS만)
```bash
# 시뮬레이터에서 실행
npm run ios

# 특정 디바이스 지정
npm run ios -- --device "iPhone 15 Pro"
```

---

## 🧪 테스트

### 단위 테스트 실행
```bash
npm test
```

### 테스트 커버리지
```bash
npm test -- --coverage
```

### TypeScript 타입 체크
```bash
npx tsc --noEmit
```

### 린팅
```bash
npm run lint
```

---

## 📁 프로젝트 구조

```
RnGeolocation4CCApp/
├── src/
│   ├── components/      # 재사용 가능한 UI 컴포넌트
│   ├── screens/         # 화면 컴포넌트
│   ├── navigation/      # 네비게이션 설정
│   ├── contexts/        # Context API (전역 상태)
│   ├── services/        # 비즈니스 로직 (Geolocation 등)
│   ├── hooks/           # Custom React Hooks
│   ├── types/           # TypeScript 타입 정의
│   ├── utils/           # 유틸리티 함수
│   ├── theme/           # 디자인 토큰 및 스타일
│   └── assets/          # 이미지, 폰트 등
├── __tests__/           # 테스트 파일
├── android/             # Android 네이티브 코드
├── ios/                 # iOS 네이티브 코드
├── docs/                # 프로젝트 문서
│   ├── prd.md          # 제품 요구사항 명세
│   ├── workflow_roadmap.md  # 개발 로드맵
│   └── phase-0-setup-guide.md  # 설정 가이드
└── App.tsx              # 앱 엔트리 포인트
```

---

## 🛠️ 개발 가이드

### Path Aliases
TypeScript와 Babel에서 path alias가 설정되어 있습니다:

```typescript
import { Button } from '@components/Button';
import { useApp } from '@contexts/AppContext';
import { logger } from '@utils/logger';
```

사용 가능한 alias:
- `@/` → `src/`
- `@components/` → `src/components/`
- `@screens/` → `src/screens/`
- `@services/` → `src/services/`
- `@contexts/` → `src/contexts/`
- `@hooks/` → `src/hooks/`
- `@types/` → `src/types/`
- `@utils/` → `src/utils/`
- `@navigation/` → `src/navigation/`
- `@theme/` → `src/theme/`
- `@assets/` → `src/assets/`

### 코드 스타일
- **Prettier**: 자동 포맷팅 (printWidth: 100, singleQuote: true)
- **ESLint**: 코드 품질 검사
- **TypeScript**: Strict 모드 활성화

### 커밋 메시지 규칙
```
[Phase N] Component: Action

Details:
- Change 1
- Change 2

Tests: Description
```

---

## 🔑 주요 의존성

### Production
- `react-native-background-geolocation`: 백그라운드 위치 및 모션 감지
- `@react-navigation/native`: 네비게이션 시스템
- `@react-native-async-storage/async-storage`: 로컬 데이터 저장
- `react-native-safe-area-context`: Safe Area 관리

### Development
- `typescript`: TypeScript 컴파일러
- `@testing-library/react-native`: 컴포넌트 테스팅
- `babel-plugin-module-resolver`: Path alias 지원
- `eslint`: 코드 린팅
- `prettier`: 코드 포맷팅

---

## 📱 권한 요구사항

### Android
- `ACCESS_FINE_LOCATION`: 정밀 위치 정보
- `ACCESS_COARSE_LOCATION`: 대략적 위치 정보
- `ACCESS_BACKGROUND_LOCATION`: 백그라운드 위치 (Android 10+)
- `ACTIVITY_RECOGNITION`: 활동 인식 (Android 10+)

### iOS
- `NSLocationWhenInUseUsageDescription`: 앱 사용 중 위치 권한
- `NSLocationAlwaysAndWhenInUseUsageDescription`: 항상 위치 권한
- `NSMotionUsageDescription`: 모션 센서 권한

---

## 🐛 문제 해결

### Metro Bundler 캐시 문제
```bash
npm start -- --reset-cache
```

### Android 빌드 오류
```bash
cd android && ./gradlew clean && cd ..
npm run android
```

### iOS 빌드 오류
```bash
cd ios && pod deintegrate && pod install && cd ..
npm run ios
```

### TypeScript 오류
```bash
# TypeScript 캐시 삭제
rm -rf node_modules/.cache
npx tsc --noEmit
```

---

## 📚 추가 문서

- **[PRD (제품 요구사항 명세)](docs/prd.md)**: 상세한 기능 명세 및 요구사항
- **[개발 로드맵](docs/workflow_roadmap.md)**: Phase별 개발 계획 및 진행 상황
- **[Phase 0 설정 가이드](docs/phase-0-setup-guide.md)**: 초기 설정 상세 가이드
- **[프로젝트 가이드](CLAUDE.md)**: AI 개발 도우미용 가이드

---

## 🤝 기여

이 프로젝트는 현재 개발 중입니다. 기여 가이드라인은 추후 업데이트 예정입니다.

---

## 📄 라이선스

이 프로젝트의 라이선스는 추후 명시될 예정입니다.

---

## 🔗 유용한 링크

- [React Native 공식 문서](https://reactnative.dev)
- [React Navigation 문서](https://reactnavigation.org)
- [react-native-background-geolocation](https://github.com/transistorsoft/react-native-background-geolocation)
- [TypeScript 핸드북](https://www.typescriptlang.org/docs/)

---

## 📞 지원

문제가 발생하거나 질문이 있는 경우:
1. [Issues](https://github.com/your-org/RnGeolocation4CCApp/issues)에서 검색
2. 새로운 Issue 생성
3. 프로젝트 문서 참조

---

**Last Updated**: 2025-09-30
**Version**: 0.0.1 (Phase 0 - Setup Complete)