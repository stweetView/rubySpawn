'use strict';

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var HeatMapLayer = (function () {
  function HeatMapLayer(map) {
    _classCallCheck(this, HeatMapLayer);

    this.locations = new google.maps.MVCArray();
    this.layer = new google.maps.visualization.HeatmapLayer();
    this.layer.setMap(map);
  }

  _createClass(HeatMapLayer, [{
    key: 'addCoord',
    value: function addCoord(lat, lng) {
      this.locations.push(new google.maps.LatLng(lat, lng));
      this.layer.setData(this.locations);
    }
  }]);

  return HeatMapLayer;
})();

var HeatMap = function HeatMap() {
  _classCallCheck(this, HeatMap);

  var mapOptions = {
    zoom: 1,
    center: new google.maps.LatLng(37.774546, -122.433523),
    mapTypeId: google.maps.MapTypeId.SATELLITE
  };

  this.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
};

$(document).ready(function () {

  var map = undefined,
      pointarray = undefined,
      heatmap = undefined,
      locations = [];
  var geocoder = new google.maps.Geocoder();

  var pusher = new Pusher('5b4f1c48a82316e19ac4');
  var channel = pusher.subscribe('tweets_channel');

  var hm = new HeatMap();
  var positiveLayer = new HeatMapLayer(hm.map);
  var negativeLayer = new HeatMapLayer(hm.map);

  var geocode = function geocode(address) {
    geocoder.geocode({ address: address }, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var loc = results[0].geometry.location;
      }
    });
  };

  channel.bind('tweet_coords_event', function (data) {
    positiveLayer.addCoord(data.coordinates[0], data.coordinates[1]);
    console.log('got tweet with cords');
  });

  channel.bind('tweet_location_event', function (data) {
    console.log('got tweet with location');
    geocoder.geocode({ address: data }, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var loc = results[0].geometry.location;
        negativeLayer.addCoord(loc.lat(), loc.lng());
      }
    });
  });
});
