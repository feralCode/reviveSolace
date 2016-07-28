/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function(req, res, next) {

  // User is allowed, proceed to the next policy,
  // or if this is the last policy, the controller
  var sessionToken = null;
  if (req.param('sessiontoken')) {
    sessionToken = req.param('sessiontoken');
  }
  if (req.body && req.body.sessiontoken) {
    sessionToken = req.body.sessiontoken;
  }
  console.log('sessionToken', sessionToken);
  if (sessionToken) {
    // Check user session based on valid token
    UserSession.findOne({'token': sessionToken}, function(err, session) {

      if (err) return res.send({'success':false,'message':err});

      if (!session) {
        console.log('Invalid Token : '+sessionToken);
        return res.forbidden({'success':false,'message':'You are not Authenticated to perform this action'});
      }

      if (session) {

        User.findOne({'id': session.owner_id}, function(err, user) {

          if (err) {
            return res.forbidden({'success':false,'message':err});
          }

          if (!user) {
            return res.forbidden({'success':false,'message':'no such user'});
          }

          req.session.user = user;

          return next();
        });

      }
    });

  } else {
    return res.forbidden({'success':false,'message':'You are not Authenticated to perform this action'});
  }

};
