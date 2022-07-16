import firebase, { initializeApp} from 'firebase/app'
import { getStorage } from "firebase/storage";

import 'firebase/storage'
const firebaseConfig = {
    apiKey: "AIzaSyBmG3Sw8qEN-5O-nxyWWyeYHb70vtH-wIQ",
    authDomain: "onlinecourse-704d6.firebaseapp.com",
    projectId: "onlinecourse-704d6",
    storageBucket: "onlinecourse-704d6.appspot.com",
    messagingSenderId: "599574824224",
    appId: "1:599574824224:web:f53baa52d1c8cdf3bb0345"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export default firebase;
