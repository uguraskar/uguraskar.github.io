var getQueryStringVal = function () {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
var myObj = getQueryStringVal();

var x = myObj.x.split(',');
var y = myObj.y.split(',');
var r = myObj.r.split(',');
var px = myObj.px.split(',');
var py = myObj.py.split(',');

function initMap() { // Create the map.
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 6,
        center: { lat: parseFloat(x[0]), lng: parseFloat(y[0]) },
        mapTypeId: 'terrain'
    });
    for (var i = 0; i < x.length; i++) {
        try {
            var circle = new google.maps.Circle({ //Circle
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.35,
                map: map,
                center: new google.maps.LatLng(parseFloat(x[i]), parseFloat(y[i])),
                radius: r[i] * 1000 //Converting Meters to KiloMeters
            });
        } catch (err) {
            console.log("Circle Failed: " + err);
        }
        var pathList = [];
        for (var j = 0; j < px.length ; j++) {
            pathList[j] = new google.maps.LatLng(parseFloat(px[j]), parseFloat(py[j]))
            var marker = new google.maps.Marker({ //Marker
                position: pathList[j],
                map: map
            });
        }
        try { //Polygonic Path
            var path = new google.maps.Polyline({
                path: pathList,
                strokeColor: "#0000FF",
                strokeOpacity: 0.8,
                map: map,
                strokeWeight: 2
            });
        } catch (err) {
            console.log("Path Failed: " + err);
        }
    }
}