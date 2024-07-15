// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { FirebaseApp } from '@angular/fire/app';

// Your web app's Firebase configuration
let firebaseConfig = {
  apiKey: 'AIzaSyBHOCPeP-NJbeG1SKw4OAoiTRyo_9FC3hA',
  authDomain: 'learnprojectangular.firebaseapp.com',
  projectId: 'learnprojectangular',
  storageBucket: 'learnprojectangular.appspot.com',
  messagingSenderId: '100503995263',
  appId: '1:100503995263:web:d84518aa76078ae671504a',
};

const app: FirebaseApp = initializeApp(firebaseConfig);

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyBHOCPeP-NJbeG1SKw4OAoiTRyo_9FC3hA',
    authDomain: 'learnprojectangular.firebaseapp.com',
    projectId: 'learnprojectangular',
    storageBucket: 'learnprojectangular.appspot.com',
    messagingSenderId: '100503995263',
    appId: '1:100503995263:web:d84518aa76078ae671504a',
  },
};
