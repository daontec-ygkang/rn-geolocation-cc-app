An object for redirecting a User to an Android device's settings screen from a [DeviceSettings] request.

This object contains meta-data about the device , [version]) in addition to a flag [seen] to let you know if you've
already shown some particular screen to the user. [lastSeenAt] lets you know the `DateTime` you last showed a particular screen to the user.

### Hierarchy

* DeviceSettingsRequest

## Index

### Properties

* [action]
* [lastSeenAt]
* [manufacturer]
* [model]
* [seen]
* [version]

## Properties

### action

action: string



The settings screen to be shown.

⚠️ This property is set automatically.

### lastSeenAt

lastSeenAt: Date



The [DateTime] you last showed this screen to the user.

### manufacturer

manufacturer: string



Device manufacturer.

### model

model: string



Device model

### seen

seen: boolean



Flag showing whether you've already shown this screen to the user.

### version

version: string



OS version