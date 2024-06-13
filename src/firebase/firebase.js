import { getApps , getApp, initializeApp} from 'firebase/app'
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';



const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY  ,
    authDomain: process.env.REACT_APP_AUTHDOMAIN ,
    projectId: process.env.REACT_APP_PROJECTID ,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET ,
    messagingSenderId:process.env.REACT_APP_MESSANGERDID ,
    appId: process.env.REACT_APP_APPID ,
  };

export const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig)

export const auth = getAuth(app);
export const db = getFirestore(app);

