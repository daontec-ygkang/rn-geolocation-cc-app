This object is attached to instances of [Location.coords].

### Hierarchy

* Coords

## Index

### Properties

* [accuracy]
* [altitude]
* [altitude\_accuracy]
* [ellipsoidal\_altitude]
* [floor]
* [heading]
* [heading\_accuracy]
* [latitude]
* [longitude]
* [speed]
* [speed\_accuracy]

## Properties

### accuracy

accuracy: number



Accuracy in meters.

### Optional altitude

altitude: number



[iOS] Altitude above sea-level in meters.
[Android] The altitude of this location in meters above the WGS84 reference ellipsoid.

* See [ellipsoidal\_altitude]

### Optional altitude\_accuracy

altitude\_accuracy: number



Altitude accuracy in meters.

If this location does not have `altitude_accuracy`, then `-1` is returned.

[## iOS](#ios)

When this property contains 0 or a positive number, the value in the altitude property is plus or minus the specified number of meters. When this property contains a negative number, the value in the altitude property is invalid.

Determining the [altitudeAccuracy] requires a device with GPS capabilities. Thus, on some devices, this property always contains a negative value.

[## Android](#android)

Android defines vertical accuracy at 68% confidence. Specifically, as 1-side of the 2-sided range above and below the estimated altitude reported by [altitude], within which there is a 68% probability of finding the true altitude.

In the case where the underlying distribution is assumed Gaussian normal, this would be considered 1 standard deviation.

For example, if [altitude] returns `150`, and [verticalAccuracy] returns `20` then there is a 68% probability of the true altitude being between `130` and `170` meters.

### Optional ellipsoidal\_altitude

ellipsoidal\_altitude: number



The altitude of this location in meters above the WGS84 reference ellipsoid.

### Optional floor

floor: number



**[iOS Only]** When the environment contains indoor-tracking hardware (eg: bluetooth beacons) the current floor within a building.

### Optional heading

heading: number



Heading in degrees.
⚠️ Note: Only present when location came from GPS. `-1` otherwise.

### Optional heading\_accuracy

heading\_accuracy: number



Heading accuracy in degrees.
⚠️ Note: Only present when location came from GPS. `-1` otherwise.

### latitude

latitude: number



Latitude of the location.

### longitude

longitude: number



Longitude of the location.

### Optional speed

speed: number



Speed in meters / second.
⚠️ Note: Only present when location came from GPS. `-1` otherwise.

### Optional speed\_accuracy

speed\_accuracy: number



Speed accuracy in meters / second.
⚠️ Note: Only present when location came from GPS. `-1` otherwise.