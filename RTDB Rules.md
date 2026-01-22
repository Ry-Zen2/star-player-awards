{
  "rules": {
    "sessions": {
      "$session": {
        ".read": true,
        // allow writes only to known top-level children
        ".write": "newData.hasChildren(['phase','team','votes','votedBy']) || (newData.child('pin').isString() || newData.child('pinEnabled').isBoolean())"
      }
    }
  }
}