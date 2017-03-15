// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDtOS8lBUTF9Sw_YnMk0NYhinDUXfuMDUI",
    authDomain: "trainscheduler-83625.firebaseapp.com",
    databaseURL: "https://trainscheduler-83625.firebaseio.com",
    storageBucket: "trainscheduler-83625.appspot.com",
    messagingSenderId: "70214044005"
  };
  firebase.initializeApp(config);

// Reference the database
var database = firebase.database();

// Button for adding Train
$("#submit-train-btn").on("click", function(event) {
 	console.log('Click');
 	event.preventDefault();

 	// Grabs user input
 	var trainName = $("#train-name-input").val().trim();
	var trainDestination = $("#destination-input").val().trim();
	var trainFrequency = $("#frequency-input").val().trim();
	var trainTime = $("#train-time-input").val().trim();
	

	// Creates local temporary object for holding train data
	var newTrain = {
		name: trainName,
		destination: trainDestination,
		frequency: trainFrequency,
		time: trainTime,
	}; //End newTrain object

	// Uploads train data to the database
	database.ref().push(newTrain);

	// Logs everything to console
	console.log(trainName.name);
	console.log(trainDestination.destination);
	console.log(trainFrequency.frequency);
	console.log(trainTime.time);

	// Alert for adding new train
	alert("New Train successfully added");

	// Clears all of the text-boxes
	$("#train-name-input").val("");
	$("#destination-input").val("");
	$("#frequency-input").val("");
	$("#train-time-input").val("");

	// Prevents moving to new page
	return false;

}) // End "submit-train-btn" on click button

// Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
	
	console.log(childSnapshot.val());

 	// Store everything into a variable
	var trainName = childSnapshot.val().name;
	var trainDestination = childSnapshot.val().destination;
	var trainTime = childSnapshot.val().time;
	var trainFrequency = childSnapshot.val().frequency;

	// Train info
	console.log(trainName);
	console.log(trainDestination);
	console.log(trainFrequency);
	console.log(trainTime);

	// Calculate Minutes Away
	var minutesAway = 

	// Add each train data to the table
	$("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + "</td></td>" + trainTime + "</td><td>" + minutesAway + "</td></tr>");



}); // "child_added" function