## Index

### Classes

* [BackgroundGeolocation]

### Interfaces

* [Authorization]
* [AuthorizationEvent]
* [Battery]
* [Config]
* [ConnectivityChangeEvent]
* [Coords]
* [CurrentPositionRequest]
* [DeviceInfo]
* [DeviceSettings]
* [DeviceSettingsRequest]
* [Geofence]
* [GeofenceEvent]
* [GeofencesChangeEvent]
* [HeadlessEvent]
* [HeartbeatEvent]
* [HttpEvent]
* [Location]
* [LocationAuthorizationAlert]
* [Logger]
* [MotionActivity]
* [MotionActivityEvent]
* [MotionChangeEvent]
* [Notification]
* [PermissionRationale]
* [ProviderChangeEvent]
* [SQLQuery]
* [Sensors]
* [State]
* [Subscription]
* [TransistorAuthorizationToken]
* [WatchPositionRequest]

### Type aliases

* [AccuracyAuthorization]
* [ActivityType]
* [AuthorizationStatus]
* [Event]
* [Extras]
* [HttpMethod]
* [LocationAccuracy]
* [LocationAuthorizationRequest]
* [LocationError]
* [LogLevel]
* [Map]
* [MotionActivityType]
* [NotificationPriority]
* [PersistMode]
* [SQLQueryOrder]
* [TrackingMode]
* [Vertices]

## Type aliases

### AccuracyAuthorization

AccuracyAuthorization: 0 | 1



| Name | Value |
| --- | --- |
| [ACCURACY\_AUTHORIZATION\_FULL] | 0 |
| [ACCURACY\_AUTHORIZATION\_REDUCED] | 1 |

### ActivityType

ActivityType: 1 | 2 | 3 | 4



Used for [Config.activityType].

| Name |
| --- |
| [ACTIVITY\_TYPE\_OTHER] |
| [ACTIVITY\_TYPE\_AUTOMOTIVE\_NAVIGATION] |
| [ACTIVITY\_TYPE\_FITNESS] |
| [ACTIVITY\_TYPE\_OTHER\_NAVIGATION] |
| [ACTIVITY\_TYPE\_AIRBORNE] |

ℹ️ For more information, see [Apple docs].

### AuthorizationStatus

AuthorizationStatus: 0 | 1 | 2 | 3 | 4



| Name | Platform |
| --- | --- |
| [AUTHORIZATION\_STATUS\_NOT\_DETERMINED] | iOS only |
| [AUTHORIZATION\_STATUS\_RESTRICTED] | iOS only |
| [AUTHORIZATION\_STATUS\_DENIED] | iOS & Android |
| [AUTHORIZATION\_STATUS\_ALWAYS] | iOS & Android |
| [AUTHORIZATION\_STATUS\_WHEN\_IN\_USE] | iOS & Android 10+ |

### Event

Event: "boot" | "terminate" | "location" | "motionchange" | "http" | "heartbeat" | "providerchange" | "activitychange" | "geofence" | "geofenceschange" | "enabledchange" | "connectvitychange" | "schedule" | "powersavechange" | "notificationaction" | "authorization"



Recognized event names available as constants upon the [BackgroundGeolocation] class.

```typescript
// eg
BackgroundGeolocation.EVENT_LOCATION)
> "location"

BackgoundGeolocation.EVENT_MOTIONCHANGE;
> "motionchange"
```

| Name | Value |
| --- | --- |
| [EVENT\_BOOT] | `boot` |
| [EVENT\_TERMINATE] | `terminate` |
| [EVENT\_LOCATION] | `location` |
| [EVENT\_MOTIONCHANGE] | `motionchange` |
| [EVENT\_HTTP] | `http` |
| [EVENT\_HEARTBEAT] | `heartbeat` |
| [EVENT\_PROVIDERCHANGE] | `providerchange` |
| [EVENT\_ACTIVITYCHANGE] | `activitychange` |
| [EVENT\_GEOFENCE] | `geofence` |
| [EVENT\_GEOFENCESCHANGE] | `geofenceschange` |
| [EVENT\_ENABLEDCHANGE] | `enabledchange` |
| [EVENT\_CONNECTIVITYCHANGE] | `connectivitychange` |
| [EVENT\_SCHEDULE] | `schedule` |
| [EVENT\_POWERSAVECHANGE] | `powersavechange` |
| [EVENT\_NOTIFICATIONACTION] | `notificationaction` |
| [EVENT\_AUTHORIZATION] | `authorization` |

### Extras

Extras: {}



#### Type declaration

* ##### [key: string]: string | null | number | boolean | [Extras] | string[] | number[] | number[][] | boolean[] | [Extras][]

### HttpMethod

HttpMethod: "POST" | "PUT" | "OPTIONS"



Desired HTTP method to use when uploading data to your configured [Config.url].

### LocationAccuracy

LocationAccuracy: -2 | -1 | 0 | 10 | 100 | 1000 | 3000



Used for [Config.desiredAccuracy].

| Name | Location Providers | Description |
| --- | --- | --- |
| [DESIRED\_ACCURACY\_NAVIGATION] | (**iOS only**) GPS + Wifi + Cellular | Highest power; highest accuracy. |
| [DESIRED\_ACCURACY\_HIGH] | GPS + Wifi + Cellular | Highest power; highest accuracy. |
| [DESIRED\_ACCURACY\_MEDIUM] | Wifi + Cellular | Medium power; Medium accuracy; |
| [DESIRED\_ACCURACY\_LOW] | Wifi (low power) + Cellular | Lower power; No GPS. |
| [DESIRED\_ACCURACY\_VERY\_LOW] | Cellular only | Lowest power; lowest accuracy. |
| [DESIRED\_ACCURACY\_LOWEST] | (**iOS only**) | Lowest power; lowest accuracy. |

### LocationAuthorizationRequest

LocationAuthorizationRequest: "Always" | "WhenInUse" | "Any"



iOS Location authorization request.
This is used to express the location authorization you *expect* the user have enabled.

### LocationError

LocationError: 0 | 1 | 2 | 3 | 408 | 499



When native location API fails to fetch a location, one of the following error-codes will be returned.

| Code | Error |
| --- | --- |
| 0 | Location unknown |
| 1 | Location permission denied |
| 2 | Network error |
| 3 | Attempt to initiate location-services in background with WhenInUse authorization |
| 408 | Location timeout |
| 499 | Location request cancelled |

### LogLevel

LogLevel: 0 | 1 | 2 | 3 | 4 | 5



Controls the volume of [Config.logLevel] log-entries recorded to database.

| Label |
| --- |
| [LOG\_LEVEL\_OFF] |
| [LOG\_LEVEL\_ERROR] |
| [LOG\_LEVEL\_WARNING] |
| [LOG\_LEVEL\_INFO] |
| [LOG\_LEVEL\_DEBUG] |
| [LOG\_LEVEL\_VERBOSE] |

### Map

Map: {}



#### Type declaration

* ##### [key: string]: string | null | number | boolean | [Map] | string[] | number[] | number[][] | boolean[] | [Map][]

### MotionActivityType

MotionActivityType: "unknown" | "still" | "walking" | "on\_foot" | "running" | "on\_bicycle" | "in\_vehicle"



List of valid Motion-activity types

| Activity Name |
| --- |
| `still` |
| `walking` |
| `on_foot` |
| `running` |
| `on_bicycle` |
| `in_vehicle` |
| `unknown` |

* See [onActivityChange] and [Location.activity].

### NotificationPriority

NotificationPriority: 0 | 1 | -1 | 2 | -2



Used for [Notification.priority].

| Value | Description |
| --- | --- |
| [NOTIFICATION\_PRIORITY\_DEFAULT] | Notification weighted to top of list; notification-bar icon weighted left. |
| [NOTIFICATION\_PRIORITY\_HIGH] | Notification **strongly** weighted to top of list; notification-bar icon **strongly** weighted to left. |
| [NOTIFICATION\_PRIORITY\_LOW] | Notification weighted to bottom of list; notification-bar icon weighted right. |
| [NOTIFICATION\_PRIORITY\_MAX] | Same as `NOTIFICATION_PRIORITY_HIGH`. |
| [NOTIFICATION\_PRIORITY\_MIN] | Notification **strongly** weighted to bottom of list; notification-bar icon **hidden**. |

### PersistMode

PersistMode: -1 | 0 | 1 | 2

### SQLQueryOrder

SQLQueryOrder: -1 | 1



Controls ordering of [SQLQuery.order]

| Name | Value |
| --- | --- |
| [Logger.ORDER\_ASC] | `1` |
| [Logger.ORDER\_DESC] | `-1` |

### TrackingMode

TrackingMode: 0 | 1



| Value | Description |
| --- | --- |
| `0` | Geofences-only monitoring ). |
| `1` | Both location & Geofence monitoring. |

### Vertices

Vertices: number[][]