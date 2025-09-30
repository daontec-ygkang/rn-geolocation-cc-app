**`[iOS only]`** Controls the text-elements of the plugin's location-authorization dialog.

When you configure the plugin [locationAuthorizationRequest] **`Always`** or **`WhenInUse`** and the user *changes* the mode in the app's location-services settings or disabled location-services, the plugin will display an Alert dialog directing the user to the **Settings** screen. **`locationAuthorizationAlert`** allows you to configure all the Strings for that Alert popup and accepts an `{}` containing the following keys:

![]

### Hierarchy

* LocationAuthorizationAlert

## Index

### Properties

* [cancelButton]
* [instructions]
* [settingsButton]
* [titleWhenNotEnabled]
* [titleWhenOff]

## Properties

### cancelButton

cancelButton: string



Cancel button label.

Defaults to `Cancel`.

### instructions

instructions: string



The body text of the alert.

Defaults to: `To use background location, you must enable {locationAuthorizationRequest} in the Location Services settings`.

### settingsButton

settingsButton: string



Settings button label.

Defaults to `Settings`.

### titleWhenNotEnabled

titleWhenNotEnabled: string



The title of the alert when user disables location-services or changes the authorization request to `Never`.

Defaults to `Background location is not enabled`.

### titleWhenOff

titleWhenOff: string



The title of the alert if user changes, for example, the location-request to `WhenInUse` when you requested `Always`.

Defaults to `Location services are off`.