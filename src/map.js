import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import React, { useEffect, useRef } from "react";

mapboxgl.accessToken =
  "pk.eyJ1Ijoid3NlYWdhciIsImEiOiJja3NsY3JjbHowNjF4MnBwbmJvcDFscDRwIn0.ONanvuiNYY7KcoooHlspew";
export function Map({ lois }) {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [174.76, -36.85],
      zoom: 9,
    });

    for (const loi of lois) {
      new mapboxgl.Marker()
        .setLngLat([loi.coordinates.lat, loi.coordinates.lng])
        .setPopup(
          new mapboxgl.Popup().setHTML(
            loi.transactions
              .map(
                (t) =>
                  `<h3>${t.merchant.name}</h3><p>${new Date(
                    t.date
                  ).toLocaleString()}</p>`
              )
              .join("")
          )
        )
        .addTo(map.current);
    }
  });
  return (
    <div
      style={{
        borderRadius: "24px",
      }}
    >
      <div className="map-container">
        <div ref={mapContainer} className="map-map" />
        <div className="hide-mobile grid-3">
          <button style={{ margin: "1rem 0 0 0" }} className="primary" onClick={() => alert('Please scan the QR codes, set the dates you\'ve been at those locations, go to My data -> Share my digital diary')}>
            Send Data to Ministry of Health
          </button>
          <a href="tel:08003585453">
            <button style={{ margin: "1rem 0 0 0" }} className="primary">
              Contact HealthLine
            </button>
          </a>
        </div>
        <div
          style={{
            backgroundColor: "rgba(35, 55, 75, 0.9)",
            color: "#ffffff",
            padding: "6px 12px",
            fontFamily: "monospace",
            zIndex: 1,
            position: "absolute",
            top: 0,
            left: 0,
            margin: "12px",
            borderRadius: "24px",
          }}
        >
          {lois.length} Locations of interest
        </div>
      </div>
    </div>
  );
}
