const events = require('events');
const eventEmitter = new events.EventEmitter();

async function setReceiver(event, callback) {
  console.log("setReceiver :: ", event);

  //Assign the event handler to an event:
  eventEmitter.on(event, callback);
}

async function sendEvent(event) {
  console.log("setSender :: ", event);

  eventEmitter.emit(event);
}

module.exports = {
  setReceiver,
  sendEvent
};