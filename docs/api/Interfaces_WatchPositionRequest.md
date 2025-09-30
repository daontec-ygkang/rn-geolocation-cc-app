Options provided to [BackgroundGeolocation.watchPosition].

example
:   ```typescript
    BackgroundGeolocation.watchPosition((location) => {
      console.log("[watchPosition] -", location);
    }, (errorCode) => {
      console.log("[watchPosition] ERROR -", errorCode);
    }, {
      interval: 1000,
      desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
      persist: true,
      extras: {foo: "bar"},
      timeout: 60000
    });
    ```

### Hierarchy

* WatchPositionRequest

## Index

### Properties

* [desiredAccuracy]
* [extras]
* [interval]
* [persist]
* [timeout]

## Properties

### Optional desiredAccuracy

desiredAccuracy: [LocationAccuracy]



Specifies the accuracy required. See [Config.desiredAccuracy]. Only [BackgroundGeolocation.DESIRED\_ACCURACY\_HIGH] uses GPS.
Defaults to [DESIRED\_ACCURACY\_HIGH].

### Optional extras

extras: [Extras]



Arbitrary key/values to append to each recorded location.

### Optional interval

interval: number



Location update interval in `milliseconds`. Defaults to `1000`.

### Optional persist

persist: boolean



Set `true` to persist each recorded location to the plugin's database.
Defaults to `true` when [State.enabled], `false` otherwise.

### Optional timeout

timeout: number



Time in `milliseconds` to wait before firing error callback when location fails to arrive.
Defaults to `60000`.