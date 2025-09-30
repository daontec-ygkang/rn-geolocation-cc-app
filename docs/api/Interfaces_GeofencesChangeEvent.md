The event-object provided to [BackgroundGeolocation.onGeofencesChange].

The [GeofencesChangeEvent] provides only the *changed* geofences, those which just activated or de-activated.

example
:   ```typescript
    BackgroundGeolocation.onGeofencesChange(geofencesChangeEvent => {
      console.log("[geofenceschange] ", geofencesChangeEvent.on, geofencesChangeEvent.off);
    });
    ```

    [### ⚠️ Note:](#⚠️-note)

    * When **all** geofences have been removed, empty lists will be provided for both [on] & [off].

### Hierarchy

* GeofencesChangeEvent

## Index

### Properties

* [off]
* [on]

## Properties

### off

off: string[]

### on

on: [Geofence][]