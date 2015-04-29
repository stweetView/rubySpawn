class HeatMapLayer {
  constructor(map){
    this.locations = new google.maps.MVCArray();
    this.layer = new google.maps.visualization.HeatmapLayer();
    this.layer.setMap(map)
  }
  addCoord(lat, lng){
    this.locations.push(new google.maps.LatLng(lat,lng));
    this.layer.setData(this.locations);
  }
}

class HeatMap {

  constructor(){
    let mapOptions = {
      zoom: 1,
      center: new google.maps.LatLng(37.774546, -122.433523),
      mapTypeId: google.maps.MapTypeId.SATELLITE
    };

    this.map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions)
  }

}

$(document).ready( () => {

  let map, pointarray, heatmap, locations = []
  const geocoder = new google.maps.Geocoder();

  const pusher = new Pusher('5b4f1c48a82316e19ac4')
  const channel = pusher.subscribe('tweets_channel')

  let hm = new HeatMap();
  let positiveLayer = new HeatMapLayer(hm.map);
  let negativeLayer = new HeatMapLayer(hm.map);

  const geocode = address => {
    geocoder.geocode({address: address}, (results, status) =>{
      if (status == google.maps.GeocoderStatus.OK){
        let loc = results[0].geometry.location
      }
    })
  }

  channel.bind('tweet_coords_event', data =>{
    positiveLayer.addCoord(data.coordinates[0], data.coordinates[1])
    console.log("got tweet with cords")
  })

  channel.bind('tweet_location_event', data =>{
    console.log("got tweet with location")
    geocoder.geocode({address: data}, (results, status) =>{
      if (status == google.maps.GeocoderStatus.OK){
        let loc = results[0].geometry.location
        negativeLayer.addCoord(loc.lat(), loc.lng())
      }
    })
  })
}

)
