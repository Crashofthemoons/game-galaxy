"use strict";

angular.module("GameGalaxy").factory("UserFactory", (FBUrl, $http, $q) => {

  function addNewUser(userObject) {
    return $q((resolve, reject) => {
      $http
        .post(`${FBUrl}/users.json`, JSON.stringify(userObject))
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  function updateUser(key, userObject) {
    return $q((resolve, reject) => {
      $http
        .put(`${FBUrl}/users/${key}.json`, JSON.stringify(userObject))
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  function getAllUsers() {
    return $q((resolve,reject) => {
      $http.get(`${FBUrl}/users.json`)
      .then(({ data }) => {
        let usersArr = Object.keys(data).map(userKey => {
          data[userKey].id = userKey;
          return (data[userKey]);
        });
        resolve(Object.values(data));
      })
      .catch(error => {
        reject(error);
      });
    });
  }

  function getSingleUser(key) {
    return $q((resolve,reject) => {
      $http.get(`${FBUrl}/users/${key}.json`)
      .then(({ data }) => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
    });
  }

  function checkForUser(uid) {
    return $q((resolve,reject) => {
      $http.get(`${FBUrl}/users.json?orderBy="uid"&equalTo="${uid}"`)
      .then(({ data }) => {
        let userArr = Object.keys(data).map(userKey => {
          data[userKey].key = userKey;
          return (data[userKey]);
        }); 
        resolve(Object.values(data));
      })
      .catch(error => {
        reject(error);
      });
    });
  }

  function checkForUserNoArray(uid) {
    return $q((resolve,reject) => {
      $http.get(`${FBUrl}/users.json?orderBy="uid"&equalTo="${uid}"`)
      .then(({ data }) => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
    });
  }

  function getFriends(key) {
    return $q((resolve,reject) => {
      $http.get(`${FBUrl}/users/${key}/friends.json`)
      .then(({ data }) => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
    });
  }

  function updateFriends(key, newFriendsArray) {
    return $q((resolve,reject) => {
      $http.put(`${FBUrl}/users/${key}/friends.json`, JSON.stringify(newFriendsArray))
      .then(({ data }) => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
    });
  }

  function deleteFriend(key, requestID) {
    return $q((resolve,reject) => {
      $http.delete(`${FBUrl}/users/${key}/friends/${requestID}.json`)
      .then(() => {
        resolve();
      })
      .catch(error => {
        reject(error);
      });
    });
  }

  function getRequests(key) {
    return $q((resolve,reject) => {
      $http.get(`${FBUrl}/users/${key}/requests.json`)
      .then(({ data }) => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
    });
  }

  function addRequests(key, newRequestArray) {
    return $q((resolve,reject) => {
      $http.put(`${FBUrl}/users/${key}/requests.json`, JSON.stringify(newRequestArray))
      .then(({ data }) => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
    });
  }

  function deleteRequest(key, requestID) {
    return $q((resolve,reject) => {
      $http.delete(`${FBUrl}/users/${key}/requests/${requestID}.json`)
      .then(() => {
        resolve();
      })
      .catch(error => {
        reject(error);
      });
    });
  }

  return { addNewUser, getAllUsers, getSingleUser, checkForUser, updateUser, getFriends, checkForUserNoArray, getRequests, addRequests, deleteRequest, updateFriends, deleteFriend };

});