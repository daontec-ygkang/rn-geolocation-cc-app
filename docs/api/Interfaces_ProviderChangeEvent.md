The event-object provided to [BackgroundGeolocation.onProviderChange]

example
:   ```typescript
    BackgroundGeolocation.onProviderChange(providerChangeEvent => {
      console.log("[providerchange] ", provider.enabled, provider.status, provider.network, provider.gps);
    });
    ```

### Hierarchy

* ProviderChangeEvent

## Index

### Properties

* [accuracyAuthorization]
* [enabled]
* [gps]
* [network]
* [status]

## Properties

### accuracyAuthorization

accuracyAuthorization: [AccuracyAuthorization]



**`[iOS 14+]`** iOS 14 has introduced a new **`[Precise: On]`** switch on the location authorization dialog allowing users to disable high-accuracy location.

This attribute shows the state of that switch:

* Enabled: [BackgroundGeolocation.ACCURACY\_AUTHORIZATION\_FULL].
* Disabled, [BackgroundGeolocation.ACCURACY\_AUTHORIZATION\_REDUCED].

![]

example
:   ```typescript
    BackgroundGeolocation.onProviderChange((event) => {
      let authorizationStatus = event.authorizationStatus;
      if (authorizationStatus == BackgroundGeolocation.ACCURACY_AUTHORIZATION_REDUCED) {
        // Supply "Purpose" key from Info.plist as 1st argument.
        BackgroundGeolocaiton.requestTemporaryFullAccuracy("Delivery").then((accuracyAuthorization) => {
          console.log("[requestTemporaryFullAccuracy]: ", accuracyAuthorization);
        }).catch((error) => {
          console.warn("[requestTemporaryFullAccuracy] ERROR:", error);
        });
      }
    });
    ```

    **See also:**

    * [BackgroundGeolocation.requestTemporaryFullAccuracy]
    * [What's new in iOS 14 `CoreLocation`](https://levelup.gitconnected.com/whats-new-with-corelocation-in-ios-14-bd28421c95c4)

### enabled

enabled: boolean



`true` When device location-services are enabled.

### gps

gps: boolean



`true` if GPS geolocation provider is available.

### network

network: boolean



`true` if network geolocation provider is available.

### status

status: [AuthorizationStatus]



Authorization status of location-services. For iOS, this will tell you if the user has enabled "Always" or "When in Use" authorization.

| Name | Platform |
| --- | --- |
| [AUTHORIZATION\_STATUS\_NOT\_DETERMINED] | iOS only |
| [AUTHORIZATION\_STATUS\_RESTRICTED] | iOS only |
| [AUTHORIZATION\_STATUS\_DENIED] | iOS & Android |
| [AUTHORIZATION\_STATUS\_ALWAYS] | iOS & Android |
| [AUTHORIZATION\_STATUS\_WHEN\_IN\_USE] | iOS only |

[### ℹ️ Note:](#ℹ️-note)

* When Android location permission is **granted**, `status` == [AUTHORIZATION\_STATUS\_ALWAYS], otherwise [AUTHORIZATION\_STATUS\_DENIED].