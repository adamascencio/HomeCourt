import { useState, useEffect, useRef } from "react";
import LocationPin from "../LocationPin/LocationPin";

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
      const map = new window.google.maps.Map(
        mapDiv.current, {
          zoom: defaultProps.zoom,
          center: defaultProps.center,
        }
      );
      new window.google.maps.Marker({ position: defaultProps.center, map: map });
    }
  }, []);

  function findNearbyLocations() {
    const service = new window.google.maps.places.PlacesService(document.createElement('div'));
    const request = {
      location: { lat: user.lat, lng: user.long },
      radius: '500',
      type: ['gym', 'park', 'school', 'university']
    };
    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setNearbyLocations(results);
      }
    });
  }

  return (
    findNearbyLocations(),
    <div className="s2" style={{ height: '40vh', width: '100%' }} ref={mapDiv}>
  
    </div>
    );
}