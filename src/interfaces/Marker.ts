import { type LatLngExpression } from 'leaflet';

export interface IMarker {
    coordinates: LatLngExpression;
    name: string;
    _id: string;
};