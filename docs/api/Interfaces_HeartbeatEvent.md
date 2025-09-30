The event-object provided to [BackgroundGeolocation.onHeartbeat]

example
:   ```typescript
    BackgroundGeolocation.onHeartbeat(heartbeatEvent => {
      console.log("[heartbeat] ", heartbeatEvent);
    });
    ```

### Hierarchy

* HeartbeatEvent

## Index

### Properties

* [location]

## Properties

### location

location: [Location]



The last-known location.

[### ⚠️ Note:](#⚠️-note)

* The *heartbeat* event does not actively engage location-services. If you wish to get the current location in your `callback`, use [getCurrentPosition].