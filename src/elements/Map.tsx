import React from "react";
import {
    ComposableMap,
    Geographies,
    Geography,
    Marker
} from "react-simple-maps";
import { IMarker } from "../interfaces/Marker";

interface Props {
    markers?: Array<IMarker>;
    scale?: number
    handleClick?: (value: string) => void;
    showName?: boolean;
    background?: string;
    borders?: string;
}

const Map: React.FC<Props> = ({ markers, handleClick, scale, background, borders }) => {
    const link1 = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

    const defaultBorder = "";
    const defaultBackground = "";

    const mapFill = background || defaultBackground;
    const mapStroke = borders || defaultBorder;

    return (
        <ComposableMap
            projection="geoAzimuthalEqualArea"
            className="Map"
            projectionConfig={{
                rotate: [-15, -50, 0],
                scale: scale || 1200,
            }}
        >
            <Geographies geography={link1}>
                {({ geographies }) =>
                    geographies.map((geo) => (
                        <Geography
                            stroke={mapStroke}
                            key={geo.rsmKey}
                            geography={geo}
                            fill={mapFill}
                        />
                    ))
                }
            </Geographies>
            {markers?.map(({ name, coordinates, markerOffset, _id }) => (
                <Marker key={name} coordinates={coordinates} onClick={() => handleClick?.(_id)}>
                    <circle r={10} fill="#000" stroke="#fff" strokeWidth={2} />
                    <text
                        textAnchor="middle"
                        y={markerOffset}
                        style={{ fontFamily: "system-ui", fill: "#000" }}
                    >
                        {name}
                    </text>
                </Marker>
            ))}
        </ComposableMap>
    );
};

export default Map;
