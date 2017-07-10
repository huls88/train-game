/* global firebase moment */
// Steps to complete:



// 1. Initialize Firebase
var config = {
  apiKey: "AIzaSyAvmk6cm0o_lNFJoBedaXZehp6bzIQ95Lg",
  authDomain: "train-game-d4eac.firebaseapp.com",
  databaseURL: "https://train-game-d4eac.firebaseio.com",
  projectId: "train-game-d4eac",
  storageBucket: "",
  messagingSenderId: "739507928530"
};

firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding trainloyees
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var trainFrequency = moment($("#frequency-input").val().trim(), "minutes").format("X");
  var trainArrival = $("#arrival-input").val().trim();

  // Creates local object for holding train data
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    frequency: trainFrequency,
    arrival: trainArrival
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.frequency);
  console.log(newTrain.arrival);

  // Alert
  alert("train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#frequency-input").val("");
  $("#arrival-input").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainFrequency = childSnapshot.val().frequency;
  var trainArrival = childSnapshot.val().arrival;

  // train Info
  console.log(trainName);
  console.log(trainDestination);
  console.log(trainFrequency);
  console.log(trainArrival);

  // Prettify the train frequency
  var trainFrequencyPretty = moment.unix(trainFrequency).format("minutes");

  // Calculate the Next Arrival using hardcore math
  // To calculate the Next Arrival
  // var trainMonths = moment().diff(moment.unix(trainFrequency, "X"), "months");
  // console.log(trainMonths);

  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
  trainFrequencyPretty + "</td><td>" + trainMonths + "</td><td>" + trainArrival + "</td><td>");
});
