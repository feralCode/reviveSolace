var apn = require('apn');

// Initialize APNS connection to apple  with certs
var connectionOptions = {
  'cert': __dirname + '/apn/cert.pem',
  'key': __dirname + '/apn/key.pem',
  'gateway': 'gateway.push.apple.com'
};
var apnConnection = new apn.Connection(connectionOptions);
apnConnection.on('connected', function() {
  sails.log.info('Apple push notification service : Connected Successfully');
});
apnConnection.on('transmitted', function(notification, device) {
  sails.log.info('Apple push notification service :');
  sails.log.info('notification transmitted to: ', device.token);
});
apnConnection.on('transmissionError', function(errCode, notification, device) {
  sails.log.error('Apple push notification service : Notification caused error: ' +
      errCode + ' for device ', device, notification);
});
apnConnection.on('timeout', function() {
  sails.log.error('Apple Push Notificaiton Service - Timeout');
});
apnConnection.on('disconnected', function() {
  sails.log.error('Apple Push Notificaiton - Disconnected from APNS');
});
apnConnection.on('socketError', sails.log.warn);


// Initialize APNS feedback connection
var feedbackOptions = {
  // "batchFeedback": true,
  'interval': 60,
  'address': 'feedback.push.apple.com',
  'cert': __dirname + '/apn/cert.pem',
  'key': __dirname + '/apn/key.pem'
};
var feedback = new apn.Feedback(feedbackOptions);

feedback.on('feedback', function(devices) {
  devices.forEach(function(item) {
    // Do something with item.device and item.time;
    sails.log.warn('Apple Push Notificaiton Service : ' +
        'push notification not delivered to ' + item.device);
  });
});
feedback.on('newListener', function() {
  sails.log.info('Apple push notification service : ' +
      'new listener to feedback service added');
});


/**
 * apmNotification
 * returns an instance of a APN notificaiton
 * APNS(Apple Push Notificaiton Service)
 * @param  {string} title - Title of push notification
 * @param  {string} message - push notification message(body)
 * @return {object} apn.Notification() instance
 */
function apmNotification(title, message, badgeCount) {
  // Message expiration time - 1 hour from now
  var _expirationTime = Math.floor(Date.now()/ 1000) + 3600;
  var _soundFile = 'ping.aiff';
  var _badgeCount = badgeCount || 0;

  // Create new notification
  var note = new apn.Notification();
  note.expiry = _expirationTime;
  note.badge = _badgeCount;
  note.sound = _soundFile;

  note.alert = String(message);

  note.payload = {
    'type': 'message',
    'title': title,
    'body': message
  };
  return note;
}


/**
 * notification
 * Async function to push notificaitons to devices using
 * GCM(Google Cloud Messaging)
 * @param  {array} notificationUsers - array of users to be notified
 * @param  {string} title - Title of push notification
 * @param  {string} message - push notification message(body)
 */
exports.notification = function(notificationUsers, title, message) {
  // create push message
  try {
    async.each(notificationUsers, function iterator(usr) {
      // create notification
      var notification = apmNotification(title, message, usr.badge_count);
      // create device instance
      var device = new apn.Device(usr.applePushId);
      // send notification to device
      apnConnection.pushNotification(notification, device);
    });
  } catch(e) {
    sails.log.error('ApnService Error:');
    sails.log.error(e);
  }
};


