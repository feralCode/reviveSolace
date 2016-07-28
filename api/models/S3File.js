/**
 *
 * Model for uploaded AWS S3 Files
 * @export :: S3File
 *
 */


module.exports = {
  attributes: {
    owner_id: {
      type: 'string',
      required: true
    },
    file_url: 'STRING',
    deleted: {
      type: 'boolean',
      defaultsTo: false
    },
    file_type: 'string'
  }
};
