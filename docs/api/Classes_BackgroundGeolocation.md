Primary API of the SDK.

break
:   [## 📚 Help](#📚-help)

    * 📘 [Philosophy of Operation]
    * 📘 [HTTP Guide].
    * 📘 [Geofencing Guide].
    * 📘 [Android Headless Mode].
    * 📘 [Debugging Guide].

    [## ⚡️ Events](#⚡️-events)

    [BackgroundGeolocation] is event-based. Interacting with the SDK is largely through implementing listeners on the following events:

    | Method | Description |
    | --- | --- |
    | [onLocation] | Fired with each recorded [Location] |
    | [onMotionChange] | Fired when the plugin changes state between *moving* / *stationary* |
    | [onHttp] | Fired with each HTTP response from your server. ). |
    | [onActivityChange] | Fired with each change in device motion-activity. |
    | [onProviderChange] | Fired after changes to device location-services configuration. |
    | [onHeartbeat] | Periodic timed events. See [heartbeatInterval]. iOS requires [preventSuspend]. |
    | [onGeofence] | Fired with each [Geofence] transition event (`ENTER, EXIT, DWELL`). |
    | [onGeofencesChange] | Fired when the list of actively-monitored geofences changed. See [geofenceProximityRadius]. |
    | [onSchedule] | Fired for [schedule] events. |
    | [onConnectivityChange] | Fired when network-connectivity changes (connected / disconnected). |
    | [onPowerSaveChange] | Fired when state of operating-system's "power-saving" feature is enabled / disabled. |
    | [onEnabledChange] | Fired when the plugin is enabled / disabled via its [start] / [stop] methods. |
    | [onAuthorization] | Fired when a response from [Authorization.refreshUrl] is received. |
    | [onNotificationAction] | **Android only**: Fired when a button is clicked on a custom [Notification.layout] of a foreground-service notification. |

    [## 🔧 [Config] API](#🔧-config-api)

    [BackgroundGeolocation] is highly configurable. See the [Config] API for more information.

    There are three main steps to using `BackgroundGeolocation`

    1. Wire up event-listeners.
    2. [ready] the SDK.
    3. [start] tracking.

example
:   ```typescript
    ////
    // 1.  Wire up event-listeners
    //

    // This handler fires whenever bgGeo receives a location update.
    BackgroundGeolocation.onLocation(location => {
      console.log("[location] ", location);
    }, error => {
      console.log("[location] ERROR: ", error);
    });

    // This handler fires when movement states changes (stationary->moving; moving->stationary)
    BackgroundGeolocation.onMotionChange(location => {
      console.log("[motionchange] ", location);
    });

    // This handler fires on HTTP responses
    BackgroundGeolocation.onHttp(response => {
      console.log("[http] ", response);
    });

    // This event fires when a change in motion activity is detected
    BackgroundGeolocation.onActivityChange(activityEvent => {
      console.log("[activitychange] ", activityEvent);
    });

    // This event fires when the user toggles location-services authorization
    BackgroundGeolocation.onProviderChange(providerEvent => {
      console.log("[providerchange] ", providerEvent);
    });

    ////
    // 2.  Execute #ready method (required)
    //
    BackgroundGeolocation.ready({
      // Geolocation Config
      desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
      distanceFilter: 10,
      // Activity Recognition
      stopTimeout: 1,
      // Application config
      debug: true,              // <-- enable this hear debug sounds.
      logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
      stopOnTerminate: false,   // <-- Allow the background-service to continue tracking when app terminated.
      startOnBoot: true,        // <-- Auto start tracking when device is powered-up.
      // HTTP / SQLite config
      url: "http://yourserver.com/locations",
      batchSync: false,       // <-- Set true to sync locations to server in a single HTTP request.
      autoSync: true,         // <-- Set true to sync each location to server as it arrives.
      headers: {              // <-- Optional HTTP headers
        "X-FOO": "bar"
      },
      params: {               // <-- Optional HTTP params
        "auth_token": "maybe_your_server_authenticates_via_token_YES?"
      }
    }, (state) => {
      console.log("- BackgroundGeolocation is configured and ready: ", state.enabled);

      if (!state.enabled) {
        ////
        // 3. Start tracking!
        //
        BackgroundGeolocation.start(function() {
          console.log("- Start success");
        });
      }
    });
    ```

example
:   ```typescript
    BackgroundGeolocation.ready({
      distanceFilter: 10,
      stopOnTerminate: false,
      logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
      debug: true
    }, (state) => {
      console.log("- BackgroundGeolocation is ready: ", state);
    });
    ```

    [### ⚠️ Warning:](#⚠️-warning)

    Do not execute *any* API method which will require accessing location-services until the callback to [ready] executes , [watchPosition], [start]).

    [### Promise API](#promise-api)

    The `BackgroundGeolocation` Javascript API supports [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) for *nearly* every method  and adding event-listeners via **`#onEventName`** methods.)

example
:   ```typescript
    // Traditional API still works:
    BackgroundGeolocation.ready({desiredAccuracy: 0, distanceFilter: 50}).then(state => {
      console.log("- BackgroundGeolocation is ready: ", state);
    }).catch(error => {
      console.log("- BackgroundGeolocation error: ", error);
    });
    ```

### Hierarchy

* BackgroundGeolocation

## Index

### Constructors

* [constructor]

### Events

* [onActivityChange]
* [onConnectivityChange]
* [onEnabledChange]
* [onGeofence]
* [onGeofencesChange]
* [onHeartbeat]
* [onHttp]
* [onLocation]
* [onMotionChange]
* [onPowerSaveChange]
* [onProviderChange]
* [onSchedule]

### Properties

* [ACCURACY\_AUTHORIZATION\_FULL]
* [ACCURACY\_AUTHORIZATION\_REDUCED]
* [ACTIVITY\_TYPE\_AIRBORNE]
* [ACTIVITY\_TYPE\_AUTOMOTIVE\_NAVIGATION]
* [ACTIVITY\_TYPE\_FITNESS]
* [ACTIVITY\_TYPE\_OTHER]
* [ACTIVITY\_TYPE\_OTHER\_NAVIGATION]
* [AUTHORIZATION\_STATUS\_ALWAYS]
* [AUTHORIZATION\_STATUS\_DENIED]
* [AUTHORIZATION\_STATUS\_NOT\_DETERMINED]
* [AUTHORIZATION\_STATUS\_RESTRICTED]
* [AUTHORIZATION\_STATUS\_WHEN\_IN\_USE]
* [DESIRED\_ACCURACY\_HIGH]
* [DESIRED\_ACCURACY\_LOW]
* [DESIRED\_ACCURACY\_LOWEST]
* [DESIRED\_ACCURACY\_MEDIUM]
* [DESIRED\_ACCURACY\_NAVIGATION]
* [DESIRED\_ACCURACY\_VERY\_LOW]
* [EVENT\_ACTIVITYCHANGE]
* [EVENT\_AUTHORIZATION]
* [EVENT\_BOOT]
* [EVENT\_CONNECTIVITYCHANGE]
* [EVENT\_ENABLEDCHANGE]
* [EVENT\_GEOFENCE]
* [EVENT\_GEOFENCESCHANGE]
* [EVENT\_HEARTBEAT]
* [EVENT\_HTTP]
* [EVENT\_LOCATION]
* [EVENT\_MOTIONCHANGE]
* [EVENT\_NOTIFICATIONACTION]
* [EVENT\_POWERSAVECHANGE]
* [EVENT\_PROVIDERCHANGE]
* [EVENT\_SCHEDULE]
* [EVENT\_TERMINATE]
* [LOG\_LEVEL\_DEBUG]
* [LOG\_LEVEL\_ERROR]
* [LOG\_LEVEL\_INFO]
* [LOG\_LEVEL\_OFF]
* [LOG\_LEVEL\_VERBOSE]
* [LOG\_LEVEL\_WARNING]
* [NOTIFICATION\_PRIORITY\_DEFAULT]
* [NOTIFICATION\_PRIORITY\_HIGH]
* [NOTIFICATION\_PRIORITY\_LOW]
* [NOTIFICATION\_PRIORITY\_MAX]
* [NOTIFICATION\_PRIORITY\_MIN]
* [PERSIST\_MODE\_ALL]
* [PERSIST\_MODE\_GEOFENCE]
* [PERSIST\_MODE\_LOCATION]
* [PERSIST\_MODE\_NONE]
* [deviceSettings]
* [logger]

### Methods

* [addGeofence]
* [addGeofences]
* [changePace]
* [destroyLocation]
* [destroyLocations]
* [destroyLog]
* [destroyTransistorAuthorizationToken]
* [emailLog]
* [findOrCreateTransistorAuthorizationToken]
* [finish]
* [finishHeadlessTask]
* [geofenceExists]
* [getCount]
* [getCurrentPosition]
* [getDeviceInfo]
* [getGeofence]
* [getGeofences]
* [getLocations]
* [getLog]
* [getOdometer]
* [getProviderState]
* [getSensors]
* [getState]
* [insertLocation]
* [isPowerSaveMode]
* [onAuthorization]
* [onNotificationAction]
* [playSound]
* [ready]
* [registerHeadlessTask]
* [removeAllListeners]
* [removeGeofence]
* [removeGeofences]
* [removeListener]
* [removeListeners]
* [requestPermission]
* [requestTemporaryFullAccuracy]
* [reset]
* [resetOdometer]
* [setConfig]
* [setLogLevel]
* [setOdometer]
* [start]
* [startBackgroundTask]
* [startGeofences]
* [startSchedule]
* [stop]
* [stopBackgroundTask]
* [stopSchedule]
* [stopWatchPosition]
* [sync]
* [transistorTrackerParams]
* [watchPosition]

## Constructors

### constructor

* new BackgroundGeolocation(): [BackgroundGeolocation]

* #### Returns [BackgroundGeolocation]

## Events

### Static onActivityChange

* onActivityChange) => void): [Subscription]

* Subscribe to changes in motion activity.

  Your `callback` will be executed each time the activity-recognition system receives an event (`still, on_foot, in_vehicle, on_bicycle, running`).

  [### Android](#android)

  Android [MotionActivityEvent.confidence] always reports `100`%.

  example
  :   ```typescript
      const subscription = BackgroundGeolocation.onActivityChange((event) => {
        console.log("[onActivityChange] ", event);
      });
      ```

  #### Parameters

  + ##### callback: ) => void

    - * ): void
      * #### Parameters

        + ##### event: [MotionActivityEvent]

        #### Returns void

  #### Returns [Subscription]

### Static onConnectivityChange

* onConnectivityChange) => void): [Subscription]

* Subscribe to changes in network connectivity.

  Fired when the state of the device's network-connectivity changes (enabled -> disabled and vice-versa). By default, the plugin will automatically fire
  a `connectivitychange` event with the current state network-connectivity whenever the [start] method is executed.

  ℹ️ The SDK subscribes internally to `connectivitychange` events — if you've configured the SDK's HTTP Service ) and your app has queued locations,
  the SDK will automatically initiate uploading to your configured [Config.url] when network connectivity is detected.

  example
  :   ```typescript
      const subscription = BackgroundGeolocation.onConnectivityChange((event) => {
        console.log("[onConnectivityChange] ", event);
      });
      ```

  #### Parameters

  + ##### callback: ) => void

    - * ): void
      * #### Parameters

        + ##### event: [ConnectivityChangeEvent]

        #### Returns void

  #### Returns [Subscription]

### Static onEnabledChange

* onEnabledChange(callback: (enabled: boolean) => void): [Subscription]

* Subscribe to changes in plugin [State.enabled].

  Fired when the SDK's [State.enabled] changes. For example, executing [start] and [stop] will cause the `onEnabledChnage` event to fire.
  This event is primarily designed for use with the configuration option [stopAfterElapsedMinutes], which automatically executes the SDK's
  [stop] method.

  example
  :   ```typescript
      const subscription = BackgroundGeolocation.onEnabledChange(isEnabled => {
        console.log("[onEnabledChanged] isEnabled? ", isEnabled);
      });
      ```

  #### Parameters

  + ##### callback: (enabled: boolean) => void

    - * (enabled: boolean): void
      * #### Parameters

        + ##### enabled: boolean

        #### Returns void

  #### Returns [Subscription]

### Static onGeofence

* onGeofence) => void): [Subscription]

* Subscribe to Geofence transition events.

  Your supplied `callback` will be called when any monitored geofence crossing occurs.

  example
  :   ```typescript
      const subscription = BackgroundGeolocation.onGeofence((event) => {
        console.log("[onGeofence] ", event);
      });
      ```

      [### ℹ️ See also:](#ℹ️-see-also)
      + 📘 [Geofencing Guide]

  #### Parameters

  + ##### callback: ) => void

    - * ): void
      * #### Parameters

        + ##### event: [GeofenceEvent]

        #### Returns void

  #### Returns [Subscription]

### Static onGeofencesChange

* onGeofencesChange) => void): [Subscription]

* Subscribe to changes in actively monitored geofences.

  Fired when the list of monitored-geofences changed. The BackgroundGeolocation SDK contains powerful geofencing features that allow you to monitor
  any number of circular geofences you wish (thousands even), in spite of limits imposed by the native platform APIs (**20 for iOS; 100 for Android**).

  The plugin achieves this by storing your geofences in its database, using a [geospatial query](https://en.wikipedia.org/wiki/Spatial_query) to determine
  those geofences in proximity ), activating only those geofences closest to the device's current location
  (according to limit imposed by the corresponding platform).

  When the device is determined to be moving, the plugin periodically queries for geofences in proximity (eg. every minute) using the latest recorded
  location. This geospatial query is **very fast**, even with tens-of-thousands geofences in the database.

  It's when this list of monitored geofences *changes*, that the plugin will fire the `onGeofencesChange` event.

  example
  :   ```typescript
      const subscription = BackgroundGeolocation.onGeofencesChange((event) => {
        let on = event.on;     //<-- new geofences activated.
        let off = event.off; //<-- geofences that were just de-activated.

        // Create map circles
        on.forEach((geofence) => {
          createGeofenceMarker(geofence)
        });

        // Remove map circles
        off.forEach((identifier) => {
          removeGeofenceMarker(identifier);
        }
      });
      ```

      [### ℹ️ See also:](#ℹ️-see-also)
      + 📘 [Geofencing Guide]

  #### Parameters

  + ##### callback: ) => void

    - * ): void
      * #### Parameters

        + ##### event: [GeofencesChangeEvent]

        #### Returns void

  #### Returns [Subscription]

### Static onHeartbeat

* onHeartbeat) => void): [Subscription]

* Subscribe to periodic heartbeat events.

  Your `callback` will be executed for each [heartbeatInterval] while the device is in **stationary** state : true as well).

  example
  :   ```typescript
      BackgroundGeolocation.ready({
        heartbeatInterval: 60,
        preventSuspend: true // <-- Required for iOS
      });

      const subscription = BackgroundGeolocation.onHeartbeat((event) => {
        console.log("[onHeartbeat] ", event);

        // You could request a new location if you wish.
        BackgroundGeolocation.getCurrentPosition({
          samples: 1,
          persist: true
        }).then((location) => {
          console.log("[getCurrentPosition] ", location);
        });
      })
      ```

      [### ⚠️ Note:](#⚠️-note)
      + The [Location] provided by the [HeartbeatEvent] is only the last-known location. The *heartbeat* event does not actively engage location-services. If you wish to get the current location in your `callback`, use [getCurrentPosition].

  #### Parameters

  + ##### callback: ) => void

    - * ): void
      * #### Parameters

        + ##### event: [HeartbeatEvent]

        #### Returns void

  #### Returns [Subscription]

### Static onHttp

* onHttp) => void): [Subscription]

* Subscribe to HTTP responses from your server [Config.url].

  example
  :   ```typescript
      const subscription = BackgroundGeolocation.onHttp((response) => {
        let status = response.status;
        let success = response.success;
        let responseText = response.responseText;
        console.log("[onHttp] ", response);
      });
      ```

      [### ℹ️ See also:](#ℹ️-see-also)
      + [HTTP Guide]

  #### Parameters

  + ##### callback: ) => void

    - * ): void
      * #### Parameters

        + ##### response: [HttpEvent]

        #### Returns void

  #### Returns [Subscription]

### Static onLocation

* onLocation) => void, failure?: ) => void): [Subscription]

* Subscribe to location events.

  Every location recorded by the SDK is provided to your `callback`, including those from [onMotionChange], [getCurrentPosition] and [watchPosition].

  example
  :   ```typescript
      const subscription = BackgroundGeolocation.onLocation((location) => {
        console.log("[onLocation] success: ", location);
      }, (error) => {
        console.log("[onLocation] ERROR: ", error);
      });
      ```

      [### Error Codes](#error-codes)

      If the native location API fails to return a location, the `failure` callback will be provided a [LocationError].

      [### ⚠️ Note [Location.sample]:](#⚠️-note-locationsample)

      When performing a [onMotionChange] or [getCurrentPosition], the plugin requests **multiple** location *samples* in order to record the most accurate location possible. These *samples* are **not** persisted to the database but they will be provided to your `callback`, for your convenience, since it can take some seconds for the best possible location to arrive.

      For example, you might use these samples to progressively update the user's position on a map. You can detect these *samples* in your `callback` via `location.sample == true`. If you're manually `POST`ing location to your server, you should ignore these locations.

  #### Parameters

  + ##### success: ) => void

    - * ): void
      * #### Parameters

        + ##### location: [Location]

        #### Returns void
  + ##### Optional failure: ) => void

    - * ): void
      * #### Parameters

        + ##### errorCode: [LocationError]

        #### Returns void

  #### Returns [Subscription]

### Static onMotionChange

* onMotionChange) => void): [Subscription]

* Subscribe to **`motionchange`** events.

  Your `callback` will be executed each time the device has changed-state between **MOVING** or **STATIONARY**.

  example
  :   ```typescript
      const subscription = BackgroundGeolocation.onMotionChange((event) => {
        if (event.isMoving) {
           console.log("[onMotionChange] Device has just started MOVING ", event.location);
        } else {
           console.log("[onMotionChange] Device has just STOPPED:  ", event.location);
        }
      });
      ```

      ---

      [### ⚠️ Warning: `autoSyncThreshold`](#⚠️-warning--autosyncthreshold)

      If you've configured [Config.autoSyncThreshold], it **will be ignored** during a `onMotionChange` event — all queued locations will be uploaded, since:

      + If an `onMotionChange` event fires **into the *moving* state**, the device may have been sitting dormant for a long period of time. The plugin is *eager* to upload this state-change to the server as soon as possible.
      + If an `onMotionChange` event fires **into the *stationary* state**, the device may be about to lie dormant for a long period of time. The plugin is *eager* to upload all queued locations to the server before going dormant.

      ---

      [### ℹ️ See also:](#ℹ️-see-also)
      + [stopTimeout]
      + 📘 [Philosophy of Operation]

  #### Parameters

  + ##### callback: ) => void

    - * ): void
      * #### Parameters

        + ##### event: [MotionChangeEvent]

        #### Returns void

  #### Returns [Subscription]

### Static onPowerSaveChange

* onPowerSaveChange(callback: (enabled: boolean) => void): [Subscription]

* Subscribe to state changes in OS power-saving system.

  Fired when the state of the operating-system's "Power Saving" mode changes. Your `callback` will be provided with a `bool` showing whether
  "Power Saving" is **enabled** or **disabled**. Power Saving mode can throttle certain services in the background, such as HTTP requests or GPS.

  break
  :   ℹ️ You can manually request the current-state of "Power Saving" mode with the method [isPowerSaveMode].

      [### iOS](#ios)

      iOS Power Saving mode can be engaged manually by the user in **Settings -> Battery** or from an automatic OS dialog.

      ![]

      [### Android](#android)

      Android Power Saving mode can be engaged manually by the user in **Settings -> Battery -> Battery Saver** or automatically with a user-specified "threshold" (eg: 15%).

      ![]

  example
  :   ```typescript
      const subscription = BackgroundGeolocation.onPowerSaveChange((isPowerSaveMode) => {
        console.log("[onPowerSaveChange: ", isPowerSaveMode);
      });
      ```

  #### Parameters

  + ##### callback: (enabled: boolean) => void

    - * (enabled: boolean): void
      * #### Parameters

        + ##### enabled: boolean

        #### Returns void

  #### Returns [Subscription]

### Static onProviderChange

* onProviderChange) => void): [Subscription]

* Subscribe to changes in device's location-services configuration / authorization.

  Your `callback` fill be executed whenever a change in the state of the device's **Location Services** has been detected. eg: "GPS ON", "WiFi only".

  example
  :   ```typescript
      const subscription = BackgroundGeolocation.onProviderChange((event) => {
        console.log("[onProviderChange: ", event);

        switch(event.status) {
          case BackgroundGeolocation.AUTHORIZATION_STATUS_DENIED:
            // Android & iOS
            console.log("- Location authorization denied");
            break;
          case BackgroundGeolocation.AUTHORIZATION_STATUS_ALWAYS:
            // Android & iOS
            console.log("- Location always granted");
            break;
          case BackgroundGeolocation.AUTHORIZATION_STATUS_WHEN_IN_USE:
            // iOS only
            console.log("- Location WhenInUse granted");
            break;
        }
      });
      ```

      [### ℹ️ See also:](#ℹ️-see-also)
      + You can explicitly request the current state of location-services using [getProviderState].[### ⚠️ Note:](#⚠️-note)
      + The plugin always force-fires an [onProviderChange] event whenever the app is launched  method is executed), regardless of current state, so you can learn the the current state of location-services with each boot of your application.

  #### Parameters

  + ##### callback: ) => void

    - * ): void
      * #### Parameters

        + ##### event: [ProviderChangeEvent]

        #### Returns void

  #### Returns [Subscription]

### Static onSchedule

* onSchedule) => void): [Subscription]

* Subscribe to [schedule] events.

  Your `callback` will be executed each time a [schedule] event fires. Your `callback` will be provided with the current [State]: **`state.enabled`**
  will reflect the state according to your [schedule].

  example
  :   ```typescript
      const subscription = BackgroundGeolocation.onSchedule((state) => {
        if (state.enabled) {
          console.log("[onSchedule] scheduled start tracking");
        } else {
          console.log("[onSchedule] scheduled stop tracking");
        }
      });
      ```

  #### Parameters

  + ##### callback: ) => void

    - * ): void
      * #### Parameters

        + ##### state: [State]

        #### Returns void

  #### Returns [Subscription]

## Properties

### Static ACCURACY\_AUTHORIZATION\_FULL

ACCURACY\_AUTHORIZATION\_FULL: [AccuracyAuthorization]

### Static ACCURACY\_AUTHORIZATION\_REDUCED

ACCURACY\_AUTHORIZATION\_REDUCED: [AccuracyAuthorization]

### Static ACTIVITY\_TYPE\_AIRBORNE

ACTIVITY\_TYPE\_AIRBORNE: [ActivityType]

### Static ACTIVITY\_TYPE\_AUTOMOTIVE\_NAVIGATION

ACTIVITY\_TYPE\_AUTOMOTIVE\_NAVIGATION: [ActivityType]

### Static ACTIVITY\_TYPE\_FITNESS

ACTIVITY\_TYPE\_FITNESS: [ActivityType]

### Static ACTIVITY\_TYPE\_OTHER

ACTIVITY\_TYPE\_OTHER: [ActivityType]

### Static ACTIVITY\_TYPE\_OTHER\_NAVIGATION

ACTIVITY\_TYPE\_OTHER\_NAVIGATION: [ActivityType]

### Static AUTHORIZATION\_STATUS\_ALWAYS

AUTHORIZATION\_STATUS\_ALWAYS: [AuthorizationStatus]

### Static AUTHORIZATION\_STATUS\_DENIED

AUTHORIZATION\_STATUS\_DENIED: [AuthorizationStatus]

### Static AUTHORIZATION\_STATUS\_NOT\_DETERMINED

AUTHORIZATION\_STATUS\_NOT\_DETERMINED: [AuthorizationStatus]

### Static AUTHORIZATION\_STATUS\_RESTRICTED

AUTHORIZATION\_STATUS\_RESTRICTED: [AuthorizationStatus]

### Static AUTHORIZATION\_STATUS\_WHEN\_IN\_USE

AUTHORIZATION\_STATUS\_WHEN\_IN\_USE: [AuthorizationStatus]

### Static DESIRED\_ACCURACY\_HIGH

DESIRED\_ACCURACY\_HIGH: [LocationAccuracy]

### Static DESIRED\_ACCURACY\_LOW

DESIRED\_ACCURACY\_LOW: [LocationAccuracy]

### Static DESIRED\_ACCURACY\_LOWEST

DESIRED\_ACCURACY\_LOWEST: [LocationAccuracy]

### Static DESIRED\_ACCURACY\_MEDIUM

DESIRED\_ACCURACY\_MEDIUM: [LocationAccuracy]

### Static DESIRED\_ACCURACY\_NAVIGATION

DESIRED\_ACCURACY\_NAVIGATION: [LocationAccuracy]

### Static DESIRED\_ACCURACY\_VERY\_LOW

DESIRED\_ACCURACY\_VERY\_LOW: [LocationAccuracy]

### Static EVENT\_ACTIVITYCHANGE

EVENT\_ACTIVITYCHANGE: [Event]

### Static EVENT\_AUTHORIZATION

EVENT\_AUTHORIZATION: [Event]

### Static EVENT\_BOOT

EVENT\_BOOT: [Event]

### Static EVENT\_CONNECTIVITYCHANGE

EVENT\_CONNECTIVITYCHANGE: [Event]

### Static EVENT\_ENABLEDCHANGE

EVENT\_ENABLEDCHANGE: [Event]

### Static EVENT\_GEOFENCE

EVENT\_GEOFENCE: [Event]

### Static EVENT\_GEOFENCESCHANGE

EVENT\_GEOFENCESCHANGE: [Event]

### Static EVENT\_HEARTBEAT

EVENT\_HEARTBEAT: [Event]

### Static EVENT\_HTTP

EVENT\_HTTP: [Event]

### Static EVENT\_LOCATION

EVENT\_LOCATION: [Event]

### Static EVENT\_MOTIONCHANGE

EVENT\_MOTIONCHANGE: [Event]

### Static EVENT\_NOTIFICATIONACTION

EVENT\_NOTIFICATIONACTION: [Event]

### Static EVENT\_POWERSAVECHANGE

EVENT\_POWERSAVECHANGE: [Event]

### Static EVENT\_PROVIDERCHANGE

EVENT\_PROVIDERCHANGE: [Event]

### Static EVENT\_SCHEDULE

EVENT\_SCHEDULE: [Event]

### Static EVENT\_TERMINATE

EVENT\_TERMINATE: [Event]

### Static LOG\_LEVEL\_DEBUG

LOG\_LEVEL\_DEBUG: [LogLevel]

### Static LOG\_LEVEL\_ERROR

LOG\_LEVEL\_ERROR: [LogLevel]

### Static LOG\_LEVEL\_INFO

LOG\_LEVEL\_INFO: [LogLevel]

### Static LOG\_LEVEL\_OFF

LOG\_LEVEL\_OFF: [LogLevel]

### Static LOG\_LEVEL\_VERBOSE

LOG\_LEVEL\_VERBOSE: [LogLevel]

### Static LOG\_LEVEL\_WARNING

LOG\_LEVEL\_WARNING: [LogLevel]

### Static NOTIFICATION\_PRIORITY\_DEFAULT

NOTIFICATION\_PRIORITY\_DEFAULT: [NotificationPriority]

### Static NOTIFICATION\_PRIORITY\_HIGH

NOTIFICATION\_PRIORITY\_HIGH: [NotificationPriority]

### Static NOTIFICATION\_PRIORITY\_LOW

NOTIFICATION\_PRIORITY\_LOW: [NotificationPriority]

### Static NOTIFICATION\_PRIORITY\_MAX

NOTIFICATION\_PRIORITY\_MAX: [NotificationPriority]

### Static NOTIFICATION\_PRIORITY\_MIN

NOTIFICATION\_PRIORITY\_MIN: [NotificationPriority]

### Static PERSIST\_MODE\_ALL

PERSIST\_MODE\_ALL: [PersistMode]

### Static PERSIST\_MODE\_GEOFENCE

PERSIST\_MODE\_GEOFENCE: [PersistMode]

### Static PERSIST\_MODE\_LOCATION

PERSIST\_MODE\_LOCATION: [PersistMode]

### Static PERSIST\_MODE\_NONE

PERSIST\_MODE\_NONE: [PersistMode]

### Static deviceSettings

deviceSettings: [DeviceSettings]



[DeviceSettings] API

Provides an API to show Android & vendor-specific Battery / Power Management settings screens that can affect performance of the Background Geolocation SDK on various devices.

The site [Don't Kill My App] provides a comprehensive list of poor Android vendors which throttle background-services that this plugin relies upon.

This [DeviceSettings] API is an attempt to provide resources to direct the user to the appropriate vendor-specific settings screen to resolve issues with background operation.

![]
![]

### Static logger

logger: [Logger]



[Logger] API

## Methods

### Static addGeofence

* addGeofence, success?: Function, failure?: (error: string) => void): Promise<void>

* Adds a [Geofence] to be monitored by the native Geofencing API.

  example
  :   ```typescript
      BackgroundGeolocation.addGeofence({
        identifier: "Home",
        radius: 150,
        latitude: 45.51921926,
        longitude: -73.61678581,
        notifyOnEntry: true,
        notifyOnExit: false,
        notifyOnDwell: true,
        loiteringDelay: 30000,  // 30 seconds
        extras: {               // Optional arbitrary meta-data
          zone_id: 1234
        }
      }).then((success) => {
        console.log("[addGeofence] success");
      }).catch((error) => {
        console.log("[addGeofence] FAILURE: ", error);
      });
      ```

      [### ℹ️ Note:](#ℹ️-note)
      + If a geofence(s) *already* exists with the configured [Geofence.identifier], the previous one(s) will be **deleted** before the new one is inserted.
      + When adding *multiple*, it's about **10 times faster** to use [addGeofences] instead.
      + 📘 [Geofencing Guide]

  #### Parameters

  + ##### config: [Geofence]
  + ##### Optional success: Function
  + ##### Optional failure: (error: string) => void

    - * (error: string): void
      * #### Parameters

        + ##### error: string

        #### Returns void

  #### Returns Promise<void>

### Static addGeofences

* addGeofences[], success?: Function, failure?: Function): Promise<void>

* Adds a list of [Geofence] to be monitored by the native Geofencing API.

  example
  :   ```typescript
      let geofences = [{
        identifier: "foo",
        radius: 200,
        latitude: 45.51921926,
        longitude: -73.61678581,
        notifyOnEntry: true
      },
        identifier: "bar",
        radius: 200,
        latitude: 45.51921926,
        longitude: -73.61678581,
        notifyOnEntry: true
      }];

      BackgroundGeolocation.addGeofences(geofences);
      ```

      [### ℹ️ Note:](#ℹ️-note)
      + If a geofence(s) *already* exists with the configured [Geofence.identifier], the previous one(s) will be **deleted** before the new one is inserted.
      + 📘 [Geofencing Guide]
      + [addGeofence]

  #### Parameters

  + ##### geofences: [Geofence][]
  + ##### Optional success: Function
  + ##### Optional failure: Function

  #### Returns Promise<void>

### Static changePace

* changePace(isMoving: boolean, success?: Function, failure?: (error: string) => void): Promise<void>

* Manually toggles the SDK's **motion state** between **stationary** and **moving**.

  When provided a value of **`true`**, the plugin will engage location-services and begin aggressively tracking the device's location *immediately*,
  bypassing stationary monitoring.

  If you were making a "Jogging" application, this would be your **`[Start Workout]`** button to immediately begin location-tracking. Send **`false`**
  to turn **off** location-services and return the plugin to the **stationary** state.

  example
  :   ```typescript
      BackgroundGeolocation.changePace(true);  // <-- Location-services ON ("moving" state)
      BackgroundGeolocation.changePace(false); // <-- Location-services OFF ("stationary" state)
      ```

  #### Parameters

  + ##### isMoving: boolean
  + ##### Optional success: Function
  + ##### Optional failure: (error: string) => void

    - * (error: string): void
      * #### Parameters

        + ##### error: string

        #### Returns void

  #### Returns Promise<void>

### Static destroyLocation

* destroyLocation(uuid: String): Promise<void>

* Destroy a single location by [Location.uuid]

  example
  :   ```typescript
      await BackgroundGeolocation.destroyLocation(location.uuid);
      ```

  #### Parameters

  + ##### uuid: String

  #### Returns Promise<void>

### Static destroyLocations

* destroyLocations(success?: Function, failure?: Function): Promise<void>

* Remove all records in SDK's SQLite database.

  example
  :   ```typescript
      let success = await BackgroundGeolocation.destroyLocations();
      ```

  #### Parameters

  + ##### Optional success: Function
  + ##### Optional failure: Function

  #### Returns Promise<void>

### Static destroyLog

* destroyLog(success?: Function, failure?: Function): Promise<void>

* deprecated
  :   Use [Logger.destroyLog].

  #### Parameters

  + ##### Optional success: Function
  + ##### Optional failure: Function

  #### Returns Promise<void>

### Static destroyTransistorAuthorizationToken

* destroyTransistorAuthorizationToken(url?: string): Promise<boolean>

* Destroys the cached Transistor JSON Web Token used to authorize with the Demo Server at <http://tracker.transistorsoft.com> or your local instance of [background-geolocation-console]

  example
  :   ```typescript
      await BackgroundGeolocation.destroyTransistorAuthorizationToken();
      ```

      [### ℹ️ See also:](#ℹ️-see-also)
      + [findOrCreateTransistorAuthorizationToken]

  #### Parameters

  + ##### Optional url: string

  #### Returns Promise<boolean>

### Static emailLog

* emailLog(email: string, success?: Function, failure?: (error: string) => void): Promise<void>

* deprecated
  :   Use [Logger.emailLog].

  #### Parameters

  + ##### email: string
  + ##### Optional success: Function
  + ##### Optional failure: (error: string) => void

    - * (error: string): void
      * #### Parameters

        + ##### error: string

        #### Returns void

  #### Returns Promise<void>

### Static findOrCreateTransistorAuthorizationToken

* findOrCreateTransistorAuthorizationToken(orgname: string, username: string, url?: string): Promise<[TransistorAuthorizationToken]>

* Returns a *JSON Web Token* ) suitable for [Authorization] with the Transistor Software demo server at <http://tracker.transistorsoft.com>.

  To learn how to upload locations to the *Transistor Demo Server*, see [TransistorAuthorizationToken].
  ![]

  This token is typically provided to [Config.transistorAuthorizationToken] when first configuring the SDK with [ready].

  [### Params](#params)
  [#### `@param {String} orgname`](#param-string-orgname)

  Represents a "company" or "organization"; a container for posting locations from multiple devices to the same account. `orgname` is used for accessing your device results in web app, eg: <http://tracker.transistorsoft.com/my-organization-name>.

  [#### `@param {String} username`](#param-string-username)

  Appended to the [DeviceInfo.model] as a means of creating a consistent and unique device identifier. For example:

  + `Pixel 3a-my-username`
  + `A310-my-username`
  + `iPhone 11,3-my-username`[#### `@param {String} url [http://tracker.transistorsoft.com]`](#param-string-url-httptrackertransistorsoftcom)

  The server to register with and receive authentication tokens from. Defaults to `http://tracker.transistorsoft.com`. If you have a local instance of [background-geolocation-console] running
  on your localhost, you would provide the **ip address** of your server, eg: `http://192.168.0.100:9000`.

  ---

  When the SDK receives the [TransistorAuthorizationToken] from `url`, it will be cached in persistant-storage within the native code. If the SDK doesn"t find a cached token on the client, it will automatically register for one from `url`, using the provided `orgname` and `username`. Otherwise, the cached token will be immediately returned.

  example
  :   ```typescript
      let orgname      = "my-company-name";
      let username     = "my-username";

      let token = await BackgroundGeolocation.findOrCreateTransistorAuthorizationToken(orgname, username);

      BackgroundGeolocation.ready({
        transistorAuthorizationToken: token
      });
      ```

      [### ℹ️ See also:](#ℹ️-see-also)
      + [destroyTransistorAuthorizationToken]
      + [Config.transistorAuthorizationToken]

  #### Parameters

  + ##### orgname: string
  + ##### username: string
  + ##### Optional url: string

  #### Returns Promise<[TransistorAuthorizationToken]>

### Static finish

* finish(taskId: number, success?: Function, failure?: Function): Promise<number>

* alias
  :   [stopBackgroundTask]

  deprecated

  #### Parameters

  + ##### taskId: number
  + ##### Optional success: Function
  + ##### Optional failure: Function

  #### Returns Promise<number>

### Static Private finishHeadlessTask

* finishHeadlessTask(taskId: number, success?: Function, failure?: Function): Promise<number>

* #### Parameters

  + ##### taskId: number
  + ##### Optional success: Function
  + ##### Optional failure: Function

  #### Returns Promise<number>

### Static geofenceExists

* geofenceExists(identifier: string, callback?: (exists: boolean) => void): Promise<boolean>

* Determine if a particular geofence exists in the SDK's database.

  example
  :   ```typescript
      let exists = await BackgroundGeolocation.geofenceExists("HOME");
      console.log("[geofenceExists] ", exists);
      ```

      [### ℹ️ See also:](#ℹ️-see-also)
      + 📘 [Geofencing Guide]

  #### Parameters

  + ##### identifier: string
  + ##### Optional callback: (exists: boolean) => void

    - * (exists: boolean): void
      * #### Parameters

        + ##### exists: boolean

        #### Returns void

  #### Returns Promise<boolean>

### Static getCount

* getCount(success?: (count: number) => void, failure?: Function): Promise<number>

* Retrieve the count of all locations current stored in the SDK's SQLite database.

  example
  :   ```typescript
      let count = await BackgroundGeolocation.getCount();
      ```

  #### Parameters

  + ##### Optional success: (count: number) => void

    - * (count: number): void
      * #### Parameters

        + ##### count: number

        #### Returns void
  + ##### Optional failure: Function

  #### Returns Promise<number>

### Static getCurrentPosition

* getCurrentPosition, success?: ) => void, failure?: ) => void): Promise<[Location]>

* Retrieves the current [Location].

  This method instructs the native code to fetch exactly one location using maximum power & accuracy. The native code will persist the fetched location to
  its SQLite database just as any other location in addition to POSTing to your configured [Config.url].
  If an error occurs while fetching the location, `catch` will be provided with an [LocationError].

  break
  :   [### Options](#options)

      See [CurrentPositionRequest].

      [### Error Codes](#error-codes)

      See [LocationError].

  example
  :   ```typescript
      let location = await BackgroundGeolocation.getCurrentPosition({
        timeout: 30,          // 30 second timeout to fetch location
        maximumAge: 5000,     // Accept the last-known-location if not older than 5000 ms.
        desiredAccuracy: 10,  // Try to fetch a location with an accuracy of `10` meters.
        samples: 3,           // How many location samples to attempt.
        extras: {             // Custom meta-data.
          "route_id": 123
        }
      });
      ```

      [### ⚠️ Note:](#⚠️-note)
      + While [getCurrentPosition] will receive only **one** [Location], the plugin *does* request **multiple** location samples which will all be provided
        to the [onLocation] event-listener. You can detect these samples via [Location.sample] `== true`.

  #### Parameters

  + ##### options: [CurrentPositionRequest]
  + ##### Optional success: ) => void

    - * ): void
      * #### Parameters

        + ##### location: [Location]

        #### Returns void
  + ##### Optional failure: ) => void

    - * ): void
      * #### Parameters

        + ##### errorCode: [LocationError]

        #### Returns void

  #### Returns Promise<[Location]>

### Static getDeviceInfo

* getDeviceInfo(): Promise<[DeviceInfo]>

* #### Returns Promise<[DeviceInfo]>

### Static getGeofence

* getGeofence) => void, failure?: (error: string) => void): Promise<[Geofence]>

* Fetch a single [Geofence] by identifier from the SDK's database.

  example
  :   ```typescript
      let geofence = await BackgroundGeolocation.getGeofence("HOME");
      console.log("[getGeofence] ", geofence);
      ```

      [### ℹ️ See also:](#ℹ️-see-also)
      + 📘 [Geofencing Guide]

  #### Parameters

  + ##### identifier: string
  + ##### Optional success: ) => void

    - * ): void
      * #### Parameters

        + ##### geofence: [Geofence]

        #### Returns void
  + ##### Optional failure: (error: string) => void

    - * (error: string): void
      * #### Parameters

        + ##### error: string

        #### Returns void

  #### Returns Promise<[Geofence]>

### Static getGeofences

* getGeofences[]) => void, failure?: (error: string) => void): Promise<[Geofence][]>

* Fetch a list of all [Geofence] in the SDK's database. If there are no geofences being monitored, you'll receive an empty `Array`.

  example
  :   ```typescript
      let geofences = await BackgroundGeolocation.getGeofences();
      console.log("[getGeofences: ", geofences);
      ```

      [### ℹ️ See also:](#ℹ️-see-also)
      + 📘 [Geofencing Guide]

  #### Parameters

  + ##### Optional success: []) => void

    - * []): void
      * #### Parameters

        + ##### geofences: [Geofence][]

        #### Returns void
  + ##### Optional failure: (error: string) => void

    - * (error: string): void
      * #### Parameters

        + ##### error: string

        #### Returns void

  #### Returns Promise<[Geofence][]>

### Static getLocations

* getLocations(success?: (locations: Object[]) => void, failure?: Function): Promise<Object[]>

* Retrieve a List of [Location] currently stored in the SDK's SQLite database.

  example
  :   ```typescript
      let locations = await BackgroundGeolocation.getLocations();
      ```

  #### Parameters

  + ##### Optional success: (locations: Object[]) => void

    - * (locations: Object[]): void
      * #### Parameters

        + ##### locations: Object[]

        #### Returns void
  + ##### Optional failure: Function

  #### Returns Promise<Object[]>

### Static getLog

* getLog(success?: (log: string) => void, failure?: (error: string) => void): Promise<string>

* deprecated
  :   Use [Logger.getLog].

  #### Parameters

  + ##### Optional success: (log: string) => void

    - * (log: string): void
      * #### Parameters

        + ##### log: string

        #### Returns void
  + ##### Optional failure: (error: string) => void

    - * (error: string): void
      * #### Parameters

        + ##### error: string

        #### Returns void

  #### Returns Promise<string>

### Static getOdometer

* getOdometer(success?: (odometer: number) => void, failure?: Function): Promise<number>

* Retrieve the current distance-traveled ("odometer").

  The plugin constantly tracks distance traveled, computing the distance between the current location and last and maintaining the sum. To fetch the
  current **odometer** reading:

  example
  :   ```typescript
      let odometer = await BackgroundGeolocation.getOdometer();
      ```

      [### ℹ️ See also:](#ℹ️-see-also)
      + [desiredOdometerAccuracy].
      + [resetOdometer] / [setOdometer].[### ⚠️ Warning:](#⚠️-warning)
      + Odometer calculations are dependent upon the accuracy of received locations. If location accuracy is poor, this will necessarily introduce error into odometer calculations.

  #### Parameters

  + ##### Optional success: (odometer: number) => void

    - * (odometer: number): void
      * #### Parameters

        + ##### odometer: number

        #### Returns void
  + ##### Optional failure: Function

  #### Returns Promise<number>

### Static getProviderState

* getProviderState) => void, failure?: Function): Promise<[ProviderChangeEvent]>

* Retrieves the current state of location-provider authorization.

  [### ℹ️ See also:](#ℹ️-see-also)
  + You can also *listen* for changes in location-authorization using the event [onProviderChange].

  example
  :   ```typescript
      let providerState = await BackgroundGeolocation.getProviderState();
      console.log("- Provider state: ", providerState);
      ```

  #### Parameters

  + ##### Optional success: ) => void

    - * ): void
      * #### Parameters

        + ##### state: [ProviderChangeEvent]

        #### Returns void
  + ##### Optional failure: Function

  #### Returns Promise<[ProviderChangeEvent]>

### Static getSensors

* getSensors) => void, failure?: Function): Promise<[Sensors]>

* Returns the presence of device sensors *accelerometer*, *gyroscope*, *magnetometer*

  break
  :   These core [Sensors] are used by the motion activity-recognition system -- when any of these sensors are missing from a device (particularly on cheap
      Android devices), the performance of the motion activity-recognition system will be **severely** degraded and highly inaccurate.

      For devices which *are* missing any of these sensors, you can increase the motion-detection sensitivity by decreasing
      [minimumActivityRecognitionConfidence].

  example
  :   ```typescript
      let sensors = await BackgroundGeolocation.sensors;
      console.log(sensors);
      ```

  #### Parameters

  + ##### Optional success: ) => void

    - * ): void
      * #### Parameters

        + ##### sensors: [Sensors]

        #### Returns void
  + ##### Optional failure: Function

  #### Returns Promise<[Sensors]>

### Static getState

* getState) => void, failure?: (error: string) => void): Promise<[State]>

* Return the current [State] of the plugin, including all [Config] parameters.

  example
  :   ```typescript
      let state = await BackgroundGeolocation.getState();
      console.log("[state] ", state.enabled, state.trackingMode);
      ```

  #### Parameters

  + ##### Optional success: ) => void

    - * ): void
      * #### Parameters

        + ##### state: [State]

        #### Returns void
  + ##### Optional failure: (error: string) => void

    - * (error: string): void
      * #### Parameters

        + ##### error: string

        #### Returns void

  #### Returns Promise<[State]>

### Static insertLocation

* insertLocation, success?: ) => void, failure?: Function): Promise<[Location]>

* #### Parameters

  + ##### params: [Location]
  + ##### Optional success: ) => void

    - * ): void
      * #### Parameters

        + ##### location: [Location]

        #### Returns void
  + ##### Optional failure: Function

  #### Returns Promise<[Location]>

### Static isPowerSaveMode

* isPowerSaveMode(success?: (enabled: boolean) => void, failure?: Function): Promise<boolean>

* Fetches the state of the operating-system's "Power Saving" mode.

  break
  :   Power Saving mode can throttle certain services in the background, such as HTTP requests or GPS.

      ℹ️ You can listen to changes in the state of "Power Saving" mode from the event [onPowerSaveChange].

      [### iOS](#ios)

      iOS Power Saving mode can be engaged manually by the user in **Settings -> Battery** or from an automatic OS dialog.

      ![]

      [### Android](#android)

      Android Power Saving mode can be engaged manually by the user in **Settings -> Battery -> Battery Saver** or automatically with a user-specified
      "threshold" (eg: 15%).

      ![]

  example
  :   ```typescript
      let isPowerSaveMode = await BackgroundGeolocation.isPowerSaveMode;
      ```

  #### Parameters

  + ##### Optional success: (enabled: boolean) => void

    - * (enabled: boolean): void
      * #### Parameters

        + ##### enabled: boolean

        #### Returns void
  + ##### Optional failure: Function

  #### Returns Promise<boolean>

### Static onAuthorization

* onAuthorization) => void): [Subscription]

* Subscribe to [Authorization] events.

  Fired when [Authorization.refreshUrl] responds, either successfully or not. If successful, [AuthorizationEvent.success] will be `true` and [AuthorizationEvent.response] will
  contain the decoded JSON response returned from the server.

  If authorization failed, [AuthorizationEvent.error] will contain the error message.

  example
  :   ```typescript
      const subscription = BackgroundGeolocation.onAuthorization((event) => {
        if (event.success) {
          console.log("[authorization] ERROR: ", event.error);
        } else {
          console.log("[authorization] SUCCESS: ", event.response);
        }
      });
      ```

  #### Parameters

  + ##### callback: ) => void

    - * ): void
      * #### Parameters

        + ##### event: [AuthorizationEvent]

        #### Returns void

  #### Returns [Subscription]

### Static onNotificationAction

* onNotificationAction(callback: (buttonId: string) => void): [Subscription]

* [**Android-only**] Subscribe to button-clicks of a custom [Notification.layout] on the Android foreground-service notification.

  #### Parameters

  + ##### callback: (buttonId: string) => void

    - * (buttonId: string): void
      * #### Parameters

        + ##### buttonId: string

        #### Returns void

  #### Returns [Subscription]

### Static playSound

* playSound(soundId: any, success?: Function, failure?: Function): Promise<void>

* #### Parameters

  + ##### soundId: any
  + ##### Optional success: Function
  + ##### Optional failure: Function

  #### Returns Promise<void>

### Static ready

* ready, success?: ) => void, failure?: (error: string) => void): Promise<[State]>

* Signal to the plugin that your app is launched and ready, proving the default [Config].

  The supplied [Config] will be applied **only at first install** of your app — for every launch thereafter,
  the plugin will automatically load its last-known configuration from persistent storage.
  The plugin always remembers the configuration you apply to it.

  example
  :   ```typescript
      BackgroundGeolocation.ready({
        desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
        distanceFilter: 10,
        stopOnTerminate: false,
        startOnBoot: true,
        url: "http://your.server.com",
        headers: {
         "my-auth-token": "secret-token"
        }
      }).then((state) => {
       console.log("[ready] success", state);
      });
      ```

      [### ⚠️ Warning: You must call **`.ready(confg)`** **once** and **only** once, each time your app is launched.](#⚠️-warning-you-must-call-readyconfg-once-and-only-once-each-time-your-app-is-launched)
      + Do not hide the call to `#ready` within a view which is loaded only by clicking a UI action. This is particularly important
        for iOS in the case where the OS relaunches your app in the background when the device is detected to be moving. If you don't ensure that `#ready` is called in this case, tracking will not resume.[### The [reset] method.](#the-reset-method)

      If you wish, you can use the [reset] method to reset all [Config] options to documented default-values (with optional overrides):

      [### [Config.reset]: false](#configreset-false)

      Configuring the plugin with **`reset: false`** should generally be avoided unless you know *exactly* what it does. People often find this from the *Demo* app. If you do configure `reset: false`, you'll find that your `Config` provided to `.ready` is consumed **only at first launch after install**. Thereafter, the plugin will ignore any changes you've provided there. The only way to change the config then is to use [setConfig].

      You will especially not want to use `reset: false` during development, while you're fine-tuning your `Config` options.

      The reason the *Demo* app uses `reset: false` is because it hosts an advanced "*Settings*" screen to tune the `Config` at runtime and we don't want those runtime changes to be overwritten by `.ready(config)` each time the app launches.

      ⚠️ If you *don't* undestand what **`reset: false`** does, **NO NOT USE IT**. If you blindly copy/pasted it from the *Demo* app, **REMOVE IT** from your `Config`.

  example
  :   ```typescript
      BackgroundGeolocation.reset();
      // Reset to documented default-values with overrides
      bgGeo.reset({
        distanceFilter:  10
      });
      ```

  #### Parameters

  + ##### config: [Config]
  + ##### Optional success: ) => void

    - * ): void
      * #### Parameters

        + ##### state: [State]

        #### Returns void
  + ##### Optional failure: (error: string) => void

    - * (error: string): void
      * #### Parameters

        + ##### error: string

        #### Returns void

  #### Returns Promise<[State]>

### Static registerHeadlessTask

* registerHeadlessTask) => Promise<void>): void

* Registers a Javascript callback to execute in the Android "Headless" state, where the app has been terminated configured with
  [stopOnTerminate]`:false`. \* The received `event` object contains a `name` (the event name) and `params` (the event data-object).

  [### ⚠️ Note Cordova & Capacitor](#⚠️-note-cordova-amp-capacitor)
  + Javascript headless callbacks are not supported by Cordova or Capacitor. See [Android Headless Mode][### ⚠️ Warning:](#⚠️-warning)
  + You **must** `registerHeadlessTask` in your application root file (eg: `index.js`).[### ⚠️ Warning:](#⚠️-warning-1)
  + Your `function` **must** be declared as `async`. You must `await` all work within your task. Your headless-task will automatically be terminated after executing the last line of your function.

  example
  :   ```typescript
      const BackgroundGeolocationHeadlessTask = async (event) => {
        const params = event.params;
        console.log("[BackgroundGeolocation HeadlessTask] -", event.name, params);

        switch (event.name) {
          case "terminate":
            // Use await for async tasks
            const location = await BackgroundGeolocation.getCurrentPosition({
              samples: 1,
              persist: false
            });
            console.log("[BackgroundGeolocation HeadlessTask] - getCurrentPosition:", location);
            break;
        }
        // You must await all work you do in your task.  
        // Headless-tasks are automatically terminated after executing the last line of your function.
        await doWork();
      }

      BackgroundGeolocation.registerHeadlessTask(BackgroundGeolocationHeadlessTask);
      ```

      [### Debugging](#debugging)

      While implementing your headless-task It's crucial to observe your Android logs in a terminal via

      ```typescript
      $ adb logcat *:S TSLocationManager:V ReactNativeJS:V

      TSLocationManager: [c.t.r.HeadlessTask onHeadlessEvent] 💀  event: connectivitychange
      TSLocationManager: [c.t.r.HeadlessTask createReactContextAndScheduleTask] initialize ReactContext
      TSLocationManager: [c.t.r.HeadlessTask onHeadlessEvent] 💀  event: providerchange
      TSLocationManager: [c.t.r.HeadlessTask onHeadlessEvent] 💀  event: terminate
      ReactNativeJS: '[BGGeoHeadlessTask] ', 'connectivitychange', taskId: 1
      TSLocationManager: [c.t.r.HeadlessTask invokeStartTask] taskId: 1
      TSLocationManager: [c.t.r.HeadlessTask invokeStartTask] taskId: 2
      TSLocationManager: [c.t.r.HeadlessTask invokeStartTask] taskId: 3
      ReactNativeJS: '[BGGeoHeadlessTask] ', 'providerchange', taskId: 2
      ReactNativeJS: '[BGGeoHeadlessTask] ', 'terminate', taskId: 3
      TSLocationManager: [c.t.l.u.BackgroundTaskManager$Task start] ⏳ startBackgroundTask: 1
      TSLocationManager: [c.t.l.u.BackgroundTaskManager$Task start] ⏳ startBackgroundTask: 2
      ReactNativeJS: *** [doWork] START
      ReactNativeJS: *** [doWork] START
      TSLocationManager: [c.t.l.u.BackgroundTaskManager$Task start] ⏳ startBackgroundTask: 3
      ReactNativeJS: *** [doWork] START
      .
      .
      .
      ReactNativeJS: *** [doWork] FINISH
      ReactNativeJS: *** [doWork] FINISH
      ReactNativeJS: *** [doWork] FINISH
      TSLocationManager: [c.t.l.u.BackgroundTaskManager$Task stop] ⏳ stopBackgroundTask: 1
      TSLocationManager: [c.t.l.u.BackgroundTaskManager$Task stop] ⏳ stopBackgroundTask: 2
      TSLocationManager: [c.t.l.u.BackgroundTaskManager$Task stop] ⏳ stopBackgroundTask: 3
      TSLocationManager: [c.t.r.HeadlessTask$1 onHeadlessJsTaskFinish] taskId: 1
      TSLocationManager: [c.t.r.HeadlessTask$1 onHeadlessJsTaskFinish] taskId: 2
      TSLocationManager: [c.t.r.HeadlessTask$1 onHeadlessJsTaskFinish] taskId: 3
      ```

      [### ℹ️ See also:](#ℹ️-see-also)
      + 📘 [Android Headless Mode].
      + [Config.enableHeadless]

  #### Parameters

  + ##### callback: ) => Promise<void>

    - * ): Promise<void>
      * #### Parameters

        + ##### event: [HeadlessEvent]

        #### Returns Promise<void>

  #### Returns void

### Static removeAllListeners

* removeAllListeners(success?: Function, failure?: Function): Promise<void>

* Alias for [removeListeners]

  #### Parameters

  + ##### Optional success: Function
  + ##### Optional failure: Function

  #### Returns Promise<void>

### Static removeGeofence

* removeGeofence(identifier: string, success?: Function, failure?: Function): Promise<void>

* Removes a [Geofence] having the given [Geofence.identifier].

  example
  :   ```typescript
      BackgroundGeolocation.removeGeofence("Home").then((success) => {
        console.log("[removeGeofence] success");
      }).catch((error) => {
        console.log("[removeGeofence] FAILURE: ", error);
      });
      ```

      [### ℹ️ See also:](#ℹ️-see-also)
      + 📘 [Geofencing Guide]

  #### Parameters

  + ##### identifier: string
  + ##### Optional success: Function
  + ##### Optional failure: Function

  #### Returns Promise<void>

### Static removeGeofences

* removeGeofences(success?: Function, failure?: Function): Promise<void>

* Destroy all [Geofence]

  example
  :   ```typescript
      BackgroundGeolocation.removeGeofences();
      ```

      [### ℹ️ See also:](#ℹ️-see-also)
      + 📘 [Geofencing Guide]

  #### Parameters

  + ##### Optional success: Function
  + ##### Optional failure: Function

  #### Returns Promise<void>

### Static removeListener

* removeListener(event: string, handler: Function, success?: Function, failure?: Function): void

* deprecated.
  :   Use [Subscription] returned from **`BackgroundGeolocation.onXXX`** to remove listeners.

  example
  :   ```typescript
      const subscription = BackgroundGeolocation.onLocation((location) => {
        console.log('[onLocation]', location);
      });
      .
      .
      .
      // Remove listener
      subscription.remove();
      ```

      ---

      [### ⚠️ [Deprecated]](#⚠️-deprecated)

      Removes an event listener. You must supply the *type* of event to remove in addition to a reference to the *exact* function you
      used to subscribe to the event.

      | Event |
      | --- |
      | `location` |
      | `motionchange` |
      | `activitychange` |
      | `providerchange` |
      | `geofence` |
      | `geofenceschange` |
      | `heartbeat` |
      | `http` |
      | `powersavechange` |
      | `schedule` |
      | `connectivitychange` |
      | `enabledchange` |

  example
  :   ```typescript
      const locationHandler = (location) => {
        console.log("[location] - ", location)
      }
      BackgroundGeolocation.onLocation(locationHandler)
      .
      .
      // Remove the listener providing a reference to the original callback.
      BackgroundGeolocation.removeListener("location", locationHandler)
      ```

  #### Parameters

  + ##### event: string
  + ##### handler: Function
  + ##### Optional success: Function
  + ##### Optional failure: Function

  #### Returns void

### Static removeListeners

* removeListeners(success?: Function, failure?: Function): Promise<void>

* Removes all event-listeners.

  Calls [Subscription.remove] on all subscriptions.

  example
  :   ```typescript
      BackgroundGeolocation.removeListeners();
      ```

  #### Parameters

  + ##### Optional success: Function
  + ##### Optional failure: Function

  #### Returns Promise<void>

### Static requestPermission

* requestPermission) => void, failure?: ) => void): Promise<[AuthorizationStatus]>

* Manually request location permission from the user with the configured [Config.locationAuthorizationRequest].

  The method will resolve successful if *either* **`WhenInUse`** or **`Always`** is authorized, regardless of [Config.locationAuthorizationRequest]. Otherwise an error will be returned (eg: user denies location permission).

  If the user has already provided authorization for location-services, the method will resolve successfully immediately.

  If iOS has *already* presented the location authorization dialog and the user has not currently authorized your desired [Config.locationAuthorizationRequest], the SDK will present an error dialog offering to direct the user to your app's Settings screen.

  + To disable this behaviour, see [Config.disableLocationAuthorizationAlert].
  + To customize the text on this dialog, see [Config.locationAuthorizationAlert].[### ⚠️ Note:](#⚠️-note)
  + The SDK will **already request permission** from the user when you execute [start], [startGeofences], [getCurrentPosition], etc. You **do not need to explicitly execute this method** with typical use-cases.

  example
  :   ```typescript
      async componentDidMount() {
        // Listen to onProviderChange to be notified when location authorization changes occur.
        BackgroundGeolocation.onProviderChange((event) => {
          console.log('[providerchange]', event);
        });

        // First ready the plugin with your configuration.
        let state = await BackgroundGeolocation.ready({
          locationAuthorizationRequest: 'Always'
        });

        // Manually request permission with configured locationAuthorizationRequest.
        try {
          int status = await BackgroundGeolocation.requestPermission();
          console.log('[requestPermission] success: ', status);
        } catch(status) {
          console.warn('[requestPermission] FAILURE: ', status);
        }
      }
      ```

      [### ℹ️ See also:](#ℹ️-see-also)
      + [Config.locationAuthorizationRequest]
      + [Config.disableLocationAuthorizationAlert]
      + [Config.locationAuthorizationAlert]
      + [Config.backgroundPermissionRationale] (*Android 11+*)
      + [requestTemporaryFullAccuracy] (*iOS 14+*)

  #### Parameters

  + ##### Optional success: ) => void

    - * ): void
      * #### Parameters

        + ##### status: [AuthorizationStatus]

        #### Returns void
  + ##### Optional failure: ) => void

    - * ): void
      * #### Parameters

        + ##### status: [AuthorizationStatus]

        #### Returns void

  #### Returns Promise<[AuthorizationStatus]>

### Static requestTemporaryFullAccuracy

* requestTemporaryFullAccuracy(purpose: string): Promise<[AccuracyAuthorization]>

* **`[iOS 14+]`** iOS 14 has introduced a new **`[Precise: On]`** switch on the location authorization dialog allowing users to disable high-accuracy location.

  The method [`requestTemporaryFullAccuracy` (Apple docs)] will allow you to present a dialog to the user requesting temporary *full accuracy* for the lifetime of this application run (until terminate).

  ![]

  [## Configuration — `Info.plist`](#configuration-mdash-infoplist)

  In order to use this method, you must configure your **`Info.plist`** with the `Dictionary` key:
  **`Privacy - Location Temporary Usage Description Dictionary`**

  ![]

  The keys of this `Dictionary` (eg: `Delivery`) are supplied as the first argument to the method. The `value` will be printed on the dialog shown to the user, explaing the purpose of your request for full accuracy.

  If the dialog fails to be presented, an error will be thrown:

  + The Info.plist file doesn’t have an entry for the given purposeKey value.
  + The app is already authorized for full accuracy.
  + The app is in the background.

  ![]

  **Note:** Android and older versions of iOS `< 14` will return [BackgroundGeolocation.ACCURACY\_AUTHORIZATION\_FULL].

  example
  :   ```typescript
      BackgroundGeolocation.onProviderChange((event) => {
        if (event.accuracyAuthorization == BackgroundGeolocation.ACCURACY_AUTHORIZATION_REDUCED) {
          // Supply "Purpose" key from Info.plist as 1st argument.
          BackgroundGeolocation.requestTemporaryFullAccuracy("Delivery").then((accuracyAuthorization) => {
            if (accuracyAuthorization == BackgroundGeolocation.ACCURACY_AUTHORIZATION_FULL) {
              console.log('[requestTemporaryFullAccuracy] GRANTED: ', accuracyAuthorization);
            } else {
              console.log('[requestTemporaryFullAccuracy] DENIED: ', accuracyAuthorization);
            }
          }).catch((error) => {
            console.warn("[requestTemporaryFullAccuracy] FAILED TO SHOW DIALOG: ", error);
          });
        }
      });
      ```

      **See also:**

      + [ProviderChangeEvent.accuracyAuthorization].
      + [What's new in iOS 14 `CoreLocation`](https://levelup.gitconnected.com/whats-new-with-corelocation-in-ios-14-bd28421c95c4)

  #### Parameters

  + ##### purpose: string

  #### Returns Promise<[AccuracyAuthorization]>

### Static reset

* reset, success?: ) => void, failure?: Function): Promise<[State]>

* Resets the plugin configuration to documented default-values.

  If an optional [Config] is provided, it will be applied *after* the configuration reset.

  #### Parameters

  + ##### Optional config: [Config]
  + ##### Optional success: ) => void

    - * ): void
      * #### Parameters

        + ##### state: [State]

        #### Returns void
  + ##### Optional failure: Function

  #### Returns Promise<[State]>

### Static resetOdometer

* resetOdometer(success?: Function, failure?: Function): Promise<[Location]>

* Initialize the `odometer` to `0`.

  example
  :   ```typescript
      BackgroundGeolocation.resetOdometer().then((location) => {
        // This is the location where odometer was set at.
        console.log("[setOdometer] success: ", location);
      });
      ```

      [### ⚠️ Note:](#⚠️-note)
      + [resetOdometer] will internally perform a [getCurrentPosition] in order the record to exact location *where* odometer was set.
      + [resetOdometer] is the same as [setOdometer]`:0`.

  #### Parameters

  + ##### Optional success: Function
  + ##### Optional failure: Function

  #### Returns Promise<[Location]>

### Static setConfig

* setConfig, success?: ) => void, failure?: Function): Promise<[State]>

* Re-configure the SDK's [Config] parameters. This is the method to use when you wish to *change*
  the plugin [Config] *after* [ready] has been executed.

  The supplied [Config] will be appended to the current configuration and applied in realtime.

  example
  :   ```typescript
      BackgroundGeolocation.setConfig({
        desiredAccuracy: Config.DESIRED_ACCURACY_HIGH,
        distanceFilter: 100.0,
        stopOnTerminate: false,
        startOnBoot: true
      }).then((state) => {
        console.log("[setConfig] success: ", state);
      })
      ```

  #### Parameters

  + ##### config: [Config]
  + ##### Optional success: ) => void

    - * ): void
      * #### Parameters

        + ##### state: [State]

        #### Returns void
  + ##### Optional failure: Function

  #### Returns Promise<[State]>

### Static setLogLevel

* setLogLevel, success?: ) => void, failure?: Function): Promise<[State]>

* Sets the [logLevel].

  #### Parameters

  + ##### value: [LogLevel]
  + ##### Optional success: ) => void

    - * ): void
      * #### Parameters

        + ##### state: [State]

        #### Returns void
  + ##### Optional failure: Function

  #### Returns Promise<[State]>

### Static setOdometer

* setOdometer) => void, failure?: Function): Promise<[Location]>

* Initialize the `odometer` to *any* arbitrary value.

  example
  :   ```typescript
      BackgroundGeolocation.setOdometer(1234.56).then((location) => {
        // This is the location where odometer was set at.
        console.log("[setOdometer] success: ", location);
      });
      ```

      [### ⚠️ Note:](#⚠️-note)
      + [setOdometer] will internally perform a [getCurrentPosition] in order to record the exact location *where* odometer was set.

  #### Parameters

  + ##### value: number
  + ##### Optional success: ) => void

    - * ): void
      * #### Parameters

        + ##### location: [Location]

        #### Returns void
  + ##### Optional failure: Function

  #### Returns Promise<[Location]>

### Static start

* start) => void, error?: (error: string) => void): Promise<[State]>

* Enable location + geofence tracking.

  This is the SDK's power **ON** button. The plugin will initially start into its **stationary** state, fetching an initial location before
  turning off location services. Android will be monitoring its **Activity Recognition System** while iOS will create a stationary geofence around
  the current location.

  [### ⚠️ Note:](#⚠️-note)

  If you've configured a [schedule], this method will override that schedule and engage tracking immediately.

  example
  :   ```typescript
      BackgroundGeolocation.start().then((state) => {
        console.log("[start] success - ", state);
      });
      ```

      [### ℹ️ See also:](#ℹ️-see-also)
      + [stop]
      + [startGeofences]
      + 📘 [Philosophy of Operation]

  #### Parameters

  + ##### Optional success: ) => void

    - * ): void
      * #### Parameters

        + ##### state: [State]

        #### Returns void
  + ##### Optional error: (error: string) => void

    - * (error: string): void
      * #### Parameters

        + ##### error: string

        #### Returns void

  #### Returns Promise<[State]>

### Static startBackgroundTask

* startBackgroundTask(success?: (taskId: number) => void, failure?: Function): Promise<number>

* Sends a signal to OS that you wish to perform a long-running task.

  The OS will keep your running in the background and not suspend it until you signal completion with the [stopBackgroundTask] method. Your callback will be provided with a single parameter `taskId`
  which you will send to the [stopBackgroundTask] method.

  example
  :   ```typescript
      onLocation(location) {
        console.log("[location] ", location);

        // Perform some long-running task (eg: HTTP request)
        BackgroundGeolocation.startBackgroundTask().then((taskId) => {
          performLongRunningTask.then(() => {
            // When your long-running task is complete, signal completion of taskId.
            BackgroundGeolocation.stopBackgroundTask(taskId);
          }).catch(error) => {
            // Be sure to catch errors:  never leave you background-task hanging.
            console.error(error);
            BackgroundGeolocation.stopBackgroundTask();
          });
        });
      }
      ```

      [### iOS](#ios)

      The iOS implementation uses [beginBackgroundTaskWithExpirationHandler]

      ⚠️ iOS provides **exactly** 180s of background-running time. If your long-running task exceeds this time, the plugin has a fail-safe which will
      automatically [stopBackgroundTask] your **`taskId`** to prevent the OS from force-killing your application.

      Logging of iOS background tasks looks like this:

      ```typescript
      ✅-[BackgroundTaskManager createBackgroundTask] 1
      .
      .
      .

      ✅-[BackgroundTaskManager stopBackgroundTask:]_block_invoke 1 OF (
          1
      )
      ```

      [### Android](#android)

      The Android implementation launches a [`WorkManager`](https://developer.android.com/topic/libraries/architecture/workmanager) task.

      ⚠️ The Android plugin imposes a limit of **3 minutes** for your background-task before it automatically `FORCE KILL`s it.

      Logging for Android background-tasks looks like this (when you see an hourglass ⏳ icon, a foreground-service is active)

      ```typescript
       I TSLocationManager: [c.t.l.u.BackgroundTaskManager onStartJob] ⏳ startBackgroundTask: 6
       .
       .
       .
       I TSLocationManager: [c.t.l.u.BackgroundTaskManager$Task stop] ⏳ stopBackgroundTask: 6
      ```

  #### Parameters

  + ##### Optional success: (taskId: number) => void

    - * (taskId: number): void
      * #### Parameters

        + ##### taskId: number

        #### Returns void
  + ##### Optional failure: Function

  #### Returns Promise<number>

### Static startGeofences

* startGeofences) => void, failure?: (error: string) => void): Promise<[State]>

* Engages the geofences-only [State.trackingMode].

  In this mode, no active location-tracking will occur — only geofences will be monitored. To stop monitoring "geofences" [TrackingMode],
  simply use the usual [stop] method.

  example
  :   ```typescript
      // Add a geofence.
      BackgroundGeolocation.addGeofence({
        notifyOnExit: true,
        radius: 200,
        identifier: "ZONE_OF_INTEREST",
        latitude: 37.234232,
        longitude: 42.234234
      });

      // Listen to geofence events.
      BackgroundGeolocation.onGeofence((event) => {
        console.log("[onGeofence] -  ", event);
      });

      // Configure the plugin
      BackgroundGeolocation.ready({
        url: "http://my.server.com",
        autoSync: true
      }).then(((state) => {
        // Start monitoring geofences.
        BackgroundGeolocation.startGeofences();
      });
      ```

      [### ℹ️ See also:](#ℹ️-see-also)
      + [stop]
      + 📘 [Geofencing Guide]

  #### Parameters

  + ##### Optional success: ) => void

    - * ): void
      * #### Parameters

        + ##### state: [State]

        #### Returns void
  + ##### Optional failure: (error: string) => void

    - * (error: string): void
      * #### Parameters

        + ##### error: string

        #### Returns void

  #### Returns Promise<[State]>

### Static startSchedule

* startSchedule) => void, failure?: (error: string) => void): Promise<[State]>

* Initiate the configured [schedule].

  If a [schedule] was configured, this method will initiate that schedule. The plugin will automatically be started or stopped according to
  the configured [schedule].

  To halt scheduled tracking, use [stopSchedule].

  example
  :   ```typescript
      BackgroundGeolocation.startSchedule.then((state) => {
        console.log("[startSchedule] success: ", state);
      })
      ```

      [### ℹ️ See also:](#ℹ️-see-also)
      + [schedule]
      + [startSchedule]

  #### Parameters

  + ##### Optional success: ) => void

    - * ): void
      * #### Parameters

        + ##### state: [State]

        #### Returns void
  + ##### Optional failure: (error: string) => void

    - * (error: string): void
      * #### Parameters

        + ##### error: string

        #### Returns void

  #### Returns Promise<[State]>

### Static stop

* stop) => void, error?: (error: string) => void): Promise<[State]>

* Disable location and geofence monitoring. This is the SDK's power **OFF** button.

  example
  :   ```typescript
      BackgroundGeolocation.stop();
      ```

      [### ⚠️ Note:](#⚠️-note)

      If you've configured a [schedule], **`#stop`** will **not** halt the Scheduler. You must explicitly [stopSchedule] as well:

  example
  :   ```typescript
      // Later when you want to stop the Scheduler (eg: user logout)
      BackgroundGeolocation.stopSchedule();
      ```

  #### Parameters

  + ##### Optional success: ) => void

    - * ): void
      * #### Parameters

        + ##### state: [State]

        #### Returns void
  + ##### Optional error: (error: string) => void

    - * (error: string): void
      * #### Parameters

        + ##### error: string

        #### Returns void

  #### Returns Promise<[State]>

### Static stopBackgroundTask

* stopBackgroundTask(taskId: number, success?: Function, failure?: Function): Promise<number>

* Signal completion of [startBackgroundTask]

  Sends a signal to the native OS that your long-running task, addressed by `taskId` provided by [startBackgroundTask] is complete and the OS may proceed
  to suspend your application if applicable.

  example
  :   ```typescript
      BackgroundGeolocation.startBackgroundTask().then((taskId) => {
        // Perform some long-running task (eg: HTTP request)
        performLongRunningTask.then(() => {
          // When your long-running task is complete, signal completion of taskId.
          BackgroundGeolocation.stopBackgroundTask(taskId);
        });
      });
      ```

  #### Parameters

  + ##### taskId: number
  + ##### Optional success: Function
  + ##### Optional failure: Function

  #### Returns Promise<number>

### Static stopSchedule

* stopSchedule) => void, failure?: (error: string) => void): Promise<[State]>

* Halt scheduled tracking.

  example
  :   ```typescript
      BackgroundGeolocation.stopSchedule.then((state) => {
        console.log("[stopSchedule] success: ", state);
      })
      ```

      ⚠️ [stopSchedule] will **not** execute [stop] if the plugin is currently tracking. You must explicitly execute [stop].

  example
  :   ```typescript
      // Later when you want to stop the Scheduler (eg: user logout)
      await BackgroundGeolocation.stopSchedule().then((state) => {
        if (state.enabled) {
          BackgroundGeolocation.stop();
        }
      })
      ```

      [### ℹ️ See also:](#ℹ️-see-also)
      + [startSchedule]

  #### Parameters

  + ##### Optional success: ) => void

    - * ): void
      * #### Parameters

        + ##### state: [State]

        #### Returns void
  + ##### Optional failure: (error: string) => void

    - * (error: string): void
      * #### Parameters

        + ##### error: string

        #### Returns void

  #### Returns Promise<[State]>

### Static stopWatchPosition

* stopWatchPosition(success?: Function, failure?: Function): Promise<void>

* Stop watch-position updates initiated from [watchPosition].

  example
  :   ```typescript
      onResume() {
        // Start watching position while app in foreground.
        BackgroundGeolocation.watchPosition((location) => {
          console.log("[watchPosition] -", location);
        }, (errorCode) => {
          console.log("[watchPosition] ERROR -", errorCode);
        }, {
         interval: 1000
        })
      }

      onSuspend() {
        // Halt watching position when app goes to background.
        BackgroundGeolocation.stopWatchPosition();
      }
      ```

      [### ℹ️ See also:](#ℹ️-see-also)
      + [stopWatchPosition]

  #### Parameters

  + ##### Optional success: Function
  + ##### Optional failure: Function

  #### Returns Promise<void>

### Static sync

* sync(success?: (locations: Object[]) => void, failure?: Function): Promise<Object[]>

* Manually execute upload to configured [Config.url]

  If the plugin is configured for HTTP with an [Config.url] and [autoSync] `false`, the [sync] method will initiate POSTing the locations
  currently stored in the native SQLite database to your configured [Config.url]. When your HTTP server returns a response of `200 OK`, that record(s)
  in the database will be DELETED.

  If you configured [batchSync] `true`, all the locations will be sent to your server in a single HTTP POST request, otherwise the plugin will
  execute an HTTP post for **each** [Location] in the database (REST-style). Your callback will be executed and provided with a `List` of all the
  locations from the SQLite database. If you configured the plugin for HTTP , your callback will be executed after all
  the HTTP request(s) have completed. If the plugin failed to sync to your server (possibly because of no network connection), the failure callback will
  be called with an error message. If you are **not** using the HTTP features, [sync] will delete all records from its SQLite database.

  example
  :   ```typescript
      BackgroundGeolocation.sync((records) => {
        console.log("[sync] success: ", records);
      }).catch((error) => {
        console.log("[sync] FAILURE: ", error);
      });
      ```

      ℹ️ For more information, see the [HTTP Guide]

  #### Parameters

  + ##### Optional success: (locations: Object[]) => void

    - * (locations: Object[]): void
      * #### Parameters

        + ##### locations: Object[]

        #### Returns void
  + ##### Optional failure: Function

  #### Returns Promise<Object[]>

### Static transistorTrackerParams

* transistorTrackerParams(device: Object): Object

* deprecated
  :   Use [Config.transistorAuthorizationToken]

  #### Parameters

  + ##### device: Object

  #### Returns Object

### Static watchPosition

* watchPosition) => void, failure?: ) => void, options?: [WatchPositionRequest]): void

* Start a stream of continuous location-updates. The native code will persist the fetched location to its SQLite database
  just as any other location ) in addition to POSTing to your configured [Config.url] (if you've enabled the HTTP features).

  [### ⚠️ Warning:](#⚠️-warning)

  `watchPosition` is **not** recommended for **long term** monitoring in the background — It's primarily designed for use in the foreground **only**. You might use it for fast-updates of the user's current position on the map, for example.
  The SDK's primary [Philosophy of Operation] **does not require** `watchPosition`.

  [#### iOS](#ios)

  `watchPosition` will continue to run in the background, preventing iOS from suspending your application. Take care to listen to `suspend` event and call [stopWatchPosition] if you don't want your app to keep running in the background, consuming battery.

  example
  :   ```typescript
      onResume() {
        // Start watching position while app in foreground.
        BackgroundGeolocation.watchPosition((location) => {
          console.log("[watchPosition] -", location);
        }, (errorCode) => {
          console.log("[watchPosition] ERROR -", errorCode);
        }, {
          interval: 1000
        })
      }

      onSuspend() {
        // Halt watching position when app goes to background.
        BackgroundGeolocation.stopWatchPosition();
      }
      ```

  #### Parameters

  + ##### success: ) => void

    - * ): void
      * #### Parameters

        + ##### location: [Location]

        #### Returns void
  + ##### Optional failure: ) => void

    - * ): void
      * #### Parameters

        + ##### errorCode: [LocationError]

        #### Returns void
  + ##### Optional options: [WatchPositionRequest]

  #### Returns void