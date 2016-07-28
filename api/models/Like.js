module.exports = {

  attributes: {
    user_id: {
      type: 'string',
      required: true
    },
    postSource: {
      model: 'Post'
    }
  }

};
