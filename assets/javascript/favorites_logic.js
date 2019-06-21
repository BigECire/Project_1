$(document).ready(function () {
    var firebaseConfig = {
        apiKey: "AIzaSyAwm3an_SCy28O5q45B80DdKc0NDmXC-9k",
        authDomain: "time-for-a-drink.firebaseapp.com",
        databaseURL: "https://time-for-a-drink.firebaseio.com",
        projectId: "time-for-a-drink",
        storageBucket: "time-for-a-drink.appspot.com",
        messagingSenderId: "549694223569",
        appId: "1:549694223569:web:17b82da5b0a4183a"
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);

      var database = firebase.database();

      console.log(database.ref("drinkData"))
      
})