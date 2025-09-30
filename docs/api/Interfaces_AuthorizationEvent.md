The event-object provided to [BackgroundGeolocation.onAuthorization]

example
:   ```typescript
    BackgroundGeolocation.onAuthorization(authorizationEvent => {
      if (authorizationEvent.success) {
                console.log("[authorization] SUCCESS: ", authorizationEvent.response);
            else {
                console.log("[authorization] FAILURE: ", authorizationEvent.error);
            }
    });
    ```

### Hierarchy

* AuthorizationEvent

## Index

### Properties

* [error]
* [response]
* [status]
* [success]

## Properties

### error

error: string



When [success] is `false`, this is the error message from [Authorization.refreshUrl]. Otherwise, `null`.

### response

response: any



when [success] is `true`, this is the decoded JSON response returned from [Authorization.refreshUrl]. Otherwise, `null`.

### status

status: number



HTTP Status returned from your [Authorization.refreshUrl] (or `0` if the HTTP request failed).

### success

success: boolean



`true` when an authorization request to [Authorization.refreshUrl] was successful.