# Phase 3.3: Android 네이티브 설정 완료

## 완료 일시
2025-10-01

## 구현 내용

### AndroidManifest.xml 권한 추가
✅ 위치 권한 (Location Permissions):
- ACCESS_FINE_LOCATION - 정확한 위치 접근
- ACCESS_COARSE_LOCATION - 대략적인 위치 접근
- ACCESS_BACKGROUND_LOCATION - 백그라운드 위치 접근 (Android 10+)

✅ 활동 인식 권한 (Activity Recognition):
- ACTIVITY_RECOGNITION - 걷기/뛰기 활동 감지 (Android 10+)

✅ 포그라운드 서비스 권한 (Foreground Service):
- FOREGROUND_SERVICE - 기본 포그라운드 서비스
- FOREGROUND_SERVICE_LOCATION - 위치 기반 포그라운드 서비스 (Android 14+)

### 파일 변경사항
**android/app/src/main/AndroidManifest.xml**:
- 기존: INTERNET 권한만 존재
- 변경 후: 총 7개 권한 추가 (위치 3개, 활동 인식 1개, 포그라운드 서비스 2개)

### 체크박스 완료
- [x] AndroidManifest.xml 권한 추가
- [x] Foreground Service 설정

## 기술적 세부사항

### 권한 레벨
1. **정상 권한** (Normal Permissions):
   - INTERNET
   - FOREGROUND_SERVICE

2. **위험 권한** (Dangerous Permissions):
   - ACCESS_FINE_LOCATION
   - ACCESS_COARSE_LOCATION
   - ACCESS_BACKGROUND_LOCATION
   - ACTIVITY_RECOGNITION

### 플랫폼별 요구사항
- **Android 10 (API 29)+**: ACCESS_BACKGROUND_LOCATION 필수
- **Android 10 (API 29)+**: ACTIVITY_RECOGNITION 필수
- **Android 14 (API 34)+**: FOREGROUND_SERVICE_LOCATION 권장

### react-native-background-geolocation 통합
위 권한들은 react-native-background-geolocation 라이브러리가:
- 백그라운드에서 위치 추적
- 활동 분류 (걷기/뛰기)
- 포그라운드 서비스로 지속적 동작

위 기능들을 수행하기 위해 필요합니다.

## 다음 단계
Phase 3.4: iOS 네이티브 설정
- Info.plist 권한 설명 추가
- Background modes 활성화
