/**
 * Friends
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
    userId: {
      type: 'text',
      required: true
    },
    friendId: {
      model: 'User'
    },
    blocked: {
      type: 'boolean',
      defaultsTo: false
    },
    ignored: {
      type: 'boolean',
      defaultsTo: false
    },
    accepted: {
      type: 'boolean',
      defaultsTo: false
    },
    autoPK: true
  }

};
