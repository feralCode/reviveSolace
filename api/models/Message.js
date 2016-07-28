/**
 * Message
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
    conversationId: {
      model: 'Conversation',
      required: true
    },
    sender: {
      model: 'User'
    },
    messageText: {
      type: 'string',
      required: true
    },
    messageType: 'integer',
    uri: {
      type: 'string',
      required: false,
      defaultsTo: null
    },
    flagged: {
      type: 'boolean',
      defaultsTo: false
    },
    spam: {
      type: 'boolean',
      defaultsTo: false
    },
    deleted: {
      type: 'boolean',
      defaultsTo: false
    }
  }

};
