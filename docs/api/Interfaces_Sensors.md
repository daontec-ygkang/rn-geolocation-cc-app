Detected device sensors related to motion-detection.

### Hierarchy

* Sensors

## Index

### Properties

* [accelerometer]
* [gyroscope]
* [magnetometer]
* [motion\_hardware]
* [platform]
* [significant\_motion]

## Properties

### accelerometer

accelerometer: boolean



`true` when the device has an accelerometer.

### gyroscope

gyroscope: boolean



`true` when the device has a gyroscope.

### magnetometer

magnetometer: boolean



`true` when the device has a magnetometer (compass).

### Optional motion\_hardware

motion\_hardware: boolean



**[iOS only]** `true` when the device has an **M7** motion co-processor (iPhone 5S and up).

### platform

platform: string



`ios` | `android`

### Optional significant\_motion

significant\_motion: boolean



**[Android only]** `true` when the Android device has significant motion hardware.