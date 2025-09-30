The event-object provided to [BackgroundGeolocation.onMotionChange] when the SDK changes state between *moving* and *stationary*.

### Hierarchy

* MotionChangeEvent

## Index

### Properties

* [isMoving]
* [location]

## Properties

### isMoving

isMoving: boolean



`true` when the device has begun *moving* and the SDK engaged location-tracking. `false` when *stationary*.

### location

location: [Location]



The corresponding [Location] where the event occurred.