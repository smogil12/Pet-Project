$(document).ready(function() {
    var database = firebase.database();

    var initialDonation = 0;
    var initialDonator = "Be The First To Donate!";

    var recentDonation = initialDonation;
    var recentDonator = initialDonator;

    database.ref().on("value", function(snapshot) {
        if (snapshot.child("recentDonator").exist() && snapshot.child("recentDonation").exists()) {
            recentDonator = snapshot.val().recentDonator;
            recentDonation = parseInt(snapshot.val().highPrice);
            $("mostRecentDonator").html(snapshot.val().recentDonator);
            $("mostRecentDonation").html("$" + snapshot.val().recentDonation);

            console.log(snapshot.val().recentDonator);
            console.log(snapshot.val().recentDonation);
        }
        else {
            $("#mostRecentDonator").html(recentDonator);
            $("#mostRecentDonation").html("$" + recentDonation);
        }
    })

    $("#button").on("click", function() {
        var donatorName = $("#donatorName").val().trim();
        var donationAmount = $("#donationAmount").val().trim();

        console.log(donatorName);
        console.log(donationAmount);

        if (donationAmount > recentDonation) {
            alert("Thank you for your donation!");
            database.ref().set({
                recentDonator: donatorName,
                recentDonation: donationAmount
            })
        } return false;
    })
});