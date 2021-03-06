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
		time: trainTime
	}; //End newTrain object

	// Uploads train data to the database
	database.ref().push(newTrain);

	// Logs everything to console
	console.log("New train name: " + newTrain.name);
	console.log("New train destination: " + newTrain.destination);
	console.log("New train frequency: " + newTrain.frequency);
	console.log("New train time: " + newTrain.time);
	
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
	var trainArrival = moment(trainTime, "HH:mm").add(trainFrequency, "m").format("hh:mm A");
	
	// Train info
	console.log("Firebase-Train name: " + trainName);
	console.log("Firebase-Train destination: " + trainDestination);
	console.log("Firebase-Train frequency: " + trainFrequency);
	console.log("Firebase-Train time: " + trainTime);
	console.log("Firebase-Next arrival: " + trainArrival);

	// Convert train arrival from 12hr to 24hr
	var convertArrival = moment(trainArrival, "hh:mm A").format("HH:mm");
	console.log("Convert Arrival time: " + convertArrival);
	// Calculate Minutes Away
	var ms = moment(convertArrival, "HH:mm").diff(moment(trainTime, "HH:mm"));
	var d = moment.duration(ms);
	var minutesAway = Math.floor(d.asHours()) + moment.utc(ms).format("m");
	console.log("Minutes away: " + minutesAway);
	
	// Add each train data to the table
	$("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + "</td></td>" + trainTime + "</td><td>" + trainArrival + "</td><td>" + minutesAway + "</td></tr>");

}); // "child_added" function