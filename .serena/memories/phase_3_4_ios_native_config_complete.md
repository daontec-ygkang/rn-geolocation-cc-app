# Phase 3.4: iOS 네이티브 설정 완료

## 완료 일시
2025-10-01

## 구현 내용

### Info.plist 권한 설명 추가
✅ 위치 권한 설명 (Location Usage Descriptions):
- NSLocationWhenInUseUsageDescription: "걷기와 뛰기 활동을 감지하기 위해 위치 정보가 필요합니다"
- NSLocationAlwaysAndWhenInUseUsageDescription: "백그라운드에서 활동을 추적하기 위해 위치 정보가 필요합니다"

✅ 모션 권한 설명 (Motion Usage Description):
- NSMotionUsageDescription: "걷기와 뛰기를 구분하기 위해 모션 센서가 필요합니다"

### Background Modes 활성화
✅ UIBackgroundModes 배열 추가:
- location: 백그라운드 위치 추적 활성화
- fetch: 백그라운드 fetch 작업 지원

### 파일 변경사항
**ios/RnGeolocation4CCApp/Info.plist**:
- 기존: NSLocationWhenInUseUsageDescription 빈 문자열
- 변경 후: 3개 권한 설명 추가 + UIBackgroundModes 배열 추가

### 체크박스 완료
- [x] Info.plist 권한 설명 추가
- [x] Background modes 활성화

## 기술적 세부사항

### iOS 권한 시스템
iOS는 사용자에게 권한을 요청할 때 반드시 사용 목적 설명이 필요합니다:

1. **NSLocationWhenInUseUsageDescription**:
   - 앱 사용 중 위치 접근 권한
   - 사용자가 앱을 실행 중일 때만 위치 정보 수집

2. **NSLocationAlwaysAndWhenInUseUsageDescription**:
   - 백그라운드 위치 접근 권한
   - 앱이 백그라운드에 있을 때도 위치 정보 수집
   - iOS 11+부터 필수

3. **NSMotionUsageDescription**:
   - 모션 및 피트니스 데이터 접근
   - 걷기/뛰기 활동 분류에 필요
   - iOS 10+부터 필수

### Background Modes
UIBackgroundModes는 앱이 백그라운드에서 실행될 수 있는 작업 유형을 정의:

1. **location**:
   - 백그라운드 위치 업데이트 수신
   - react-native-background-geolocation의 핵심 기능

2. **fetch**:
   - 백그라운드 fetch 작업 실행
   - 주기적인 데이터 동기화 지원

### react-native-background-geolocation 통합
위 설정들은 react-native-background-geolocation 라이브러리가:
- 백그라운드에서 위치 추적 지속
- Core Motion API를 통한 활동 분류 (걷기/뛰기)
- iOS의 백그라운드 실행 제약 조건 준수

위 기능들을 수행하기 위해 필요합니다.

### App Store 심사 고려사항
- 백그라운드 위치 사용 시 App Store 심사에서 정당한 사용 이유 요구
- 권한 설명이 실제 기능과 일치해야 함
- 사용자 프라이버시 정책 준수 필수

## Android와의 차이점
- **Android**: 매니페스트에 권한 선언 (AndroidManifest.xml)
- **iOS**: Info.plist에 사용 목적 설명 필수

## 다음 단계
Phase 3.5: 로그 기능 구현
- 활동 감지 시 로그 생성
- AppContext에 로그 추가 메서드 구현
