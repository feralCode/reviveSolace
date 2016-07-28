/**
 * UserSession
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
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
    tokenOwner: {
      model: 'User'
    },
    issuer: {
      type: 'string',
      enum: ['facebook', 'twitter', 'phone', 'password'],
      required: true,
      defaultsTo: 'password'
    },
    token: {
      type: 'string',
      required: true,
      index: true
    },
    expires: {
      type: 'datetime',
      required: false
    }
  },
  // We don't wan't to send back token
  toJSON: function() {
    var obj = this.toObject();
    delete obj.token;
    return obj;
  }

};
