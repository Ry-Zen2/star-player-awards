{
  "rules": {
    "sessions": {
      "main": {
        ".read": true,
        ".write": false,
        "phase": { ".write": "newData.isString()" },
        "team": {
          ".write": true,
          "$i": {
            ".validate": "newData.hasChildren(['name','initials','status'])"
          }
        },
        "votes": {
          ".write": true,
          "$initials": { ".validate": "newData.isNumber()" }
        },
        "votedBy": {
          ".write": true,
          "$initials": { ".validate": "newData.isBoolean()" }
        },
        "pin": { ".write": false },
        "pinEnabled": { ".write": "newData.val() === false" },
        "revealStartAt": { ".write": "newData.isNumber() || newData.val() === null" }
      },
      "$other": { ".read": false, ".write": false }
    }
  }
}
