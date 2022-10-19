import React, { useState, useEffect, useRef } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import VectorImage from "ol/layer/VectorImage";
import { Vector as VectorSource } from "ol/source";
import GeoJSON from "ol/format/GeoJSON";
import { Style, Icon, Stroke } from "ol/style";
import "ol/ol.css";
import locationData from "./data/location.geojson";

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
      }),
    });
    // Vector Layers
    const locationLayer = new VectorImage({
      source: new VectorSource({
        url: locationData,
        format: new GeoJSON(),
      }),

      visible: true,
      title: "Location Layer",
      style: new Style({
        stroke: new Stroke({
          color: "#000000",
          width: 1,
        }),

        image: new Icon({
          anchor: [0.5, 0.5],
          anchorXUnits: "fraction",
          anchorYUnits: "fraction",
          src: "https://openlayers.org/en/v4.6.5/examples/data/icon.png",
        }),
      }),
    });
    initialMap.addLayer(locationLayer);
    console.log("initialMap", initialMap);
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
