// src/awsconfig.js
import Amplify from 'aws-amplify';

Amplify.configure({
  Auth: {
    
    region: 'ap-south-1',

    
    userPoolId: 'ap-south-1_OuayaaITu',

    // OPTIONAL - Amazon Cognito Web Client ID (App Client ID)
    userPoolWebClientId: '486qojqnl26tu4mscnnjn0h8c6',

    // OPTIONAL - Enforce user authentication prior to accessing AWS resources
    mandatorySignIn: true

    
  },
});
