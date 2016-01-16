import Firebase from 'firebase';

let rootUrl = "https://react-slack.firebaseio.com/";
let ref = new Firebase(rootUrl);

module.exports = {

  login(userObj) {
    return authWithPassword(userObj);
  },

  logout() {
    ref.unauth();
  },

  loggedIn() {
    return ref.getAuth() ? true : false;
  },

  register(userObj) {
    return createUserAndLogin(userObj);
  }
}

function authWithPassword(userObj) {
  let promise = new Promise((resolve, reject) =>
    ref.authWithPassword(userObj, function(error, authData){
      if (error){
        reject(error);
      }
      else {
        resolve(authData);
      }
    })
  );

  return promise;
}

function createUserAndLogin(userObj) {
  return createUser(userObj)
    .then(function () {
    return authWithPassword(userObj);
  });
}

function createUser(userObj) {
  let promise = new Promise((resolve, reject) =>
    ref.createUser(userObj, function(error) {
      if (error){
        reject(error);
      }
      else {
        resolve();
      }
    })
  );

  return promise;
}
