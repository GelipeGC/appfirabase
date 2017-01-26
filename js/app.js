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
							"<td class=\"playerName\">" + player + "</td>" +
							"<td class=\"mail\">" + data[player].mail + "</td>" +
                			"<td class=\"number\">" + data[player].number + "</td>" +
                			"<td class=\"position\">" + data[player].position + "</td>" +
							"<td> <div class=\"btnEdit btn btn-warning glyphicon glyphicon-edit\"></div> </td>" +
							"<td> <div class=\"btnDelete btn btn-danger glyphicon glyphicon-remove\"></div></td>" +
						"</tr>"
			}

			$("#playersTable tbody").append(row);
			row = "";

			//*** Delete record from firebase
			$(".btnDelete").click(function(){
				console.log('clicked')
				var selectedPlayer = $(this).closest("tr")
				.find(".playerName")
				.text();

				console.log(selectedPlayer)
				rootRef.child(selectedPlayer).remove()
			})

			//*** edit record from firebase
			$(".btnEdit").click(function(){
				console.log('clicked')
				var selectedPlayer = $(this).closest("tr")
					.find(".playerName")
					.text();

				//asign ddata to from fields
				$("#fullName").val($(this).closest("tr").find(".playerName").text());
				$("#mail").val($(this).closest("tr").find(".mail").text());
				$("#number").val($(this).closest("tr").find(".number").text());
				$("#position").val($(this).closest("tr").find(".position").text());
            	$("#btnSend").text("Actualizar").removeClass("btn-primary").addClass("btn-warning").unbind("click").click(function() {

            		rootRef.child(selectedPlayer).update({
            			mail: $("#mail").val(),
            			number: $("#number").val(),
            			position: $("#position option:selected").text()
            		}, function(){
            			$("#fullName").val("");
            			$("#mail").val("");
            			$("#number").val("");
            			$("position").val("");
            			$("#btnSend").text("Enviar").removeClass("btn-warning").addClass("btn-primary").unbind("click").click(sendData);
            		})
				});
            })

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
        var onComplete = function(error){
        	if (error) {
        		console.log(error, 'La sincronizacion fallo');
        	} else {
        		console.log(error, 'la sincronizacion ha sido exitosa');
        	}
        }

        rootRef.once('value', function(snapshot){
        	if (snapshot.hasChild(fullName)) {
        		$('#myModal').modal('show');
        	} else {
        		rootRef.child(fullName).set(dataPlayer, onComplete);
        	}
        })

    })
});
