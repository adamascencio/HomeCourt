import { useState, useEffect, useRef } from "react";
// import LocationPin from "../LocationPin/LocationPin";

export default function Map({ user }) {
  const defaultProps = {
    center: {
      lat: user.lat,
      lng: user.long
    },
    zoom: 11
  };
  const [nearbyLocations, setNearbyLocations] = useState([]);
  const mapDiv = useRef();

  useEffect(function() {
    if (user.lat && user.long) {
      // initialize the map
      const map = new window.google.maps.Map(
        mapDiv.current, {
          zoom: defaultProps.zoom,
          center: defaultProps.center,
        }
      );
      
      new window.google.maps.Marker({ position: defaultProps.center, map });

      // get nearby basketball courts
      const request = {
        location: defaultProps.center,
        radius: '24140.2', // 15 miles
        query: 'basketball court',
        type: ['gym', 'park']
      };

      const places = new window.google.maps.places.PlacesService(map);
      places.textSearch(request, callback);

      // add pins on map for each nearby basketball court
      nearbyLocations.map(place => {
        return new window.google.maps.Marker({
          position: { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() },
          map,
          title: place.name,
        });
      });
    }
  });

  function callback(results, status) {
    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
      setNearbyLocations(results);
      console.log('results: ', results);
      console.log('nearby courts', nearbyLocations);
      console.log('status: ', status);
    }
  }


  return (
    <div className="s2" style={{ height: '40vh', width: '100%' }} ref={mapDiv}>
  
    </div>
    );
}