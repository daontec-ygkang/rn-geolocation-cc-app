The event-object provided to [BackgroundGeolocation.onConnectivityChange]

example
:   ```typescript
    BackgroundGeolocation.onConnectivityChange(connectivityChangeEvent => {
      console.log("[connectivitychange] ", connectivityChangeEvent.connected);
    });
    ```

### Hierarchy

* ConnectivityChangeEvent

## Index

### Properties

* [connected]

## Properties

### connected

connected: boolean



`true` when the device has access to a network connection.