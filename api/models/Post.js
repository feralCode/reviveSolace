/**
 * Post
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
    createdId: {
      type: 'string',
      required: true
    },
    postTitle: {
      type: 'string',
      required: null
    },
    postText: {
      type: 'string',
      required: null
    },
    postType: 'integer',
    likes: {
      collection: 'Like',
      via: 'postSource'
    },
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
