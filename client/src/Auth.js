// src/Auth.js
import {
    CognitoUserPool,
    CognitoUser,
    AuthenticationDetails,
  } from 'amazon-cognito-identity-js';
  import AWS from 'aws-sdk';
  import awsConfig from './awsconfig';
  
  const userPool = new CognitoUserPool({
    UserPoolId: awsConfig.UserPoolId,
    ClientId: awsConfig.ClientId,
  });
  
  export function signUp(email, password) {
    return new Promise((resolve, reject) => {
      userPool.signUp(email, password, [], null, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.user);
        }
      });
    });
  }
  
  export function confirmAccount(email, code) {
    const userData = {
      Username: email,
      Pool: userPool,
    };
    const cognitoUser = new CognitoUser(userData);
    return new Promise((resolve, reject) => {
      cognitoUser.confirmRegistration(code, true, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
  
  export function signIn(email, password) {
    const authenticationData = {
      Username: email,
      Password: password,
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);
    const userData = {
      Username: email,
      Pool: userPool,
    };
    const cognitoUser = new CognitoUser(userData);
    return new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          // Set credentials for accessing AWS resources if needed
          AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: awsConfig.IdentityPoolId,
            Logins: {
              [`cognito-idp.${awsConfig.region}.amazonaws.com/${awsConfig.UserPoolId}`]: result
                .getIdToken()
                .getJwtToken(),
            },
          });
          resolve(result);
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  }
  
  export function signOut() {
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser) {
      cognitoUser.signOut();
    }
  }
  
  export function getCurrentUser() {
    return userPool.getCurrentUser();
  }
  