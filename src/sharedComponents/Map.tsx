import React from "react";
// import {
//     ComposableMap,
//     ZoomableGroup,
//     Geographies,
//     Geography,
//     Marker,
// } from "react-simple-maps";
import { IMarker } from "../interfaces/Marker";
import "../styles/Map.scss";
// import geoJSON from "../assets/usa.json";
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';

import climbing from "../assets/icons/climbing.svg";

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
    handleClick,
    markers,
}): JSX.Element => {

    const icon = new L.Icon({
        iconUrl: climbing,
        iconRetinaUrl: climbing,
        iconSize: new L.Point(20, 20),
        className: 'leaflet-div-icon'
    });

    return (
        <div className="Map">
            <MapContainer center={[51.505, -0.09]} zoom={3} scrollWheelZoom={true} style={{ width: "100%", height: "100%" }} >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {markers?.map(marker => (
                    <Marker position={marker.coordinates} icon={icon} title={marker.name}
                        eventHandlers={{
                            click: (e) => {
                                handleClick?.(marker._id)
                            },
                        }}>
                        <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent>{marker.name}</Tooltip>
                    </Marker>
                ))}
            </MapContainer>
        </div >
    )
};

export default Map;
