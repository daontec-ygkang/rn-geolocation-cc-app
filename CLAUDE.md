# React Native 모션 감지 애플리케이션 - 프로젝트 가이드

## 프로젝트 개요
- **프로젝트명**: RnGeolocation4CCApp
- **유형**: React Native 크로스플랫폼 모바일 애플리케이션
- **주요 기능**: 차량 하차 후 걷기/뛰기 모션 감지 및 실시간 표시
- **개발 환경**: React Native CLI, TypeScript

## 핵심 요구사항
### 개발 프레임워크
- React Native CLI (react-native-cli) 필수 사용
- 대상 플랫폼: Android (API 21+), iOS (11.0+)
- TypeScript 완전 구현 (타입 안전성)

### 핵심 라이브러리
- **필수**: `react-native-background-geolocation`
- **API 문서**: react-native-background-geolocation 저장소의 `docs/api/*.md` 반드시 참조
- **버전**: React Native 0.81.4 (package.json 기준)

## 주요 기능 명세
### 1. 모션 감지 기능
- 걷기/뛰기 활동 실시간 감지 및 분류
- "걷기 감지됨", "뛰기 감지됨" 실시간 UI 표시
- 응답 시간: 2초 미만 지연
- 정확도: 오탐지 최소화를 위한 높은 정확도 요구

### 2. 차량 하차 감지
- 운전 완료 → 차량 주차 → 하차 후 활동 감지
- 차량에서 보행자 상태로의 전환 포착
- 하차 후 자동으로 모션 감지 활성화

### 3. 사용자 제어
- 명시적인 "시작" 및 "중지" 버튼 제공
- 사용자 주도적 모션 감지 세션 관리
- 직관적이고 접근 가능한 UI/UX

## 기술 스택 및 제약사항
### 필수 권한 (Android)
- ACCESS_FINE_LOCATION
- ACCESS_COARSE_LOCATION
- ACCESS_BACKGROUND_LOCATION (Android 10+)
- ACTIVITY_RECOGNITION (Android 10+)

### 필수 권한 (iOS)
- NSLocationWhenInUseUsageDescription
- NSLocationAlwaysAndWhenInUseUsageDescription
- NSMotionUsageDescription

### 성능 요구사항
- 메모리 사용: 백그라운드 운영 시 효율적 관리
- CPU 사용: 모션 감지 중 오버헤드 최소화
- 배터리 영향: 장시간 사용을 위한 최적화
- 백그라운드 모드: 정상 동작 보장

## 개발 가이드라인
### 코드 품질
- TypeScript 엄격 모드 사용
- react-native-background-geolocation API 문서 준수
- 플랫폼별 네이티브 모듈 적절한 링크 및 구성

### 테스트 요구사항
- 실제 디바이스에서 모션 감지 테스트 필수
- Android/iOS 모두에서 백그라운드 동작 검증
- 배터리 소모 영향 측정 및 최적화

### UI/UX 표준
- Android Material Design 및 iOS Human Interface Guidelines 준수
- 반응형 디자인 (다양한 화면 크기 대응)
- 접근성 가이드라인 준수
- 명확한 오류 메시지 및 복구 지침

## 빌드 및 배포
### 빌드 환경
- **Android**: React Native CLI + Android Studio
- **iOS**: React Native CLI + Xcode
- **패키지 관리**: npm + package-lock.json

### 배포 고려사항
- App Store/Google Play 백그라운드 위치 사용 정책 준수
- 권한 요청에 대한 명확한 사용자 설명 제공
- 개인정보 보호 정책 준수

## 수락 기준 체크리스트
- [ ] React Native CLI로 Android/iOS 빌드 및 실행 성공
- [ ] react-native-background-geolocation 적절한 통합
- [ ] 시작/중지 버튼 정상 동작
- [ ] 걷기/뛰기 감지 및 실시간 표시
- [ ] 활동 감지 업데이트 2초 미만 지연
- [ ] 백그라운드 모드 정상 동작
- [ ] 모든 필요 권한 적절한 요청 및 처리
- [ ] 플랫폼별 디자인 가이드라인 준수

## 참조 문서
- **PRD**: `docs/prd.md` - 상세 제품 요구사항
- **API 문서**: react-native-background-geolocation/docs/api/*.md
- **타입 정의**: TypeScript 구현을 위한 완전한 타입 정의 필요

## 프로젝트 팁
- 모션 감지 테스트는 실제 디바이스에서만 정확함 (시뮬레이터 한계)
- 백그라운드 모드 테스트 시 디바이스 절전 모드 설정 고려
- 배터리 최적화 설정에 따른 동작 차이 테스트 필요
- iOS App Store 심사 시 백그라운드 위치 사용 정당화 필요