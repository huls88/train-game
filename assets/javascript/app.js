var database = firebase.database();

// firebase.database().ref().remove();

// firebase.database().ref().orderByChild('name').equalTo('Another').once('value')
// .then(function(train) {
//   train.remove();
// });

// 2. Button for adding trainloyees
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val();
  var trainDestination = $("#destination-input").val();
  var trainFrequency = $("#frequency-input").val();
  var firstTrain = $("#first-train").val();

  // Creates local object for holding train data
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    frequency: trainFrequency,
    firstTrain: firstTrain
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Alert
  alert("train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input, #destination-input, #frequency-input, #first-train").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  var train = childSnapshot.val();
  // Store everything into a variable.
  var trainName = train.name;
  var trainDestination = train.destination;
  // Calculations
  var firstTrainTime = train.firstTrain;
  var firstTimeValues = firstTrainTime.split(':');
  var firstHours = firstTimeValues[0];
  var firstMinutes = firstHours * 60 + firstTimeValues[1];
  var currentMinutes = moment().format('H') * 60 + moment().format('mm');
  var difference = currentMinutes - firstMinutes;
  var totalTrains = difference % train.frequency;
  // Two dynamic values to show the user
  var minutesAway = train.frequency - totalTrains;
  var arrivalTime = moment().add(minutesAway, 'minutes').format('hh:mm a');

  // Add each train's data into the table
  $("#train-table > tbody").append("<tr>" +
    "<td>" + trainName + "</td>" + "<td>" + trainDestination + "</td>" + "<td>" + train.frequency + "</td>" + "<td>" + firstTrainTime + "</td>" + "<td>" + arrivalTime + "</td>" + "<td>" + minutesAway + "</td>" + "</tr>");
});
