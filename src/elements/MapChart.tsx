import React from "react";
import {
    ComposableMap,
    Geographies,
    Geography,
    Marker
} from "react-simple-maps";

const markers = [
];

const MapChart = () => {
    const link1 = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";


    return (
        <ComposableMap
            projection="geoAzimuthalEqualArea"
            projectionConfig={{
                rotate: [-15, -50, 0],
                scale: 1200
            }}
        >
            <Geographies geography={link1}>
                {({ geographies }) =>
                    geographies.map((geo) => (
                        <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            fill="#EAEAEC"
                            stroke="#D6D6DA"
                        />
                    ))
                }
            </Geographies>
            {markers.map(({ name, coordinates, markerOffset }) => (
                <Marker key={name} coordinates={coordinates}>
                    <circle r={10} fill="#F00" stroke="#fff" strokeWidth={2} />
                    <text
                        textAnchor="middle"
                        y={markerOffset}
                        style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
                    >
                        {name}
                    </text>
                </Marker>
            ))}
        </ComposableMap>
    );
};

export default MapChart;
