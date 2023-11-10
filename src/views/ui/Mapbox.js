import { useState } from "react";
import Map, { Source, Layer } from "react-map-gl";
import type { FillLayer, LineLayer } from "react-map-gl";
import { MAP_TOKEN } from "../../config";
import "mapbox-gl/dist/mapbox-gl.css";

const geojson = require("../../geojson");

const lineLayer: LineLayer = {
  id: "my_line_layer",
  type: "line",
  paint: {
    "line-color": "black",
  },
};

const fillLayer: FillLayer = {
  id: "my_fill_layer",
  type: "fill",
  paint: {
    "fill-color": "red",
    "fill-opacity": 0.5,
  },
};

function Mapbox() {
  const initialViewport = { latitude: 36, longitude: 127.8, zoom: 6.4 };
  const [viewport, setViewport] = useState(initialViewport);
  const [currentSelectedLocation, setCurrentSelectedLocation] = useState();

  const dragEndHandler = (e) => {
    console.log(e.viewState);
  };

  const clickLayerHandler = (e) => {
    const feature = e.features[0];
    setCurrentSelectedLocation(feature);
    console.log(feature);
  };

  return (
    <Map
      mapboxAccessToken={MAP_TOKEN}
      initialViewState={viewport}
      style={{
        position: "absolute",
        left: "60%",
        width: "40vw",
        height: "100vh",
      }}
      mapStyle="mapbox://styles/mapbox/light-v11"
      onViewportChange={(viewport) => {
        setViewport(viewport);
      }}
      attributionControl={false}
      dragPan={false}
      onDragEnd={dragEndHandler}
      scrollZoom={false}
      interactiveLayerIds={["my_fill_layer"]}
      onClick={clickLayerHandler}
    >
      <Source type="geojson" data={geojson}>
        <Layer {...fillLayer}></Layer>
      </Source>
      <Source type="geojson" data={geojson}>
        <Layer {...lineLayer}></Layer>
      </Source>
    </Map>
  );
}

export default Mapbox;
