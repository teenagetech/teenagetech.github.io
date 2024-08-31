import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyCAAIxwAqHedBT3c1fuTUkaDBxQ0MaKsRE",
  authDomain: "teenage-tech.firebaseapp.com",
  projectId: "teenage-tech",
  storageBucket: "teenage-tech.appspot.com",
  messagingSenderId: "8796698339",
  appId: "1:8796698339:web:ab9388605c5d7d6c0577d6",
  measurementId: "G-N7Q05TGCJ6"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
