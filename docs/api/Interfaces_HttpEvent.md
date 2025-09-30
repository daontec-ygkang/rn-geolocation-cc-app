The event-object provided to [BackgroundGeolocation.onHttp] when an HTTP response arrives from your configured [Config.url].

example
:   ```typescript
    BackgroundGeolocation.onHttp(httpEvent => {
      console.log("[http] ", httpEvent.success, httpEvent.status);
    });
    ```

    [# HTTP Guide](#http-guide)


    ---

    The [BackgroundGeolocation] SDK hosts its own flexible and robust native HTTP & SQLite persistence services. To enable the HTTP service, simply configure the SDK with an [Config.url]:

example
:   ```typescript
    // Listen for HTTP responses.
    BackgroundGeolocation.onHttp(response => {
      console.log("[http] response: ", response.success, response.status, response.responseText);
    });

    BackgroundGeolocation.ready({
      url: "https://my-server.com/locations",
      autoSync: true,
      autoSyncThreshold: 5,
      batchSync: true,
      maxBatchSize: 50,
      headers: {
        AUTHENTICATION_TOKEN: "23kasdlfkjlksjflkasdZIds"
      },
      params: {
        user_id: 1234
      },
      extras: {
        route_id: 8675309
      },
      locationsOrderDirection: "DESC",
      maxDaysToPersist: 14
    }, state => {
      console.log("[ready] success: ", state);
    });
    ```

    [## The SQLite Database](#the-sqlite-database)

    The SDK immediately inserts each recorded location into its SQLite database. This database is designed to act as a temporary buffer for the HTTP service and the SDK **strongly** desires an *empty* database. The only way that locations are destroyed from the database are:

    * Successful HTTP response from your server (`200`, `201`, `204`).
    * Executing [BackgroundGeolocation.destroyLocations].
    * [maxDaysToPersist] elapses and the location is destroyed.
    * [maxRecordsToPersist] destroys oldest record in favor of latest.

    ---

    [## The HTTP Service](#the-http-service)

    The SDK's HTTP service operates by selecting records from the database, locking them to prevent duplicate requests then uploading to your server.

    * By default, the HTTP Service will select a single record ) and execute an HTTP request to your [Config.url].
    * Each HTTP request is *synchronous* — the HTTP service will await the response from your server before selecting and uploading another record.
    * If your server returns an error or doesn't respond, the HTTP Service will immediately **halt**.
    * Configuring [batchSync] **`true`** instructs the HTTP Service to select *all* records in the database and upload them to your server in a single HTTP request.
    * Use [maxBatchSize] to limit the number of records selected for each [batchSync] request. The HTTP service will execute *synchronous* HTTP *batch* requests until the database is empty.

    ---

    [## Capturing the data at your server](#capturing-the-data-at-your-server)

    The SDK's HTTP Service will upload recorded locations as JSON to your [Config.url]  for the JSON schema) with `Content-Type application/json`. The data can be found by your server in the ["HTTP request body"](https://www.google.com/search?q=http+post+application%2Fjson+request+body+text).

    [### PHP](#php)

    ```typescript
    <?php
     $json = file_get_contents('php://input');
     $data = json_decode($json);
     echo "POST /locations: " . $data;
    ?>
    ```

    [### Node with `express`](#node-with-express)

    ```typescript
    import express from 'express';
    import bodyParser from 'body-parser';

    const app = express();

    app.use(bodyParser.json());  // <-- use body-parser

    app.post('/locations', (req, res) => {
      console.log('POST /locations: ', req.body);
    });
    ```

    [### Rails](#rails)

    ```typescript
    class LocationsController < ApplicationController
      def create
        data = params
        puts "POST /locations: #{data}"
      end
    end
    ```

    ---

    [## HTTP Failures](#http-failures)

    If your server does *not* return a `20x` response (eg: `200`, `201`, `204`), the SDK will **`UNLOCK`** that record. Another attempt to upload will be made in the future ) when:

    * When another location is recorded.
    * Application `pause` / `resume` events.
    * Application boot.
    * [onHeartbeat] events.
    * [onConnectivityChange] events.
    * **[iOS]** Background `fetch` events.

    ---

    [## Receiving the HTTP Response.](#receiving-the-http-response)

    You can capture the HTTP response from your server by listening to the [onHttp] event.

    ---

    [## `autoSync: true`](#autosync-true)

    By default, the SDK is configured for [autoSync]:true and will attempt to immediately upload each recorded location to your configured [Config.url].

    * Use [autoSyncThreshold] to throttle HTTP requests. This will instruct the SDK to accumulate that number of records in the database before calling upon the HTTP Service. This is a good way to **conserve battery**, since HTTP requests consume more energy/second than the GPS.

    ---

    [## Manual Invoking Upload](#manual-invoking-upload)

    The SDK's HTTP Service can be summoned into action at **any time** via the method [BackgroundGeolocation.sync].

    ---

    [## [Config.params], [headers] and [extras]](#configparams-headers-and-extras)

    * The SDK's HTTP Service appends configured [Config.params] to root of the `JSON` data of each HTTP request.
    * [headers] are appended to each HTTP Request.
    * [extras] are appended to each recorded location and persisted to the database record.

    ---

    [## Custom `JSON` Schema: [locationTemplate] and [geofenceTemplate]](#custom-json-schema--locationtemplate-and-geofencetemplate)

    The default HTTP `JSON` schema for both [Location] and [Geofence] can be overridden by the configuration options [locationTemplate] and [geofenceTemplate], allowing you to create any schema you wish.

    ---

    [## Disabling HTTP requests on Cellular connections](#disabling-http-requests-on-cellular-connections)

    If you're concerned with Cellular data-usage, you can configure the plugin's HTTP Service to upload only when connected to Wifi:

example
:   ```typescript
    BackgroundGeolocation.ready({
      autoSync: true,
      disableAutoSyncOnCellular: true
    });
    ```

    ---

    [## HTTP Logging](#http-logging)

    You can observe the plugin performing HTTP requests in the logs for both iOS and Android *):

example
:   ```typescript
    ╔═════════════════════════════════════════════
    ║ LocationService: location
    ╠═════════════════════════════════════════════
    ╟─ 📍 Location[45.519199,-73.617054]
    ✅ INSERT: 70727f8b-df7d-48d0-acbd-15f10cacdf33
    ╔═════════════════════════════════════════════
    ║ HTTP Service
    ╠═════════════════════════════════════════════
    ✅ Locked 1 records
    🔵 HTTP POST: 70727f8b-df7d-48d0-acbd-15f10cacdf33
    🔵 Response: 200
    ✅ DESTROY: 70727f8b-df7d-48d0-acbd-15f10cacdf33
    ```

    | # | Log entry | Description |
    | --- | --- | --- |
    | 1 | `📍Location` | Location received from native Location API. |
    | 2 | `✅INSERT` | Location record inserted into SDK's SQLite database. |
    | 3 | `✅Locked` | SDK's HTTP service locks a record (to prevent duplicate HTTP uploads). |
    | 4 | `🔵HTTP POST` | SDK's HTTP service attempts an HTTP request to your configured `url`. |
    | 5 | `🔵Response` | Response from your server. |
    | 6 | `✅DESTROY|UNLOCK` | After your server returns a **`20x`** response, the SDK deletes that record from the database. Otherwise, the SDK will **`UNLOCK`** that record and try again in the future. |

    ---

    [## Controlling the SDK with HTTP Responses (*RPC*)](#controlling-the-sdk-with-http-responses-rpc)

    The SDK has a *"Remote Procedure Call" (RPC)* mechanism, allowing you to invoke commands upon the SDK's API by returing a JSON response from the server containing the key `"background_geolocation": [...]`.

    Within the returned `[...]`, you may return one or more commands to invoke upon the SDK. Each command takes the form of an `[]`, with a required first element `String command`, along with an optional
    second element `Argument:string|boolean|number|Object` depending upon the context of the `command`.

example
:   ```typescript
    {
      "background_geolocation": [
        ["command1", argument:string|boolean|number|Object],
        ["command2"]
        .
        .
        .
      ]
    }
    ```

    The SDK will run each of these commands synchronously upon itself.

    [### Supported RPC Commands](#supported-rpc-commands)

    | Command | Arguments | Description |
    | --- | --- | --- |
    | `start` | None. | `BackgroundGeolocation.start()` |
    | `stop` | None. | `BackgroundGeolocation.stop()` |
    | `startGeofences` | None. | `BackgroundGeolocation.startGeofences()` |
    | `changePace` | `Boolean` | `BackgroundGeolocation.changePace(argument)` |
    | `setConfig` | `{Config}` | `BackgroundGeolocation.setConfig(argument)` |
    | `addGeofence` | `{Geofence}` | `BackgroundGeolocation.addGeofence(argument)` |
    | `addGeofences` | `[{Geofence}, ...]` | `BackgroundGeolocation.addGeofences(argument)` |
    | `removeGeofence` | `identifier:String` | `BackgroundGeolocation.removeGeofence(argument)` |
    | `removeGeofences` | None or `[identifier:String,...]` | `BackgroundGeolocation.removeGeofences(argument)` If provided no argument, remove all; otherwise remove provided list of identifiers |
    | `uploadLog` | `url:String` | The url to upload log to. |
    | `destroyLog` | None | `BackgroundGeolocation.destroyLog` |

    [### Simple Example: `#stop`](#simple-example-stop)

    Your server could return a response telling the SDK to [BackgroundGeolocation.stop]:

example
:   ```typescript
    {
      "background_geolocation": [
        ["stop"]
      ]
    }
    ```

    When returning just a single command, you can optionally omit the root `[ ]`:

example
:   ```typescript
    {
      "background_geolocation": ["stop"]
    }
    ```

    [### Arguments](#arguments)

    The 2nd param to each action is optional but depends upon the context of the command. For example, `#changePace` requires a `boolean` argument:

example
:   ```typescript
    {
      "background_geolocation": [
        ["changePace", true]
      ]
    }
    ```

    [### Object Arguments](#object-arguments)

    Some commands receive an `{ }` argument, like `#setConfig`:

example
:   ```typescript
    {
      "background_geolocation": ["setConfig", {"distanceFilter": 0, "locationUpdateInterval": 1000}]
    }
    ```

    [### Multiple Actions](#multiple-actions)

    You could tell the plugin to both `#start` and `#changePace`:

example
:   ```typescript
    {
      "background_geolocation": [
        ["start"],
        ["changePace", true]
      ]
    }
    ```

### Hierarchy

* HttpEvent

## Index

### Properties

* [responseText]
* [status]
* [success]

## Properties

### responseText

responseText: string



HTTP response text provided by the server.

### status

status: number



HTTP status code (eg: `200`, `500`, `404`).

### success

success: boolean



True if the HTTP request was successful (eg: `200`, `201`, `204`).