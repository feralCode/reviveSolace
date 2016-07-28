/**
 * EventController
 *
 * @module      :: Controller
 * @description :: Contains logic for handling requests.
 */


/**
 * getEventByTitle
 * @param  {string} queryString - search query for events
 * @param  {integer} limit - optional limit to search results, default 20
 * @return {object} returns a promise with event search results
 */
function getEventByTitle(queryString, limit) {
  var regSearch = '%' + queryString + '%';
  var qry = {
    where: {
      title: {
        'like': regSearch
      }
    },
    limit: limit || 20,
    sort: 'startDate DESC'
  };
  return Event.find(qry);
}


/**
 * getEvent
 * @param  {integer} limit - optional limit to search results, default 20
 * @return {object} returns a promise with event search results
 */
function getEvent(limit) {
  var qry = {
    where: {},
    limit: limit || 20,
    sort: 'startDate DESC'
  };
  return Event.find(qry);
}


function searchEvents(req, res) {
  var queryString = req.param('query');
  var limit = req.param('limit') || 0;
  console.log('queryString', queryString);

  if(!queryString || queryString === null || queryString === '' || queryString === undefined) {
    console.log('getLastEvents called');
    getEvent(limit)
        .then(function onResults(results) {
          console.log(results);
          return res.send({
            'success' : true,
            'events' : results
          })
        })
        .catch(function onSearchErr(e) {
          console.log('Error searching Events');
          console.log(e);
          console.log(JSON.stringify(e));

          return res.send({
            'success' : false,
            'message' : 'Error searching Events',
            'error'   : e
          })
        });
  }
  console.log(queryString);
  getEventByTitle(queryString, limit)
      .then(function onResults(results) {
        console.log(results);
        return res.send({
          'success' : true,
          'events' : results
        })
      })
      .catch(function onSearchErr(e) {
        console.log('Error searching Events');
        console.log(e);
        console.log(JSON.stringify(e));

        return res.send({
          'success' : false,
          'message' : 'Error searching Events',
          'error'   : e
        })
      });
}




module.exports = {

  searchEvents: searchEvents
};
