var map;
$.ajax({
    url: "https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:11414&key=AIzaSyBb037q7cMTQoJY1nYrAgfINH2h7KtL4WA",
    success: function(response){
        console.log(response.results[0].geometry.location)

        var longAndLat = response.results[0].geometry.location;
        var location = new google.maps.LatLng(longAndLat.lat,longAndLat.lng);
        map = new google.maps.Map(
            document.getElementById('map'), {zoom: 15, center: location});

        var request = {
                location: location,
                radius: '1500', // meters
                keyword: 'animal_shelter'
            };

        service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, callback);
    },
    error: (e) => {
        console.error(e)
    }
})

function callback(results, status) {
    console.log(results)
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
        var place = results[i];
        //createMarker(results[i]);
        console.log(results[i])
        var newLocation = {
            lat: results[i].geometry.location.lat(), 
            lng: results[i].geometry.location.lng()
        }
        var marker = new google.maps.Marker({position: newLocation, map: map})
        }
    }
}