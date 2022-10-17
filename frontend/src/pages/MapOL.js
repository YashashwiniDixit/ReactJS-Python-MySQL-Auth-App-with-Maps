import React, { useState, useEffect, useRef } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import "ol/ol.css";

function MapOL() {
  const [map, setMap] = useState();
  const mapElement = useRef();
  const mapRef = useRef();
  mapRef.current = map;

  useEffect(() => {
    const initialMap = new Map({
      target: mapElement.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [8112034.988467557, 2163800.7904075133],
        zoom: 7,
        maxZoom: 10,
        minZoom: 5,
      }),
    });
    setMap(initialMap);
    initialMap.on("click", (e) => {
      console.log(e.coordinate);
    });
  }, []);

  return (
    <div
      style={{ height: "100vh", width: "100%" }}
      ref={mapElement}
      className="map-container"
    />
  );
}

export default MapOL;
