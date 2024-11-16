export const jsonSchema ={
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Customizable Schedule Schema",
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "description": "Name of the schedule"
    },
    "description": {
      "type": "string",
      "description": "Description of the schedule"
    },
    "timezone": {
      "type": "string",
      "description": "Timezone for the schedule, e.g., 'UTC', 'America/New_York'",
      "default": "UTC"
    },
    "allowCustomization": {
      "type": "boolean",
      "description": "Allow users to customize the schedule",
      "default": true
    },
    "events": {
      "type": "array",
      "description": "List of events in the schedule",
      "items": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "description": "Unique identifier for the event"
          },
          "title": {
            "type": "string",
            "description": "Title of the event"
          },
          "description": {
            "type": "string",
            "description": "Detailed description of the event"
          },
          "start": {
            "type": "string",
            "format": "date-time",
            "description": "Start date and time of the event in ISO 8601 format"
          },
          "end": {
            "type": "string",
            "format": "date-time",
            "description": "End date and time of the event in ISO 8601 format"
          },
          "isAllDay": {
            "type": "boolean",
            "description": "Indicates if the event spans the entire day",
            "default": false
          },
          "location": {
            "type": "string",
            "description": "Location where the event will be held"
          },
          "recurrence": {
            "type": "object",
            "description": "Recurrence settings for repeating events",
            "properties": {
              "frequency": {
                "type": "string",
                "enum": ["daily", "weekly", "monthly", "yearly"],
                "description": "Recurrence frequency"
              },
              "interval": {
                "type": "integer",
                "description": "Interval between recurrences (e.g., every 2 days)"
              },
              "byDay": {
                "type": "array",
                "items": {
                  "type": "string",
                  "enum": ["MO", "TU", "WE", "TH", "FR", "SA", "SU"]
                },
                "description": "Days of the week on which the event repeats"
              },
              "endDate": {
                "type": "string",
                "format": "date-time",
                "description": "Date when the recurrence ends"
              }
            }
          },
          "color": {
            "type": "string",
            "description": "Color code for the event"
          },
          "priority": {
            "type": "string",
            "enum": ["low", "medium", "high"],
            "description": "Priority level of the event"
          },
          "customFields": {
            "type": "object",
            "description": "Custom fields for additional metadata",
            "additionalProperties": {
              "type": ["string", "number", "boolean", "array", "object"]
            }
          }
        },
        "required": ["id", "title", "start", "end"]
      }
    },
    "defaultView": {
      "type": "string",
      "description": "Default view for displaying the schedule",
      "enum": ["agenda", "calendar", "list"]
    },
    "colorTheme": {
      "type": "string",
      "description": "Color theme for displaying the schedule",
      "enum": ["light", "dark", "system"]
    }
  },
  "required": ["name", "events"]
}
