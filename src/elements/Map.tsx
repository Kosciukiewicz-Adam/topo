import React from "react";
import {
    ComposableMap,
    ZoomableGroup,
    Geographies,
    Geography,
    Marker,
} from "react-simple-maps";
import { IMarker } from "../interfaces/Marker";
import geoJSON from "../assets/usa.json";

interface Props {
    handleClick?: (value: string) => void;
    markers?: Array<IMarker>;
    forcedCenter?: number[];
    markerOffset?: number;
    toutchable?: boolean;
    background?: string;
    showName?: boolean;
    borders?: string;
    scale: number
}


const Map: React.FC<Props> = ({
    forcedCenter,
    handleClick,
    background,
    toutchable,
    markers,
    borders,
    scale,
}): JSX.Element => {
    const defaultBorder = "white";
    const defaultBackground = "grey";

    const mapFill = background || defaultBackground;
    const mapStroke = borders || defaultBorder;

    const center = markers && markers.length < 2 ? markers[0].coordinates : [0, 0];
    const scaledFontSize = scale < 300 ? "15px" : "30px";

    return (
        <ComposableMap
            projection="geoMercator"
            className="Map"
            projectionConfig={{
                scale: scale,
            }}
            style={toutchable ? {} : { pointerEvents: "none" }}
        >
            <ZoomableGroup center={forcedCenter || center} zoom={0.65}>
                <Geographies geography={geoJSON}>
                    {({ geographies }) =>
                        geographies.map((geo) => (
                            <Geography
                                stroke={mapStroke}
                                key={geo.rsmKey}
                                geography={geo}
                                fill={mapFill}
                                style={{
                                    default: {
                                        outline: "none"
                                    },
                                    pressed: {
                                        outline: "none"
                                    },
                                    hover: {
                                        outline: "none"
                                    }
                                }}
                            />
                        ))
                    }
                </Geographies>
                {markers?.map(({ name, coordinates, markerOffset, _id }) => (
                    <Marker key={name} coordinates={coordinates} onClick={() => handleClick?.(_id)} className="marker">
                        <circle r={5} fill="#000" />
                        <text
                            style={{ fontFamily: "system-ui", fill: "#000", fontSize: scaledFontSize }}
                            textAnchor="middle"
                            y={markerOffset}
                        >
                            {name}
                        </text>
                    </Marker>
                ))}
            </ZoomableGroup>getMapContent()
        </ComposableMap>
    );
};

export default Map;
