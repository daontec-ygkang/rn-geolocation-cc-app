The event-object provided to [BackgroundGeolocation.onGeofence] when a geofence transition event occurs.

example
:   ```typescript
    BackgroundGeolocation.onGeofence(geofenceEvent => {
      console.log("[geofence] ", geofenceEvent.identifier, geofence.action, geofenceEvent.location);
    });
    ```

### Hierarchy

* GeofenceEvent

## Index

### Properties

* [action]
* [extras]
* [identifier]
* [location]
* [timestamp]

## Properties

### action

action: string



The transition type: `ENTER`, `EXIT`, `DWELL`

### Optional extras

extras: [Extras]



Optional [Geofence.extras]

### identifier

identifier: string



The identifier of the geofence which fired.

### location

location: [Location]



The [Location] where the geofence transition occurred.

### timestamp

timestamp: string



The device system time when the Geofence event was received by the OS.
**Note**: this can differ from the timestamp of the triggering location responsible for the geofence (the triggering location can be from the past).