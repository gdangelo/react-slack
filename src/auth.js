import Firebase from 'firebase';

let rootUrl = "https://react-slack.firebaseio.com/";
let ref = new Firebase(rootUrl);

module.exports = {

  login(userObj) {
    return authWithPassword(userObj);
  },

  logout(cb) {
    ref.unauth();
    if (typeof cb == "function"){
      cb();
    }
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
        let isNewUser = ref.child("users").child(authData.uid) ? true : false;
        if (isNewUser){
          // save the user's profile into the database so we can list users,
          // use them in Security and Firebase Rules, and show profiles
          ref.child("users").child(authData.uid).set({
            provider: authData.provider,
            name: getName(authData)
          });
        }

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
    ref.createUser(userObj, function(error, authData) {
      if (error) {
        switch (error.code) {
          case "EMAIL_TAKEN":
            reject("The new user account cannot be created because the email is already in use.");
            break;
          case "INVALID_EMAIL":
            reject("The specified email is not a valid email.");
            break;
          default:
            reject("Error creating user:", error);
        }
      } else {
        console.log("Successfully created user account with uid:", authData.uid);
        resolve();
      }
    })
  );

  return promise;
}

// find a suitable name based on the meta info given by each provider
function getName(authData) {
  switch(authData.provider) {
     case 'password':
       return authData.password.email.replace(/@.*/, '');
     case 'twitter':
       return authData.twitter.displayName;
     case 'facebook':
       return authData.facebook.displayName;
  }
}
