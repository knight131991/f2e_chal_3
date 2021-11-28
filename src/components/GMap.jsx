import React from "react";
// import PropTypes from "prop-types";
import GMapReact from "google-map-react";

function GMap({ steps, bpoint }) {
  const getPos = (spot, returnText = true) => {
    const {
      StopPosition: { PositionLat, PositionLon },
    } = spot;
    return returnText
      ? `${PositionLat},${PositionLon}`
      : { lat: PositionLat, lng: PositionLon };
  };

  return (
    <div
      style={{
        // 如果設定高度設定100%,iphone會無法顯示地圖,尚未了解原因,所以先寫死高度
        height: bpoint === "xs" ? "calc(100vh - 140px)" : "100%",
        width: "100%",
      }}
    >
      <GMapReact
        yesIWantToUseGoogleMapApiInternals
        bootstrapURLKeys={{ key: "AIzaSyCnBX045s9vhUBtjDAGmdKlHAKIP42ljOI" }}
        defaultCenter={{
          lat: 25.048,
          lng: 121.516,
        }}
        defaultZoom={7}
        options={{
          styles: [
            { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
            {
              elementType: "labels.text.stroke",
              stylers: [{ color: "#242f3e" }],
            },
            {
              elementType: "labels.text.fill",
              stylers: [{ color: "#746855" }],
            },
            {
              featureType: "administrative.locality",
              elementType: "labels.text.fill",
              stylers: [{ color: "#d59563" }],
            },
            {
              featureType: "poi",
              elementType: "labels.text.fill",
              stylers: [{ color: "#d59563" }],
            },
            {
              featureType: "poi.park",
              elementType: "geometry",
              stylers: [{ color: "#263c3f" }],
            },
            {
              featureType: "poi.park",
              elementType: "labels.text.fill",
              stylers: [{ color: "#6b9a76" }],
            },
            {
              featureType: "road",
              elementType: "geometry",
              stylers: [{ color: "#38414e" }],
            },
            {
              featureType: "road",
              elementType: "geometry.stroke",
              stylers: [{ color: "#212a37" }],
            },
            {
              featureType: "road",
              elementType: "labels.text.fill",
              stylers: [{ color: "#9ca5b3" }],
            },
            {
              featureType: "road.highway",
              elementType: "geometry",
              stylers: [{ color: "#746855" }],
            },
            {
              featureType: "road.highway",
              elementType: "geometry.stroke",
              stylers: [{ color: "#1f2835" }],
            },
            {
              featureType: "road.highway",
              elementType: "labels.text.fill",
              stylers: [{ color: "#f3d19c" }],
            },
            {
              featureType: "transit",
              elementType: "geometry",
              stylers: [{ color: "#2f3948" }],
            },
            {
              featureType: "transit.station",
              elementType: "labels.text.fill",
              stylers: [{ color: "#d59563" }],
            },
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [{ color: "#17263c" }],
            },
            {
              featureType: "water",
              elementType: "labels.text.fill",
              stylers: [{ color: "#515c6d" }],
            },
            {
              featureType: "water",
              elementType: "labels.text.stroke",
              stylers: [{ color: "#17263c" }],
            },
          ],
        }}
        onGoogleApiLoaded={({ map, maps }) => {
          const start = getPos(steps[0]);
          const end = getPos(steps[steps.length - 1]);

          steps.forEach((item) => {
            new maps.Marker({
              position: getPos(item, false),
              map: map,
              animation: maps.Animation.DROP, // DROP掉下來、BOUNCE一直彈跳
              draggable: false, // true、false可否拖拉
            });
          });

          let directionsService = new maps.DirectionsService();
          var directionsDisplay = new maps.DirectionsRenderer();
          directionsDisplay.setMap(map);

          directionsService.route(
            {
              travelMode: "DRIVING",
              drivingOptions: {
                trafficModel: "pessimistic",
                departureTime: new Date(),
              },
              waypoints: steps
                .slice(1, -1)
                .filter((item, id) => id % 2)
                .slice(1, 23)
                .map((item) => ({ location: getPos(item), stopover: false })),

              //   travelMode: "TRANSIT",
              //   transitOptions: {
              //     routingPreference: "LESS_WALKING",
              //     modes: ["BUS"],
              //   },
              origin: start,
              destination: end,
            },
            (DirectionsResult, DirectionsStatus) => {
              if (DirectionsStatus === "OK") {
                directionsDisplay.setDirections(DirectionsResult);
              }
            }
          );
        }}
      />
    </div>
  );
}

GMap.propTypes = {};

export default GMap;
