/**
 * Event
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
    title: {
      type: 'string',
      index: true
    },
    description: 'string',
    gymId: {
      type: 'string',
      index: true
    },
    category: 'string',
    categoryId: 'string',
    trainer: 'string',
    trainerId: 'string',
    startDate: {
      type: 'datetime',
      required: true,
      index: true
    },
    endDate: {
      type: 'datetime',
      required: false
    }
  }

};

