/**
 * UsersController
 *
 * @module      :: Controller
 * @description :: Contains logic for handling requests.
 */

var bcrypt = require('bcrypt-nodejs');

/**
 * createRandomString
 * returns random string given length
 *   defaults to 32 characters
 * @param  {integer} length - lenght of random string
 * @return {string} random string
 */
function createRandomString(length) {
  var stringLength = length || 32;
  var randStr = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
      'abcdefghijklmnopqrstuvwxyz' +
      '0123456789';
  for (var i = 0; i < stringLength; i++) {
    var ranNum = Math.random();
    randStr += possible.charAt(Math.floor(ranNum * possible.length));
  }
  return randStr;
}


/**
 * createNewSession
 * creates a new session for user
 * @param  {string} userId - userId of session owner
 * @param  {string} issuer - type of issuer
 * @param  {string} token - user session token
 * @return {object} returns a promise from session creation
 */
function createSession(userId, issuer, token) {
  // if token not specified create one for user
  var tokenString  = token || createRandomString(32);
  return UserSession.create({
    tokenOwner: userId,
    issuer: issuer,
    token: tokenString,
    expires: null
  });
}


/**
 * udpateUserById
 * Updoate given user by userId
 * @param  {userId} userId - userId of user to be updated
 * @param  {object} userData - data to update on user
 * @return {object} returns a promise for user update
 */
function udpateUserById(userId, userData) {
  return User.update({id: userId}, userData);
}


/**
 * cleanUser
 * returns a user object with only public data
 * @param  {object} user - user object
 * @return {object} returns a cleaned version of user
 */
function cleanUser(user) {
  var propertiesToPick = [
    'id',
    'email',
    'firstName',
    'lastName',
    'address',
    'city',
    'state',
    'zip',
    'bio',
    'intro',
    'username',
    'profileImageUri'];
  return  _.pick(user, propertiesToPick);
}




function signUp(req, res) {
  console.log('UserController.js: user login request');
  console.log(req.body);

  var sessionPayload = {};
  sessionPayload.issuer = null;
  sessionPayload.token = null;
  var propertiesToPick =  [
    'email',
    'firstName',
    'lastName',
    'address',
    'city',
    'state',
    'zip',
    'username',
    'profileImageUri'];
  var userPayload = _.pick(req.body, propertiesToPick);

  if (req.body.issuer === 'email') {
    sessionPayload.issuer = 'email';
    userPayload.password = bcrypt.hashSync(req.body.password);
  }
  else if (req.body.issuer === 'facebook') {
    sessionPayload.issuer = 'facebook';
    userPayload.password = bcrypt.hashSync(req.body.facebookId);
    token = req.body.token;
  } else {
    return res.send({
      'success': false,
      'message': 'error creating new user'
    });
  }

  User.create(userPayload)
      .then(function(user) {
        console.log('User created successfully '
            + user.firstName + ' ' + user.lastName);
        createSession(user.id, sessionPayload.issuer, sessionPayload.token)
            .then(function(session) {
              return res.send({
                'success' : true,
                'session' : session,
                'user' : user
              });
            })
            .catch(function onErr(err) {
              console.log('error while creating new session : '
                  + JSON.stringify(err));
              if (err) return res.send({
                'success': false,
                'message': err
              });
            });
      })
      .catch(function onErr(err) {
        console.log('error while creating new user : '
            + JSON.stringify(err));
        if (err) return res.send({
          'success': false,
          'message': err
        });
      });
}

function resetNotificationCount(req, res) {
  var userID = req.session.user.id;
  var userPayload = {
    notificationCount: 0
  };
  udpateUserById(userID, userPayload)
      .then(function onUserUpdate(user) {
        return res.send({
          'success' : true,
          'user' : user
        });
      })
      .catch(function onUserUpdateErr(err) {
        console.log('Error occurred while updating user ' + userId);
        console.log(err);
        return res.send({
          'success': false,
          'message': err
        });
      });
}

function resetUnreadCount(req, res) {
  var userID = req.session.user.id;
  var userPayload = {
    unreadCount: 0
  };
  udpateUserById(userID, userPayload)
      .then(function onUserUpdate(user) {
        return res.send({
          'success' : true,
          'user' : user
        });
      })
      .catch(function onUserUpdateErr(err) {
        console.log('Error occurred while updating user ' + userId);
        console.log(err);
        return res.send({
          'success': false,
          'message': err
        });
      });
}


function update(req, res) {
  var userId = req.session.user.id;
  var propertiesToUpdate =  [
    'email',
    'firstName',
    'lastName',
    'address',
    'city',
    'state',
    'zip',
    'username',
    'profileImageUri',
    'bio',
    'intro'];
  var userPayload = _.pick(req.body, propertiesToUpdate);

  udpateUserById(userId, userPayload)
      .then(function onUserUpdate(user) {
        return res.send({
          'success' : true,
          'user' : user
        });
      })
      .catch(function onUserUpdateErr(err) {
        console.log('Error occurred while updating user ' + userId);
        console.log(err);
        return res.send({
          'success': false,
          'message': err
        });
      });
}

function login(req, res) {
  var issuer = req.body.issuer;
  var email = req.body.email;
  var hashedPassword = null;
  var token = null;
  if (issuer === 'email') {
    email = req.body.email;
    hashedPassword = bcrypt.hashSync(req.body.password);
  }
  else if (req.body.issuer === 'facebook') {
    email = req.body.email;
    hashedPassword = bcrypt.hashSync(req.body.facebookId);
  }
  else {
    return res.send({
      'success': false,
      'message': 'email or password incorrect'
    });
  }

  User.findOne({email: email, password: hashedPassword})
      .then(function onUserLogin(user) {
        console.log('User logged successfully '
            + user.firstName + ' ' + user.lastName);
        createSession(user.id, issuer, token)
            .then(function(session) {
              return res.send({
                'success' : true,
                'session' : session,
                'user' : user.toJSON()
              });
            })
            .catch(function onErr(err) {
              console.log('error while creating new session : '
                  + JSON.stringify(err));
              return res.send({
                'success': false,
                'message': err
              });
            });
      });

}



module.exports = {

  update: update,

  resetUnreadCount: resetUnreadCount,

  resetNotificationCount: resetNotificationCount,

  signUp: signUp,

  login:  login
};
