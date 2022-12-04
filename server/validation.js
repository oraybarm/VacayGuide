const {ObjectId} = require('mongodb');

module.exports = {
  checkId(id, varName) {
    if (!id) throw `Error: You must provide a ${varName}`;
    if (typeof id !== 'string') throw `Error:${varName} must be a string`;
    id = id.trim();
    if (id.length === 0)
      throw `Error: ${varName} cannot be an empty string or just spaces`;
    if (!ObjectId.isValid(id)) throw `Error: ${varName} invalid object ID`;
    return id;
  },

  checkString(strVal, varName) {
    if (!strVal) throw `Error: You must supply a ${varName}!`;
    if (typeof strVal !== 'string') throw `Error: ${varName} must be a string!`;
    strVal = strVal.trim();
    if (strVal.length === 0)
      throw `Error: ${varName} cannot be an empty string or string with just spaces`;
    if (!isNaN(strVal))
      throw `Error: ${strVal} is not a valid value for ${varName} as it only contains digits`;
    return strVal;
  },

  checkStringArray(arr, varName) {
    //We will allow an empty array for this,
    //if it's not empty, we will make sure all tags are strings
    let arrayInvalidFlag = false;
    if (!arr || !Array.isArray(arr))
      throw `You must provide an array of ${varName}`;
    for (i in arr) {
      if (typeof arr[i] !== 'string' || arr[i].trim().length === 0) {
        arrayInvalidFlag = true;
        break;
      }
      arr[i] = arr[i].trim();
    }
    if (arrayInvalidFlag)
      throw `One or more elements in ${varName} array is not a string or is an empty string`;
    return arr;
  },

  checkAttendees(attendees) {
    if (!Array.isArray(attendees)) attendees = [];
    if (attendees.length === 0) return attendees;
    attendees.forEach((e) => {
      checkId(e, "AttendeesId");
    });

    return attendees;
  },

  checkEvents(events) {
    if (!Array.isArray(events)) {
      events = [];
    }
    if (events.length !== 0) {
      events.forEach((e) => {
        let { eventId, name, description, cost, startTime, endTime, attendees } = e;
        eventId = checkId(eventId, 'event Id');
        name = checkString(name, "event name");
        description = checkString(description, "event description");
        cost = checkNumber(e.cost);
        startTime = checkDate(startTime, "event start time");
        endTime = checkDate(endTime, "event end time");
        attendees = checkAttendees(attendees);
      });
    }
    return events;
  },

  checkDate(date, varName){
    date = checkString(date,"date");
    let reg = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[1-9]|2[1-9])$/;
    if(!reg.test(date)){
      throw `${varName} has to be in this format: mm/dd/yy format`;
    }
    return date;
  }
};