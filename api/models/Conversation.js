/**
 * Conversations
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
    creatorId: {
      type: 'string',
      required: true
    },
    conversationId: {
      type: 'string',
      defaultsTo: function() {
        return uuid.v4();
      }
    },
    participant: {
      model: 'User'
    },
    messages: {
      model: 'Message',
      via: 'id'
    }
  }

};
