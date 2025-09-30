The event-object provided to [BackgroundGeolocation.onActivityChange].

example
:   ```typescript
    BackgroundGeolocation.onActivityChange(activityChangeEvent => {
      console.log("[activitychange] ", activityChangeEvent.activity, activityChangeEvent.confidence);
    });
    ```

### Hierarchy

* MotionActivityEvent

## Index

### Properties

* [activity]
* [confidence]

## Properties

### activity

activity: [MotionActivityType]



The reported device motion activity.

| Activity Name |
| --- |
| `still` |
| `walking` |
| `on_foot` |
| `running` |
| `on_bicycle` |
| `in_vehicle` |
| `unknown` |

### confidence

confidence: number



Confidence of the reported device motion activity in %.