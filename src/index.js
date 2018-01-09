import React from 'react'
import ReactDOM from 'react-dom'
import * as firebase from 'firebase'

import App from './App'


const config = {
    apiKey: "AIzaSyDA3OKvkpat-9LFYSG0GnfY2xrfpLmz4aE",
    authDomain: "micetro-poeng.firebaseapp.com",
    databaseURL: "https://micetro-poeng.firebaseio.com",
    projectId: "micetro-poeng",
    storageBucket: "micetro-poeng.appspot.com",
    messagingSenderId: "38039570025"
  }
firebase.initializeApp(config)

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
