$(document).ready(function() {
// Initialize Firebase
var config = {
    apiKey: "AIzaSyDbltK_RIX16cyTxTwyLDqtkUGtDJHWWWA",
    authDomain: "vigilante-111f2.firebaseapp.com",
    databaseURL: "https://vigilante-111f2.firebaseio.com",
    storageBucket: "vigilante-111f2.appspot.com",
    messagingSenderId: "453290277725"
  };
	firebase.initializeApp(config);

	var rootRef = firebase.database().ref();
		rootRef.on('value', function(snapshot){
			console.log(snapshot.val());
			var data = snapshot.val();
			$("#playersTable tbody").empty();
			var row = "";
			for (player in snapshot.val()) {
				console.log(player, ',', data[player]);
				row += "<tr>" +
							"<td>" + player + "</td>" +
							"<td>" + data[player].mail + "</td>" +
							"<td>" + data[player].number + "</td>" +
							"<td>" + data[player].position + "</td>" +

						"</tr>"
			}

			$("#playersTable tbody").append(row);
			row = "";
		}, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
});

	//*** Sending data to firebase
    $("#btnSend").click(function() {
        var fullName = $("#fullName").val();

        var dataPlayer = {
            name: fullName,
            mail: $("#mail").val(),
            number: $("#number").val(),
            position: $("#position option:selected").text()
        }

        rootRef.child(fullName).set(dataPlayer)

    })
});
