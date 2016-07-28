/**
  *
  * User  Model
  * Revive application user model
  * @export  model.exports
  *
  */

var uuid = require('node-uuid');

module.exports = {

  attributes: {
    id: {
      type: 'text',
      primaryKey: true,
      unique: true,
      defaultsTo: function() {
        return uuid.v4();
      }
    },
    username: {
      type: 'string',
      unique: true
    },
    firstName: 'string',
    lastName: 'string',
    profileImageUri: 'string',
    email: {
      type: 'email',
      unique: true,
      index: true
    },
    bio: {
      type: 'text',
      defaultsTo: null
    },
    intro: {
      type: 'longtext',
      defaultsTo: null
    },
    phone: {
      type: 'string',
      unique: false,
      minLength: 7,
      maxLength: 12,
      index: true
    },
    password: {
      type: '.string',
      minLength: 7,
      maxLength: 40
    },
    apiCalls: {
      type: 'integer',
      defaultsTo: 0
    },
    address: 'string',
    city: 'string',
    state: 'string',
    zip: 'string',
    verified: {
      type: 'boolean',
      defaultsTo: false
    },
    facebookId: {
      type: 'string',
      defaultsTo: null
    },
    disabled: {
      type: 'boolean',
      defaultsTo: false
    },
    trainer: {
      type: 'boolean',
      defaultsTo: false
    },
    admin: {
      type: 'boolean',
      defaultsTo: false
    },
    notificationCount: {
      type: 'integer',
      defaultsTo: 0
    },
    unreadCount: {
      type: 'integer',
      defaultsTo: 0
    },
    friendRequestCount: {
      type: 'integer',
      defaultsTo: 0
    },

    // We don't wan't to send server logic data
    toJSON: function() {
      var obj = this.toObject();
      //delete obj.phone;
      delete obj.admin;
      delete obj.disabled;
      delete obj.verified;
      delete obj.password;
      delete obj.facebookId;
      delete obj.apiCalls;
      return obj;
    }

  }

};
