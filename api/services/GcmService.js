var gcm = require('node-gcm');
// Set up the sender with your API key and request options
var API_KEY = 'AIzaSyAeU4hyEzQbJ3t2U-E9-vJoCxL26FLrxXY';
var sender = new gcm.Sender(API_KEY);


/**
 * gcmNotification
 * returns an instance of a GCM notificaiton
 * GCM(Google Cloud Messaging)
 * @param  {string} title - Title of push notification
 * @param  {string} message - push notification message(body)
 * @return {object} gcm.Message instance
 */
function gcmNotification(title, message) {
  return new gcm.Message({
    collapseKey: 'newChatMessage',
    priority: 'high',
    contentAvailable: true,
    delayWhileIdle: true,
    timeToLive: 3,
    notification: {
      'title': title,
      'message': message,
      'body': message,
      'style': 'inbox',
      'icon': 'logo',
      'ledColor': [0, 255, 0, 0],
      'vibrationPattern': [2000, 500, 500],
      'tag': 'newChatMessage'
    }
  });
}


function onSend(err, response) {
  if (err) {
    sails.log.warn('Error while sending push notification', err);
  }
}


/**
 * notification
 * Async function to push notificaitons to devices using
 * GCM(Google Cloud Messaging)
 * @param  {array} registrationTokens - array of push tokens
 * @param  {string} title - Title of push notification
 * @param  {string} message - push notification message(body)
 */
exports.notification = function(notificationUsers , title, message) {
  var retryCount = 10;
  var notification = gcmNotification(title, message);
  // get Android push notification tokens
  var registrationTokens = _.map(notificationUsers, 'androidPushId');
  // Send it to GCM endpoint with modified request options
  sender.send(notification, registrationTokens, retryCount, onSend);
};
